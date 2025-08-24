import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './SessionExpiredModal.module.css';

interface SessionExpiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({ isOpen, onClose }) => {
  const { clearSessionExpired } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    clearSessionExpired();
    onClose();
    navigate('/login');
  };

  const handleClose = () => {
    clearSessionExpired();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>⏰ Сессия истекла</h2>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <div className={styles.clockIcon}>⏰</div>
          </div>
          
          <div className={styles.message}>
            <p className={styles.primaryText}>
              Ваша сессия истекла из-за неактивности более 1 часа
            </p>
            <p className={styles.secondaryText}>
              Для обеспечения безопасности вашего аккаунта необходимо войти в систему заново
            </p>
          </div>
        </div>
        
        <div className={styles.actions}>
          <button 
            className={styles.loginButton}
            onClick={handleLogin}
          >
            🔑 Войти заново
          </button>
          <button 
            className={styles.cancelButton}
            onClick={handleClose}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;