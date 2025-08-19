import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useTutorial } from '../../context/TutorialContext';
import { useUI } from '../../context/UIContext';
import TutorialStep from './TutorialStep';
import TutorialOverlay from './TutorialOverlay';
import TutorialTooltip from './TutorialTooltip';
import styles from './TutorialManager.module.css';

interface TutorialManagerProps {
  autoStart?: boolean;
  enableKeyboardNavigation?: boolean;
  debugMode?: boolean;
}

const TutorialManager: React.FC<TutorialManagerProps> = ({
  autoStart = true,
  enableKeyboardNavigation = true,
  debugMode = false
}) => {
  const location = useLocation();
  const {
    currentTutorial,
    currentStepIndex,
    isActive,
    nextStep,
    previousStep,
    skipTutorial,
    completeTutorial,
    checkAndTriggerTutorials
  } = useTutorial();
  
  const { isSidebarOpen, setSidebarOpen } = useUI();

  const [currentTargetElement, setCurrentTargetElement] = useState<HTMLElement | null>(null);
  const [isWaitingForElement, setIsWaitingForElement] = useState(false);
  const [elementSearchTimeout, setElementSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [originalSidebarState, setOriginalSidebarState] = useState<boolean | null>(null);

  const currentStep = currentTutorial?.steps[currentStepIndex];
  const isLastStep = currentStepIndex === (currentTutorial?.steps.length || 0) - 1;

  // Auto-trigger tutorials when conditions are met
  useEffect(() => {
    if (autoStart) {
      checkAndTriggerTutorials();
    }
  }, [autoStart, checkAndTriggerTutorials, location.pathname]);

  // Auto-open sidebar for tutorial steps that need sidebar elements
  useEffect(() => {
    if (!isActive || !currentStep) {
      // Restore original sidebar state when tutorial ends
      if (originalSidebarState !== null) {
        setSidebarOpen(originalSidebarState);
        setOriginalSidebarState(null);
      }
      return;
    }

    // Check if current step needs sidebar elements
    const needsSidebar = currentStep.targetSelector && (
      currentStep.targetSelector.includes('[data-testid="logo-link"]') ||
      currentStep.targetSelector.includes('[data-testid="nav-') ||
      currentStep.targetSelector.includes('[data-testid="profile-section"]') ||
      currentStep.targetSelector.includes('[data-testid="user-avatar"]') ||
      currentStep.targetSelector.includes('[data-testid="username"]') ||
      currentStep.targetSelector.includes('[data-testid="user-status"]') ||
      currentStep.targetSelector.includes('[data-testid="logout-button"]') ||
      currentStep.targetSelector.includes('[data-testid="sidebar"]')
    );

    if (needsSidebar && !isSidebarOpen) {
      // Save original state only once
      if (originalSidebarState === null) {
        setOriginalSidebarState(isSidebarOpen);
      }
      // Open sidebar for tutorial
      setSidebarOpen(true);
    }
  }, [isActive, currentStep, isSidebarOpen, setSidebarOpen, originalSidebarState]);

  // Handle element targeting
  const handleElementFound = useCallback((element: HTMLElement | null) => {
    setCurrentTargetElement(element);
    setIsWaitingForElement(false);
  }, []);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (isLastStep) {
      completeTutorial();
    } else {
      nextStep();
    }
  }, [isLastStep, completeTutorial, nextStep]);

  // Handle waiting for elements with timeout fallback
  useEffect(() => {
    if (!isActive || !currentStep) {
      setIsWaitingForElement(false);
      if (elementSearchTimeout) {
        clearTimeout(elementSearchTimeout);
        setElementSearchTimeout(null);
      }
      return;
    }

    if (currentStep.targetSelector && !currentTargetElement) {
      setIsWaitingForElement(true);
      
      // Set a timeout to handle cases where element is never found
      const timeout = setTimeout(() => {
        console.warn(`Tutorial element not found after 5 seconds: ${currentStep.targetSelector}`);
        
        // For tooltip mode, show modal fallback or skip to next step
        if (currentStep.displayMode === 'tooltip') {
          console.warn('Element not found for tooltip, auto-advancing to next step');
          handleNext();
        }
      }, 5000); // 5 second timeout
      
      setElementSearchTimeout(timeout);
    } else {
      setIsWaitingForElement(false);
      if (elementSearchTimeout) {
        clearTimeout(elementSearchTimeout);
        setElementSearchTimeout(null);
      }
    }

    // Cleanup on unmount
    return () => {
      if (elementSearchTimeout) {
        clearTimeout(elementSearchTimeout);
        setElementSearchTimeout(null);
      }
    };
  }, [isActive, currentStep, currentTargetElement, handleNext]);

  const handlePrevious = useCallback(() => {
    previousStep();
  }, [previousStep]);

  const handleSkip = useCallback(() => {
    skipTutorial();
  }, [skipTutorial]);

  const handleClose = useCallback(() => {
    skipTutorial();
  }, [skipTutorial]);

  // Handle element actions
  const handleElementAction = useCallback((action: string) => {
    if (!currentTargetElement || !currentStep) return;

    switch (action) {
      case 'click':
        currentTargetElement.click();
        if (currentStep.nextOnAction) {
          setTimeout(handleNext, 500);
        }
        break;
      case 'hover':
        // Trigger hover event
        const hoverEvent = new MouseEvent('mouseenter', { bubbles: true });
        currentTargetElement.dispatchEvent(hoverEvent);
        if (currentStep.nextOnAction) {
          setTimeout(handleNext, 500);
        }
        break;
    }
  }, [currentTargetElement, currentStep, handleNext]);

  // Global keyboard shortcuts
  useEffect(() => {
    if (!enableKeyboardNavigation || !isActive) return;

    const handleGlobalKeyPress = (event: KeyboardEvent) => {
      // Only handle if not focused on input elements
      const activeElement = document.activeElement;
      const isInputFocused = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.tagName === 'SELECT' ||
        (activeElement as HTMLElement).contentEditable === 'true'
      );

      if (isInputFocused) return;

      // Handle global shortcuts
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          handleClose();
          break;
        case 'ArrowRight':
        case ' ':
          event.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          handlePrevious();
          break;
        case 'F1':
          event.preventDefault();
          // Could open tutorial help
          break;
      }
    };

    document.addEventListener('keydown', handleGlobalKeyPress);
    return () => document.removeEventListener('keydown', handleGlobalKeyPress);
  }, [enableKeyboardNavigation, isActive, handleNext, handlePrevious, handleClose]);

  // Handle automatic navigation for steps with navigateTo
  useEffect(() => {
    if (!isActive || !currentStep || !currentStep.navigateTo) return;

    if (location.pathname !== currentStep.navigateTo) {
      // Allow some time for route transition
      const timer = setTimeout(() => {
        setCurrentTargetElement(null);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, isActive, currentStep]);

  if (!isActive || !currentStep || !currentTutorial) {
    return null;
  }

  return (
    <div className={styles.tutorialManager}>
      {/* Element detection and highlighting */}
      <TutorialStep
        step={currentStep}
        isActive={isActive}
        onElementFound={handleElementFound}
      />

      {/* Modal overlay for modal display mode */}
      {currentStep.displayMode === 'modal' && (
        <TutorialOverlay
          step={currentStep}
          currentStepIndex={currentStepIndex}
          totalSteps={currentTutorial.steps.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSkip={handleSkip}
          onClose={handleClose}
          isVisible={isActive}
        />
      )}

      {/* Tooltip for tooltip display mode */}
      {currentStep.displayMode === 'tooltip' && (
        <>
          {currentTargetElement ? (
            <TutorialTooltip
              step={currentStep}
              currentStepIndex={currentStepIndex}
              totalSteps={currentTutorial.steps.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSkip={handleSkip}
              onClose={handleClose}
              isVisible={isActive}
            />
          ) : !isWaitingForElement ? (
            // Fallback modal if element not found and not waiting
            <TutorialOverlay
              step={{
                ...currentStep,
                content: `${currentStep.content}\n\n⚠️ The targeted element "${currentStep.targetSelector}" was not found on this page. This might be because:\n• The element doesn't exist yet\n• You're on a different page\n• The page is still loading\n\nYou can continue with the tutorial or navigate to the correct page.`,
                displayMode: 'modal'
              }}
              currentStepIndex={currentStepIndex}
              totalSteps={currentTutorial.steps.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSkip={handleSkip}
              onClose={handleClose}
              isVisible={isActive}
            />
          ) : null}
        </>
      )}

      {/* Loading indicator when waiting for elements */}
      {isWaitingForElement && currentStep.displayMode === 'tooltip' && (
        <div className={styles.loadingIndicator}>
          <div className={styles.spinner} />
          <div className={styles.loadingContent}>
            <span>Looking for element: {currentStep.targetSelector}</span>
            <small>Waiting up to 5 seconds...</small>
            <button
              className={styles.skipWaitButton}
              onClick={handleNext}
            >
              Skip Wait & Continue
            </button>
          </div>
        </div>
      )}

      {/* Debug panel */}
      {debugMode && (
        <div className={styles.debugPanel}>
          <h4>Tutorial Debug Info</h4>
          <div>Tutorial: {currentTutorial.id}</div>
          <div>Step: {currentStep.id} ({currentStepIndex + 1}/{currentTutorial.steps.length})</div>
          <div>Display Mode: {currentStep.displayMode}</div>
          <div>Route: {location.pathname}</div>
          <div>Navigate To: {currentStep.navigateTo || 'None'}</div>
          <div>Selector: {currentStep.targetSelector || 'None'}</div>
          <div>Element: {currentTargetElement ? 'Found' : 'Not Found'}</div>
          <div>Waiting: {isWaitingForElement ? 'Yes' : 'No'}</div>
          <div>Action: {currentStep.action || 'None'}</div>
          <div>Highlight: {currentStep.highlightElement ? 'Yes' : 'No'}</div>
          <div>Wait for Element: {currentStep.waitForElement ? 'Yes' : 'No'}</div>
          {currentStep.rewards && (
            <div>Rewards: {currentStep.rewards.length} items</div>
          )}
        </div>
      )}

      {/* Tutorial status indicator (only for tooltip mode to not interfere with modal) */}
      {currentStep.displayMode === 'tooltip' && (
        <div className={styles.statusIndicator}>
          <div className={styles.tutorialInfo}>
            <span className={styles.tutorialName}>{currentTutorial.title}</span>
            <span className={styles.stepProgress}>
              {currentStepIndex + 1} / {currentTutorial.steps.length}
            </span>
          </div>
          
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ 
                width: `${((currentStepIndex + 1) / currentTutorial.steps.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}

      {/* Element action buttons for interactive steps */}
      {currentStep.action && 
       currentStep.action !== 'none' && 
       currentTargetElement && 
       currentStep.displayMode === 'tooltip' && (
        <div className={styles.actionHelper}>
          <button 
            className={styles.actionButton}
            onClick={() => handleElementAction(currentStep.action!)}
          >
            {currentStep.action === 'click' ? 'Click Element' : 'Hover Element'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TutorialManager;