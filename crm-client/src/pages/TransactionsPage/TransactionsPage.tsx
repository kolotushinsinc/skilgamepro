import React, { useState, useEffect, useCallback } from 'react';
import { getAdminTransactionsPaginated, type ITransaction, type ITransactionsQuery, type IPaginationInfo } from '../../services/adminService';
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
    Target,
    Filter,
    Search,
    ChevronDown
} from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Pagination from '../../components/ui/Pagination';

const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<IPaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNext: false,
        hasPrev: false
    });
    
    // Filter states
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<ITransactionsQuery>({
        page: 1,
        limit: 10,
        type: 'all',
        status: 'all',
        search: ''
    });

    const fetchTransactions = useCallback(async (query: ITransactionsQuery = filters) => {
        try {
            setLoading(true);
            const response = await getAdminTransactionsPaginated(query);
            setTransactions(response.data);
            setPagination(response.pagination);
        } catch (error) {
            console.error("Failed to fetch transactions", error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const handlePageChange = useCallback((page: number) => {
        window.scrollTo(0, 0);
        const newFilters = { ...filters, page };
        setFilters(newFilters);
        fetchTransactions(newFilters);
    }, [filters, fetchTransactions]);

    const handleFilterChange = useCallback((key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
    }, []);

    const applyFilters = useCallback(() => {
        fetchTransactions(filters);
    }, [filters, fetchTransactions]);

    const clearFilters = useCallback(() => {
        const clearedFilters = {
            page: 1,
            limit: 10,
            type: 'all',
            status: 'all',
            search: ''
        };
        setFilters(clearedFilters);
        fetchTransactions(clearedFilters);
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

    // Calculate statistics for current page
    const totalTransactions = pagination.totalItems;
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
                    <div className={styles.headerActions}>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`${styles.filterToggle} ${showFilters ? styles.active : ''}`}
                        >
                            <Filter size={18} />
                            <span>Filters</span>
                            <ChevronDown size={16} className={showFilters ? styles.rotated : ''} />
                        </button>
                        <button
                            onClick={() => fetchTransactions(filters)}
                            className={`${styles.refreshButton} ${loading ? styles.loading : ''}`}
                            disabled={loading}
                        >
                            <RefreshCw size={18} />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            {showFilters && (
                <div className={styles.filtersSection}>
                    <div className={styles.filtersGrid}>
                        <div className={styles.filterGroup}>
                            <label className={styles.filterLabel}>Transaction Type</label>
                            <select
                                className={styles.filterSelect}
                                value={filters.type || 'all'}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                            >
                                <option value="all">All Types</option>
                                <option value="DEPOSIT">💳 Deposit</option>
                                <option value="WITHDRAWAL">💸 Withdrawal</option>
                                <option value="WAGER_WIN">🎉 Wager Win</option>
                                <option value="WAGER_LOSS">📉 Wager Loss</option>
                                <option value="TOURNAMENT_FEE">🎯 Tournament Fee</option>
                                <option value="TOURNAMENT_WINNINGS">🏆 Tournament Winnings</option>
                            </select>
                        </div>

                        <div className={styles.filterGroup}>
                            <label className={styles.filterLabel}>Status</label>
                            <select
                                className={styles.filterSelect}
                                value={filters.status || 'all'}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="PENDING">⏳ Pending</option>
                                <option value="COMPLETED">✅ Completed</option>
                                <option value="FAILED">❌ Failed</option>
                                <option value="CANCELLED">🚫 Cancelled</option>
                            </select>
                        </div>

                        <div className={styles.filterGroup}>
                            <label className={styles.filterLabel}>Search</label>
                            <div className={styles.searchInputWrapper}>
                                <Search className={styles.searchIcon} size={16} />
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Search by transaction ID or username..."
                                    value={filters.search || ''}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.filterActions}>
                        <button
                            className={styles.filterButton}
                            onClick={applyFilters}
                        >
                            Apply Filters
                        </button>
                        <button
                            className={styles.clearButton}
                            onClick={clearFilters}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}

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

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className={styles.paginationSection}>
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        totalItems={pagination.totalItems}
                        itemsPerPage={pagination.itemsPerPage}
                        onPageChange={handlePageChange}
                        hasNext={pagination.hasNext}
                        hasPrev={pagination.hasPrev}
                    />
                </div>
            )}
        </div>
    );
};

export default TransactionsPage;