import { cn } from '@/lib/utils';

import { ProjectLinkCard } from './project-link-card';
import type { ProjectLinkData } from './types';

interface ProjectLinksGridProps {
  links: ProjectLinkData[];
  className?: string;
}

export const ProjectLinksGrid = ({ links, className }: ProjectLinksGridProps) => {
  return (
    <div className={cn(className)}>
      <h3 className="text-2xl font-bold text-center mb-8 text-blue-50 drop-shadow">Explore the Project</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {links.map((link, index) => (
          <ProjectLinkCard key={index} link={link} />
        ))}
      </div>
    </div>
  );
};
