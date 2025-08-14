import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './ForgotPasswordPage.module.css';
import { Crown, Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { API_URL } from '../../api/index';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsLoading(true);
        try {
            await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
            setMessage('The reset code has been "sent". You will now be redirected.');
            setTimeout(() => {
                navigate('/reset-password', { state: { email } });
            }, 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

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
                        <h2 className={styles.authTitle}>Forgot Password</h2>
                        <p className={styles.authSubtitle}>Enter your email address and we'll send you a reset code</p>
                    </div>
                </div>

                {message ? (
                    <div className={styles.successSection}>
                        <div className={styles.successIcon}>
                            <CheckCircle size={48} />
                        </div>
                        <div className={styles.alertSuccess}>
                            <h3>Code Sent Successfully!</h3>
                            <p>{message}</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.authForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.formLabel}>
                                <Mail size={16} />
                                Email Address
                            </label>
                            <div className={styles.inputContainer}>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={styles.formInput}
                                    placeholder="Enter your email address"
                                />
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
                                    <Send size={16} />
                                    <span>Send Reset Code</span>
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

export default ForgotPasswordPage;