import React from 'react';
import styles from './TicTacToeBoard.module.css';

interface TicTacToeBoardProps {
    board: ('X' | 'O' | null)[];
    onMove: (index: number) => void;
    isMyTurn: boolean;
    isGameFinished: boolean;
    winner?: 'X' | 'O' | 'draw' | null;
    winningLine?: number[] | null;
}

const TicTacToeBoard: React.FC<TicTacToeBoardProps> = ({
    board,
    onMove,
    isMyTurn,
    isGameFinished,
    winner,
    winningLine
}) => {
    const handleCellClick = (index: number) => {
        if (!isMyTurn || isGameFinished || board[index]) {
            return;
        }
        onMove(index);
    };

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
            <div className={getGameStatusClassName()}>
                {getGameStatusText()}
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
        </div>
    );
};

export default TicTacToeBoard;