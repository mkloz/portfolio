import { DevelopmentJourney, DevelopmentStep } from '../../../data/projects';
import { STEP_ICONS } from './step-icon';

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
  stepId: keyof typeof STEP_ICONS;
  isActive: boolean;
  isCompleted: boolean;
}
