import type { Project } from '../../../data/projects';
import { HighlightsGrid } from './highlights-grid';
import { OverviewBackground } from './overview-background';
import { OverviewHeader } from './overview-header';

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

          <HighlightsGrid highlights={project.highlights} />
        </div>
      </div>
    </section>
  );
};
