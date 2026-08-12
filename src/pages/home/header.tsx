import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { ThemeToggle } from '@/components/common/theme-toggle';
import { useHeaderNavigation } from '@/hooks/use-header-navigation';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const NAVIGATION_ITEMS = [
  { id: 'projects', label: 'Work' },
  { id: 'lab', label: 'Build trace' },
  { id: 'skills', label: 'System' },
  { id: 'contact', label: 'Contact' }
];

export const Header = ({ className }: HeaderProps) => {
  const [progress, setProgress] = useState(0);
  const { isMobileMenuOpen, mobileMenuButtonRef, mobileMenuRef, scrollToSection, toggleMobileMenu } =
    useHeaderNavigation();

  useEffect(() => {
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? Math.min(1, window.scrollY / distance) : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-header border-b border-current/20 bg-background text-foreground',
        className
      )}>
      <div className="mx-auto flex h-full max-w-[100rem] items-center justify-between px-5 md:px-8 lg:px-12">
        <button
          onClick={() => scrollToSection('hero')}
          className="flex min-h-11 min-w-11 items-center gap-3 text-left font-black tracking-[-0.04em]"
          aria-label="Go to homepage">
          <span>
            MK<span className="text-[#ff583d]">/</span>
          </span>
          <span className="hidden font-mono text-[0.6rem] font-semibold uppercase leading-tight tracking-[0.14em] lg:block">
            Full-stack
            <br />
            Manchester
          </span>
        </button>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative min-h-11 font-mono text-[0.67rem] font-semibold uppercase tracking-[0.12em]">
              {item.label}
              <span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="mr-3 hidden items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] lg:flex">
            <span className="size-2 rounded-full bg-[#74f0b3]" aria-hidden="true" />
            Available
          </div>
          <ThemeToggle />
          <button
            ref={mobileMenuButtonRef}
            className="flex size-11 items-center justify-center rounded-full border-2 border-current md:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
            {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="absolute inset-x-0 top-full min-h-[calc(100svh-3.5rem)] bg-foreground p-5 text-background md:hidden">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex min-h-20 items-center justify-between border-b border-background/25 text-left text-4xl font-black tracking-[-0.04em]">
                {item.label}
                <span className="font-mono text-sm" aria-hidden="true">
                  Go
                </span>
              </button>
            ))}
          </nav>
          <p className="mt-10 max-w-xs text-sm text-background/65">Full-stack developer based in Manchester, UK.</p>
        </div>
      )}

      <span className="absolute inset-x-0 bottom-0 h-px bg-current/10" aria-hidden="true">
        <span
          className="block h-full origin-left bg-[#ff583d] motion-reduce:hidden"
          style={{ transform: `scaleX(${progress})` }}
        />
      </span>
    </header>
  );
};
