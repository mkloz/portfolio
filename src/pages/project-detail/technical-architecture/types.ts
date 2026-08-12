import type { DevelopmentJourney, DevelopmentStep, DevelopmentStepId } from '../../../data/projects';

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
  stepId: DevelopmentStepId;
  isActive: boolean;
  isCompleted: boolean;
}
