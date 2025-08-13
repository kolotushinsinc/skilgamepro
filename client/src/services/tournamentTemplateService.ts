import api from './api';

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

export interface CreateTournamentTemplateRequest {
    name: string;
    gameType: TournamentTemplate['gameType'];
    maxPlayers: TournamentTemplate['maxPlayers'];
    entryFee: number;
    platformCommission?: number;
    schedule: TournamentTemplate['schedule'];
    timeSettings?: TournamentTemplate['timeSettings'];
}

export interface SchedulerStats {
    totalTemplates: number;
    activeTemplates: number;
    tournamentsCreatedToday: number;
    lastCheck: string;
    nextScheduledCheck: string;
    isRunning: boolean;
}

class TournamentTemplateService {
    // Получить все шаблоны
    async getAllTemplates(): Promise<TournamentTemplate[]> {
        try {
            const response = await api.get('/tournament-templates');
            return response.data.data;
        } catch (error: any) {
            console.error('Error getting tournament templates:', error);
            throw new Error(error.response?.data?.message || 'Failed to get tournament templates');
        }
    }

    // Получить активные шаблоны
    async getActiveTemplates(): Promise<TournamentTemplate[]> {
        try {
            const response = await api.get('/tournament-templates/active');
            return response.data.data;
        } catch (error: any) {
            console.error('Error getting active tournament templates:', error);
            throw new Error(error.response?.data?.message || 'Failed to get active tournament templates');
        }
    }

    // Получить конкретный шаблон
    async getTemplate(templateId: string): Promise<TournamentTemplate> {
        try {
            const response = await api.get(`/tournament-templates/${templateId}`);
            return response.data.data;
        } catch (error: any) {
            console.error('Error getting tournament template:', error);
            throw new Error(error.response?.data?.message || 'Failed to get tournament template');
        }
    }

    // Создать новый шаблон
    async createTemplate(templateData: CreateTournamentTemplateRequest): Promise<TournamentTemplate> {
        try {
            const response = await api.post('/tournament-templates', templateData);
            return response.data.data;
        } catch (error: any) {
            console.error('Error creating tournament template:', error);
            throw new Error(error.response?.data?.message || 'Failed to create tournament template');
        }
    }

    // Обновить шаблон
    async updateTemplate(templateId: string, updateData: Partial<CreateTournamentTemplateRequest>): Promise<TournamentTemplate> {
        try {
            const response = await api.put(`/tournament-templates/${templateId}`, updateData);
            return response.data.data;
        } catch (error: any) {
            console.error('Error updating tournament template:', error);
            throw new Error(error.response?.data?.message || 'Failed to update tournament template');
        }
    }

    // Удалить шаблон
    async deleteTemplate(templateId: string): Promise<void> {
        try {
            await api.delete(`/tournament-templates/${templateId}`);
        } catch (error: any) {
            console.error('Error deleting tournament template:', error);
            throw new Error(error.response?.data?.message || 'Failed to delete tournament template');
        }
    }

    // Переключить активность шаблона
    async toggleTemplateActive(templateId: string): Promise<TournamentTemplate> {
        try {
            const response = await api.patch(`/tournament-templates/${templateId}/toggle`);
            return response.data.data;
        } catch (error: any) {
            console.error('Error toggling tournament template:', error);
            throw new Error(error.response?.data?.message || 'Failed to toggle tournament template');
        }
    }

    // Получить статистику планировщика
    async getSchedulerStats(): Promise<SchedulerStats> {
        try {
            const response = await api.get('/tournament-templates/scheduler/stats');
            return response.data.data;
        } catch (error: any) {
            console.error('Error getting scheduler stats:', error);
            throw new Error(error.response?.data?.message || 'Failed to get scheduler stats');
        }
    }

    // Принудительная проверка планировщика
    async forceSchedulerCheck(): Promise<void> {
        try {
            await api.post('/tournament-templates/scheduler/force-check');
        } catch (error: any) {
            console.error('Error forcing scheduler check:', error);
            throw new Error(error.response?.data?.message || 'Failed to force scheduler check');
        }
    }

    // Запуск планировщика
    async startScheduler(): Promise<void> {
        try {
            await api.post('/tournament-templates/scheduler/start');
        } catch (error: any) {
            console.error('Error starting scheduler:', error);
            throw new Error(error.response?.data?.message || 'Failed to start scheduler');
        }
    }

    // Остановка планировщика
    async stopScheduler(): Promise<void> {
        try {
            await api.post('/tournament-templates/scheduler/stop');
        } catch (error: any) {
            console.error('Error stopping scheduler:', error);
            throw new Error(error.response?.data?.message || 'Failed to stop scheduler');
        }
    }

    // Создать базовые шаблоны
    async createDefaultTemplates(): Promise<void> {
        try {
            await api.post('/tournament-templates/defaults');
        } catch (error: any) {
            console.error('Error creating default templates:', error);
            throw new Error(error.response?.data?.message || 'Failed to create default templates');
        }
    }

    // Форматирование данных
    formatGameType(gameType: TournamentTemplate['gameType']): string {
        const gameTypeNames = {
            'tic-tac-toe': 'Tic-Tac-Toe',
            'checkers': 'Checkers',
            'chess': 'Chess',
            'backgammon': 'Backgammon',
            'durak': 'Durak',
            'domino': 'Domino',
            'dice': 'Dice',
            'bingo': 'Bingo'
        };
        return gameTypeNames[gameType];
    }

    formatScheduleType(scheduleType: TournamentTemplate['schedule']['type']): string {
        const scheduleTypeNames = {
            'interval': 'По интервалу',
            'fixed_time': 'По расписанию',
            'dynamic': 'Динамический'
        };
        return scheduleTypeNames[scheduleType];
    }

    formatDaysOfWeek(daysOfWeek: number[]): string {
        const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        if (daysOfWeek.length === 7) return 'Каждый день';
        if (daysOfWeek.length === 5 && !daysOfWeek.includes(0) && !daysOfWeek.includes(6)) return 'Будни';
        if (daysOfWeek.length === 2 && daysOfWeek.includes(0) && daysOfWeek.includes(6)) return 'Выходные';
        
        return daysOfWeek.map(day => dayNames[day]).join(', ');
    }

    formatTimeRange(startHour: number, endHour: number): string {
        const formatHour = (hour: number) => hour.toString().padStart(2, '0') + ':00';
        
        if (startHour === 0 && endHour === 23) return '24/7';
        if (endHour < startHour) return `${formatHour(startHour)} - ${formatHour(endHour)} (через полночь)`;
        
        return `${formatHour(startHour)} - ${formatHour(endHour)}`;
    }

    formatScheduleDescription(template: TournamentTemplate): string {
        const schedule = template.schedule;
        
        switch (schedule.type) {
            case 'interval':
                if (schedule.intervalMinutes) {
                    const hours = Math.floor(schedule.intervalMinutes / 60);
                    const minutes = schedule.intervalMinutes % 60;
                    if (hours > 0 && minutes > 0) {
                        return `Каждые ${hours}ч ${minutes}м`;
                    } else if (hours > 0) {
                        return `Каждые ${hours} час(ов)`;
                    } else {
                        return `Каждые ${minutes} мин`;
                    }
                }
                return 'По интервалу';
                
            case 'fixed_time':
                if (schedule.fixedTimes && schedule.fixedTimes.length > 0) {
                    return `В ${schedule.fixedTimes.join(', ')}`;
                }
                return 'По расписанию';
                
            case 'dynamic':
                if (schedule.dynamicRules) {
                    const rules = schedule.dynamicRules;
                    return `При ${rules.minPlayersOnline}+ игроках онлайн, макс ${rules.maxActiveTournaments} турниров`;
                }
                return 'Динамический';
                
            default:
                return 'Неизвестный тип';
        }
    }

    // Валидация данных
    validateTemplateData(data: CreateTournamentTemplateRequest): string[] {
        const errors: string[] = [];

        if (!data.name || data.name.trim().length === 0) {
            errors.push('Название шаблона обязательно');
        }

        if (!data.gameType) {
            errors.push('Тип игры обязателен');
        }

        if (!data.maxPlayers || ![4, 8, 16, 32].includes(data.maxPlayers)) {
            errors.push('Количество игроков должно быть 4, 8, 16 или 32');
        }

        if (data.entryFee < 0) {
            errors.push('Стоимость участия не может быть отрицательной');
        }

        if (data.platformCommission !== undefined && (data.platformCommission < 0 || data.platformCommission > 50)) {
            errors.push('Комиссия платформы должна быть от 0 до 50%');
        }

        if (!data.schedule || !data.schedule.type) {
            errors.push('Тип расписания обязателен');
        }

        if (data.schedule) {
            switch (data.schedule.type) {
                case 'interval':
                    if (!data.schedule.intervalMinutes || data.schedule.intervalMinutes < 5) {
                        errors.push('Интервал должен быть не менее 5 минут');
                    }
                    break;
                case 'fixed_time':
                    if (!data.schedule.fixedTimes || data.schedule.fixedTimes.length === 0) {
                        errors.push('Для фиксированного расписания нужно указать время');
                    }
                    break;
                case 'dynamic':
                    if (!data.schedule.dynamicRules) {
                        errors.push('Для динамического расписания нужно указать правила');
                    }
                    break;
            }
        }

        return errors;
    }
}

export const tournamentTemplateService = new TournamentTemplateService();
export default tournamentTemplateService;