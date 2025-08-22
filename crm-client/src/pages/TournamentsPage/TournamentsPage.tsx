import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getAdminTournaments, createAdminTournament, deleteAdminTournament, updateAdminTournament, type ITournament, type ITournamentsResponse, type IPaginationInfo } from '../../services/adminService';
import styles from './TournamentsPage.module.css';
import {
    Edit,
    Trash2,
    PlusCircle,
    Trophy,
    Users,
    DollarSign,
    Calendar,
    Crown,
    Target,
    Gamepad2,
    Clock,
    Search,
    Filter,
    Hash,
    Zap,
    Circle,
    Dice6,
    Square,
    Spade,
    ChevronDown,
    CheckCircle
} from 'lucide-react';

import EditTournamentModal from '../../components/modals/EditTournamentModal';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Pagination from '../../components/ui/Pagination';

const CreateTournamentForm: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    const [name, setName] = useState('');
    const [gameType, setGameType] = useState('chess');
    const [entryFee, setEntryFee] = useState(10);
    const [maxPlayers, setMaxPlayers] = useState(8);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGameTypeDropdownOpen, setIsGameTypeDropdownOpen] = useState(false);
    const [isMaxPlayersDropdownOpen, setIsMaxPlayersDropdownOpen] = useState(false);
    
    const gameTypeSelectRef = useRef<HTMLDivElement>(null);
    const maxPlayersSelectRef = useRef<HTMLDivElement>(null);

    const gameOptions = [
        { value: 'tic-tac-toe', label: 'Tic-Tac-Toe', icon: Hash },
        { value: 'checkers', label: 'Checkers', icon: Target },
        { value: 'chess', label: 'Chess', icon: Crown },
        { value: 'backgammon', label: 'Backgammon', icon: Zap },
        { value: 'bingo', label: 'Bingo', icon: Circle },
        { value: 'dice', label: 'Dice', icon: Dice6 },
        { value: 'domino', label: 'Domino', icon: Square },
        { value: 'durak', label: 'Durak', icon: Spade },
    ];

    const maxPlayersOptions = [
        { value: 4, label: '4 players' },
        { value: 8, label: '8 players' },
        { value: 16, label: '16 players' },
        { value: 32, label: '32 players' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (gameTypeSelectRef.current && !gameTypeSelectRef.current.contains(event.target as Node)) {
                setIsGameTypeDropdownOpen(false);
            }
            if (maxPlayersSelectRef.current && !maxPlayersSelectRef.current.contains(event.target as Node)) {
                setIsMaxPlayersDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createAdminTournament({ name, gameType, entryFee, maxPlayers });
            onFinish();
        } catch (error) {
            alert('Failed to create tournament');
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedGame = gameOptions.find(game => game.value === gameType);
    const selectedMaxPlayers = maxPlayersOptions.find(option => option.value === maxPlayers);

    const getGameIcon = (gameType: string) => {
        const game = gameOptions.find(g => g.value === gameType);
        return game ? React.createElement(game.icon, { size: 20 }) : <Gamepad2 size={20} />;
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
                    
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                {getGameIcon(gameType)}
                                Game Type
                            </label>
                            <div className={styles.customSelect} ref={gameTypeSelectRef}>
                                <div
                                    className={`${styles.selectTrigger} ${isGameTypeDropdownOpen ? styles.selectTriggerOpen : ''}`}
                                    onClick={() => !isSubmitting && setIsGameTypeDropdownOpen(!isGameTypeDropdownOpen)}
                                >
                                    <div className={styles.selectedGame}>
                                        {React.createElement(selectedGame?.icon || Hash, {
                                            className: styles.gameTypeIcon
                                        })}
                                        <span>{selectedGame?.label || 'Select Game'}</span>
                                    </div>
                                    <ChevronDown
                                        className={`${styles.chevronIcon} ${isGameTypeDropdownOpen ? styles.chevronIconOpen : ''}`}
                                    />
                                </div>
                                
                                {isGameTypeDropdownOpen && (
                                    <div className={styles.selectDropdown}>
                                        {gameOptions.map(game => (
                                            <div
                                                key={game.value}
                                                className={`${styles.selectOption} ${gameType === game.value ? styles.selectOptionSelected : ''}`}
                                                onClick={() => {
                                                    setGameType(game.value);
                                                    setIsGameTypeDropdownOpen(false);
                                                }}
                                            >
                                                {React.createElement(game.icon, {
                                                    className: styles.gameTypeIcon
                                                })}
                                                <span>{game.label}</span>
                                                {gameType === game.value && (
                                                    <CheckCircle className={styles.checkIcon} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
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
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            <Users size={16} />
                            Max Players
                        </label>
                        <div className={styles.customSelect} ref={maxPlayersSelectRef}>
                            <div
                                className={`${styles.selectTrigger} ${isMaxPlayersDropdownOpen ? styles.selectTriggerOpen : ''}`}
                                onClick={() => !isSubmitting && setIsMaxPlayersDropdownOpen(!isMaxPlayersDropdownOpen)}
                            >
                                <div className={styles.selectedGame}>
                                    <Users className={styles.gameTypeIcon} />
                                    <span>{selectedMaxPlayers?.label || 'Select Players'}</span>
                                </div>
                                <ChevronDown
                                    className={`${styles.chevronIcon} ${isMaxPlayersDropdownOpen ? styles.chevronIconOpen : ''}`}
                                />
                            </div>
                            
                            {isMaxPlayersDropdownOpen && (
                                <div className={styles.selectDropdown}>
                                    {maxPlayersOptions.map(option => (
                                        <div
                                            key={option.value}
                                            className={`${styles.selectOption} ${maxPlayers === option.value ? styles.selectOptionSelected : ''}`}
                                            onClick={() => {
                                                setMaxPlayers(option.value);
                                                setIsMaxPlayersDropdownOpen(false);
                                            }}
                                        >
                                            <Users className={styles.gameTypeIcon} />
                                            <span>{option.label}</span>
                                            {maxPlayers === option.value && (
                                                <CheckCircle className={styles.checkIcon} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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
    const [pagination, setPagination] = useState<IPaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNext: false,
        hasPrev: false
    });
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTournament, setEditingTournament] = useState<ITournament | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [tournamentToDelete, setTournamentToDelete] = useState<ITournament | null>(null);
    
    // Filter states
    const [filters, setFilters] = useState({
        status: 'all',
        gameType: 'all',
        search: ''
    });
    const [showFilters, setShowFilters] = useState(false);

    const fetchTournaments = useCallback(async (page: number = 1) => {
        try {
            setLoading(true);
            const query = {
                page,
                limit: 10,
                ...(filters.status !== 'all' && { status: filters.status }),
                ...(filters.gameType !== 'all' && { gameType: filters.gameType }),
                ...(filters.search && { search: filters.search })
            };
            
            const response: ITournamentsResponse = await getAdminTournaments(query);
            setTournaments(response.data);
            setPagination(response.pagination);
        } catch (error) {
            console.error("Failed to fetch tournaments", error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchTournaments(1);
    }, [fetchTournaments]);

    const handlePageChange = (page: number) => {
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fetchTournaments(page);
    };

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const applyFilters = () => {
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fetchTournaments(1);
    };

    const clearFilters = () => {
        setFilters({
            status: 'all',
            gameType: 'all',
            search: ''
        });
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
            fetchTournaments(pagination.currentPage);
        } catch (error) {
            alert('Failed to update tournament');
        }
    };

    const handleDeleteTournament = (tournament: ITournament) => {
        setTournamentToDelete(tournament);
        setIsConfirmDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (tournamentToDelete) {
            try {
                await deleteAdminTournament(tournamentToDelete._id);
                fetchTournaments(pagination.currentPage);
            } catch (error) {
                alert('Failed to delete tournament.');
            }
        }
        setIsConfirmDeleteOpen(false);
        setTournamentToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsConfirmDeleteOpen(false);
        setTournamentToDelete(null);
    };

    const handleCreationFinish = () => {
        setShowCreateForm(false);
        fetchTournaments(pagination.currentPage);
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

    const totalTournaments = pagination.totalItems;
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

                {/* Filters Section */}
                <div className={styles.filtersSection}>
                    <div className={styles.filtersHeader}>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`${styles.btn} ${styles.btnSecondary} ${styles.filterToggle}`}
                        >
                            <Filter size={18} />
                            <span>Filters</span>
                            <span className={styles.filterCount}>
                                {Object.values(filters).filter(f => f !== 'all' && f !== '').length > 0 &&
                                 `(${Object.values(filters).filter(f => f !== 'all' && f !== '').length})`}
                            </span>
                        </button>
                        
                        <div className={styles.searchContainer}>
                            <Search size={16} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search tournaments..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange({ search: e.target.value })}
                                onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                                className={styles.searchInput}
                            />
                        </div>
                    </div>
                    
                    {showFilters && (
                        <div className={styles.filtersContent}>
                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel}>Status:</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange({ status: e.target.value })}
                                    className={styles.filterSelect}
                                >
                                    <option value="all">All statuses</option>
                                    <option value="waiting">Waiting</option>
                                    <option value="active">Active</option>
                                    <option value="finished">Finished</option>
                                </select>
                            </div>
                            
                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel}>Game Type:</label>
                                <select
                                    value={filters.gameType}
                                    onChange={(e) => handleFilterChange({ gameType: e.target.value })}
                                    className={styles.filterSelect}
                                >
                                    <option value="all">All games</option>
                                    <option value="chess">♔ Chess</option>
                                    <option value="checkers">⚫ Checkers</option>
                                    <option value="tic-tac-toe">⭕ Tic-Tac-Toe</option>
                                    <option value="backgammon">🎲 Backgammon</option>
                                    <option value="durak">🃏 Durak</option>
                                    <option value="domino">🀰 Domino</option>
                                    <option value="dice">🎲 Dice</option>
                                    <option value="bingo">🎯 Bingo</option>
                                </select>
                            </div>
                            
                            <div className={styles.filterActions}>
                                <button
                                    onClick={applyFilters}
                                    className={`${styles.btn} ${styles.btnPrimary}`}
                                >
                                    Apply Filters
                                </button>
                                <button
                                    onClick={clearFilters}
                                    className={`${styles.btn} ${styles.btnSecondary}`}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}
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
                                        onClick={() => handleDeleteTournament(tournament)}
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

                {/* Pagination */}
                {tournaments.length > 0 && (
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        totalItems={pagination.totalItems}
                        itemsPerPage={pagination.itemsPerPage}
                        hasNext={pagination.hasNext}
                        hasPrev={pagination.hasPrev}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
            
            <EditTournamentModal
                isOpen={isEditModalOpen}
                tournament={editingTournament}
                onClose={handleCloseEditModal}
                onSave={handleSaveTournament}
            />
            
            <ConfirmationModal
                isOpen={isConfirmDeleteOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Delete Tournament"
                message={`Are you sure you want to delete the tournament "${tournamentToDelete?.name}"? This action cannot be undone and all participants will be notified.`}
                confirmText="Delete Tournament"
                cancelText="Cancel"
                type="danger"
            />
        </>
    );
};

export default TournamentsPage;