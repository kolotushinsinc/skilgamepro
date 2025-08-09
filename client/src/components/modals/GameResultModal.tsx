import React from 'react';
import styles from './GameResultModal.module.css';

interface GameResultModalProps {
    isOpen: boolean;
    result: 'win' | 'lose' | 'draw';
    opponentName?: string;
    onClose: () => void;
    onBackToLobby: () => void;
    countdown: number;
}

const GameResultModal: React.FC<GameResultModalProps> = ({ 
    isOpen, 
    result, 
    opponentName, 
    onClose, 
    onBackToLobby, 
    countdown 
}) => {
    if (!isOpen) return null;

    const getResultConfig = () => {
        switch (result) {
            case 'win':
                return {
                    icon: '🏆',
                    title: 'Congratulations!',
                    message: 'You won!',
                    className: styles.winResult
                };
            case 'lose':
                return {
                    icon: '😔',
                    title: 'Defeat',
                    message: opponentName ? `You lost. Winner.: ${opponentName}` : 'You lost',
                    className: styles.loseResult
                };
            case 'draw':
                return {
                    icon: '🤝',
                    title: 'Draw',
                    message: 'The game ended in a draw',
                    className: styles.drawResult
                };
            default:
                return {
                    icon: '🎮',
                    title: 'Game over',
                    message: 'Game over',
                    className: styles.defaultResult
                };
        }
    };

    const config = getResultConfig();

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={`${styles.modal} ${config.className}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.icon}>{config.icon}</div>
                    <h2 className={styles.title}>{config.title}</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
                
                <div className={styles.content}>
                    <p className={styles.message}>{config.message}</p>
                </div>
                
                <div className={styles.footer}>
                    <div className={styles.countdown}>
                        <p>Return to lobby via: <span className={styles.countdownNumber}>{countdown} сек</span></p>
                    </div>
                    <div className={styles.actions}>
                        <button 
                            className={`${styles.button} ${styles.primaryButton}`} 
                            onClick={onBackToLobby}
                        >
                            Return to lobby
                        </button>
                        <button 
                            className={`${styles.button} ${styles.secondaryButton}`} 
                            onClick={onClose}
                        >
                            Stay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameResultModal;