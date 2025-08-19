import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import styles from './Sidebar.module.css';
import { Home, Gamepad2, Trophy, User as UserIcon, Crown, ShieldCheck, LogOut } from 'lucide-react';
import Avatar from '../../components/common/Avatar';


const Sidebar: React.FC = () => {
    const { user } = useAuth();
    const { isSidebarOpen, setSidebarOpen, showLogoutModal, setShowLogoutModal } = useUI();

    const menuItems = [
        { path: '/', icon: Home, label: 'Dashboard' },
        { path: '/games', icon: Gamepad2, label: 'Games' },
        { path: '/tournaments', icon: Trophy, label: 'Tournaments' },
        { path: '/profile', icon: UserIcon, label: 'Profile' },
    ];
    
    const initials = <Avatar size="small" />
    
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
        `${styles.navLink} ${isActive ? styles.active : ''}`;

    const handleLinkClick = () => {
        if (window.innerWidth < 1024) {
             setSidebarOpen(false);
        }
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    return (
        <>
            {/* Mobile overlay - позволяет закрыть сайдбар нажатием вне его области */}
            {isSidebarOpen && (
                <div
                    className={styles.mobileOverlay}
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar"
                />
            )}

            <div className={`${styles.sidebarContainer} ${isSidebarOpen ? styles.open : ''}`} data-testid="sidebar">
                    <Link to="/" onClick={handleLinkClick} className={styles.logoArea} data-testid="logo-link">
                        <div className={styles.logoIconContainer}><Crown /></div>
                        <div className={styles.logoText}>
                            <h1>Skill Game</h1>
                            <p>Game platform</p>
                        </div>
                    </Link>

                <nav className={styles.nav} data-testid="navigation">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            onClick={handleLinkClick}
                            className={getNavLinkClass}
                            data-testid={`nav-${item.label.toLowerCase()}`}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                    {user?.role === 'ADMIN' && (
                         <NavLink
                            to="/admin"
                            onClick={handleLinkClick}
                            className={getNavLinkClass}
                            data-testid="nav-admin"
                        >
                            <ShieldCheck />
                            <span>Admin tools(demo)</span>
                        </NavLink>
                    )}
                </nav>

                <div className={styles.profileSection} data-testid="profile-section">
                     <div className={styles.profileInfo} data-testid="profile-info">
                        <div className={styles.avatar} data-testid="user-avatar">{initials}</div>
                        <div>
                            <p className={styles.username} data-testid="username">{user?.username || 'Gamer'}</p>
                            <p className={styles.userStatus} data-testid="user-status">{user?.role === 'ADMIN' ? 'Admin' : 'Gamer'}</p>
                        </div>
                    </div>
                     <button onClick={handleLogoutClick} className={`${styles.navLink} w-full mt-4`} data-testid="logout-button">
                        <LogOut />
                        <span>Log out</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;