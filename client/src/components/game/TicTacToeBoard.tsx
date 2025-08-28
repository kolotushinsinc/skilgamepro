import React, { useState, useCallback, useEffect } from 'react';
import styles from './TicTacToeBoard.module.css';
import { useMoveTimer } from '../../hooks/useMoveTimer';
import MoveTimer from './MoveTimer';
import TimeoutWarningModal from '../modals/TimeoutWarningModal';
import { useSocket } from '../../context/SocketContext';

interface TicTacToeBoardProps {
    board: ('X' | 'O' | null)[];
    onMove: (index: number) => void;
    isMyTurn: boolean;
    isGameFinished: boolean;
    winner?: 'X' | 'O' | 'draw' | null;
    winningLine?: number[] | null;
    onTimeout?: () => void; // Called when player times out
    currentPlayerId?: string; // Current player's ID for timer synchronization
    myPlayerId?: string; // My player ID
    hasOpponent?: boolean; // Whether there are 2 players in the game
    onGameTimeout?: (data: any) => void; // Handle server timeout event
}

const TicTacToeBoard: React.FC<TicTacToeBoardProps> = ({
    board,
    onMove,
    isMyTurn,
    isGameFinished,
    winner,
    winningLine,
    onTimeout,
    currentPlayerId,
    myPlayerId,
    hasOpponent,
    onGameTimeout
}) => {
    const [showWarningModal, setShowWarningModal] = useState(false);
    const { socket } = useSocket();

    const handleTimeout = useCallback(() => {
        setShowWarningModal(false);
        onTimeout?.();
    }, [onTimeout]);

    const handleWarning = useCallback(() => {
        console.log('[Timer] Client triggered warning - showing modal at exactly 10 seconds');
        setShowWarningModal(true);
        // Timer will be paused by the modal component
    }, []);

    const handleMakeMove = useCallback(() => {
        setShowWarningModal(false);
        // Timer will resume automatically when modal closes
    }, []);

    // Game is considered started when there are 2 players (opponent found) and game is not finished
    const isGameStarted = !isGameFinished && board && board.length > 0 && (hasOpponent || false);

    const timer = useMoveTimer({
        totalTime: 30,
        warningTime: 20,
        isMyTurn,
        isGameFinished,
        isGameStarted,
        hasOpponent: hasOpponent || false,
        onTimeout: handleTimeout,
        onWarning: handleWarning
    });

    // Socket event handlers for server-side timer synchronization
    useEffect(() => {
        if (!socket) return;

        const handleMoveTimerStart = (data: { timeLimit: number; currentPlayerId: string; startTime: number }) => {
            if (data.currentPlayerId === myPlayerId) {
                // Server started timer for my turn, sync with server time
                console.log('[Timer] Server timer started for my turn, syncing...', data);
                timer.syncWithServer(data.startTime, data.timeLimit);
            }
        };

        const handleMoveTimerWarning = (data: { timeRemaining: number; currentPlayerId: string }) => {
            if (data.currentPlayerId === myPlayerId) {
                // Server warning received - but modal will be shown by client timer at exactly 10 seconds
                console.log('[Timer] Server timer warning received - client timer will handle modal display');
                timer.showWarning();
                // Modal will be shown by client timer when timeLeft === 10
            }
        };

        const handleMoveTimerTimeout = (data: { timedOutPlayerId: string }) => {
            if (data.timedOutPlayerId === myPlayerId) {
                // I timed out on server
                console.log('[Timer] Server timeout - I timed out');
                setShowWarningModal(false);
                onTimeout?.();
            } else {
                // Opponent timed out
                console.log('[Timer] Server timeout - opponent timed out');
            }
        };

        const handleGameTimeout = (data: {
            timedOutPlayerId: string;
            timedOutPlayerName: string;
            winnerId: string;
            winnerName: string;
            message: string;
        }) => {
            console.log('[Timer] Game timeout event:', data);
            setShowWarningModal(false);
            
            // Call parent handler to show proper game result modal
            if (onGameTimeout) {
                onGameTimeout(data);
            }
        };

        socket.on('moveTimerStart', handleMoveTimerStart);
        socket.on('moveTimerWarning', handleMoveTimerWarning);
        socket.on('moveTimerTimeout', handleMoveTimerTimeout);
        socket.on('gameTimeout', handleGameTimeout);

        return () => {
            socket.off('moveTimerStart', handleMoveTimerStart);
            socket.off('moveTimerWarning', handleMoveTimerWarning);
            socket.off('moveTimerTimeout', handleMoveTimerTimeout);
            socket.off('gameTimeout', handleGameTimeout);
        };
    }, [socket, timer, myPlayerId, onTimeout]);

    const handleCellClick = (index: number) => {
        if (!isMyTurn || isGameFinished || board[index]) {
            return;
        }
        onMove(index);
        timer.resetTimer(); // Reset timer after move
    };

    const handleModalClose = useCallback(() => {
        // Don't allow closing modal during warning period
    }, []);

    const getCellClassName = (index: number, cell: 'X' | 'O' | null) => {
        const baseClasses = [styles.cell];
        
        if (cell === 'X') {
            baseClasses.push(styles.cellX);
        } else if (cell === 'O') {
            baseClasses.push(styles.cellO);
        } else {
            baseClasses.push(styles.cellEmpty);
        }
        
        if (!isMyTurn || isGameFinished || cell) {
            baseClasses.push(styles.cellDisabled);
        }
        
        if (winningLine && winningLine.includes(index)) {
            baseClasses.push(styles.winningCell);
        }
        
        return baseClasses.join(' ');
    };

    const getGameStatusText = () => {
        if (isGameFinished) {
            if (winner === 'draw') {
                return "It's a Draw!";
            } else if (winner) {
                return `Player ${winner} Wins!`;
            }
            return "Game Over";
        }
        
        // Don't reveal turn order when waiting for opponent
        if (!hasOpponent) {
            return "Waiting for Opponent";
        }
        
        return isMyTurn ? "Your Turn" : "Opponent's Turn";
    };

    const getGameStatusClassName = () => {
        const baseClasses = [styles.gameStatus];
        
        if (isGameFinished) {
            baseClasses.push(styles.gameFinished);
        } else if (isMyTurn) {
            baseClasses.push(styles.myTurn);
        } else {
            baseClasses.push(styles.opponentTurn);
        }
        
        return baseClasses.join(' ');
    };

    return (
        <div className={styles.boardContainer}>
            <div className={styles.gameHeader}>
                <div className={getGameStatusClassName()}>
                    {getGameStatusText()}
                </div>
                
                {isMyTurn && !isGameFinished && hasOpponent && (
                    <MoveTimer
                        timeLeft={timer.timeLeft}
                        isWarning={timer.isWarning}
                        isActive={timer.isActive}
                        progress={timer.progress}
                        className={styles.gameTimer}
                    />
                )}
            </div>
            
            <div className={styles.board}>
                {board.map((cell, index) => (
                    <button
                        key={index}
                        onClick={() => handleCellClick(index)}
                        className={getCellClassName(index, cell)}
                        disabled={!isMyTurn || isGameFinished || !!cell}
                        aria-label={`Cell ${index + 1}, ${cell ? `occupied by ${cell}` : 'empty'}`}
                    >
                        {cell}
                    </button>
                ))}
            </div>

            <TimeoutWarningModal
                isOpen={showWarningModal}
                timeLeft={timer.isWarning ? timer.timeLeft : 10}
                onClose={handleModalClose}
                onMakeMove={handleMakeMove}
            />
        </div>
    );
};

export default TicTacToeBoard;