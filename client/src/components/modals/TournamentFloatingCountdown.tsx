import React from 'react';
import { Clock, X, Gamepad2 } from 'lucide-react';
import styles from './TournamentFloatingCountdown.module.css';

interface TournamentFloatingCountdownProps {
    isOpen: boolean;
    tournamentName: string;
    timeLeft: number;
    onReturnToGame: () => void;
    onConfirmExit: () => void;
}

const TournamentFloatingCountdown: React.FC<TournamentFloatingCountdownProps> = ({
    isOpen,
    tournamentName,
    timeLeft,
    onReturnToGame,
    onConfirmExit
}) => {
    if (!isOpen) return null;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    return (
        <div className={styles.floatingCountdown}>
            <div className={styles.animatedBackground}>
                <div className={styles.floatingElement}></div>
                <div className={styles.floatingElement}></div>
            </div>
            
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <Clock className={styles.icon} size={20} />
                    <span className={styles.title}>Return to Tournament</span>
                </div>
                <button 
                    onClick={onConfirmExit}
                    className={styles.closeButton}
                    title="Leave tournament permanently"
                >
                    <X size={16} />
                </button>
            </div>
            
            <div className={styles.content}>
                <div className={styles.tournamentInfo}>
                    <span className={styles.tournamentName}>{tournamentName}</span>
                </div>
                
                <div className={styles.countdown}>
                    <div className={styles.timeDisplay}>
                        <span className={styles.timeNumber}>{timeString}</span>
                        <span className={styles.timeLabel}>until automatic defeat</span>
                    </div>
                    
                    <div className={styles.progressBar}>
                        <div 
                            className={styles.progressFill}
                            style={{ width: `${(timeLeft / 30) * 100}%` }}
                        />
                    </div>
                </div>
                
                <button 
                    onClick={onReturnToGame}
                    className={styles.returnButton}
                >
                    <Gamepad2 size={16} />
                    <span>Return to Game</span>
                </button>
            </div>
        </div>
    );
};

export default TournamentFloatingCountdown;