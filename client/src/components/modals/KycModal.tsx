import React, { useState } from 'react';
import { submitKycDocument } from '../../services/api';
import { X, ShieldCheck, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import styles from './KycModal.module.css';

interface KycModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const KycModal: React.FC<KycModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [kycFile, setKycFile] = useState<File | null>(null);
    const [kycDocType, setKycDocType] = useState('PASSPORT');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setKycFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!kycFile) {
            setMessage({ type: 'error', text: 'Please select a file.' });
            return;
        }
        
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData();
        formData.append('document', kycFile);
        formData.append('documentType', kycDocType);

        try {
            const res = await submitKycDocument(formData);
            setMessage({ type: 'success', text: res.data.message });
            
            onSuccess();

            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Upload error' });
        } finally {
            setIsLoading(false);
        }
    };

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
                    <div className={styles.headerContent}>
                        <div className={styles.iconContainer}>
                            <ShieldCheck className={styles.icon} size={24} />
                        </div>
                        <h2 className={styles.title}>Account Verification</h2>
                    </div>
                    <button onClick={onClose} className={styles.closeButton}>
                        <X size={20} />
                    </button>
                </div>
                
                <div className={styles.description}>
                    <p>To withdraw funds, you need to verify your identity. Please upload one of the required documents.</p>
                </div>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            <FileText size={16} />
                            Document Type
                        </label>
                        <select 
                            value={kycDocType} 
                            onChange={(e) => setKycDocType(e.target.value)} 
                            className={styles.formInput}
                        >
                            <option value="PASSPORT">Passport</option>
                            <option value="UTILITY_BILL">Utility Bill</option>
                            <option value="INTERNATIONAL_PASSPORT">International Passport</option>
                            <option value="RESIDENCE_PERMIT">Residence Permit</option>
                        </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            <Upload size={16} />
                            Document File (up to 10MB)
                        </label>
                        <div className={styles.fileInputContainer}>
                            <input 
                                type="file" 
                                accept="image/*,.pdf" 
                                onChange={handleFileChange} 
                                className={styles.fileInput}
                                id="kyc-file"
                                required 
                            />
                            <label htmlFor="kyc-file" className={styles.fileInputLabel}>
                                <Upload size={20} />
                                <span>{kycFile ? kycFile.name : 'Choose file...'}</span>
                            </label>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isLoading} 
                        className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
                    >
                        {isLoading ? (
                            <>
                                <div className={styles.spinner}></div>
                                Uploading...
                            </>
                        ) : (
                            <>
                                <ShieldCheck size={20} />
                                Submit for Verification
                            </>
                        )}
                    </button>
                    
                    {message.text && (
                        <div className={`${styles.messageContainer} ${styles[message.type]}`}>
                            {message.type === 'error' ? (
                                <AlertCircle size={20} />
                            ) : (
                                <CheckCircle size={20} />
                            )}
                            <span>{message.text}</span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default KycModal;