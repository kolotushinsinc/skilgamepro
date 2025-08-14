import React, { useState, useEffect } from 'react';
import styles from './EditTournamentModal.module.css';
import { X, Trophy, Target, DollarSign, Users, Calendar, Crown, Gamepad2 } from 'lucide-react';
import type { IUpdateTournamentData, ITournament } from '../../services/adminService';

interface EditTournamentModalProps {
    tournament: ITournament | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (tournamentId: string, tournamentData: IUpdateTournamentData) => void;
}

const EditTournamentModal: React.FC<EditTournamentModalProps> = ({ tournament, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState<IUpdateTournamentData>({});

    useEffect(() => {
        if (tournament) {
            setFormData({
                name: tournament.name,
                gameType: tournament.gameType,
                entryFee: tournament.entryFee,
                maxPlayers: tournament.maxPlayers,
                startTime: new Date(tournament.startTime).toISOString().slice(0, 16)
            });
        }
    }, [tournament]);

    if (!isOpen || !tournament) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(tournament._id, formData);
    };

    const getGameIcon = (gameType: string) => {
        switch (gameType) {
            case 'chess': return <Crown size={18} />;
            case 'checkers': return <Target size={18} />;
            case 'tic-tac-toe': return <Gamepad2 size={18} />;
            case 'backgammon': return <Trophy size={18} />;
            default: return <Gamepad2 size={18} />;
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.titleSection}>
                        <Trophy className={styles.modalIcon} />
                        <h2>Edit Tournament</h2>
                    </div>
                    <button onClick={onClose} className={styles.closeButton}>
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                <Target size={16} />
                                Tournament Name
                            </label>
                            <input
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                className={styles.formInput}
                                placeholder="Enter tournament name"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                {getGameIcon(formData.gameType || 'chess')}
                                Game Type
                            </label>
                            <select
                                name="gameType"
                                value={formData.gameType || ''}
                                onChange={handleChange}
                                className={styles.formSelect}
                            >
                                <option value="chess">♔ Chess</option>
                                <option value="checkers">⚫ Checkers</option>
                                <option value="tic-tac-toe">⭕ Tic-Tac-Toe</option>
                                <option value="backgammon">🎲 Backgammon</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                <DollarSign size={16} />
                                Entry Fee ($)
                            </label>
                            <input
                                name="entryFee"
                                type="number"
                                value={formData.entryFee || 0}
                                onChange={handleChange}
                                className={styles.formInput}
                                min="0"
                                placeholder="0"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                <Users size={16} />
                                Max Players
                            </label>
                            <select
                                name="maxPlayers"
                                value={formData.maxPlayers || 8}
                                onChange={handleChange}
                                className={styles.formSelect}
                            >
                                <option value={4}>4 players</option>
                                <option value={8}>8 players</option>
                                <option value={16}>16 players</option>
                                <option value={32}>32 players</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                <Calendar size={16} />
                                Start Time
                            </label>
                            <input
                                name="startTime"
                                type="datetime-local"
                                value={formData.startTime || ''}
                                onChange={handleChange}
                                className={styles.formInput}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" onClick={onClose} className={`${styles.btn} ${styles.btnSecondary}`}>
                            Cancel
                        </button>
                        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTournamentModal;