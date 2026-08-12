import { ArrowLeft, Menu, X } from 'lucide-react';

import { Link } from '@/components/common/link';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { useHeaderNavigation } from '@/hooks/use-header-navigation';

const ITEMS = [
  { id: 'overview', label: 'Purpose' },
  { id: 'tech-stack', label: 'System' },
  { id: 'demo', label: 'Demo' },
  { id: 'journey', label: 'Build log' },
  { id: 'gallery', label: 'Screens' }
];

export const ProjectHeader = ({ projectTitle = 'Project' }: { projectTitle?: string }) => {
  const { isMobileMenuOpen, mobileMenuButtonRef, mobileMenuRef, scrollToSection, toggleMobileMenu } =
    useHeaderNavigation();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-header border-b border-current/20 bg-background text-foreground">
      <div className="mx-auto flex h-full max-w-[100rem] items-center justify-between gap-4 px-5 md:px-8 lg:px-12">
        <div className="flex min-w-0 items-center gap-4">
          <Link to="/#projects" unstyled className="flex min-h-11 items-center gap-2 font-bold">
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Project ledger</span>
            <span className="sm:hidden">Work</span>
          </Link>
          <span className="h-5 border-l border-current/30" />
          <span className="truncate font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em]">
            {projectTitle}
          </span>
        </div>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Project navigation">
          {ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="min-h-11 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.1em] hover:text-primary">
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={mobileMenuButtonRef}
            className="flex size-11 items-center justify-center rounded-full border-2 border-current lg:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-project-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
            {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-project-menu"
          className="absolute inset-x-0 top-full bg-foreground p-5 text-background lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile project navigation">
            {ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="min-h-16 border-b border-background/25 text-left text-2xl font-black last:border-0">
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
