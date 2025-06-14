import type { LucideIcon } from 'lucide-react';

export interface ProjectLinkData {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
  primary: boolean;
}

export interface ProjectStats {
  value: string;
  label: string;
  gradient: string;
}

export interface ExploreConnectProps {
  project: {
    title: string;
    liveDemo: string;
    github: string;
    slug: string;
  };
}

export interface OtherProjectsProps {
  currentProjectSlug: string;
}
