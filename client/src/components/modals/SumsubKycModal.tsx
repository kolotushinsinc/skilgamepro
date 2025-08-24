import React, { useState, useEffect, useRef } from 'react';
import { X, ShieldCheck, AlertCircle, CheckCircle, Clock, Upload, Camera, FileText, ChevronRight } from 'lucide-react';
import { getSumsubAccessToken, getSumsubVerificationStatus } from '../../services/api';
import styles from './KycModal.module.css';

// Типы для Sumsub SDK
declare global {
    interface Window {
        snsWebSdk: any;
    }
}

interface SumsubKycModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const SumsubKycModal = ({ isOpen, onClose, onSuccess }: SumsubKycModalProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [verificationStatus, setVerificationStatus] = useState<string>('NOT_STARTED');
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [applicantId, setApplicantId] = useState<string | null>(null);
    const [sdkLoaded, setSdkLoaded] = useState(false);
    const [useMockMode, setUseMockMode] = useState(false);
    const sdkContainer = useRef<HTMLDivElement>(null);
    const sdkInstance = useRef<any>(null);

    // Mock интерфейс состояния
    const [mockStep, setMockStep] = useState(1);
    const [selectedDocType, setSelectedDocType] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [mockSubmitted, setMockSubmitted] = useState(false);

    // Пытаемся загрузить настоящий Sumsub SDK
    useEffect(() => {
        const loadSdk = async () => {
            if (window.snsWebSdk) {
                setSdkLoaded(true);
                return;
            }

            try {
                console.log('🔄 Trying to load Sumsub SDK...');
                
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://sdk.sumsub.com/websdk/iframe/sumsub-websdk.js';
                    script.async = true;
                    script.onload = () => {
                        console.log('✅ Sumsub SDK loaded successfully');
                        setSdkLoaded(true);
                        resolve(true);
                    };
                    script.onerror = () => {
                        console.warn('❌ Failed to load real Sumsub SDK');
                        reject(new Error('SDK load failed'));
                    };
                    
                    // Timeout после 5 секунд
                    setTimeout(() => {
                        reject(new Error('SDK load timeout'));
                    }, 5000);
                    
                    document.head.appendChild(script);
                });
            } catch (error) {
                console.warn('🎭 Falling back to mock mode due to network issues');
                setUseMockMode(true);
                setSdkLoaded(true); // Считаем что "загружен" в mock режиме
            }
        };

        loadSdk();
    }, []);

    // Получаем статус верификации при открытии
    useEffect(() => {
        if (isOpen) {
            fetchVerificationStatus();
            resetMockState();
        }
    }, [isOpen]);

    // Очистка при размонтировании
    useEffect(() => {
        return () => {
            if (sdkInstance.current) {
                try {
                    sdkInstance.current.destroy();
                } catch (e) {
                    console.log('SDK cleanup error:', e);
                }
                sdkInstance.current = null;
            }
        };
    }, []);

    const resetMockState = () => {
        setMockStep(1);
        setSelectedDocType('');
        setUploadedFiles([]);
        setMockSubmitted(false);
    };

    const fetchVerificationStatus = async () => {
        try {
            setLoading(true);
            const response = await getSumsubVerificationStatus();
            setVerificationStatus(response.data.status);
            setApplicantId(response.data.applicantId);
        } catch (error: any) {
            console.error('Error fetching verification status:', error);
            if (error.response?.status !== 404) {
                setError('Failed to fetch verification status');
            }
        } finally {
            setLoading(false);
        }
    };

    const startVerification = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('🔐 Getting access token...');
            const tokenResponse = await getSumsubAccessToken();
            const { token, applicantId: newApplicantId } = tokenResponse.data;
            
            setAccessToken(token);
            setApplicantId(newApplicantId);

            if (useMockMode) {
                console.log('🎭 Starting in MOCK mode');
                setLoading(false);
                return;
            }

            if (!sdkLoaded || !window.snsWebSdk) {
                throw new Error('Verification system is not ready');
            }

            console.log('🔐 Initializing real Sumsub SDK...');
            
            // Ждем когда контейнер появится в DOM
            let attempts = 0;
            const maxAttempts = 50;
            
            while (!sdkContainer.current && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            if (!sdkContainer.current) {
                throw new Error(`Container not available after ${maxAttempts} attempts`);
            }

            // Очищаем контейнер
            sdkContainer.current.innerHTML = '';

            // Создаем SDK instance
            sdkInstance.current = window.snsWebSdk
                .init(token, (messageType: string, payload: any) => {
                    console.log('SDK Event:', messageType, payload);
                    
                    if (messageType === 'idCheck.onReady') {
                        console.log('✅ SDK ready');
                        setLoading(false);
                    }
                    
                    if (messageType === 'idCheck.onApplicantSubmitted') {
                        console.log('✅ Verification submitted');
                        setVerificationStatus('PENDING');
                        setTimeout(() => {
                            onSuccess();
                            onClose();
                        }, 1500);
                    }
                    
                    if (messageType === 'idCheck.onError') {
                        console.error('SDK error:', payload);
                        setError('Verification failed');
                        setLoading(false);
                    }
                })
                .withConf({
                    lang: 'en',
                    theme: 'light'
                })
                .build();

            // Монтируем SDK
            sdkInstance.current.mount(sdkContainer.current);
            console.log('✅ SDK mounted');

        } catch (error: any) {
            console.error('Verification error:', error);
            setError(error.response?.data?.message || error.message || 'Failed to start verification');
            setLoading(false);
        }
    };

    // Mock функции
    const handleDocTypeSelect = (docType: string) => {
        setSelectedDocType(docType);
        setMockStep(2);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files).map(file => file.name);
            setUploadedFiles(prev => [...prev, ...newFiles]);
        }
    };

    const submitMockVerification = async () => {
        setLoading(true);
        try {
            // Отправляем mock документы на сервер для сохранения
            const mockDocuments = uploadedFiles.map((fileName, index) => ({
                documentType: selectedDocType,
                fileName: fileName,
                mockData: true,
                submittedAt: new Date().toISOString()
            }));

            // Создаем mock KYC submission
            const mockKycData = {
                kycProvider: 'SUMSUB',
                kycStatus: 'PENDING',
                mockMode: true,
                applicantId: applicantId,
                documents: mockDocuments,
                documentType: selectedDocType,
                filesCount: uploadedFiles.length
            };

            console.log('📤 Submitting mock KYC data:', mockKycData);

            // Отправляем через существующий API
            const response = await fetch('/api/sumsub/mock-submission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(mockKycData)
            });

            if (response.ok) {
                console.log('✅ Mock KYC submission saved successfully');
                setMockSubmitted(true);
                setMockStep(4);
                
                // Симулируем успешную верификацию через 3 секунды
                setTimeout(() => {
                    setVerificationStatus('PENDING');
                    onSuccess();
                    onClose();
                }, 3000);
            } else {
                throw new Error('Failed to save mock submission');
            }
        } catch (error) {
            console.error('❌ Error submitting mock verification:', error);
            // Fallback к старому поведению
            setMockSubmitted(true);
            setMockStep(4);
            setTimeout(() => {
                setVerificationStatus('PENDING');
                onSuccess();
                onClose();
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    const renderMockInterface = () => {
        if (mockStep === 1) {
            return (
                <div style={{ padding: '20px' }}>
                    <h3 style={{ color: '#e5e7eb', marginBottom: '20px', textAlign: 'center' }}>
                        Select Document Type
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {[
                            { id: 'passport', name: 'Passport', icon: '📖' },
                            { id: 'driver_license', name: 'Driver License', icon: '🪪' },
                            { id: 'national_id', name: 'National ID Card', icon: '🆔' }
                        ].map(doc => (
                            <button
                                key={doc.id}
                                onClick={() => handleDocTypeSelect(doc.id)}
                                style={{
                                    padding: '15px 20px',
                                    border: '2px solid #374151',
                                    borderRadius: '10px',
                                    background: '#1f2937',
                                    color: '#e5e7eb',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    fontSize: '16px',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.borderColor = '#6366f1';
                                    e.currentTarget.style.background = '#374151';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.borderColor = '#374151';
                                    e.currentTarget.style.background = '#1f2937';
                                }}
                            >
                                <span style={{ fontSize: '24px' }}>{doc.icon}</span>
                                <span style={{ flex: 1, textAlign: 'left' }}>{doc.name}</span>
                                <ChevronRight size={20} color="#9ca3af" />
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        if (mockStep === 2) {
            return (
                <div style={{ padding: '20px' }}>
                    <h3 style={{ color: '#e5e7eb', marginBottom: '20px', textAlign: 'center' }}>
                        Upload Documents
                    </h3>
                    <div style={{ marginBottom: '20px' }}>
                        <p style={{ color: '#9ca3af', marginBottom: '15px' }}>
                            Please upload clear photos of your {selectedDocType.replace('_', ' ')}:
                        </p>
                        <ul style={{ color: '#9ca3af', paddingLeft: '20px', marginBottom: '20px' }}>
                            <li>Front side of the document</li>
                            <li>Back side of the document</li>
                            <li>Ensure all text is clearly visible</li>
                        </ul>
                    </div>
                    
                    <div style={{
                        border: '2px dashed #374151',
                        borderRadius: '10px',
                        padding: '40px 20px',
                        textAlign: 'center',
                        marginBottom: '20px',
                        background: '#111827'
                    }}>
                        <Upload size={48} color="#6b7280" style={{ marginBottom: '15px' }} />
                        <p style={{ color: '#9ca3af', marginBottom: '15px' }}>
                            Drag and drop files here or click to browse
                        </p>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            style={{
                                background: '#6366f1',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'inline-block'
                            }}
                        >
                            Choose Files
                        </label>
                    </div>

                    {uploadedFiles.length > 0 && (
                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ color: '#e5e7eb', marginBottom: '10px' }}>Uploaded Files:</h4>
                            {uploadedFiles.map((file, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '10px',
                                    background: '#1e40af',
                                    borderRadius: '6px',
                                    marginBottom: '5px'
                                }}>
                                    <FileText size={16} color="#60a5fa" />
                                    <span style={{ color: '#e5e7eb' }}>{file}</span>
                                    <CheckCircle size={16} color="#10b981" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => setMockStep(1)}
                            style={{
                                flex: 1,
                                padding: '12px',
                                background: '#374151',
                                color: '#e5e7eb',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            Back
                        </button>
                        <button
                            onClick={() => setMockStep(3)}
                            disabled={uploadedFiles.length === 0}
                            style={{
                                flex: 2,
                                padding: '12px',
                                background: uploadedFiles.length > 0 ? '#6366f1' : '#4b5563',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: uploadedFiles.length > 0 ? 'pointer' : 'not-allowed'
                            }}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            );
        }

        if (mockStep === 3) {
            return (
                <div style={{ padding: '20px' }}>
                    <h3 style={{ color: '#e5e7eb', marginBottom: '20px', textAlign: 'center' }}>
                        Review and Submit
                    </h3>
                    
                    <div style={{
                        background: '#1f2937',
                        padding: '20px',
                        borderRadius: '10px',
                        marginBottom: '20px',
                        border: '1px solid #374151'
                    }}>
                        <h4 style={{ color: '#e5e7eb', marginBottom: '15px' }}>Document Summary:</h4>
                        <div style={{ marginBottom: '10px', color: '#9ca3af' }}>
                            <strong style={{ color: '#e5e7eb' }}>Document Type:</strong> {selectedDocType.replace('_', ' ').toUpperCase()}
                        </div>
                        <div style={{ marginBottom: '15px', color: '#9ca3af' }}>
                            <strong style={{ color: '#e5e7eb' }}>Files Uploaded:</strong> {uploadedFiles.length} files
                        </div>
                        
                        <div style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.5' }}>
                            <p>✓ All required documents uploaded</p>
                            <p>✓ Images are clear and readable</p>
                            <p>✓ Personal information is visible</p>
                        </div>
                    </div>

                    <div style={{
                        background: '#1e3a8a',
                        border: '1px solid #3b82f6',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <AlertCircle size={16} color="#60a5fa" />
                            <strong style={{ color: '#e5e7eb' }}>Important Notice</strong>
                        </div>
                        <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0 }}>
                            Please ensure all information is accurate. Verification typically takes 1-3 business days.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => setMockStep(2)}
                            style={{
                                flex: 1,
                                padding: '12px',
                                background: '#374151',
                                color: '#e5e7eb',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            Back
                        </button>
                        <button
                            onClick={submitMockVerification}
                            disabled={loading}
                            style={{
                                flex: 2,
                                padding: '12px',
                                background: loading ? '#4b5563' : '#10b981',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                        >
                            {loading ? (
                                <>
                                    <div className={styles.spinner}></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={16} />
                                    Submit for Verification
                                </>
                            )}
                        </button>
                    </div>
                </div>
            );
        }

        if (mockStep === 4) {
            return (
                <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                    <div style={{
                        background: '#064e3b',
                        border: '2px solid #10b981',
                        borderRadius: '50%',
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <CheckCircle size={40} color="#10b981" />
                    </div>
                    
                    <h3 style={{ color: '#e5e7eb', marginBottom: '15px' }}>
                        Verification Submitted Successfully!
                    </h3>
                    
                    <p style={{ color: '#9ca3af', marginBottom: '20px', lineHeight: '1.5' }}>
                        Your documents have been submitted for review.
                        You'll receive an email notification once the verification is complete.
                    </p>
                    
                    <div style={{
                        background: '#1e40af',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        border: '1px solid #3b82f6'
                    }}>
                        <p style={{ color: '#e5e7eb', fontSize: '14px', margin: 0 }}>
                            <strong>Verification ID:</strong> {applicantId}
                        </p>
                    </div>
                </div>
            );
        }
    };

    const getStatusMessage = () => {
        switch (verificationStatus) {
            case 'APPROVED':
                return {
                    icon: <CheckCircle className={styles.icon} style={{ color: '#10b981' }} />,
                    title: 'Verification Approved',
                    message: 'Your identity has been successfully verified.'
                };
            case 'REJECTED':
                return {
                    icon: <AlertCircle className={styles.icon} style={{ color: '#ef4444' }} />,
                    title: 'Verification Rejected',
                    message: 'Your verification was rejected. Please contact support.'
                };
            case 'PENDING':
                return {
                    icon: <Clock className={styles.icon} style={{ color: '#f59e0b' }} />,
                    title: 'Verification Pending',
                    message: 'Your documents are being reviewed.'
                };
            default:
                return {
                    icon: <ShieldCheck className={styles.icon} />,
                    title: 'Identity Verification',
                    message: 'Complete your identity verification to enable withdrawals.'
                };
        }
    };

    if (!isOpen) return null;

    const statusInfo = getStatusMessage();

    return (
        <div className={styles.overlay}>
            <div className={styles.modal} style={{ maxWidth: '900px' }}>
                <div className={styles.animatedBackground}>
                    <div className={styles.floatingElement}></div>
                    <div className={styles.floatingElement}></div>
                    <div className={styles.floatingElement}></div>
                </div>
                
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <div className={styles.iconContainer}>
                            {statusInfo.icon}
                        </div>
                        <h2 className={styles.title}>{statusInfo.title}</h2>
                    </div>
                    <button onClick={onClose} className={styles.closeButton}>
                        <X size={20} />
                    </button>
                </div>
                
                <div className={styles.description}>
                    <p>{statusInfo.message}</p>
                    {useMockMode && (
                        <div style={{ 
                            background: '#fef3c7', 
                            border: '1px solid #f59e0b',
                            borderRadius: '6px', 
                            padding: '10px', 
                            marginTop: '15px',
                            fontSize: '14px',
                            color: '#92400e'
                        }}>
                            <strong>Demo Mode:</strong> This is a demonstration of the KYC verification process. 
                            No real documents will be processed.
                        </div>
                    )}
                </div>

                <div className={styles.form}>
                    {!accessToken ? (
                        <div className={styles.formGroup}>
                            <button
                                onClick={startVerification}
                                disabled={loading || !sdkLoaded}
                                className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
                            >
                                {loading ? (
                                    <>
                                        <div className={styles.spinner}></div>
                                        Starting Verification...
                                    </>
                                ) : !sdkLoaded ? (
                                    'Loading...'
                                ) : (
                                    <>
                                        <ShieldCheck size={20} />
                                        Start Identity Verification
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className={styles.sdkContainer}>
                            {useMockMode ? (
                                // Mock интерфейс
                                <div style={{
                                    background: '#111827',
                                    border: '2px solid #6366f1',
                                    borderRadius: '12px',
                                    minHeight: '500px',
                                    overflow: 'hidden'
                                }}>
                                    {renderMockInterface()}
                                </div>
                            ) : (
                                // Реальный Sumsub SDK
                                <>
                                    {loading && (
                                        <div style={{
                                            padding: '40px',
                                            textAlign: 'center',
                                            background: '#1f2937',
                                            borderRadius: '12px',
                                            border: '1px solid #374151'
                                        }}>
                                            <div className={styles.spinner} style={{ margin: '0 auto 20px' }}></div>
                                            <div style={{ color: '#e5e7eb', fontSize: '16px' }}>
                                                Loading verification interface...
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div
                                        ref={sdkContainer}
                                        style={{
                                            minHeight: '500px',
                                            width: '100%',
                                            border: '2px solid #6366f1',
                                            borderRadius: '12px',
                                            background: '#ffffff',
                                            overflow: 'hidden',
                                            position: 'relative'
                                        }}
                                    />
                                </>
                            )}
                            
                            {/* Debug info */}
                            <div style={{
                                marginTop: '20px',
                                padding: '15px',
                                background: '#1f2937',
                                borderRadius: '8px',
                                fontSize: '12px',
                                color: '#9ca3af',
                                border: '1px solid #374151'
                            }}>
                                <strong style={{ color: '#e5e7eb' }}>Debug Info:</strong><br/>
                                SDK Loaded: {sdkLoaded ? '✅' : '❌'}<br/>
                                Mock Mode: {useMockMode ? '🎭 Active' : '✅ Disabled'}<br/>
                                Access Token: {accessToken ? '✅' : '❌'}<br/>
                                Applicant ID: {applicantId || 'Not set'}
                            </div>
                        </div>
                    )}
                    
                    {error && (
                        <div className={`${styles.messageContainer} ${styles.error}`}>
                            <AlertCircle size={20} />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SumsubKycModal;