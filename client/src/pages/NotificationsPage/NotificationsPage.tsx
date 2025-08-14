import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import { markNotificationsAsRead, markNotificationAsRead } from '../../services/notificationService';
import styles from './NotificationsPage.module.css';
import { Bell, Check, CheckCheck, RefreshCw, Mail, MailOpen } from 'lucide-react';

const NotificationsPage: React.FC = () => {
    const {
        notifications,
        pagination,
        isLoading,
        error,
        fetchNotifications,
        refreshUnreadCount
    } = useNotifications();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(() => {
        const saved = localStorage.getItem('notificationsPage');
        return saved ? parseInt(saved) : 1;
    });

    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        fetchNotifications(currentPage, ITEMS_PER_PAGE);
    }, [currentPage, fetchNotifications]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && pagination && page <= pagination.totalPages && page !== currentPage) {
            setCurrentPage(page);
            localStorage.setItem('notificationsPage', page.toString());
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markNotificationsAsRead();
            await fetchNotifications(currentPage, ITEMS_PER_PAGE);
            await refreshUnreadCount();
        } catch (error) {
            console.error("Failed to mark notifications as read", error);
        }
    };

    const handleNotificationClick = async (notification: any) => {
        if (!notification.isRead) {
            try {
                await markNotificationAsRead(notification._id);
                await refreshUnreadCount();
            } catch (error) {
                console.error("Failed to mark notification as read", error);
            }
        }
        
        if (notification.link) {
            navigate(notification.link);
        }
    };

    const handleRefresh = () => {
        fetchNotifications(currentPage, ITEMS_PER_PAGE);
    };

    const getNotificationIcon = (notification: any) => {
        return notification.isRead ?
            <MailOpen className={styles.notificationIcon} /> :
            <Mail className={styles.notificationIcon} />;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return `${diffInHours}h ago`;
        } else if (diffInHours < 48) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
            });
        }
    };

    // Pagination component
    const Pagination = () => {
        if (!pagination || pagination.totalPages <= 1) return null;

        const getVisiblePages = () => {
            const maxVisible = 7;
            const pages = [];
            
            if (pagination.totalPages <= maxVisible) {
                for (let i = 1; i <= pagination.totalPages; i++) {
                    pages.push(i);
                }
            } else {
                const startPage = Math.max(1, currentPage - 2);
                const endPage = Math.min(pagination.totalPages, currentPage + 2);
                
                if (startPage > 1) {
                    pages.push(1);
                    if (startPage > 2) {
                        pages.push('...');
                    }
                }
                
                for (let i = startPage; i <= endPage; i++) {
                    if (i !== 1 && i !== pagination.totalPages) {
                        pages.push(i);
                    }
                }
                
                if (endPage < pagination.totalPages) {
                    if (endPage < pagination.totalPages - 1) {
                        pages.push('...');
                    }
                    pages.push(pagination.totalPages);
                }
                
                if (startPage === 1 && !pages.includes(1)) {
                    pages.unshift(1);
                }
                
                if (endPage === pagination.totalPages && !pages.includes(pagination.totalPages)) {
                    pages.push(pagination.totalPages);
                }
            }
            
            return pages;
        };

        const visiblePages = getVisiblePages();

        return (
            <div className={styles.pagination}>
                <button
                    className={`${styles.paginationBtn} ${currentPage === 1 ? styles.disabled : ''}`}
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    title="Previous page"
                >
                    ←
                </button>
                
                {visiblePages.map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className={styles.paginationEllipsis}>
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            className={`${styles.paginationBtn} ${currentPage === page ? styles.active : ''}`}
                            onClick={() => handlePageChange(page as number)}
                            disabled={isLoading}
                            title={`Page ${page}`}
                        >
                            {page}
                        </button>
                    )
                ))}
                
                <button
                    className={`${styles.paginationBtn} ${currentPage === pagination.totalPages ? styles.disabled : ''}`}
                    onClick={() => currentPage < pagination.totalPages && handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages || isLoading}
                    title="Next page"
                >
                    →
                </button>
            </div>
        );
    };

    if (error) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.errorState}>
                    <div className={styles.errorIcon}>⚠️</div>
                    <h3>Failed to load notifications</h3>
                    <p>{error}</p>
                    <button onClick={handleRefresh} className={styles.retryButton}>
                        <RefreshCw size={16} />
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.headerInfo}>
                        <Bell className={styles.headerIcon} />
                        <div>
                            <h1>Notifications</h1>
                            {pagination && (
                                <p className={styles.headerSubtext}>
                                    {pagination.totalItems} total notifications
                                </p>
                            )}
                        </div>
                    </div>
                    <div className={styles.headerActions}>
                        <button
                            onClick={handleRefresh}
                            className={styles.refreshButton}
                            disabled={isLoading}
                        >
                            <RefreshCw size={16} className={isLoading ? styles.spinning : ''} />
                            Refresh
                        </button>
                        {notifications.some(n => !n.isRead) && (
                            <button
                                onClick={handleMarkAllAsRead}
                                className={styles.markAllButton}
                            >
                                <CheckCheck size={16} />
                                Mark All Read
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {isLoading && notifications.length === 0 ? (
                <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    <span>Loading notifications...</span>
                </div>
            ) : notifications.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}>📭</div>
                    <h3>No notifications</h3>
                    <p>All important events will appear here when they happen.</p>
                </div>
            ) : (
                <>
                    <div className={styles.notificationList}>
                        {notifications.map(notification => (
                            <div
                                key={notification._id}
                                onClick={() => handleNotificationClick(notification)}
                                className={`${styles.notificationItem} ${
                                    notification.isRead ? styles.read : styles.unread
                                } ${notification.link ? styles.clickable : ''}`}
                            >
                                <div className={styles.notificationIconContainer}>
                                    {getNotificationIcon(notification)}
                                </div>
                                
                                <div className={styles.notificationContent}>
                                    <div className={styles.notificationHeader}>
                                        <h4 className={styles.title}>{notification.title}</h4>
                                        <span className={styles.date}>
                                            {formatDate(notification.createdAt)}
                                        </span>
                                    </div>
                                    
                                    <p className={styles.message}>{notification.message}</p>
                                    
                                    {!notification.isRead && (
                                        <div className={styles.unreadIndicator}></div>
                                    )}
                                </div>
                                
                                {notification.link && (
                                    <div className={styles.linkIndicator}>
                                        →
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <Pagination />
                </>
            )}
        </div>
    );
};

export default NotificationsPage;