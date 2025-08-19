import React, { useState } from 'react';
import { useTutorial } from '../../context/TutorialContext';
import { useAuth } from '../../context/AuthContext';
import useTutorialTrigger from '../../hooks/useTutorialTrigger';
import { HelpCircle, Play, X, ChevronDown } from 'lucide-react';
import styles from './TutorialButton.module.css';

interface TutorialButtonProps {
  variant?: 'floating' | 'inline' | 'dropdown';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
  tutorials?: string[];
  className?: string;
}

const TutorialButton: React.FC<TutorialButtonProps> = ({
  variant = 'floating',
  position = 'bottom-right',
  showLabel = true,
  size = 'medium',
  tutorials,
  className = ''
}) => {
  const { isActive, currentTutorial, completedTutorials } = useTutorial();
  const { user } = useAuth();
  const { triggerTutorial, stopTutorial, canTriggerTutorial } = useTutorialTrigger();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  // Default tutorial options
  const defaultTutorials = [
    { id: 'welcome_onboarding', title: 'Getting Started', description: 'Learn the basics of our platform' },
    { id: 'games_navigation', title: 'How to Play Games', description: 'Join games and compete with others' },
    { id: 'tournaments_guide', title: 'Tournament Guide', description: 'Participate in tournaments' },
    { id: 'financial_management', title: 'Managing Funds', description: 'Deposits, withdrawals and balance' },
    { id: 'results_dashboard', title: 'Track Your Progress', description: 'View stats and game history' },
    { id: 'account_management', title: 'Account Settings', description: 'Manage your profile and settings' }
  ];

  const availableTutorials = tutorials 
    ? defaultTutorials.filter(t => tutorials.includes(t.id))
    : defaultTutorials;

  const handleTutorialClick = (tutorialId: string) => {
    if (isActive) {
      stopTutorial();
    } else {
      triggerTutorial(tutorialId, { force: true });
    }
    setIsDropdownOpen(false);
  };

  const handleStopTutorial = () => {
    stopTutorial();
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Debug functions for development
  const handleClearState = () => {
    console.log('🧹 Clearing tutorial state...');
    
    if (user) {
      const userTutorialKey = `tutorialState_${user._id}`;
      localStorage.removeItem(userTutorialKey);
      console.log('🧹 Cleared tutorial state for user:', user._id);
    }
    
    // Clear legacy keys
    localStorage.removeItem('tutorialState');
    localStorage.removeItem('completedTutorials');
    localStorage.removeItem('skippedTutorials');
    localStorage.removeItem('hasCompletedOnboarding');
    
    window.location.reload();
  };

  const handleForceStart = () => {
    console.log('🚀 Force starting tutorial as new user...');
    handleClearState();
    setTimeout(() => {
      triggerTutorial('welcome_onboarding', { force: true });
    }, 100);
  };

  const isDev = process.env.NODE_ENV === 'development';

  // Floating button variant
  if (variant === 'floating') {
    return (
      <div 
        className={`${styles.floatingContainer} ${styles[position]} ${className}`}
        data-testid="tutorial-floating-button"
      >
        {isActive ? (
          <button
            onClick={handleStopTutorial}
            className={`${styles.floatingButton} ${styles[size]} ${styles.active}`}
            title="Stop Tutorial"
          >
            <X size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
            {showLabel && <span className={styles.label}>Stop</span>}
          </button>
        ) : (
          <>
            <button
              onClick={toggleDropdown}
              className={`${styles.floatingButton} ${styles[size]} ${isDropdownOpen ? styles.open : ''}`}
              title="Start Tutorial"
            >
              <HelpCircle size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
              {showLabel && <span className={styles.label}>Help</span>}
            </button>

            {isDropdownOpen && (
              <div className={`${styles.dropdown} ${styles[position]}`}>
                <div className={styles.dropdownHeader}>
                  <h4>Choose Tutorial</h4>
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className={styles.closeDropdown}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className={styles.tutorialList}>
                  {availableTutorials.map((tutorial) => (
                    <button
                      key={tutorial.id}
                      onClick={() => handleTutorialClick(tutorial.id)}
                      className={`${styles.tutorialItem} ${!canTriggerTutorial(tutorial.id) ? styles.disabled : ''}`}
                      disabled={!canTriggerTutorial(tutorial.id)}
                    >
                      <div className={styles.tutorialInfo}>
                        <span className={styles.tutorialTitle}>{tutorial.title}</span>
                        <span className={styles.tutorialDescription}>{tutorial.description}</span>
                      </div>
                      <Play size={16} />
                    </button>
                  ))}
                </div>
                
                {isDev && (
                  <div className={styles.debugSection}>
                    <div className={styles.debugHeader}>
                      <button
                        onClick={() => setShowDebug(!showDebug)}
                        className={styles.debugToggle}
                      >
                        🔧 Debug {showDebug ? '▼' : '▶'}
                      </button>
                    </div>
                    
                    {showDebug && (
                      <div className={styles.debugPanel}>
                        <div className={styles.debugInfo}>
                          <small>
                            <strong>Debug Info:</strong><br/>
                            User ID: {user?._id || 'None'}<br/>
                            Completed: {completedTutorials.length}<br/>
                            First time: {user ? (localStorage.getItem(`tutorialState_${user._id}`) ? 'No' : 'Yes') : 'Unknown'}<br/>
                            Path: {window.location.pathname}
                          </small>
                        </div>
                        
                        <div className={styles.debugActions}>
                          <button
                            className={styles.debugButton}
                            onClick={handleClearState}
                            title="Clear all tutorial state"
                          >
                            Clear State
                          </button>
                          <button
                            className={styles.debugButton}
                            onClick={handleForceStart}
                            title="Force start tutorial as new user"
                          >
                            Force Start
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Dropdown variant
  if (variant === 'dropdown') {
    return (
      <div className={`${styles.dropdownWrapper} ${className}`} data-testid="tutorial-dropdown">
        <button
          onClick={toggleDropdown}
          className={`${styles.dropdownButton} ${styles[size]} ${isDropdownOpen ? styles.open : ''}`}
        >
          <HelpCircle size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
          {showLabel && <span>Tutorials</span>}
          <ChevronDown size={16} className={styles.chevron} />
        </button>

        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            {isActive && (
              <button
                onClick={handleStopTutorial}
                className={`${styles.menuItem} ${styles.stopButton}`}
              >
                <X size={16} />
                <span>Stop Current Tutorial</span>
                <span className={styles.currentTutorial}>({currentTutorial?.title})</span>
              </button>
            )}
            
            {availableTutorials.map((tutorial) => (
              <button
                key={tutorial.id}
                onClick={() => handleTutorialClick(tutorial.id)}
                className={`${styles.menuItem} ${!canTriggerTutorial(tutorial.id) ? styles.disabled : ''}`}
                disabled={!canTriggerTutorial(tutorial.id)}
              >
                <Play size={16} />
                <div className={styles.menuItemContent}>
                  <span className={styles.menuItemTitle}>{tutorial.title}</span>
                  <span className={styles.menuItemDescription}>{tutorial.description}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Inline variant
  return (
    <button
      onClick={() => {
        if (isActive) {
          handleStopTutorial();
        } else if (availableTutorials.length === 1) {
          handleTutorialClick(availableTutorials[0].id);
        } else {
          toggleDropdown();
        }
      }}
      className={`${styles.inlineButton} ${styles[size]} ${isActive ? styles.active : ''} ${className}`}
      data-testid="tutorial-inline-button"
    >
      {isActive ? (
        <>
          <X size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
          {showLabel && <span>Stop Tutorial</span>}
        </>
      ) : (
        <>
          <HelpCircle size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
          {showLabel && <span>Start Tutorial</span>}
        </>
      )}
    </button>
  );
};

export default TutorialButton;