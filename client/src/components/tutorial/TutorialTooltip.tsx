import React, { useEffect, useState, useRef } from 'react';
import { X, ArrowRight, ArrowLeft, SkipForward } from 'lucide-react';
import { TutorialStep } from '../../types/tutorial';
import styles from './TutorialTooltip.module.css';

interface TutorialTooltipProps {
  step: TutorialStep;
  currentStepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onClose: () => void;
  isVisible: boolean;
}

const TutorialTooltip: React.FC<TutorialTooltipProps> = ({
  step,
  currentStepIndex,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  onClose,
  isVisible
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [actualPosition, setActualPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  // Calculate optimal tooltip position
  const calculatePosition = (target: HTMLElement, tooltip: HTMLElement) => {
    const targetRect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let newPosition = { top: 0, left: 0 };
    let finalPosition: 'top' | 'bottom' | 'left' | 'right' = step.position === 'center' ? 'top' : step.position;

    // Try preferred position first
    switch (step.position) {
      case 'top':
        newPosition = {
          top: targetRect.top - tooltipRect.height - 12,
          left: targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2)
        };
        if (newPosition.top < 0) {
          finalPosition = 'bottom';
        }
        break;

      case 'bottom':
        newPosition = {
          top: targetRect.bottom + 12,
          left: targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2)
        };
        if (newPosition.top + tooltipRect.height > viewport.height) {
          finalPosition = 'top';
        }
        break;

      case 'left':
        newPosition = {
          top: targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2),
          left: targetRect.left - tooltipRect.width - 12
        };
        if (newPosition.left < 0) {
          finalPosition = 'right';
        }
        break;

      case 'right':
        newPosition = {
          top: targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2),
          left: targetRect.right + 12
        };
        if (newPosition.left + tooltipRect.width > viewport.width) {
          finalPosition = 'left';
        }
        break;

      default:
        finalPosition = 'top';
    }

    // If position changed, recalculate
    if (finalPosition !== step.position) {
      switch (finalPosition) {
        case 'top':
          newPosition = {
            top: targetRect.top - tooltipRect.height - 12,
            left: targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2)
          };
          break;
        case 'bottom':
          newPosition = {
            top: targetRect.bottom + 12,
            left: targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2)
          };
          break;
        case 'left':
          newPosition = {
            top: targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2),
            left: targetRect.left - tooltipRect.width - 12
          };
          break;
        case 'right':
          newPosition = {
            top: targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2),
            left: targetRect.right + 12
          };
          break;
      }
    }

    // Ensure tooltip stays within viewport
    newPosition.left = Math.max(8, Math.min(newPosition.left, viewport.width - tooltipRect.width - 8));
    newPosition.top = Math.max(8, Math.min(newPosition.top, viewport.height - tooltipRect.height - 8));

    return { position: newPosition, actualPosition: finalPosition };
  };

  // Update position when step changes or window resizes
  useEffect(() => {
    if (!step.targetSelector || !isVisible) return;

    const updatePosition = () => {
      const target = document.querySelector(step.targetSelector!) as HTMLElement;
      if (target && tooltipRef.current) {
        setTargetElement(target);
        
        // Add highlight class
        if (step.highlightElement) {
          target.classList.add('tutorial-highlight');
        }

        // Scroll target into view
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        });

        // Calculate position after a brief delay for smooth scrolling
        setTimeout(() => {
          if (tooltipRef.current) {
            const { position: newPos, actualPosition } = calculatePosition(target, tooltipRef.current);
            setPosition(newPos);
            setActualPosition(actualPosition);
          }
        }, 300);
      }
    };

    // Initial position calculation
    if (step.waitForElement) {
      // Wait for element to appear
      const checkElement = () => {
        const target = document.querySelector(step.targetSelector!) as HTMLElement;
        if (target) {
          updatePosition();
        } else {
          setTimeout(checkElement, 100);
        }
      };
      checkElement();
    } else {
      updatePosition();
    }

    // Listen for window resize
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      
      // Remove highlight
      if (targetElement && step.highlightElement) {
        targetElement.classList.remove('tutorial-highlight');
      }
    };
  }, [step, isVisible]);

  // Handle target element action
  const handleTargetAction = () => {
    if (step.action === 'click' && targetElement) {
      targetElement.click();
      if (step.nextOnAction) {
        setTimeout(onNext, 500);
      }
    }
  };

  if (!isVisible) return null;

  const isMobile = window.innerWidth <= 768;
  const content = isMobile && step.mobileContent ? step.mobileContent : step.content;

  return (
    <>
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={`${styles.tooltip} ${styles[actualPosition]}`}
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        {/* Arrow pointer */}
        <div className={`${styles.arrow} ${styles[`arrow-${actualPosition}`]}`} />
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h3 className={styles.title}>{step.title}</h3>
            <div className={styles.stepCounter}>
              {currentStepIndex + 1} of {totalSteps}
            </div>
          </div>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close tutorial"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <p className={styles.description}>
            {content.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < content.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Action button for interactive elements */}
        {step.action && step.action !== 'none' && (
          <div className={styles.actionSection}>
            <button
              className={styles.actionButton}
              onClick={handleTargetAction}
            >
              {step.action === 'click' ? 'Click Element' : 'Hover Element'}
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Progress bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>
          <div className={styles.progressText}>
            Step {currentStepIndex + 1} of {totalSteps}
          </div>
        </div>

        {/* Footer controls */}
        <div className={styles.footer}>
          <div className={styles.navigationButtons}>
            <button
              className={`${styles.navButton} ${styles.previousButton}`}
              onClick={onPrevious}
              disabled={currentStepIndex === 0}
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

            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={onNext}
            >
              Next
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Rewards display */}
        {step.rewards && step.rewards.length > 0 && (
          <div className={styles.rewards}>
            <div className={styles.rewardsTitle}>Rewards:</div>
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
      </div>
    </>
  );
};

export default TutorialTooltip;