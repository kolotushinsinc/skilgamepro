import React, { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';
import styles from './BingoBoard.module.css';
import { useMoveTimer } from '../../hooks/useMoveTimer';
import MoveTimer from './MoveTimer';
import TimeoutWarningModal from '../modals/TimeoutWarningModal';
import { useSocket } from '../../context/SocketContext';

interface BingoCard {
    B: number[];
    I: number[];
    N: number[];
    G: number[];
    O: number[];
}

interface BingoGameState {
    currentPlayer: number;
    players: {
        card: BingoCard;
        markedNumbers: Set<number> | number[] | null | undefined;
        hasWon: boolean;
    }[];
    calledNumbers: number[];
    currentNumber: number | null;
    gamePhase: 'WAITING' | 'CALLING' | 'MARKING' | 'FINISHED';
    winner: number | null;
    turn: string;
    numberPool: number[];
    callHistory: { number: number; timestamp: number }[];
}

interface BingoBoardProps {
    gameState: BingoGameState;
    onMove: (move: any) => void;
    isMyTurn: boolean;
    isGameFinished: boolean;
    myPlayerIndex: 0 | 1;
    onTimeout?: () => void; // Called when player times out
    currentPlayerId?: string; // Current player's ID for timer synchronization
    myPlayerId?: string; // My player ID
    hasOpponent?: boolean; // Whether there are 2 players in the game
    onGameTimeout?: (data: any) => void; // Handle server timeout event
}

const BingoBoard: React.FC<BingoBoardProps> = ({
    gameState,
    onMove,
    isMyTurn,
    isGameFinished,
    myPlayerIndex,
    onTimeout,
    currentPlayerId,
    myPlayerId,
    hasOpponent,
    onGameTimeout
}) => {
    const [animatingNumber, setAnimatingNumber] = useState<number | null>(null);
    const [recentlyMarked, setRecentlyMarked] = useState<number | null>(null);
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

    // Game is considered started when there are 2 players and game is not finished
    const isGameStarted = !isGameFinished && gameState && gameState.players && gameState.players.length >= 2 && (hasOpponent || false);

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

    const handleModalClose = useCallback(() => {
        // Don't allow closing modal during warning period
    }, []);

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

    useEffect(() => {
        if (gameState.currentNumber && gameState.currentNumber !== animatingNumber) {
            setAnimatingNumber(gameState.currentNumber);
            setTimeout(() => setAnimatingNumber(null), 2000);
        }
    }, [gameState.currentNumber]);

    const handleCallNumber = () => {
        if (gameState.gamePhase !== 'CALLING' || isGameFinished) return;
        onMove({ type: 'CALL_NUMBER' });
        timer.resetTimer(); // Reset timer after move
    };

    const handleMarkNumber = (number: number) => {
        if (gameState.gamePhase !== 'MARKING' || isGameFinished) return;
        if (!gameState.calledNumbers.includes(number)) return;
        
        const myPlayer = gameState.players?.[myPlayerIndex];
        if (!myPlayer?.card) return;
        
        const hasNumber = isNumberOnCard(myPlayer.card, number);
        if (!hasNumber) return;

        // Check if number is already marked
        let markedSet: Set<number>;
        if (myPlayer.markedNumbers instanceof Set) {
            markedSet = myPlayer.markedNumbers;
        } else if (Array.isArray(myPlayer.markedNumbers)) {
            markedSet = new Set(myPlayer.markedNumbers);
        } else {
            markedSet = new Set();
        }
        
        if (markedSet.has(number)) return; // Already marked

        setRecentlyMarked(number);
        setTimeout(() => setRecentlyMarked(null), 1000);
        
        onMove({ type: 'MARK_NUMBER', number });
        timer.resetTimer(); // Reset timer after move
    };

    const handleClaimBingo = () => {
        if (gameState.gamePhase !== 'MARKING' || isGameFinished) return;
        onMove({ type: 'CLAIM_BINGO' });
        timer.resetTimer(); // Reset timer after move
    };

    const handleContinueGame = () => {
        if (gameState.gamePhase !== 'MARKING' || isGameFinished) return;
        onMove({ type: 'CONTINUE_GAME' });
        timer.resetTimer(); // Reset timer after move
    };

    const isNumberOnCard = (card: BingoCard, number: number): boolean => {
        return (
            card.B.includes(number) ||
            card.I.includes(number) ||
            card.N.includes(number) ||
            card.G.includes(number) ||
            card.O.includes(number)
        );
    };

    const getNumberColumn = (number: number): string => {
        if (number >= 1 && number <= 15) return 'B';
        if (number >= 16 && number <= 30) return 'I';
        if (number >= 31 && number <= 45) return 'N';
        if (number >= 46 && number <= 60) return 'G';
        if (number >= 61 && number <= 75) return 'O';
        return '';
    };

    const renderBingoCard = (card: BingoCard, markedNumbers: Set<number> | number[] | null | undefined, isMyCard: boolean) => {
        const columns = [
            { letter: 'B', numbers: card.B },
            { letter: 'I', numbers: card.I },
            { letter: 'N', numbers: card.N },
            { letter: 'G', numbers: card.G },
            { letter: 'O', numbers: card.O }
        ];

        return (
            <div className={`${styles.bingoCard} ${isMyCard ? styles.myCard : styles.opponentCard}`}>
                <div className={styles.cardHeader}>
                    {columns.map(col => (
                        <div key={col.letter} className={styles.columnHeader}>
                            {col.letter}
                        </div>
                    ))}
                </div>
                <div className={styles.cardGrid}>
                    {[0, 1, 2, 3, 4].map(row => (
                        <div key={row} className={styles.cardRow}>
                            {columns.map((col, colIndex) => {
                                const number = col.numbers[row];
                                let markedSet: Set<number>;
                                
                                if (markedNumbers instanceof Set) {
                                    markedSet = markedNumbers;
                                } else if (Array.isArray(markedNumbers)) {
                                    markedSet = new Set(markedNumbers);
                                } else {
                                    markedSet = new Set();
                                }
                                
                                const isMarked = markedSet.has(number) || (colIndex === 2 && row === 2 && number === 0);
                                const isFreeSpace = colIndex === 2 && row === 2 && number === 0;
                                const isClickable = isMyCard && gameState.gamePhase === 'MARKING' && gameState.calledNumbers.includes(number) && !isMarked && !isFreeSpace;
                                const isRecentlyMarked = recentlyMarked === number;
                                
                                return (
                                    <div
                                        key={`${col.letter}-${row}`}
                                        className={`${styles.cardCell} 
                                            ${isMarked ? styles.marked : ''} 
                                            ${isFreeSpace ? styles.freeSpace : ''}
                                            ${isClickable ? styles.clickable : ''}
                                            ${isRecentlyMarked ? styles.recentlyMarked : ''}
                                        `}
                                        onClick={() => !isFreeSpace && isClickable && handleMarkNumber(number)}
                                    >
                                        {isFreeSpace ? 'FREE' : number}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const getPhaseMessage = (): string => {
        if (isGameFinished) return 'Game Finished';
        
        switch (gameState.gamePhase) {
            case 'CALLING':
                return 'Click to call the next number!';
            case 'MARKING':
                return 'Mark your numbers or claim BINGO!';
            default:
                return 'Waiting for game to start...';
        }
    };

    const myCard = gameState.players?.[myPlayerIndex];
    const opponentCard = gameState.players?.[myPlayerIndex === 0 ? 1 : 0];

    // Safety check - if no players data, show loading
    if (!myCard || !opponentCard) {
        return (
            <div className={styles.bingoBoard}>
                <LoadingSpinner text="Loading Bingo Game..." />
            </div>
        );
    }

    return (
        <div className={styles.bingoBoard}>
            {/* Current Number Display */}
            <div className={styles.numberDisplay}>
                <div className={styles.currentNumberContainer}>
                    {gameState.currentNumber && (
                        <div className={`${styles.currentNumber} ${animatingNumber ? styles.animating : ''}`}>
                            <div className={styles.numberColumn}>
                                {getNumberColumn(gameState.currentNumber)}
                            </div>
                            <div className={styles.numberValue}>
                                {gameState.currentNumber}
                            </div>
                        </div>
                    )}
                    {!gameState.currentNumber && (
                        <div className={styles.waitingForNumber}>
                            Waiting for number...
                        </div>
                    )}
                </div>
            </div>

            {/* Phase Message */}
            <div className={styles.phaseMessage}>
                {getPhaseMessage()}
            </div>

            {/* Timer */}
            {isMyTurn && !isGameFinished && (
                <div className={styles.timerContainer}>
                    <MoveTimer
                        timeLeft={timer.timeLeft}
                        isWarning={timer.isWarning}
                        isActive={timer.isActive}
                        progress={timer.progress}
                        className={styles.gameTimer}
                    />
                </div>
            )}

            {/* Bingo Cards */}
            <div className={styles.cardsContainer}>
                <div className={styles.cardSection}>
                    <h3>Your Card</h3>
                    {renderBingoCard(myCard.card, myCard.markedNumbers, true)}
                </div>
                
                <div className={styles.cardSection}>
                    <h3>Opponent's Card</h3>
                    {renderBingoCard(opponentCard.card, opponentCard.markedNumbers, false)}
                </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionsContainer}>
                {gameState.gamePhase === 'CALLING' && (
                    <button
                        className={`${styles.actionButton} ${styles.callButton}`}
                        onClick={handleCallNumber}
                        disabled={isGameFinished}
                    >
                        🎱 Call Number
                    </button>
                )}

                {gameState.gamePhase === 'MARKING' && (
                    <>
                        <button
                            className={`${styles.actionButton} ${styles.bingoButton}`}
                            onClick={handleClaimBingo}
                            disabled={isGameFinished}
                        >
                            🏆 BINGO!
                        </button>
                        <button
                            className={`${styles.actionButton} ${styles.callButton}`}
                            onClick={handleContinueGame}
                            disabled={isGameFinished}
                        >
                            ➡️ Continue
                        </button>
                    </>
                )}
            </div>

            {/* Called Numbers History */}
            <div className={styles.calledNumbers}>
                <h4>Called Numbers ({gameState.calledNumbers.length}/75)</h4>
                <div className={styles.numbersGrid}>
                    {gameState.calledNumbers.slice(-20).map((number, index) => (
                        <div 
                            key={number} 
                            className={`${styles.calledNumber} ${number === gameState.currentNumber ? styles.latest : ''}`}
                        >
                            {getNumberColumn(number)}-{number}
                        </div>
                    ))}
                </div>
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

export default BingoBoard;