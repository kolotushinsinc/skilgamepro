import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error, 
      errorInfo: null 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });

    // Here you could send error to logging service
    // logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportBug = () => {
    const errorDetails = {
      error: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // You could implement bug reporting here
    console.log('Bug report:', errorDetails);
    
    // For now, just copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2))
      .then(() => alert('Error details copied to clipboard'))
      .catch(() => alert('Unable to copy error details'));
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.container}>
          <div className={styles.content}>
            {/* Error Icon */}
            <div className={styles.iconContainer}>
              <AlertTriangle size={100} className={styles.errorIcon} />
              <div className={styles.glowEffect}></div>
            </div>

            {/* Error Message */}
            <div className={styles.messageContainer}>
              <h1 className={styles.title}>Something Went Wrong</h1>
              <p className={styles.description}>
                An unexpected error occurred while running the application. 
                This might be a temporary issue or a bug in our code.
              </p>
            </div>

            {/* Error Details (Development Mode) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className={styles.errorDetails}>
                <h3 className={styles.errorTitle}>Error Details:</h3>
                <div className={styles.errorBox}>
                  <strong>Error:</strong> {this.state.error.message}
                </div>
                {this.state.error.stack && (
                  <div className={styles.errorBox}>
                    <strong>Stack:</strong>
                    <pre className={styles.stackTrace}>
                      {this.state.error.stack}
                    </pre>
                  </div>
                )}
                {this.state.errorInfo?.componentStack && (
                  <div className={styles.errorBox}>
                    <strong>Component Stack:</strong>
                    <pre className={styles.stackTrace}>
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className={styles.actionsContainer}>
              <button 
                onClick={this.handleReload}
                className={`${styles.actionButton} ${styles.primaryButton}`}
              >
                <RefreshCw size={20} />
                <span>Reload Page</span>
              </button>
              
              <button 
                onClick={this.handleGoHome}
                className={`${styles.actionButton} ${styles.secondaryButton}`}
              >
                <Home size={20} />
                <span>Go Home</span>
              </button>
              
              <button 
                onClick={this.handleReportBug}
                className={`${styles.actionButton} ${styles.secondaryButton}`}
              >
                <Bug size={20} />
                <span>Report Bug</span>
              </button>
            </div>

            {/* Help Text */}
            <div className={styles.helpSection}>
              <p className={styles.helpText}>
                If this problem persists, please contact our support team with the error details.
              </p>
            </div>
          </div>

          {/* Background Elements */}
          <div className={styles.backgroundElements}>
            <div className={styles.floatingElement} style={{ top: '15%', left: '10%', animationDelay: '0s' }}>⚠️</div>
            <div className={styles.floatingElement} style={{ top: '25%', right: '15%', animationDelay: '2s' }}>🔧</div>
            <div className={styles.floatingElement} style={{ bottom: '30%', left: '20%', animationDelay: '4s' }}>🐛</div>
            <div className={styles.floatingElement} style={{ bottom: '20%', right: '10%', animationDelay: '6s' }}>💻</div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;