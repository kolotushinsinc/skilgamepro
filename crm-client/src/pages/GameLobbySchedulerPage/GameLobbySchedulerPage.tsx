import React, { useState, useEffect, useCallback } from 'react';
import { gameLobbySchedulerService } from '../../services/gameLobbySchedulerService';
import type { LobbySchedulerStats } from '../../services/gameLobbySchedulerService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import styles from './GameLobbySchedulerPage.module.css';
import { 
    RefreshCw, 
    Activity, 
    Clock, 
    Play,
    Square,
    RotateCcw,
    Trash2,
    GamepadIcon,
    Users,
    TrendingUp,
    Settings
} from 'lucide-react';

const GameLobbySchedulerPage: React.FC = () => {
    const [stats, setStats] = useState<LobbySchedulerStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const schedulerStats = await gameLobbySchedulerService.getSchedulerStats();
            setStats(schedulerStats);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
        // Update data every 15 seconds (более частое обновление для лобби)
        const interval = setInterval(loadData, 15000);
        return () => clearInterval(interval);
    }, [loadData]);

    const handleSchedulerAction = async (action: 'start' | 'stop' | 'forceCheck' | 'cleanup') => {
        try {
            setActionLoading(action);
            switch (action) {
                case 'start':
                    await gameLobbySchedulerService.startScheduler();
                    break;
                case 'stop':
                    await gameLobbySchedulerService.stopScheduler();
                    break;
                case 'forceCheck':
                    await gameLobbySchedulerService.forceSchedulerCheck();
                    break;
                case 'cleanup':
                    await gameLobbySchedulerService.cleanupOldRooms();
                    break;
            }
            await loadData();
        } catch (err: any) {
            alert(`Scheduler action error: ${err.message}`);
        } finally {
            setActionLoading(null);
        }
    };

    if (loading && !stats) {
        return <div className={styles.loadingContainer}><LoadingSpinner size="large" /></div>;
    }

    const gameTypes = ['tic-tac-toe', 'checkers', 'chess', 'backgammon', 'durak', 'domino', 'dice', 'bingo'];
    const isRunning = stats?.isRunning || false;
    const totalEmptyRooms = Object.values(stats?.lobbyStats || {}).reduce((sum, stat) => sum + stat.emptyRooms, 0);
    const totalRooms = Object.values(stats?.lobbyStats || {}).reduce((sum, stat) => sum + stat.totalRooms, 0);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.titleSection}>
                        <GamepadIcon className={styles.pageIcon} />
                        <div>
                            <h1 className={styles.pageTitle}>Game Lobby Scheduler</h1>
                            <p className={styles.pageSubtitle}>Automated game lobby management and room creation</p>
                        </div>
                    </div>
                    <div className={styles.headerActions}>
                        <button
                            onClick={loadData}
                            className={`${styles.btn} ${styles.refreshButton} ${loading ? styles.loading : ''}`}
                            disabled={loading}
                        >
                            <RefreshCw size={18} />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>
            </div>

            {error && (
                <div className={styles.errorContainer}>
                    <p>{error}</p>
                    <button onClick={loadData} className={`${styles.btn} ${styles.retryButton}`}>
                        <RefreshCw size={16} />
                        Retry
                    </button>
                </div>
            )}

            {/* Main Statistics Cards */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        {isRunning ? <Activity size={24} /> : <Clock size={24} />}
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{isRunning ? 'Running' : 'Stopped'}</div>
                        <div className={styles.statLabel}>Scheduler Status</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <Users size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{totalEmptyRooms}</div>
                        <div className={styles.statLabel}>Available Rooms</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <GamepadIcon size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{totalRooms}</div>
                        <div className={styles.statLabel}>Total Rooms</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <TrendingUp size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{stats?.totalRoomsCreated || 0}</div>
                        <div className={styles.statLabel}>Total Created</div>
                    </div>
                </div>
            </div>

            {/* Scheduler Controls */}
            <div className={styles.controlsSection}>
                <h3>Scheduler Controls</h3>
                <div className={styles.controlsGrid}>
                    <button
                        onClick={() => handleSchedulerAction(isRunning ? 'stop' : 'start')}
                        className={`${styles.btn} ${isRunning ? styles.stopButton : styles.startButton}`}
                        disabled={actionLoading === 'start' || actionLoading === 'stop'}
                    >
                        {isRunning ? <Square size={18} /> : <Play size={18} />}
                        <span>{isRunning ? 'Stop Scheduler' : 'Start Scheduler'}</span>
                        {(actionLoading === 'start' || actionLoading === 'stop') && <LoadingSpinner size="small" />}
                    </button>

                    <button
                        onClick={() => handleSchedulerAction('forceCheck')}
                        className={`${styles.btn} ${styles.forceButton}`}
                        disabled={!isRunning || actionLoading === 'forceCheck'}
                    >
                        <RotateCcw size={18} />
                        <span>Force Check</span>
                        {actionLoading === 'forceCheck' && <LoadingSpinner size="small" />}
                    </button>

                    <button
                        onClick={() => handleSchedulerAction('cleanup')}
                        className={`${styles.btn} ${styles.cleanupButton}`}
                        disabled={actionLoading === 'cleanup'}
                    >
                        <Trash2 size={18} />
                        <span>Cleanup Old Rooms</span>
                        {actionLoading === 'cleanup' && <LoadingSpinner size="small" />}
                    </button>
                </div>
            </div>

            {/* Game Type Statistics */}
            {stats && (
                <div className={styles.gameStatsSection}>
                    <h3>Game Type Statistics</h3>
                    <div className={styles.gameStatsGrid}>
                        {gameTypes.map(gameType => {
                            const lobbyStats = stats.lobbyStats?.[gameType] || { emptyRooms: 0, totalRooms: 0 };
                            const roomsCreated = stats.roomsCreated?.[gameType] || 0;
                            
                            return (
                                <div key={gameType} className={styles.gameStatCard}>
                                    <h4 className={styles.gameTitle}>
                                        {gameType.charAt(0).toUpperCase() + gameType.slice(1).replace('-', ' ')}
                                    </h4>
                                    <div className={styles.gameStats}>
                                        <div className={styles.gameStatItem}>
                                            <span className={styles.gameStatLabel}>Available:</span>
                                            <span className={styles.gameStatValue}>{lobbyStats.emptyRooms}</span>
                                        </div>
                                        <div className={styles.gameStatItem}>
                                            <span className={styles.gameStatLabel}>Total:</span>
                                            <span className={styles.gameStatValue}>{lobbyStats.totalRooms}</span>
                                        </div>
                                        <div className={styles.gameStatItem}>
                                            <span className={styles.gameStatLabel}>Created:</span>
                                            <span className={styles.gameStatValue}>{roomsCreated}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Scheduler Information */}
            {stats && (
                <div className={styles.infoSection}>
                    <h3>Scheduler Information</h3>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <h4>Last Check</h4>
                            <p>{new Date(stats.lastCheck).toLocaleString()}</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h4>Next Check</h4>
                            <p>{new Date(stats.nextScheduledCheck).toLocaleString()}</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h4>Check Interval</h4>
                            <p>Every 30 seconds</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h4>Max Rooms per Lobby</h4>
                            <p>10 empty rooms</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameLobbySchedulerPage;