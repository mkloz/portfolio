'use client';

import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { Project } from '@/data/projects';
import { ProjectService } from '@/services/project.service';

import { OtherProjectCard } from './other-project-card';
import type { OtherProjectsProps } from './types';

export const OtherProjectsSection = ({ currentProjectSlug }: OtherProjectsProps) => {
  const [otherProjects, setOtherProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Get all projects except the current one
    const allProjects = ProjectService.getAllProjects().filter((project) => project.slug !== currentProjectSlug);

    // Shuffle and take 3 random projects
    const shuffled = [...allProjects].sort(() => Math.random() - 0.5);
    setOtherProjects(shuffled.slice(0, 3));
  }, [currentProjectSlug]);

  if (otherProjects.length === 0) {
    return null;
  }

  return (
    <div className="pt-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-2xl font-bold text-white">Explore More Projects</h3>
          <Sparkles className="w-5 h-5 text-cyan-400" />
        </div>
        <p className="text-cyan-100/80 max-w-md mx-auto">Discover other exciting projects from my portfolio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {otherProjects.map((project) => (
          <OtherProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
};
