import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Gamepad2, DoorOpen, Clock, RotateCcw } from 'lucide-react';
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
                <div className={styles.animatedBackground}>
                    <div className={styles.floatingElement}></div>
                    <div className={styles.floatingElement}></div>
                    <div className={styles.floatingElement}></div>
                </div>
                
                <div className={styles.header}>
                    <div className={styles.iconContainer}>
                        <AlertTriangle className={styles.icon} size={40} />
                    </div>
                    <h2 className={styles.title}>Tournament Exit Warning</h2>
                </div>

                <div className={styles.content}>
                    <p className={styles.message}>
                        You left a tournament match in <strong>"{tournamentName}"</strong>
                    </p>
                    
                    <div className={styles.warningBox}>
                        <div className={styles.warningContent}>
                            <Clock className={styles.warningIcon} size={24} />
                            <p>
                                You have <strong className={styles.countdown}>{countdown} seconds</strong> 
                                to return to the game, otherwise you will automatically lose the match!
                            </p>
                        </div>
                    </div>

                    <div className={styles.countdownCircle}>
                        <div 
                            className={styles.countdownProgress}
                            style={{ 
                                transform: `rotate(${(360 * (30 - countdown)) / 30}deg)` 
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
                        <Gamepad2 size={20} />
                        <span>Return to Game</span>
                    </button>
                    <button 
                        onClick={onConfirmExit}
                        className={styles.exitButton}
                    >
                        <DoorOpen size={20} />
                        <span>Leave Tournament</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TournamentExitWarningModal;