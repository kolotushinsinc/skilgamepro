import React, { useState, useEffect, useCallback } from 'react';
import { getAdminGameRecords, type IGameRecord } from '../../services/adminService';
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
    TrendingDown
} from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const GamesPage: React.FC = () => {
    const [gameRecords, setGameRecords] = useState<IGameRecord[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchGameRecords = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getAdminGameRecords();
            setGameRecords(data);
        } catch (error) {
            console.error("Failed to fetch game records", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGameRecords();
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

    // Calculate statistics
    const totalGames = gameRecords.length;
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
                    <button
                        onClick={fetchGameRecords}
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
        </div>
    );
};

export default GamesPage;