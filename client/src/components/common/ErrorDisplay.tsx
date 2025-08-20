import React from 'react';
import { AlertCircle, RefreshCw, Home, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './ErrorDisplay.module.css';

interface ErrorDisplayProps {
  /** Error title */
  title?: string;
  /** Error message/description */
  message?: string;
  /** Show retry button */
  showRetry?: boolean;
  /** Retry function */
  onRetry?: () => void;
  /** Show home button */
  showHome?: boolean;
  /** Show back button */
  showBack?: boolean;
  /** Back function */
  onBack?: () => void;
  /** Custom action buttons */
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    icon?: React.ReactNode;
  }>;
  /** Error type for styling */
  type?: 'error' | 'warning' | 'network' | 'notfound';
  /** Compact mode for smaller display */
  compact?: boolean;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  showRetry = true,
  onRetry,
  showHome = false,
  showBack = false,
  onBack,
  actions = [],
  type = 'error',
  compact = false,
  icon,
  className = ''
}) => {
  const getTypeIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'network':
        return <AlertCircle size={compact ? 40 : 60} />;
      case 'warning':
        return <AlertCircle size={compact ? 40 : 60} />;
      case 'notfound':
        return <AlertCircle size={compact ? 40 : 60} />;
      default:
        return <AlertCircle size={compact ? 40 : 60} />;
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case 'network':
        return styles.typeNetwork;
      case 'warning':
        return styles.typeWarning;
      case 'notfound':
        return styles.typeNotFound;
      default:
        return styles.typeError;
    }
  };

  const defaultActions = [];

  if (showRetry && onRetry) {
    defaultActions.push({
      label: 'Try Again',
      onClick: onRetry,
      variant: 'primary' as const,
      icon: <RefreshCw size={16} />
    });
  }

  if (showBack && onBack) {
    defaultActions.push({
      label: 'Go Back',
      onClick: onBack,
      variant: 'secondary' as const,
      icon: <ChevronLeft size={16} />
    });
  }

  if (showHome) {
    defaultActions.push({
      label: 'Go Home',
      onClick: () => window.location.href = '/',
      variant: 'secondary' as const,
      icon: <Home size={16} />
    });
  }

  const allActions = [...defaultActions, ...actions];

  return (
    <div className={`${styles.container} ${compact ? styles.compact : ''} ${getTypeClass()} ${className}`}>
      {/* Error Icon */}
      <div className={styles.iconContainer}>
        <div className={styles.errorIcon}>
          {getTypeIcon()}
        </div>
      </div>

      {/* Error Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
      </div>

      {/* Actions */}
      {allActions.length > 0 && (
        <div className={styles.actionsContainer}>
          {allActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`${styles.actionButton} ${
                action.variant === 'primary' ? styles.primaryButton : styles.secondaryButton
              }`}
            >
              {action.icon && <span className={styles.buttonIcon}>{action.icon}</span>}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ErrorDisplay;

// Предопределенные варианты для частых случаев
export const NetworkError: React.FC<Omit<ErrorDisplayProps, 'type'>> = (props) => (
  <ErrorDisplay
    {...props}
    type="network"
    title={props.title || 'Connection Problem'}
    message={props.message || 'Unable to connect to the server. Please check your internet connection and try again.'}
  />
);

export const LoadingError: React.FC<Omit<ErrorDisplayProps, 'type'>> = (props) => (
  <ErrorDisplay
    {...props}
    type="error"
    title={props.title || 'Loading Failed'}
    message={props.message || 'Failed to load data. Please try refreshing the page.'}
  />
);

export const GameError: React.FC<Omit<ErrorDisplayProps, 'type'>> = (props) => (
  <ErrorDisplay
    {...props}
    type="warning"
    title={props.title || 'Game Error'}
    message={props.message || 'Something went wrong with the game. Please try again or contact support.'}
  />
);