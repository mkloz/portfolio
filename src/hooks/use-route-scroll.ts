import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useRouteScroll = (routeIdentity?: string) => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.documentElement.dataset.viewTransition === 'route') return;
    const behavior: ScrollBehavior = reduceMotion || !hash ? 'auto' : 'smooth';
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start', behavior });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash, pathname, routeIdentity]);
};
