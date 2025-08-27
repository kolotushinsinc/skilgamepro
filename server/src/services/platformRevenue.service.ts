import PlatformRevenue, { IPlatformRevenue } from '../models/PlatformRevenue.model';
import User from '../models/User.model';
import Tournament from '../models/Tournament.model';
import mongoose from 'mongoose';

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
        isDraw: boolean = false
    ): Promise<{ 
        winnerNewBalance?: number; 
        loserNewBalance?: number; 
        platformRevenue: number;
        revenueRecord: IPlatformRevenue 
    }> {
        const session = await mongoose.startSession();
        
        try {
            await session.startTransaction();

            let winnerNewBalance: number | undefined;
            let loserNewBalance: number | undefined;
            let platformRevenue: number;
            let description: string;
            let commissionRate: number;

            if (isDraw) {
                // Ничья: с каждого игрока 5% комиссии, остальное возвращается
                commissionRate = 5;
                const commissionPerPlayer = betAmount * 0.05;
                const returnAmount = betAmount - commissionPerPlayer;
                
                platformRevenue = commissionPerPlayer * 2; // с двух игроков
                description = `Draw commission from ${gameType} game`;

                // Обновляем балансы игроков (возвращаем 95% ставки)
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
                // Победа: победитель получает всю ставку проигравшего + свою ставку
                // От общей суммы берется 10% комиссии платформе
                commissionRate = 10;
                const totalAmount = betAmount * 2; // ставка победителя + ставка проигравшего
                const platformCommission = totalAmount * 0.10; // 10% комиссии с общей суммы
                const winnerGetsTotal = totalAmount; // победитель получает всё
                const winnerNetAmount = winnerGetsTotal - platformCommission; // за вычетом комиссии
                
                platformRevenue = platformCommission;
                description = `Win commission from ${gameType} game (winner: ${winner.user.username})`;

                // Обновляем баланс победителя: он получает свою ставку + ставку противника - 10% комиссии
                const updatedWinner = await User.findByIdAndUpdate(
                    winner.user._id,
                    { $inc: { balance: winnerNetAmount } },
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
                        playerId: winner.user._id,
                        username: winner.user.username,
                        betAmount,
                        result: isDraw ? 'DRAW' : 'WIN',
                        isBot: winner.user._id.toString().startsWith('bot-')
                    },
                    {
                        playerId: loser.user._id,
                        username: loser.user.username,
                        betAmount,
                        result: isDraw ? 'DRAW' : 'LOSE',
                        isBot: loser.user._id.toString().startsWith('bot-')
                    }
                ]
            });

            await revenueRecord.save({ session });
            await session.commitTransaction();

            console.log(`[PlatformRevenue] Lobby game revenue processed: $${platformRevenue} from ${gameType} game`);

            return {
                winnerNewBalance,
                loserNewBalance,
                platformRevenue,
                revenueRecord
            };

        } catch (error) {
            await session.abortTransaction();
            console.error('[PlatformRevenue] Error processing lobby game revenue:', error);
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
}

export default PlatformRevenueService;