import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useUI } from '../../context/UIContext';
import { useSocket } from '../../context/SocketContext';
import TutorialButton from '../tutorial/TutorialButton';
import styles from './Header.module.css';
import { Menu, Bell } from 'lucide-react';

const Header: React.FC = () => {
    const { user, refreshUser } = useAuth();
    const { unreadCount, refreshUnreadCount } = useNotifications();
    const { toggleSidebar } = useUI();
    const { socket } = useSocket();

    // Debug log to see if unreadCount is being received
    console.log('Header unreadCount:', unreadCount);

    useEffect(() => {
        if (!socket || !user) return;

        const handleBalanceUpdate = (data: {
            userId: string;
            newBalance: number;
            transaction: {
                type: string;
                amount: number;
                status: string;
                createdAt: string;
            };
        }) => {
            if (data.userId === user._id) {
                console.log('[Header] Balance updated via Socket.IO:', data);
                
                refreshUser();
            }
        };

        socket.on('balanceUpdated', handleBalanceUpdate);

        return () => {
            socket.off('balanceUpdated', handleBalanceUpdate);
        };
    }, [socket, user, refreshUser]);

    return (
        <header className={styles.header} data-testid="header">
            <button onClick={toggleSidebar} className={styles.menuButton} data-testid="menu-button">
                <Menu />
            </button>
            
            <div className={styles.rightSection} data-testid="header-right-section">
                <div className={styles.onlineIndicator} data-testid="online-indicator">
                    <div className={styles.onlineDot}></div>
                    <span className="text-sm font-medium">Online</span>
                </div>
                <div className={styles.balance} data-testid="balance-display">
                    {user?.balance.toFixed(2) || '0.00'}
                </div>
                <Link to="/notifications" className={styles.notificationBell} data-testid="notifications-button">
                    <Bell size={20} />
                    {unreadCount > 0 && (
                        <span className={styles.notificationCount} data-testid="notification-count">
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
};

export default Header;