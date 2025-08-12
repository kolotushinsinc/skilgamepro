import React, { useState, useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { X, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './NotificationToast.module.css';

interface ToastNotification {
  id: string;
  type: 'new_message' | 'chat_assigned' | 'chat_closed';
  title: string;
  message: string;
  chatId?: string;
  timestamp: Date;
  isVisible: boolean;
}

const NotificationToast: React.FC = () => {
  const { notifications, markNotificationAsRead } = useNotifications();
  const [visibleToasts, setVisibleToasts] = useState<ToastNotification[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Show only unread notifications as toasts
    const unreadNotifications = notifications
      .filter(notif => !notif.isRead)
      .slice(0, 3) // Show max 3 toasts at once
      .map(notif => ({
        ...notif,
        isVisible: true
      }));

    setVisibleToasts(unreadNotifications);

    // Auto-hide toasts after 5 seconds
    const timers = unreadNotifications.map(notif => 
      setTimeout(() => {
        hideToast(notif.id);
      }, 5000)
    );

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications]);

  const hideToast = (id: string) => {
    setVisibleToasts(prev => 
      prev.map(toast => 
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    );

    // Remove from DOM after animation
    setTimeout(() => {
      setVisibleToasts(prev => prev.filter(toast => toast.id !== id));
      markNotificationAsRead(id);
    }, 300);
  };

  const handleToastClick = (toast: ToastNotification) => {
    if (toast.chatId && toast.type === 'new_message') {
      navigate('/support-chat');
    }
    hideToast(toast.id);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'new_message':
        return <MessageCircle className={styles.icon} />;
      case 'chat_assigned':
        return <CheckCircle className={styles.icon} />;
      case 'chat_closed':
        return <AlertCircle className={styles.icon} />;
      default:
        return <MessageCircle className={styles.icon} />;
    }
  };

  if (visibleToasts.length === 0) {
    return null;
  }

  return (
    <div className={styles.toastContainer}>
      {visibleToasts.map((toast, index) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]} ${toast.isVisible ? styles.visible : styles.hidden}`}
          style={{ bottom: `${index * 80 + 20}px` }}
          onClick={() => handleToastClick(toast)}
        >
          <div className={styles.toastContent}>
            <div className={styles.toastHeader}>
              {getIcon(toast.type)}
              <span className={styles.toastTitle}>{toast.title}</span>
              <button
                className={styles.closeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  hideToast(toast.id);
                }}
              >
                <X size={16} />
              </button>
            </div>
            <p className={styles.toastMessage}>{toast.message}</p>
            <span className={styles.toastTime}>
              {toast.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;