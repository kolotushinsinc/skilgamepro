export interface TutorialStep {
  id: string;
  title: string;
  content: string;
  displayMode: 'modal' | 'tooltip'; // Modal for general info, tooltip for page interactions
  targetSelector?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  highlightElement?: boolean;
  action?: 'click' | 'hover' | 'none';
  nextOnAction?: boolean;
  skippable?: boolean;
  waitForElement?: boolean; // Wait for element to appear before showing step
  mobileContent?: string;
  mobilePosition?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  navigateTo?: string; // Path to navigate to for this step
  rewards?: TutorialReward[]; // Rewards for completing this step
}

export interface TutorialReward {
  type: 'badge' | 'experience' | 'bonus';
  value: string | number;
  description: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: TutorialCategory;
  steps: TutorialStep[];
  triggerCondition?: 'first_login' | 'manual' | 'page_visit';
  priority: number;
  requiredPath?: string;
  rewardBadge?: string;
}

export type TutorialCategory =
  | 'onboarding'
  | 'dashboard'
  | 'deposits'
  | 'games'
  | 'tournaments'
  | 'financial'
  | 'profile'
  | 'navigation'
  | 'security'
  | 'analytics';

export interface TutorialState {
  isActive: boolean;
  currentTutorial: Tutorial | null;
  currentStepIndex: number;
  completedTutorials: string[];
  skippedTutorials: string[];
  showTooltips: boolean;
  isFirstTimeUser: boolean;
}

export interface TutorialProgress {
  tutorialId: string;
  currentStep: number;
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
}

export interface TutorialBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}