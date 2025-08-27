import React, { useState, useEffect, useCallback } from 'react';
import styles from './RevenuePage.module.css';
import { 
    DollarSign, 
    TrendingUp, 
    TrendingDown, 
    RefreshCw,
    BarChart3,
    Activity,
    Users,
    Gamepad2,
    Trophy,
    Calendar,
    Download,
    Filter
} from 'lucide-react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import {
    getRevenueStats,
    getRevenueAnalytics,
    getTopRevenueGenerators,
    getRevenueHistory,
    formatCurrency,
    formatNumber,
    type PlatformRevenueStats,
    type RevenueAnalytics,
    type TopRevenuePlayersResponse,
    type RevenueHistory
} from '../../services/revenueService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Pagination from '../../components/ui/Pagination';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const RevenuePage: React.FC = () => {
    const [stats, setStats] = useState<PlatformRevenueStats | null>(null);
    const [analytics, setAnalytics] = useState<RevenueAnalytics | null>(null);
    const [topPlayers, setTopPlayers] = useState<TopRevenuePlayersResponse | null>(null);
    const [revenueHistory, setRevenueHistory] = useState<RevenueHistory | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
    const [historyPage, setHistoryPage] = useState(1);
    const [historySource, setHistorySource] = useState<'ALL' | 'LOBBY' | 'TOURNAMENT'>('ALL');

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const [statsData, analyticsData, topPlayersData, historyData] = await Promise.all([
                getRevenueStats(),
                getRevenueAnalytics(selectedPeriod),
                getTopRevenueGenerators({ limit: 10, period: 'month' }),
                getRevenueHistory({ 
                    page: historyPage, 
                    limit: 10,
                    source: historySource === 'ALL' ? undefined : historySource
                })
            ]);

            setStats(statsData);
            setAnalytics(analyticsData);
            setTopPlayers(topPlayersData);
            setRevenueHistory(historyData);

        } catch (error) {
            console.error("Failed to fetch revenue data", error);
            setError("Failed to load revenue data. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [selectedPeriod, historyPage, historySource]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getGrowthIndicator = (current: number, previous: number) => {
        if (previous === 0) return null;
        const growth = ((current - previous) / previous) * 100;
        const isPositive = growth > 0;
        const className = isPositive ? styles.growthPositive : styles.growthNegative;
        return (
            <span className={className}>
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(growth).toFixed(1)}%
            </span>
        );
    };

    // Enhanced chart styling for dark theme
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#e2e8f0',
                    font: {
                        family: 'Inter, system-ui, sans-serif',
                        size: 12,
                        weight: 'normal' as const
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#e2e8f0',
                bodyColor: '#cbd5e1',
                borderColor: 'rgba(59, 130, 246, 0.3)',
                borderWidth: 1,
                cornerRadius: 12,
                titleFont: {
                    family: 'Inter, system-ui, sans-serif',
                    size: 13,
                    weight: 'bold' as const
                },
                bodyFont: {
                    family: 'Inter, system-ui, sans-serif',
                    size: 12,
                    weight: 'normal' as const
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#94a3b8',
                    font: {
                        family: 'Inter, system-ui, sans-serif',
                        size: 11,
                        weight: 'normal' as const
                    }
                },
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                    borderColor: 'rgba(148, 163, 184, 0.2)'
                }
            },
            y: {
                ticks: {
                    color: '#94a3b8',
                    font: {
                        family: 'Inter, system-ui, sans-serif',
                        size: 11,
                        weight: 'normal' as const
                    },
                    callback: function(value: any) {
                        return '$' + value;
                    }
                },
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                    borderColor: 'rgba(148, 163, 184, 0.2)'
                }
            }
        }
    } as const;

    // Revenue trend chart data
    const revenueChartData = analytics ? {
        labels: analytics.chartData.map(item => {
            const date = new Date(item.date);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }),
        datasets: [
            {
                label: 'Lobby Revenue',
                data: analytics.chartData.map(item => item.lobby),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4
            },
            {
                label: 'Tournament Revenue',
                data: analytics.chartData.map(item => item.tournament),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4
            }
        ]
    } : null;

    // Source distribution chart
    const sourceDistributionData = stats ? {
        labels: ['Lobby Games', 'Tournaments'],
        datasets: [{
            label: 'Revenue Distribution',
            data: [stats.lobby.revenue, stats.tournaments.revenue],
            backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(16, 185, 129, 0.8)'
            ],
            borderColor: [
                '#3b82f6',
                '#10b981'
            ],
            borderWidth: 2,
            hoverOffset: 8
        }]
    } : null;

    // Top players chart
    const topPlayersChartData = topPlayers ? {
        labels: topPlayers.topPlayers.slice(0, 5).map(player => player.username),
        datasets: [{
            label: 'Platform Revenue ($)',
            data: topPlayers.topPlayers.slice(0, 5).map(player => player.totalRevenue),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: '#3b82f6',
            borderWidth: 2
        }]
    } : null;

    const statCards = stats ? [
        {
            title: 'Total Revenue',
            value: formatCurrency(stats.total.revenue),
            icon: DollarSign,
            color: 'linear-gradient(135deg, #f59e0b, #d97706)',
            subtitle: `${formatNumber(stats.total.transactions)} transactions`
        },
        {
            title: 'Lobby Revenue',
            value: formatCurrency(stats.lobby.revenue),
            icon: Gamepad2,
            color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            subtitle: `${formatNumber(stats.lobby.gamesCount)} games`
        },
        {
            title: 'Tournament Revenue',
            value: formatCurrency(stats.tournaments.revenue),
            icon: Trophy,
            color: 'linear-gradient(135deg, #10b981, #059669)',
            subtitle: `${formatNumber(stats.tournaments.tournamentsCount)} tournaments`
        },
        {
            title: 'Avg per Transaction',
            value: formatCurrency(stats.total.revenue / (stats.total.transactions || 1)),
            icon: Activity,
            color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            subtitle: 'Average revenue'
        }
    ] : [];

    if (loading) {
        return <div className={styles.loadingContainer}><LoadingSpinner size="large" /></div>;
    }

    if (error) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.pageHeader}>
                    <div className={styles.headerContent}>
                        <div className={styles.titleSection}>
                            <DollarSign className={styles.pageIcon} />
                            <div>
                                <h1 className={styles.pageTitle}>Platform Revenue</h1>
                                <p className={styles.pageSubtitle}>Revenue analytics and insights</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.errorContainer}>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.titleSection}>
                        <DollarSign className={styles.pageIcon} />
                        <div>
                            <h1 className={styles.pageTitle}>Platform Revenue</h1>
                            <p className={styles.pageSubtitle}>Revenue analytics and insights</p>
                        </div>
                    </div>
                    <div className={styles.headerActions}>
                        <div className={styles.periodSelector}>
                            <Calendar size={16} />
                            <select 
                                value={selectedPeriod} 
                                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                                className={styles.periodSelect}
                            >
                                <option value="day">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="year">This Year</option>
                            </select>
                        </div>
                        <button
                            onClick={fetchData}
                            className={`${styles.refreshButton} ${loading ? styles.loading : ''}`}
                            disabled={loading}
                        >
                            <RefreshCw size={18} />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className={styles.statsGrid}>
                {statCards.map((card, index) => (
                    <div key={index} className={styles.statCard}>
                        <div className={styles.statInfo}>
                            <p className={styles.statTitle}>{card.title}</p>
                            <p className={styles.statValue}>{card.value}</p>
                            <p className={styles.statSubtitle}>{card.subtitle}</p>
                        </div>
                        <div className={styles.statIcon} style={{ background: card.color }}>
                            <card.icon />
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className={styles.chartsGrid}>
                <div className={styles.largeChartCard}>
                    <div className={styles.chartHeader}>
                        <h2>Revenue Trends</h2>
                        <span className={styles.chartPeriod}>
                            {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
                        </span>
                    </div>
                    <div className={styles.chartContainer}>
                        {revenueChartData && (
                            <Line data={revenueChartData} options={chartOptions} />
                        )}
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <h2>Revenue Sources</h2>
                    <div className={styles.chartContainer}>
                        {sourceDistributionData && (
                            <Doughnut data={sourceDistributionData} options={chartOptions} />
                        )}
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <h2>Top Revenue Generators</h2>
                    <div className={styles.chartContainer}>
                        {topPlayersChartData && (
                            <Bar data={topPlayersChartData} options={chartOptions} />
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className={styles.recentTransactionsCard}>
                <div className={styles.sectionHeader}>
                    <h2>Recent Revenue Transactions</h2>
                    <div className={styles.transactionFilters}>
                        <div className={styles.filterGroup}>
                            <Filter size={16} />
                            <select 
                                value={historySource} 
                                onChange={(e) => setHistorySource(e.target.value as any)}
                                className={styles.filterSelect}
                            >
                                <option value="ALL">All Sources</option>
                                <option value="LOBBY">Lobby Games</option>
                                <option value="TOURNAMENT">Tournaments</option>
                            </select>
                        </div>
                    </div>
                </div>

                {revenueHistory && (
                    <div className={styles.transactionsTable}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Source</th>
                                    <th>Game/Tournament</th>
                                    <th>Game Type</th>
                                    <th>Commission</th>
                                    <th>Amount</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revenueHistory.revenues.map((transaction) => {
                                    // Определяем тип игры
                                    let gameTypeInfo = '-';
                                    if (transaction.source === 'LOBBY' && transaction.players) {
                                        const realPlayers = transaction.players.filter(p => !p.isBot);
                                        const botPlayers = transaction.players.filter(p => p.isBot);
                                        
                                        if (realPlayers.length === 2) {
                                            gameTypeInfo = 'Player vs Player';
                                        } else if (realPlayers.length === 1 && botPlayers.length === 1) {
                                            gameTypeInfo = 'Player vs Bot';
                                        } else if (botPlayers.length === 2) {
                                            gameTypeInfo = 'Bot vs Bot';
                                        }
                                    } else if (transaction.source === 'TOURNAMENT') {
                                        gameTypeInfo = 'Tournament';
                                    }

                                    return (
                                        <tr key={transaction._id}>
                                            <td>
                                                {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                            <td>
                                                <span className={`${styles.sourceBadge} ${styles[transaction.source.toLowerCase()]}`}>
                                                    {transaction.source}
                                                </span>
                                            </td>
                                            <td>
                                                {transaction.gameType || transaction.tournamentId?.name || '-'}
                                            </td>
                                            <td>
                                                <span className={`${styles.gameTypeBadge} ${
                                                    gameTypeInfo === 'Player vs Player' ? styles.pvp :
                                                    gameTypeInfo === 'Player vs Bot' ? styles.pvb :
                                                    gameTypeInfo === 'Bot vs Bot' ? styles.bvb :
                                                    styles.tournament
                                                }`}>
                                                    {gameTypeInfo}
                                                </span>
                                            </td>
                                            <td>{transaction.commissionRate.toFixed(1)}%</td>
                                            <td className={styles.amount}>
                                                {formatCurrency(transaction.amount)}
                                            </td>
                                            <td className={styles.description}>
                                                {transaction.description}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <div className={styles.paginationContainer}>
                            <Pagination
                                currentPage={revenueHistory.pagination.page}
                                totalPages={revenueHistory.pagination.pages}
                                totalItems={revenueHistory.pagination.total}
                                itemsPerPage={revenueHistory.pagination.limit}
                                hasNext={revenueHistory.pagination.page < revenueHistory.pagination.pages}
                                hasPrev={revenueHistory.pagination.page > 1}
                                onPageChange={setHistoryPage}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RevenuePage;