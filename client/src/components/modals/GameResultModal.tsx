import React from 'react';
import { Trophy, Frown, Handshake, X, ArrowLeft, Clock } from 'lucide-react';
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
                    icon: <Trophy size={64} />,
                    title: 'Victory!',
                    message: 'Congratulations! You won the match!',
                    className: styles.winResult,
                    gradient: 'linear-gradient(135deg, #10b981, #059669)'
                };
            case 'lose':
                return {
                    icon: <Frown size={64} />,
                    title: 'Defeat',
                    message: opponentName ? `You lost to ${opponentName}. Better luck next time!` : 'You lost this match. Keep trying!',
                    className: styles.loseResult,
                    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
                };
            case 'draw':
                return {
                    icon: <Handshake size={64} />,
                    title: 'Draw',
                    message: 'The match ended in a draw. Well played!',
                    className: styles.drawResult,
                    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
                };
            default:
                return {
                    icon: <Trophy size={64} />,
                    title: 'Game Over',
                    message: 'The match has ended.',
                    className: styles.defaultResult,
                    gradient: 'linear-gradient(135deg, #64748b, #475569)'
                };
        }
    };

    const config = getResultConfig();

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.backgroundElements}>
                <div className={styles.gradientOrb1}></div>
                <div className={styles.gradientOrb2}></div>
            </div>
            
            <div className={`${styles.modal} ${config.className}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                
                <div className={styles.content}>
                    <div className={styles.iconContainer} style={{ background: config.gradient }}>
                        {config.icon}
                        <div className={styles.iconGlow}></div>
                    </div>
                    
                    <h2 className={styles.title}>{config.title}</h2>
                    <p className={styles.message}>{config.message}</p>
                    
                    <div className={styles.statsSection}>
                        <div className={styles.statItem}>
                            <Clock size={16} />
                            <span>Returning in {countdown}s</span>
                        </div>
                    </div>
                </div>
                
                <div className={styles.footer}>
                    <button
                        className={styles.backButton}
                        onClick={onBackToLobby}
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Lobby</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameResultModal;