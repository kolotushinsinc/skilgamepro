import React from 'react';
import { CheckCircle, XCircle, Loader2, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';
import styles from './PaymentStatusModal.module.css';

interface PaymentStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    status: 'success' | 'error' | 'loading';
    title: string;
    message: string;
    amount?: number;
    operation?: 'deposit' | 'withdraw';
}

const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({
    isOpen,
    onClose,
    status,
    title,
    message,
    amount,
    operation
}) => {
    if (!isOpen) return null;

    const getStatusIcon = () => {
        switch (status) {
            case 'success':
                return <CheckCircle className={styles.icon} size={48} />;
            case 'error':
                return <XCircle className={styles.icon} size={48} />;
            case 'loading':
                return <Loader2 className={`${styles.icon} ${styles.spinning}`} size={48} />;
            default:
                return <CreditCard className={styles.icon} size={48} />;
        }
    };

    const getStatusClass = () => {
        switch (status) {
            case 'success':
                return styles.success;
            case 'error':
                return styles.error;
            case 'loading':
                return styles.loading;
            default:
                return '';
        }
    };

    const getOperationIcon = () => {
        if (operation === 'deposit') {
            return <TrendingUp size={20} />;
        } else if (operation === 'withdraw') {
            return <TrendingDown size={20} />;
        }
        return <CreditCard size={20} />;
    };

    return (
        <div className={styles.overlay} onClick={status !== 'loading' ? onClose : undefined}>
            <div className={`${styles.modal} ${getStatusClass()}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.animatedBackground}>
                    <div className={styles.floatingElement}></div>
                    <div className={styles.floatingElement}></div>
                    <div className={styles.floatingElement}></div>
                </div>
                
                <div className={styles.header}>
                    <div className={styles.iconContainer}>
                        {getStatusIcon()}
                    </div>
                    <h2 className={styles.title}>{title}</h2>
                </div>
                
                <div className={styles.content}>
                    <p className={styles.message}>{message}</p>
                    
                    {amount && operation && status === 'success' && (
                        <div className={styles.amountInfo}>
                            <div className={styles.operationType}>
                                {getOperationIcon()}
                                <span>{operation === 'deposit' ? 'Deposit' : 'Withdrawal'}</span>
                            </div>
                            <div className={styles.amount}>
                                {operation === 'deposit' ? '+' : '-'}${amount.toFixed(2)}
                            </div>
                        </div>
                    )}
                </div>

                {status !== 'loading' && (
                    <div className={styles.actions}>
                        <button 
                            onClick={onClose} 
                            className={styles.closeButton}
                        >
                            Got it
                        </button>
                    </div>
                )}

                {status === 'loading' && (
                    <div className={styles.loadingContent}>
                        <div className={styles.loadingText}>Processing payment...</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentStatusModal;