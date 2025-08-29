import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import { Star } from 'lucide-react';

const gamesData = [
    { name: 'Chess', image: 'https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=800', gameType: 'chess', status: 'Available', category: 'Strategy', tag: 'Advanced', avatar: 'C', rating: 4.9, difficulty: 'Difficult', players: '2 players', time: '30-60 min' },
    { name: 'Checkers', image: 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67a99e7d6bcf180eb89c36da_67a99e866bcf180eb89c3b0d/scale_1200', gameType: 'checkers', status: 'Available', category: 'Strategy', tag: 'Average', avatar: 'C', rating: 4.7, difficulty: 'Average', players: '2 players', time: '15-30 min' },
    { name: 'Backgammon', image: 'https://www.superbetinyeniadresi.net/wp-content/uploads/2020/10/Tavla-Oynanan-Bahis-Siteleri.jpg', gameType: 'backgammon', status: 'Available', category: 'Strategy', tag: 'Average', avatar: 'B', rating: 4.8, difficulty: 'Average', players: '2 players', time: '20-45 min' },
    { name: 'Bingo', image: 'https://avatars.mds.yandex.net/i?id=abe8723d93205892f919d0635deafded_l-5341604-images-thumbs&n=13', gameType: 'bingo', status: 'Available', category: 'Casual', tag: 'Easy', avatar: '🎱', rating: 4.8, difficulty: 'Easy', players: '2 players', time: '10-20 min' },
    { name: 'Domino', image: 'https://wallpapers.com/images/hd/domino-2858-x-2037-background-51j0j2sp58c1n3b1.jpg', gameType: 'domino', status: 'Available', category: 'Strategy', tag: 'Average', avatar: 'D', rating: 4.7, difficulty: 'Average', players: '2 players', time: '15-30 min' },
    { name: 'Durak', image: 'https://play-lh.googleusercontent.com/iExl3GyKHtppXeORDO5YshBcrFD7xc6BSvj4NTl5wT-Zq53LBM93Nyx6AfrRUQTP77A=w1024-h500', gameType: 'durak', status: 'Available', category: 'Strategy', tag: 'Average', avatar: 'D', rating: 4.6, difficulty: 'Average', players: '2 players', time: '10-25 min' },
    { name: 'Dice', image: 'https://i.pinimg.com/originals/18/fd/e1/18fde15323d44e0c2d6bcd23e6f2c93f.jpg', gameType: 'dice', status: 'Available', category: 'Casual', tag: 'Average', avatar: '🎲', rating: 4.6, difficulty: 'Average', players: '2 players', time: '10-20 min' },
    { name: 'Tic Tac Toe', image: 'https://media.printables.com/media/prints/996434/images/7583870_392cdefa-1c3e-4318-9225-1bc12ed72a34_47a94660-c70d-4554-8a25-288442c379ea/tictac-2_configuration_no-configuration.png', gameType: 'tic-tac-toe', status: 'Available', category: 'Casual', tag: 'Easy', avatar: 'T', rating: 4.5, difficulty: 'Easily', players: '2 players', time: '1-5 min' },
];

const GameCard: React.FC<{ game: typeof gamesData[0] }> = ({ game }) => (
    <div className={`${styles.gameCard} game-card`} data-testid="game-card">
            <img 
                  src={game.image} 
                  alt={game.avatar}
                  className={styles.cardImage}
                />
        <div className={styles.cardAvatar}>{game.avatar}</div>
        <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
                <div>
                    <h3 className={`${styles.gameTitle} game-title`} data-testid="game-title">{game.name}</h3>
                    <p>{game.category}</p>
                </div>
                <div className={styles.cardRating}>
                    <Star size={16} fill="currentColor" />
                    <span>{game.rating}</span>
                </div>
            </div>
            <div className={styles.cardTag}>{game.tag}</div>
            <div className={styles.cardInfo}>
                <div className={`${styles.gameInfo} entry-fee fee cost`}>
                    <span className="label">Entry Fee:</span>
                    <span className="value">Free</span>
                </div>
                <div className={`${styles.gameInfo} prize-pool prize winnings`}>
                    <span className="label">Prize Pool:</span>
                    <span className="value">$0</span>
                </div>
                <div className={`${styles.gameInfo} players participants slots`}>
                    <span className="label">Players:</span>
                    <span className="value">1/2 players</span>
                </div>
            </div>
            <Link to={`/lobby/${game.gameType}`} className={`${styles.cardButton} join-button join-game`} data-testid="join-game-button">
                ▷ Play now
            </Link>
        </div>
    </div>
);

const HomePage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(() => {
        const saved = localStorage.getItem('gamesCategory');
        return saved || 'All games';
    });
    const [feeFilter, setFeeFilter] = useState('$1-10');
    const [difficultyFilter, setDifficultyFilter] = useState('Medium');
    const [sortBy, setSortBy] = useState('Prize Pool');

    const filteredGames = useMemo(() => {
        let filtered = [...gamesData];

        // Search filter
        if (searchQuery.trim()) {
            filtered = filtered.filter(game =>
                game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                game.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Category filter
        if (categoryFilter !== 'All games') {
            filtered = filtered.filter(game => game.category === categoryFilter);
        }

        // Fee filter (structure for future paid games)
        if (feeFilter === '$1-10') {
            // filtered = filtered.filter(game => game.entryFee >= 1 && game.entryFee <= 10);
        } else if (feeFilter === '$11+') {
            // filtered = filtered.filter(game => game.entryFee >= 11);
        }

        // Player filter - all current games are 1v1, no filtering needed

        // Difficulty filter
        if (difficultyFilter !== 'Medium') {
            const difficultyMap: Record<string, string[]> = {
                'Easy': ['Easy', 'Easily'],
                'Medium': ['Average'],
                'Hard': ['Difficult', 'Advanced']
            };
            
            const allowedDifficulties = difficultyMap[difficultyFilter] || [];
            filtered = filtered.filter(game =>
                allowedDifficulties.includes(game.difficulty) ||
                allowedDifficulties.includes(game.tag)
            );
        }

        // Sorting
        switch (sortBy) {
            case 'Prize Pool':
                // Currently all have $0 prize pool
                break;
            case 'Entry Fee':
                // Currently all are free
                break;
            case 'Players':
                // All are 2 players currently
                break;
            case 'Difficulty':
                filtered.sort((a, b) => {
                    const difficultyOrder = ['Easy', 'Easily', 'Average', 'Advanced', 'Difficult'];
                    const aOrder = difficultyOrder.indexOf(a.difficulty) + difficultyOrder.indexOf(a.tag);
                    const bOrder = difficultyOrder.indexOf(b.difficulty) + difficultyOrder.indexOf(b.tag);
                    return aOrder - bOrder;
                });
                break;
            default:
                // Sort by rating as fallback
                filtered.sort((a, b) => b.rating - a.rating);
        }

        return filtered;
    }, [searchQuery, categoryFilter, feeFilter, difficultyFilter, sortBy]);

    const handleCategoryChange = (category: string) => {
        setCategoryFilter(category);
        localStorage.setItem('gamesCategory', category);
    };

    const handleRefresh = () => {
        // Reset all filters to default
        setSearchQuery('');
        setCategoryFilter('All games');
        setFeeFilter('$1-10');
        setDifficultyFilter('Medium');
        setSortBy('Prize Pool');
        localStorage.removeItem('gamesCategory');
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader} data-testid="page-header">
                <h1 className="games-header">🎮 Games</h1>
                <p>Select a game and start playing against other players!</p>
            </div>
            
            <div className={styles.searchContainer}>
                <input
                    type="search"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchBar}
                    data-testid="search-input"
                />
                <button
                    onClick={handleRefresh}
                    className={styles.refreshButton}
                    data-testid="refresh-games"
                >
                    🔄 Refresh
                </button>
            </div>
            
            <div className={styles.filtersContainer}>
                <div className={styles.filterGroup} data-testid="game-categories">
                    <span>Categories:</span>
                    <div className={styles.filterButtons}>
                        <button
                            onClick={() => handleCategoryChange('All games')}
                            className={`${styles.filterButton} ${categoryFilter === 'All games' ? styles.active : ''}`}
                        >
                            🎯 All games
                        </button>
                        <button
                            onClick={() => handleCategoryChange('Strategy')}
                            className={`${styles.filterButton} ${categoryFilter === 'Strategy' ? styles.active : ''}`}
                        >
                            🧠 Strategy
                        </button>
                        <button
                            onClick={() => handleCategoryChange('Casual')}
                            className={`${styles.filterButton} ${categoryFilter === 'Casual' ? styles.active : ''}`}
                        >
                            🎲 Casual
                        </button>
                    </div>
                </div>
                
                <div className={styles.filterGroup} data-testid="fee-filter">
                    <span>Entry Fee:</span>
                    <div className={styles.filterButtons}>
                        <button
                            onClick={() => setFeeFilter('$1-10')}
                            className={`${styles.filterButton} ${feeFilter === '$1-10' ? styles.active : ''}`}
                        >
                            $1-10
                        </button>
                        <button
                            onClick={() => setFeeFilter('$11+')}
                            className={`${styles.filterButton} ${feeFilter === '$11+' ? styles.active : ''}`}
                        >
                            $11+
                        </button>
                    </div>
                </div>
                
                <div className={styles.filterGroup} data-testid="player-filter">
                    <span>Players:</span>
                    <div className={styles.filterButtons}>
                        <button
                            className={`${styles.filterButton} ${styles.active}`}
                        >
                            1v1
                        </button>
                    </div>
                </div>
                
                <div className={styles.filterGroup} data-testid="difficulty-filter">
                    <span>Difficulty:</span>
                    <div className={styles.filterButtons}>
                        <button
                            onClick={() => setDifficultyFilter('Easy')}
                            className={`${styles.filterButton} ${difficultyFilter === 'Easy' ? styles.active : ''}`}
                        >
                            Easy
                        </button>
                        <button
                            onClick={() => setDifficultyFilter('Medium')}
                            className={`${styles.filterButton} ${difficultyFilter === 'Medium' ? styles.active : ''}`}
                        >
                            Medium
                        </button>
                        <button
                            onClick={() => setDifficultyFilter('Hard')}
                            className={`${styles.filterButton} ${difficultyFilter === 'Hard' ? styles.active : ''}`}
                        >
                            Hard
                        </button>
                    </div>
                </div>
                
                <div className={styles.filterGroup} data-testid="sort-games">
                    <span>Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={styles.sortDropdown}
                    >
                        <option value="Prize Pool">Prize Pool</option>
                        <option value="Entry Fee">Entry Fee</option>
                        <option value="Players">Players</option>
                        <option value="Difficulty">Difficulty</option>
                    </select>
                </div>
            </div>

            <div className={styles.gameGrid} data-testid="games-grid">
                {filteredGames.map(game => (
                    <GameCard key={game.gameType} game={game} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className={styles.paginationContainer} data-testid="pagination">
                <div className={styles.pagination}>
                    <button className={styles.pageButton} disabled>
                        Previous
                    </button>
                    <span className={styles.pageInfo}>Page 1 of 1</span>
                    <button className={styles.pageButton} disabled>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;