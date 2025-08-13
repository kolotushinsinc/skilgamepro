import React from 'react';
import type { SchedulerStats } from '../../services/tournamentTemplateService.ts';
import styles from './SchedulerStatsCard.module.css';

interface SchedulerStatsCardProps {
    stats: SchedulerStats;
    onSchedulerAction: (action: 'start' | 'stop' | 'forceCheck') => void;
}

const SchedulerStatsCard: React.FC<SchedulerStatsCardProps> = ({ stats, onSchedulerAction }) => {
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('ru-RU');
    };

    const getStatusColor = (isRunning: boolean) => {
        return isRunning ? '#28a745' : '#dc3545';
    };

    const getStatusText = (isRunning: boolean) => {
        return isRunning ? 'Running' : 'Stopped';
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.title}>Tournament Scheduler</h2>
                <div className={styles.statusIndicator}>
                    <div 
                        className={styles.statusDot}
                        style={{ backgroundColor: getStatusColor(stats.isRunning) }}
                    />
                    <span 
                        className={styles.statusText}
                        style={{ color: getStatusColor(stats.isRunning) }}
                    >
                        {getStatusText(stats.isRunning)}
                    </span>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{stats.totalTemplates}</span>
                    <span className={styles.statLabel}>Total Templates</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{stats.activeTemplates}</span>
                    <span className={styles.statLabel}>Active</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{stats.tournamentsCreatedToday}</span>
                    <span className={styles.statLabel}>Created Today</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>
                        {stats.activeTemplates > 0 ? Math.round((stats.activeTemplates / stats.totalTemplates) * 100) : 0}%
                    </span>
                    <span className={styles.statLabel}>Activity Rate</span>
                </div>
            </div>

            <div className={styles.timeInfo}>
                <div className={styles.timeItem}>
                    <span className={styles.timeLabel}>Last check:</span>
                    <span className={styles.timeValue}>
                        {stats.lastCheck ? formatDate(stats.lastCheck) : 'Never'}
                    </span>
                </div>
                <div className={styles.timeItem}>
                    <span className={styles.timeLabel}>Next check:</span>
                    <span className={styles.timeValue}>
                        {stats.nextScheduledCheck ? formatDate(stats.nextScheduledCheck) : 'Not scheduled'}
                    </span>
                </div>
            </div>

            <div className={styles.actions}>
                {!stats.isRunning ? (
                    <button
                        onClick={() => onSchedulerAction('start')}
                        className={`${styles.actionButton} ${styles.startButton}`}
                    >
                        ▶️ Start Scheduler
                    </button>
                ) : (
                    <button
                        onClick={() => onSchedulerAction('stop')}
                        className={`${styles.actionButton} ${styles.stopButton}`}
                    >
                        ⏸️ Stop Scheduler
                    </button>
                )}
                
                <button
                    onClick={() => onSchedulerAction('forceCheck')}
                    className={`${styles.actionButton} ${styles.forceButton}`}
                    disabled={!stats.isRunning}
                >
                    🔄 Force Check
                </button>
            </div>

            {!stats.isRunning && (
                <div className={styles.warning}>
                    <span className={styles.warningIcon}>⚠️</span>
                    <span className={styles.warningText}>
                        Scheduler is stopped. Automatic tournaments will not be created.
                    </span>
                </div>
            )}
        </div>
    );
};

export default SchedulerStatsCard;