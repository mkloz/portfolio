export type ProjectCategory = 'Full-Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'Desktop' | 'AI' | 'DevOps' | 'Other';

export type TechnologyCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools' | 'Full-Stack';

export interface ProjectSummary {
  title: string;
  slug: string;
  description: string;
  image: { dark: string; light: string } | string;
  secondaryImage?: string;
  technologies: string[];
  github: { name: string; link: string }[];
  year: number;
  category: ProjectCategory;
  evidenceCategories: TechnologyCategory[];
}

/** Recruiter-facing order, strongest evidence first. */
export const projectSummaries: ProjectSummary[] = [
  {
    title: 'UEvent',
    slug: 'uevent',
    description: 'An event platform where people can find events, buy tickets, and get updates as plans change.',
    image: {
      dark: '/editorial/uevent-dark.webp',
      light: '/editorial/uevent-dark.webp'
    },
    secondaryImage: '/editorial/uevent-introduction.webp',
    technologies: ['Nest.js', 'React', 'PostgreSQL', 'TS', 'Prisma'],
    github: [
      { name: 'Frontend', link: 'https://github.com/mkloz/uevent-frontend' },
      { name: 'Backend', link: 'https://github.com/mkloz/uevent-backend' }
    ],
    year: 2025,
    category: 'Full-Stack',
    evidenceCategories: ['Full-Stack', 'DevOps', 'Frontend', 'Database', 'Backend', 'Tools']
  },
  {
    title: 'Webster',
    slug: 'webster',
    description: 'A browser-based design tool for creating and exporting visual work on a flexible canvas.',
    image: {
      dark: '/project-previews/webster-dark.webp',
      light: '/project-previews/webster-light.webp'
    },
    secondaryImage: '/project-previews/webster-introduction.webp',
    technologies: ['React', 'Konva', 'Nest.js', 'PostgreSQL', 'TypeScript'],
    github: [
      { name: 'Frontend', link: 'https://github.com/mkloz/webster-frontend' },
      { name: 'Backend', link: 'https://github.com/mkloz/webster-backend' }
    ],
    year: 2025,
    category: 'Full-Stack',
    evidenceCategories: ['Full-Stack', 'DevOps', 'Frontend', 'Database', 'Backend', 'Tools']
  },
  {
    title: 'Chronos',
    slug: 'chronos',
    description: 'A calendar app for planning events and sharing schedules with other people.',
    image: {
      light: '/project-previews/chronos-light.webp',
      dark: '/project-previews/chronos-dark.webp'
    },
    secondaryImage: '/project-previews/chronos-introduction.webp',
    technologies: ['React', 'Nest.js', 'PostgreSQL', 'TS', 'Prisma'],
    github: [
      { name: 'Frontend', link: 'https://github.com/mkloz/chronos-frontend' },
      { name: 'Backend', link: 'https://github.com/mkloz/chronos-backend' }
    ],
    year: 2025,
    category: 'Full-Stack',
    evidenceCategories: ['Full-Stack', 'DevOps', 'Frontend', 'Database', 'Backend', 'Tools']
  },
  {
    title: 'Usof',
    slug: 'usof',
    description: 'A community app for publishing posts, joining discussions, and voting on what matters.',
    image: {
      dark: '/project-previews/usof-dark.webp',
      light: '/project-previews/usof-light.webp'
    },
    secondaryImage: '/project-previews/usof-introduction.webp',
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'TypeScript'],
    github: [
      { name: 'Frontend', link: 'https://github.com/mkloz/usof-frontend' },
      { name: 'Backend', link: 'https://github.com/mkloz/usof-backend' }
    ],
    year: 2024,
    category: 'Full-Stack',
    evidenceCategories: ['Full-Stack', 'DevOps', 'Frontend', 'Database', 'Backend', 'Tools']
  },
  {
    title: 'Portfolio',
    slug: 'portfolio',
    description:
      'This portfolio, built to make my work easy to explore through case studies, demos, and project notes.',
    image: {
      light: '/project-previews/portfolio-light.webp',
      dark: '/project-previews/portfolio-dark.webp'
    },
    secondaryImage: '/project-previews/portfolio-404.webp',
    technologies: ['React', 'TS', 'Tailwind CSS', 'ShadCN', 'Vite', 'Cloudflare Pages', 'GitHub Actions'],
    github: [{ name: 'Portfolio Frontend', link: 'https://github.com/mkloz/portfolio' }],
    year: 2025,
    category: 'Frontend',
    evidenceCategories: ['Full-Stack', 'Frontend', 'DevOps', 'Tools']
  },
  {
    title: 'Citywheels',
    slug: 'citywheels',
    description: 'An online shop for browsing vehicles, checking out, and managing products and orders.',
    image: '/project-previews/citywheels-hero.webp',
    secondaryImage: '/project-previews/citywheels-auth.webp',
    technologies: ['Next.js', 'React', 'NestJS', 'MySQL', 'TypeScript'],
    github: [
      { name: 'Frontend', link: 'https://github.com/mkloz/citywheels-frontend' },
      { name: 'Backend API', link: 'https://github.com/mkloz/citywheels-backend' }
    ],
    year: 2023,
    category: 'Full-Stack',
    evidenceCategories: ['Full-Stack', 'DevOps', 'Frontend', 'Database', 'Backend', 'Tools']
  }
];

export const getProjectSummaryBySlug = (slug: string) => projectSummaries.find((project) => project.slug === slug);

export const getProjectPriorityRank = (slug: string) =>
  projectSummaries.findIndex((project) => project.slug === slug) + 1;

export const getNextPriorityProject = (slug: string) => {
  const currentIndex = projectSummaries.findIndex((project) => project.slug === slug);
  if (currentIndex < 0) return undefined;
  return projectSummaries[(currentIndex + 1) % projectSummaries.length];
};

const RESPONSIVE_IMAGE_ROOTS = ['/project-previews/', '/project-media/', '/editorial/uevent-'] as const;

export const getResponsiveImageSrcSet = (src: string) => {
  if (!src.endsWith('.webp') || !RESPONSIVE_IMAGE_ROOTS.some((root) => src.startsWith(root))) return undefined;
  return `${src.replace(/\.webp$/, '-480.webp')} 480w, ${src} 960w`;
};

export const getSmallImageSrc = (src: string) =>
  getResponsiveImageSrcSet(src) ? src.replace(/\.webp$/, '-480.webp') : src;
