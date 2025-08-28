import { Request, Response } from 'express';
import PlatformRevenueService from '../services/platformRevenue.service';

/**
 * Контроллер для управления доходами платформы
 */
export class PlatformRevenueController {
    /**
     * Получение статистики доходов платформы
     * GET /api/platform-revenue/stats
     */
    static async getRevenueStats(req: Request, res: Response) {
        try {
            console.log(`[PlatformRevenueController] 📊 GET /stats called by user:`, req.user?.username || 'unknown');
            
            // Проверяем права администратора
            if (req.user?.role !== 'ADMIN') {
                console.log(`[PlatformRevenueController] ❌ Access denied for user role:`, req.user?.role);
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. Admin rights required.'
                });
            }

            const { startDate, endDate } = req.query;
            console.log(`[PlatformRevenueController] Query params:`, { startDate, endDate });
            
            let start: Date | undefined;
            let end: Date | undefined;
            
            if (startDate) {
                start = new Date(startDate as string);
                if (isNaN(start.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid start date format'
                    });
                }
            }
            
            if (endDate) {
                end = new Date(endDate as string);
                if (isNaN(end.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid end date format'
                    });
                }
            }

            console.log(`[PlatformRevenueController] Calling getRevenueStats with dates:`, { start, end });
            const stats = await PlatformRevenueService.getRevenueStats(start, end);
            console.log(`[PlatformRevenueController] ✅ Revenue stats result:`, stats);

            res.json({
                success: true,
                data: stats
            });

        } catch (error) {
            console.error('[PlatformRevenueController] ❌ Error getting revenue stats:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    /**
     * Получение истории доходов платформы
     * GET /api/platform-revenue/history
     */
    static async getRevenueHistory(req: Request, res: Response) {
        try {
            console.log(`[PlatformRevenueController] 📋 GET /history called by user:`, req.user?.username || 'unknown');
            
            // Проверяем права администратора
            if (req.user?.role !== 'ADMIN') {
                console.log(`[PlatformRevenueController] ❌ Access denied for user role:`, req.user?.role);
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. Admin rights required.'
                });
            }

            const {
                page = '1',
                limit = '20',
                source,
                startDate,
                endDate
            } = req.query;

            console.log(`[PlatformRevenueController] History query params:`, { page, limit, source, startDate, endDate });

            const pageNum = parseInt(page as string, 10);
            const limitNum = parseInt(limit as string, 10);

            if (isNaN(pageNum) || pageNum < 1) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid page number'
                });
            }

            if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid limit (must be between 1 and 100)'
                });
            }

            if (source && !['LOBBY', 'TOURNAMENT'].includes(source as string)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid source (must be LOBBY or TOURNAMENT)'
                });
            }

            let start: Date | undefined;
            let end: Date | undefined;
            
            if (startDate) {
                start = new Date(startDate as string);
                if (isNaN(start.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid start date format'
                    });
                }
            }
            
            if (endDate) {
                end = new Date(endDate as string);
                if (isNaN(end.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid end date format'
                    });
                }
            }

            console.log(`[PlatformRevenueController] Calling getRevenueHistory...`);
            const result = await PlatformRevenueService.getRevenueHistory(
                pageNum,
                limitNum,
                source as 'LOBBY' | 'TOURNAMENT' | undefined,
                start,
                end
            );

            console.log(`[PlatformRevenueController] ✅ Revenue history result:`, {
                totalRevenues: result.revenues.length,
                pagination: result.pagination
            });

            res.json({
                success: true,
                data: result
            });

        } catch (error) {
            console.error('[PlatformRevenueController] ❌ Error getting revenue history:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    /**
     * Получение детальной аналитики доходов за период
     * GET /api/platform-revenue/analytics
     */
    static async getRevenueAnalytics(req: Request, res: Response) {
        try {
            // Проверяем права администратора
            if (req.user?.role !== 'ADMIN') {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. Admin rights required.'
                });
            }

            const { period = 'week' } = req.query;
            
            let startDate: Date;
            const endDate = new Date();
            
            switch (period) {
                case 'day':
                    startDate = new Date();
                    startDate.setHours(0, 0, 0, 0);
                    break;
                case 'week':
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() - 7);
                    break;
                case 'month':
                    startDate = new Date();
                    startDate.setMonth(startDate.getMonth() - 1);
                    break;
                case 'year':
                    startDate = new Date();
                    startDate.setFullYear(startDate.getFullYear() - 1);
                    break;
                default:
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid period (must be day, week, month, or year)'
                    });
            }

            const [stats, history] = await Promise.all([
                PlatformRevenueService.getRevenueStats(startDate, endDate),
                PlatformRevenueService.getRevenueHistory(1, 100, undefined, startDate, endDate)
            ]);

            // Группировка по дням для графика
            const dailyRevenue: Record<string, { lobby: number; tournament: number; total: number }> = {};
            
            history.revenues.forEach(revenue => {
                const dateKey = revenue.createdAt.toISOString().split('T')[0];
                if (!dailyRevenue[dateKey]) {
                    dailyRevenue[dateKey] = { lobby: 0, tournament: 0, total: 0 };
                }
                
                if (revenue.source === 'LOBBY') {
                    dailyRevenue[dateKey].lobby += revenue.amount;
                } else {
                    dailyRevenue[dateKey].tournament += revenue.amount;
                }
                dailyRevenue[dateKey].total += revenue.amount;
            });

            const chartData = Object.entries(dailyRevenue)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([date, data]) => ({
                    date,
                    ...data
                }));

            res.json({
                success: true,
                data: {
                    period,
                    startDate,
                    endDate,
                    stats,
                    chartData,
                    recentTransactions: history.revenues.slice(0, 10)
                }
            });

        } catch (error) {
            console.error('[PlatformRevenueController] Error getting revenue analytics:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    /**
     * Получение топ игроков по доходам платформы
     * GET /api/platform-revenue/top-players
     */
    static async getTopRevenueGenerators(req: Request, res: Response) {
        try {
            // Проверяем права администратора
            if (req.user?.role !== 'ADMIN') {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. Admin rights required.'
                });
            }

            const { limit = '10', period = 'month' } = req.query;
            const limitNum = parseInt(limit as string, 10);

            if (isNaN(limitNum) || limitNum < 1 || limitNum > 50) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid limit (must be between 1 and 50)'
                });
            }

            let startDate: Date;
            const endDate = new Date();
            
            switch (period) {
                case 'week':
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() - 7);
                    break;
                case 'month':
                    startDate = new Date();
                    startDate.setMonth(startDate.getMonth() - 1);
                    break;
                case 'year':
                    startDate = new Date();
                    startDate.setFullYear(startDate.getFullYear() - 1);
                    break;
                default:
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid period (must be week, month, or year)'
                    });
            }

            // Получаем доходы и группируем по игрокам
            const history = await PlatformRevenueService.getRevenueHistory(
                1, 
                1000, 
                'LOBBY', // только лобби игры имеют детализацию по игрокам
                startDate, 
                endDate
            );

            const playerRevenue: Record<string, { 
                username: string; 
                totalRevenue: number; 
                gamesCount: number; 
                avgRevenue: number;
            }> = {};

            history.revenues.forEach(revenue => {
                revenue.players?.forEach(player => {
                    if (!playerRevenue[player.playerId.toString()]) {
                        playerRevenue[player.playerId.toString()] = {
                            username: player.username,
                            totalRevenue: 0,
                            gamesCount: 0,
                            avgRevenue: 0
                        };
                    }
                    
                    // Добавляем долю дохода игрока (половину от общего дохода игры)
                    playerRevenue[player.playerId.toString()].totalRevenue += revenue.amount / 2;
                    playerRevenue[player.playerId.toString()].gamesCount += 1;
                });
            });

            // Вычисляем средний доход и сортируем
            const topPlayers = Object.values(playerRevenue)
                .map(player => ({
                    ...player,
                    avgRevenue: player.totalRevenue / player.gamesCount
                }))
                .sort((a, b) => b.totalRevenue - a.totalRevenue)
                .slice(0, limitNum);

            res.json({
                success: true,
                data: {
                    period,
                    startDate,
                    endDate,
                    topPlayers
                }
            });

        } catch (error) {
            console.error('[PlatformRevenueController] Error getting top revenue generators:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}

export default PlatformRevenueController;