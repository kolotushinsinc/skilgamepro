import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useSocket } from './SocketContext';
import { getMyNotifications, markNotificationsAsRead, getUnreadCount, INotification, IPaginationInfo } from '../services/notificationService';
import { useAuth } from './AuthContext';

interface NotificationContextType {
    notifications: INotification[];
    unreadCount: number;
    pagination: IPaginationInfo | null;
    isLoading: boolean;
    error: string;
    fetchNotifications: (page?: number, limit?: number) => Promise<void>;
    refreshUnreadCount: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const { socket } = useSocket();
    const { isAuthenticated } = useAuth();
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [pagination, setPagination] = useState<IPaginationInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchNotifications = useCallback(async (page: number = 1, limit: number = 10) => {
        if (!isAuthenticated) return;
        
        setIsLoading(true);
        setError('');
        
        try {
            const response = await getMyNotifications(page, limit);
            setNotifications(response.notifications);
            setPagination(response.pagination);
        } catch (error: any) {
            console.error("Failed to fetch notifications", error);
            setError(error.response?.data?.message || 'Failed to load notifications');
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated]);

    const refreshUnreadCount = useCallback(async () => {
        if (!isAuthenticated) return;
        
        try {
            const response = await getUnreadCount();
            console.log('NotificationContext - unread count:', response.unreadCount);
            setUnreadCount(response.unreadCount);
        } catch (error) {
            console.error("Failed to refresh unread count", error);
            setUnreadCount(0);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchNotifications();
            refreshUnreadCount();
        }
    }, [isAuthenticated, fetchNotifications, refreshUnreadCount]);

    useEffect(() => {
        if (!socket) return;
        
        const handleNewNotification = (notification: INotification) => {
            // Only add to current list if we're on the first page
            if (pagination?.currentPage === 1) {
                setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Keep only 10 items
            }
            setUnreadCount(prev => prev + 1);
        };

        const handleNotificationRead = (notificationId: string) => {
            setNotifications(prev =>
                prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        };

        socket.on('newNotification', handleNewNotification);
        socket.on('notificationRead', handleNotificationRead);
        
        return () => {
            socket.off('newNotification', handleNewNotification);
            socket.off('notificationRead', handleNotificationRead);
        };
    }, [socket, pagination?.currentPage]);

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            pagination,
            isLoading,
            error,
            fetchNotifications,
            refreshUnreadCount
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
    return context;
};