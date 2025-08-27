import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { TutorialProvider } from './context/TutorialContext';
import { Toaster } from 'react-hot-toast';
import { NotificationHandler } from './components/NotificationHandler/NotificationHandler';
import TournamentExitManager from './components/tournament/TournamentExitManager';
import TournamentNotificationHandler from './components/tournament/TournamentNotificationHandler';
import SupportChat from './components/SupportChat/SupportChat';
import LoadingSpinner from './components/ui/LoadingSpinner';
import TutorialManager from './components/tutorial/TutorialManager';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import SessionExpiredModal from './components/modals/SessionExpiredModal';

import MainLayout from './components/layout/MainLayout';

import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// Компонент для проверки игрового состояния
const GameAwareApp: React.FC<{ initialLoad: boolean }> = ({ initialLoad }) => {
  const location = useLocation();
  const { isAuthenticated, sessionExpired, loading } = useAuth();
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
  
  // Определяем, находится ли игрок в игре
  const isInGame = location.pathname.includes('/game/') || location.pathname.includes('/tournament-game/');

  // Обработка истечения сессии
  useEffect(() => {
    if (sessionExpired) {
      setShowSessionExpiredModal(true);
    }
  }, [sessionExpired]);

  const handleCloseSessionModal = () => {
    setShowSessionExpiredModal(false);
  };

  // Auth state is already handled by parent App component
  // No need for additional loading check here

  return (
    <ErrorBoundary>
      <TournamentExitManager>
          <Toaster position="bottom-right" />
          {isAuthenticated && <NotificationHandler />}
          {isAuthenticated && <TournamentNotificationHandler />}
          
          {isAuthenticated ? (
            <TutorialProvider>
              <ErrorBoundary>
                <Routes>
                  <Route path="/*" element={<MainLayout />} />
                </Routes>
              </ErrorBoundary>
              
              {/* Tutorial System - hidden during games */}
              {!isInGame && (
                <TutorialManager
                  autoStart={true}
                  enableKeyboardNavigation={true}
                />
              )}
            </TutorialProvider>
          ) : (
            <ErrorBoundary>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                {/* Immediately redirect to login, no 404 flash */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </ErrorBoundary>
          )}
          
          {/* Support Chat - скрывается во время игры */}
          {!isInGame && <SupportChat />}
          
          {/* Session Expired Modal */}
          <SessionExpiredModal
            isOpen={showSessionExpiredModal}
            onClose={handleCloseSessionModal}
          />
      </TournamentExitManager>
    </ErrorBoundary>
  );
};

function App() {
  const { isAuthenticated, loading, refreshUser } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      await refreshUser();
      setInitialLoad(false);
    };
    
    initializeApp();
  }, [refreshUser]);

  // Show loading until both auth context loading is done AND initial load is complete
  if (loading || initialLoad) {
    return <LoadingSpinner fullScreen text="Loading application..." />;
  }

  return (
    <Router>
        <ScrollToTop />
        <GameAwareApp initialLoad={false} />
    </Router>
  );
}

export default App;