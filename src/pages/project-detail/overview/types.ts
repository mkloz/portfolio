import type { LucideIcon } from 'lucide-react';

export interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  stats: string;
}

export interface ProjectOverviewProps {
  project: {
    title: string;
    description: string;
    gradient?: string;
  };
}

export interface OverviewHeaderProps {
  description: string;
  gradient?: string;
}

export interface HighlightCardProps {
  highlight: Highlight;
  index: number;
}

export interface HighlightsGridProps {
  highlights: Highlight[];
}
