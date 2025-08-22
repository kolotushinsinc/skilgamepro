import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NotificationToast from '../NotificationToast';
import ConfirmationModal from '../modals/ConfirmationModal';
import { useAuth } from '../../context/AuthContext';
import styles from './AdminLayout.module.css';

const AdminLayout: React.FC = () => {
    const { logout } = useAuth();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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

    return (
        <div className={styles.layoutContainer}>
            <Sidebar onLogoutClick={handleLogoutClick} />
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