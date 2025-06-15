import { Download, Github, Globe, Share2 } from 'lucide-react';

import { CallToAction } from './call-to-action';
import { OtherProjectsSection } from './other-projects-section';
import { ProjectLinksGrid } from './project-links-grid';
import { ProjectStatsFooter } from './project-stats-footer';
import { SectionHeader } from './section-header';
import type { ExploreConnectProps, ProjectLinkData } from './types';
import { UnderwaterBackground } from './underwater-background';

const PROJECT_LINKS: ProjectLinkData[] = [
  {
    title: 'Live Demo',
    description: 'Experience the full application in action',
    icon: Globe,
    href: '',
    color: 'from-blue-500 to-cyan-500',
    primary: true
  },
  {
    title: 'Source Code',
    description: 'Explore the codebase and implementation details',
    icon: Github,
    href: '',
    color: 'from-gray-700 to-gray-900',
    primary: true
  },
  {
    title: 'Share Project',
    description: 'Share this project with your network',
    icon: Share2,
    href: '#',
    color: 'from-indigo-500 to-blue-500',
    primary: false
  },
  {
    title: 'Download',
    description: 'Get the project files and run it locally',
    icon: Download,
    href: '#',
    color: 'from-green-500 to-emerald-500',
    primary: false
  }
];

export const ExploreConnect = ({ project }: ExploreConnectProps) => {
  // Update project links with actual URLs
  const projectLinks = PROJECT_LINKS.map((link) => ({
    ...link,
    href:
      link.title === 'Live Demo'
        ? project.liveDemo
        : link.title === 'Source Code'
          ? project.github[0]?.link || '#'
          : link.href
  }));

  return (
    <section className="py-20 relative overflow-hidden">
      <UnderwaterBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader />
          <ProjectLinksGrid links={projectLinks} />
          <OtherProjectsSection currentProjectSlug={project.slug} />
          <CallToAction />
          <ProjectStatsFooter />
        </div>
      </div>
    </section>
  );
};
