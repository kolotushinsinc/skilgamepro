import React, { useEffect, useState } from 'react';
import { Trophy, Clock, ArrowRight } from 'lucide-react';
import styles from './TournamentRedirectModal.module.css';

interface TournamentRedirectModalProps {
    isOpen: boolean;
    tournamentName: string;
    countdown: number;
    onRedirect: () => void;
}

const TournamentRedirectModal: React.FC<TournamentRedirectModalProps> = ({
    isOpen,
    tournamentName,
    countdown,
    onRedirect
}) => {
    const [timeLeft, setTimeLeft] = useState(countdown);

    useEffect(() => {
        if (isOpen && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            onRedirect();
        }
    }, [isOpen, timeLeft, onRedirect]);

    useEffect(() => {
        setTimeLeft(countdown);
    }, [countdown]);

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
                        <Trophy className={styles.icon} size={32} />
                    </div>
                    <h2 className={styles.title}>Tournament Starting</h2>
                </div>
                
                <div className={styles.content}>
                    <p className={styles.message}>
                        Your tournament <strong>"{tournamentName}"</strong> is starting now!
                    </p>
                    <div className={styles.countdownContainer}>
                        <Clock className={styles.clockIcon} size={20} />
                        <p className={styles.submessage}>
                            Redirecting in <span className={styles.countdown}>{timeLeft}</span> seconds
                        </p>
                    </div>
                </div>
                
                <div className={styles.footer}>
                    <button 
                        className={styles.redirectButton}
                        onClick={onRedirect}
                    >
                        <span>Join Tournament Now</span>
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TournamentRedirectModal;