import React from 'react';
import { RotateCw, AlertTriangle, X } from 'lucide-react';
import styles from './RotationWarningModal.module.css';

interface RotationWarningModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const RotationWarningModal: React.FC<RotationWarningModalProps> = ({
    isOpen,
    onClose,
    onConfirm
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button 
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>
                
                <div className={styles.modalHeader}>
                    <AlertTriangle className={styles.warningIcon} />
                    <h2 className={styles.modalTitle}>Rotate Your Device</h2>
                </div>
                
                <div className={styles.modalBody}>
                    <div className={styles.rotationIcon}>
                        <RotateCw size={48} className={styles.rotateAnimation} />
                    </div>
                    
                    <p className={styles.warningText}>
                        For the best backgammon gaming experience, please rotate your device to landscape (horizontal) orientation.
                    </p>
                    
                    <div className={styles.warningList}>
                        <div className={styles.warningItem}>
                            <span className={styles.bullet}>📱</span>
                            <span>Hold your device horizontally</span>
                        </div>
                        <div className={styles.warningItem}>
                            <span className={styles.bullet}>🎯</span>
                            <span>Better view of the game board</span>
                        </div>
                        <div className={styles.warningItem}>
                            <span className={styles.bullet}>🎮</span>
                            <span>Improved gameplay experience</span>
                        </div>
                        <div className={styles.warningItem}>
                            <span className={styles.bullet}>✨</span>
                            <span>More comfortable controls</span>
                        </div>
                    </div>
                    
                    <div className={styles.instructionNote}>
                        <strong>Note:</strong> You need to manually rotate your device. The game will automatically adapt to landscape mode when you do.
                    </div>
                </div>
                
                <div className={styles.modalActions}>
                    <button 
                        className={styles.cancelButton}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className={styles.confirmButton}
                        onClick={onConfirm}
                    >
                        <RotateCw size={16} />
                        Got It!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RotationWarningModal;