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
}

const TutorialManager: React.FC<TutorialManagerProps> = ({
  autoStart = true,
  enableKeyboardNavigation = true
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
  const [autoActionTimeout, setAutoActionTimeout] = useState<NodeJS.Timeout | null>(null);

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
        // For tooltip mode, show modal fallback or skip to next step
        if (currentStep.displayMode === 'tooltip') {
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

  // Auto-action system - automatically perform actions after 3 seconds, but only for non-navigation steps
  useEffect(() => {
    if (!isActive || !currentStep || !currentTargetElement) {
      if (autoActionTimeout) {
        clearTimeout(autoActionTimeout);
        setAutoActionTimeout(null);
      }
      return;
    }

    // Check if this is a navigation step (moving between profile sections or tabs)
    const isNavigationStep = currentStep.targetSelector && (
      currentStep.targetSelector.includes('[data-testid="nav-') ||
      currentStep.targetSelector.includes('profile') ||
      currentStep.targetSelector.includes('password') ||
      currentStep.targetSelector.includes('security') ||
      currentStep.targetSelector.includes('avatar') ||
      currentStep.targetSelector.includes('tab') ||
      currentStep.targetSelector.includes('button') ||
      currentStep.targetSelector.includes('[role="tab"]') ||
      currentStep.content.toLowerCase().includes('click') ||
      currentStep.content.toLowerCase().includes('navigate') ||
      currentStep.content.toLowerCase().includes('go to') ||
      currentStep.content.toLowerCase().includes('switch to') ||
      currentStep.content.toLowerCase().includes('tab') ||
      currentStep.content.toLowerCase().includes('next') ||
      currentStep.content.toLowerCase().includes('continue')
    );

    // Only auto-perform for steps that have actions AND are not navigation steps
    if (currentStep.action && currentStep.action !== 'none' && !isNavigationStep) {
      const timeout = setTimeout(() => {
        handleElementAction(currentStep.action!);
      }, 3000); // Auto-click after 3 seconds
      
      setAutoActionTimeout(timeout);
    }

    return () => {
      if (autoActionTimeout) {
        clearTimeout(autoActionTimeout);
        setAutoActionTimeout(null);
      }
    };
  }, [isActive, currentStep, currentTargetElement, handleElementAction]);

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

  // Prevent horizontal scroll during tutorial
  useEffect(() => {
    if (isActive) {
      // Store original values
      const originalBodyOverflowX = document.body.style.overflowX;
      const originalHtmlOverflowX = document.documentElement.style.overflowX;
      
      // Prevent horizontal scroll
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.maxWidth = '100vw';
      document.documentElement.style.maxWidth = '100vw';
      
      return () => {
        // Restore original values
        document.body.style.overflowX = originalBodyOverflowX;
        document.documentElement.style.overflowX = originalHtmlOverflowX;
        document.body.style.maxWidth = '';
        document.documentElement.style.maxWidth = '';
      };
    }
  }, [isActive]);

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
                content: `${currentStep.content}\n\n⚠️ This tutorial step cannot be displayed at the moment. This might be because:\n• The page is still loading\n• You're on a different page\n• The feature is not available\n\nYou can continue with the tutorial or navigate to the correct page.`,
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

      {/* Navigation action buttons - show for profile section navigation */}
      {currentStep.action &&
       currentStep.action !== 'none' &&
       currentTargetElement &&
       currentStep.displayMode === 'tooltip' && (
        // Check if this is a navigation step (tabs, buttons, profile sections)
        currentStep.targetSelector && (
          currentStep.targetSelector.includes('[data-testid="nav-') ||
          currentStep.targetSelector.includes('profile') ||
          currentStep.targetSelector.includes('password') ||
          currentStep.targetSelector.includes('security') ||
          currentStep.targetSelector.includes('avatar') ||
          currentStep.targetSelector.includes('tab') ||
          currentStep.targetSelector.includes('button') ||
          currentStep.targetSelector.includes('[role="tab"]') ||
          currentStep.content.toLowerCase().includes('click') ||
          currentStep.content.toLowerCase().includes('navigate') ||
          currentStep.content.toLowerCase().includes('go to') ||
          currentStep.content.toLowerCase().includes('switch to') ||
          currentStep.content.toLowerCase().includes('tab') ||
          currentStep.content.toLowerCase().includes('next') ||
          currentStep.content.toLowerCase().includes('continue')
        )
      ) && (
        <div className={styles.actionHelper}>
          <button
            className={styles.actionButton}
            onClick={() => handleElementAction(currentStep.action!)}
          >
            {currentStep.action === 'click' ? '👆 Click Here to Continue' : 'Hover Element'}
          </button>
        </div>
      )}


    </div>
  );
};

export default TutorialManager;