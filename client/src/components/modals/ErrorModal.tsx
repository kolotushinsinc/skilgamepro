import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
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
                <div className={styles.animatedBackground}>
                    <div className={styles.floatingElement}></div>
                    <div className={styles.floatingElement}></div>
                    <div className={styles.floatingElement}></div>
                </div>
                
                <div className={styles.header}>
                    <div className={styles.iconContainer}>
                        <AlertTriangle className={styles.icon} size={24} />
                        <h3 className={styles.title}>Invalid Move</h3>
                    </div>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                
                <div className={styles.content}>
                    <p className={styles.message}>{message}</p>
                </div>
                
                <div className={styles.footer}>
                    <button className={styles.okButton} onClick={onClose}>
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;