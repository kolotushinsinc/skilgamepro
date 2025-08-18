import React from 'react';
import styles from './TimeoutWarningModal.module.css';

interface TimeoutWarningModalProps {
    isOpen: boolean;
    timeLeft: number; // Time left in seconds (countdown from 10)
    onClose?: () => void;
    onMakeMove: () => void; // New callback for Make Move button
}

const TimeoutWarningModal: React.FC<TimeoutWarningModalProps> = ({
    isOpen,
    timeLeft,
    onClose,
    onMakeMove
}) => {
    if (!isOpen) return null;

    const getWarningLevel = () => {
        if (timeLeft <= 3) return 'critical';
        if (timeLeft <= 6) return 'urgent';
        return 'warning';
    };

    const getWarningText = () => {
        if (timeLeft <= 0) return 'Time\'s up!';
        return `Make your move in ${timeLeft} seconds!`;
    };

    const getWarningIcon = () => {
        if (timeLeft <= 3) return '🚨';
        if (timeLeft <= 6) return '⚠️';
        return '⏰';
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div 
                className={`${styles.modal} ${styles[getWarningLevel()]}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.modalContent}>
                    <div className={styles.iconContainer}>
                        <div className={styles.warningIcon}>
                            {getWarningIcon()}
                        </div>
                        <div className={styles.countdownRing}>
                            <svg className={styles.progressCircle} viewBox="0 0 100 100">
                                <circle
                                    className={styles.progressBackground}
                                    cx="50"
                                    cy="50"
                                    r="45"
                                />
                                <circle
                                    className={styles.progressBar}
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    style={{
                                        strokeDasharray: `${2 * Math.PI * 45}`,
                                        strokeDashoffset: `${2 * Math.PI * 45 * (1 - timeLeft / 10)}`,
                                    }}
                                />
                            </svg>
                            <div className={styles.countdownNumber}>
                                {timeLeft}
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.messageContainer}>
                        <h2 className={styles.title}>
                            Time Running Out!
                        </h2>
                        <p className={styles.message}>
                            {getWarningText()}
                        </p>
                        <div className={styles.subtitle}>
                            You will automatically lose if you don't make a move
                        </div>
                    </div>
                    
                    <div className={styles.actions}>
                        <button
                            className={styles.makeMoveButton}
                            onClick={onMakeMove}
                        >
                            Make Move
                        </button>
                    </div>
                </div>
                
                <div className={styles.pulseEffect}></div>
            </div>
        </div>
    );
};

export default TimeoutWarningModal;