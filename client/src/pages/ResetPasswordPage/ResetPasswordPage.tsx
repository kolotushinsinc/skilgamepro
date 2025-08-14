import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './ResetPasswordPage.module.css';
import { Crown, KeyRound, Lock, Eye, EyeOff, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { API_URL } from '../../api/index';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ResetPasswordPage: React.FC = () => {
    const [secretCode, setSecretCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            setError('Email not found. Please start reset procedure again..');
            setTimeout(() => navigate('/forgot-password'), 3000);
        }
    }, [email, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsLoading(true);
        try {
            await axios.post(`${API_URL}/api/auth/reset-password`, { email, secretCode, newPassword });
            setMessage('Password successfully reset! Redirecting to login page...');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!email) {
        return (
            <div className={styles.authContainer}>
                <div className={styles.backgroundElements}>
                    <div className={styles.gradientOrb1}></div>
                    <div className={styles.gradientOrb2}></div>
                    <div className={styles.gradientOrb3}></div>
                </div>
                
                <div className={styles.authCard}>
                    <div className={styles.errorSection}>
                        <div className={styles.errorIcon}>
                            <AlertTriangle size={48} />
                        </div>
                        <div className={styles.alertError}>
                            <h3>Access Error</h3>
                            <p>{error || 'Email not found. Redirecting to password reset...'}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.authContainer}>
            <div className={styles.backgroundElements}>
                <div className={styles.gradientOrb1}></div>
                <div className={styles.gradientOrb2}></div>
                <div className={styles.gradientOrb3}></div>
            </div>
            
            <div className={styles.authCard}>
                <div className={styles.authHeader}>
                    <div className={styles.logo}>
                        <div className={styles.logoIconContainer}>
                            <Crown className={styles.logoIcon} />
                        </div>
                        <div className={styles.logoTextContainer}>
                            <h1 className={styles.logoText}>Skill Game</h1>
                            <p className={styles.logoSubtext}>Gaming Platform</p>
                        </div>
                    </div>
                    <div className={styles.titleSection}>
                        <div className={styles.keyIcon}>
                            <KeyRound size={32} />
                        </div>
                        <h2 className={styles.authTitle}>Reset Password</h2>
                        <p className={styles.authSubtitle}>
                            Set a new password for: <span className={styles.emailHighlight}>{email}</span>
                        </p>
                    </div>
                </div>

                {message ? (
                    <div className={styles.successSection}>
                        <div className={styles.successIcon}>
                            <CheckCircle size={48} />
                        </div>
                        <div className={styles.alertSuccess}>
                            <h3>Password Reset Successfully!</h3>
                            <p>{message}</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.authForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="secretCode" className={styles.formLabel}>
                                <KeyRound size={16} />
                                Verification Code
                            </label>
                            <div className={styles.inputContainer}>
                                <input
                                    id="secretCode"
                                    type="text"
                                    value={secretCode}
                                    onChange={(e) => setSecretCode(e.target.value)}
                                    required
                                    className={styles.formInput}
                                    placeholder="Enter the code from your email"
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="newPassword" className={styles.formLabel}>
                                <Lock size={16} />
                                New Password
                            </label>
                            <div className={styles.inputContainer}>
                                <input
                                    id="newPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className={styles.formInput}
                                    placeholder="Create a new secure password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles.passwordToggle}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            <div className={styles.passwordHint}>
                                Password must be at least 6 characters long
                            </div>
                        </div>

                        {error && (
                            <div className={styles.alertError}>
                                <div className={styles.errorIcon}>⚠️</div>
                                <p>{error}</p>
                            </div>
                        )}

                        <button type="submit" disabled={isLoading} className={styles.submitButton}>
                            {isLoading ? (
                                <LoadingSpinner size="small" text="" />
                            ) : (
                                <>
                                    <Lock size={16} />
                                    <span>Update Password</span>
                                </>
                            )}
                        </button>
                    </form>
                )}

                <div className={styles.authFooter}>
                    <Link to="/login" className={styles.backLink}>
                        <ArrowLeft size={16} />
                        <span>Back to Sign In</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;