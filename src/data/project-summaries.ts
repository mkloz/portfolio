export type ProjectCategory = 'Full-Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'Desktop' | 'AI' | 'DevOps' | 'Other';

export type TechnologyCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools' | 'Full-Stack';

export interface ProjectSummary {
  title: string;
  slug: string;
  description: string;
  image: { dark: string; light: string } | string;
  secondaryImage?: string;
  technologies: string[];
  github: { name: string; link: string; private?: boolean }[];
  year: number;
  /**
   * Lines in the project's repositories, counted the same way for each: tracked
   * TypeScript, JavaScript, CSS, and Prisma source and tests, without blank or
   * comment-only lines, generated files, dependencies, assets, or build output.
   */
  linesOfCode: string;
  category: ProjectCategory;
  evidenceCategories: TechnologyCategory[];
}

/** Recruiter-facing order, strongest evidence first. */
export const projectSummaries: ProjectSummary[] = [
  {
    title: 'Findafew',
    slug: 'findafew',
    description:
      'A social planning app that matches people into small groups by personality and interests. Built solo, with real-time chat, AI-assisted moderation, and 3,000+ automated tests.',
    image: {
      dark: '/project-previews/findafew-dark.webp',
      light: '/project-previews/findafew-light.webp'
    },
    secondaryImage: '/project-previews/findafew-introduction.webp',
    technologies: ['React', 'NestJS', 'PostgreSQL', 'Socket.IO', 'OpenAI API'],
    github: [
      { name: 'Frontend', link: 'https://github.com/mkloz/findafew-frontend', private: true },
      { name: 'Backend', link: 'https://github.com/mkloz/findafew-backend', private: true }
    ],
    year: 2026,
    linesOfCode: '533k',
    category: 'Full-Stack',
    evidenceCategories: ['Full-Stack', 'Frontend', 'Backend', 'Database', 'DevOps', 'Tools']
  },
  {
    title: 'UEvent',
    slug: 'uevent',
    description:
      'An event platform where people find events on a map and buy tickets, and organisers get paid through their own Stripe accounts.',
    image: {
      dark: '/editorial/uevent-dark.webp',
      light: '/editorial/uevent-dark.webp'
    },
    secondaryImage: '/editorial/uevent-introduction.webp',
    technologies: ['React', 'NestJS', 'PostgreSQL', 'Stripe', 'Google Maps API'],
    github: [
      { name: 'Frontend', link: 'https://github.com/mkloz/uevent-frontend' },
      { name: 'Backend', link: 'https://github.com/mkloz/uevent-backend' }
    ],
    year: 2025,
    linesOfCode: '28.7k',
    category: 'Full-Stack',
    evidenceCategories: ['Full-Stack', 'DevOps', 'Frontend', 'Database', 'Backend', 'Tools']
  },
  {
    title: 'Webster',
    slug: 'webster',
    description:
      'A browser design editor built on Konva: draw, lay out images and text, undo anything, and export to PNG, JPG, or PDF.',
    image: {
      dark: '/project-previews/webster-dark.webp',
      light: '/project-previews/webster-light.webp'
    },
    secondaryImage: '/project-previews/webster-introduction.webp',
    technologies: ['React', 'Konva', 'NestJS', 'PostgreSQL', 'AWS S3'],
    github: [
      { name: 'Frontend', link: 'https://github.com/mkloz/webster-frontend' },
      { name: 'Backend', link: 'https://github.com/mkloz/webster-backend' }
    ],
    year: 2025,
    linesOfCode: '19.4k',
    category: 'Full-Stack',
    evidenceCategories: ['Full-Stack', 'DevOps', 'Frontend', 'Database', 'Backend', 'Tools']
  },
  {
    title: 'Chronos',
    slug: 'chronos',
    description:
      'A shared calendar with drag-and-drop scheduling, recurring events, role-based sharing, and public holidays imported for any country.',
    image: {
      light: '/project-previews/chronos-light.webp',
      dark: '/project-previews/chronos-dark.webp'
    },
    secondaryImage: '/project-previews/chronos-introduction.webp',
    technologies: ['React', 'NestJS', 'PostgreSQL', 'Redis', 'Prisma'],
    github: [
      { name: 'Frontend', link: 'https://github.com/mkloz/chronos-frontend' },
      { name: 'Backend', link: 'https://github.com/mkloz/chronos-backend' }
    ],
    year: 2025,
    linesOfCode: '14.9k',
    category: 'Full-Stack',
    evidenceCategories: ['Full-Stack', 'DevOps', 'Frontend', 'Database', 'Backend', 'Tools']
  },
  {
    title: 'Usof',
    slug: 'usof',
    description:
      'A community forum for posts, comments, and voting, on a hand-built Express API with database-level karma and automated backups.',
    image: {
      dark: '/project-previews/usof-dark.webp',
      light: '/project-previews/usof-light.webp'
    },
    secondaryImage: '/project-previews/usof-introduction.webp',
    technologies: ['React', 'Express', 'MySQL', 'Prisma', 'TypeScript'],
    github: [
      { name: 'Frontend', link: 'https://github.com/mkloz/usof-frontend' },
      { name: 'Backend', link: 'https://github.com/mkloz/usof-backend' }
    ],
    year: 2024,
    linesOfCode: '12.9k',
    category: 'Full-Stack',
    evidenceCategories: ['Full-Stack', 'DevOps', 'Frontend', 'Database', 'Backend', 'Tools']
  },
  {
    title: 'Citywheels',
    slug: 'citywheels',
    description:
      'A vehicle web store with a Next.js storefront and a NestJS API, deployed by a pipeline that tests against a real MySQL database first.',
    image: '/project-previews/citywheels-hero.webp',
    secondaryImage: '/project-previews/citywheels-auth.webp',
    technologies: ['Next.js', 'NestJS', 'MySQL', 'GitHub Actions', 'Docker'],
    github: [
      { name: 'Frontend', link: 'https://github.com/mkloz/citywheels-frontend' },
      { name: 'Backend API', link: 'https://github.com/mkloz/citywheels-backend' }
    ],
    year: 2023,
    linesOfCode: '18.4k',
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
