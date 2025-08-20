import React, { useEffect, useRef } from 'react';
import { X, ArrowLeft, ArrowRight, SkipForward, Award } from 'lucide-react';
import { TutorialStep } from '../../types/tutorial';
import styles from './TutorialOverlay.module.css';

interface TutorialOverlayProps {
  step: TutorialStep;
  currentStepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onClose: () => void;
  isVisible: boolean;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
  step,
  currentStepIndex,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  onClose,
  isVisible
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrevious();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      // Prevent all scrolling during tutorial
      document.body.style.overflow = 'hidden';
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
      document.documentElement.style.maxWidth = '100vw';
      document.body.style.maxWidth = '100vw';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      document.body.style.overflowX = 'unset';
      document.documentElement.style.overflow = 'unset';
      document.documentElement.style.overflowX = 'unset';
      document.documentElement.style.maxWidth = 'unset';
      document.body.style.maxWidth = 'unset';
    };
  }, [isVisible, onClose, onNext, onPrevious]);

  // Only render for modal display mode
  if (!isVisible || step.displayMode !== 'modal') return null;

  const progress = ((currentStepIndex + 1) / totalSteps) * 100;
  const isLastStep = currentStepIndex === totalSteps - 1;
  const isFirstStep = currentStepIndex === 0;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div 
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{step.title}</h2>
          
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close tutorial"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.content}>
          <p className={styles.description}>
            {step.content.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < step.content.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Show rewards if available */}
        {step.rewards && step.rewards.length > 0 && (
          <div className={styles.rewards}>
            <div className={styles.rewardsTitle}>Rewards</div>
            {step.rewards.map((reward, index) => (
              <div key={index} className={styles.rewardItem}>
                <span className={styles.rewardIcon}>
                  {reward.type === 'badge' ? '🏆' : reward.type === 'experience' ? '⭐' : '💰'}
                </span>
                <span className={styles.rewardText}>
                  +{reward.value} {reward.description}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className={styles.stepCounter}>
              Step {currentStepIndex + 1} of {totalSteps}
            </div>
          </div>
          
          <div className={styles.navigationButtons}>
            <button
              className={`${styles.navButton} ${styles.previousButton}`}
              onClick={onPrevious}
              disabled={isFirstStep}
            >
              <ArrowLeft size={16} />
              Previous
            </button>

            {step.skippable && (
              <button
                className={`${styles.navButton} ${styles.skipButton}`}
                onClick={onSkip}
              >
                <SkipForward size={16} />
                Skip
              </button>
            )}

            {isLastStep ? (
              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={onNext}
              >
                <Award size={16} />
                Complete Tutorial
              </button>
            ) : (
              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={onNext}
              >
                Next
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;