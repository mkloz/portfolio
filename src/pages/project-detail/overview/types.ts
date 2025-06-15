import type { LucideIcon } from 'lucide-react';

import type { ButtonGradient } from '@/components/ui/button';

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
    gradient: ButtonGradient;
    highlights: Highlight[];
  };
}

export interface OverviewHeaderProps {
  description: string;
  gradient: ButtonGradient;
}

export interface HighlightCardProps {
  highlight: Highlight;
  index: number;
}

export interface HighlightsGridProps {
  highlights: Highlight[];
}
