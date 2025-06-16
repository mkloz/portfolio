export interface KeyDecision {
  decision: string;
  reasoning: string;
}

export interface DevelopmentStep {
  id: string;
  title: string;
  duration: string;
  technologies: string[];
  decisions: KeyDecision[];
  achievements: string[];
}

export interface DevelopmentJourney {
  steps: DevelopmentStep[];
}

export interface TechnicalArchitectureProps {
  developmentJourney: DevelopmentJourney;
}

export interface StepTimelineProps {
  steps: DevelopmentStep[];
  activeStep: number;
  onStepClick: (index: number) => void;
}

export interface StepCardProps {
  step: DevelopmentStep;
  isActive: boolean;
  stepNumber: number;
}

export interface StepIconProps {
  stepId: string;
  isActive: boolean;
  isCompleted: boolean;
}
