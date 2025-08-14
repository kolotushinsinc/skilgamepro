import React, { useState, useEffect, useCallback } from 'react';
import { getAdminActiveRooms, deleteAdminRoom, type IActiveRoom } from '../../services/adminService';
import styles from './RoomsPage.module.css';
import { Trash2, RefreshCw, Home, Users, DollarSign, Gamepad2, UserCheck, Crown, Target, Trophy } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const RoomsPage: React.FC = () => {
    const [rooms, setRooms] = useState<IActiveRoom[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRooms = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getAdminActiveRooms();
            setRooms(data);
        } catch (error) {
            console.error("Failed to fetch active rooms", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    const handleDeleteRoom = async (roomId: string) => {
        if (window.confirm(`Вы уверены, что хотите закрыть комнату ${roomId}? Игроки будут уведомлены.`)) {
            try {
                await deleteAdminRoom(roomId);
                setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
            } catch (error) {
                alert('Не удалось закрыть комнату.');
                console.error("Failed to delete room", error);
            }
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

    if (loading) return <div className={styles.loadingContainer}><LoadingSpinner size="large" /></div>;

    // Calculate statistics
    const totalRooms = rooms.length;
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
                        onClick={fetchRooms}
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

            {/* Rooms Cards */}
            {totalRooms > 0 ? (
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
        </div>
    );
};

export default RoomsPage;