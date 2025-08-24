import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './RegisterPage.module.css';
import { Crown, User, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Calendar, FileText } from 'lucide-react';
import { API_URL } from '../../api/index';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';


const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [ageConfirmed, setAgeConfirmed] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const navigate = useNavigate();

    const isFormValid = ageConfirmed && termsAccepted && privacyPolicyAccepted;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const { data } = await axios.post(`${API_URL}/api/auth/register`, {
                username,
                email,
                password,
                ageConfirmed,
                termsAccepted,
                privacyPolicyAccepted
            });
            
            const { token, ...user } = data;
            login({ token, user });

            navigate('/');

        } catch (err: any) {
            setError(err.response?.data?.message || 'Error register.');
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
                    <a
                        href="https://skillgame.pro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.logo}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <div className={styles.logoIconContainer}>
                            <Crown className={styles.logoIcon} />
                        </div>
                        <div className={styles.logoTextContainer}>
                            <h1 className={styles.logoText}>Skill Game</h1>
                            <p className={styles.logoSubtext}>Gaming Platform</p>
                        </div>
                    </a>
                    <div className={styles.titleSection}>
                        <h2 className={styles.authTitle}>Create Account</h2>
                        <p className={styles.authSubtitle}>Join our gaming community and start your journey</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.authForm}>
                    <div className={styles.inputRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="username" className={styles.formLabel}>
                                <User size={16} />
                                Username
                            </label>
                            <div className={styles.inputContainer}>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className={styles.formInput}
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.formLabel}>
                                <Mail size={16} />
                                Email
                            </label>
                            <div className={styles.inputContainer}>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={styles.formInput}
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.formLabel}>
                            <Lock size={16} />
                            Password
                        </label>
                        <div className={styles.inputContainer}>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={styles.formInput}
                                placeholder="Create a secure password"
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

                    <div className={styles.agreementsSection}>
                        <div className={styles.agreementItem}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={ageConfirmed}
                                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                                    required
                                    className={styles.checkbox}
                                />
                                <div className={styles.checkboxCustom}>
                                    {ageConfirmed && <span className={styles.checkboxIcon}>✓</span>}
                                </div>
                                <div className={styles.agreementContent}>
                                    <Calendar size={16} className={styles.agreementIcon} />
                                    <span className={styles.checkboxText}>
                                        I confirm that I am 18 years of age or older
                                    </span>
                                </div>
                            </label>
                        </div>

                        <div className={styles.agreementItem}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    required
                                    className={styles.checkbox}
                                />
                                <div className={styles.checkboxCustom}>
                                    {termsAccepted && <span className={styles.checkboxIcon}>✓</span>}
                                </div>
                                <div className={styles.agreementContent}>
                                    <FileText size={16} className={styles.agreementIcon} />
                                    <span className={styles.checkboxText}>
                                        I accept the{' '}
                                        <a
                                            href="https://skillgame.pro/terms"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.legalLink}
                                        >
                                            Terms & Conditions
                                        </a>
                                    </span>
                                </div>
                            </label>
                        </div>

                        <div className={styles.agreementItem}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={privacyPolicyAccepted}
                                    onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
                                    required
                                    className={styles.checkbox}
                                />
                                <div className={styles.checkboxCustom}>
                                    {privacyPolicyAccepted && <span className={styles.checkboxIcon}>✓</span>}
                                </div>
                                <div className={styles.agreementContent}>
                                    <Shield size={16} className={styles.agreementIcon} />
                                    <span className={styles.checkboxText}>
                                        I accept the{' '}
                                        <a
                                            href="https://skillgame.pro/privacy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.legalLink}
                                        >
                                            Privacy Policy
                                        </a>
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {error && (
                        <div className={styles.alertError}>
                            <div className={styles.errorIcon}>⚠️</div>
                            <p>{error}</p>
                        </div>
                    )}

                    <button type="submit" disabled={isLoading || !isFormValid} className={styles.submitButton}>
                        {isLoading ? (
                            <LoadingSpinner size="small" text="" />
                        ) : (
                            <>
                                <span>Create Account</span>
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </form>

                <div className={styles.authFooter}>
                    <div className={styles.divider}>
                        <span>or</span>
                    </div>
                    <p className={styles.signupPrompt}>
                        Already have an account?{' '}
                        <Link to="/login" className={styles.signupLink}>
                            Sign in here
                        </Link>
                    </p>
                    <p className={styles.signupPrompt} style={{ marginTop: '10px' }}>
                        <a
                            href="https://skillgame.pro"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.signupLink}
                        >
                            Return to main page
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;