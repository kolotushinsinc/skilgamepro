import React, { useState, useEffect, useCallback } from 'react';
import styles from './SecurityPage.module.css';
import { 
    Shield, 
    Activity, 
    AlertTriangle, 
    Users, 
    Eye, 
    Ban,
    RefreshCw,
    Clock,
    TrendingUp,
    TrendingDown,
    MapPin,
    Zap,
    Lock,
    AlertCircle,
    CheckCircle,
    XCircle
} from 'lucide-react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { getSecurityMetrics, getBlockedIPs, unblockIP } from '../../services/securityService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

interface SecurityMetrics {
    totalRequests: number;
    blockedRequests: number;
    rateLimitHits: number;
    bruteForceAttempts: number;
    xssBlocked: number;
    csrfBlocked: number;
    maliciousUploads: number;
    activeThreats: number;
    threatGrowth: number;
    requestGrowth: number;
    securityScore: number;
}

interface BlockedIP {
    ip: string;
    reason: string;
    blockedAt: string;
    country?: string;
    attempts: number;
    lastAttempt: string;
}

interface ThreatEvent {
    id: string;
    type: 'xss' | 'csrf' | 'brute_force' | 'rate_limit' | 'malicious_upload' | 'ddos';
    severity: 'low' | 'medium' | 'high' | 'critical';
    ip: string;
    timestamp: string;
    details: string;
    blocked: boolean;
}

const SecurityPage: React.FC = () => {
    const [metrics, setMetrics] = useState<SecurityMetrics>({
        totalRequests: 0,
        blockedRequests: 0,
        rateLimitHits: 0,
        bruteForceAttempts: 0,
        xssBlocked: 0,
        csrfBlocked: 0,
        maliciousUploads: 0,
        activeThreats: 0,
        threatGrowth: 0,
        requestGrowth: 0,
        securityScore: 0
    });
    
    const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([]);
    const [recentThreats, setRecentThreats] = useState<ThreatEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchSecurityData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const [metricsData, blockedIPsData] = await Promise.all([
                getSecurityMetrics(),
                getBlockedIPs()
            ]);

            setMetrics(metricsData);
            setBlockedIPs(blockedIPsData);
            
            // Mock recent threats data
            setRecentThreats([
                {
                    id: '1',
                    type: 'brute_force',
                    severity: 'high',
                    ip: '192.168.1.100',
                    timestamp: new Date(Date.now() - 300000).toISOString(),
                    details: 'Multiple failed login attempts',
                    blocked: true
                },
                {
                    id: '2',
                    type: 'xss',
                    severity: 'medium',
                    ip: '10.0.0.50',
                    timestamp: new Date(Date.now() - 600000).toISOString(),
                    details: 'XSS payload detected in form submission',
                    blocked: true
                },
                {
                    id: '3',
                    type: 'rate_limit',
                    severity: 'low',
                    ip: '172.16.0.25',
                    timestamp: new Date(Date.now() - 900000).toISOString(),
                    details: 'Rate limit exceeded',
                    blocked: true
                }
            ]);
            
        } catch (error) {
            console.error("Failed to fetch security data", error);
            setError("Failed to load security data. Please try again.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchSecurityData();
        
        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchSecurityData, 30000);
        return () => clearInterval(interval);
    }, [fetchSecurityData]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchSecurityData();
    };

    const handleUnblockIP = async (ip: string) => {
        try {
            await unblockIP(ip);
            setBlockedIPs(prev => prev.filter(item => item.ip !== ip));
        } catch (error) {
            console.error("Failed to unblock IP", error);
        }
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    const getSecurityScoreColor = (score: number) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#f59e0b';
        return '#ef4444';
    };

    const getThreatTypeIcon = (type: string) => {
        switch (type) {
            case 'brute_force': return <Lock size={16} />;
            case 'xss': return <AlertTriangle size={16} />;
            case 'csrf': return <Shield size={16} />;
            case 'rate_limit': return <Zap size={16} />;
            case 'malicious_upload': return <AlertCircle size={16} />;
            case 'ddos': return <Activity size={16} />;
            default: return <AlertTriangle size={16} />;
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical': return '#dc2626';
            case 'high': return '#ea580c';
            case 'medium': return '#d97706';
            case 'low': return '#65a30d';
            default: return '#6b7280';
        }
    };

    // Chart configurations
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#e2e8f0',
                    font: { family: 'Inter, system-ui, sans-serif', size: 12 }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#e2e8f0',
                bodyColor: '#cbd5e1',
                borderColor: 'rgba(59, 130, 246, 0.3)',
                borderWidth: 1,
                cornerRadius: 12
            }
        },
        scales: {
            x: {
                ticks: { color: '#94a3b8', font: { family: 'Inter, system-ui, sans-serif', size: 11 } },
                grid: { color: 'rgba(148, 163, 184, 0.1)' }
            },
            y: {
                ticks: { color: '#94a3b8', font: { family: 'Inter, system-ui, sans-serif', size: 11 } },
                grid: { color: 'rgba(148, 163, 184, 0.1)' }
            }
        }
    };

    const threatTrendsData = {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        datasets: [
            {
                label: 'Blocked Threats',
                data: [12, 8, 15, 22, 18, 25],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                borderWidth: 2
            },
            {
                label: 'Rate Limits',
                data: [5, 3, 8, 12, 9, 14],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4,
                borderWidth: 2
            }
        ]
    };

    const threatDistributionData = {
        labels: ['Brute Force', 'XSS', 'CSRF', 'Rate Limit', 'Malicious Upload'],
        datasets: [{
            data: [metrics.bruteForceAttempts, metrics.xssBlocked, metrics.csrfBlocked, metrics.rateLimitHits, metrics.maliciousUploads],
            backgroundColor: [
                'rgba(239, 68, 68, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(59, 130, 246, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(139, 92, 246, 0.8)'
            ],
            borderWidth: 2,
            hoverOffset: 8
        }]
    };

    if (loading) {
        return <div className={styles.loadingContainer}><LoadingSpinner size="large" /></div>;
    }

    if (error) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.pageHeader}>
                    <div className={styles.headerContent}>
                        <div className={styles.titleSection}>
                            <Shield className={styles.pageIcon} />
                            <div>
                                <h1 className={styles.pageTitle}>Security Monitor</h1>
                                <p className={styles.pageSubtitle}>Real-time security monitoring and threat detection</p>
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
                        <Shield className={styles.pageIcon} />
                        <div>
                            <h1 className={styles.pageTitle}>Security Monitor</h1>
                            <p className={styles.pageSubtitle}>Real-time security monitoring and threat detection</p>
                        </div>
                    </div>
                    <div className={styles.headerActions}>
                        <div className={styles.securityScore}>
                            <span className={styles.scoreLabel}>Security Score</span>
                            <span 
                                className={styles.scoreValue} 
                                style={{ color: getSecurityScoreColor(metrics.securityScore) }}
                            >
                                {metrics.securityScore}%
                            </span>
                        </div>
                        <button
                            onClick={handleRefresh}
                            className={`${styles.refreshButton} ${refreshing ? styles.loading : ''}`}
                            disabled={refreshing}
                        >
                            <RefreshCw size={18} />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Security Metrics Cards */}
            <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                        <Activity className={styles.metricIcon} />
                        <span>Total Requests</span>
                    </div>
                    <div className={styles.metricValue}>{formatNumber(metrics.totalRequests)}</div>
                    <div className={styles.metricGrowth}>
                        <TrendingUp size={14} />
                        +{metrics.requestGrowth}% vs yesterday
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                        <Ban className={styles.metricIcon} />
                        <span>Blocked Requests</span>
                    </div>
                    <div className={styles.metricValue}>{formatNumber(metrics.blockedRequests)}</div>
                    <div className={styles.metricThreat}>
                        {metrics.threatGrowth > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(metrics.threatGrowth)}% threat level
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                        <AlertTriangle className={styles.metricIcon} />
                        <span>Active Threats</span>
                    </div>
                    <div className={styles.metricValue}>{metrics.activeThreats}</div>
                    <div className={styles.metricStatus}>
                        <CheckCircle size={14} />
                        All threats contained
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                        <Users className={styles.metricIcon} />
                        <span>Blocked IPs</span>
                    </div>
                    <div className={styles.metricValue}>{blockedIPs.length}</div>
                    <div className={styles.metricInfo}>
                        <MapPin size={14} />
                        From {new Set(blockedIPs.map(ip => ip.country)).size} countries
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className={styles.chartsGrid}>
                <div className={styles.chartCard}>
                    <h3>Threat Trends (24h)</h3>
                    <Line data={threatTrendsData} options={chartOptions} />
                </div>
                <div className={styles.chartCard}>
                    <h3>Threat Distribution</h3>
                    <Doughnut data={threatDistributionData} options={chartOptions} />
                </div>
            </div>

            {/* Recent Threats and Blocked IPs */}
            <div className={styles.tablesGrid}>
                <div className={styles.tableCard}>
                    <h3>Recent Threats</h3>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>IP Address</th>
                                    <th>Severity</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentThreats.map(threat => (
                                    <tr key={threat.id}>
                                        <td>
                                            <div className={styles.threatType}>
                                                {getThreatTypeIcon(threat.type)}
                                                <span>{threat.type.replace('_', ' ')}</span>
                                            </div>
                                        </td>
                                        <td className={styles.ipAddress}>{threat.ip}</td>
                                        <td>
                                            <span 
                                                className={styles.severityBadge}
                                                style={{ backgroundColor: getSeverityColor(threat.severity) }}
                                            >
                                                {threat.severity}
                                            </span>
                                        </td>
                                        <td>{new Date(threat.timestamp).toLocaleTimeString()}</td>
                                        <td>
                                            {threat.blocked ? (
                                                <CheckCircle className={styles.statusBlocked} size={16} />
                                            ) : (
                                                <XCircle className={styles.statusAllowed} size={16} />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={styles.tableCard}>
                    <h3>Blocked IP Addresses</h3>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>IP Address</th>
                                    <th>Reason</th>
                                    <th>Attempts</th>
                                    <th>Blocked Since</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blockedIPs.map(blockedIP => (
                                    <tr key={blockedIP.ip}>
                                        <td className={styles.ipAddress}>{blockedIP.ip}</td>
                                        <td>{blockedIP.reason}</td>
                                        <td>{blockedIP.attempts}</td>
                                        <td>{new Date(blockedIP.blockedAt).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                onClick={() => handleUnblockIP(blockedIP.ip)}
                                                className={styles.unblockButton}
                                            >
                                                Unblock
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityPage;