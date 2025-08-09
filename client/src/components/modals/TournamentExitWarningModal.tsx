import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TournamentExitWarningModal.module.css';

interface TournamentExitWarningModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmExit: () => void;
    tournamentName: string;
    matchId: string;
}

const TournamentExitWarningModal: React.FC<TournamentExitWarningModalProps> = ({
    isOpen,
    onClose,
    onConfirmExit,
    tournamentName,
    matchId
}) => {
    const [countdown, setCountdown] = useState(30);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isOpen) return;

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onConfirmExit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen, onConfirmExit]);

    const handleReturnToGame = () => {
        onClose();
        const currentPath = window.location.pathname;
        if (!currentPath.includes(`/tournament-game/${matchId}`)) {
            navigate(`/tournament-game/${matchId}`);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <span className={styles.icon}>⚠️</span>
                    <h2 className={styles.title}>Warning about leaving the tournament</h2>
                </div>

                <div className={styles.content}>
                    <p className={styles.message}>
                        You left a tournament match in a tournament <strong>"{tournamentName}"</strong>
                    </p>
                    
                    <div className={styles.warningBox}>
                        <p>
                            Do you have <strong className={styles.countdown}>{countdown} seconds</strong> 
                            to get back into the game, otherwise you will automatically lose the match!
                        </p>
                    </div>

                    <div className={styles.countdownCircle}>
                        <div 
                            className={styles.countdownProgress}
                            style={{ 
                                strokeDashoffset: `${283 - (283 * (30 - countdown)) / 30}px` 
                            }}
                        />
                        <span className={styles.countdownNumber}>{countdown}</span>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button 
                        onClick={handleReturnToGame}
                        className={styles.returnButton}
                    >
                        🎮 Return to the game
                    </button>
                    <button 
                        onClick={onConfirmExit}
                        className={styles.exitButton}
                    >
                        🚪 Leave the tournament
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TournamentExitWarningModal;