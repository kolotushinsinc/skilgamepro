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
    DollarSign
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

interface SidebarProps {
    onLogoutClick: () => void;
    isMobileMenuOpen?: boolean;
    closeMobileMenu?: () => void;
    isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
    onLogoutClick,
    isMobileMenuOpen = false,
    closeMobileMenu,
    isMobile = false
}) => {
    const { unreadChatsCount, isConnected } = useNotifications();

    const menuItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/revenue', icon: DollarSign, label: 'Platform Revenue' },
        { path: '/users', icon: Users, label: 'Users' },
        { path: '/games', icon: Gamepad2, label: 'Games' },
        { path: '/transactions', icon: List, label: 'Transactions' },
        { path: '/rooms', icon: Home, label: 'Rooms' },
        { path: '/tournaments', icon: Trophy, label: 'Tournaments' },
        { path: '/auto-tournaments', icon: Zap, label: 'Auto Tournaments' },
        { path: '/game-lobby-scheduler', icon: Settings, label: 'Lobby Scheduler' },
        { path: '/support-chat', icon: MessageCircle, label: 'Support Chat', badge: unreadChatsCount },
        { path: '/kyc', icon: ShieldCheck, label: 'KYC Verification' },
        { path: '/create-room', icon: PlusSquare, label: 'Create Room' },
    ];

    const handleNavLinkClick = () => {
        if (isMobile && closeMobileMenu) {
            closeMobileMenu();
        }
    };

    const handleLogout = () => {
        onLogoutClick();
        if (isMobile && closeMobileMenu) {
            closeMobileMenu();
        }
    };

    return (
        <aside className={`${styles.sidebar} ${isMobile ? styles.mobileSidebar : ''} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
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
                        onClick={handleNavLinkClick}
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
            <button onClick={handleLogout} className={styles.logoutButton}>
                <LogOut size={16} />
                <span>Sign Out</span>
            </button>
        </aside>
    );
};

export default Sidebar;