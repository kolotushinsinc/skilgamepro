import axios from 'axios';
import { API_URL } from '../api';

export interface PlatformRevenueStats {
    total: {
        revenue: number;
        transactions: number;
    };
    lobby: {
        revenue: number;
        gamesCount: number;
        averageRevenue: number;
    };
    tournaments: {
        revenue: number;
        tournamentsCount: number;
        averageRevenue: number;
    };
}

export interface RevenueHistoryItem {
    _id: string;
    source: 'LOBBY' | 'TOURNAMENT';
    gameType?: string;
    amount: number;
    commissionRate: number;
    description: string;
    gameId?: string;
    tournamentId?: {
        _id: string;
        name: string;
        status: string;
    };
    players?: Array<{
        playerId: string;
        username: string;
        betAmount: number;
        result: 'WIN' | 'LOSE' | 'DRAW';
        isBot: boolean;
    }>;
    createdAt: string;
}

export interface RevenueHistory {
    revenues: RevenueHistoryItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface RevenueAnalytics {
    period: string;
    startDate: string;
    endDate: string;
    stats: PlatformRevenueStats;
    chartData: Array<{
        date: string;
        lobby: number;
        tournament: number;
        total: number;
    }>;
    recentTransactions: RevenueHistoryItem[];
}

export interface TopRevenuePlayer {
    username: string;
    totalRevenue: number;
    gamesCount: number;
    avgRevenue: number;
}

export interface TopRevenuePlayersResponse {
    period: string;
    startDate: string;
    endDate: string;
    topPlayers: TopRevenuePlayer[];
}

/**
 * Получение статистики доходов платформы
 */
export const getRevenueStats = async (params?: {
    startDate?: string;
    endDate?: string;
}): Promise<PlatformRevenueStats> => {
    const queryParams = new URLSearchParams();
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    
    const token = localStorage.getItem('crm_token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    
    const response = await axios.get(`${API_URL}/api/platform-revenue/stats?${queryParams.toString()}`, config);
    return response.data.data;
};

/**
 * Получение истории доходов платформы
 */
export const getRevenueHistory = async (params?: {
    page?: number;
    limit?: number;
    source?: 'LOBBY' | 'TOURNAMENT';
    startDate?: string;
    endDate?: string;
}): Promise<RevenueHistory> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.source) queryParams.append('source', params.source);
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    
    const token = localStorage.getItem('crm_token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    
    const response = await axios.get(`${API_URL}/api/platform-revenue/history?${queryParams.toString()}`, config);
    return response.data.data;
};

/**
 * Получение детальной аналитики доходов
 */
export const getRevenueAnalytics = async (period: 'day' | 'week' | 'month' | 'year' = 'week'): Promise<RevenueAnalytics> => {
    const token = localStorage.getItem('crm_token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    
    const response = await axios.get(`${API_URL}/api/platform-revenue/analytics?period=${period}`, config);
    return response.data.data;
};

/**
 * Получение топ игроков по доходам платформы
 */
export const getTopRevenueGenerators = async (params?: {
    limit?: number;
    period?: 'week' | 'month' | 'year';
}): Promise<TopRevenuePlayersResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.period) queryParams.append('period', params.period);
    
    const token = localStorage.getItem('crm_token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    
    const response = await axios.get(`${API_URL}/api/platform-revenue/top-players?${queryParams.toString()}`, config);
    return response.data.data;
};

/**
 * Форматирование валюты
 */
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

/**
 * Форматирование числа
 */
export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Форматирование процента
 */
export const formatPercentage = (percentage: number): string => {
    return `${percentage.toFixed(1)}%`;
};

/**
 * Вычисление роста в процентах
 */
export const calculateGrowthPercentage = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
};

export default {
    getRevenueStats,
    getRevenueHistory,
    getRevenueAnalytics,
    getTopRevenueGenerators,
    formatCurrency,
    formatNumber,
    formatPercentage,
    calculateGrowthPercentage
};