import React, { useState, useEffect, useCallback } from 'react';
import { getAdminGameRecordsPaginated, type IGameRecord, type IGameRecordsQuery, type IPaginationInfo } from '../../services/adminService';
import styles from './GamesPage.module.css';
import {
    RefreshCw,
    Gamepad2,
    Trophy,
    X,
    Minus,
    User,
    Calendar,
    DollarSign,
    Crown,
    Target,
    Users,
    TrendingUp,
    TrendingDown,
    Filter,
    Search,
    ChevronDown
} from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Pagination from '../../components/ui/Pagination';

const GamesPage: React.FC = () => {
    const [gameRecords, setGameRecords] = useState<IGameRecord[]>([]);
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
    const [filters, setFilters] = useState<IGameRecordsQuery>({
        page: 1,
        limit: 10,
        status: 'all',
        gameName: 'all',
        search: ''
    });

    const fetchGameRecords = useCallback(async (query: IGameRecordsQuery = filters) => {
        try {
            setLoading(true);
            const response = await getAdminGameRecordsPaginated(query);
            setGameRecords(response.data);
            setPagination(response.pagination);
        } catch (error) {
            console.error("Failed to fetch game records", error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchGameRecords();
    }, [fetchGameRecords]);

    const handlePageChange = useCallback((page: number) => {
        window.scrollTo(0, 0);
        const newFilters = { ...filters, page };
        setFilters(newFilters);
        fetchGameRecords(newFilters);
    }, [filters, fetchGameRecords]);

    const handleFilterChange = useCallback((key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
    }, []);

    const applyFilters = useCallback(() => {
        fetchGameRecords(filters);
    }, [filters, fetchGameRecords]);

    const clearFilters = useCallback(() => {
        const clearedFilters = {
            page: 1,
            limit: 10,
            status: 'all',
            gameName: 'all',
            search: ''
        };
        setFilters(clearedFilters);
        fetchGameRecords(clearedFilters);
    }, [fetchGameRecords]);

    const getStatusStyle = (status: string) => {
        const styleKey = `status_${status}`;
        return styles[styleKey] || '';
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'WON': return 'Won';
            case 'LOST': return 'Lost';
            case 'DRAW': return 'Draw';
            default: return 'Unknown';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'WON': return <Trophy size={20} />;
            case 'LOST': return <X size={20} />;
            case 'DRAW': return <Minus size={20} />;
            default: return <Gamepad2 size={20} />;
        }
    };

    const getGameIcon = (gameName: string) => {
        const gameType = gameName.toLowerCase();
        if (gameType.includes('chess')) return <Crown size={20} />;
        if (gameType.includes('checkers')) return <Target size={20} />;
        if (gameType.includes('tic') || gameType.includes('tac')) return <Gamepad2 size={20} />;
        if (gameType.includes('backgammon')) return <Trophy size={20} />;
        return <Gamepad2 size={20} />;
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
    const totalGames = pagination.totalItems;
    const totalWins = gameRecords.filter(game => game.status === 'WON').length;
    const totalLosses = gameRecords.filter(game => game.status === 'LOST').length;
    const totalProfit = gameRecords.reduce((sum, game) => sum + game.amountChanged, 0);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.titleSection}>
                        <Gamepad2 className={styles.pageIcon} />
                        <div>
                            <h1 className={styles.pageTitle}>Game History</h1>
                            <p className={styles.pageSubtitle}>Monitor and analyze platform game records</p>
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
                            onClick={() => fetchGameRecords(filters)}
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
                            <label className={styles.filterLabel}>Game Status</label>
                            <select
                                className={styles.filterSelect}
                                value={filters.status || 'all'}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="WON">🏆 Won</option>
                                <option value="LOST">❌ Lost</option>
                                <option value="DRAW">➖ Draw</option>
                            </select>
                        </div>

                        <div className={styles.filterGroup}>
                            <label className={styles.filterLabel}>Game Type</label>
                            <select
                                className={styles.filterSelect}
                                value={filters.gameName || 'all'}
                                onChange={(e) => handleFilterChange('gameName', e.target.value)}
                            >
                                <option value="all">All Games</option>
                                <option value="chess">♔ Chess</option>
                                <option value="checkers">⚫ Checkers</option>
                                <option value="tic-tac-toe">❌ Tic-Tac-Toe</option>
                                <option value="backgammon">🎲 Backgammon</option>
                                <option value="durak">🃏 Durak</option>
                                <option value="domino">🀱 Domino</option>
                                <option value="dice">🎲 Dice</option>
                                <option value="bingo">🎱 Bingo</option>
                            </select>
                        </div>

                        <div className={styles.filterGroup}>
                            <label className={styles.filterLabel}>Search</label>
                            <div className={styles.searchInputWrapper}>
                                <Search className={styles.searchIcon} size={16} />
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Search by game ID, username or opponent..."
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
                        <Gamepad2 size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{totalGames}</div>
                        <div className={styles.statLabel}>Total Games</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.statIconWins}`}>
                        <Trophy size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{totalWins}</div>
                        <div className={styles.statLabel}>Games Won</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.statIconLosses}`}>
                        <X size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{totalLosses}</div>
                        <div className={styles.statLabel}>Games Lost</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.statIconProfit}`}>
                        {totalProfit >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>
                            {totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(0)}
                        </div>
                        <div className={styles.statLabel}>Total Profit</div>
                    </div>
                </div>
            </div>

            {/* Game Cards */}
            {totalGames > 0 ? (
                <div className={styles.gamesGrid}>
                    {gameRecords.map(game => (
                        <div key={game._id} className={styles.gameCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitle}>
                                    {getGameIcon(game.gameName)}
                                    <h3>{game.gameName}</h3>
                                </div>
                                <div className={`${styles.statusBadge} ${getStatusStyle(game.status)}`}>
                                    {getStatusIcon(game.status)}
                                    {getStatusText(game.status)}
                                </div>
                            </div>

                            <div className={styles.cardContent}>
                                <div className={styles.cardInfo}>
                                    <div className={styles.infoItem}>
                                        <User size={16} />
                                        <span>{game.user?.username || 'N/A'}</span>
                                    </div>
                                    
                                    <div className={styles.infoItem}>
                                        <Calendar size={16} />
                                        <span>{formatDate(game.createdAt)}</span>
                                    </div>
                                    
                                    <div className={styles.infoItem}>
                                        <Gamepad2 size={16} />
                                        <span>ID: {game._id.slice(-6)}</span>
                                    </div>
                                    
                                    <div className={styles.infoItem}>
                                        <DollarSign size={16} />
                                        <span>
                                            {game.amountChanged >= 0 ? '+' : ''}${game.amountChanged.toFixed(2)}
                                        </span>
                                    </div>

                                    <div className={styles.playersSection}>
                                        <div className={styles.playersTitle}>
                                            <Users size={14} />
                                            Game Participants
                                        </div>
                                        <div className={styles.playersInfo}>
                                            <span className={styles.playerTag}>
                                                {game.user?.username || 'Player'}
                                            </span>
                                            <span className={styles.vsText}>VS</span>
                                            <span className={styles.playerTag}>
                                                {game.opponent}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.balanceSection}>
                                        <div className={`${styles.balanceChange} ${game.amountChanged >= 0 ? styles.amountPositive : styles.amountNegative}`}>
                                            {game.amountChanged >= 0 ? '+' : ''}${game.amountChanged.toFixed(2)}
                                        </div>
                                        <div className={styles.balanceLabel}>
                                            Balance Change
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <Gamepad2 size={48} />
                    <h3>No games found</h3>
                    <p>There are currently no game records in the system. Game history will appear here as users play games on the platform.</p>
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

export default GamesPage;