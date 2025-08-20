import React from 'react';
import styles from './ConfirmationModal.module.css';
import { AlertTriangle, X, Trash2, CheckCircle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'danger'
}) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'danger':
                return <Trash2 size={24} />;
            case 'warning':
                return <AlertTriangle size={24} />;
            case 'info':
                return <CheckCircle size={24} />;
            default:
                return <AlertTriangle size={24} />;
        }
    };

    const getIconClass = () => {
        switch (type) {
            case 'danger':
                return styles.iconDanger;
            case 'warning':
                return styles.iconWarning;
            case 'info':
                return styles.iconInfo;
            default:
                return styles.iconWarning;
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.titleSection}>
                        <div className={`${styles.icon} ${getIconClass()}`}>
                            {getIcon()}
                        </div>
                        <h2>{title}</h2>
                    </div>
                    <button onClick={onClose} className={styles.closeButton}>
                        <X size={20} />
                    </button>
                </div>
                
                <div className={styles.content}>
                    <p className={styles.message}>{message}</p>
                </div>

                <div className={styles.actions}>
                    <button 
                        onClick={onClose} 
                        className={`${styles.btn} ${styles.btnSecondary}`}
                    >
                        {cancelText}
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className={`${styles.btn} ${styles.btnPrimary} ${styles[`btn${type.charAt(0).toUpperCase() + type.slice(1)}`]}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;