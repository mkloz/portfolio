import { ElementType } from 'react';

export interface Highlight {
  title: string;
  description: string;
  icon: ElementType;
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
