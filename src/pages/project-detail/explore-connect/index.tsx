import { CallToAction } from './call-to-action';
import { OtherProjectsSection } from './other-projects-section';
import { ProjectLinksGrid } from './project-links-grid';
import { ProjectStatsFooter } from './project-stats-footer';
import { SectionHeader } from './section-header';
import type { ExploreConnectProps } from './types';
import { UnderwaterBackground } from './underwater-background';

export const ExploreConnect = ({ project }: ExploreConnectProps) => {
  return (
    <section className="py-20 relative overflow-hidden" id="share" data-scroll-section>
      <UnderwaterBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader />
          <ProjectLinksGrid website={project.liveDemo} github={project.github} />
          <OtherProjectsSection currentProjectSlug={project.slug} />
          <CallToAction />
          <ProjectStatsFooter />
        </div>
      </div>
    </section>
  );
};
