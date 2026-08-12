import type { ElementType } from 'react';

import type { Technology } from '../technologies';
import { chronosProject } from './chronos';
import { citywheelsProject } from './citywheels';
import { portfolioProject } from './portfolio';
import { ueventProject } from './uevent';
import { usofProject } from './usof';
import { websterProject } from './webster';

// Type definitions that match your actual project structure
export interface GitHubLink {
  name: string;
  link: string;
}

export interface KeyDecision {
  decision: string;
  reasoning: string;
}

export type DevelopmentStepId =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'deployment'
  | 'mobile'
  | 'testing'
  | 'devops'
  | 'api'
  | 'auth'
  | 'optimization'
  | 'payment'
  | 'design'
  | 'documentation'
  | 'planning';

export interface DevelopmentStep {
  id: DevelopmentStepId;
  title: string;
  duration: string;
  technologies?: string[];
  decisions: KeyDecision[];
  achievements: string[];
}

export interface DevelopmentJourney {
  steps: DevelopmentStep[];
}

export interface GalleryItem {
  title: string;
  image: string;
}

export interface ProjectStats {
  linesOfCode: string;
  commits: string;
  features: string;
  technologies: string;
}

export type ButtonGradient = 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'violet';

export interface ProjectHighlight {
  title: string;
  description: string;
  icon: ElementType;
  color: string;
  stats: string;
}

export interface Demo {
  link: string;
  device: 'desktop' | 'mobile' | 'tablet' | 'laptop';
  length: string;
  preview?: string;
}

export interface Project {
  // Basic info
  title: string;
  slug: string;
  description: string;
  image:
    | {
        dark: string;
        light: string;
      }
    | string;
  technologies: string[];
  liveDemo?: string;
  github: GitHubLink[];
  website?: string;
  featured: boolean;
  gradient: ButtonGradient;
  year: number;
  progress: number;

  // Detailed info
  tagline: string;
  longDescription: string;
  status: 'In Progress' | 'Completed' | 'Maintenance';
  category: 'Full-Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'Desktop' | 'AI' | 'DevOps' | 'Other';
  duration: string;

  // Technical details
  detailedTechnologies: Technology[];
  developmentJourney: DevelopmentJourney;
  gallery: GalleryItem[];
  stats: ProjectStats;
  highlights: ProjectHighlight[];
  demo?: Demo[];
}

// Export all projects - Portfolio first as it's the current project
export const projects: Project[] = [
  ueventProject,
  websterProject,
  chronosProject,
  usofProject,
  portfolioProject,
  citywheelsProject
];

export default projects;
