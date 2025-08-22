import axios from 'axios';
import { API_URL } from '../api';

const api = axios.create({
    baseURL: API_URL,
});

// Добавляем токен авторизации к каждому запросу
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('crm_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface TournamentTemplate {
    _id: string;
    name: string;
    gameType: 'tic-tac-toe' | 'checkers' | 'chess' | 'backgammon' | 'durak' | 'domino' | 'dice' | 'bingo';
    maxPlayers: 4 | 8 | 16 | 32;
    entryFee: number;
    platformCommission: number;
    isActive: boolean;
    
    schedule: {
        type: 'interval' | 'fixed_time' | 'dynamic';
        intervalMinutes?: number;
        fixedTimes?: string[];
        dynamicRules?: {
            minActiveTournaments: number;
            maxActiveTournaments: number;
            minPlayersOnline: number;
        };
    };
    
    timeSettings: {
        timeZone: string;
        daysOfWeek: number[];
        startHour: number;
        endHour: number;
    };
    
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    lastTournamentCreated?: string;
    totalTournamentsCreated: number;
    
    stats: {
        totalPlayers: number;
        totalPrizePool: number;
        averagePlayerCount: number;
        successRate: number;
    };
}

export interface SchedulerStats {
    totalTemplates: number;
    activeTemplates: number;
    tournamentsCreatedToday: number;
    lastCheck: string;
    nextScheduledCheck: string;
    isRunning: boolean;
}

export interface IPaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface ITemplatesResponse {
    data: TournamentTemplate[];
    pagination: IPaginationInfo;
}

export interface ITemplatesQuery {
    page?: number;
    limit?: number;
    status?: string;
    gameType?: string;
    search?: string;
}

class TournamentTemplateService {
    async getAllTemplates(query?: ITemplatesQuery): Promise<ITemplatesResponse> {
        const params = new URLSearchParams();
        
        if (query?.page) params.append('page', query.page.toString());
        if (query?.limit) params.append('limit', query.limit.toString());
        if (query?.status) params.append('status', query.status);
        if (query?.gameType) params.append('gameType', query.gameType);
        if (query?.search) params.append('search', query.search);

        const response = await api.get(`/api/tournament-templates?${params.toString()}`);
        return response.data;
    }

    async getAllTemplatesLegacy(): Promise<TournamentTemplate[]> {
        const response = await api.get('/api/tournament-templates');
        return response.data.data;
    }

    async getActiveTemplates(): Promise<TournamentTemplate[]> {
        const response = await api.get('/api/tournament-templates/active');
        return response.data.data;
    }

    async createTemplate(templateData: any): Promise<TournamentTemplate> {
        const response = await api.post('/api/tournament-templates', templateData);
        return response.data.data;
    }

    async updateTemplate(templateId: string, updateData: any): Promise<TournamentTemplate> {
        const response = await api.put(`/api/tournament-templates/${templateId}`, updateData);
        return response.data.data;
    }

    async deleteTemplate(templateId: string): Promise<void> {
        await api.delete(`/api/tournament-templates/${templateId}`);
    }

    async toggleTemplateActive(templateId: string): Promise<TournamentTemplate> {
        const response = await api.patch(`/api/tournament-templates/${templateId}/toggle`);
        return response.data.data;
    }

    async getSchedulerStats(): Promise<SchedulerStats> {
        const response = await api.get('/api/tournament-templates/scheduler/stats');
        return response.data.data;
    }

    async forceSchedulerCheck(): Promise<void> {
        await api.post('/api/tournament-templates/scheduler/force-check');
    }

    async startScheduler(): Promise<void> {
        await api.post('/api/tournament-templates/scheduler/start');
    }

    async stopScheduler(): Promise<void> {
        await api.post('/api/tournament-templates/scheduler/stop');
    }

    async createDefaultTemplates(): Promise<void> {
        await api.post('/api/tournament-templates/defaults');
    }
}

export const tournamentTemplateService = new TournamentTemplateService();
export default tournamentTemplateService;