import { useCallback } from 'react';

export const useScrollIntoView = (callback?: () => void) => {
  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        callback?.();
      }
    },
    [callback]
  );

  return scrollToSection;
};
