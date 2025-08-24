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
    onTimeout?: () => void;
    currentPlayerId?: string;
    myPlayerId?: string;
    hasOpponent?: boolean;
    onGameTimeout?: (data: any) => void;
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
        setShowWarningModal(true);
    }, []);

    const handleMakeMove = useCallback(() => {
        setShowWarningModal(false);
    }, []);

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

    // Socket event handlers
    useEffect(() => {
        if (!socket) return;

        const handleMoveTimerStart = (data: { timeLimit: number; currentPlayerId: string; startTime: number }) => {
            if (data.currentPlayerId === myPlayerId) {
                timer.syncWithServer(data.startTime, data.timeLimit);
            }
        };

        const handleMoveTimerWarning = (data: { timeRemaining: number; currentPlayerId: string }) => {
            if (data.currentPlayerId === myPlayerId) {
                timer.showWarning();
            }
        };

        const handleMoveTimerTimeout = (data: { timedOutPlayerId: string }) => {
            if (data.timedOutPlayerId === myPlayerId) {
                setShowWarningModal(false);
                onTimeout?.();
            }
        };

        const handleGameTimeout = (data: any) => {
            setShowWarningModal(false);
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

    const getPlayerStats = useCallback((playerIndex: number) => {
        const player = gameState.players?.[playerIndex];
        if (!player) return { markedCount: 0, completedLines: 0, progress: 0, nearWinLines: 0, totalPossible: 25 };
        
        let markedSet: Set<number>;
        if (player.markedNumbers instanceof Set) {
            markedSet = player.markedNumbers;
        } else if (Array.isArray(player.markedNumbers)) {
            markedSet = new Set(player.markedNumbers);
        } else {
            markedSet = new Set();
        }
        
        const card = player.card;
        let completedLines = 0;
        let nearWinLines = 0; // Lines with 4/5 numbers
        
        // Check rows
        for (let row = 0; row < 5; row++) {
            const rowNumbers = [card.B[row], card.I[row], card.N[row], card.G[row], card.O[row]];
            const markedInRow = rowNumbers.filter(num => num === 0 || markedSet.has(num)).length;
            if (markedInRow === 5) completedLines++;
            else if (markedInRow === 4) nearWinLines++;
        }
        
        // Check columns
        const columns = [card.B, card.I, card.N, card.G, card.O];
        columns.forEach(column => {
            const markedInColumn = column.filter((num, idx) => num === 0 || markedSet.has(num)).length;
            if (markedInColumn === 5) completedLines++;
            else if (markedInColumn === 4) nearWinLines++;
        });
        
        // Check diagonals
        const diagonal1 = [card.B[0], card.I[1], card.N[2], card.G[3], card.O[4]];
        const diagonal2 = [card.B[4], card.I[3], card.N[2], card.G[1], card.O[0]];
        
        const diag1Marked = diagonal1.filter(num => num === 0 || markedSet.has(num)).length;
        const diag2Marked = diagonal2.filter(num => num === 0 || markedSet.has(num)).length;
        
        if (diag1Marked === 5) completedLines++;
        else if (diag1Marked === 4) nearWinLines++;
        
        if (diag2Marked === 5) completedLines++;
        else if (diag2Marked === 4) nearWinLines++;
        
        const progress = Math.min(completedLines * 12.5, 100); // 8 possible lines max
        const markedCount = markedSet.size;
        
        return { markedCount, completedLines, progress, nearWinLines, totalPossible: 25 };
    }, [gameState.players]);

    const handleCallNumber = () => {
        if (gameState.gamePhase !== 'CALLING' || isGameFinished) return;
        onMove({ type: 'CALL_NUMBER' });
        timer.resetTimer();
    };

    const handleMarkNumber = (number: number) => {
        if (gameState.gamePhase !== 'MARKING' || isGameFinished) return;
        if (!gameState.calledNumbers.includes(number)) return;
        
        const myPlayer = gameState.players?.[myPlayerIndex];
        if (!myPlayer?.card) return;
        
        const hasNumber = isNumberOnCard(myPlayer.card, number);
        if (!hasNumber) return;

        let markedSet: Set<number>;
        if (myPlayer.markedNumbers instanceof Set) {
            markedSet = myPlayer.markedNumbers;
        } else if (Array.isArray(myPlayer.markedNumbers)) {
            markedSet = new Set(myPlayer.markedNumbers);
        } else {
            markedSet = new Set();
        }
        
        if (markedSet.has(number)) return;

        setRecentlyMarked(number);
        setTimeout(() => setRecentlyMarked(null), 1000);
        
        onMove({ type: 'MARK_NUMBER', number });
        timer.resetTimer();
    };

    const handleClaimBingo = () => {
        if (gameState.gamePhase !== 'MARKING' || isGameFinished) return;
        onMove({ type: 'CLAIM_BINGO' });
        timer.resetTimer();
    };

    const handleContinueGame = () => {
        if (gameState.gamePhase !== 'MARKING' || isGameFinished) return;
        onMove({ type: 'CONTINUE_GAME' });
        timer.resetTimer();
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
                                
                                const isFreeSpace = colIndex === 2 && row === 2 && number === 0;
                                const isMarked = !isFreeSpace && markedSet.has(number);
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

    const myCard = gameState.players?.[myPlayerIndex];
    const opponentCard = gameState.players?.[myPlayerIndex === 0 ? 1 : 0];

    if (!myCard || !opponentCard) {
        return (
            <div className={styles.bingoBoard}>
                <LoadingSpinner text="Loading Bingo Game..." />
            </div>
        );
    }

    const myStats = getPlayerStats(myPlayerIndex);
    const opponentStats = getPlayerStats(myPlayerIndex === 0 ? 1 : 0);

    return (
        <div className={styles.bingoBoard}>
            <div className={styles.gameHeader}>
                <h1 className={styles.gameTitle}>🎯 BINGO</h1>
                <p className={styles.gameSubtitle}>Match Numbers & Win</p>
            </div>

            <div className={styles.playersInfo}>
                {/* My Player Card */}
                <div className={`${styles.playerCard} ${styles.myPlayer} ${
                    isMyTurn ? styles.currentPlayer : ''
                }`}>
                    <div className={styles.playerHeader}>
                        <div className={styles.playerIcon}>🎮</div>
                        <div className={styles.playerDetails}>
                            <h3>You</h3>
                            <div className={styles.playerStatus}>
                                {isMyTurn && !isGameFinished ? 'YOUR TURN' : 'WAITING'}
                            </div>
                        </div>
                    </div>

                    <div className={styles.playerStats}>
                        <div className={styles.statBlock}>
                            <div className={styles.statLabel}>Marked</div>
                            <div className={styles.statValue}>
                                {myCard.markedNumbers instanceof Set ? myCard.markedNumbers.size : 
                                 Array.isArray(myCard.markedNumbers) ? myCard.markedNumbers.length : 0}
                            </div>
                        </div>
                        <div className={styles.statBlock}>
                            <div className={styles.statLabel}>Lines</div>
                            <div className={styles.statValue}>{myStats.completedLines}/8</div>
                        </div>
                        <div className={styles.statBlock}>
                            <div className={styles.statLabel}>Close</div>
                            <div className={styles.statValue}>{myStats.nearWinLines}</div>
                        </div>
                    </div>

                    <div className={styles.progressSection}>
                        <div className={styles.progressLabel}>
                            <span>Progress</span>
                            <span>{Math.round(myStats.progress)}%</span>
                        </div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${myStats.progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Opponent Player Card */}
                <div className={`${styles.playerCard} ${styles.opponentPlayer} ${
                    !isMyTurn && !isGameFinished ? styles.currentPlayer : ''
                }`}>
                    <div className={styles.playerHeader}>
                        <div className={styles.playerIcon}>🤖</div>
                        <div className={styles.playerDetails}>
                            <h3>Opponent</h3>
                            <div className={styles.playerStatus}>
                                {!isMyTurn && !isGameFinished ? 'PLAYING' : 'WAITING'}
                            </div>
                        </div>
                    </div>

                    <div className={styles.playerStats}>
                        <div className={styles.statBlock}>
                            <div className={styles.statLabel}>Marked</div>
                            <div className={styles.statValue}>
                                {opponentCard.markedNumbers instanceof Set ? opponentCard.markedNumbers.size : 
                                 Array.isArray(opponentCard.markedNumbers) ? opponentCard.markedNumbers.length : 0}
                            </div>
                        </div>
                        <div className={styles.statBlock}>
                            <div className={styles.statLabel}>Lines</div>
                            <div className={styles.statValue}>{opponentStats.completedLines}/8</div>
                        </div>
                        <div className={styles.statBlock}>
                            <div className={styles.statLabel}>Close</div>
                            <div className={styles.statValue}>{opponentStats.nearWinLines}</div>
                        </div>
                    </div>

                    <div className={styles.progressSection}>
                        <div className={styles.progressLabel}>
                            <span>Progress</span>
                            <span>{Math.round(opponentStats.progress)}%</span>
                        </div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${opponentStats.progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Current Number Display with Timer */}
            <div className={styles.numberTimerContainer}>
                {/* Timer in same block - LEFT SIDE */}
                {isMyTurn && !isGameFinished && (
                    <div className={styles.timerInline}>
                        <MoveTimer
                            timeLeft={timer.timeLeft}
                            isWarning={timer.isWarning}
                            isActive={timer.isActive}
                            progress={timer.progress}
                            className={styles.gameTimer}
                        />
                    </div>
                )}
                
                <div className={styles.currentNumberContainer}>
                    {gameState.currentNumber ? (
                        <div className={`${styles.currentNumber} ${animatingNumber ? styles.animating : ''}`}>
                            <div className={styles.numberColumn}>
                                {getNumberColumn(gameState.currentNumber)}
                            </div>
                            <div className={styles.numberValue}>
                                {gameState.currentNumber}
                            </div>
                        </div>
                    ) : (
                        <div className={styles.waitingForNumber}>
                            Waiting for number...
                        </div>
                    )}
                </div>
            </div>

            {/* Game Actions */}
            <div className={styles.gameActions}>
                {gameState.gamePhase === 'MARKING' && (
                    <div className={styles.actionButtons}>
                        <button
                            className={`${styles.actionButton} ${styles.bingoButton}`}
                            onClick={handleClaimBingo}
                            disabled={isGameFinished}
                        >
                            🏆 BINGO!
                        </button>
                        {isMyTurn && (
                            <button
                                className={`${styles.actionButton} ${styles.continueButton}`}
                                onClick={handleContinueGame}
                                disabled={isGameFinished}
                            >
                                ➡️ Continue
                            </button>
                        )}
                    </div>
                )}
            </div>


            {/* Bingo Cards */}
            <div className={styles.cardsContainer}>
                <div className={styles.cardSection}>
                    <h3 className={styles.cardTitle}>Your Card</h3>
                    {renderBingoCard(myCard.card, myCard.markedNumbers, true)}
                </div>
                
                {/* Call Number Button between cards */}
                <div className={styles.centerActions}>
                    {gameState.gamePhase === 'CALLING' && isMyTurn && (
                        <button
                            className={`${styles.actionButton} ${styles.callButton}`}
                            onClick={handleCallNumber}
                            disabled={isGameFinished}
                        >
                            🎱 Call Next Number
                        </button>
                    )}
                </div>
                
                <div className={styles.cardSection}>
                    <h3 className={styles.cardTitle}>Opponent's Card</h3>
                    {renderBingoCard(opponentCard.card, opponentCard.markedNumbers, false)}
                </div>
            </div>

            {/* Called Numbers History */}
            <div className={styles.calledNumbers}>
                <h4>Recent Numbers ({gameState.calledNumbers.length}/75)</h4>
                <div className={styles.numbersGrid}>
                    {gameState.calledNumbers.slice(-15).map((number, index) => (
                        <div 
                            key={number} 
                            className={`${styles.calledNumber} ${number === gameState.currentNumber ? styles.latest : ''}`}
                        >
                            {getNumberColumn(number)}{number}
                        </div>
                    ))}
                </div>
            </div>

            {/* Game Status */}
            <div className={`${styles.gameStatus} ${
                isGameFinished ? styles.gameFinished : 
                isMyTurn ? styles.myTurn : styles.opponentTurn
            }`}>
                {isGameFinished ? (
                    <span>🏁 Game Finished</span>
                ) : gameState.gamePhase === 'CALLING' && isMyTurn ? (
                    <span>🎲 Your Turn - Call Number</span>
                ) : gameState.gamePhase === 'MARKING' ? (
                    <span>🎯 Mark Numbers on Your Card</span>
                ) : isMyTurn ? (
                    <span>🟢 Your Turn</span>
                ) : (
                    <span>🟡 Opponent's Turn</span>
                )}
            </div>

            <TimeoutWarningModal
                isOpen={showWarningModal}
                timeLeft={timer.isWarning ? timer.timeLeft : 10}
                onClose={() => {}}
                onMakeMove={handleMakeMove}
            />
        </div>
    );
};

export default BingoBoard;