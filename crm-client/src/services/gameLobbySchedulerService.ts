import axios from 'axios';
import { API_URL } from '../api';

const api = axios.create({
    baseURL: API_URL,
});

// Добавляем токен авторизации к каждому запросу
api.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('crm_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface LobbySchedulerStats {
    isRunning: boolean;
    lastCheck: string;
    nextScheduledCheck: string;
    roomsCreated: {
        [gameType: string]: number;
    };
    totalRoomsCreated: number;
    lobbyStats: {
        [gameType: string]: {
            emptyRooms: number;
            totalRooms: number;
        };
    };
}

class GameLobbySchedulerService {
    async getSchedulerStats(): Promise<LobbySchedulerStats> {
        try {
            const response = await api.get('/api/game-lobby-scheduler/stats');
            return response.data.data;
        } catch (error: any) {
            console.error('Error getting lobby scheduler stats:', error);
            throw new Error(error.response?.data?.message || 'Failed to get lobby scheduler stats');
        }
    }

    async getLobbyStats(): Promise<{ [gameType: string]: { emptyRooms: number; totalRooms: number } }> {
        try {
            const response = await api.get('/api/game-lobby-scheduler/lobby-stats');
            return response.data.data;
        } catch (error: any) {
            console.error('Error getting lobby stats:', error);
            throw new Error(error.response?.data?.message || 'Failed to get lobby stats');
        }
    }

    async forceSchedulerCheck(): Promise<void> {
        try {
            await api.post('/api/game-lobby-scheduler/force-check');
        } catch (error: any) {
            console.error('Error forcing lobby scheduler check:', error);
            throw new Error(error.response?.data?.message || 'Failed to force lobby scheduler check');
        }
    }

    async startScheduler(): Promise<void> {
        try {
            await api.post('/api/game-lobby-scheduler/start');
        } catch (error: any) {
            console.error('Error starting lobby scheduler:', error);
            throw new Error(error.response?.data?.message || 'Failed to start lobby scheduler');
        }
    }

    async stopScheduler(): Promise<void> {
        try {
            await api.post('/api/game-lobby-scheduler/stop');
        } catch (error: any) {
            console.error('Error stopping lobby scheduler:', error);
            throw new Error(error.response?.data?.message || 'Failed to stop lobby scheduler');
        }
    }

    async cleanupOldRooms(): Promise<void> {
        try {
            await api.post('/api/game-lobby-scheduler/cleanup');
        } catch (error: any) {
            console.error('Error cleaning up old rooms:', error);
            throw new Error(error.response?.data?.message || 'Failed to cleanup old rooms');
        }
    }
}

export const gameLobbySchedulerService = new GameLobbySchedulerService();
export default gameLobbySchedulerService;