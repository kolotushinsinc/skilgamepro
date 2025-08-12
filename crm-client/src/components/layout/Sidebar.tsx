import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import { LayoutDashboard, Users, Gamepad2, List, Home, Trophy, PlusSquare, Settings, ShieldCheck, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

const Sidebar: React.FC = () => {
    const { logout } = useAuth();
    const { unreadChatsCount, isConnected } = useNotifications();

    const menuItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/users', icon: Users, label: 'Users' },
        { path: '/games', icon: Gamepad2, label: 'Games' },
        { path: '/transactions', icon: List, label: 'Transactions' },
        { path: '/rooms', icon: Home, label: 'Rooms' },
        { path: '/tournaments', icon: Trophy, label: 'Tournaments' },
        { path: '/support-chat', icon: MessageCircle, label: 'Support Chat', badge: unreadChatsCount },
        { path: '/kyc', icon: ShieldCheck, label: 'KYC Verification' },
        { path: '/create-room', icon: PlusSquare, label: 'Create Room' },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <div>Skill Game CRM</div>
                <div className={styles.connectionStatus}>
                    <div className={`${styles.statusDot} ${isConnected ? styles.connected : styles.disconnected}`}></div>
                    <span className={styles.statusText}>
                        {isConnected ? 'Online' : 'Offline'}
                    </span>
                </div>
            </div>
            <nav className={styles.sidebarNav}>
                {menuItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                    >
                        <div className={styles.navLinkContent}>
                            <item.icon />
                            <span>{item.label}</span>
                        </div>
                        {item.badge && item.badge > 0 && (
                            <span className={styles.badge}>{item.badge}</span>
                        )}
                    </NavLink>
                ))}
            </nav>
            <div style={{ marginTop: 'auto', padding: '1rem' }}>
                 <button onClick={logout} className={styles.navLink} style={{width: '100%'}}>
                    Выйти
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;