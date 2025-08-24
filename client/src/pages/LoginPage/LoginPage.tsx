import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginPage.module.css';
import { Crown, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { API_URL } from '../../api/index';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            const { token, ...user } = res.data;
            login({ token, user });
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login error. Please check your details..');
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
                        <h2 className={styles.authTitle}>Welcome Back</h2>
                        <p className={styles.authSubtitle}>Sign in to your account to continue</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.authForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>
                            <Mail size={16} />
                            Email address
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
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={styles.passwordToggle}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div className={styles.forgotPassword}>
                        <Link to="/forgot-password" className={styles.forgotLink}>
                            Forgot your password?
                        </Link>
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
                                <span>Sign In</span>
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
                        Don't have an account?{' '}
                        <Link to="/register" className={styles.signupLink}>
                            Create account
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

export default LoginPage;