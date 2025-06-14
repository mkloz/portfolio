'use client';

import { ArrowLeft, Home } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import Logo from '@/assets/logos/logo.png';
import { buttonVariants } from '@/components/ui/button';
import { useScrollIntoView } from '@/hooks/use-scroll-into-view';
import { cn } from '@/lib/utils';

import { Link } from '../../components/common/link';
import { ThemeToggle } from '../../components/common/theme-toggle';

interface NavigationItem {
  id: string;
  label: string;
}

interface ProjectHeaderProps {
  className?: string;
  projectTitle?: string;
}

const PROJECT_NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'overview', label: 'Overview' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'demo', label: 'Demo' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'share', label: 'Share' }
];

const SCROLL_THRESHOLD = 50;

export const ProjectHeader = ({ className, projectTitle = 'Project' }: ProjectHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const scrollToSection = useScrollIntoView(() => setIsMobileMenuOpen(false));

  const handleScroll = () => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
  };
  useOnClickOutside(ref, () => setIsMobileMenuOpen(false));

  useEffect(() => {
    const abortController = new AbortController();
    window.addEventListener('scroll', handleScroll, { signal: abortController.signal });
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('[data-mobile-menu]')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed flex top-0 left-0 right-0 z-50 transition-[height]',
        isScrolled
          ? 'bg-gradient-to-r from-white/80 via-blue-50/80 to-purple-50/80 dark:from-gray-900/90 dark:via-blue-900/80 dark:to-purple-900/80 backdrop-blur-md shadow-xl h-12'
          : 'bg-gradient-to-r from-white/70 via-blue-50/70 to-purple-50/70 dark:from-gray-900/80 dark:via-blue-900/70 dark:to-purple-900/70 backdrop-blur-sm h-header',
        className
      )}>
      <div className="container mx-auto px-4 flex items-center justify-between py-auto">
        <div className="flex items-center space-x-3">
          <Link to="/#hero" unstyled aria-label="Go to homepage">
            <img src={Logo || '/placeholder.svg'} alt="Logo" className="w-10 h-10" />
          </Link>

          <div className="hidden sm:flex items-center">
            <div className="h-6 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-2"></div>
            <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {projectTitle}
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Project navigation">
          {PROJECT_NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-medium relative group text-sm"
              aria-label={`Navigate to ${item.label} section`}>
              {item.label}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/#projects"
            unstyled
            aria-label="Go to projects page"
            className={buttonVariants({ variant: 'outline', size: 'icon' })}>
            <Home />
          </Link>
          <ThemeToggle />

          <button
            className="md:hidden p-2 rounded-2xl hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm transition-colors"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            data-mobile-menu>
            {isMobileMenuOpen ? (
              <ArrowLeft size={24} className="text-gray-700 dark:text-gray-300" aria-hidden="true" />
            ) : (
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full" />
                <span className="w-full h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full" />
                <span className="w-full h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full" />
              </div>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="md:hidden bg-gradient-to-b from-white/95 to-blue-50/95 dark:from-gray-900/95 dark:to-blue-900/95 backdrop-blur-lg border-t border-white/20 dark:border-gray-700/20 shadow-2xl absolute top-full left-0 right-0"
          id="mobile-menu"
          data-mobile-menu
          role="navigation"
          aria-label="Mobile navigation">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <div className="px-3 py-2 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {projectTitle}
            </div>

            {PROJECT_NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium py-2 px-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm"
                aria-label={`Navigate to ${item.label} section`}>
                {item.label}
              </button>
            ))}
            <Link
              to="/#projects"
              unstyled
              className="flex items-center justify-center mt-4 group border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/30 rounded-lg px-4 py-2 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4 text-blue-500 dark:text-blue-400 group-hover:-translate-x-1 transition-transform" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">Back to Projects</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
