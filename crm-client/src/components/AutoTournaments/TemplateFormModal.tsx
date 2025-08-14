import React, { useState, useEffect } from 'react';
import type { TournamentTemplate } from '../../services/tournamentTemplateService.ts';
import styles from './TemplateFormModal.module.css';

interface TemplateFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    template?: TournamentTemplate | null;
    title: string;
}

const TemplateFormModal: React.FC<TemplateFormModalProps> = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    template, 
    title 
}) => {
    const [formData, setFormData] = useState<{
        name: string;
        gameType: 'tic-tac-toe' | 'checkers' | 'chess' | 'backgammon' | 'durak' | 'domino' | 'dice' | 'bingo';
        maxPlayers: 4 | 8 | 16 | 32;
        entryFee: number;
        platformCommission: number;
        isActive: boolean;
        schedule: {
            type: 'interval' | 'fixed_time' | 'dynamic';
            intervalMinutes?: number;
            fixedTimes?: string[];
            dynamicRules?: {
                minActiveTournaments: number;
                maxActiveTournaments: number;
                minPlayersOnline: number;
            };
        };
        timeSettings: {
            timeZone: string;
            daysOfWeek: number[];
            startHour: number;
            endHour: number;
        };
    }>({
        name: '',
        gameType: 'tic-tac-toe',
        maxPlayers: 4,
        entryFee: 10,
        platformCommission: 10,
        isActive: true,
        schedule: {
            type: 'interval',
            intervalMinutes: 60,
            fixedTimes: ['10:00', '14:00', '18:00', '22:00'],
            dynamicRules: {
                minActiveTournaments: 1,
                maxActiveTournaments: 3,
                minPlayersOnline: 10
            }
        },
        timeSettings: {
            timeZone: 'Europe/Moscow',
            daysOfWeek: [1, 2, 3, 4, 5, 6, 0], // Monday to Sunday
            startHour: 10,
            endHour: 23
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initialize form data only once when modal opens
    React.useEffect(() => {
        if (isOpen && !loading) {
            if (template) {
                // Editing existing template
                setFormData({
                    name: template.name,
                    gameType: template.gameType,
                    maxPlayers: template.maxPlayers,
                    entryFee: template.entryFee,
                    platformCommission: template.platformCommission,
                    isActive: template.isActive,
                    schedule: template.schedule,
                    timeSettings: template.timeSettings
                });
            } else if (formData.name === '') {
                // Creating new template - only set defaults if form is empty
                setFormData({
                    name: '',
                    gameType: 'tic-tac-toe',
                    maxPlayers: 4,
                    entryFee: 10,
                    platformCommission: 10,
                    isActive: true,
                    schedule: {
                        type: 'interval',
                        intervalMinutes: 60,
                        fixedTimes: ['10:00', '14:00', '18:00', '22:00'],
                        dynamicRules: {
                            minActiveTournaments: 1,
                            maxActiveTournaments: 3,
                            minPlayersOnline: 10
                        }
                    },
                    timeSettings: {
                        timeZone: 'Europe/Moscow',
                        daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
                        startHour: 10,
                        endHour: 23
                    }
                });
            }
            setError(null);
        }
    }, [isOpen, template?.name]); // Only depend on isOpen and template name to prevent constant resets

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await onSubmit(formData);
        } catch (err: any) {
            setError(err.message || 'An error occurred while saving');
        } finally {
            setLoading(false);
        }
    };

    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const updateScheduleData = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                [field]: value
            }
        }));
    };

    const updateTimeSettings = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            timeSettings: {
                ...prev.timeSettings,
                [field]: value
            }
        }));
    };

    const updateDaysOfWeek = (day: number, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            timeSettings: {
                ...prev.timeSettings,
                daysOfWeek: checked 
                    ? [...prev.timeSettings.daysOfWeek, day].sort()
                    : prev.timeSettings.daysOfWeek.filter(d => d !== day)
            }
        }));
    };

    const handleFixedTimesChange = (value: string) => {
        const times = value.split(',').map(t => t.trim()).filter(t => t);
        updateScheduleData('fixedTimes', times);
    };

    if (!isOpen) return null;

    const gameTypes = [
        { value: 'tic-tac-toe', label: 'Tic-Tac-Toe' },
        { value: 'checkers', label: 'Checkers' },
        { value: 'chess', label: 'Chess' },
        { value: 'backgammon', label: 'Backgammon' },
        { value: 'durak', label: 'Durak' },
        { value: 'domino', label: 'Domino' },
        { value: 'dice', label: 'Dice' },
        { value: 'bingo', label: 'Bingo' }
    ];

    const playerCounts = [4, 8, 16, 32];
    const scheduleTypes = [
        { value: 'interval', label: 'Interval-based' },
        { value: 'fixed_time', label: 'Fixed Times' },
        { value: 'dynamic', label: 'Dynamic Rules' }
    ];

    const daysOfWeekLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && (
                        <div className={styles.error}>
                            {error}
                        </div>
                    )}

                    {/* Basic Settings */}
                    <div className={styles.section}>
                        <h3>Basic Settings</h3>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Template Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => updateFormData('name', e.target.value)}
                                    required
                                    className={styles.input}
                                    placeholder="Enter template name"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Game Type</label>
                                <select
                                    value={formData.gameType}
                                    onChange={(e) => updateFormData('gameType', e.target.value)}
                                    className={styles.select}
                                >
                                    {gameTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Maximum Players</label>
                                <select
                                    value={formData.maxPlayers}
                                    onChange={(e) => updateFormData('maxPlayers', Number(e.target.value))}
                                    className={styles.select}
                                >
                                    {playerCounts.map(count => (
                                        <option key={count} value={count}>
                                            {count} players
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Entry Fee ($)</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.entryFee}
                                    onChange={(e) => updateFormData('entryFee', Number(e.target.value))}
                                    className={styles.input}
                                    placeholder="0.00"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Platform Commission (%)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    value={formData.platformCommission}
                                    onChange={(e) => updateFormData('platformCommission', Number(e.target.value))}
                                    className={styles.input}
                                    placeholder="10.0"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => updateFormData('isActive', e.target.checked)}
                                        className={styles.checkbox}
                                    />
                                    Active Template
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Schedule Configuration */}
                    <div className={styles.section}>
                        <h3>Schedule Configuration</h3>
                        <div className={styles.formGroup}>
                            <label>Schedule Type</label>
                            <select
                                value={formData.schedule.type}
                                onChange={(e) => updateScheduleData('type', e.target.value)}
                                className={styles.select}
                            >
                                {scheduleTypes.map(type => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {formData.schedule.type === 'interval' && (
                            <div className={styles.formGroup}>
                                <label>Repeat Interval (minutes)</label>
                                <input
                                    type="number"
                                    min="5"
                                    step="5"
                                    value={formData.schedule.intervalMinutes || 60}
                                    onChange={(e) => updateScheduleData('intervalMinutes', Number(e.target.value))}
                                    className={styles.input}
                                    placeholder="60"
                                />
                            </div>
                        )}

                        {formData.schedule.type === 'fixed_time' && (
                            <div className={styles.formGroup}>
                                <label>Fixed Times (comma-separated, HH:MM format)</label>
                                <input
                                    type="text"
                                    value={formData.schedule.fixedTimes?.join(', ') || ''}
                                    onChange={(e) => handleFixedTimesChange(e.target.value)}
                                    placeholder="10:00, 14:00, 18:00, 22:00"
                                    className={styles.input}
                                />
                            </div>
                        )}

                        {formData.schedule.type === 'dynamic' && (
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Minimum Active Tournaments</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.schedule.dynamicRules?.minActiveTournaments || 1}
                                        onChange={(e) => updateScheduleData('dynamicRules', {
                                            ...formData.schedule.dynamicRules,
                                            minActiveTournaments: Number(e.target.value)
                                        })}
                                        className={styles.input}
                                        placeholder="1"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Maximum Active Tournaments</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.schedule.dynamicRules?.maxActiveTournaments || 3}
                                        onChange={(e) => updateScheduleData('dynamicRules', {
                                            ...formData.schedule.dynamicRules,
                                            maxActiveTournaments: Number(e.target.value)
                                        })}
                                        className={styles.input}
                                        placeholder="3"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Minimum Players Online</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.schedule.dynamicRules?.minPlayersOnline || 10}
                                        onChange={(e) => updateScheduleData('dynamicRules', {
                                            ...formData.schedule.dynamicRules,
                                            minPlayersOnline: Number(e.target.value)
                                        })}
                                        className={styles.input}
                                        placeholder="10"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Time Configuration */}
                    <div className={styles.section}>
                        <h3>Time Configuration</h3>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Time Zone</label>
                                <input
                                    type="text"
                                    value={formData.timeSettings.timeZone}
                                    onChange={(e) => updateTimeSettings('timeZone', e.target.value)}
                                    className={styles.input}
                                    placeholder="Europe/Moscow"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Start Hour (24h format)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="23"
                                    value={formData.timeSettings.startHour}
                                    onChange={(e) => updateTimeSettings('startHour', Number(e.target.value))}
                                    className={styles.input}
                                    placeholder="10"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>End Hour (24h format)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="23"
                                    value={formData.timeSettings.endHour}
                                    onChange={(e) => updateTimeSettings('endHour', Number(e.target.value))}
                                    className={styles.input}
                                    placeholder="23"
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Active Days of Week</label>
                            <div className={styles.daysOfWeek}>
                                {daysOfWeekLabels.map((label, index) => (
                                    <label key={index} className={styles.dayLabel}>
                                        <input
                                            type="checkbox"
                                            checked={formData.timeSettings.daysOfWeek.includes(index)}
                                            onChange={(e) => updateDaysOfWeek(index, e.target.checked)}
                                            className={styles.checkbox}
                                        />
                                        {label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className={styles.submitButton}>
                            {loading ? 'Saving Template...' : 'Save Template'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TemplateFormModal;