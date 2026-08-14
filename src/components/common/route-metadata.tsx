import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getDiscoveryRoute, getDiscoveryStructuredData, SITE_NAME, SITE_URL } from '@/data/discovery';

const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = content;
};

export const RouteMetadata = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const route = getDiscoveryRoute(pathname);
    const canonicalPath = route.kind === 'not-found' ? pathname : route.path;
    const canonicalUrl = new URL(canonicalPath, SITE_URL).href;
    const robots = route.indexable ? 'index, follow' : 'noindex, nofollow, noarchive';

    document.title = route.title;
    setMeta('name', 'description', route.description);
    setMeta('name', 'robots', robots);
    setMeta('property', 'og:type', route.kind === 'project' ? 'article' : 'website');
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:title', route.title);
    setMeta('property', 'og:description', route.description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', route.image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', route.title);
    setMeta('name', 'twitter:description', route.description);
    setMeta('name', 'twitter:image', route.image);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;

    let structuredData = document.head.querySelector<HTMLScriptElement>('#portfolio-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'portfolio-structured-data';
      structuredData.type = 'application/ld+json';
      document.head.append(structuredData);
    }
    structuredData.textContent = JSON.stringify(getDiscoveryStructuredData(route));
  }, [pathname]);

  return null;
};
