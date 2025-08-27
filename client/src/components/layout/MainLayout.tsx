import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import LogoutConfirmModal from '../modals/LogoutConfirmModal';
import DepositModal from '../modals/DepositModal';
import InsufficientFundsModal from '../modals/InsufficientFundsModal';
import styles from './MainLayout.module.css';
import toast from 'react-hot-toast';

import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import HomePage from '../../pages/HomePage/HomePage';
import TournamentsListPage from '../../pages/TournamentsListPage/TournamentsListPage';
import TournamentDetailPage from '../../pages/TournamentDetailPage/TournamentDetailPage';
import TournamentGamePage from '../../pages/TournamentGamePage/TournamentGamePage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import NotificationsPage from '../../pages/NotificationsPage/NotificationsPage';
import LobbyPage from '../../pages/LobbyPage/LobbyPage';
import GamePage from '../../pages/GamePage/GamePage';
import AdminPage from '../../pages/AdminPage/AdminPage';
import AdminRoute from '../AdminRoute/AdminRoute';
import DemoPaymentPage from '../../pages/DemoPaymentPage/DemoPaymentPage';
import PrivateRoomPage from '../../pages/PrivateRoomPage/PrivateRoomPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

const MainLayout: React.FC = () => {
    const {
        isSidebarOpen,
        showLogoutModal,
        setShowLogoutModal,
        showDepositModal,
        setShowDepositModal,
        showInsufficientFundsModal,
        setShowInsufficientFundsModal,
        insufficientFundsData
    } = useUI();
    const { logout, refreshUser } = useAuth();
    
    const handleLogoutConfirm = () => {
        logout();
        setShowLogoutModal(false);
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };

    const handleDepositSuccess = (amount: number) => {
        toast.success(`Successfully deposited $${amount.toFixed(2)}!`, {
            duration: 4000,
            icon: '💰',
        });
        refreshUser();
    };

    const handleDepositClose = () => {
        setShowDepositModal(false);
    };

    const handleInsufficientFundsClose = () => {
        setShowInsufficientFundsModal(false);
    };

    return (
        <div className="min-h-screen text-slate-300">
            <Sidebar />
            
            <div className={`${styles.contentContainer} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
                <Header />
                <main className="p-4 sm:p-6 lg:p-8">
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/games" element={<HomePage />} />
                        <Route path="/tournaments" element={<TournamentsListPage />} />
                        <Route path="/tournament/:id" element={<TournamentDetailPage />} />
                        <Route path="/tournament-game/:matchId" element={<TournamentGamePage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/lobby/:gameType" element={<LobbyPage />} />
                        <Route path="/game/:gameType/:roomId" element={<GamePage />} />
                        <Route path="/private-room/:token" element={<PrivateRoomPage />} />
                        <Route path="/demo-payment" element={<DemoPaymentPage />} />

                        <Route element={<AdminRoute />}>
                            <Route path="/admin" element={<AdminPage />} />
                        </Route>

                        {/* Redirect unknown routes to dashboard instead of showing 404 */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>

            {/* Logout Confirmation Modal - positioned over entire screen */}
            <LogoutConfirmModal
                isOpen={showLogoutModal}
                onClose={handleLogoutCancel}
                onConfirm={handleLogoutConfirm}
            />

            {/* Deposit Modal - positioned over entire screen */}
            <DepositModal
                isOpen={showDepositModal}
                onClose={handleDepositClose}
                onSuccess={handleDepositSuccess}
            />

            {/* Insufficient Funds Modal - positioned over entire screen */}
            <InsufficientFundsModal
                isOpen={showInsufficientFundsModal}
                onClose={handleInsufficientFundsClose}
                requiredAmount={insufficientFundsData?.requiredAmount || 0}
                currentBalance={insufficientFundsData?.currentBalance || 0}
            />
        </div>
    )
}

export default MainLayout;