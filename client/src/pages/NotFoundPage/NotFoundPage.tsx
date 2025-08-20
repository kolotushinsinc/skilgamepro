import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, HelpCircle, AlertTriangle } from 'lucide-react';
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Error Icon */}
        <div className={styles.iconContainer}>
          <AlertTriangle size={120} className={styles.errorIcon} />
          <div className={styles.glowEffect}></div>
        </div>

        {/* Error Code */}
        <div className={styles.errorCode}>
          <span className={styles.errorNumber}>404</span>
          <span className={styles.errorText}>PAGE NOT FOUND</span>
        </div>

        {/* Main Message */}
        <div className={styles.messageContainer}>
          <h1 className={styles.title}>Oops! Game Over</h1>
          <p className={styles.description}>
            The page you're looking for seems to have disappeared into the void. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Helpful Suggestions */}
        <div className={styles.suggestions}>
          <h3 className={styles.suggestionsTitle}>What you can do:</h3>
          <ul className={styles.suggestionsList}>
            <li>Check the URL for typos</li>
            <li>Go back to the previous page</li>
            <li>Visit our homepage to start fresh</li>
            <li>Search for what you need</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionsContainer}>
          <Link to="/" className={`${styles.actionButton} ${styles.primaryButton}`}>
            <Home size={20} />
            <span>Go Home</span>
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className={`${styles.actionButton} ${styles.secondaryButton}`}
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
          
          <Link to="/games" className={`${styles.actionButton} ${styles.secondaryButton}`}>
            <Search size={20} />
            <span>Browse Games</span>
          </Link>
        </div>

        {/* Help Section */}
        <div className={styles.helpSection}>
          <div className={styles.helpIcon}>
            <HelpCircle size={24} />
          </div>
          <div className={styles.helpText}>
            <p>Still having trouble?</p>
            <Link to="/support" className={styles.helpLink}>
              Contact Support
            </Link>
          </div>
        </div>

        {/* Popular Pages */}
        <div className={styles.popularPages}>
          <h4 className={styles.popularTitle}>Popular Pages</h4>
          <div className={styles.pageLinks}>
            <Link to="/dashboard" className={styles.pageLink}>
              Dashboard
            </Link>
            <Link to="/games" className={styles.pageLink}>
              Games
            </Link>
            <Link to="/tournaments" className={styles.pageLink}>
              Tournaments
            </Link>
            <Link to="/profile" className={styles.pageLink}>
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;