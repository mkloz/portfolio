import { useCallback } from 'react';

export const useScrollIntoView = (callback?: () => void) => {
  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        window.history.replaceState(null, '', `${window.location.pathname}#${sectionId}`);
        callback?.();
      }
    },
    [callback]
  );

  return scrollToSection;
};
