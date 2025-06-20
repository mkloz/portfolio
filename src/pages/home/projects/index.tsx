import { ProjectService } from '@/services/project.service';

import { SectionDivider } from '../../../components/common/section-divider';
import { SectionTitle } from '../../../components/common/section-title';
import { Separator } from '../../../components/ui/separator';
import { ProjectsBackgroundElements } from './background-elements';
import { FeaturedProjectCard } from './featured-project-card';
import { OtherProjectCard } from './other-project-card';

export const Projects = () => {
  const projects = ProjectService.getAllProjects();
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured).slice(0, 3);

  return (
    <section id="projects" className="py-10 md:py-16 relative overflow-hidden">
      <ProjectsBackgroundElements />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="My Projects" backgroundTitle="PROJECTS" />

        <SectionDivider />

        <div className="mb-16">
          <div className="grid gap-24 max-w-7xl mx-auto">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-16 gap-2 items-center w-full max-w-full overflow-hidden">
          <Separator className="flex-1" />
          <div className="text-muted-foreground font-bold text-sm text-center border p-2 px-3 rounded-full whitespace-nowrap">
            MORE PROJECTS
          </div>
          <Separator className="flex-1" />
        </div>

        <div className="mb-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {otherProjects.map((project) => (
              <OtherProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
