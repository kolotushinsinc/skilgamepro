import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import NotificationToast from '../NotificationToast';
import ConfirmationModal from '../modals/ConfirmationModal';
import { useAuth } from '../../context/AuthContext';
import styles from './AdminLayout.module.css';

const AdminLayout: React.FC = () => {
    const { logout } = useAuth();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if screen is mobile size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1024);
            if (window.innerWidth > 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isMobileMenuOpen && !(event.target as Element).closest(`.${styles.sidebar}`) && !(event.target as Element).closest(`.${styles.mobileMenuButton}`)) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const handleLogoutConfirm = () => {
        setShowLogoutConfirm(false);
        logout();
    };

    const handleLogoutCancel = () => {
        setShowLogoutConfirm(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className={styles.layoutContainer}>
            {/* Mobile menu button */}
            {isMobile && (
                <button
                    className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.menuButtonHidden : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* Mobile overlay */}
            {isMobile && isMobileMenuOpen && (
                <div
                    className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.show : ''}`}
                    onClick={closeMobileMenu}
                />
            )}

            <Sidebar
                onLogoutClick={handleLogoutClick}
                isMobileMenuOpen={isMobileMenuOpen}
                closeMobileMenu={closeMobileMenu}
                isMobile={isMobile}
            />
            
            <main className={styles.mainContent}>
                <Outlet />
            </main>
            
            <NotificationToast />
            
            <ConfirmationModal
                isOpen={showLogoutConfirm}
                onClose={handleLogoutCancel}
                onConfirm={handleLogoutConfirm}
                title="Sign Out"
                message="Are you sure you want to sign out of the CRM? You will need to enter your credentials again to access the system."
                confirmText="Sign Out"
                cancelText="Cancel"
                type="warning"
            />
        </div>
    );
};

export default AdminLayout;