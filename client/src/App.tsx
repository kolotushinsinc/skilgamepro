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
import SessionExpiredModal from './components/modals/SessionExpiredModal';

import MainLayout from './components/layout/MainLayout';

import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// Компонент для проверки игрового состояния
const GameAwareApp: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, sessionExpired } = useAuth();
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
                <Route path="/404" element={<NotFoundPage />} />
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

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading application..." />;
  }

  return (
    <Router>
        <GameAwareApp />
    </Router>
  );
}

export default App;