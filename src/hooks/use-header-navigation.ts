import { useCallback, useEffect, useRef, useState } from 'react';

import { useScrollIntoView } from './use-scroll-into-view';

const SCROLL_THRESHOLD = 50;

export const useHeaderNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const scrollToSection = useScrollIntoView(closeMobileMenu);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    const abortController = new AbortController();

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, {
      passive: true,
      signal: abortController.signal
    });

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const main = document.querySelector('main');
    const mainWasInert = main?.hasAttribute('inert') ?? false;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    window.requestAnimationFrame(() => {
      mobileMenuRef.current?.querySelector<HTMLElement>('button, [href]')?.focus();
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
        return;
      }
      if (event.key === 'Tab') {
        const controls = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.body.style.overflow = 'hidden';
    main?.setAttribute('inert', '');
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      if (main && !mainWasInert) main.removeAttribute('inert');
      document.removeEventListener('keydown', handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [closeMobileMenu, isMobileMenuOpen]);

  return {
    closeMobileMenu,
    isMobileMenuOpen,
    isScrolled,
    mobileMenuButtonRef,
    mobileMenuRef,
    scrollToSection,
    toggleMobileMenu: () => setIsMobileMenuOpen((isOpen) => !isOpen)
  };
};
