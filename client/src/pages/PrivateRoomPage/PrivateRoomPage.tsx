import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import styles from './PrivateRoomPage.module.css';

interface PrivateRoomInfo {
    gameType: string;
    bet: number;
    hostUsername: string;
    isUsed: boolean;
    playersCount: number;
    expiresAt: string;
}

const formatGameName = (gameType: string = ''): string => {
    return gameType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const getGameIcon = (gameType: string = ''): string => {
    switch (gameType) {
        case 'tic-tac-toe': return '⭕';
        case 'checkers': return '⚫';
        case 'chess': return '♛';
        case 'backgammon': return '🎲';
        case 'durak': return '🃏';
        case 'domino': return '🀫';
        default: return '🎮';
    }
}

const PrivateRoomPage: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const { socket } = useSocket();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [roomInfo, setRoomInfo] = useState<PrivateRoomInfo | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);

    useEffect(() => {
        if (!socket || !token) return;

        const onPrivateRoomInfo = (info: PrivateRoomInfo) => {
            setRoomInfo(info);
            setLoading(false);
        };

        const onGameStart = (room: any) => {
            navigate(`/game/${room.gameType}/${room.id}`);
        };

        const onError = ({ message }: { message: string }) => {
            setError(message);
            setLoading(false);
            setJoining(false);
        };

        socket.on('privateRoomInfo', onPrivateRoomInfo);
        socket.on('gameStart', onGameStart);
        socket.on('error', onError);

        // Request room info
        socket.emit('getPrivateRoomInfo', token);

        return () => {
            socket.off('privateRoomInfo', onPrivateRoomInfo);
            socket.off('gameStart', onGameStart);
            socket.off('error', onError);
        };
    }, [socket, token, navigate]);

    const handleJoinRoom = () => {
        if (socket && token) {
            setError('');
            setJoining(true);
            socket.emit('joinPrivateRoom', token);
        }
    };

    if (!user) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1>🔒 Private Room Invitation</h1>
                    <p>You need to be logged in to join a private room.</p>
                    <button onClick={() => navigate('/login')} className={`${styles.btn} ${styles.btnPrimary}`}>
                        Login
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.spinner}></div>
                    <p>Loading room information...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.errorIcon}>❌</div>
                    <h1>Unable to Join Room</h1>
                    <p className={styles.errorMessage}>{error}</p>
                    <button onClick={() => navigate('/games')} className={`${styles.btn} ${styles.btnSecondary}`}>
                        Back to Games
                    </button>
                </div>
            </div>
        );
    }

    if (!roomInfo) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.errorIcon}>❌</div>
                    <h1>Room Not Found</h1>
                    <p>This private room invitation is invalid or has expired.</p>
                    <button onClick={() => navigate('/games')} className={`${styles.btn} ${styles.btnSecondary}`}>
                        Back to Games
                    </button>
                </div>
            </div>
        );
    }

    const isExpired = new Date(roomInfo.expiresAt) < new Date();
    const canJoin = !roomInfo.isUsed && !isExpired && roomInfo.playersCount < 2 && user.balance >= roomInfo.bet;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.gameHeader}>
                    <div className={styles.gameIcon}>
                        {getGameIcon(roomInfo.gameType)}
                    </div>
                    <div>
                        <h1>🔒 Private Room Invitation</h1>
                        <p>{formatGameName(roomInfo.gameType)}</p>
                    </div>
                </div>

                <div className={styles.roomDetails}>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Host:</span>
                        <span className={styles.value}>{roomInfo.hostUsername}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Bet:</span>
                        <span className={styles.value}>${roomInfo.bet}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Players:</span>
                        <span className={styles.value}>{roomInfo.playersCount}/2</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Your Balance:</span>
                        <span className={styles.value}>${user.balance.toFixed(2)}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Expires:</span>
                        <span className={styles.value}>
                            {new Date(roomInfo.expiresAt).toLocaleString()}
                        </span>
                    </div>
                </div>

                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}

                <div className={styles.status}>
                    {roomInfo.isUsed && (
                        <div className={styles.statusError}>
                            ❌ This invitation has already been used
                        </div>
                    )}
                    {isExpired && (
                        <div className={styles.statusError}>
                            ⏰ This invitation has expired
                        </div>
                    )}
                    {roomInfo.playersCount >= 2 && (
                        <div className={styles.statusError}>
                            👥 This room is already full
                        </div>
                    )}
                    {user.balance < roomInfo.bet && (
                        <div className={styles.statusError}>
                            💰 Insufficient balance to join this room
                        </div>
                    )}
                    {canJoin && (
                        <div className={styles.statusSuccess}>
                            ✅ Ready to join this private room
                        </div>
                    )}
                </div>

                <div className={styles.actions}>
                    <button 
                        onClick={() => navigate('/games')} 
                        className={`${styles.btn} ${styles.btnSecondary}`}
                    >
                        Back to Games
                    </button>
                    
                    {canJoin && (
                        <button 
                            onClick={handleJoinRoom} 
                            disabled={joining}
                            className={`${styles.btn} ${styles.btnPrimary}`}
                        >
                            {joining ? (
                                <>
                                    <div className={styles.spinner}></div>
                                    Joining...
                                </>
                            ) : (
                                `Join Room ($${roomInfo.bet})`
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrivateRoomPage;