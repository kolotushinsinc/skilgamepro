import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import InsufficientFundsModal from '../../components/modals/InsufficientFundsModal';
import {
    ArrowLeft,
    Plus,
    Users,
    DollarSign,
    Play,
    Lock,
    Clock,
    Copy,
    X,
    UserCheck,
    Coins,
    Trophy,
    Gamepad2,
    Zap,
    Crown
} from 'lucide-react';
import styles from './LobbyPage.module.css';

interface RoomInfo {
    id: string;
    bet: number;
    host: { user: { username: string } };
}

interface GameRoom {
    id: string;
    gameType: string;
}

const formatGameName = (gameType: string = ''): string => {
    return gameType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const getGameIcon = (gameType: string = '') => {
    switch (gameType) {
        case 'tic-tac-toe': return { icon: '⭕', color: '#3b82f6' };
        case 'checkers': return { icon: '⚫', color: '#6b7280' };
        case 'chess': return { icon: '♛', color: '#8b5cf6' };
        case 'backgammon': return { icon: '🎲', color: '#f59e0b' };
        case 'durak': return { icon: '🃏', color: '#ef4444' };
        case 'domino': return { icon: '🀫', color: '#10b981' };
        case 'bingo': return { icon: '🎱', color: '#ec4899' };
        default: return { icon: '🎮', color: '#64748b' };
    }
}

const getGameGradient = (gameType: string = ''): string => {
    switch (gameType) {
        case 'tic-tac-toe': return 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
        case 'checkers': return 'linear-gradient(135deg, #6b7280, #374151)';
        case 'chess': return 'linear-gradient(135deg, #8b5cf6, #7c3aed)';
        case 'backgammon': return 'linear-gradient(135deg, #f59e0b, #d97706)';
        case 'durak': return 'linear-gradient(135deg, #ef4444, #dc2626)';
        case 'domino': return 'linear-gradient(135deg, #10b981, #059669)';
        case 'bingo': return 'linear-gradient(135deg, #ec4899, #db2777)';
        default: return 'linear-gradient(135deg, #64748b, #475569)';
    }
}

const LobbyPage: React.FC = () => {
    const { gameType } = useParams<{ gameType: string }>();
    const { socket } = useSocket();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [rooms, setRooms] = useState<RoomInfo[]>([]);
    const [bet, setBet] = useState(10);
    const [error, setError] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [showPrivateModal, setShowPrivateModal] = useState(false);
    const [showInsufficientFundsModal, setShowInsufficientFundsModal] = useState(false);
    const [privateRoomData, setPrivateRoomData] = useState<{
        invitationToken: string;
        invitationUrl: string;
        expiresAt: string;
        room?: any;
    } | null>(null);

    useEffect(() => {
        if (!socket || !gameType) return;
        socket.emit('joinLobby', gameType);

        const onRoomsList = (availableRooms: RoomInfo[]) => setRooms(availableRooms);
        const onGameStart = (room: GameRoom) => navigate(`/game/${room.gameType}/${room.id}`);
        const onError = ({ message }: { message: string }) => {
            // Check if the error is about insufficient funds
            if (message.toLowerCase().includes('insufficient funds') ||
                message.toLowerCase().includes('not enough balance') ||
                message.toLowerCase().includes('недостаточно средств')) {
                setShowInsufficientFundsModal(true);
            } else {
                setError(message);
            }
            setIsCreating(false);
        };
        const onPrivateRoomCreated = (data: any) => {
            setPrivateRoomData({
                invitationToken: data.invitationToken,
                invitationUrl: data.invitationUrl,
                expiresAt: data.expiresAt,
                room: data.room
            });
            setShowPrivateModal(true);
            setIsCreating(false);
        };
        
        socket.on('roomsList', onRoomsList);
        socket.on('gameStart', onGameStart);
        socket.on('error', onError);
        socket.on('privateRoomCreated', onPrivateRoomCreated);

        return () => {
            socket.emit('leaveLobby', gameType);
            socket.off('roomsList', onRoomsList);
            socket.off('gameStart', onGameStart);
            socket.off('error', onError);
            socket.off('privateRoomCreated', onPrivateRoomCreated);
        };
    }, [socket, gameType, navigate]);

    const handleCreateRoom = () => {
        if (socket && gameType) {
            setError('');
            setIsCreating(true);
            socket.emit('createRoom', { gameType, bet });
        }
    };

    const handleCreatePrivateRoom = () => {
        if (socket && gameType) {
            setError('');
            setIsCreating(true);
            socket.emit('createPrivateRoom', { gameType, bet });
        }
    };

    const handleJoinRoom = (roomId: string) => {
        if (socket) {
            setError('');
            socket.emit('joinRoom', roomId);
        }
    };

    const copyInvitationLink = () => {
        if (privateRoomData) {
            navigator.clipboard.writeText(privateRoomData.invitationUrl);
            alert('Invitation link copied to clipboard!');
        }
    };

    const closePrivateModal = () => {
        setShowPrivateModal(false);
        setPrivateRoomData(null);
    };

    const joinPrivateRoom = () => {
        if (privateRoomData?.room) {
            navigate(`/game/${privateRoomData.room.gameType}/${privateRoomData.room.id}`);
        }
        closePrivateModal();
    };

    const closeInsufficientFundsModal = () => {
        setShowInsufficientFundsModal(false);
    };

    if (!user || !gameType) {
        return <LoadingSpinner fullScreen text="Loading lobby..." />;
    }

    const gameInfo = getGameIcon(gameType);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.backgroundElements}>
                <div className={styles.gradientOrb1}></div>
                <div className={styles.gradientOrb2}></div>
                <div className={styles.gradientOrb3}></div>
            </div>

            <div className={styles.pageHeader}>
                <button onClick={() => navigate('/games')} className={styles.backButton}>
                    <ArrowLeft size={20} />
                    <span>Back to Games</span>
                </button>
                
                <div className={styles.gameHeader}>
                    <div
                        className={styles.gameIcon}
                        style={{ background: getGameGradient(gameType) }}
                    >
                        <span className={styles.gameIconEmoji}>{gameInfo.icon}</span>
                        <div className={styles.gameIconGlow}></div>
                    </div>
                    <div className={styles.gameInfo}>
                        <h1 className={styles.gameTitle}>{formatGameName(gameType)} Lobby</h1>
                        <div className={styles.balanceInfo}>
                            <Coins size={16} />
                            <span>Balance: <span className={styles.balanceAmount}>${user.balance.toFixed(2)}</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className={styles.errorAlert}>
                    <Zap size={16} />
                    <span>{error}</span>
                </div>
            )}

            <div className={styles.mainGrid}>
                <div className={styles.createSection}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionIcon}>
                            <Plus size={20} />
                        </div>
                        <div>
                            <h2 className={styles.sectionTitle}>Create Game</h2>
                            <p className={styles.sectionSubtitle}>Start your own room and wait for opponents</p>
                        </div>
                    </div>

                    <div className={styles.betSection}>
                        <label className={styles.betLabel}>
                            <DollarSign size={16} />
                            Bet Amount
                        </label>
                        <div className={styles.betInputContainer}>
                            <input
                                type="number"
                                value={bet}
                                onChange={(e) => setBet(Math.max(1, Number(e.target.value)))}
                                min="1"
                                max={user.balance}
                                className={styles.betInput}
                                placeholder="Enter bet amount"
                            />
                            <div className={styles.betSuggestions}>
                                {[5, 10, 25, 50].map(amount => (
                                    <button
                                        key={amount}
                                        onClick={() => setBet(amount)}
                                        className={`${styles.betSuggestion} ${bet === amount ? styles.active : ''}`}
                                        disabled={amount > user.balance}
                                    >
                                        ${amount}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.actionButtons}>
                        <button
                            onClick={handleCreateRoom}
                            disabled={isCreating || bet > user.balance}
                            className={styles.createButton}
                        >
                            {isCreating ? (
                                <LoadingSpinner size="small" text="" />
                            ) : (
                                <>
                                    <Play size={16} />
                                    <span>Create Public Room</span>
                                </>
                            )}
                        </button>
                        
                        <button
                            onClick={handleCreatePrivateRoom}
                            disabled={isCreating || bet > user.balance}
                            className={styles.privateButton}
                        >
                            {isCreating ? (
                                <LoadingSpinner size="small" text="" />
                            ) : (
                                <>
                                    <Lock size={16} />
                                    <span>Create Private Room</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className={styles.roomsSection}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionIcon}>
                            <Users size={20} />
                        </div>
                        <div>
                            <h2 className={styles.sectionTitle}>Available Rooms</h2>
                            <p className={styles.sectionSubtitle}>Join an existing game or wait for new rooms</p>
                        </div>
                    </div>
                    
                    <div className={styles.roomsList}>
                        {rooms.length === 0 ? (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>
                                    <Clock size={48} />
                                </div>
                                <h3 className={styles.emptyTitle}>No Active Rooms</h3>
                                <p className={styles.emptyDescription}>
                                    Be the first to create a room and start the excitement!
                                </p>
                            </div>
                        ) : (
                            rooms.map(room => (
                                <div key={room.id} className={styles.roomCard}>
                                    <div className={styles.roomInfo}>
                                        <div className={styles.playerAvatar}>
                                            <UserCheck size={20} />
                                        </div>
                                        <div className={styles.roomDetails}>
                                            <h4 className={styles.roomHost}>{room.host.user.username}</h4>
                                            <div className={styles.roomBet}>
                                                <Trophy size={14} />
                                                <span>Bet: ${room.bet}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleJoinRoom(room.id)}
                                        className={styles.joinButton}
                                    >
                                        <Gamepad2 size={16} />
                                        <span>Join Game</span>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Private Room Modal */}
            {showPrivateModal && privateRoomData && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalTitleSection}>
                                <Lock size={24} />
                                <h2 className={styles.modalTitle}>Private Room Created!</h2>
                            </div>
                            <button className={styles.closeButton} onClick={closePrivateModal}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className={styles.modalContent}>
                            <p className={styles.modalDescription}>
                                Your private room has been created successfully. Share this invitation link with your opponent:
                            </p>
                            
                            <div className={styles.invitationSection}>
                                <div className={styles.invitationBox}>
                                    <input
                                        type="text"
                                        value={privateRoomData.invitationUrl}
                                        readOnly
                                        className={styles.invitationInput}
                                    />
                                    <button onClick={copyInvitationLink} className={styles.copyButton}>
                                        <Copy size={16} />
                                        <span>Copy</span>
                                    </button>
                                </div>
                                
                                <div className={styles.roomInfoGrid}>
                                    <div className={styles.infoItem}>
                                        <Gamepad2 size={16} />
                                        <span>Game: {formatGameName(gameType)}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <DollarSign size={16} />
                                        <span>Bet: ${bet}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <Clock size={16} />
                                        <span>Expires: {new Date(privateRoomData.expiresAt).toLocaleString()}</span>
                                    </div>
                                </div>
                                
                                <div className={styles.warningNote}>
                                    <Crown size={16} />
                                    <span>This invitation link can only be used once and expires in 15 minutes.</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.modalActions}>
                            <button onClick={closePrivateModal} className={styles.stayButton}>
                                <ArrowLeft size={16} />
                                <span>Stay in Lobby</span>
                            </button>
                            <button onClick={joinPrivateRoom} className={styles.joinPrivateButton}>
                                <Play size={16} />
                                <span>Join Private Room</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Insufficient Funds Modal */}
            <InsufficientFundsModal
                isOpen={showInsufficientFundsModal}
                onClose={closeInsufficientFundsModal}
                requiredAmount={bet}
                currentBalance={user?.balance || 0}
            />
        </div>
    );
};

export default LobbyPage;