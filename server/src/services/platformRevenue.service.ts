import PlatformRevenue, { IPlatformRevenue } from '../models/PlatformRevenue.model';
import User from '../models/User.model';
import Tournament from '../models/Tournament.model';
import mongoose from 'mongoose';

// Специальный ObjectId для всех ботов в системе
const BOT_OBJECT_ID = new mongoose.Types.ObjectId('000000000000000000000001');

export class PlatformRevenueService {
    /**
     * Обработка завершения игры в лобби с новой системой монетизации
     */
    static async processLobbyGameRevenue(
        roomId: string,
        gameType: string,
        winner: any,
        loser: any,
        betAmount: number,
        isDraw: boolean = false,
        isPlayerVsBotScenario: boolean = false
    ): Promise<{
        winnerNewBalance?: number;
        loserNewBalance?: number;
        platformRevenue: number;
        revenueRecord: IPlatformRevenue
    }> {
        const session = await mongoose.startSession();
        
        try {
            // Валидация входных данных
            if (!winner || !winner.user || !loser || !loser.user) {
                throw new Error(`Invalid player data: winner=${!!winner?.user}, loser=${!!loser?.user}`);
            }
            
            if (!roomId || !gameType || betAmount <= 0) {
                throw new Error(`Invalid game data: roomId=${!!roomId}, gameType=${!!gameType}, betAmount=${betAmount}`);
            }
            
            console.log(`[PlatformRevenue] 🎮 Processing revenue for ${gameType} game:`);
            console.log(`  - Room: ${roomId}`);
            console.log(`  - Bet: $${betAmount}`);
            console.log(`  - Draw: ${isDraw}`);
            console.log(`  - Player vs Bot: ${isPlayerVsBotScenario}`);
            console.log(`  - Winner: ${winner.user.username} (ID: ${winner.user._id})`);
            console.log(`  - Loser: ${loser.user.username} (ID: ${loser.user._id})`);
            
            await session.startTransaction();

            let winnerNewBalance: number | undefined;
            let loserNewBalance: number | undefined;
            let platformRevenue: number;
            let description: string;
            let commissionRate: number;

            if (isPlayerVsBotScenario) {
                // Специальная логика для игр игрок против бота
                const isWinnerBot = winner.user._id.toString().startsWith('bot') || winner.user._id === 'bot';
                const isLoserBot = loser.user._id.toString().startsWith('bot') || loser.user._id === 'bot';
                
                if (isDraw) {
                    // Ничья с ботом: 5% комиссия с игрока
                    commissionRate = 5;
                    platformRevenue = betAmount * 0.05;
                    description = `Draw commission from ${gameType} game (Player vs Bot)`;
                    
                    // Балансы уже обновлены в game.service.ts, здесь только записываем
                    
                } else if (isWinnerBot) {
                    // Игрок проиграл боту - вся ставка игрока идет платформе
                    commissionRate = 100;
                    platformRevenue = betAmount;
                    description = `Player lost to bot in ${gameType} game - full stake to platform`;
                    
                } else {
                    // Игрок выиграл бота - платформа платит игроку (отрицательный доход)
                    commissionRate = 100;
                    platformRevenue = -betAmount; // отрицательный доход
                    description = `Player won against bot in ${gameType} game - platform payout`;
                }
                
            } else if (isDraw) {
                // Ничья между игроками: с каждого игрока 5% комиссии, остальное возвращается
                // Ставки уже списаны при входе в игру
                commissionRate = 5;
                const commissionPerPlayer = betAmount * 0.05;
                const returnAmount = betAmount - commissionPerPlayer; // возвращаем 95%
                
                platformRevenue = commissionPerPlayer * 2; // с двух игроков
                description = `Draw commission from ${gameType} game`;

                // Возвращаем 95% ставки каждому игроку (ставки уже списаны)
                const updatedWinner = await User.findByIdAndUpdate(
                    winner.user._id,
                    { $inc: { balance: returnAmount } },
                    { new: true, session }
                );
                
                const updatedLoser = await User.findByIdAndUpdate(
                    loser.user._id,
                    { $inc: { balance: returnAmount } },
                    { new: true, session }
                );

                winnerNewBalance = updatedWinner?.balance;
                loserNewBalance = updatedLoser?.balance;

            } else {
                // Победа между игроками: победитель получает ставку проигравшего + свою ставку - 10% комиссии
                // Ставки уже списаны при входе в игру
                commissionRate = 10;
                const totalAmount = betAmount * 2; // ставка победителя + ставка проигравшего
                const platformCommission = totalAmount * 0.10; // 10% комиссии с общей суммы
                const winnerGetsAmount = totalAmount - platformCommission; // победитель получает 90% от общей суммы
                
                platformRevenue = platformCommission;
                description = `Win commission from ${gameType} game (winner: ${winner.user.username})`;

                // Добавляем победителю выигрыш (ставки уже списаны при входе)
                const updatedWinner = await User.findByIdAndUpdate(
                    winner.user._id,
                    { $inc: { balance: winnerGetsAmount } },
                    { new: true, session }
                );

                // Проигравший уже потерял свою ставку при входе в игру
                const updatedLoser = await User.findById(loser.user._id, null, { session });

                winnerNewBalance = updatedWinner?.balance;
                loserNewBalance = updatedLoser?.balance;
            }

            // Создаем запись о доходе платформы
            const revenueRecord = new PlatformRevenue({
                source: 'LOBBY',
                gameType,
                amount: platformRevenue,
                commissionRate,
                description,
                gameId: roomId,
                players: [
                    {
                        playerId: this.getValidPlayerId(winner.user._id),
                        username: winner.user.username,
                        betAmount,
                        result: isDraw ? 'DRAW' : 'WIN',
                        isBot: winner.user._id.toString().startsWith('bot') || winner.user._id === 'bot'
                    },
                    {
                        playerId: this.getValidPlayerId(loser.user._id),
                        username: loser.user.username,
                        betAmount,
                        result: isDraw ? 'DRAW' : 'LOSE',
                        isBot: loser.user._id.toString().startsWith('bot') || loser.user._id === 'bot'
                    }
                ]
            });

            await revenueRecord.save({ session });
            await session.commitTransaction();

            console.log(`[PlatformRevenue] ✅ Lobby game revenue processed successfully:`);
            console.log(`  - Amount: $${platformRevenue}`);
            console.log(`  - Game Type: ${gameType}`);
            console.log(`  - Room ID: ${roomId}`);
            console.log(`  - Description: ${description}`);
            console.log(`  - Players:`, revenueRecord.players.map(p => `${p.username} (${p.result})`));
            console.log(`  - Record ID: ${revenueRecord._id}`);

            return {
                winnerNewBalance,
                loserNewBalance,
                platformRevenue,
                revenueRecord
            };

        } catch (error: any) {
            await session.abortTransaction();
            console.error('[PlatformRevenue] ❌ Error processing lobby game revenue:', error);
            console.error('[PlatformRevenue] Error details:', {
                roomId,
                gameType,
                betAmount,
                isDraw,
                isPlayerVsBotScenario,
                error: error?.message || 'Unknown error',
                stack: error?.stack || 'No stack trace'
            });
            throw error;
        } finally {
            session.endSession();
        }
    }

    /**
     * Обработка доходов от турнира
     */
    static async processTournamentRevenue(
        tournamentId: string,
        totalEntryFees: number,
        totalPrizePaid: number,
        participantsCount: number
    ): Promise<IPlatformRevenue> {
        try {
            const tournament = await Tournament.findById(tournamentId);
            if (!tournament) {
                throw new Error('Tournament not found');
            }

            // Доход платформы = общие взносы - выплаченные призы
            const platformRevenue = totalEntryFees - totalPrizePaid;
            const commissionRate = ((platformRevenue / totalEntryFees) * 100);

            const revenueRecord = new PlatformRevenue({
                source: 'TOURNAMENT',
                tournamentId: new mongoose.Types.ObjectId(tournamentId),
                amount: platformRevenue,
                commissionRate,
                description: `Tournament "${tournament.name}" completed with ${participantsCount} participants`,
                players: [] // Для турниров не детализируем игроков в этой записи
            });

            await revenueRecord.save();

            console.log(`[PlatformRevenue] Tournament revenue processed: $${platformRevenue} from tournament ${tournament.name}`);

            return revenueRecord;

        } catch (error) {
            console.error('[PlatformRevenue] Error processing tournament revenue:', error);
            throw error;
        }
    }

    /**
     * Получение статистики доходов платформы
     */
    static async getRevenueStats(startDate?: Date, endDate?: Date) {
        try {
            const matchStage: any = {};
            
            if (startDate || endDate) {
                matchStage.createdAt = {};
                if (startDate) matchStage.createdAt.$gte = startDate;
                if (endDate) matchStage.createdAt.$lte = endDate;
            }

            const stats = await PlatformRevenue.aggregate([
                { $match: matchStage },
                {
                    $group: {
                        _id: '$source',
                        totalRevenue: { $sum: '$amount' },
                        count: { $sum: 1 },
                        averageRevenue: { $avg: '$amount' }
                    }
                }
            ]);

            const lobbyStats = stats.find(s => s._id === 'LOBBY') || { totalRevenue: 0, count: 0, averageRevenue: 0 };
            const tournamentStats = stats.find(s => s._id === 'TOURNAMENT') || { totalRevenue: 0, count: 0, averageRevenue: 0 };

            const totalRevenue = lobbyStats.totalRevenue + tournamentStats.totalRevenue;

            return {
                total: {
                    revenue: totalRevenue,
                    transactions: lobbyStats.count + tournamentStats.count
                },
                lobby: {
                    revenue: lobbyStats.totalRevenue,
                    gamesCount: lobbyStats.count,
                    averageRevenue: lobbyStats.averageRevenue
                },
                tournaments: {
                    revenue: tournamentStats.totalRevenue,
                    tournamentsCount: tournamentStats.count,
                    averageRevenue: tournamentStats.averageRevenue
                }
            };

        } catch (error) {
            console.error('[PlatformRevenue] Error getting revenue stats:', error);
            throw error;
        }
    }

    /**
     * Получение детализированного списка доходов
     */
    static async getRevenueHistory(
        page: number = 1,
        limit: number = 20,
        source?: 'LOBBY' | 'TOURNAMENT',
        startDate?: Date,
        endDate?: Date
    ) {
        try {
            const filter: any = {};
            
            if (source) filter.source = source;
            if (startDate || endDate) {
                filter.createdAt = {};
                if (startDate) filter.createdAt.$gte = startDate;
                if (endDate) filter.createdAt.$lte = endDate;
            }

            const skip = (page - 1) * limit;

            const [revenues, total] = await Promise.all([
                PlatformRevenue.find(filter)
                    .populate('tournamentId', 'name status')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean(),
                PlatformRevenue.countDocuments(filter)
            ]);

            return {
                revenues,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            };

        } catch (error) {
            console.error('[PlatformRevenue] Error getting revenue history:', error);
            throw error;
        }
    }

    /**
     * Получает валидный ObjectId для игрока (включая ботов)
     */
    private static getValidPlayerId(playerId: any): mongoose.Types.ObjectId {
        // Если это строка "bot" или начинается с "bot-", используем специальный ObjectId
        if (typeof playerId === 'string' && (playerId === 'bot' || playerId.startsWith('bot-'))) {
            return BOT_OBJECT_ID;
        }
        
        // Если это уже ObjectId, возвращаем как есть
        if (playerId instanceof mongoose.Types.ObjectId) {
            return playerId;
        }
        
        // Пытаемся преобразовать в ObjectId
        try {
            return new mongoose.Types.ObjectId(playerId);
        } catch (error) {
            console.warn(`[PlatformRevenue] Invalid playerId: ${playerId}, using BOT_OBJECT_ID`);
            return BOT_OBJECT_ID;
        }
    }
}

export default PlatformRevenueService;