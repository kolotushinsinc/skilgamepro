import React from 'react';
import styles from './MoveTimer.module.css';

interface MoveTimerProps {
    timeLeft: number;
    isWarning: boolean;
    isActive: boolean;
    progress: number;
    className?: string;
}

const MoveTimer: React.FC<MoveTimerProps> = ({
    timeLeft,
    isWarning,
    isActive,
    progress,
    className = ''
}) => {
    const formatTime = (seconds: number): string => {
        return seconds.toString();
    };

    const getTimerClassName = () => {
        const classes = [styles.timer];
        
        if (className) {
            classes.push(className);
        }
        
        if (!isActive) {
            classes.push(styles.inactive);
        } else if (isWarning) {
            classes.push(styles.warning);
        } else {
            classes.push(styles.normal);
        }
        
        return classes.join(' ');
    };

    const getProgressColor = () => {
        if (!isActive) return '#64748b';
        if (isWarning) return '#ef4444';
        if (progress > 66) return '#f59e0b';
        if (progress > 33) return '#10b981';
        return '#3b82f6';
    };

    return (
        <div className={getTimerClassName()}>
            <div className={styles.timerContent}>
                <div className={styles.timeDisplay}>
                    <span className={styles.timeNumber}>
                        {formatTime(timeLeft)}
                    </span>
                    <span className={styles.timeLabel}>sec</span>
                </div>
                
                <div className={styles.progressContainer}>
                    <svg className={styles.progressRing} viewBox="0 0 100 100">
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
                                stroke: getProgressColor(),
                                strokeDasharray: `${2 * Math.PI * 45}`,
                                strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`,
                                transition: isWarning ? 'none' : 'stroke-dashoffset 1s linear'
                            }}
                        />
                    </svg>
                </div>
            </div>
            
            {isWarning && (
                <div className={styles.warningPulse}>
                    ⚠️
                </div>
            )}
        </div>
    );
};

export default MoveTimer;