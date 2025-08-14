import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Crown } from 'lucide-react';
import AuthLayout from '../../components/layout/AuthLayout';
import styles from './LoginPage.module.css';

import { API_URL } from '../../api';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            await login(res.data.token, res.data);
        } catch (err: any) {
            setError(err.message || err.response?.data?.message || 'Ошибка входа');
        }
    };

    return (
        <AuthLayout>
            <div className={styles.authHeader}>
                <div className={styles.logoContainer}>
                    <div className={styles.logoIconContainer}>
                        <Crown size={32} />
                    </div>
                    <h1 className={styles.logoText}>Skill Game</h1>
                </div>
                <p className={styles.authSubtitle}>Access for administrators only</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.authForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>Email Address</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className={styles.formInput}
                        placeholder="admin@example.com"
                        autoComplete="email"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.formLabel}>Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className={styles.formInput}
                        placeholder="••••••••"
                        autoComplete="current-password"
                    />
                </div>
                {error && (
                    <div className={styles.alertError}>
                        <p>{error}</p>
                    </div>
                )}
                <button
                    type="submit"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    disabled={!email || !password}
                >
                    Sign In
                </button>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;