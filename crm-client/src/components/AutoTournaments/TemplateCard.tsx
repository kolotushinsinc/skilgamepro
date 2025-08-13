import React from 'react';
import type { TournamentTemplate } from '../../services/tournamentTemplateService.ts';
import styles from './TemplateCard.module.css';

interface TemplateCardProps {
    template: TournamentTemplate;
    onEdit: () => void;
    onDelete: () => void;
    onToggleActive: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onEdit, onDelete, onToggleActive }) => {
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('ru-RU');
    };

    const getGameTypeDisplay = (gameType: string) => {
        const gameTypes: { [key: string]: string } = {
            'tic-tac-toe': 'Tic-Tac-Toe',
            'checkers': 'Checkers',
            'chess': 'Chess',
            'backgammon': 'Backgammon',
            'durak': 'Durak',
            'domino': 'Domino',
            'dice': 'Dice',
            'bingo': 'Bingo'
        };
        return gameTypes[gameType] || gameType;
    };

    const getScheduleDisplay = (schedule: TournamentTemplate['schedule']) => {
        switch (schedule.type) {
            case 'interval':
                return `Every ${schedule.intervalMinutes} min`;
            case 'fixed_time':
                return `At ${schedule.fixedTimes?.join(', ')}`;
            case 'dynamic':
                return 'Dynamic';
            default:
                return 'Not configured';
        }
    };

    return (
        <div className={`${styles.card} ${!template.isActive ? styles.inactive : ''}`}>
            <div className={styles.header}>
                <h3 className={styles.name}>{template.name}</h3>
                <div className={styles.status}>
                    <span className={`${styles.statusBadge} ${template.isActive ? styles.active : styles.inactive}`}>
                        {template.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>

            <div className={styles.info}>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Game:</span>
                    <span className={styles.value}>{getGameTypeDisplay(template.gameType)}</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Players:</span>
                    <span className={styles.value}>{template.maxPlayers}</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Entry Fee:</span>
                    <span className={styles.value}>${template.entryFee}</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Commission:</span>
                    <span className={styles.value}>{template.platformCommission}%</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Schedule:</span>
                    <span className={styles.value}>{getScheduleDisplay(template.schedule)}</span>
                </div>
            </div>

            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{template.totalTournamentsCreated}</span>
                    <span className={styles.statLabel}>Tournaments</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{template.stats.totalPlayers}</span>
                    <span className={styles.statLabel}>Players</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>${template.stats.totalPrizePool}</span>
                    <span className={styles.statLabel}>Prize Pool</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{template.stats.successRate}%</span>
                    <span className={styles.statLabel}>Success Rate</span>
                </div>
            </div>

            {template.lastTournamentCreated && (
                <div className={styles.lastTournament}>
                    <small>Last tournament: {formatDate(template.lastTournamentCreated)}</small>
                </div>
            )}

            <div className={styles.actions}>
                <button 
                    onClick={onToggleActive}
                    className={`${styles.actionButton} ${template.isActive ? styles.deactivateButton : styles.activateButton}`}
                >
                    {template.isActive ? '⏸️ Stop' : '▶️ Start'}
                </button>
                <button onClick={onEdit} className={`${styles.actionButton} ${styles.editButton}`}>
                    ✏️ Edit
                </button>
                <button onClick={onDelete} className={`${styles.actionButton} ${styles.deleteButton}`}>
                    🗑️ Delete
                </button>
            </div>
        </div>
    );
};

export default TemplateCard;