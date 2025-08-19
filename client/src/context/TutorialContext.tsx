import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tutorial, TutorialState, TutorialStep, TutorialProgress, TutorialBadge } from '../types/tutorial';
import { tutorialData } from '../data/tutorialData';

interface TutorialContextType extends TutorialState {
  startTutorial: (tutorialId: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  skipTutorial: () => void;
  skipStep: () => void;
  completeTutorial: () => void;
  restartTutorial: (tutorialId: string) => void;
  getAvailableTutorials: () => Tutorial[];
  getTutorialProgress: (tutorialId: string) => TutorialProgress | null;
  toggleTooltips: () => void;
  markFirstTimeComplete: () => void;
  getUnlockedBadges: () => TutorialBadge[];
  checkAndTriggerTutorials: () => void;
  highlightElement: (selector: string) => void;
  removeHighlight: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [tutorialState, setTutorialState] = useState<TutorialState>(() => {
    // Default state for new users
    const defaultState = {
      isActive: false,
      currentTutorial: null,
      currentStepIndex: 0,
      completedTutorials: [],
      skippedTutorials: [],
      showTooltips: true,
      isFirstTimeUser: true
    };

    // If no user is logged in, return default state
    if (!user) return defaultState;

    try {
      const userTutorialKey = `tutorialState_${user._id}`;
      const saved = localStorage.getItem(userTutorialKey);
      
      if (saved) {
        const parsedState = JSON.parse(saved);
        console.log('🎓 Loaded tutorial state for user:', user._id, parsedState);
        return parsedState;
      } else {
        console.log('🎓 No tutorial state found for user:', user._id, 'creating new state');
        return defaultState;
      }
    } catch (error) {
      console.log('🎓 Error loading tutorial state, using default:', error);
      return defaultState;
    }
  });

  // Save state to localStorage with user-specific key
  useEffect(() => {
    if (user) {
      const userTutorialKey = `tutorialState_${user._id}`;
      localStorage.setItem(userTutorialKey, JSON.stringify(tutorialState));
      console.log('🎓 Saved tutorial state for user:', user._id, tutorialState);
    }
  }, [tutorialState, user]);

  // Reset tutorial state when user changes
  useEffect(() => {
    if (user) {
      const userTutorialKey = `tutorialState_${user._id}`;
      const saved = localStorage.getItem(userTutorialKey);
      
      if (!saved) {
        console.log('🎓 New user detected, resetting tutorial state:', user._id);
        setTutorialState({
          isActive: false,
          currentTutorial: null,
          currentStepIndex: 0,
          completedTutorials: [],
          skippedTutorials: [],
          showTooltips: true,
          isFirstTimeUser: true
        });
      } else {
        try {
          const parsedState = JSON.parse(saved);
          console.log('🎓 Existing user, loading tutorial state:', user._id, parsedState);
          setTutorialState(parsedState);
        } catch (error) {
          console.log('🎓 Error parsing saved state, resetting:', error);
          setTutorialState({
            isActive: false,
            currentTutorial: null,
            currentStepIndex: 0,
            completedTutorials: [],
            skippedTutorials: [],
            showTooltips: true,
            isFirstTimeUser: true
          });
        }
      }
    }
  }, [user]);

  // Check for auto-trigger tutorials on page change and user login
  useEffect(() => {
    if (user && tutorialState.isFirstTimeUser && !tutorialState.isActive) {
      // Add delay to ensure page is fully loaded
      const timer = setTimeout(() => {
        console.log('🎓 Checking tutorial triggers:', {
          user: !!user,
          isFirstTimeUser: tutorialState.isFirstTimeUser,
          isActive: tutorialState.isActive,
          pathname: location.pathname
        });

        // Find tutorials that should auto-trigger on this page
        const availableTutorials = tutorialData
          .filter(tutorial =>
            !tutorialState.completedTutorials.includes(tutorial.id) &&
            !tutorialState.skippedTutorials.includes(tutorial.id)
          )
          .sort((a, b) => a.priority - b.priority);
        
        console.log('🎓 Available tutorials:', availableTutorials.map(t => t.id));
        
        const autoTriggerTutorial = availableTutorials.find(tutorial => {
          if (tutorial.triggerCondition === 'first_login' && tutorialState.isFirstTimeUser) {
            const matches = !tutorial.requiredPath || tutorial.requiredPath === location.pathname;
            console.log(`🎓 Checking tutorial ${tutorial.id}: first_login=${matches}`);
            return matches;
          }
          return false;
        });

        if (autoTriggerTutorial) {
          console.log('🎓 Starting tutorial:', autoTriggerTutorial.id);
          const tutorial = tutorialData.find(t => t.id === autoTriggerTutorial.id);
          if (tutorial) {
            // Navigate to required path if specified
            if (tutorial.requiredPath && location.pathname !== tutorial.requiredPath) {
              navigate(tutorial.requiredPath);
              // Wait for navigation then start tutorial
              setTimeout(() => {
                setTutorialState(prev => ({
                  ...prev,
                  isActive: true,
                  currentTutorial: tutorial,
                  currentStepIndex: 0
                }));
              }, 500);
            } else {
              setTutorialState(prev => ({
                ...prev,
                isActive: true,
                currentTutorial: tutorial,
                currentStepIndex: 0
              }));
            }
          }
        } else {
          console.log('🎓 No auto-trigger tutorial found');
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, user, tutorialState.isFirstTimeUser, tutorialState.isActive, tutorialState.completedTutorials, tutorialState.skippedTutorials, navigate]);

  const startTutorial = useCallback((tutorialId: string) => {
    const tutorial = tutorialData.find(t => t.id === tutorialId);
    if (!tutorial) return;

    // Navigate to required path if specified
    if (tutorial.requiredPath && location.pathname !== tutorial.requiredPath) {
      navigate(tutorial.requiredPath);
      // Wait for navigation then start tutorial
      setTimeout(() => {
        setTutorialState(prev => ({
          ...prev,
          isActive: true,
          currentTutorial: tutorial,
          currentStepIndex: 0
        }));
      }, 500);
    } else {
      setTutorialState(prev => ({
        ...prev,
        isActive: true,
        currentTutorial: tutorial,
        currentStepIndex: 0
      }));
    }
  }, [location.pathname, navigate]);

  const nextStep = useCallback(() => {
    setTutorialState(prev => {
      if (!prev.currentTutorial) return prev;
      
      const nextIndex = prev.currentStepIndex + 1;
      if (nextIndex >= prev.currentTutorial.steps.length) {
        // Tutorial completed
        return {
          ...prev,
          isActive: false,
          currentTutorial: null,
          currentStepIndex: 0,
          completedTutorials: [...prev.completedTutorials, prev.currentTutorial.id]
        };
      }
      
      // Check if next step requires navigation
      const nextStep = prev.currentTutorial.steps[nextIndex];
      if (nextStep.navigateTo && location.pathname !== nextStep.navigateTo) {
        navigate(nextStep.navigateTo);
        // Wait for navigation then update step
        setTimeout(() => {
          setTutorialState(current => ({
            ...current,
            currentStepIndex: nextIndex
          }));
        }, 500);
        return prev; // Return current state, will be updated after navigation
      }
      
      return {
        ...prev,
        currentStepIndex: nextIndex
      };
    });
  }, [location.pathname, navigate]);

  const previousStep = useCallback(() => {
    setTutorialState(prev => {
      if (!prev.currentTutorial || prev.currentStepIndex === 0) return prev;
      
      const prevIndex = prev.currentStepIndex - 1;
      const prevStep = prev.currentTutorial.steps[prevIndex];
      
      // Check if previous step requires navigation
      if (prevStep.navigateTo && location.pathname !== prevStep.navigateTo) {
        navigate(prevStep.navigateTo);
        // Wait for navigation then update step
        setTimeout(() => {
          setTutorialState(current => ({
            ...current,
            currentStepIndex: prevIndex
          }));
        }, 500);
        return prev; // Return current state, will be updated after navigation
      }
      
      return {
        ...prev,
        currentStepIndex: prevIndex
      };
    });
  }, [location.pathname, navigate]);

  const skipStep = useCallback(() => {
    nextStep();
  }, [nextStep]);

  const skipTutorial = useCallback(() => {
    setTutorialState(prev => {
      if (!prev.currentTutorial) return prev;
      
      return {
        ...prev,
        isActive: false,
        currentTutorial: null,
        currentStepIndex: 0,
        skippedTutorials: [...prev.skippedTutorials, prev.currentTutorial.id]
      };
    });
  }, []);

  const completeTutorial = useCallback(() => {
    setTutorialState(prev => {
      if (!prev.currentTutorial) return prev;
      
      return {
        ...prev,
        isActive: false,
        currentTutorial: null,
        currentStepIndex: 0,
        completedTutorials: [...prev.completedTutorials, prev.currentTutorial.id]
      };
    });
  }, []);

  const restartTutorial = useCallback((tutorialId: string) => {
    setTutorialState(prev => ({
      ...prev,
      completedTutorials: prev.completedTutorials.filter(id => id !== tutorialId),
      skippedTutorials: prev.skippedTutorials.filter(id => id !== tutorialId)
    }));
    startTutorial(tutorialId);
  }, [startTutorial]);

  const getAvailableTutorials = useCallback(() => {
    return tutorialData
      .filter(tutorial => 
        !tutorialState.completedTutorials.includes(tutorial.id) &&
        !tutorialState.skippedTutorials.includes(tutorial.id)
      )
      .sort((a, b) => a.priority - b.priority);
  }, [tutorialState.completedTutorials, tutorialState.skippedTutorials]);

  const getTutorialProgress = useCallback((tutorialId: string): TutorialProgress | null => {
    const tutorial = tutorialData.find(t => t.id === tutorialId);
    if (!tutorial) return null;

    const isCompleted = tutorialState.completedTutorials.includes(tutorialId);
    const isActive = tutorialState.currentTutorial?.id === tutorialId;

    return {
      tutorialId,
      currentStep: isActive ? tutorialState.currentStepIndex : 0,
      completed: isCompleted,
      startedAt: new Date(), // This would come from actual storage in real implementation
      completedAt: isCompleted ? new Date() : undefined
    };
  }, [tutorialState]);

  const toggleTooltips = useCallback(() => {
    setTutorialState(prev => ({
      ...prev,
      showTooltips: !prev.showTooltips
    }));
  }, []);

  const markFirstTimeComplete = useCallback(() => {
    setTutorialState(prev => ({
      ...prev,
      isFirstTimeUser: false
    }));
  }, []);

  const getUnlockedBadges = useCallback((): TutorialBadge[] => {
    const badges: TutorialBadge[] = [];
    
    // Award badges based on completed tutorials
    if (tutorialState.completedTutorials.length >= 1) {
      badges.push({
        id: 'first_tutorial',
        name: 'Tutorial Starter',
        description: 'Completed your first tutorial',
        icon: '🎯',
        unlockedAt: new Date()
      });
    }
    
    if (tutorialState.completedTutorials.length >= 3) {
      badges.push({
        id: 'tutorial_expert',
        name: 'Learning Expert',
        description: 'Completed 3 tutorials',
        icon: '🏆',
        unlockedAt: new Date()
      });
    }

    if (tutorialState.completedTutorials.includes('onboarding_complete')) {
      badges.push({
        id: 'onboarding_master',
        name: 'Onboarding Master',
        description: 'Completed the full onboarding experience',
        icon: '🚀',
        unlockedAt: new Date()
      });
    }

    return badges;
  }, [tutorialState.completedTutorials]);

  const checkAndTriggerTutorials = useCallback(() => {
    console.log('🎓 Checking tutorial triggers:', {
      user: !!user,
      isFirstTimeUser: tutorialState.isFirstTimeUser,
      isActive: tutorialState.isActive,
      pathname: location.pathname
    });

    if (!user || !tutorialState.isFirstTimeUser || tutorialState.isActive) {
      console.log('🎓 Tutorial trigger conditions not met');
      return;
    }

    // Find tutorials that should auto-trigger on this page
    const availableTutorials = getAvailableTutorials();
    console.log('🎓 Available tutorials:', availableTutorials.map(t => t.id));
    
    const autoTriggerTutorial = availableTutorials.find(tutorial => {
      if (tutorial.triggerCondition === 'first_login' && tutorialState.isFirstTimeUser) {
        const matches = !tutorial.requiredPath || tutorial.requiredPath === location.pathname;
        console.log(`🎓 Checking tutorial ${tutorial.id}: first_login=${matches}`);
        return matches;
      }
      if (tutorial.triggerCondition === 'page_visit' && tutorial.requiredPath === location.pathname) {
        console.log(`🎓 Checking tutorial ${tutorial.id}: page_visit=true`);
        return true;
      }
      return false;
    });

    if (autoTriggerTutorial) {
      console.log('🎓 Starting tutorial:', autoTriggerTutorial.id);
      startTutorial(autoTriggerTutorial.id);
    } else {
      console.log('🎓 No auto-trigger tutorial found');
    }
  }, [user, tutorialState.isFirstTimeUser, tutorialState.isActive, location.pathname, getAvailableTutorials, startTutorial]);

  const highlightElement = useCallback((selector: string) => {
    // Remove existing highlights
    removeHighlight();
    
    const element = document.querySelector(selector);
    if (element) {
      element.classList.add('tutorial-highlight');
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const removeHighlight = useCallback(() => {
    const highlighted = document.querySelectorAll('.tutorial-highlight');
    highlighted.forEach(el => el.classList.remove('tutorial-highlight'));
  }, []);

  // Clean up highlights when tutorial ends
  useEffect(() => {
    if (!tutorialState.isActive) {
      removeHighlight();
    }
  }, [tutorialState.isActive, removeHighlight]);

  return (
    <TutorialContext.Provider value={{
      ...tutorialState,
      startTutorial,
      nextStep,
      previousStep,
      skipTutorial,
      skipStep,
      completeTutorial,
      restartTutorial,
      getAvailableTutorials,
      getTutorialProgress,
      toggleTooltips,
      markFirstTimeComplete,
      getUnlockedBadges,
      checkAndTriggerTutorials,
      highlightElement,
      removeHighlight
    }}>
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};