import axios from 'axios';
import { API_URL } from '../api/index';

export interface INotification {
    _id: string;
    user: string;
    title: string;
    message: string;
    link?: string;
    isRead: boolean;
    createdAt: string;
}

export interface IPaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface INotificationsResponse {
    notifications: INotification[];
    pagination: IPaginationInfo;
}

export const getMyNotifications = async (page: number = 1, limit: number = 10): Promise<INotificationsResponse> => {
    const { data } = await axios.get(`${API_URL}/api/notifications`, {
        params: { page, limit: Math.min(limit, 10) }
    });
    return data;
};

export const markNotificationsAsRead = async (): Promise<{ message: string }> => {
    const { data } = await axios.post(`${API_URL}/api/notifications/read`);
    return data;
};

export const markNotificationAsRead = async (id: string): Promise<{ message: string; notification: INotification }> => {
    const { data } = await axios.post(`${API_URL}/api/notifications/${id}/read`);
    return data;
};