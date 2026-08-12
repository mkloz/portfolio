import { useCallback, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { useScrollIntoView } from './use-scroll-into-view';

const SCROLL_THRESHOLD = 50;

export const useHeaderNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const scrollToSection = useScrollIntoView(closeMobileMenu);

  useOnClickOutside(mobileMenuRef, closeMobileMenu);

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
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  return {
    closeMobileMenu,
    isMobileMenuOpen,
    isScrolled,
    mobileMenuRef,
    scrollToSection,
    toggleMobileMenu: () => setIsMobileMenuOpen((isOpen) => !isOpen)
  };
};
