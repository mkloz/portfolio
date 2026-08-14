import { ME } from './me';
import { projectSummaries } from './project-summaries';

export const SITE_URL = 'https://www.mkloz.com';
export const SITE_NAME = 'Mykhailo Kloz';
export const SITE_DESCRIPTION =
  'Mykhailo Kloz is a full-stack developer building clear product interfaces, dependable APIs, data systems, and production-ready software.';
export const SITE_IMAGE = `${SITE_URL}/social-card.png`;
const PERSON_IMAGE = `${SITE_URL}/editorial/portrait-screenprint-480.webp`;

export interface DiscoveryRoute {
  path: string;
  title: string;
  description: string;
  image: string;
  indexable: boolean;
  kind: 'home' | 'project' | 'utility' | 'not-found';
  projectSlug?: string;
}

const absoluteUrl = (value: string) => (value.startsWith('http') ? value : `${SITE_URL}${value}`);

export const discoveryRoutes: DiscoveryRoute[] = [
  {
    path: '/',
    title: `${SITE_NAME} — Full-Stack Developer`,
    description: SITE_DESCRIPTION,
    image: SITE_IMAGE,
    indexable: true,
    kind: 'home'
  },
  ...projectSummaries.map((project) => ({
    path: `/projects/${project.slug}`,
    title: `${project.title} case study | ${SITE_NAME}`,
    description: project.description,
    image: absoluteUrl(typeof project.image === 'string' ? project.image : project.image.dark),
    indexable: true,
    kind: 'project' as const,
    projectSlug: project.slug
  })),
  {
    path: '/contact/success',
    title: `Message received — ${SITE_NAME}`,
    description: 'Your message has been delivered to Mykhailo Kloz.',
    image: SITE_IMAGE,
    indexable: false,
    kind: 'utility'
  }
];

export const notFoundDiscoveryRoute: DiscoveryRoute = {
  path: '/404',
  title: `Page not found — ${SITE_NAME}`,
  description: 'This route does not connect to the portfolio.',
  image: SITE_IMAGE,
  indexable: false,
  kind: 'not-found'
};

export const getDiscoveryRoute = (pathname: string): DiscoveryRoute =>
  discoveryRoutes.find((route) => route.path === pathname.replace(/\/$/u, '') || route.path === pathname) ??
  notFoundDiscoveryRoute;

export const getDiscoveryStructuredData = (route: DiscoveryRoute): Record<string, unknown>[] => {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: ME.name,
    url: SITE_URL,
    image: PERSON_IMAGE,
    jobTitle: ME.title,
    sameAs: [ME.social.github, ME.social.linkedin]
  };

  if (route.kind === 'home') {
    return [
      person,
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        author: { '@type': 'Person', name: ME.name }
      }
    ];
  }

  if (route.kind === 'project' && route.projectSlug) {
    const project = projectSummaries.find((item) => item.slug === route.projectSlug);
    if (project) {
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: project.title,
          description: project.description,
          url: `${SITE_URL}${route.path}`,
          image: route.image,
          dateCreated: String(project.year),
          author: { '@type': 'Person', name: ME.name, url: SITE_URL },
          programmingLanguage: project.technologies,
          codeRepository: project.github.map((repository) => repository.link)
        }
      ];
    }
  }

  return [];
};
