import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  createLiveDisplacementAssembly,
  type DisplacementAssemblyInstance,
  type DisplacementPattern
} from '../canvasui/DisplacementAssembly';

type SectionConfig = {
  pattern: DisplacementPattern;
  grid: number;
  shift: number;
  scramble: number;
};

const DEFAULT_CONFIG: SectionConfig = {
  pattern: 'blocks',
  grid: 18,
  shift: 1,
  scramble: 1
};

const SECTION_CONFIGS: Record<string, SectionConfig> = {
  projects: { pattern: 'slices', grid: 20, shift: 1.08, scramble: 1 },
  lab: { pattern: 'layers', grid: 14, shift: 1, scramble: 0.94 },
  skills: { pattern: 'blocks', grid: 18, shift: 1.04, scramble: 0.94 },
  contact: { pattern: 'layers', grid: 14, shift: 0.96, scramble: 0.9 }
};

const TRANSITION_PRELOAD_MARGIN = '0px 0px 65% 0px';

export const SectionTransitions = () => {
  const location = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    let routeObserver: MutationObserver | undefined;
    let cancelled = false;
    let processing = false;
    let activeInstance: DisplacementAssemblyInstance | null = null;
    const queuedSections: HTMLElement[] = [];
    const seenSections = new Set<HTMLElement>();

    const revealImmediately = (section: HTMLElement) => {
      section.dataset.sectionMotion = 'visible';
    };

    const assembleSection = async (section: HTMLElement) => {
      if (cancelled || !section.isConnected) return;
      const config = SECTION_CONFIGS[section.id] ?? DEFAULT_CONFIG;

      try {
        section.dataset.sectionMotion = 'capturing';
        const compact = window.innerWidth < 640;
        const instance = createLiveDisplacementAssembly(section, {
          duration: compact ? 1120 : 1380,
          grid: compact ? Math.max(10, Math.round(config.grid * 0.72)) : config.grid,
          cellAspect: 1,
          relaxation: compact ? 0.88 : 0.9,
          shift: config.shift,
          aberration: 1.5,
          grain: 0.1,
          grainSize: 1,
          grainSpeed: 1,
          scramble: config.scramble,
          pattern: config.pattern
        });

        if (!instance) {
          revealImmediately(section);
          return;
        }

        activeInstance = instance;
        await instance.ready;
        if (cancelled || !section.isConnected) {
          instance.destroy();
          return;
        }
        section.dataset.sectionMotion = 'assembling';
        await instance.finished;
        instance.destroy();
        if (activeInstance === instance) activeInstance = null;
        revealImmediately(section);
      } catch (error) {
        console.warn('Section distortion capture failed; revealing the live section.', error);
        activeInstance?.destroy();
        activeInstance = null;
        revealImmediately(section);
      }
    };

    const processQueue = async () => {
      if (processing) return;
      processing = true;
      while (!cancelled && queuedSections.length > 0) {
        const section = queuedSections.shift();
        if (section) await assembleSection(section);
      }
      processing = false;
    };

    const queueSection = (section: HTMLElement) => {
      if (seenSections.has(section)) return;
      seenSections.add(section);
      queuedSections.push(section);
      void processQueue();
    };

    const initialize = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]:not(#hero)'));
      if (sections.length === 0) return false;

      if (reduceMotion.matches || !('IntersectionObserver' in window) || !('WebGL2RenderingContext' in window)) {
        sections.forEach((section) => {
          section.dataset.sectionMotion = 'visible';
        });
        return true;
      }

      sections.forEach((section) => {
        section.dataset.sectionMotion = 'pending';
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const section = entry.target as HTMLElement;
            observer?.unobserve(section);
            queueSection(section);
          });
        },
        { rootMargin: TRANSITION_PRELOAD_MARGIN, threshold: 0.02 }
      );

      sections.forEach((section) => observer?.observe(section));
      return true;
    };

    const onMotionPreferenceChange = () => {
      if (!reduceMotion.matches) return;
      observer?.disconnect();
      queuedSections.length = 0;
      activeInstance?.destroy();
      activeInstance = null;
      document.querySelectorAll<HTMLElement>('main section[id]:not(#hero)').forEach(revealImmediately);
    };

    reduceMotion.addEventListener('change', onMotionPreferenceChange);

    const frame = window.requestAnimationFrame(() => {
      if (initialize()) return;
      routeObserver = new MutationObserver(() => {
        if (!initialize()) return;
        routeObserver?.disconnect();
        routeObserver = undefined;
      });
      routeObserver.observe(document.body, { childList: true, subtree: true });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      routeObserver?.disconnect();
      observer?.disconnect();
      activeInstance?.destroy();
      reduceMotion.removeEventListener('change', onMotionPreferenceChange);
    };
  }, [location.pathname]);

  return null;
};
