import React from 'react';
import styles from './ErrorModal.module.css';

interface ErrorModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h3>⚠️ Wrong move</h3>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <div className={styles.content}>
                    <p>{message}</p>
                </div>
                <div className={styles.footer}>
                    <button className={styles.okButton} onClick={onClose}>
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;