import React, { useState, useEffect, useRef } from 'react';
import {
    Trophy,
    X,
    Hash,
    Target,
    Crown,
    Zap,
    Circle,
    Dice6,
    Square,
    Spade,
    ChevronDown,
    CheckCircle,
    Users,
    DollarSign,
    Calendar
} from 'lucide-react';
import type { IUpdateTournamentData, ITournament } from '../../services/adminService';
import styles from './EditTournamentModal.module.css';

interface EditTournamentModalProps {
    tournament: ITournament | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (tournamentId: string, tournamentData: IUpdateTournamentData) => void;
}

const EditTournamentModal: React.FC<EditTournamentModalProps> = ({ tournament, isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [gameType, setGameType] = useState('chess');
    const [entryFee, setEntryFee] = useState(0);
    const [maxPlayers, setMaxPlayers] = useState(8);
    const [startTime, setStartTime] = useState('');
    const [isGameTypeDropdownOpen, setIsGameTypeDropdownOpen] = useState(false);
    const [isMaxPlayersDropdownOpen, setIsMaxPlayersDropdownOpen] = useState(false);
    
    const gameTypeSelectRef = useRef<HTMLDivElement>(null);
    const maxPlayersSelectRef = useRef<HTMLDivElement>(null);

    const gameOptions = [
        { value: 'tic-tac-toe', label: 'Tic-Tac-Toe', icon: Hash },
        { value: 'checkers', label: 'Checkers', icon: Target },
        { value: 'chess', label: 'Chess', icon: Crown },
        { value: 'backgammon', label: 'Backgammon', icon: Zap },
        { value: 'bingo', label: 'Bingo', icon: Circle },
        { value: 'dice', label: 'Dice', icon: Dice6 },
        { value: 'domino', label: 'Domino', icon: Square },
        { value: 'durak', label: 'Durak', icon: Spade },
    ];

    const maxPlayersOptions = [
        { value: 4, label: '4 players' },
        { value: 8, label: '8 players' },
        { value: 16, label: '16 players' },
        { value: 32, label: '32 players' },
    ];

    useEffect(() => {
        if (tournament) {
            setName(tournament.name || '');
            setGameType(tournament.gameType || 'chess');
            setEntryFee(tournament.entryFee || 0);
            setMaxPlayers(tournament.maxPlayers || 8);
            
            // Безопасная обработка даты
            try {
                const date = new Date(tournament.startTime);
                if (!isNaN(date.getTime())) {
                    setStartTime(date.toISOString().slice(0, 16));
                } else {
                    setStartTime('');
                }
            } catch (error) {
                setStartTime('');
            }
        }
    }, [tournament]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (gameTypeSelectRef.current && !gameTypeSelectRef.current.contains(event.target as Node)) {
                setIsGameTypeDropdownOpen(false);
            }
            if (maxPlayersSelectRef.current && !maxPlayersSelectRef.current.contains(event.target as Node)) {
                setIsMaxPlayersDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!isOpen || !tournament) return null;

    const selectedGame = gameOptions.find(game => game.value === gameType);
    const selectedMaxPlayers = maxPlayersOptions.find(option => option.value === maxPlayers);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(tournament._id, {
            name,
            gameType,
            entryFee,
            maxPlayers,
            startTime
        });
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.titleSection}>
                        <Trophy className={styles.modalIcon} />
                        <h2>Edit Tournament</h2>
                    </div>
                    <button onClick={onClose} className={styles.closeButton}>
                        <X size={18} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                <Trophy size={16} />
                                Tournament Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className={styles.formInput}
                                placeholder="Enter tournament name"
                                required
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    <Crown size={16} />
                                    Game Type
                                </label>
                                <div className={styles.customSelect} ref={gameTypeSelectRef}>
                                    <div
                                        className={`${styles.selectTrigger} ${isGameTypeDropdownOpen ? styles.selectTriggerOpen : ''}`}
                                        onClick={() => setIsGameTypeDropdownOpen(!isGameTypeDropdownOpen)}
                                    >
                                        <div className={styles.selectedGame}>
                                            {React.createElement(selectedGame?.icon || Hash, {
                                                className: styles.gameTypeIcon
                                            })}
                                            <span>{selectedGame?.label || 'Select Game'}</span>
                                        </div>
                                        <ChevronDown
                                            className={`${styles.chevronIcon} ${isGameTypeDropdownOpen ? styles.chevronIconOpen : ''}`}
                                        />
                                    </div>
                                    
                                    {isGameTypeDropdownOpen && (
                                        <div className={styles.selectDropdown}>
                                            {gameOptions.map(game => (
                                                <div
                                                    key={game.value}
                                                    className={`${styles.selectOption} ${gameType === game.value ? styles.selectOptionSelected : ''}`}
                                                    onClick={() => {
                                                        setGameType(game.value);
                                                        setIsGameTypeDropdownOpen(false);
                                                    }}
                                                >
                                                    {React.createElement(game.icon, {
                                                        className: styles.gameTypeIcon
                                                    })}
                                                    <span>{game.label}</span>
                                                    {gameType === game.value && (
                                                        <CheckCircle className={styles.checkIcon} />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    <DollarSign size={16} />
                                    Entry Fee ($)
                                </label>
                                <input
                                    type="number"
                                    value={entryFee}
                                    onChange={e => setEntryFee(Number(e.target.value))}
                                    min="0"
                                    className={styles.formInput}
                                    placeholder="Enter entry fee"
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    <Users size={16} />
                                    Max Players
                                </label>
                                <div className={styles.customSelect} ref={maxPlayersSelectRef}>
                                    <div
                                        className={`${styles.selectTrigger} ${isMaxPlayersDropdownOpen ? styles.selectTriggerOpen : ''}`}
                                        onClick={() => setIsMaxPlayersDropdownOpen(!isMaxPlayersDropdownOpen)}
                                    >
                                        <div className={styles.selectedGame}>
                                            <Users className={styles.gameTypeIcon} />
                                            <span>{selectedMaxPlayers?.label || 'Select Players'}</span>
                                        </div>
                                        <ChevronDown
                                            className={`${styles.chevronIcon} ${isMaxPlayersDropdownOpen ? styles.chevronIconOpen : ''}`}
                                        />
                                    </div>
                                    
                                    {isMaxPlayersDropdownOpen && (
                                        <div className={styles.selectDropdown}>
                                            {maxPlayersOptions.map(option => (
                                                <div
                                                    key={option.value}
                                                    className={`${styles.selectOption} ${maxPlayers === option.value ? styles.selectOptionSelected : ''}`}
                                                    onClick={() => {
                                                        setMaxPlayers(option.value);
                                                        setIsMaxPlayersDropdownOpen(false);
                                                    }}
                                                >
                                                    <Users className={styles.gameTypeIcon} />
                                                    <span>{option.label}</span>
                                                    {maxPlayers === option.value && (
                                                        <CheckCircle className={styles.checkIcon} />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    <Calendar size={16} />
                                    Start Time
                                </label>
                                <input
                                    type="datetime-local"
                                    value={startTime}
                                    onChange={e => setStartTime(e.target.value)}
                                    className={styles.formInput}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" onClick={onClose} className={`${styles.btn} ${styles.btnSecondary}`}>
                            Cancel
                        </button>
                        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTournamentModal;