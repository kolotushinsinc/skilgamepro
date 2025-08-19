import React from 'react';
import { X, Flag, ArrowLeft } from 'lucide-react';
import styles from './SurrenderConfirmModal.module.css';

interface SurrenderConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const SurrenderConfirmModal: React.FC<SurrenderConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm
}) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <div className={styles.iconContainer}>
                            <Flag className={styles.surrenderIcon} />
                        </div>
                        <div className={styles.titleSection}>
                            <h3>Confirm Surrender</h3>
                            <p>Are you sure you want to surrender?</p>
                        </div>
                    </div>
                    <button onClick={onClose} className={styles.closeButton}>
                        <X />
                    </button>
                </div>

                <div className={styles.content}>
                    <div className={styles.warningBox}>
                        <div className={styles.warningIcon}>⚠️</div>
                        <div className={styles.warningText}>
                            <p><strong>You will lose this game</strong></p>
                            <p>Your opponent will be declared the winner and you will lose your bet. This action cannot be undone.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button 
                        onClick={onClose}
                        className={styles.cancelButton}
                        type="button"
                    >
                        <ArrowLeft size={16} />
                        Cancel
                    </button>
                    <button 
                        onClick={handleConfirm}
                        className={styles.confirmButton}
                        type="button"
                    >
                        <Flag size={16} />
                        Surrender
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SurrenderConfirmModal;