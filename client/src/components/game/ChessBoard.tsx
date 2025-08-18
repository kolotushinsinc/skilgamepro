import React, { useState, useCallback, useEffect } from 'react';
import styles from './ChessBoard.module.css';
import { useMoveTimer } from '../../hooks/useMoveTimer';
import MoveTimer from './MoveTimer';
import TimeoutWarningModal from '../modals/TimeoutWarningModal';
import { useSocket } from '../../context/SocketContext';

// Types for chess
type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
type PieceColor = 'white' | 'black';

interface ChessPiece {
    type: PieceType;
    color: PieceColor;
    hasMoved?: boolean;
}

interface Position {
    row: number;
    col: number;
}

type ChessBoard = (ChessPiece | null)[][];

// Type for move
type ChessMove = {
    from: Position;
    to: Position;
    promotion?: string;
};

function getBasicPossibleMoves(board: ChessBoard, from: Position, piece: ChessPiece): Position[] {
    const moves: Position[] = [];
    const { row, col } = from;

    const isValidPos = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;
    
    const canMoveTo = (r: number, c: number) => {
        if (!isValidPos(r, c)) return false;
        const targetPiece = board[r][c];
        return !targetPiece || targetPiece.color !== piece.color;
    };

    switch (piece.type) {
        case 'pawn': {
            const direction = piece.color === 'white' ? -1 : 1;
            const startRow = piece.color === 'white' ? 6 : 1;

            if (isValidPos(row + direction, col) && !board[row + direction][col]) {
                moves.push({ row: row + direction, col });
                
                if (row === startRow && !board[row + 2 * direction][col]) {
                    moves.push({ row: row + 2 * direction, col });
                }
            }

            if (canMoveTo(row + direction, col - 1) && board[row + direction][col - 1]) {
                moves.push({ row: row + direction, col: col - 1 });
            }
            if (canMoveTo(row + direction, col + 1) && board[row + direction][col + 1]) {
                moves.push({ row: row + direction, col: col + 1 });
            }
            break;
        }

        case 'rook': {
            const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
            for (const [dr, dc] of directions) {
                for (let i = 1; i < 8; i++) {
                    const newRow = row + dr * i;
                    const newCol = col + dc * i;
                    
                    if (!isValidPos(newRow, newCol)) break;
                    
                    const targetPiece = board[newRow][newCol];
                    if (!targetPiece) {
                        moves.push({ row: newRow, col: newCol });
                    } else {
                        if (targetPiece.color !== piece.color) {
                            moves.push({ row: newRow, col: newCol });
                        }
                        break;
                    }
                }
            }
            break;
        }

        case 'bishop': {
            const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
            for (const [dr, dc] of directions) {
                for (let i = 1; i < 8; i++) {
                    const newRow = row + dr * i;
                    const newCol = col + dc * i;
                    
                    if (!isValidPos(newRow, newCol)) break;
                    
                    const targetPiece = board[newRow][newCol];
                    if (!targetPiece) {
                        moves.push({ row: newRow, col: newCol });
                    } else {
                        if (targetPiece.color !== piece.color) {
                            moves.push({ row: newRow, col: newCol });
                        }
                        break;
                    }
                }
            }
            break;
        }

        case 'queen': {
            const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
            for (const [dr, dc] of directions) {
                for (let i = 1; i < 8; i++) {
                    const newRow = row + dr * i;
                    const newCol = col + dc * i;
                    
                    if (!isValidPos(newRow, newCol)) break;
                    
                    const targetPiece = board[newRow][newCol];
                    if (!targetPiece) {
                        moves.push({ row: newRow, col: newCol });
                    } else {
                        if (targetPiece.color !== piece.color) {
                            moves.push({ row: newRow, col: newCol });
                        }
                        break;
                    }
                }
            }
            break;
        }

        case 'knight': {
            const knightMoves = [
                [-2, -1], [-2, 1], [-1, -2], [-1, 2],
                [1, -2], [1, 2], [2, -1], [2, 1]
            ];
            for (const [dr, dc] of knightMoves) {
                const newRow = row + dr;
                const newCol = col + dc;
                if (canMoveTo(newRow, newCol)) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
            break;
        }

        case 'king': {
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],           [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
                if (canMoveTo(newRow, newCol)) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
            break;
        }
    }

    return moves;
}

interface ChessBoardProps {
    gameState: {
        board: ChessBoard;
        currentPlayer: PieceColor;
        moveHistory?: any[];
        moveCount?: number;
        lastMove?: {
            from: Position;
            to: Position;
        };
    };
    onMove: (move: ChessMove) => void;
    isMyTurn: boolean;
    isGameFinished: boolean;
    myPlayerIndex: 0 | 1;
    onTimeout?: () => void; // Called when player times out
    currentPlayerId?: string; // Current player's ID for timer synchronization
    myPlayerId?: string; // My player ID
    hasOpponent?: boolean; // Whether there are 2 players in the game
    onGameTimeout?: (data: any) => void; // Handle server timeout event
}

function isKingInCheck(board: ChessBoard, color: PieceColor): boolean {
    let kingPos: Position | null = null;
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece && piece.type === 'king' && piece.color === color) {
                kingPos = { row, col };
                break;
            }
        }
        if (kingPos) break;
    }
    
    if (!kingPos) return false;
    
    const opponentColor = color === 'white' ? 'black' : 'white';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece && piece.color === opponentColor) {
                const moves = getBasicPossibleMoves(board, { row, col }, piece);
                if (moves.some(move => move.row === kingPos!.row && move.col === kingPos!.col)) {
                    return true;
                }
            }
        }
    }
    
    return false;
}

const PIECE_SYMBOLS: Record<PieceColor, Record<PieceType, string>> = {
    white: {
        king: '♔',
        queen: '♕',
        rook: '♖',
        bishop: '♗',
        knight: '♘',
        pawn: '♙'
    },
    black: {
        king: '♚',
        queen: '♛',
        rook: '♜',
        bishop: '♝',
        knight: '♞',
        pawn: '♟'
    }
};

const ChessBoard: React.FC<ChessBoardProps> = ({
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
    const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);
    const [promotionMove, setPromotionMove] = useState<ChessMove | null>(null);
    const [draggedPiece, setDraggedPiece] = useState<{
        piece: ChessPiece;
        from: Position;
        mousePos: { x: number; y: number };
    } | null>(null);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const { socket } = useSocket();

    const myColor: PieceColor = myPlayerIndex === 0 ? 'white' : 'black';
    const isInCheck = isKingInCheck(gameState.board, myColor);
    const opponentColor: PieceColor = myColor === 'white' ? 'black' : 'white';
    const isOpponentInCheck = isKingInCheck(gameState.board, opponentColor);

    console.log('[ChessBoard] Render:', {
        isMyTurn,
        isGameFinished,
        myPlayerIndex,
        currentPlayer: gameState.currentPlayer,
        boardSize: gameState.board?.length
    });

    const isFlipped = myPlayerIndex === 1;

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
    const isGameStarted = !isGameFinished && gameState.board && gameState.board.length > 0 && (hasOpponent || false);

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

    const getPossibleMovesForPiece = useCallback((from: Position): Position[] => {
        const piece = gameState.board[from.row][from.col];
        if (!piece) return [];
        
        return getBasicPossibleMoves(gameState.board, from, piece);
    }, [gameState.board]);

    const onSquareClick = useCallback((row: number, col: number) => {
        const position = { row, col };
        console.log('[ChessBoard] Square clicked:', position, { isMyTurn, isGameFinished });
        
        if (!isMyTurn || isGameFinished) {
            console.log('[ChessBoard] Click ignored - not my turn or game finished');
            return;
        }

        if (selectedSquare) {
            console.log('[ChessBoard] Attempting move from', selectedSquare, 'to', position);
            
            if (selectedSquare.row === row && selectedSquare.col === col) {
                console.log('[ChessBoard] Deselecting piece');
                setSelectedSquare(null);
                setPossibleMoves([]);
                return;
            }

            const isValidMove = possibleMoves.some(move => 
                move.row === row && move.col === col
            );

            if (isValidMove) {
                const move: ChessMove = {
                    from: selectedSquare,
                    to: position,
                };

                const piece = gameState.board[selectedSquare.row][selectedSquare.col];
                if (piece && piece.type === 'pawn' && 
                    ((piece.color === 'white' && row === 0) || 
                     (piece.color === 'black' && row === 7))) {
                    setPromotionMove(move);
                    return;
                }

                console.log('[ChessBoard] Sending move:', move);
                onMove(move);
                setSelectedSquare(null);
                setPossibleMoves([]);
                timer.resetTimer(); // Reset timer after move
            } else {
                selectPiece(row, col);
            }
            return;
        }

        selectPiece(row, col);
    }, [isMyTurn, isGameFinished, selectedSquare, possibleMoves, gameState.board, onMove]);

    const selectPiece = useCallback((row: number, col: number) => {
        const piece = gameState.board[row][col];
        if (!piece) return;

        const myColor: PieceColor = myPlayerIndex === 0 ? 'white' : 'black';
        if (piece.color !== myColor) return;

        console.log('[ChessBoard] Selecting piece at', { row, col });
        setSelectedSquare({ row, col });
        
        const moves = getPossibleMovesForPiece({ row, col });
        setPossibleMoves(moves);
    }, [gameState.board, myPlayerIndex, getPossibleMovesForPiece]);

    const onMouseDown = useCallback((e: React.MouseEvent, row: number, col: number) => {
        if (!isMyTurn || isGameFinished) return;

        const piece = gameState.board[row][col];
        if (!piece) return;

        const myColor: PieceColor = myPlayerIndex === 0 ? 'white' : 'black';
        if (piece.color !== myColor) return;

        e.preventDefault();
        setDraggedPiece({
            piece,
            from: { row, col },
            mousePos: { x: e.clientX, y: e.clientY }
        });

        const moves = getPossibleMovesForPiece({ row, col });
        setPossibleMoves(moves);
    }, [isMyTurn, isGameFinished, gameState.board, myPlayerIndex, getPossibleMovesForPiece]);

    const onTouchStart = useCallback((e: React.TouchEvent, row: number, col: number) => {
        if (!isMyTurn || isGameFinished) return;

        const piece = gameState.board[row][col];
        if (!piece) return;

        const myColor: PieceColor = myPlayerIndex === 0 ? 'white' : 'black';
        if (piece.color !== myColor) return;

        e.preventDefault();
        const touch = e.touches[0];
        setDraggedPiece({
            piece,
            from: { row, col },
            mousePos: { x: touch.clientX, y: touch.clientY }
        });

        const moves = getPossibleMovesForPiece({ row, col });
        setPossibleMoves(moves);
    }, [isMyTurn, isGameFinished, gameState.board, myPlayerIndex, getPossibleMovesForPiece]);

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (draggedPiece) {
            setDraggedPiece(prev => prev ? {
                ...prev,
                mousePos: { x: e.clientX, y: e.clientY }
            } : null);
        }
    }, [draggedPiece]);

    const onTouchMove = useCallback((e: TouchEvent) => {
        if (draggedPiece) {
            e.preventDefault();
            const touch = e.touches[0];
            setDraggedPiece(prev => prev ? {
                ...prev,
                mousePos: { x: touch.clientX, y: touch.clientY }
            } : null);
        }
    }, [draggedPiece]);

    const onMouseUp = useCallback((e: MouseEvent) => {
        if (!draggedPiece) return;

        const boardElement = document.querySelector(`.${styles.boardGrid}`);
        if (boardElement) {
            const rect = boardElement.getBoundingClientRect();
            
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                setDraggedPiece(null);
                setPossibleMoves([]);
                return;
            }
            
            const squareSize = rect.width / 8;
            let col = Math.floor(x / squareSize);
            let row = Math.floor(y / squareSize);

            if (isFlipped) {
                row = 7 - row;
                col = 7 - col;
            }

            if (row >= 0 && row < 8 && col >= 0 && col < 8) {
                const isValidMove = possibleMoves.some(move =>
                    move.row === row && move.col === col
                );

                if (isValidMove) {
                    const move: ChessMove = {
                        from: draggedPiece.from,
                        to: { row, col },
                    };

                    if (draggedPiece.piece.type === 'pawn' &&
                        ((draggedPiece.piece.color === 'white' && row === 0) ||
                         (draggedPiece.piece.color === 'black' && row === 7))) {
                        setPromotionMove(move);
                    } else {
                        onMove(move);
                        timer.resetTimer(); // Reset timer after move
                    }
                }
            }
        }

        setDraggedPiece(null);
        setPossibleMoves([]);
    }, [draggedPiece, possibleMoves, isFlipped, onMove]);

    const onTouchEnd = useCallback((e: TouchEvent) => {
        if (!draggedPiece) return;

        e.preventDefault();
        const boardElement = document.querySelector(`.${styles.boardGrid}`);
        if (boardElement) {
            const rect = boardElement.getBoundingClientRect();
            
            const touch = e.changedTouches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                setDraggedPiece(null);
                setPossibleMoves([]);
                return;
            }
            
            const squareSize = rect.width / 8;
            let col = Math.floor(x / squareSize);
            let row = Math.floor(y / squareSize);

            if (isFlipped) {
                row = 7 - row;
                col = 7 - col;
            }

            if (row >= 0 && row < 8 && col >= 0 && col < 8) {
                const isValidMove = possibleMoves.some(move =>
                    move.row === row && move.col === col
                );

                if (isValidMove) {
                    const move: ChessMove = {
                        from: draggedPiece.from,
                        to: { row, col },
                    };

                    if (draggedPiece.piece.type === 'pawn' &&
                        ((draggedPiece.piece.color === 'white' && row === 0) ||
                         (draggedPiece.piece.color === 'black' && row === 7))) {
                        setPromotionMove(move);
                    } else {
                        onMove(move);
                        timer.resetTimer(); // Reset timer after move
                    }
                }
            }
        }

        setDraggedPiece(null);
        setPossibleMoves([]);
    }, [draggedPiece, possibleMoves, isFlipped, onMove]);

    useEffect(() => {
        if (draggedPiece) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('touchmove', onTouchMove, { passive: false });
            document.addEventListener('touchend', onTouchEnd, { passive: false });
            return () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
            };
        }
    }, [draggedPiece, onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

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

    const handlePromotion = useCallback((pieceType: PieceType) => {
        if (promotionMove) {
            onMove({
                ...promotionMove,
                promotion: pieceType
            });
            setPromotionMove(null);
        }
    }, [promotionMove, onMove]);

    const isSquareSelected = useCallback((row: number, col: number) => {
        return selectedSquare?.row === row && selectedSquare?.col === col;
    }, [selectedSquare]);

    const isSquarePossibleMove = useCallback((row: number, col: number) => {
        return possibleMoves.some(move => move.row === row && move.col === col);
    }, [possibleMoves]);

    const isSquareLastMove = useCallback((row: number, col: number) => {
        if (!gameState.lastMove) return false;
        return (gameState.lastMove.from.row === row && gameState.lastMove.from.col === col) ||
               (gameState.lastMove.to.row === row && gameState.lastMove.to.col === col);
    }, [gameState.lastMove]);

    const getSquareClass = useCallback((row: number, col: number) => {
        const isLight = (row + col) % 2 === 0;
        let className = isLight ? styles.lightSquare : styles.darkSquare;
        
        if (isSquareSelected(row, col)) {
            className += ` ${styles.selectedSquare}`;
        } else if (isSquarePossibleMove(row, col)) {
            className += ` ${styles.possibleMoveSquare}`;
        } else if (isSquareLastMove(row, col)) {
            className += ` ${styles.lastMoveSquare}`;
        }
        
        return className;
    }, [isSquareSelected, isSquarePossibleMove, isSquareLastMove]);

    const renderPiece = useCallback((piece: ChessPiece | null, row: number, col: number) => {
        if (!piece) return null;

        if (draggedPiece && 
            draggedPiece.from.row === row && 
            draggedPiece.from.col === col) {
            return null;
        }

        const pieceClass = `${styles.piece} ${piece.color === 'black' ? styles.blackPiece : styles.whitePiece}`;

        return (
            <div
                className={pieceClass}
                onMouseDown={(e) => onMouseDown(e, row, col)}
                onTouchStart={(e) => onTouchStart(e, row, col)}
                style={{ touchAction: 'none' }}
            >
                {PIECE_SYMBOLS[piece.color][piece.type]}
            </div>
        );
    }, [draggedPiece, onMouseDown, onTouchStart]);

    const renderBoard = () => {
        const squares = [];
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const displayRow = isFlipped ? 7 - row : row;
                const displayCol = isFlipped ? 7 - col : col;
                const piece = gameState.board[displayRow][displayCol];
                
                squares.push(
                    <div
                        key={`${row}-${col}`}
                        className={`${styles.square} ${getSquareClass(displayRow, displayCol)}`}
                        onClick={() => onSquareClick(displayRow, displayCol)}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            onSquareClick(displayRow, displayCol);
                        }}
                        style={{ touchAction: 'manipulation' }}
                    >
                        {renderPiece(piece, displayRow, displayCol)}
                        
                        {col === 0 && (
                            <div className={`${styles.coordinates} ${styles.rankCoordinate}`}>
                                {isFlipped ? row + 1 : 8 - row}
                            </div>
                        )}
                        {row === 7 && (
                            <div className={`${styles.coordinates} ${styles.fileCoordinate}`}>
                                {String.fromCharCode(97 + (isFlipped ? 7 - col : col))}
                            </div>
                        )}
                    </div>
                );
            }
        }
        
        return squares;
    };

    return (
        <div className={styles.chessBoard}>
            <div className={styles.gameHeader}>
                <div className={styles.playerInfo}>
                    <div className={styles.playerInfoItem}>
                        <span className={`${styles.colorIndicator} ${styles.whiteIndicator}`}></span>
                        White (moves first) - {myPlayerIndex === 0 ? 'You' : 'Opponent'}
                    </div>
                    <div className={styles.playerInfoItem}>
                        <span className={`${styles.colorIndicator} ${styles.blackIndicator}`}></span>
                        Black - {myPlayerIndex === 1 ? 'You' : 'Opponent'}
                    </div>
                    {gameState.moveCount !== undefined && (
                        <div className={styles.moveCounter}>
                            Move: {Math.floor(gameState.moveCount / 2) + 1}
                        </div>
                    )}
                </div>
                
                {isMyTurn && !isGameFinished && (
                    <MoveTimer
                        timeLeft={timer.timeLeft}
                        isWarning={timer.isWarning}
                        isActive={timer.isActive}
                        progress={timer.progress}
                        className={styles.gameTimer}
                    />
                )}
            </div>

            <div className={styles.boardContainer}>
                <div className={styles.boardGrid}>
                    {renderBoard()}
                </div>
            </div>
            
            {gameState.moveHistory && gameState.moveHistory.length > 0 && (
                <div className={styles.gameHistory}>
                    <strong>Move History:</strong> {gameState.moveHistory.map((move, index) => {
                        if (typeof move === 'string') {
                            return move;
                        } else if (move && typeof move === 'object' && move.from && move.to) {
                            const fromSquare = String.fromCharCode(97 + move.from.col) + (8 - move.from.row);
                            const toSquare = String.fromCharCode(97 + move.to.col) + (8 - move.to.row);
                            return `${fromSquare}-${toSquare}`;
                        }
                        return `Move ${index + 1}`;
                    }).join(', ')}
                </div>
            )}

            <div className={`${styles.gameStatus} ${
                isGameFinished ? styles.gameFinished : 
                isMyTurn ? styles.myTurn : styles.opponentTurn
            }`}>
                {isGameFinished ? (
                    <span>Game Finished</span>
                ) : isInCheck && isMyTurn ? (
                    <span style={{ color: '#ef4444' }}>⚠️ CHECK! Your Turn</span>
                ) : isOpponentInCheck && !isMyTurn ? (
                    <span style={{ color: '#ef4444' }}>⚠️ CHECK to Opponent! Opponent's Turn</span>
                ) : isMyTurn ? (
                    <span>🟢 Your Turn</span>
                ) : (
                    <span>🟡 Opponent's Turn</span>
                )}
            </div>

            {promotionMove && (
                <div className={styles.promotionModal}>
                    <div className={styles.promotionContent}>
                        <div className={styles.promotionTitle}>
                            Choose piece for promotion:
                        </div>
                        <div className={styles.promotionOptions}>
                            <div
                                className={styles.promotionOption}
                                onClick={() => handlePromotion('queen')}
                                title="Queen"
                            >
                                <div className={styles.promotionPiece}>
                                    {myColor === 'white' ? '♕' : '♛'}
                                </div>
                                <div className={styles.promotionLabel}>Queen</div>
                            </div>
                            <div
                                className={styles.promotionOption}
                                onClick={() => handlePromotion('rook')}
                                title="Rook"
                            >
                                <div className={styles.promotionPiece}>
                                    {myColor === 'white' ? '♖' : '♜'}
                                </div>
                                <div className={styles.promotionLabel}>Rook</div>
                            </div>
                            <div
                                className={styles.promotionOption}
                                onClick={() => handlePromotion('bishop')}
                                title="Bishop"
                            >
                                <div className={styles.promotionPiece}>
                                    {myColor === 'white' ? '♗' : '♝'}
                                </div>
                                <div className={styles.promotionLabel}>Bishop</div>
                            </div>
                            <div
                                className={styles.promotionOption}
                                onClick={() => handlePromotion('knight')}
                                title="Knight"
                            >
                                <div className={styles.promotionPiece}>
                                    {myColor === 'white' ? '♘' : '♞'}
                                </div>
                                <div className={styles.promotionLabel}>Knight</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {draggedPiece && (
                <div
                    className={`${styles.dragPreview} ${draggedPiece.piece.color === 'black' ? styles.blackPiece : styles.whitePiece}`}
                    style={{
                        left: draggedPiece.mousePos.x,
                        top: draggedPiece.mousePos.y
                    }}
                >
                    {PIECE_SYMBOLS[draggedPiece.piece.color][draggedPiece.piece.type]}
                </div>
            )}

            <TimeoutWarningModal
                isOpen={showWarningModal}
                timeLeft={timer.isWarning ? timer.timeLeft : 10}
                onClose={handleModalClose}
                onMakeMove={handleMakeMove}
            />
        </div>
    );
};

export default ChessBoard;