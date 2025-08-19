import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Tournament, tournamentService } from '../../services/tournamentService';
import axios from 'axios';
import { Trophy, Target, DollarSign, Clock, Users } from 'lucide-react';
import styles from './DashboardPage.module.css';
import { API_URL } from '../../api/index';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface IGameHistory {
    _id: string;
    gameName: string;
    opponent: string;
    status: 'WON' | 'LOST' | 'DRAW';
    createdAt: string;
}

const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ totalGames: 0, winRate: 0, hoursPlayed: 0, totalWinnings: 0 });
    const [recentGames, setRecentGames] = useState<IGameHistory[]>([]);
    const [upcomingTournaments, setUpcomingTournaments] = useState<Tournament[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Set loading to true
                setLoading(true);

                const token = localStorage.getItem('token');
                const authHeaders = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };

                const [gamesHistoryRes, tournamentsRes] = await Promise.all([
                    axios.get(`${API_URL}/api/users/history/games?limit=10`, authHeaders),
                    tournamentService.getActiveTournaments()
                ]);

                console.log('Games response:', gamesHistoryRes.data);
                console.log('Tournaments response:', tournamentsRes);

                // Handle game history - API returns {games: [...], total, page, totalPages}
                const gamesData = gamesHistoryRes.data;
                const gamesHistory = gamesData.games || [];
                
                const totalGames = gamesData.total || gamesHistory.length;
                const wins = gamesHistory.filter((g: any) => g.status === 'WON').length;
                const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
                const totalWinnings = gamesHistory.reduce((acc: number, game: any) => acc + (game.amountChanged > 0 ? game.amountChanged : 0), 0);
                
                // Calculate hours played (estimate based on games played)
                const hoursPlayed = Math.round(totalGames * 0.5); // Assume 30 minutes per game on average
                
                setStats({ totalGames, winRate, hoursPlayed, totalWinnings });
                
                // Show at least 5 recent games, but limit to available games
                const recentGamesToShow = Math.min(5, gamesHistory.length);
                setRecentGames(gamesHistory.slice(0, recentGamesToShow));
                
                // Show at least 5 upcoming tournaments
                const waitingTournaments = tournamentsRes.filter(t => t.status === 'WAITING');
                const activeTournaments = tournamentsRes.filter(t => t.status === 'ACTIVE');
                
                // Combine waiting and active tournaments, prioritize waiting
                const combinedTournaments = [...waitingTournaments, ...activeTournaments];
                const tournamentsToShow = Math.min(5, combinedTournaments.length);
                setUpcomingTournaments(combinedTournaments.slice(0, tournamentsToShow));
                
            } catch (error) {
                console.error("Failed to load dashboard data:", error);
                
                // Set default values on error
                setStats({ totalGames: 0, winRate: 0, hoursPlayed: 0, totalWinnings: 0 });
                setRecentGames([]);
                setUpcomingTournaments([]);
            } finally {
                setLoading(false);
            }
        };
        
        if (user) {
            fetchData();
        }
    }, [user]);

    const statsCards = [
        { title: 'Total Games', value: stats.totalGames, icon: Target, color: 'bg-blue-600' },
        { title: 'Win Rate', value: `${stats.winRate}%`, icon: Trophy, color: 'bg-green-600' },
        { title: 'Hours Played', value: `${stats.hoursPlayed}h`, icon: Clock, color: 'bg-purple-600' },
        { title: 'Total Earnings', value: `$${stats.totalWinnings.toFixed(2)}`, icon: DollarSign, color: 'bg-yellow-600' },
    ];

    if (loading) return <LoadingSpinner fullScreen text="Loading dashboard..." />;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerFirst}>
                    <h1>Dashboard</h1>
                    <p>Welcome back, {user?.username}! Ready for your next game?</p>
                </div>
                <div className={styles.ratingWidget} data-testid="current-rank">
                    <div className={styles.ratingWidgetText}>
                        <p>Current Rank</p>
                        <p>Master</p>
                    </div>
                    <div className={styles.ratingWidgetIcon}><Trophy /></div>
                </div>
            </div>

            <div className={styles.statsGrid} data-testid="stats-grid">
                {statsCards.map((stat, index) => (
                    <div key={index} className={styles.statCard}>
                        <div className={styles.statCardInfo}>
                            <p>{stat.title}</p>
                            <p>{stat.value}</p>
                        </div>
                        <div className={styles.statCardIcon} style={{backgroundColor: stat.color.replace('bg-','').split('-')[0]}}>
                            <stat.icon />
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.layoutGrid}>
                <div className={styles.contentBox} data-testid="recent-games-section">
                    <div className={styles.boxHeader}>
                        <h2>Recent Games</h2>
                        <Link to="/profile" data-testid="view-all-games">View All</Link>
                    </div>
                    <div className={styles.itemList}>
                        {recentGames.length > 0 ? (
                            recentGames.map((game) => (
                                <div key={game._id} className={styles.gameItem}>
                                    <div className={styles.gameItemInfo}>
                                        <div className={styles.gameItemAvatar}>{game.gameName.charAt(0)}</div>
                                        <div className={styles.gameItemText}>
                                            <p>{game.gameName}</p>
                                            <p>vs {game.opponent}</p>
                                        </div>
                                    </div>
                                    <div className={styles.gameItemResult}>
                                        <span className={`${styles.badge} ${game.status === 'WON' ? styles.badgeGreen : game.status === 'LOST' ? styles.badgeRed : styles.badgeYellow}`}>
                                            {game.status === 'WON' ? 'Won' : game.status === 'LOST' ? 'Lost' : 'Draw'}
                                        </span>
                                        <p>{new Date(game.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                                <p>No recent games yet</p>
                                <p>Start playing to see your game history here!</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.contentBox} data-testid="tournaments-section">
                    <div className={styles.boxHeader}>
                        <h2>Upcoming Tournaments</h2>
                        <Link to="/tournaments" data-testid="view-all-tournaments">View All</Link>
                    </div>
                    <div className={styles.itemList}>
                        {upcomingTournaments.length > 0 ? (
                            upcomingTournaments.map((tournament) => (
                                <Link key={tournament._id} to={`/tournaments/${tournament._id}`} className={styles.tournamentItem} data-testid="tournament-card">
                                    <div className={styles.tournamentItemHeader}>
                                        <h3>{tournament.name}</h3>
                                        <span>${tournament.prizePool}</span>
                                    </div>
                                    <div className={styles.tournamentItemFooter}>
                                        <span>{tournament.status === 'WAITING' ? 'Registration Open' : 'Active'}</span>
                                        <div><Users size={16} /><span>{tournament.players.length}/{tournament.maxPlayers} players</span></div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                                <p>No upcoming tournaments</p>
                                <p>Check back later or create your own tournament!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;