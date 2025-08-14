import React, { useState, useEffect, useCallback } from 'react';
import { getAdminTournaments, createAdminTournament, deleteAdminTournament, updateAdminTournament, type ITournament } from '../../services/adminService';
import styles from './TournamentsPage.module.css';
import { Edit, Trash2, PlusCircle, Trophy, Users, DollarSign, Calendar, Crown, Target, Gamepad2, Clock } from 'lucide-react';

import EditTournamentModal from '../../components/modals/EditTournamentModal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const CreateTournamentForm: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    const [name, setName] = useState('');
    const [gameType, setGameType] = useState('chess');
    const [entryFee, setEntryFee] = useState(10);
    const [maxPlayers, setMaxPlayers] = useState(8);
    const [startTime, setStartTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createAdminTournament({ name, gameType, entryFee, maxPlayers, startTime });
            onFinish();
        } catch (error) {
            alert('Failed to create tournament');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getGameIcon = (gameType: string) => {
        switch (gameType) {
            case 'chess': return <Crown size={20} />;
            case 'checkers': return <Target size={20} />;
            case 'tic-tac-toe': return <Gamepad2 size={20} />;
            case 'backgammon': return <Trophy size={20} />;
            default: return <Gamepad2 size={20} />;
        }
    };

    return (
        <div className={styles.createFormCard}>
            <div className={styles.createFormHeader}>
                <Trophy className={styles.headerIcon} />
                <h3>Create New Tournament</h3>
            </div>
            <form onSubmit={handleSubmit} className={styles.createForm}>
                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            <Target size={16} />
                            Tournament Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className={styles.formInput}
                            placeholder="Enter tournament name"
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            {getGameIcon(gameType)}
                            Game Type
                        </label>
                        <select
                            value={gameType}
                            onChange={e => setGameType(e.target.value)}
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
                            type="number"
                            value={entryFee}
                            onChange={e => setEntryFee(Number(e.target.value))}
                            min="0"
                            className={styles.formInput}
                            placeholder="0"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            <Users size={16} />
                            Max Players
                        </label>
                        <select
                            value={maxPlayers}
                            onChange={e => setMaxPlayers(Number(e.target.value))}
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
                            type="datetime-local"
                            value={startTime}
                            onChange={e => setStartTime(e.target.value)}
                            required
                            className={styles.formInput}
                        />
                    </div>
                </div>

                <div className={styles.formActions}>
                    <button
                        type="button"
                        onClick={onFinish}
                        className={`${styles.btn} ${styles.btnSecondary}`}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Tournament'}
                    </button>
                </div>
            </form>
        </div>
    );
};


const TournamentsPage: React.FC = () => {
    const [tournaments, setTournaments] = useState<ITournament[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTournament, setEditingTournament] = useState<ITournament | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);    

    const fetchTournaments = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getAdminTournaments();
            setTournaments(data);
        } catch (error) {
            console.error("Failed to fetch tournaments", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTournaments();
    }, [fetchTournaments]);

    const handleOpenEditModal = (tournament: ITournament) => {
        setEditingTournament(tournament);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingTournament(null);
    };

    const handleSaveTournament = async (tournamentId: string, tournamentData: any) => {
        try {
            await updateAdminTournament(tournamentId, tournamentData);
            handleCloseEditModal();
            fetchTournaments();
        } catch (error) {
            alert('Failed to update tournament');
        }
    };

    const handleDeleteTournament = async (tournamentId: string) => {
        if (window.confirm('Are you sure you want to delete this tournament?')) {
            try {
                await deleteAdminTournament(tournamentId);
                fetchTournaments();
            } catch (error) {
                alert('Failed to delete tournament.');
            }
        }
    };

    const handleCreationFinish = () => {
        setShowCreateForm(false);
        fetchTournaments();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return styles.statusPending;
            case 'active': return styles.statusActive;
            case 'completed': return styles.statusCompleted;
            default: return styles.statusPending;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending': return 'Pending';
            case 'active': return 'Active';
            case 'completed': return 'Completed';
            default: return 'Unknown';
        }
    };

    const getGameIcon = (gameType: string) => {
        switch (gameType) {
            case 'chess': return <Crown size={20} />;
            case 'checkers': return <Target size={20} />;
            case 'tic-tac-toe': return <Gamepad2 size={20} />;
            case 'backgammon': return <Trophy size={20} />;
            default: return <Gamepad2 size={20} />;
        }
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

    const totalTournaments = tournaments.length;
    const activeTournaments = tournaments.filter(t => t.status === 'active').length;
    const pendingTournaments = tournaments.filter(t => t.status === 'pending').length;
    const totalPlayers = tournaments.reduce((sum, t) => sum + t.players.length, 0);

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.pageHeader}>
                    <div className={styles.headerContent}>
                        <div className={styles.titleSection}>
                            <Trophy className={styles.pageIcon} />
                            <div>
                                <h1 className={styles.pageTitle}>Tournament Management</h1>
                                <p className={styles.pageSubtitle}>Create and manage platform tournaments</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowCreateForm(!showCreateForm)}
                            className={`${styles.btn} ${styles.btnPrimary} ${styles.createButton}`}
                        >
                            <PlusCircle size={18} />
                            <span>{showCreateForm ? 'Hide Form' : 'Create Tournament'}</span>
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <Trophy size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>{totalTournaments}</div>
                            <div className={styles.statLabel}>Total Tournaments</div>
                        </div>
                    </div>
                    
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.statIconActive}`}>
                            <Clock size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>{activeTournaments}</div>
                            <div className={styles.statLabel}>Active</div>
                        </div>
                    </div>
                    
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.statIconPending}`}>
                            <Calendar size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>{pendingTournaments}</div>
                            <div className={styles.statLabel}>Pending</div>
                        </div>
                    </div>
                    
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.statIconUsers}`}>
                            <Users size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>{totalPlayers}</div>
                            <div className={styles.statLabel}>Participants</div>
                        </div>
                    </div>
                </div>

                {showCreateForm && <CreateTournamentForm onFinish={handleCreationFinish} />}

                {/* Tournament Cards */}
                <div className={styles.tournamentGrid}>
                    {tournaments.map(tournament => (
                        <div key={tournament._id} className={styles.tournamentCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitle}>
                                    {getGameIcon(tournament.gameType)}
                                    <h3>{tournament.name}</h3>
                                </div>
                                <div className={`${styles.statusBadge} ${getStatusColor(tournament.status)}`}>
                                    {getStatusText(tournament.status)}
                                </div>
                            </div>

                            <div className={styles.cardContent}>
                                <div className={styles.cardInfo}>
                                    <div className={styles.infoItem}>
                                        <Users size={16} />
                                        <span>{tournament.players.length} / {tournament.maxPlayers} players</span>
                                    </div>
                                    
                                    <div className={styles.infoItem}>
                                        <DollarSign size={16} />
                                        <span>${tournament.entryFee} entry fee</span>
                                    </div>
                                    
                                    <div className={styles.infoItem}>
                                        <Calendar size={16} />
                                        <span>{formatDate(tournament.startTime)}</span>
                                    </div>
                                    
                                    <div className={styles.infoItem}>
                                        <Gamepad2 size={16} />
                                        <span>{tournament.gameType}</span>
                                    </div>
                                </div>

                                <div className={styles.cardActions}>
                                    <button
                                        className={`${styles.actionBtn} ${styles.editBtn}`}
                                        onClick={() => handleOpenEditModal(tournament)}
                                        title="Edit Tournament"
                                    >
                                        <Edit size={16} />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                        onClick={() => handleDeleteTournament(tournament._id)}
                                        title="Delete Tournament"
                                    >
                                        <Trash2 size={16} />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {tournaments.length === 0 && (
                    <div className={styles.emptyState}>
                        <Trophy size={48} />
                        <h3>No tournaments yet</h3>
                        <p>Create your first tournament to get started</p>
                        <button
                            onClick={() => setShowCreateForm(true)}
                            className={`${styles.btn} ${styles.btnPrimary}`}
                        >
                            <PlusCircle size={16} />
                            Create Tournament
                        </button>
                    </div>
                )}
            </div>
            
            <EditTournamentModal
                isOpen={isEditModalOpen}
                tournament={editingTournament}
                onClose={handleCloseEditModal}
                onSave={handleSaveTournament}
            />
        </>
    );
};

export default TournamentsPage;