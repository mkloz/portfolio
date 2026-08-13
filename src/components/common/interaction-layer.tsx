import { useEffect } from 'react';

const MAGNETIC_STRENGTH = 0.12;
const HOVER_SELECTOR = 'a, button, [data-reactive]';

export const InteractionLayer = () => {
  useEffect(() => {
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointerQuery.matches || reduceMotionQuery.matches) return;

    const resetMagnet = (element: HTMLElement) => {
      element.style.setProperty('--magnetic-x', '0px');
      element.style.setProperty('--magnetic-y', '0px');
    };

    const resetDepth = (element: HTMLElement) => {
      element.style.setProperty('--depth-x', '0deg');
      element.style.setProperty('--depth-y', '0deg');
    };

    const resetEvidence = (element: HTMLElement) => {
      element.style.setProperty('--evidence-x', '50%');
      element.style.setProperty('--evidence-y', '50%');
    };

    const resetHover = (element: HTMLElement) => {
      element.removeAttribute('data-hover-active');
      element.style.setProperty('--hover-x', '50%');
      element.style.setProperty('--hover-y', '50%');
      element.style.setProperty('--hover-shift-x', '0px');
      element.style.setProperty('--hover-shift-y', '0px');
    };

    const onPointerMove = (event: PointerEvent) => {
      const hoverElement = event.target instanceof Element ? event.target.closest<HTMLElement>(HOVER_SELECTOR) : null;
      if (hoverElement) {
        const bounds = hoverElement.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / Math.max(bounds.width, 1)));
        const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / Math.max(bounds.height, 1)));
        hoverElement.setAttribute('data-hover-active', 'true');
        hoverElement.style.setProperty('--hover-x', `${x * 100}%`);
        hoverElement.style.setProperty('--hover-y', `${y * 100}%`);
        hoverElement.style.setProperty('--hover-shift-x', `${(x - 0.5) * 4}px`);
        hoverElement.style.setProperty('--hover-shift-y', `${(y - 0.5) * 3}px`);
      }
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-magnetic]') : null;
      if (element) {
        const bounds = element.getBoundingClientRect();
        element.style.setProperty(
          '--magnetic-x',
          `${(event.clientX - (bounds.left + bounds.width / 2)) * MAGNETIC_STRENGTH}px`
        );
        element.style.setProperty(
          '--magnetic-y',
          `${(event.clientY - (bounds.top + bounds.height / 2)) * MAGNETIC_STRENGTH}px`
        );
      }

      const depthElement = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-depth]') : null;
      if (depthElement) {
        const bounds = depthElement.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        depthElement.style.setProperty('--depth-x', `${y * -1.8}deg`);
        depthElement.style.setProperty('--depth-y', `${x * 2.2}deg`);
      }

      const evidenceElement =
        event.target instanceof Element ? event.target.closest<HTMLElement>('[data-evidence]') : null;
      if (evidenceElement) {
        const bounds = evidenceElement.getBoundingClientRect();
        evidenceElement.style.setProperty('--evidence-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
        evidenceElement.style.setProperty('--evidence-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-magnetic]') : null;
      const related = event.relatedTarget instanceof Element ? event.relatedTarget : null;
      const hoverElement = event.target instanceof Element ? event.target.closest<HTMLElement>(HOVER_SELECTOR) : null;
      if (hoverElement && !related?.closest(HOVER_SELECTOR)?.isSameNode(hoverElement)) resetHover(hoverElement);
      if (element && !related?.closest('[data-magnetic]')?.isSameNode(element)) resetMagnet(element);
      const depthElement = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-depth]') : null;
      if (depthElement && !related?.closest('[data-depth]')?.isSameNode(depthElement)) resetDepth(depthElement);
      const evidenceElement =
        event.target instanceof Element ? event.target.closest<HTMLElement>('[data-evidence]') : null;
      if (evidenceElement && !related?.closest('[data-evidence]')?.isSameNode(evidenceElement)) {
        resetEvidence(evidenceElement);
      }
    };

    const updateVisibility = () => {
      document.documentElement.dataset.pageVisibility = document.hidden ? 'hidden' : 'visible';
    };

    updateVisibility();
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  return null;
};
