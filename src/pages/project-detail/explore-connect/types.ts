import type { LucideIcon } from 'lucide-react';

import { Project } from '../../../data/projects';

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
  project: Project;
}

export interface OtherProjectsProps {
  currentProjectSlug: string;
}
