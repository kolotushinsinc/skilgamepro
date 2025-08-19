import { useCallback } from 'react';
import { useTutorial } from '../context/TutorialContext';

interface TutorialTriggerOptions {
  delay?: number;
  force?: boolean;
  skipCompleted?: boolean;
}

export const useTutorialTrigger = () => {
  const { 
    startTutorial, 
    isActive, 
    skipTutorial, 
    completeTutorial,
    getTutorialProgress 
  } = useTutorial();

  /**
   * Trigger a tutorial with optional configuration
   */
  const triggerTutorial = useCallback(async (
    tutorialId: string, 
    options: TutorialTriggerOptions = {}
  ) => {
    const { delay = 0, force = false, skipCompleted = true } = options;

    // Check if tutorial is already completed
    if (skipCompleted) {
      const progress = getTutorialProgress(tutorialId);
      if (progress?.completed) {
        console.log(`Tutorial ${tutorialId} already completed, skipping`);
        return false;
      }
    }

    // Don't start if another tutorial is active (unless forced)
    if (isActive && !force) {
      console.warn(`Cannot start tutorial ${tutorialId}: another tutorial is active`);
      return false;
    }

    // Force stop current tutorial if needed
    if (isActive && force) {
      skipTutorial();
      // Small delay to ensure cleanup
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Start tutorial with optional delay
    if (delay > 0) {
      setTimeout(() => {
        startTutorial(tutorialId);
      }, delay);
    } else {
      startTutorial(tutorialId);
    }

    return true;
  }, [startTutorial, isActive, skipTutorial, getTutorialProgress]);

  /**
   * Trigger tutorial when user first visits a specific route
   */
  const triggerOnFirstVisit = useCallback((
    tutorialId: string,
    storageKey: string,
    options: TutorialTriggerOptions = {}
  ) => {
    const hasVisited = localStorage.getItem(storageKey);
    
    if (!hasVisited) {
      localStorage.setItem(storageKey, 'true');
      return triggerTutorial(tutorialId, options);
    }
    
    return Promise.resolve(false);
  }, [triggerTutorial]);

  /**
   * Trigger tutorial based on user action count
   */
  const triggerOnActionCount = useCallback((
    tutorialId: string,
    actionKey: string,
    targetCount: number,
    options: TutorialTriggerOptions = {}
  ) => {
    const currentCount = parseInt(localStorage.getItem(actionKey) || '0');
    const newCount = currentCount + 1;
    
    localStorage.setItem(actionKey, newCount.toString());
    
    if (newCount === targetCount) {
      return triggerTutorial(tutorialId, options);
    }
    
    return Promise.resolve(false);
  }, [triggerTutorial]);

  /**
   * Trigger tutorial after a delay when component mounts
   */
  const triggerOnMount = useCallback((
    tutorialId: string,
    delay: number = 1000,
    options: Omit<TutorialTriggerOptions, 'delay'> = {}
  ) => {
    return triggerTutorial(tutorialId, { ...options, delay });
  }, [triggerTutorial]);

  /**
   * Trigger tutorial when user interacts with specific element
   */
  const triggerOnElementInteraction = useCallback((
    tutorialId: string,
    elementSelector: string,
    eventType: string = 'click',
    options: TutorialTriggerOptions = {}
  ) => {
    const element = document.querySelector(elementSelector);
    
    if (!element) {
      console.warn(`Element ${elementSelector} not found for tutorial trigger`);
      return false;
    }

    const handler = () => {
      triggerTutorial(tutorialId, options);
      element.removeEventListener(eventType, handler);
    };

    element.addEventListener(eventType, handler);
    
    return true;
  }, [triggerTutorial]);

  /**
   * Trigger tutorial when user has insufficient funds
   */
  const triggerOnInsufficientFunds = useCallback((
    options: TutorialTriggerOptions = {}
  ) => {
    return triggerTutorial('financial-management', {
      delay: 500,
      ...options
    });
  }, [triggerTutorial]);

  /**
   * Trigger tutorial when user joins first game
   */
  const triggerOnFirstGame = useCallback((
    options: TutorialTriggerOptions = {}
  ) => {
    return triggerOnFirstVisit(
      'game-basics',
      'hasJoinedGame',
      { delay: 1000, ...options }
    );
  }, [triggerOnFirstVisit]);

  /**
   * Trigger tutorial when user joins first tournament
   */
  const triggerOnFirstTournament = useCallback((
    options: TutorialTriggerOptions = {}
  ) => {
    return triggerOnFirstVisit(
      'tournaments',
      'hasJoinedTournament',
      { delay: 1000, ...options }
    );
  }, [triggerOnFirstVisit]);

  /**
   * Stop current tutorial
   */
  const stopTutorial = useCallback(() => {
    if (isActive) {
      skipTutorial();
    }
  }, [isActive, skipTutorial]);

  /**
   * Complete current tutorial
   */
  const finishTutorial = useCallback(() => {
    if (isActive) {
      completeTutorial();
    }
  }, [isActive, completeTutorial]);

  /**
   * Check if a specific tutorial can be triggered
   */
  const canTriggerTutorial = useCallback((tutorialId: string) => {
    const progress = getTutorialProgress(tutorialId);
    return !progress?.completed && !isActive;
  }, [getTutorialProgress, isActive]);

  return {
    // Core functions
    triggerTutorial,
    stopTutorial,
    finishTutorial,
    canTriggerTutorial,
    
    // Conditional triggers
    triggerOnFirstVisit,
    triggerOnActionCount,
    triggerOnMount,
    triggerOnElementInteraction,
    
    // Specific scenario triggers
    triggerOnInsufficientFunds,
    triggerOnFirstGame,
    triggerOnFirstTournament,
    
    // State
    isActive
  };
};

export default useTutorialTrigger;