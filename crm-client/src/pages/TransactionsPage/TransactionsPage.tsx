import React, { useState, useEffect, useCallback } from 'react';
import { getAdminTransactions, type ITransaction } from '../../services/adminService';
import styles from './TransactionsPage.module.css';
import { 
    RefreshCw, 
    CreditCard, 
    TrendingUp, 
    TrendingDown, 
    DollarSign, 
    User, 
    Calendar, 
    CheckCircle,
    ArrowUpRight,
    ArrowDownLeft,
    Trophy,
    Target
} from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getAdminTransactions();
            setTransactions(data);
        } catch (error) {
            console.error("Failed to fetch transactions", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const getTypeStyle = (type: string) => {
        const styleKey = `type_${type.toUpperCase()}`;
        return styles[styleKey] || '';
    };

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'DEPOSIT': return <ArrowDownLeft size={20} />;
            case 'WITHDRAWAL': return <ArrowUpRight size={20} />;
            case 'WAGER_WIN': return <TrendingUp size={20} />;
            case 'WAGER_LOSS': return <TrendingDown size={20} />;
            case 'TOURNAMENT_FEE': return <Target size={20} />;
            case 'TOURNAMENT_WINNINGS': return <Trophy size={20} />;
            default: return <CreditCard size={20} />;
        }
    };

    const formatTransactionType = (type: string) => {
        return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div className={styles.loadingContainer}><LoadingSpinner size="large" /></div>;

    // Calculate statistics
    const totalTransactions = transactions.length;
    const totalDeposits = transactions.filter(tx => tx.type === 'DEPOSIT').reduce((sum, tx) => sum + tx.amount, 0);
    const totalWithdrawals = transactions.filter(tx => tx.type === 'WITHDRAWAL').reduce((sum, tx) => sum + tx.amount, 0);
    const totalWinnings = transactions.filter(tx => tx.type === 'WAGER_WIN' || tx.type === 'TOURNAMENT_WINNINGS').reduce((sum, tx) => sum + tx.amount, 0);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.titleSection}>
                        <CreditCard className={styles.pageIcon} />
                        <div>
                            <h1 className={styles.pageTitle}>Transaction Management</h1>
                            <p className={styles.pageSubtitle}>Monitor and analyze platform transactions</p>
                        </div>
                    </div>
                    <button
                        onClick={fetchTransactions}
                        className={`${styles.refreshButton} ${loading ? styles.loading : ''}`}
                        disabled={loading}
                    >
                        <RefreshCw size={18} />
                        <span>Refresh Data</span>
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <CreditCard size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{totalTransactions}</div>
                        <div className={styles.statLabel}>Total Transactions</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.statIconDeposits}`}>
                        <ArrowDownLeft size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>${totalDeposits.toFixed(0)}</div>
                        <div className={styles.statLabel}>Total Deposits</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.statIconWithdrawals}`}>
                        <ArrowUpRight size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>${totalWithdrawals.toFixed(0)}</div>
                        <div className={styles.statLabel}>Total Withdrawals</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.statIconWins}`}>
                        <TrendingUp size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>${totalWinnings.toFixed(0)}</div>
                        <div className={styles.statLabel}>Total Winnings</div>
                    </div>
                </div>
            </div>

            {/* Transaction Cards */}
            {totalTransactions > 0 ? (
                <div className={styles.transactionsGrid}>
                    {transactions.map(transaction => (
                        <div key={transaction._id} className={styles.transactionCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitle}>
                                    {getTransactionIcon(transaction.type)}
                                    <h3>{formatTransactionType(transaction.type)}</h3>
                                </div>
                                <div className={`${styles.typeBadge} ${getTypeStyle(transaction.type)}`}>
                                    {formatTransactionType(transaction.type)}
                                </div>
                            </div>

                            <div className={styles.cardContent}>
                                <div className={styles.cardInfo}>
                                    <div className={styles.infoItem}>
                                        <User size={16} />
                                        <span>{transaction.user?.username || 'N/A'}</span>
                                    </div>
                                    
                                    <div className={styles.infoItem}>
                                        <CheckCircle size={16} />
                                        <span>{transaction.status}</span>
                                    </div>
                                    
                                    <div className={styles.infoItem}>
                                        <Calendar size={16} />
                                        <span>{formatDate(transaction.createdAt)}</span>
                                    </div>
                                    
                                    <div className={styles.infoItem}>
                                        <CreditCard size={16} />
                                        <span>ID: {transaction._id.slice(-6)}</span>
                                    </div>

                                    <div className={styles.amountSection}>
                                        <div className={styles.amount}>
                                            ${transaction.amount.toFixed(2)}
                                        </div>
                                        <div className={styles.amountLabel}>
                                            Transaction Amount
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <CreditCard size={48} />
                    <h3>No transactions found</h3>
                    <p>There are currently no transactions in the system. Transaction data will appear here as users make deposits, withdrawals, and play games.</p>
                </div>
            )}
        </div>
    );
};

export default TransactionsPage;