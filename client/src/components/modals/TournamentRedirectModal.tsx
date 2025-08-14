import React, { useEffect, useState } from 'react';
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
                <div className={styles.header}>
                    <div className={styles.icon}>🏆</div>
                    <h2 className={styles.title}>Tournament Starting</h2>
                </div>
                
                <div className={styles.content}>
                    <p className={styles.message}>
                        Your tournament <strong>"{tournamentName}"</strong> is starting now!
                    </p>
                    <p className={styles.submessage}>
                        You will be redirected to the tournament in <span className={styles.countdown}>{timeLeft}</span> seconds
                    </p>
                </div>
                
                <div className={styles.footer}>
                    <button 
                        className={styles.redirectButton}
                        onClick={onRedirect}
                    >
                        Go to Tournament Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TournamentRedirectModal;