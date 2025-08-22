import React, { useState, useEffect, useCallback } from 'react';
import { getAdminActiveRooms, deleteAdminRoom, type IActiveRoom, type IRoomsResponse, type IPaginationInfo } from '../../services/adminService';
import styles from './RoomsPage.module.css';
import { Trash2, RefreshCw, Home, Users, DollarSign, Gamepad2, UserCheck, Crown, Target, Trophy, Search, Filter } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Pagination from '../../components/ui/Pagination';
import ConfirmationModal from '../../components/modals/ConfirmationModal';

const RoomsPage: React.FC = () => {
    const [rooms, setRooms] = useState<IActiveRoom[]>([]);
    const [pagination, setPagination] = useState<IPaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNext: false,
        hasPrev: false
    });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        gameType: 'all',
        search: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

    const fetchRooms = useCallback(async (page: number = 1) => {
        try {
            setLoading(true);
            const query = {
                page,
                limit: 10,
                ...(filters.gameType !== 'all' && { gameType: filters.gameType }),
                ...(filters.search && { search: filters.search })
            };
            
            const response: IRoomsResponse = await getAdminActiveRooms(query);
            setRooms(response.data);
            setPagination(response.pagination);
        } catch (error) {
            console.error("Failed to fetch active rooms", error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchRooms(1);
    }, [fetchRooms]);

    const handlePageChange = (page: number) => {
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fetchRooms(page);
    };

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const applyFilters = () => {
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fetchRooms(1);
    };

    const clearFilters = () => {
        setFilters({
            gameType: 'all',
            search: ''
        });
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteRoom = (roomId: string) => {
        setRoomToDelete(roomId);
        setShowDeleteConfirm(true);
    };

    const handleConfirmDeleteRoom = async () => {
        if (roomToDelete) {
            try {
                await deleteAdminRoom(roomToDelete);
                await fetchRooms(pagination.currentPage);
            } catch (error) {
                console.error("Failed to delete room", error);
            }
        }
        setShowDeleteConfirm(false);
        setRoomToDelete(null);
    };

    const handleCancelDeleteRoom = () => {
        setShowDeleteConfirm(false);
        setRoomToDelete(null);
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

    if (loading) return <div className={styles.loadingContainer}><LoadingSpinner size="large" /></div>;

    // Calculate statistics from pagination data and current page
    const totalRooms = pagination.totalItems;
    const totalPlayers = rooms.reduce((sum, room) => sum + room.players.length, 0);
    const totalBets = rooms.reduce((sum, room) => sum + (room.bet * room.players.length), 0);
    const gameTypes = [...new Set(rooms.map(room => room.gameType))].length;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.titleSection}>
                        <Home className={styles.pageIcon} />
                        <div>
                            <h1 className={styles.pageTitle}>Room Management</h1>
                            <p className={styles.pageSubtitle}>Monitor and manage active gaming rooms</p>
                        </div>
                    </div>
                    <button
                        onClick={() => fetchRooms(pagination.currentPage)}
                        className={`${styles.refreshButton} ${loading ? styles.loading : ''}`}
                        disabled={loading}
                    >
                        <RefreshCw size={18} />
                        <span>Refresh Rooms</span>
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.statIconTotal}`}>
                        <Home size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{totalRooms}</div>
                        <div className={styles.statLabel}>Active Rooms</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.statIconPlayers}`}>
                        <Users size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{totalPlayers}</div>
                        <div className={styles.statLabel}>Online Players</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.statIconBets}`}>
                        <DollarSign size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>${totalBets}</div>
                        <div className={styles.statLabel}>Total Stakes</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <Gamepad2 size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{gameTypes}</div>
                        <div className={styles.statLabel}>Game Types</div>
                    </div>
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
                            placeholder="Search rooms or players..."
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

            {/* Rooms Cards */}
            {rooms.length > 0 ? (
                <div className={styles.roomsGrid}>
                    {rooms.map(room => (
                        <div key={room.id} className={styles.roomCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitle}>
                                    {getGameIcon(room.gameType)}
                                    <h3>Room {room.id}</h3>
                                </div>
                                <div className={styles.statusBadge}>
                                    Active
                                </div>
                            </div>

                            <div className={styles.cardContent}>
                                <div className={styles.cardInfo}>
                                    <div className={styles.infoItem}>
                                        <Gamepad2 size={16} />
                                        <span>{room.gameType}</span>
                                    </div>
                                    
                                    <div className={styles.infoItem}>
                                        <DollarSign size={16} />
                                        <span>${room.bet} stake</span>
                                    </div>
                                    
                                    <div className={styles.infoItem}>
                                        <Users size={16} />
                                        <span>{room.players.length} players</span>
                                    </div>
                                    
                                    <div className={styles.infoItem}>
                                        <UserCheck size={16} />
                                        <span>Room #{room.id.slice(-6)}</span>
                                    </div>

                                    <div className={styles.playersSection}>
                                        <div className={styles.playersTitle}>
                                            <Users size={14} />
                                            Players in room
                                        </div>
                                        <div className={styles.playersList}>
                                            {room.players.map((player, index) => (
                                                <span key={index} className={styles.playerTag}>
                                                    {player}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.cardActions}>
                                    <button
                                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                        onClick={() => handleDeleteRoom(room.id)}
                                        title="Close Room"
                                    >
                                        <Trash2 size={16} />
                                        <span>Close</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <Home size={48} />
                    <h3>No active rooms</h3>
                    <p>There are currently no active gaming rooms. Players will create rooms automatically when they start games.</p>
                </div>
            )}

            {/* Pagination */}
            {rooms.length > 0 && (
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

            {/* Delete Room Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={handleCancelDeleteRoom}
                onConfirm={handleConfirmDeleteRoom}
                title="Close Room"
                message={`Are you sure you want to close room ${roomToDelete}? Players will be notified and the room will be permanently closed.`}
                confirmText="Close Room"
                cancelText="Cancel"
                type="danger"
            />
        </div>
    );
};

export default RoomsPage;