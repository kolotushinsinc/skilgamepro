import React, { useEffect } from 'react';
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

import MainLayout from './components/layout/MainLayout';

import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';

// Компонент для проверки игрового состояния
const GameAwareApp: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Определяем, находится ли игрок в игре
  const isInGame = location.pathname.includes('/game/') || location.pathname.includes('/tournament-game/');

  return (
    <TournamentExitManager>
        <Toaster position="bottom-right" />
        {isAuthenticated && <NotificationHandler />}
        {isAuthenticated && <TournamentNotificationHandler />}
        
        {isAuthenticated ? (
          <TutorialProvider>
            <Routes>
              <Route path="/*" element={<MainLayout />} />
            </Routes>
            
            {/* Tutorial System - hidden during games */}
            {!isInGame && (
              <TutorialManager
                autoStart={true}
                enableKeyboardNavigation={true}
                debugMode={process.env.NODE_ENV === 'development'}
              />
            )}
          </TutorialProvider>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
        
        {/* Support Chat - скрывается во время игры */}
        {!isInGame && <SupportChat />}
    </TournamentExitManager>
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