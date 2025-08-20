// Export all common components
export { default as ErrorBoundary } from './ErrorBoundary';
export { default as ErrorDisplay, NetworkError, LoadingError, GameError } from './ErrorDisplay';

// Export error types for TypeScript
export interface ErrorInfo {
  componentStack: string;
}

export interface ErrorHandlerProps {
  error: Error;
  errorInfo?: ErrorInfo;
  onRetry?: () => void;
  onReport?: (error: Error, errorInfo?: ErrorInfo) => void;
}

// Common error utility functions
export const createErrorReport = (error: Error, errorInfo?: ErrorInfo) => ({
  message: error.message,
  stack: error.stack,
  componentStack: errorInfo?.componentStack,
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent,
  url: window.location.href
});

export const copyErrorToClipboard = async (error: Error, errorInfo?: ErrorInfo) => {
  const report = createErrorReport(error, errorInfo);
  try {
    await navigator.clipboard.writeText(JSON.stringify(report, null, 2));
    return true;
  } catch {
    return false;
  }
};

// Error logging function (can be extended with external services)
export const logError = (error: Error, errorInfo?: ErrorInfo, context?: string) => {
  const report = createErrorReport(error, errorInfo);
  console.error(`[Error ${context ? `- ${context}` : ''}]:`, report);
  
  // Here you could send to external logging service
  // Example: sendToLoggingService(report);
};