import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './RegisterPage.module.css';
import { Crown, UserPlus } from 'lucide-react';
import { API_URL } from '../../api/index';
import { useAuth } from '../../context/AuthContext';


const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            <div className={styles.authCard}>
                <div className={styles.authHeader}>
                    <div className={styles.logo}>
                        <div className={styles.logoIconContainer}><Crown /></div>
                        <h1 className={styles.logoText}>Skill Game</h1>
                    </div>
                    <h2 className={styles.authTitle}>Create an account</h2>
                    <p className={styles.authSubtitle}>Join our community</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.authForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username" className={styles.formLabel}>Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className={styles.formInput}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>Email address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.formInput}
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.formLabel}>Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.formInput}
                            placeholder="Minimum 6 characters"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.checkboxGroup}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={ageConfirmed}
                                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                                    required
                                    className={styles.checkbox}
                                />
                                <span className={styles.checkboxText}>
                                    I confirm that I am 18 years of age or older
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.checkboxGroup}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    required
                                    className={styles.checkbox}
                                />
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
                            </label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.checkboxGroup}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={privacyPolicyAccepted}
                                    onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
                                    required
                                    className={styles.checkbox}
                                />
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
                            </label>
                        </div>
                    </div>

                    {error && <div className={styles.alertError}><p>{error}</p></div>}

                    <button type="submit" disabled={isLoading || !isFormValid} className={`${styles.btn} ${styles.btnPrimary}`}>
                        {isLoading ? (
                            <><div className={styles.spinner}></div><span>Creation...</span></>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                <div className={styles.authFooter}>
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className={styles.authLink}>
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;