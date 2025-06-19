import type { LucideIcon } from 'lucide-react';

import { GitHubLink, Project } from '../../../data/projects';

export interface ProjectLinkData {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
  primary: boolean;
  github?: GitHubLink[];
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
