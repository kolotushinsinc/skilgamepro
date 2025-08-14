import React from 'react';
import { X, LogOut, ArrowLeft } from 'lucide-react';
import styles from './LogoutConfirmModal.module.css';

interface LogoutConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
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
                            <LogOut className={styles.logoutIcon} />
                        </div>
                        <div className={styles.titleSection}>
                            <h3>Confirm Logout</h3>
                            <p>Are you sure you want to log out?</p>
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
                            <p><strong>You will be logged out of your account</strong></p>
                            <p>Any unsaved progress may be lost. Make sure you're not in the middle of a game.</p>
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
                        <LogOut size={16} />
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirmModal;