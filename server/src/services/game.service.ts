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
        console.log(`[GameService] 🎮 Starting endGame for room ${room.id}, winner: ${winnerId}, draw: ${isDraw}`);
        console.log(`[GameService] 👥 Players in room:`, room.players.map(p => ({
            id: (p.user._id as any).toString(),
            username: p.user.username,
            isBot: this.isBot(p)
        })));
        console.log(`[GameService] 💰 Room bet: ${room.bet}, gameType: ${room.gameType}`);
        
        if (room.id.startsWith('tourney-')) {
            console.log(`[GameService] 🏆 This is a tournament game, delegating to endTournamentGame`);
            await this.endTournamentGame(room, winnerId, isDraw);
            return;
        }

        console.log(`[GameService] 🎯 This is a regular lobby game, processing revenue...`);
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
        console.log(`[GameService] 🎯 Starting endRegularGame for room ${room.id}`);
        
        if (room.disconnectTimer) clearTimeout(room.disconnectTimer);
        if (room.botJoinTimer) clearTimeout(room.botJoinTimer);
        
        let winner, loser;
        
        if (isDraw) {
            // При ничьей просто берем двух игроков без привязки к winner/loser
            winner = room.players[0];
            loser = room.players[1];
            console.log(`[GameService] 🤝 Draw game - assigning players arbitrarily for revenue processing`);
        } else {
            // При победе определяем по winnerId
            winner = room.players.find(p => (p.user._id as any).toString() === winnerId);
            loser = room.players.find(p => (p.user._id as any).toString() !== winnerId);
        }
        
        const gameNameForDB = this.formatGameNameForDB(room.gameType);
        const globalIO = getIO();

        console.log(`[GameService] 🏆 Winner:`, winner ? { id: (winner.user._id as any).toString(), username: winner.user.username, isBot: this.isBot(winner) } : 'none');
        console.log(`[GameService] 😞 Loser:`, loser ? { id: (loser.user._id as any).toString(), username: loser.user.username, isBot: this.isBot(loser) } : 'none');

        // Проверяем, что в игре есть хотя бы один реальный игрок (не бот)
        const hasRealPlayers = room.players.some(p => !this.isBot(p));
        
        if (!hasRealPlayers) {
            console.log(`[GameService] ⚠️ Only bots in game, skipping revenue processing`);
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

        console.log(`[GameService] ✅ Real players detected, processing revenue...`);

        try {
            let revenueResult;
            const isWinnerBot = winner ? this.isBot(winner) : false;
            const isLoserBot = loser ? this.isBot(loser) : false;
            const isBotGame = isWinnerBot && isLoserBot;
            const isPlayerVsBot = (isWinnerBot && !isLoserBot) || (!isWinnerBot && isLoserBot);
            const isPlayerVsPlayer = !isWinnerBot && !isLoserBot;
            
            console.log(`[GameService] 🤖 Game type analysis:`);
            console.log(`[GameService] - Winner is bot: ${isWinnerBot}`);
            console.log(`[GameService] - Loser is bot: ${isLoserBot}`);
            console.log(`[GameService] - Bot vs Bot: ${isBotGame}`);
            console.log(`[GameService] - Player vs Bot: ${isPlayerVsBot}`);
            console.log(`[GameService] - Player vs Player: ${isPlayerVsPlayer}`);
            console.log(`[GameService] - Is draw: ${isDraw}`);
            
            if (isDraw) {
                console.log(`[GameService] 🤝 Processing DRAW scenario`);
                // Логика для ничьи
                if (isPlayerVsPlayer) {
                    console.log(`[GameService] 👥 Player vs Player draw - processing 5% commission`);
                    // Игрок против игрока - берем 5% комиссию с каждого, возвращаем 95%
                    revenueResult = await PlatformRevenueService.processLobbyGameRevenue(
                        room.id,
                        gameNameForDB,
                        winner,
                        loser,
                        room.bet,
                        true, // isDraw
                        false // not player vs bot
                    );
                    console.log(`[GameService] ✅ Player vs Player draw revenue processed:`, revenueResult);
                } else if (isPlayerVsBot) {
                    console.log(`[GameService] 🤖 Player vs Bot draw - processing 5% commission`);
                    // Игрок против бота - ничья: 5% комиссия с игрока, возвращаем 95%
                    const realPlayer = !isWinnerBot ? winner : loser;
                    if (realPlayer) {
                        console.log(`[GameService] 👤 Real player in draw:`, { id: (realPlayer.user._id as any).toString(), username: realPlayer.user.username });
                        const commissionAmount = room.bet * 0.05; // 5% комиссии
                        const returnAmount = room.bet * 0.95; // возвращаем 95%
                        
                        console.log(`[GameService] 💰 Draw amounts - Commission: ${commissionAmount}, Return: ${returnAmount}`);
                        
                        const updatedPlayer = await User.findByIdAndUpdate(
                            realPlayer.user._id,
                            { $inc: { balance: returnAmount } },
                            { new: true }
                        );
                        
                        console.log(`[GameService] 💳 Player balance updated to: ${updatedPlayer?.balance}`);
                        
                        // Создаем запись о доходе платформы от игры с ботом (ничья)
                        console.log(`[GameService] 📝 Creating platform revenue record for Player vs Bot draw...`);
                        revenueResult = await PlatformRevenueService.processLobbyGameRevenue(
                            room.id,
                            gameNameForDB,
                            realPlayer, // передаем как winner для структуры
                            { user: { _id: 'bot', username: 'Bot' } }, // фиктивный бот как loser
                            room.bet,
                            true, // isDraw
                            true // player vs bot scenario
                        );
                        console.log(`[GameService] ✅ Player vs Bot draw revenue processed:`, revenueResult);
                        
                        if (updatedPlayer && globalIO) {
                            globalIO.emit('balanceUpdated', {
                                userId: (realPlayer.user._id as any).toString(),
                                newBalance: updatedPlayer.balance,
                                transaction: {
                                    type: 'GAME_REFUND',
                                    amount: returnAmount,
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
                            // Против бота - ничья: возврат 95%, потеря 5%
                            amountChanged = -room.bet * 0.05;
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
                console.log(`[GameService] 🏆 Processing WIN scenario`);
                // Логика для победы
                if (isPlayerVsPlayer) {
                    console.log(`[GameService] 👥 Player vs Player win - processing 10% commission`);
                    // Игрок против игрока - новая система монетизации (ставки уже списаны)
                    console.log(`[GameService] 📝 Creating platform revenue record for Player vs Player win...`);
                    revenueResult = await PlatformRevenueService.processLobbyGameRevenue(
                        room.id,
                        gameNameForDB,
                        winner,
                        loser,
                        room.bet,
                        false, // not draw
                        false // not player vs bot
                    );
                    console.log(`[GameService] ✅ Player vs Player win revenue processed:`, revenueResult);
                    
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
                    console.log(`[GameService] 🤖 Player vs Bot win scenario`);
                    // Игрок против бота - новая монетизация
                    const realPlayer = !isWinnerBot ? winner : loser;
                    const isRealPlayerWinner = realPlayer && (realPlayer.user._id as any).toString() === (winner.user._id as any).toString();
                    
                    console.log(`[GameService] 👤 Real player:`, realPlayer ? { id: (realPlayer.user._id as any).toString(), username: realPlayer.user.username } : 'none');
                    console.log(`[GameService] 🏆 Real player won: ${isRealPlayerWinner}`);
                    
                    if (realPlayer) {
                        if (isRealPlayerWinner) {
                            console.log(`[GameService] 🎉 Player won against bot - platform pays out`);
                            // Реальный игрок выиграл против бота - платформа платит ему из своих средств
                            const winAmount = room.bet * 2; // полный выигрыш (своя ставка + выигрыш)
                            const netWin = room.bet; // чистая прибыль
                            
                            console.log(`[GameService] 💰 Win amounts - Total: ${winAmount}, Net: ${netWin}`);
                            
                            const updatedPlayer = await User.findByIdAndUpdate(
                                realPlayer.user._id,
                                { $inc: { balance: winAmount } },
                                { new: true }
                            );
                            
                            console.log(`[GameService] 💳 Player balance updated to: ${updatedPlayer?.balance}`);
                            
                            // Записываем как расход платформы (отрицательный доход)
                            console.log(`[GameService] 📝 Creating NEGATIVE platform revenue record (player won vs bot)...`);
                            revenueResult = await PlatformRevenueService.processLobbyGameRevenue(
                                room.id,
                                gameNameForDB,
                                realPlayer,
                                { user: { _id: 'bot', username: 'Bot' } },
                                room.bet,
                                false, // not draw
                                true // player won against bot - platform pays
                            );
                            console.log(`[GameService] ✅ Player won vs Bot revenue processed:`, revenueResult);
                            
                            await GameRecord.create({
                                user: realPlayer.user._id,
                                gameName: gameNameForDB,
                                status: 'WON',
                                amountChanged: netWin,
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
                            console.log(`[GameService] 😞 Player lost to bot - platform gains full bet`);
                            // Реальный игрок проиграл боту - вся ставка игрока идет платформе
                            console.log(`[GameService] 📝 Creating POSITIVE platform revenue record (player lost vs bot)...`);
                            revenueResult = await PlatformRevenueService.processLobbyGameRevenue(
                                room.id,
                                gameNameForDB,
                                { user: { _id: 'bot', username: 'Bot' } }, // бот как winner для структуры
                                realPlayer, // игрок как loser
                                room.bet,
                                false, // not draw
                                true // player lost to bot - platform gains
                            );
                            console.log(`[GameService] ✅ Player lost vs Bot revenue processed:`, revenueResult);
                            
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

            console.log(`[GameService] 🎯 Regular game ended in room ${room.id}`);
            console.log(`[GameService] 💰 Platform revenue: $${revenueResult?.platformRevenue || 0}`);
            console.log(`[GameService] 🏷️ Game classification - Bot vs Bot: ${isBotGame}, Player vs Bot: ${isPlayerVsBot}, Player vs Player: ${isPlayerVsPlayer}`);

        } catch (error) {
            console.error('[GameService] ❌ Error processing game revenue:', error);
            console.error('[GameService] ❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
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