import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import seoRoutes from '@/data/seo-routes.json';

type SeoProject = (typeof seoRoutes.projects)[number];

const absoluteUrl = (path: string) => new URL(path, seoRoutes.site.url).toString();

const upsertMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = content;
};

const getStructuredData = (project?: SeoProject) => {
  const author = {
    '@type': 'Person',
    name: seoRoutes.site.name,
    url: seoRoutes.site.url,
    sameAs: seoRoutes.site.sameAs
  };

  if (project) {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: project.name,
      headline: project.title,
      description: project.description,
      url: absoluteUrl(`/projects/${project.slug}`),
      image: absoluteUrl(project.image),
      dateCreated: String(project.year),
      applicationCategory: project.category,
      programmingLanguage: project.technologies,
      codeRepository: project.repository,
      author
    };
  }

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: seoRoutes.site.name,
      url: seoRoutes.site.url,
      inLanguage: seoRoutes.site.language
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: seoRoutes.site.defaultTitle,
      description: seoRoutes.site.description,
      url: seoRoutes.site.url,
      inLanguage: seoRoutes.site.language,
      mainEntity: {
        ...author,
        jobTitle: 'Full-Stack Developer',
        image: absoluteUrl('/editorial/portrait-screenprint-480.webp'),
        knowsAbout: ['Product interfaces', 'React', 'TypeScript', 'Node.js', 'APIs', 'Databases', 'DevOps']
      }
    }
  ];
};

export const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const projectSlug = pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1];
    const project = seoRoutes.projects.find((item) => item.slug === projectSlug);
    const isIndexable = pathname === '/' || Boolean(project);
    const title =
      project?.title ?? (pathname === '/' ? seoRoutes.site.defaultTitle : `Page not found — ${seoRoutes.site.name}`);
    const description = project?.description ?? seoRoutes.site.description;
    const canonicalPath = project ? `/projects/${project.slug}` : '/';
    const canonical = absoluteUrl(canonicalPath);
    const image = absoluteUrl(project?.image ?? seoRoutes.site.image);

    document.title = title;
    document.documentElement.lang = seoRoutes.site.language;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', isIndexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow');
    upsertMeta('name', 'author', seoRoutes.site.name);
    upsertMeta('property', 'og:type', project ? 'article' : 'website');
    upsertMeta('property', 'og:site_name', seoRoutes.site.name);
    upsertMeta('property', 'og:locale', seoRoutes.site.locale);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:image:alt', project ? `${project.name} project interface` : 'Mykhailo Kloz portfolio');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);
    upsertMeta('name', 'twitter:image:alt', project ? `${project.name} project interface` : 'Mykhailo Kloz portfolio');

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.append(canonicalLink);
    }
    canonicalLink.href = canonical;

    let structuredData = document.head.querySelector<HTMLScriptElement>('script[data-route-seo]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      structuredData.dataset.routeSeo = '';
      document.head.append(structuredData);
    }
    structuredData.text = JSON.stringify(getStructuredData(project));
  }, [pathname]);

  return null;
};
