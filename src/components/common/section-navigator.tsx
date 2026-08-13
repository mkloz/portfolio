import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type NavigatorItem = {
  id: string;
  label: string;
  color: string;
};

export const SectionNavigator = ({ items, className }: { items: NavigatorItem[]; className?: string }) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const [availableIds, setAvailableIds] = useState(() => new Set(items.map(({ id }) => id)));
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;
    setAvailableIds(new Set(sections.map(({ id }) => id)));
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.34;
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section;
        else break;
      }
      setActiveId(atPageEnd ? sections[sections.length - 1].id : current.id);
    };
    const queueUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
    };
  }, [items]);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !mobileNavRef.current?.contains(event.target)) setMobileOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileOpen]);

  const visibleItems = items.filter((item) => availableIds.has(item.id));
  const activeItem = visibleItems.find((item) => item.id === activeId) ?? visibleItems[0];
  const goToSection = (id: string) => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', `${window.location.pathname}#${id}`);
    setMobileOpen(false);
  };

  return (
    <>
      {activeItem && (
        <div
          ref={mobileNavRef}
          role="navigation"
          aria-label="On this page"
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 xl:hidden">
          <div
            id="mobile-section-menu"
            className={cn(
              'absolute bottom-full left-1/2 mb-2 grid w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden border border-current/25 bg-background text-foreground transition-[opacity,transform] duration-200',
              mobileOpen
                ? 'pointer-events-auto visible translate-y-0 opacity-100'
                : 'pointer-events-none invisible translate-y-2 opacity-0'
            )}>
            {visibleItems.map((item) => {
              const active = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSection(item.id)}
                  aria-current={active ? 'location' : undefined}
                  tabIndex={mobileOpen ? 0 : -1}
                  className="grid min-h-12 grid-cols-[0.6rem_1fr_auto] items-center gap-3 border-b border-current/20 px-4 text-left text-sm font-bold last:border-b-0">
                  <span className="size-2" style={{ backgroundColor: item.color }} aria-hidden="true" />
                  {item.label}
                  {active && <span className="font-mono text-[0.6rem] uppercase text-muted-foreground">Current</span>}
                </button>
              );
            })}
          </div>
          <button
            ref={mobileToggleRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-section-menu"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex min-h-12 items-center gap-3 border border-current/30 bg-background px-4 text-sm font-bold text-foreground">
            <span className="size-2" style={{ backgroundColor: activeItem.color }} aria-hidden="true" />
            {activeItem.label}
            <ChevronDown
              className={cn('size-4 transition-transform duration-200', mobileOpen && 'rotate-180')}
              aria-hidden="true"
            />
          </button>
        </div>
      )}

      <nav
        aria-label="On this page"
        className={cn(
          'group/sections fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-1 xl:flex 2xl:right-8',
          className
        )}>
        {visibleItems.map((item) => {
          const active = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active ? 'location' : undefined}
              data-signal
              data-signal-color={item.color}
              className="group/section flex min-h-11 items-center gap-3 px-1"
              onClick={(event) => {
                event.preventDefault();
                goToSection(item.id);
              }}>
              <span className="translate-x-2 whitespace-nowrap bg-background px-2 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-foreground opacity-0 transition-[opacity,transform] duration-200 group-hover/section:translate-x-0 group-hover/section:opacity-100 group-focus-visible/section:translate-x-0 group-focus-visible/section:opacity-100">
                {item.label}
              </span>
              <span
                className="block h-2 origin-right transition-[width,height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ backgroundColor: item.color, width: active ? '2.25rem' : '0.5rem' }}
                aria-hidden="true"
              />
            </a>
          );
        })}
      </nav>
    </>
  );
};
