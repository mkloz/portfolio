import type { FC } from 'react';

import type { Project } from '../../../data/projects';
import { HighlightsGrid } from './highlights-grid';
import { OverviewBackground } from './overview-background';
import { OverviewHeader } from './overview-header';

interface ProjectOverviewProps {
  project: Project;
}

export const ProjectOverview: FC<ProjectOverviewProps> = ({ project }) => {
  // Add comprehensive safety checks
  if (!project) {
    console.warn('ProjectOverview: No project data provided');
    return null;
  }

  // Use project-specific highlights
  const validHighlights = Array.isArray(project.highlights) ? project.highlights : [];

  return (
    <section className="py-20 relative overflow-hidden" id="overview">
      <OverviewBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <OverviewHeader
            description={project.description || 'No description available'}
            gradient={project.gradient || 'blue'}
          />

          {validHighlights.length > 0 && <HighlightsGrid highlights={validHighlights} />}
        </div>
      </div>
    </section>
  );
};
