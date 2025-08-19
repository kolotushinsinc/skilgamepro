import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tournament, tournamentService, TournamentPagination } from '../../services/tournamentService';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import CustomSelect from '../../components/ui/CustomSelect';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import InsufficientFundsModal from '../../components/modals/InsufficientFundsModal';
import styles from './TournamentsListPage.module.css';

const TournamentsListPage: React.FC = () => {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'waiting' | 'active' | 'finished' | 'cancelled'>('waiting');
    const [gameTypeFilter, setGameTypeFilter] = useState<'all' | 'tic-tac-toe' | 'checkers' | 'chess' | 'backgammon' | 'durak' | 'domino' | 'dice' | 'bingo'>('all');
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [pagination, setPagination] = useState<TournamentPagination | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showInsufficientFundsModal, setShowInsufficientFundsModal] = useState(false);
    const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
    
    const { user } = useAuth();
    const { socket } = useSocket();
    const navigate = useNavigate();
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const statusText = {
        WAITING: 'Waiting',
        ACTIVE: 'Active',
        FINISHED: 'Finished',
        CANCELLED: 'Cancelled'
    };

    const statusFullText = {
        WAITING: 'Waiting for players',
        ACTIVE: 'Tournament active',
        FINISHED: 'Tournament finished',
        CANCELLED: 'Tournament cancelled'
    };

    const gameTypeText = {
        'tic-tac-toe': 'Tic-Tac-Toe',
        'checkers': 'Checkers',
        'chess': 'Chess',
        'backgammon': 'Backgammon',
        'durak': 'Durak',
        'domino': 'Domino',
        'dice': 'Dice',
        'bingo': 'Bingo'
    };

    const gameTypeIcons = {
        'tic-tac-toe': '⭕',
        'checkers': '🔴',
        'chess': '♚',
        'backgammon': '🎲',
        'durak': '🃏',
        'domino': '🀫',
        'dice': '🎯',
        'bingo': '🎱'
    };

    const gameTypeImages = {
        'chess': 'https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=800',
        'checkers': 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67a99e7d6bcf180eb89c36da_67a99e866bcf180eb89c3b0d/scale_1200',
        'backgammon': 'https://www.superbetinyeniadresi.net/wp-content/uploads/2020/10/Tavla-Oynanan-Bahis-Siteleri.jpg',
        'bingo': 'https://avatars.mds.yandex.net/i?id=abe8723d93205892f919d0635deafded_l-5341604-images-thumbs&n=13',
        'domino': 'https://wallpapers.com/images/hd/domino-2858-x-2037-background-51j0j2sp58c1n3b1.jpg',
        'durak': 'https://play-lh.googleusercontent.com/iExl3GyKHtppXeORDO5YshBcrFD7xc6BSvj4NTl5wT-Zq53LBM93Nyx6AfrRUQTP77A=w1024-h500',
        'dice': 'https://i.pinimg.com/originals/18/fd/e1/18fde15323d44e0c2d6bcd23e6f2c93f.jpg',
        'tic-tac-toe': 'https://media.printables.com/media/prints/996434/images/7583870_392cdefa-1c3e-4318-9225-1bc12ed72a34_47a94660-c70d-4554-8a25-288442c379ea/tictac-2_configuration_no-configuration.png'
    };

    // Опции для селекта статуса
    const statusOptions = [
        { value: 'all', label: 'All Tournaments', icon: '🎯' },
        { value: 'waiting', label: 'Waiting for Players', icon: '⏳' },
        { value: 'active', label: 'Active Tournaments', icon: '🔥' },
        { value: 'finished', label: 'Finished Tournaments', icon: '🏆' },
        { value: 'cancelled', label: 'Cancelled Tournaments', icon: '❌' }
    ];

    // Опции для селекта типа игры
    const gameTypeOptions = [
        { value: 'all', label: 'All Games', icon: '🎮' },
        { value: 'tic-tac-toe', label: 'Tic-Tac-Toe', icon: gameTypeIcons['tic-tac-toe'] },
        { value: 'checkers', label: 'Checkers', icon: gameTypeIcons['checkers'] },
        { value: 'chess', label: 'Chess', icon: gameTypeIcons['chess'] },
        { value: 'backgammon', label: 'Backgammon', icon: gameTypeIcons['backgammon'] },
        { value: 'durak', label: 'Durak', icon: gameTypeIcons['durak'] },
        { value: 'domino', label: 'Domino', icon: gameTypeIcons['domino'] },
        { value: 'dice', label: 'Dice', icon: gameTypeIcons['dice'] },
        { value: 'bingo', label: 'Bingo', icon: gameTypeIcons['bingo'] }
    ];

    useEffect(() => {
        loadTournaments(true);
    }, [filter, gameTypeFilter]);

    useEffect(() => {
        if (socket) {
            socket.on('tournamentCreated', handleTournamentUpdate);
            socket.on('tournamentUpdated', handleTournamentUpdate);
            socket.on('tournamentStarted', handleTournamentUpdate);
            socket.on('tournamentFinished', handleTournamentUpdate);

            return () => {
                socket.off('tournamentCreated', handleTournamentUpdate);
                socket.off('tournamentUpdated', handleTournamentUpdate);
                socket.off('tournamentStarted', handleTournamentUpdate);
                socket.off('tournamentFinished', handleTournamentUpdate);
            };
        }
    }, [socket]);

    // Live timer update effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const loadTournaments = async (reset: boolean = false) => {
        try {
            if (reset) {
                setLoading(true);
                setCurrentPage(1);
                setHasMore(true);
            } else {
                setLoadingMore(true);
            }
            
            const pageToLoad = reset ? 1 : currentPage;
            const response = await tournamentService.getAllTournaments(
                pageToLoad, 
                12, 
                filter === 'all' ? undefined : filter,
                gameTypeFilter === 'all' ? undefined : gameTypeFilter
            );
            
            if (reset) {
                setTournaments(response.tournaments);
            } else {
                setTournaments(prev => [...prev, ...response.tournaments]);
            }
            
            setPagination(response.pagination);
            setHasMore(response.pagination.hasNext);
            setCurrentPage(prev => prev + 1);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const loadMoreTournaments = useCallback(() => {
        if (!loadingMore && hasMore && pagination?.hasNext) {
            loadTournaments(false);
        }
    }, [loadingMore, hasMore, pagination?.hasNext]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreTournaments();
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [loadMoreTournaments]);

    const handleTournamentUpdate = (updatedTournament: Tournament) => {
        setTournaments(prev => {
            const index = prev.findIndex(t => t._id === updatedTournament._id);
            if (index >= 0) {
                const newTournaments = [...prev];
                newTournaments[index] = updatedTournament;
                return newTournaments;
            } else {
                return [updatedTournament, ...prev];
            }
        });
    };

    const handleRegister = async (tournamentId: string) => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const socketId = socket?.id;
            await tournamentService.registerInTournament(tournamentId, socketId);
            await loadTournaments(true);
        } catch (err: any) {
            // Если ошибка связана с регистрацией в другом турнире, показываем подробное сообщение
            if (err.message.includes('уже зарегистрированы в турнире')) {
                const confirmMessage = `${err.message}\n\nХотите перейти к списку ваших турниров для отмены регистрации?`;
                if (confirm(confirmMessage)) {
                    // Можно добавить навигацию к списку турниров игрока, если такая страница есть
                    console.log('Пользователь хочет отменить регистрацию в другом турнире');
                }
            } else if (err.message.toLowerCase().includes('insufficient funds') ||
                       err.message.toLowerCase().includes('not enough balance') ||
                       err.message.toLowerCase().includes('недостаточно средств')) {
                // Найдем турнир для отображения в модальном окне
                const tournament = tournaments.find(t => t._id === tournamentId);
                setSelectedTournament(tournament || null);
                setShowInsufficientFundsModal(true);
            } else {
                alert(err.message);
            }
        }
    };

    const handleUnregister = async (tournamentId: string) => {
        try {
            await tournamentService.unregisterFromTournament(tournamentId);
            await loadTournaments(true);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const getTimeUntilStart = (tournament: Tournament): string => {
        const timeLeft = tournamentService.getTimeUntilStart(tournament);
        if (timeLeft <= 0) return '';
        
        const totalSeconds = Math.ceil(timeLeft / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        if (minutes > 0) {
            return `Starting in ${minutes}m ${seconds}s`;
        } else {
            return `Starting in ${seconds}s`;
        }
    };

    const isPlayerRegistered = (tournament: Tournament): boolean => {
        return user ? tournamentService.isPlayerRegistered(tournament, user._id) : false;
    };

    const canPlayerRegister = (tournament: Tournament): boolean => {
        return user ? tournamentService.canPlayerRegister(tournament, user._id) : false;
    };

    const closeInsufficientFundsModal = () => {
        setShowInsufficientFundsModal(false);
        setSelectedTournament(null);
    };

    if (loading) {
        return (
            <LoadingSpinner text="Loading tournaments..." />
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    Error: {error}
                    <button onClick={() => loadTournaments(true)} className={styles.retryButton}>
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Tournaments</h1>
                <button
                    onClick={() => loadTournaments(true)}
                    className={styles.refreshButton}
                    disabled={loading}
                >
                    🔄 Refresh
                </button>
            </div>

            <div className={styles.filters}>
                <div className={styles.filterGroup}>
                    <label>Status:</label>
                    <CustomSelect
                        options={statusOptions}
                        value={filter}
                        onChange={(value) => setFilter(value as any)}
                        placeholder="Select status"
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label>Game:</label>
                    <CustomSelect
                        options={gameTypeOptions}
                        value={gameTypeFilter}
                        onChange={(value) => setGameTypeFilter(value as any)}
                        placeholder="Select game type"
                    />
                </div>
            </div>

            {/* Tournament Requirements Section */}
            <div className={`${styles["tournament-requirements"]} tournament-requirements`} data-testid="tournament-requirements">
                <h4>📋 Tournament Entry Requirements</h4>
                <div className={styles["requirement-item"]}>
                    <span className={styles["requirement-icon"]}>💰</span>
                    <div className={styles["requirement-content"]}>
                        <span className={styles["requirement-label"]}>Minimum Balance:</span>
                        <span className={styles["requirement-value"]}>Varies by tournament entry fee</span>
                    </div>
                </div>
                <div className={styles["requirement-item"]}>
                    <span className={styles["requirement-icon"]}>✅</span>
                    <div className={styles["requirement-content"]}>
                        <span className={styles["requirement-label"]}>Account Status:</span>
                        <span className={styles["requirement-value"]}>Active and verified</span>
                    </div>
                </div>
                <div className={styles["requirement-item"]}>
                    <span className={styles["requirement-icon"]}>🎯</span>
                    <div className={styles["requirement-content"]}>
                        <span className={styles["requirement-label"]}>Registration:</span>
                        <span className={styles["requirement-value"]}>Required before tournament start</span>
                    </div>
                </div>
            </div>

            {/* Tournament Schedule Section */}
            <div className={`${styles["tournament-schedule"]} tournament-schedule`} data-testid="tournament-schedule">
                <h4>📅 Tournament Schedule</h4>
                <div className={styles["schedule-content"]}>
                    <p className={styles["schedule-description"]}>
                        Tournaments start automatically when the minimum number of players register or at the scheduled start time.
                    </p>
                    <div className={styles["schedule-note"]}>
                        <span className={styles["schedule-icon"]}>ℹ️</span>
                        <span>Check individual tournament cards for specific start times and registration deadlines.</span>
                    </div>
                </div>
            </div>

            {/* Prize Structure Section */}
            <div className={`${styles["prize-structure"]} prize-structure`} data-testid="prize-structure">
                <h4>🏆 Prize Structure Information</h4>
                <p className={styles["prize-description"]}>
                    Prize pools are distributed based on tournament performance:
                </p>
                <div className={styles["prize-tier"]}>
                    <span className={styles["prize-medal"]}>🥇</span>
                    <span className={styles["prize-position"]}>1st Place:</span>
                    <span className={styles["prize-amount"]}>60% of prize pool</span>
                </div>
                <div className={styles["prize-tier"]}>
                    <span className={styles["prize-medal"]}>🥈</span>
                    <span className={styles["prize-position"]}>2nd Place:</span>
                    <span className={styles["prize-amount"]}>30% of prize pool</span>
                </div>
                <div className={styles["prize-tier"]}>
                    <span className={styles["prize-medal"]}>🥉</span>
                    <span className={styles["prize-position"]}>3rd Place:</span>
                    <span className={styles["prize-amount"]}>10% of prize pool</span>
                </div>
            </div>

            {tournaments.length === 0 && !loading ? (
                <div className={styles.emptyState}>
                    <h3>No tournaments found</h3>
                    <p>Try changing filters or create a new tournament</p>
                </div>
            ) : (
                <>
                    <div className={styles.tournamentsList}>
                        {tournaments.map(tournament => (
                            <div
                                key={tournament._id}
                                className={styles.tournamentCard}
                                style={{
                                    backgroundImage: `url(${gameTypeImages[tournament.gameType]})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <div className={styles.cardOverlay}></div>
                                <div className={styles.tournamentHeader}>
                                    <h3 className={styles.tournamentName}>
                                        <span className={styles.gameIcon}>{gameTypeIcons[tournament.gameType]}</span>
                                        {tournament.name}
                                    </h3>
                                    <span className={`${styles.status} ${styles[tournament.status.toLowerCase()]}`}>
                                        {statusText[tournament.status]}
                                    </span>
                                </div>

                                <div className={styles.tournamentInfo}>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Game:</span>
                                        <span>
                                            <span className={styles.gameIcon}>{gameTypeIcons[tournament.gameType]}</span>
                                            {gameTypeText[tournament.gameType]}
                                        </span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Entry Fee:</span>
                                        <span>{tournament.entryFee} coins</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Prize Pool:</span>
                                        <span>{tournament.prizePool} coins</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Players:</span>
                                        <span>
                                            {tournament.players.length}/{tournament.maxPlayers}
                                            <div className={styles.progressBar}>
                                                <div 
                                                    className={styles.progressFill}
                                                    style={{ 
                                                        width: `${tournamentService.getFilledPercentage(tournament)}%` 
                                                    }}
                                                />
                                            </div>
                                        </span>
                                    </div>
                                </div>

                                {tournamentService.isStartingSoon(tournament) && (
                                    <div className={styles.startTimer}>
                                        ⏰ {getTimeUntilStart(tournament)}
                                    </div>
                                )}

                                <div className={styles.tournamentActions}>
                                    {tournament.status === 'WAITING' && (
                                        <>
                                            {isPlayerRegistered(tournament) ? (
                                                <button 
                                                    onClick={() => handleUnregister(tournament._id)}
                                                    className={styles.unregisterButton}
                                                >
                                                    Cancel registration
                                                </button>
                                            ) : canPlayerRegister(tournament) ? (
                                                <button 
                                                    onClick={() => handleRegister(tournament._id)}
                                                    className={styles.registerButton}
                                                >
                                                    Register
                                                </button>
                                            ) : (
                                                <button 
                                                    disabled 
                                                    className={styles.disabledButton}
                                                >
                                                    {tournament.players.length >= tournament.maxPlayers
                                                        ? 'Tournament full'
                                                        : 'Insufficient funds'
                                                    }
                                                </button>
                                            )}
                                        </>
                                    )}

                                    <button 
                                        onClick={() => navigate(`/tournament/${tournament._id}`)}
                                        className={styles.viewButton}
                                    >
                                        Details
                                    </button>
                                </div>

                                {tournament.players.length > 0 && (
                                    <div className={styles.playersList}>
                                        <h4>Participants:</h4>
                                        <div className={styles.players}>
                                            {tournament.players.map((player, index) => (
                                                <span
                                                    key={`${player._id}-${index}`}
                                                    className={`${styles.player} ${player.isBot ? styles.bot : ''}`}
                                                >
                                                    {player.username}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Load more trigger element */}
                    {hasMore && (
                        <div ref={loadMoreRef} className={styles.loadMoreTrigger}>
                            {loadingMore && (
                                <div className={styles.loadingMore}>
                                    <LoadingSpinner text="Loading more tournaments..." />
                                </div>
                            )}
                        </div>
                    )}

                    {!hasMore && tournaments.length > 0 && (
                        <div className={styles.endMessage}>
                            <p>You've reached the end of the tournament list</p>
                        </div>
                    )}
                </>
            )}

            {/* Insufficient Funds Modal */}
            <InsufficientFundsModal
                isOpen={showInsufficientFundsModal}
                onClose={closeInsufficientFundsModal}
                requiredAmount={selectedTournament?.entryFee || 0}
                currentBalance={user?.balance || 0}
            />
        </div>
    );
};

export default TournamentsListPage;