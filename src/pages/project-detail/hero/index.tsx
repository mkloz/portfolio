'use client';

import { cn } from '@/lib/utils';

import type { Project } from '../../../data/projects';
import { useTheme } from '../../../hooks/theme.store';
import { ActionButtons } from './action-buttons';
import { CircuitBackground } from './circuit-background';
import { HeroImage } from './hero-image';
import { ProjectContent } from './project-content';
import { ProjectMeta } from './project-meta';
import { QuickStats } from './quick-stats';

interface ProjectHeroProps {
  project: Project;
  className?: string;
}

export const ProjectHero = ({ project, className }: ProjectHeroProps) => {
  // Determine if project is online based on having a liveDemo URL
  const isOnline = Boolean(project.liveDemo);
  const theme = useTheme();
  const image =
    typeof project.image === 'object'
      ? theme.theme === 'dark'
        ? project.image.dark
        : project.image.light
      : project.image;

  return (
    <section
      className={cn('relative min-h-screen flex items-center overflow-hidden', className)}
      id="hero"
      data-scroll-section>
      <CircuitBackground />

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10 ">
        <div className="grid lg:grid-cols-2 gap-1 items-center min-h-screen py-20">
          {/* Left column - Content */}
          <div className="space-y-8 text-center lg:text-left max-w-2xl">
            <ProjectMeta
              status={project.status}
              year={project.year}
              duration={project.duration}
              category={project.category}
            />

            <ProjectContent title={project.title} tagline={project.tagline} description={project.longDescription} />

            <ActionButtons gradient={project.gradient} github={project.github} website={project.website} />

            <QuickStats stats={project.stats} />
          </div>

          {/* Right column - Hero Image */}
          <HeroImage src={image} alt={project.title} projectType={project.category} isOnline={isOnline} />
        </div>
      </div>
    </section>
  );
};
