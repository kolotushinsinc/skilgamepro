import React from 'react';
import { X, Wallet, ArrowRight, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './InsufficientFundsModal.module.css';

interface InsufficientFundsModalProps {
    isOpen: boolean;
    onClose: () => void;
    requiredAmount?: number;
    currentBalance?: number;
}

const InsufficientFundsModal: React.FC<InsufficientFundsModalProps> = ({
    isOpen,
    onClose,
    requiredAmount,
    currentBalance = 0
}) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleGoToDeposit = () => {
        onClose();
        // Navigate to profile page with Payment History tab focused
        navigate('/profile?section=payment-history');
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <div className={styles.iconContainer}>
                            <AlertTriangle className={styles.warningIcon} />
                        </div>
                        <div className={styles.titleSection}>
                            <h3>Insufficient Funds</h3>
                            <p>You don't have enough balance to join this game</p>
                        </div>
                    </div>
                    <button onClick={onClose} className={styles.closeButton}>
                        <X />
                    </button>
                </div>

                <div className={styles.content}>
                    <div className={styles.balanceInfo}>
                        <div className={styles.balanceRow}>
                            <span className={styles.label}>Current Balance:</span>
                            <span className={styles.amount}>${currentBalance.toFixed(2)}</span>
                        </div>
                        {requiredAmount && (
                            <div className={styles.balanceRow}>
                                <span className={styles.label}>Required Amount:</span>
                                <span className={styles.amountRequired}>${requiredAmount.toFixed(2)}</span>
                            </div>
                        )}
                    </div>

                    <div className={styles.messageBox}>
                        <div className={styles.messageIcon}>💰</div>
                        <div className={styles.messageText}>
                            <p><strong>Ready to get back in the game?</strong></p>
                            <p>Add funds to your account and start playing immediately. Quick and secure deposit options available.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button 
                        onClick={onClose}
                        className={styles.cancelButton}
                        type="button"
                    >
                        <X size={16} />
                        Close
                    </button>
                    <button 
                        onClick={handleGoToDeposit}
                        className={styles.depositButton}
                        type="button"
                    >
                        <Wallet size={16} />
                        Add Funds
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InsufficientFundsModal;