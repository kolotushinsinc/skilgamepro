import React, { useState, useEffect, FormEvent, ChangeEvent, FC } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import Avatar from '../../components/common/Avatar';

import { IGameRecord, ITransaction } from '../../types/entities';
import styles from './ProfilePage.module.css';
import { API_URL } from '../../api/index';
import { submitKycDocument } from '@/services/api';
import KycModal from '../../components/modals/KycModal';
import PaymentStatusModal from '../../components/modals/PaymentStatusModal';
import DepositModal from '../../components/modals/DepositModal';
import WithdrawModal from '../../components/modals/WithdrawModal';
import PaymentHistory from '../../components/PaymentHistory/PaymentHistory';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const HistoryTable: FC<{ headers: string[]; children: React.ReactNode }> = ({ headers, children }) => (
    <table className={styles.historyTable}>
        <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{children}</tbody>
    </table>
);

interface KYCStatusProps {
    user: NonNullable<ReturnType<typeof useAuth>['user']>;
    onVerifyClick: () => void;
}

const KYCStatus: FC<KYCStatusProps> = ({ user, onVerifyClick }) => {
    const statusMap = {
        NOT_SUBMITTED: { text: "Not confirmed", style: styles.kycStatus_REJECTED },
        PENDING: { text: "Under review", style: styles.kycStatus_PENDING },
        APPROVED: { text: "Confirmed", style: styles.kycStatus_APPROVED },
        REJECTED: { text: "Rejected", style: styles.kycStatus_REJECTED },
    };
    
    // @ts-ignore
    const currentStatus = statusMap[user.kycStatus] || statusMap.NOT_SUBMITTED;

    return (
        <div className={`${styles.kycContainer} ${currentStatus.style}`}>
            <h4>Verification status: {currentStatus.text}</h4>
            
            {user.kycStatus === 'REJECTED' && (
                <p><strong>Cause:</strong> {user.kycRejectionReason}</p>
            )}

            {(user.kycStatus === 'NOT_SUBMITTED' || user.kycStatus === 'REJECTED') && (
                <button onClick={onVerifyClick} className={`${styles.btn} ${styles.btnPrimary}`} style={{marginTop: '1rem'}}>
                    Pass verification
                </button>
            )}
        </div>
    );
};

const ProfilePage: React.FC = () => {
    const { user, refreshUser } = useAuth();
    const { socket } = useSocket();

    const [gameHistory, setGameHistory] = useState<IGameRecord[]>([]);
    const [transactionHistory, setTransactionHistory] = useState<ITransaction[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [historyError, setHistoryError] = useState('');
    
    // Pagination states
    const [gamePage, setGamePage] = useState(() => {
        const saved = localStorage.getItem('profileGamePage');
        return saved ? parseInt(saved) : 1;
    });
    const [gameTotal, setGameTotal] = useState(0);
    const [transactionPage, setTransactionPage] = useState(() => {
        const saved = localStorage.getItem('profileTransactionPage');
        return saved ? parseInt(saved) : 1;
    });
    const [transactionTotal, setTransactionTotal] = useState(0);
    const [loadingGames, setLoadingGames] = useState(false);
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    
    const ITEMS_PER_PAGE = 10;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

    const [balanceAmount, setBalanceAmount] = useState('');
    const [balanceMessage, setBalanceMessage] = useState({ type: '', text: '' });

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const [kycFile, setKycFile] = useState<File | null>(null);
    const [kycDocType, setKycDocType] = useState('PASSPORT');
    const [kycMessage, setKycMessage] = useState({ type: '', text: '' });

    const [isKycModalOpen, setIsKycModalOpen] = useState(false);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    
    const [paymentModal, setPaymentModal] = useState({
        isOpen: false,
        status: 'success' as 'success' | 'error' | 'loading',
        title: '',
        message: '',
        amount: 0,
        operation: 'deposit' as 'deposit' | 'withdraw'
    });

    const handleKycSuccess = async () => {
        await refreshUser();
    };


    const handleKycFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setKycFile(file);
    };

    const handleKycSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!kycFile) {
            setKycMessage({ type: 'error', text: 'Please select a file to upload.' });
            return;
        }
        
        const formData = new FormData();
        formData.append('document', kycFile);
        formData.append('documentType', kycDocType);

        try {
            const res = await submitKycDocument(formData);
            setKycMessage({ type: 'success', text: res.data.message });
            await refreshUser();
        } catch (error: any) {
            setKycMessage({ type: 'error', text: error.response?.data?.message || 'Upload error' });
        }
    };

    const fetchGameHistory = async (page: number = 1) => {
        setLoadingGames(true);
        try {
            const response = await axios.get(`${API_URL}/api/users/history/games`, {
                params: { page, limit: ITEMS_PER_PAGE }
            });
            setGameHistory(response.data.games || response.data);
            setGameTotal(response.data.total || response.data.length);
        } catch (err: any) {
            console.error('Failed to fetch game history:', err);
            setHistoryError(err.response?.data?.message || 'Failed to load game history');
        } finally {
            setLoadingGames(false);
        }
    };

    const fetchTransactionHistory = async (page: number = 1) => {
        setLoadingTransactions(true);
        try {
            const response = await axios.get(`${API_URL}/api/users/history/transactions`, {
                params: { page, limit: ITEMS_PER_PAGE }
            });
            setTransactionHistory(response.data.transactions || response.data);
            setTransactionTotal(response.data.total || response.data.length);
        } catch (err: any) {
            console.error('Failed to fetch transaction history:', err);
            setHistoryError(err.response?.data?.message || 'Failed to load transaction history');
        } finally {
            setLoadingTransactions(false);
        }
    };

    const fetchHistory = async () => {
        setHistoryError('');
        setLoadingHistory(true);
        try {
            await Promise.all([
                fetchGameHistory(1),
                fetchTransactionHistory(1)
            ]);
        } finally {
            setLoadingHistory(false);
        }
    };

    // Pagination handlers
    const handleGamePageChange = (page: number) => {
        setGamePage(page);
        localStorage.setItem('profileGamePage', page.toString());
        fetchGameHistory(page);
    };

    const handleTransactionPageChange = (page: number) => {
        setTransactionPage(page);
        localStorage.setItem('profileTransactionPage', page.toString());
        fetchTransactionHistory(page);
    };

    useEffect(() => {
        fetchGameHistory(gamePage);
        fetchTransactionHistory(transactionPage);
    }, []);

    useEffect(() => {
        if (!socket || !user) return;

        const handleBalanceUpdate = (data: {
            userId: string;
            newBalance: number;
            transaction: {
                type: string;
                amount: number;
                status: string;
                createdAt: string;
            };
        }) => {
            if (data.userId === user._id) {
                console.log('[ProfilePage] Balance updated via Socket.IO:', data);
                
                refreshUser();
                
                fetchHistory();
            }
        };

        const handleKycStatusUpdate = (data: {
            userId: string;
            kycStatus: string;
            kycRejectionReason?: string;
        }) => {
            if (data.userId === user._id) {
                console.log('[ProfilePage] KYC status updated via Socket.IO:', data);
                
                refreshUser();
            }
        };

        socket.on('balanceUpdated', handleBalanceUpdate);
        socket.on('kycStatusUpdated', handleKycStatusUpdate);

        return () => {
            socket.off('balanceUpdated', handleBalanceUpdate);
            socket.off('kycStatusUpdated', handleKycStatusUpdate);
        };
    }, [socket, user, refreshUser]);

    const handlePasswordChange = async (e: FormEvent) => {
        e.preventDefault();
        setPasswordMessage({ type: '', text: '' });
        if (newPassword.length < 6) {
            setPasswordMessage({ type: 'error', text: 'The new password must be at least 6 characters long' });
            return;
        }
        try {
            await axios.put(`${API_URL}/api/users/profile/password`, { currentPassword, newPassword });
            setPasswordMessage({ type: 'success', text: 'Password successfully updated!' });
            setCurrentPassword('');
            setNewPassword('');
        } catch (err: any) {
            setPasswordMessage({ type: 'error', text: err.response?.data?.message || 'Error changing password' });
        }
    };

    const handleDepositClick = () => {
        setIsDepositModalOpen(true);
    };

    const handleWithdrawClick = () => {
        if (user?.kycStatus !== 'APPROVED') {
            setIsKycModalOpen(true);
            return;
        }
        setIsWithdrawModalOpen(true);
    };

    const handleDepositSuccess = (amount: number) => {
        setPaymentModal({
            isOpen: true,
            status: 'success',
            title: 'Deposit Successful!',
            message: `Your deposit of $${amount.toFixed(2)} has been processed successfully.`,
            amount,
            operation: 'deposit'
        });
        refreshUser();
        fetchHistory();
    };

    const handleWithdrawSuccess = (amount: number) => {
        setPaymentModal({
            isOpen: true,
            status: 'success',
            title: 'Withdrawal Requested!',
            message: `Your withdrawal request for $${amount.toFixed(2)} has been submitted and will be processed within 1-3 business days.`,
            amount,
            operation: 'withdraw'
        });
        refreshUser();
        fetchHistory();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleAvatarUpload = async () => {
        if (!avatarFile) return;

        const formData = new FormData();
        formData.append('avatar', avatarFile);

        try {
            await axios.put(`${API_URL}/api/users/profile/avatar`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            await refreshUser();
            setAvatarFile(null);
            setAvatarPreview(null);
        } catch (error) {
            setPaymentModal({
                isOpen: true,
                status: 'error',
                title: 'Upload Error',
                message: 'Failed to upload avatar. Make sure it is an image smaller than 5MB.',
                amount: 0,
                operation: 'deposit'
            });
        }
    };

    if (!user) {
        return (
            <div className="loading-container">
                <div className="loading-content">
                    <LoadingSpinner text="Loading profile data..." />
                </div>
            </div>
        );
    }

    const statusTranslations: Record<IGameRecord['status'], string> = { WON: 'Won', LOST: 'Loss', DRAW: 'Draw' };
    const typeTranslations: Record<ITransaction['type'], string> = { DEPOSIT: 'Deposit', WITHDRAWAL: 'Withdrawal', WAGER_WIN: 'Wager win', WAGER_LOSS: 'Wager loss' };

    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('profileActiveTab') || 'profile';
    });

    // Pagination component
    const Pagination = ({ currentPage, totalItems, onPageChange, isLoading }: {
        currentPage: number;
        totalItems: number;
        onPageChange: (page: number) => void;
        isLoading: boolean;
    }) => {
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        
        if (totalPages <= 1) return null;

        const getVisiblePages = () => {
            const maxVisible = 7; // Максимум видимых страниц
            const pages = [];
            
            if (totalPages <= maxVisible) {
                // Если страниц мало, показываем все
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Умная пагинация
                const startPage = Math.max(1, currentPage - 2);
                const endPage = Math.min(totalPages, currentPage + 2);
                
                // Всегда показываем первую страницу
                if (startPage > 1) {
                    pages.push(1);
                    if (startPage > 2) {
                        pages.push('...');
                    }
                }
                
                // Показываем страницы вокруг текущей
                for (let i = startPage; i <= endPage; i++) {
                    if (i !== 1 && i !== totalPages) {
                        pages.push(i);
                    }
                }
                
                // Всегда показываем последнюю страницу
                if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                        pages.push('...');
                    }
                    pages.push(totalPages);
                }
                
                // Если не добавили первую страницу в начале
                if (startPage === 1 && !pages.includes(1)) {
                    pages.unshift(1);
                }
                
                // Если не добавили последнюю страницу в конце
                if (endPage === totalPages && !pages.includes(totalPages)) {
                    pages.push(totalPages);
                }
            }
            
            return pages;
        };

        const visiblePages = getVisiblePages();

        return (
            <div className={styles.pagination}>
                <button
                    className={`${styles.paginationBtn} ${currentPage === 1 ? styles.disabled : ''}`}
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    title="Previous page"
                >
                    ←
                </button>
                
                {visiblePages.map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className={styles.paginationEllipsis}>
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            className={`${styles.paginationBtn} ${currentPage === page ? styles.active : ''}`}
                            onClick={() => onPageChange(page as number)}
                            disabled={isLoading}
                            title={`Page ${page}`}
                        >
                            {page}
                        </button>
                    )
                ))}
                
                <button
                    className={`${styles.paginationBtn} ${currentPage === totalPages ? styles.disabled : ''}`}
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                    title="Next page"
                >
                    →
                </button>
            </div>
        );
    };
    
        const tabs = [
            { id: 'profile', label: 'Profile', icon: '👤' },
            { id: 'security', label: 'Security', icon: '🔐' },
            { id: 'wallet', label: 'Wallet', icon: '💰' },
            { id: 'games', label: 'Game History', icon: '🎮' },
            { id: 'transactions', label: 'Transactions', icon: '📈' }
        ];
    
        const renderTabContent = () => {
            switch (activeTab) {
                case 'profile':
                    return (
                        <div className={styles.tabContent} data-testid="profile-tab-content">
                            <div className={styles.profileHeader} data-testid="profile-header-section">
                                <div className={styles.avatarContainer} data-testid="avatar-container">
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="Preview" className={styles.profileAvatarImg} data-testid="avatar-preview" />
                                    ) : (
                                        <Avatar size="large" />
                                    )}
                                    <label htmlFor="avatarInput" className={styles.avatarEditButton} data-testid="avatar-edit-button">✏️</label>
                                    <input id="avatarInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} data-testid="avatar-upload-input" />
                                </div>
                                <div className={styles.profileInfo} data-testid="profile-info-section">
                                    <h2 data-testid="profile-username">{user.username}</h2>
                                    {avatarFile && (
                                        <div className={styles.avatarActions} data-testid="avatar-actions">
                                            <button onClick={handleAvatarUpload} className={`${styles.btn} ${styles.btnPrimary}`} data-testid="avatar-save-button">Save</button>
                                            <button onClick={() => { setAvatarFile(null); setAvatarPreview(null); }} className={`${styles.btn} ${styles.btnSecondary}`} data-testid="avatar-cancel-button">Cancel</button>
                                        </div>
                                    )}
                                    <div className={styles.profileDetails} data-testid="profile-details">
                                        <div className={styles.profileItem} data-testid="profile-email-item">
                                            <span className={styles.profileLabel}>Email:</span>
                                            <span data-testid="profile-email-value">{user.email}</span>
                                        </div>
                                        <div className={styles.profileItem} data-testid="profile-balance-item">
                                            <span className={styles.profileLabel}>Balance:</span>
                                            <span className={styles.balanceHighlight} data-testid="profile-balance-value">${user.balance.toFixed(2)}</span>
                                        </div>
                                        <div className={styles.profileItem} data-testid="profile-member-since-item">
                                            <span className={styles.profileLabel}>Member since:</span>
                                            <span data-testid="profile-member-since-value">{new Date().toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                
                case 'security':
                    return (
                        <div className={styles.tabContent} data-testid="security-tab-content">
                            <div className={styles.securitySection} data-testid="password-change-section">
                                <h4 data-testid="password-change-title">🔐 Change Password</h4>
                                <form onSubmit={handlePasswordChange} data-testid="password-change-form">
                                    <div className={styles.formGrid} data-testid="password-form-grid">
                                        <div className={styles.formGroup} data-testid="current-password-group">
                                            <label className={styles.formLabel} data-testid="current-password-label">Current Password</label>
                                            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={styles.formInput} placeholder="Current Password" required data-testid="current-password-input" />
                                        </div>
                                        <div className={styles.formGroup} data-testid="new-password-group">
                                            <label className={styles.formLabel} data-testid="new-password-label">New Password</label>
                                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={styles.formInput} placeholder="New Password" required data-testid="new-password-input" />
                                        </div>
                                    </div>
                                    <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} data-testid="save-password-button">Save Password</button>
                                    {passwordMessage.text && <div className={`${styles.alert} ${passwordMessage.type === 'error' ? styles.alertError : styles.alertSuccess}`} data-testid="password-message"><p>{passwordMessage.text}</p></div>}
                                </form>
                            </div>
                            
                            <div className={styles.kycSection} data-testid="kyc-verification-section">
                                <h4 data-testid="kyc-section-title">🛡️ Identity Verification (KYC)</h4>
                                <KYCStatus user={user} onVerifyClick={() => setIsKycModalOpen(true)} />
                            </div>
                        </div>
                    );
                
                case 'wallet':
                    return (
                        <div className={styles.tabContent} data-testid="wallet-tab-content">
                            <div className={styles.walletSection} data-testid="wallet-section">
                                <div className={styles.balanceActions} data-testid="balance-actions">
                                    <div className={styles.balanceInfo} data-testid="balance-info">
                                        <div className={styles.balanceDisplay} data-testid="balance-display">
                                            <span className={styles.balanceLabel} data-testid="balance-label">Current Balance</span>
                                            <span className={styles.balanceAmount} data-testid="balance-amount">${user.balance.toFixed(2)}</span>
                                        </div>
                                        <p className={styles.balanceSubtext} data-testid="balance-subtext">Manage your account funds using our secure payment gateway</p>
                                    </div>
                                    <div className={styles.balanceButtons} data-testid="balance-buttons">
                                        <button onClick={handleDepositClick} className={`${styles.btn} ${styles.btnSuccess}`} data-testid="deposit-button">
                                            💰 Deposit Funds
                                        </button>
                                        <button onClick={handleWithdrawClick} className={`${styles.btn} ${styles.btnSecondary}`} data-testid="withdraw-button">
                                            💸 Withdraw Funds
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.historySection} data-testid="payment-history-section">
                                <PaymentHistory />
                            </div>
                        </div>
                    );
                
                case 'games':
                    return (
                        <div className={styles.tabContent} data-testid="games-tab-content">
                            <div className={styles.historySection} data-testid="game-history-section">
                                <h4 data-testid="game-history-title">🎮 Game History</h4>
                                {loadingGames ? (
                                    <div className={styles.loadingState} data-testid="games-loading-state">
                                        <LoadingSpinner text="Loading game history..." />
                                    </div>
                                ) : (
                                    <>
                                        <div className={styles.tableContainer} data-testid="games-table-container">
                                            <HistoryTable headers={['Game', 'Result', 'Balance Change', 'Date']}>
                                                {gameHistory.map(game => (
                                                    <tr key={game._id} data-testid="game-history-row">
                                                        <td data-testid="game-name">{game.gameName}</td>
                                                        <td data-testid="game-result">
                                                            <span className={`${styles.badge} ${game.status === 'WON' ? styles.badgeGreen : game.status === 'LOST' ? styles.badgeRed : styles.badgeYellow}`}>
                                                                {statusTranslations[game.status]}
                                                            </span>
                                                        </td>
                                                        <td className={game.amountChanged >= 0 ? styles.amountPositive : styles.amountNegative} data-testid="balance-change">
                                                            {game.amountChanged >= 0 ? '+' : ''}${game.amountChanged.toFixed(2)}
                                                        </td>
                                                        <td data-testid="game-date">{new Date(game.createdAt).toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </HistoryTable>
                                        </div>
                                        <Pagination
                                            currentPage={gamePage}
                                            totalItems={gameTotal}
                                            onPageChange={handleGamePageChange}
                                            isLoading={loadingGames}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    );
                
                case 'transactions':
                    return (
                        <div className={styles.tabContent} data-testid="transactions-tab-content">
                            <div className={styles.historySection} data-testid="transaction-history-section">
                                <h4 data-testid="transaction-history-title">📈 Transaction History</h4>
                                {loadingTransactions ? (
                                    <div className={styles.loadingState} data-testid="transactions-loading-state">
                                        <LoadingSpinner text="Loading transaction history..." />
                                    </div>
                                ) : (
                                    <>
                                        <div className={styles.tableContainer} data-testid="transactions-table-container">
                                            <HistoryTable headers={['Type', 'Status', 'Amount', 'Date']}>
                                                {transactionHistory.map(tx => (
                                                    <tr key={tx._id} data-testid="transaction-history-row">
                                                        <td data-testid="transaction-type">{typeTranslations[tx.type] || tx.type}</td>
                                                        <td data-testid="transaction-status">{tx.status}</td>
                                                        <td data-testid="transaction-amount">${tx.amount.toFixed(2)}</td>
                                                        <td data-testid="transaction-date">{new Date(tx.createdAt).toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </HistoryTable>
                                        </div>
                                        <Pagination
                                            currentPage={transactionPage}
                                            totalItems={transactionTotal}
                                            onPageChange={handleTransactionPageChange}
                                            isLoading={loadingTransactions}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    );
                
                default:
                    return null;
            }
        };
    
        return (
            <>
                <div className={styles.container}>
                    <div className={styles.header} data-testid="profile-page-header">
                        <h1 data-testid="profile-title">Profile Settings</h1>
                        <p data-testid="profile-subtitle">Manage your account preferences and information</p>
                    </div>
                    
                    <div className={styles.tabsContainer} data-testid="tabs-container">
                        <div className={styles.tabsList} data-testid="tabs-list">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        localStorage.setItem('profileActiveTab', tab.id);
                                    }}
                                    className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                                    data-testid={`tab-${tab.id}`}
                                    data-tab={tab.id}
                                >
                                    <span className={styles.tabIcon}>{tab.icon}</span>
                                    <span className={styles.tabLabel}>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                        
                        <div className={styles.tabPanel} data-testid="tab-panel">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            <KycModal isOpen={isKycModalOpen} onClose={() => setIsKycModalOpen(false)} onSuccess={handleKycSuccess} />
            <DepositModal
                isOpen={isDepositModalOpen}
                onClose={() => setIsDepositModalOpen(false)}
                onSuccess={handleDepositSuccess}
            />
            <WithdrawModal
                isOpen={isWithdrawModalOpen}
                onClose={() => setIsWithdrawModalOpen(false)}
                onSuccess={handleWithdrawSuccess}
                currentBalance={user.balance}
            />
            <PaymentStatusModal
                isOpen={paymentModal.isOpen}
                status={paymentModal.status}
                title={paymentModal.title}
                message={paymentModal.message}
                amount={paymentModal.amount}
                operation={paymentModal.operation}
                onClose={() => setPaymentModal(prev => ({ ...prev, isOpen: false }))}
            />
        </>
    );
};

export default ProfilePage;