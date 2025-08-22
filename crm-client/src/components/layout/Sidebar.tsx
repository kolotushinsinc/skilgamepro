import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import {
    LayoutDashboard,
    Users,
    Gamepad2,
    List,
    Home,
    Trophy,
    PlusSquare,
    ShieldCheck,
    MessageCircle,
    Zap,
    LogOut,
    Crown,
    Settings,
    Shield
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

interface SidebarProps {
    onLogoutClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogoutClick }) => {
    const { unreadChatsCount, isConnected } = useNotifications();

    const menuItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/users', icon: Users, label: 'Users' },
        { path: '/games', icon: Gamepad2, label: 'Games' },
        { path: '/transactions', icon: List, label: 'Transactions' },
        { path: '/rooms', icon: Home, label: 'Rooms' },
        { path: '/tournaments', icon: Trophy, label: 'Tournaments' },
        { path: '/auto-tournaments', icon: Zap, label: 'Auto Tournaments' },
        { path: '/game-lobby-scheduler', icon: Settings, label: 'Lobby Scheduler' },
        { path: '/support-chat', icon: MessageCircle, label: 'Support Chat', badge: unreadChatsCount },
        { path: '/security', icon: Shield, label: 'Security Monitor' },
        { path: '/kyc', icon: ShieldCheck, label: 'KYC Verification' },
        { path: '/create-room', icon: PlusSquare, label: 'Create Room' },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Crown size={24} />
                    <span>Skill Game CRM</span>
                </div>
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
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </div>
                        {item.badge && item.badge > 0 && (
                            <span className={styles.badge}>{item.badge}</span>
                        )}
                    </NavLink>
                ))}
            </nav>
            <button onClick={onLogoutClick} className={styles.logoutButton}>
                <LogOut size={16} />
                <span>Sign Out</span>
            </button>
        </aside>
    );
};

export default Sidebar;