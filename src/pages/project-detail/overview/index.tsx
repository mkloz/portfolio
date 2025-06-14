import { Palette, Rocket, Shield, Zap } from 'lucide-react';

import { Project } from '../../../data/projects';
import { HighlightsGrid } from './highlights-grid';
import { OverviewBackground } from './overview-background';
import { OverviewHeader } from './overview-header';
import type { Highlight } from './types';

// Define highlights array outside component to prevent recreation on each render
const PROJECT_HIGHLIGHTS: Highlight[] = [
  {
    icon: Zap,
    title: 'Performance First',
    description: 'Optimized for speed with lazy loading, code splitting, and efficient caching strategies',
    color: 'from-yellow-400 to-orange-500',
    stats: '< 3s load time'
  },
  {
    icon: Shield,
    title: 'Security Focused',
    description: 'Implemented JWT authentication, input validation, and secure payment processing',
    color: 'from-green-400 to-emerald-500',
    stats: 'Zero vulnerabilities'
  },
  {
    icon: Palette,
    title: 'Modern Design',
    description: 'Clean, responsive interface with accessibility compliance and smooth animations',
    color: 'from-purple-400 to-pink-500',
    stats: 'WCAG 2.1 AA'
  },
  {
    icon: Rocket,
    title: 'Scalable Architecture',
    description: 'Built with microservices approach, containerized deployment, and cloud infrastructure',
    color: 'from-blue-400 to-cyan-500',
    stats: 'Auto-scaling'
  }
];

interface ProjectOverviewProps {
  project: Project;
}

export const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  return (
    <section className="py-20 relative overflow-hidden" id="overview">
      <OverviewBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <OverviewHeader description={project.description} gradient={project.gradient} />

          <HighlightsGrid highlights={PROJECT_HIGHLIGHTS} />
        </div>
      </div>
    </section>
  );
};
