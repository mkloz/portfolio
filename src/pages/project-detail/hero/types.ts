import type { IconType } from 'react-icons';

export interface Technology {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps';
  icon: IconType;
  color: string;
}

export interface ProjectStats {
  technologies: string;
  features: string;
  linesOfCode: string;
  commits: string;
}

export interface ProjectHeroData {
  title: string;
  tagline: string;
  longDescription: string;
  heroImage: string;
  liveDemo: string;
  github: string;
  website: string;
  year: number;
  status: string;
  category: string;
  duration: string;
  stats: ProjectStats;
  technologies: string[]; // Added this property
}

export interface CircuitPath {
  id: string;
  d: string;
  gradient: string;
}

export interface CircuitNode {
  cx: number;
  cy: number;
  fill: string;
}
