import React, { useEffect, useRef, useState } from 'react';
import { TutorialStep as TutorialStepType } from '../../types/tutorial';
import styles from './TutorialStep.module.css';

interface TutorialStepProps {
  step: TutorialStepType;
  isActive: boolean;
  onElementFound?: (element: HTMLElement | null) => void;
}

const TutorialStep: React.FC<TutorialStepProps> = ({
  step,
  isActive,
  onElementFound
}) => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to find target element
  const findTargetElement = () => {
    if (!step.targetSelector) {
      setTargetElement(null);
      onElementFound?.(null);
      return;
    }

    try {
      const element = document.querySelector(step.targetSelector) as HTMLElement;
      if (element && element !== targetElement) {
        setTargetElement(element);
        onElementFound?.(element);
      } else if (!element && targetElement) {
        setTargetElement(null);
        onElementFound?.(null);
      }
    } catch (error) {
      console.warn('Invalid selector for tutorial step:', step.targetSelector);
      setTargetElement(null);
      onElementFound?.(null);
    }
  };

  // Set up element observation
  useEffect(() => {
    if (!isActive || !step.targetSelector) {
      setTargetElement(null);
      onElementFound?.(null);
      return;
    }

    // Initial search
    findTargetElement();

    // Set up mutation observer to watch for DOM changes
    observerRef.current = new MutationObserver(() => {
      // Debounce the search to avoid excessive calls
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(findTargetElement, 100);
    });

    // Start observing
    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'id', 'data-testid']
    });

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isActive, step.targetSelector, onElementFound]);

  // Add highlight class to target element for tooltip mode (including sidebar elements)
  useEffect(() => {
    if (!targetElement || !isActive || step.displayMode !== 'tooltip') return;

    const highlightClass = styles.tutorialHighlight;
    
    // Add highlight class
    targetElement.classList.add(highlightClass);
    
    // Add data attribute for tutorial
    targetElement.setAttribute('data-tutorial-active', 'true');

    // Ensure element is scrollable and visible
    const ensureVisibility = () => {
      if (!targetElement) return;

      const rect = targetElement.getBoundingClientRect();
      const isInViewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      );

      if (!isInViewport) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    };

    // Delay to ensure DOM is ready
    const visibilityTimeout = setTimeout(ensureVisibility, 200);

    // Cleanup
    return () => {
      clearTimeout(visibilityTimeout);
      if (targetElement) {
        targetElement.classList.remove(highlightClass);
        targetElement.removeAttribute('data-tutorial-active');
      }
    };
  }, [targetElement, isActive, step.displayMode]);

  // Remove any existing backdrop - no blur effects for any tutorials
  useEffect(() => {
    // Always remove any existing backdrop to ensure no blur effects
    const existingBackdrop = document.querySelector('.tutorial-backdrop');
    if (existingBackdrop) {
      existingBackdrop.remove();
    }
    
    // No backdrop creation - tutorials now work without any background blur
    return () => {
      // Cleanup any remaining backdrops
      const backdrop = document.querySelector('.tutorial-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    };
  }, [targetElement, isActive, step.displayMode]);

  // Handle element actions (click, hover)
  useEffect(() => {
    if (!targetElement || !isActive || !step.action || step.action === 'none') return;

    const handleAction = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      
      // Let the tutorial manager handle the action
      if (step.nextOnAction) {
        // This would be handled by the parent TutorialManager
      }
    };

    if (step.action === 'click') {
      targetElement.addEventListener('click', handleAction);
      return () => targetElement.removeEventListener('click', handleAction);
    } else if (step.action === 'hover') {
      targetElement.addEventListener('mouseenter', handleAction);
      return () => targetElement.removeEventListener('mouseenter', handleAction);
    }
  }, [targetElement, isActive, step.action, step.nextOnAction]);

  // Wait for element if required
  useEffect(() => {
    if (!isActive || !step.waitForElement || !step.targetSelector) return;

    const checkForElement = () => {
      const element = document.querySelector(step.targetSelector!) as HTMLElement;
      if (element) {
        setTargetElement(element);
        onElementFound?.(element);
      } else {
        // Keep checking every 100ms until element appears
        setTimeout(checkForElement, 100);
      }
    };

    checkForElement();
  }, [isActive, step.waitForElement, step.targetSelector, onElementFound]);

  // This component doesn't render anything visible - it's just for element detection and highlighting
  return (
    <>
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && isActive && (
        <div className={styles.debugInfo}>
          <div>Step: {step.id}</div>
          <div>Mode: {step.displayMode}</div>
          <div>Selector: {step.targetSelector || 'None'}</div>
          <div>Element: {targetElement ? 'Found' : 'Not Found'}</div>
          <div>Action: {step.action || 'None'}</div>
        </div>
      )}
    </>
  );
};

export default TutorialStep;