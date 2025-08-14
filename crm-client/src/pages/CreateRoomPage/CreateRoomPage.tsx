import React, { useState } from 'react';
import { 
  Plus, 
  Gamepad2, 
  DollarSign, 
  Eye, 
  CheckCircle, 
  XCircle,
  Hash,
  Users,
  Trophy,
  Target,
  Crown,
  Zap
} from 'lucide-react';
import { createAdminRoom } from '../../services/adminService';
import styles from './CreateRoomPage.module.css';

const CreateRoomPage: React.FC = () => {
    const [gameType, setGameType] = useState('tic-tac-toe');
    const [bet, setBet] = useState(50);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const gameOptions = [
        { value: 'tic-tac-toe', label: 'Tic-Tac-Toe', icon: Hash },
        { value: 'checkers', label: 'Checkers', icon: Target },
        { value: 'chess', label: 'Chess', icon: Crown },
        { value: 'backgammon', label: 'Backgammon', icon: Zap },
    ];

    const selectedGame = gameOptions.find(game => game.value === gameType);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setIsSubmitting(true);
        
        try {
            const data = await createAdminRoom({ gameType, bet });
            setMessage(`Success! Room created with ID: ${data.room.id}`);
            
            // Reset form after successful creation
            setTimeout(() => {
                setGameType('tic-tac-toe');
                setBet(50);
                setMessage('');
            }, 3000);
        } catch (error: any) {
            setMessage(`Error: ${error.response?.data?.message || 'Something went wrong'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getGameIcon = (gameType: string) => {
        const game = gameOptions.find(g => g.value === gameType);
        return game ? game.icon : Hash;
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>
                    <Plus className={styles.titleIcon} />
                    Create Gaming Room
                </h1>
                <p className={styles.subtitle}>
                    Create a new gaming room in the lobby for players to join and compete
                </p>
            </div>

            <div className={styles.content}>
                {/* Main Form Card */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>
                            <Gamepad2 className={styles.cardIcon} />
                            Room Configuration
                        </h2>
                        <p className={styles.cardSubtitle}>
                            Configure the game type and betting amount for the new room
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                <Gamepad2 className={styles.labelIcon} />
                                Game Type
                            </label>
                            <select 
                                value={gameType} 
                                onChange={e => setGameType(e.target.value)} 
                                className={styles.formSelect}
                                disabled={isSubmitting}
                            >
                                {gameOptions.map(game => (
                                    <option key={game.value} value={game.value}>
                                        {game.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                <DollarSign className={styles.labelIcon} />
                                Bet Amount ($)
                            </label>
                            <input 
                                type="number" 
                                value={bet} 
                                onChange={e => setBet(Number(e.target.value))} 
                                min="1" 
                                max="10000"
                                step="1"
                                className={styles.formInput}
                                placeholder="Enter bet amount"
                                disabled={isSubmitting}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className={styles.formButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className={styles.buttonIcon} style={{
                                        width: '1rem',
                                        height: '1rem',
                                        border: '2px solid transparent',
                                        borderTop: '2px solid currentColor',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }} />
                                    Creating Room...
                                </>
                            ) : (
                                <>
                                    <Plus className={styles.buttonIcon} />
                                    Create Room
                                </>
                            )}
                        </button>

                        {message && (
                            <div className={`${styles.message} ${message.startsWith('Error') ? styles.error : styles.success}`}>
                                {message.startsWith('Error') ? (
                                    <XCircle className={styles.messageIcon} />
                                ) : (
                                    <CheckCircle className={styles.messageIcon} />
                                )}
                                {message}
                            </div>
                        )}
                    </form>
                </div>

                {/* Preview Card */}
                <div className={styles.previewCard}>
                    <div className={styles.previewHeader}>
                        <Eye className={styles.previewIcon} />
                        <h3 className={styles.previewTitle}>Room Preview</h3>
                    </div>

                    <div className={styles.previewContent}>
                        {React.createElement(getGameIcon(gameType), { 
                            className: styles.gameIcon 
                        })}

                        <div className={styles.previewItem}>
                            <span className={styles.previewLabel}>Game Type:</span>
                            <span className={styles.previewValue}>
                                {selectedGame?.label || 'Unknown'}
                            </span>
                        </div>

                        <div className={styles.previewItem}>
                            <span className={styles.previewLabel}>Bet Amount:</span>
                            <span className={styles.previewValue}>${bet}</span>
                        </div>

                        <div className={styles.previewItem}>
                            <span className={styles.previewLabel}>Max Players:</span>
                            <span className={styles.previewValue}>2</span>
                        </div>

                        <div className={styles.previewItem}>
                            <span className={styles.previewLabel}>Room Type:</span>
                            <span className={styles.previewValue}>Admin Created</span>
                        </div>

                        <div className={styles.previewItem}>
                            <span className={styles.previewLabel}>Status:</span>
                            <span className={styles.previewValue} style={{ color: '#10b981' }}>
                                Ready to Join
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRoomPage;