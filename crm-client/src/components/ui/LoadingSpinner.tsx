import React from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary' | 'accent';
    text?: string;
    fullScreen?: boolean;
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'medium',
    variant = 'primary',
    text,
    fullScreen = false,
    className = ''
}) => {
    const spinnerClasses = [
        styles.spinner,
        styles[size],
        styles[variant],
        className
    ].filter(Boolean).join(' ');

    const containerClasses = [
        styles.container,
        fullScreen ? styles.fullScreen : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses}>
            <div className={styles.spinnerWrapper}>
                <div className={spinnerClasses}>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                </div>
                {text && <p className={styles.text}>{text}</p>}
            </div>
        </div>
    );
};

export default LoadingSpinner;