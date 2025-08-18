import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import TicTacToeBoard from '../../components/game/TicTacToeBoard';
import CheckersBoard from '../../components/game/CheckersBoard';
import ChessBoard from '../../components/game/ChessBoard';
import BackgammonBoard from '../../components/game/BackgammonBoard';
import DurakBoard from '../../components/game/DurakBoard';
import DominoBoard from '../../components/game/DominoBoard';
import DiceBoard from '../../components/game/DiceBoard';
import BingoBoard from '../../components/game/BingoBoard';
import ErrorModal from '../../components/modals/ErrorModal';
import GameResultModal from '../../components/modals/GameResultModal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Chess } from 'chess.js';
import styles from './GamePage.module.css';

interface Player {
    user: { _id: string; username: string; }
}

interface GameRoomState {
    id: string;
    gameType: string;
    players: Player[];
    gameState: { board: ('X' | 'O' | null)[]; turn: string; };
    bet: number;
    isPrivate?: boolean;
    invitationToken?: string;
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
        case 'dice': return { icon: '🎯', color: '#ec4899' };
        case 'bingo': return { icon: '🎱', color: '#06b6d4' };
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
        case 'dice': return 'linear-gradient(135deg, #ec4899, #db2777)';
        case 'bingo': return 'linear-gradient(135deg, #06b6d4, #0891b2)';
        default: return 'linear-gradient(135deg, #64748b, #475569)';
    }
}

const GamePage: React.FC = () => {
    const { gameType, roomId } = useParams<{ gameType: string; roomId: string }>();
    const navigate = useNavigate();
    const { socket } = useSocket();
    const { user, refreshUser } = useAuth();
    
    const [roomState, setRoomState] = useState<GameRoomState | null>(null);
    const [gameMessage, setGameMessage] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [redirectCountdown, setRedirectCountdown] = useState(5);
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });
    const [gameResultModal, setGameResultModal] = useState({
        isOpen: false,
        result: 'win' as 'win' | 'lose' | 'draw',
        opponentName: ''
    });
    const [showInvitationLink, setShowInvitationLink] = useState(false);
    const redirectTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!socket || !roomId) return;

        const isTournamentGame = roomId.startsWith('tourney-');

        if (isTournamentGame) {
            socket.emit('joinTournamentGame', roomId);
        } else {
            socket.emit('getGameState', roomId);
        }

        const onGameStart = (state: GameRoomState) => {
            console.log('Game started:', state);
            setGameMessage('');
            setRoomState(state);
            if (state.players.length === 1 && !isTournamentGame) {
                setCountdown(15);
            }
        };

        const onGameUpdate = (state: GameRoomState) => {
            console.log('Game updated:', state);
            setRoomState(state);
        };

        const onGameEnd = handleGameEnd;

        const onError = ({ message }: { message: string }) => {
            console.error('Game error:', message);
            setErrorModal({ isOpen: true, message });
        };

        const onPlayerReconnected = ({ message }: { message: string }) => {
            console.log('Player reconnected:', message);
            setGameMessage('');
        };

        const onOpponentDisconnected = ({ message }: { message: string }) => {
            console.log('Opponent disconnected:', message);
            setGameMessage(`⏳ Opponent disconnected. Waiting for reconnection...`);
        };
        
        socket.on('gameStart', onGameStart);
        socket.on('gameUpdate', onGameUpdate);
        socket.on('gameEnd', onGameEnd);
        socket.on('error', onError);
        socket.on('playerReconnected', onPlayerReconnected);
        socket.on('opponentDisconnected', onOpponentDisconnected);

        socket.emit('getGameState', roomId);

        return () => {
            socket.off('gameStart', onGameStart);
            socket.off('gameUpdate', onGameUpdate);
            socket.off('gameEnd', onGameEnd);
            socket.off('error', onError);
            socket.off('playerReconnected', onPlayerReconnected);
            socket.off('opponentDisconnected', onOpponentDisconnected);
        };
    }, [socket, roomId, user?.username, navigate, gameType, refreshUser]);

    useEffect(() => {
        if (roomState?.players.length !== 1 || countdown <= 0 || gameMessage) return;
        const timer = setInterval(() => setCountdown(prev => prev > 0 ? prev - 1 : 0), 1000);
        return () => clearInterval(timer);
    }, [roomState, countdown, gameMessage]);

    useEffect(() => {
        if (gameMessage) {
            setRedirectCountdown(5);
            redirectTimerRef.current = setInterval(() => {
                setRedirectCountdown(prev => {
                    if (prev <= 1) {
                        if (redirectTimerRef.current) clearInterval(redirectTimerRef.current);
                        
                        if (roomId?.startsWith('tourney-')) {
                            const tournamentId = roomId.split('-')[1];
                            navigate(`/tournaments/${tournamentId}`);
                        } else {
                            navigate(`/lobby/${gameType}`);
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (redirectTimerRef.current) clearInterval(redirectTimerRef.current);
        };
    }, [gameMessage, navigate, gameType]);

    const handleLeaveGame = () => {
        if (socket && roomId) {
            socket.emit('leaveGame', roomId);
        }
        
        if (roomId?.startsWith('tourney-')) {
            const tournamentId = roomId.split('-')[1];
            navigate(`/tournaments/${tournamentId}`);
        } else {
            navigate(`/lobby/${gameType}`);
        }
    };

    const handleMove = (moveData: any) => {
        if (socket) {
            socket.emit('playerMove', { roomId, move: moveData });
        }
    };

    const handleGameTimeout = (data: any) => {
        console.log('[GamePage] Game timeout received:', data);
        
        // Simulate game end with proper winner/loser
        const isIWinner = data.winnerId === user?._id;
        const winnerPlayer = roomState?.players.find(p => p.user._id === data.winnerId);
        
        // Create a fake game end event to trigger the proper modal
        const gameEndData = {
            winner: winnerPlayer || null,
            isDraw: false
        };
        
        // Call the existing game end handler to show proper modal
        setTimeout(() => {
            handleGameEnd(gameEndData);
        }, 100);
    };

    const handleGameEnd = async ({ winner, isDraw }: { winner: any | null, isDraw: boolean }) => {
        console.log('Game ended:', { winner, isDraw });
        
        let result: 'win' | 'lose' | 'draw';
        let opponentName = '';
        
        if (isDraw) {
            result = 'draw';
            setGameMessage('🤝 Match ended in a draw!');
        } else if (winner?.user?._id === user?._id || winner?._id === user?._id) {
            result = 'win';
            setGameMessage('🎉 Victory! You won the match!');
            opponentName = roomState?.players.find(p => p.user._id !== user?._id)?.user.username || '';
        } else {
            result = 'lose';
            setGameMessage(`😔 Defeat! Winner: ${winner?.user?.username || winner?.username || 'Unknown'}`);
            opponentName = winner?.user?.username || winner?.username || 'Unknown';
        }

        setGameResultModal({
            isOpen: true,
            result,
            opponentName
        });

        try {
            await refreshUser();
        } catch (error) {
            console.error("Failed to update profile after game", error);
        }
    };

    const closeErrorModal = () => {
        setErrorModal({ isOpen: false, message: '' });
    };

    const closeGameResultModal = () => {
        setGameResultModal({ isOpen: false, result: 'win', opponentName: '' });
    };

    const handleBackToLobby = () => {
        if (roomId?.startsWith('tourney-')) {
            const tournamentId = roomId.split('-')[1];
            navigate(`/tournaments/${tournamentId}`);
        } else {
            navigate(`/lobby/${gameType}`);
        }
    };

    const copyInvitationLink = () => {
        if (roomState?.invitationToken) {
            const invitationUrl = `https://platform.skillgame.pro/private-room/${roomState.invitationToken}`;
            navigator.clipboard.writeText(invitationUrl);
            alert('Private room invitation link copied to clipboard!');
        }
    };

    const toggleInvitationLink = () => {
        setShowInvitationLink(!showInvitationLink);
    };

    const handleRollDice = () => {
        if (socket) {
            socket.emit('rollDice', roomId);
        }
    };

    const renderGameBoard = () => {
        if (!roomState) return null;

        const myPlayerIndex = roomState.players.findIndex((p: Player) => p.user._id === user?._id);
        const isMyTurn = roomState.gameState.turn === user?._id;

        switch (gameType) {
            case 'tic-tac-toe':
                return (
                    <TicTacToeBoard
                        board={roomState.gameState.board}
                        onMove={(cellIndex) => handleMove({ cellIndex })}
                        isMyTurn={roomState.gameState.turn === user?._id}
                        isGameFinished={!!gameMessage}
                        hasOpponent={roomState.players.length >= 2}
                        myPlayerId={user?._id}
                        onGameTimeout={handleGameTimeout}
                    />
                );
            case 'checkers':
                if (myPlayerIndex === -1) return (
                    <div className={styles.errorMessage}>
                        <p>Error: You are not a player in this room.</p>
                    </div>
                );
                return (
                    <CheckersBoard
                        // @ts-ignore
                        gameState={roomState.gameState}
                        // @ts-ignore
                        onMove={(move) => handleMove(move)}
                        isMyTurn={roomState.gameState.turn === user?._id}
                        isGameFinished={!!gameMessage}
                        myPlayerIndex={myPlayerIndex as 0 | 1}
                        hasOpponent={roomState.players.length >= 2}
                        myPlayerId={user?._id}
                        onGameTimeout={handleGameTimeout}
                    />
                );
            case 'chess':
                return (
                    <ChessBoard
                        // @ts-ignore
                        gameState={roomState.gameState}
                        onMove={(move) => handleMove(move)}
                        isMyTurn={isMyTurn}
                        isGameFinished={!!gameMessage}
                        myPlayerIndex={myPlayerIndex as 0 | 1}
                        hasOpponent={roomState.players.length >= 2}
                        myPlayerId={user?._id}
                        onGameTimeout={handleGameTimeout}
                    />
                );
            case 'backgammon':
                return (
                    <BackgammonBoard
                        // @ts-ignore
                        gameState={roomState.gameState}
                        onMove={(move) => handleMove(move)}
                        onRollDice={handleRollDice}
                        isMyTurn={isMyTurn}
                        isGameFinished={!!gameMessage}
                        myPlayerIndex={myPlayerIndex as 0 | 1}
                    />
                );
            case 'durak':
                if (myPlayerIndex === -1) return (
                    <div className={styles.errorMessage}>
                        <p>Error: You are not a player in this room.</p>
                    </div>
                );
                return (
                    <DurakBoard
                        // @ts-ignore
                        gameState={roomState.gameState}
                        onMove={(move) => handleMove(move)}
                        isMyTurn={isMyTurn}
                        isGameFinished={!!gameMessage}
                        myPlayerIndex={myPlayerIndex as 0 | 1}
                    />
                );
            case 'domino':
                if (myPlayerIndex === -1) return (
                    <div className={styles.errorMessage}>
                        <p>Error: You are not a player in this room.</p>
                    </div>
                );
                return (
                    <DominoBoard
                        // @ts-ignore
                        gameState={roomState.gameState}
                        onMove={(move) => handleMove(move)}
                        isMyTurn={isMyTurn}
                        isGameFinished={!!gameMessage}
                        myPlayerIndex={myPlayerIndex as 0 | 1}
                    />
                );
            case 'dice':
                if (myPlayerIndex === -1) return (
                    <div className={styles.errorMessage}>
                        <p>Error: You are not a player in this room.</p>
                    </div>
                );
                return (
                    <DiceBoard
                        // @ts-ignore
                        gameState={roomState.gameState}
                        onMove={(move) => handleMove(move)}
                        isMyTurn={isMyTurn}
                        isGameFinished={!!gameMessage}
                        myPlayerIndex={myPlayerIndex as 0 | 1}
                    />
                );
            case 'bingo':
                if (myPlayerIndex === -1) return (
                    <div className={styles.errorMessage}>
                        <p>Error: You are not a player in this room.</p>
                    </div>
                );
                return (
                    <BingoBoard
                        // @ts-ignore
                        gameState={roomState.gameState}
                        onMove={(move) => handleMove(move)}
                        isMyTurn={isMyTurn}
                        isGameFinished={!!gameMessage}
                        myPlayerIndex={myPlayerIndex as 0 | 1}
                    />
                );
            default:
                return (
                    <div className={styles.errorMessage}>
                        <p>Game "{gameType}" not found.</p>
                    </div>
                );
        }
    };

    if (!roomState) {
        return (
            <div className={styles.loadingContainer}>
                <LoadingSpinner fullScreen text="Loading game..." />
            </div>
        );
    }
    
    const isWaitingForOpponent = roomState.players.length < 2 && !gameMessage;
    const opponent = roomState.players.find(p => p.user._id !== user?._id);
    const isMyTurn = roomState.gameState.turn === user?._id;

    const isTournamentGame = roomId?.startsWith('tourney-');
    const gameInfo = getGameIcon(gameType);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.backgroundElements}>
                <div className={styles.gradientOrb1}></div>
                <div className={styles.gradientOrb2}></div>
                <div className={styles.gradientOrb3}></div>
            </div>

            <div className={styles.pageHeader}>
                <button onClick={handleLeaveGame} className={styles.backButton}>
                    ← {isTournamentGame ? 'Back to Tournament' : 'Back to Lobby'}
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
                        <h1 className={styles.gameTitle}>{formatGameName(gameType)}</h1>
                        <div className={styles.gameSubtitle}>
                            {isTournamentGame ? 'Tournament Match' : 'Casual Game'}
                        </div>
                        {roomState?.isPrivate && (
                            <div className={styles.privateRoomBadge}>
                                🔒 Private Room
                                <button
                                    onClick={toggleInvitationLink}
                                    className={styles.shareButton}
                                >
                                    {showInvitationLink ? 'Hide Link' : 'Share Link'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                {roomState?.isPrivate && showInvitationLink && (
                    <div className={styles.invitationSection}>
                        <p className={styles.invitationText}>
                            Share this link with your friend to join the private room:
                        </p>
                        <div className={styles.invitationBox}>
                            <input
                                type="text"
                                value={`https://platform.skillgame.pro/private-room/${roomState.invitationToken}`}
                                readOnly
                                className={styles.invitationInput}
                            />
                            <button
                                onClick={copyInvitationLink}
                                className={styles.copyButton}
                            >
                                📋 Copy
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.gameInfoCard}>
                <div className={styles.gameInfoGrid}>
                    <div className={styles.gameInfoItem}>
                        <div className={styles.gameInfoIcon}>👥</div>
                        <div className={styles.gameInfoContent}>
                            <span className={styles.gameInfoLabel}>Players</span>
                            <span className={styles.gameInfoValue}>{user?.username} vs {opponent?.user.username || 'Waiting...'}</span>
                        </div>
                    </div>
                    <div className={styles.gameInfoItem}>
                        <div className={styles.gameInfoIcon}>💰</div>
                        <div className={styles.gameInfoContent}>
                            <span className={styles.gameInfoLabel}>Bet</span>
                            <span className={styles.gameInfoValue}>${roomState.bet}</span>
                        </div>
                    </div>
                    <div className={styles.gameInfoItem}>
                        <div className={styles.gameInfoIcon}>🏆</div>
                        <div className={styles.gameInfoContent}>
                            <span className={styles.gameInfoLabel}>Prize</span>
                            <span className={styles.gameInfoValue}>${roomState.bet * 2}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.statusSection}>
                {isWaitingForOpponent ? (
                    <div className={styles.statusWaiting}>
                        <div className={styles.statusIcon}>⏰</div>
                        <h3 className={styles.statusTitle}>Waiting for Opponent</h3>
                        <p className={styles.statusDescription}>
                            Auto-cancel in: <span className={styles.countdown}>{countdown}s</span>
                        </p>
                    </div>
                ) : !gameMessage ? (
                    <div className={`${styles.statusActive} ${isMyTurn ? styles.myTurn : styles.opponentTurn}`}>
                        <h3 className={styles.statusTitle}>
                            {isMyTurn ? '✅ Your Turn' : '⏳ Opponent\'s Turn'}
                        </h3>
                        <p className={styles.statusDescription}>
                            {isMyTurn ? 'Make your move' : 'Waiting for opponent\'s move'}
                        </p>
                    </div>
                ) : (
                    <div className={styles.statusCompleted}>
                        <h3 className={styles.statusTitle}>🎮 Game Completed</h3>
                        <p className={styles.statusDescription}>Check the result in the modal</p>
                    </div>
                )}
            </div>

            <div className={styles.gameBoard}>
                {renderGameBoard()}
            </div>

            {!gameMessage && (
                <div className={styles.gameActions}>
                    <button onClick={handleLeaveGame} className={styles.surrenderButton}>
                        {isWaitingForOpponent ? '❌ Cancel Game' : '🏳️ Surrender'}
                    </button>
                </div>
            )}

            <ErrorModal
                isOpen={errorModal.isOpen}
                message={errorModal.message}
                onClose={closeErrorModal}
            />

            <GameResultModal
                isOpen={gameResultModal.isOpen}
                result={gameResultModal.result}
                opponentName={gameResultModal.opponentName}
                onClose={closeGameResultModal}
                onBackToLobby={handleBackToLobby}
                countdown={redirectCountdown}
            />
        </div>
    );
};

export default GamePage;