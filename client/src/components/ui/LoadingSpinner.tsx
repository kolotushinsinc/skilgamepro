import React from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    text?: string;
    fullScreen?: boolean;
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    size = 'medium', 
    text = 'Loading...', 
    fullScreen = false,
    className = ''
}) => {
    const containerClass = fullScreen 
        ? `${styles.fullScreenContainer} ${className}` 
        : `${styles.container} ${className}`;

    return (
        <div className={containerClass}>
            <div className={styles.loadingContent}>
                <div className={`${styles.spinner} ${styles[size]}`}>
                    <div className={styles.spinnerInner}>
                        <div className={styles.dot1}></div>
                        <div className={styles.dot2}></div>
                        <div className={styles.dot3}></div>
                    </div>
                    <div className={styles.spinnerOuter}></div>
                </div>
                {text && (
                    <p className={styles.loadingText}>{text}</p>
                )}
            </div>
        </div>
    );
};

export default LoadingSpinner;