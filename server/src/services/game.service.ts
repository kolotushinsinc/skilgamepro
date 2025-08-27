import { Server } from 'socket.io';
import { GamePlayer, IGameResult, GameMove } from '../types/game.types';
import { gameLogics, getIO, Room } from '../socket';
import User from '../models/User.model';
import GameRecord from '../models/GameRecord.model';
import Transaction from '../models/Transaction.model';
import { advanceTournamentWinner } from './tournament.service';
import PlatformRevenueService from './platformRevenue.service';

export class GameService {
    private io: Server;
    private rooms: Record<string, Room>;

    constructor(io: Server, rooms: Record<string, Room>) {
        this.io = io;
        this.rooms = rooms;
    }

    private isBot(player: any): boolean {
        if (!player || !player.user || !player.user._id) return false;
        return (player.user._id as any).toString().startsWith('bot-');
    }

    private formatGameNameForDB(gameType: string): 'Checkers' | 'Chess' | 'Backgammon' | 'Tic-Tac-Toe' {
        switch (gameType) {
            case 'tic-tac-toe': return 'Tic-Tac-Toe';
            case 'checkers': return 'Checkers';
            case 'chess': return 'Chess';
            case 'backgammon': return 'Backgammon';
            default: return 'Tic-Tac-Toe';
        }
    }

    private getPublicRoomState(room: Room) {
        const { botJoinTimer, disconnectTimer, ...publicState } = room;
        return publicState;
    }

    async processPlayerMove(roomId: string, move: GameMove, playerId: string): Promise<boolean> {
        const room = this.rooms[roomId];
        if (!room || room.players.length < 2 || room.gameState.turn !== playerId) {
            return false;
        }

        const gameLogic = gameLogics[room.gameType];
        const { newState, error, turnShouldSwitch } = gameLogic.processMove(
            room.gameState,
            move,
            playerId,
            room.players as GamePlayer[]
        );
        
        if (error) {
            this.io.to(playerId).emit('error', { message: error });
            return false;
        }

        room.gameState = newState;
        
        const gameResult = gameLogic.checkGameEnd(room.gameState, room.players as GamePlayer[]);
        if (gameResult.isGameOver) {
            await this.endGame(room, gameResult.winnerId, gameResult.isDraw);
            return true;
        }
        
        this.io.to(roomId).emit('gameUpdate', this.getPublicRoomState(room));
        
        if (turnShouldSwitch) {
            await this.processBotMove(room);
        }
        
        return true;
    }

    private async processBotMove(room: Room): Promise<void> {
        const currentPlayer = room.players.find(p =>
            (p.user._id as any).toString() === room.gameState.turn
        );
        
        if (!currentPlayer || !this.isBot(currentPlayer)) {
            return;
        }

        setTimeout(async () => {
            const currentRoom = this.rooms[room.id];
            if (!currentRoom) return;

            let botCanMove = true;
            let safetyBreak = 0;
            const gameLogic = gameLogics[currentRoom.gameType];

            while (botCanMove && safetyBreak < 10) {
                safetyBreak++;
                
                const botPlayerIndex = currentRoom.players.findIndex(p => this.isBot(p)) as 0 | 1;
                const botMove = gameLogic.makeBotMove(currentRoom.gameState, botPlayerIndex);
                
                if (!botMove || Object.keys(botMove).length === 0) break;

                const botProcessResult = gameLogic.processMove(
                    currentRoom.gameState,
                    botMove,
                    (currentPlayer.user._id as any).toString(),
                    currentRoom.players as GamePlayer[]
                );

                if (botProcessResult.error) break;

                currentRoom.gameState = botProcessResult.newState;
                
                const botGameResult = gameLogic.checkGameEnd(currentRoom.gameState, currentRoom.players as GamePlayer[]);
                if (botGameResult.isGameOver) {
                    await this.endGame(currentRoom, botGameResult.winnerId, botGameResult.isDraw);
                    return;
                }
                
                botCanMove = !botProcessResult.turnShouldSwitch;
            }

            if (currentRoom) {
                this.io.to(room.id).emit('gameUpdate', this.getPublicRoomState(currentRoom));
            }
        }, 1500);
    }

    async endGame(room: Room, winnerId?: string, isDraw: boolean = false): Promise<void> {
        console.log(`[GameService] Ending game in room ${room.id}, winner: ${winnerId}, draw: ${isDraw}`);
        
        if (room.id.startsWith('tourney-')) {
            await this.endTournamentGame(room, winnerId, isDraw);
            return;
        }

        await this.endRegularGame(room, winnerId, isDraw);
    }

    private async endTournamentGame(room: Room, winnerId?: string, isDraw: boolean = false): Promise<void> {
        const [, tournamentId, , matchIdStr] = room.id.split('-');
        const matchId = parseInt(matchIdStr, 10);
        
        let winnerObject = null;
        if (winnerId && !isDraw) {
            const winnerPlayer = room.players.find((p: any) =>
                (p.user._id as any).toString() === winnerId
            );
            if (winnerPlayer) {
                winnerObject = {
                    _id: (winnerPlayer.user._id as any).toString(),
                    username: winnerPlayer.user.username,
                    isBot: this.isBot(winnerPlayer)
                };
            }
        } else if (isDraw) {
            const randomWinner = room.players[Math.floor(Math.random() * room.players.length)];
            winnerObject = {
                _id: (randomWinner.user._id as any).toString(),
                username: randomWinner.user.username,
                isBot: this.isBot(randomWinner)
            };
        }
        
        this.io.to(room.id).emit('gameEnd', { 
            winner: winnerObject ? { user: winnerObject } : null, 
            isDraw 
        });
        
        if (winnerObject) {
            await advanceTournamentWinner(this.io, tournamentId, matchId.toString(), winnerObject);
        }
        
        delete this.rooms[room.id];
    }

    private async endRegularGame(room: Room, winnerId?: string, isDraw: boolean = false): Promise<void> {
        if (room.disconnectTimer) clearTimeout(room.disconnectTimer);
        if (room.botJoinTimer) clearTimeout(room.botJoinTimer);
        
        const winner = room.players.find(p => (p.user._id as any).toString() === winnerId);
        const loser = room.players.find(p => (p.user._id as any).toString() !== winnerId);
        const gameNameForDB = this.formatGameNameForDB(room.gameType);
        const globalIO = getIO();

        // Проверяем, что в игре есть хотя бы один реальный игрок (не бот)
        const hasRealPlayers = room.players.some(p => !this.isBot(p));
        
        if (!hasRealPlayers) {
            // Если только боты, просто удаляем комнату без обработки доходов
            this.io.to(room.id).emit('gameEnd', {
                winner: isDraw ? null : winner,
                isDraw
            });
            const gameType = room.gameType;
            delete this.rooms[room.id];
            this.broadcastLobbyState(gameType);
            return;
        }

        try {
            let revenueResult;
            const isWinnerBot = winner ? this.isBot(winner) : false;
            const isLoserBot = loser ? this.isBot(loser) : false;
            const isBotGame = isWinnerBot && isLoserBot;
            const isPlayerVsBot = (isWinnerBot && !isLoserBot) || (!isWinnerBot && isLoserBot);
            const isPlayerVsPlayer = !isWinnerBot && !isLoserBot;
            
            if (isDraw) {
                // Логика для ничьи
                if (isPlayerVsPlayer) {
                    // Игрок против игрока - берем 5% комиссию с каждого
                    revenueResult = await PlatformRevenueService.processLobbyGameRevenue(
                        room.id,
                        gameNameForDB,
                        winner,
                        loser,
                        room.bet,
                        true // isDraw
                    );
                } else if (isPlayerVsBot) {
                    // Игрок против бота - просто возвращаем ставку игроку без комиссии
                    const realPlayer = !isWinnerBot ? winner : loser;
                    if (realPlayer) {
                        const updatedPlayer = await User.findByIdAndUpdate(
                            realPlayer.user._id,
                            { $inc: { balance: room.bet } },
                            { new: true }
                        );
                        
                        if (updatedPlayer && globalIO) {
                            globalIO.emit('balanceUpdated', {
                                userId: (realPlayer.user._id as any).toString(),
                                newBalance: updatedPlayer.balance,
                                transaction: {
                                    type: 'GAME_REFUND',
                                    amount: room.bet,
                                    status: 'completed',
                                    createdAt: new Date()
                                }
                            });
                        }
                    }
                }

                // Создаем записи игр для реальных игроков
                for (const player of room.players) {
                    if (!this.isBot(player)) {
                        const opponent = room.players.find(p => p.user._id !== player.user._id);
                        const isVsBot = opponent ? this.isBot(opponent) : false;
                        let amountChanged: number;
                        
                        if (isVsBot) {
                            // Против бота - полный возврат ставки (0 изменений)
                            amountChanged = 0;
                        } else {
                            // Против игрока - возврат 95%, т.е. потеря 5%
                            amountChanged = -room.bet * 0.05;
                        }
                        
                        await GameRecord.create({
                            user: player.user._id,
                            gameName: gameNameForDB,
                            status: 'DRAW',
                            amountChanged,
                            opponent: opponent?.user.username || 'Bot'
                        });
                    }
                }
                
                this.io.to(room.id).emit('gameEnd', { winner: null, isDraw: true });

            } else if (winner && loser) {
                // Логика для победы
                if (isPlayerVsPlayer) {
                    // Игрок против игрока - новая система монетизации
                    revenueResult = await PlatformRevenueService.processLobbyGameRevenue(
                        room.id,
                        gameNameForDB,
                        winner,
                        loser,
                        room.bet,
                        false // not draw
                    );
                    
                    // Победитель получает свою ставку + ставку противника - 10% комиссии
                    const totalWon = room.bet * 2; // общая сумма выигрыша
                    const commission = totalWon * 0.10; // 10% комиссии
                    const netGain = totalWon - commission - room.bet; // чистая прибыль = выигрыш - комиссия - своя ставка
                    
                    await GameRecord.create({
                        user: winner.user._id,
                        gameName: gameNameForDB,
                        status: 'WON',
                        amountChanged: netGain, // чистая прибыль после всех вычетов
                        opponent: loser.user.username
                    });

                    await GameRecord.create({
                        user: loser.user._id,
                        gameName: gameNameForDB,
                        status: 'LOST',
                        amountChanged: -room.bet, // проиграл свою ставку
                        opponent: winner.user.username
                    });

                    // Обновляем балансы через socket
                    if (revenueResult && globalIO) {
                        if (revenueResult.winnerNewBalance !== undefined) {
                            const winnerReceivedAmount = totalWon - commission; // то что получил победитель
                            globalIO.emit('balanceUpdated', {
                                userId: (winner.user._id as any).toString(),
                                newBalance: revenueResult.winnerNewBalance,
                                transaction: {
                                    type: 'WAGER_WIN',
                                    amount: winnerReceivedAmount,
                                    status: 'completed',
                                    createdAt: new Date()
                                }
                            });
                        }
                        
                        if (revenueResult.loserNewBalance !== undefined) {
                            globalIO.emit('balanceUpdated', {
                                userId: (loser.user._id as any).toString(),
                                newBalance: revenueResult.loserNewBalance,
                                transaction: {
                                    type: 'WAGER_LOSS',
                                    amount: 0, // баланс не изменяется, ставка уже списана
                                    status: 'completed',
                                    createdAt: new Date()
                                }
                            });
                        }
                    }
                    
                } else if (isPlayerVsBot) {
                    // Игрок против бота - старая логика без комиссии
                    const realPlayer = !isWinnerBot ? winner : loser;
                    const isRealPlayerWinner = realPlayer && (realPlayer.user._id as any).toString() === (winner.user._id as any).toString();
                    
                    if (realPlayer) {
                        if (isRealPlayerWinner) {
                            // Реальный игрок выиграл против бота - получает удвоенную ставку (свою + бота)
                            const winAmount = room.bet * 2; // полный выигрыш
                            const netWin = room.bet; // чистый выигрыш (выигрыш - уже списанная ставка)
                            
                            const updatedPlayer = await User.findByIdAndUpdate(
                                realPlayer.user._id,
                                { $inc: { balance: winAmount } },
                                { new: true }
                            );
                            
                            await GameRecord.create({
                                user: realPlayer.user._id,
                                gameName: gameNameForDB,
                                status: 'WON',
                                amountChanged: netWin, // чистая прибыль
                                opponent: 'Bot'
                            });

                            if (updatedPlayer && globalIO) {
                                globalIO.emit('balanceUpdated', {
                                    userId: (realPlayer.user._id as any).toString(),
                                    newBalance: updatedPlayer.balance,
                                    transaction: {
                                        type: 'WAGER_WIN',
                                        amount: winAmount,
                                        status: 'completed',
                                        createdAt: new Date()
                                    }
                                });
                            }
                        } else {
                            // Реальный игрок проиграл боту - только теряет ставку (уже списана при входе)
                            await GameRecord.create({
                                user: realPlayer.user._id,
                                gameName: gameNameForDB,
                                status: 'LOST',
                                amountChanged: -room.bet,
                                opponent: 'Bot'
                            });
                        }
                    }
                }

                this.io.to(room.id).emit('gameEnd', { winner, isDraw: false });
            }

            console.log(`[GameService] Regular game ended in room ${room.id}. Platform revenue: $${revenueResult?.platformRevenue || 0}. Bot game: ${isBotGame}, Player vs Bot: ${isPlayerVsBot}`);

        } catch (error) {
            console.error('[GameService] Error processing game revenue:', error);
            // В случае ошибки используем старую логику как fallback
            this.io.to(room.id).emit('gameEnd', {
                winner: isDraw ? null : winner,
                isDraw
            });
        }
        
        const gameType = room.gameType;
        delete this.rooms[room.id];
        this.broadcastLobbyState(gameType);
    }

    private broadcastLobbyState(gameType: string): void {
        const availableRooms = Object.values(this.rooms)
            .filter(room => room.gameType === gameType && room.players.length < 2)
            .map(r => ({ 
                id: r.id, 
                bet: r.bet, 
                host: r.players.length > 0 
                    ? r.players[0] 
                    : { user: { username: 'Waiting for player' } }
            }));
        
        this.io.to(`lobby-${gameType}`).emit('roomsList', availableRooms);
    }

    async handlePlayerLeave(roomId: string, socketId: string): Promise<void> {
        const room = this.rooms[roomId];
        if (!room) return;
        
        const winningPlayer = room.players.find(p => p.socketId !== socketId);
        if (winningPlayer) {
            await this.endGame(room, (winningPlayer.user._id as any).toString());
        } else {
            if (room.botJoinTimer) clearTimeout(room.botJoinTimer);
            delete this.rooms[roomId];
            this.broadcastLobbyState(room.gameType);
        }
    }

    handlePlayerDisconnect(socketId: string, userId: string): void {
        const roomId = Object.keys(this.rooms).find(id => 
            this.rooms[id].players.some(p => p.socketId === socketId)
        );
        
        if (!roomId) return;

        const room = this.rooms[roomId];
        if (room.botJoinTimer) clearTimeout(room.botJoinTimer);
        
        const remainingPlayer = room.players.find(p => p.socketId !== socketId);

        if (room.players.length < 2 || !remainingPlayer) {
            delete this.rooms[roomId];
            this.broadcastLobbyState(room.gameType);
        } else {
            this.io.to(remainingPlayer.socketId).emit('opponentDisconnected', { 
                message: `Opponent disconnected. Waiting for reconnection (60 sec)...`
            });
            
            room.disconnectTimer = setTimeout(async () => {
                await this.endGame(room, (remainingPlayer.user._id as any).toString());
            }, 60000);
        }
    }
}