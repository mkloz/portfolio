import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type NavigatorItem = {
  id: string;
  label: string;
  color: string;
};

export const SectionNavigator = ({ items, className }: { items: NavigatorItem[]; className?: string }) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const [availableIds, setAvailableIds] = useState(() => new Set(items.map(({ id }) => id)));

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

  const visibleItems = items.filter((item) => availableIds.has(item.id));
  const goToSection = (id: string) => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', `${window.location.pathname}#${id}`);
  };

  return (
    <nav
      aria-label="On this page"
      className={cn(
        'group/sections fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end xl:flex 2xl:right-8',
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
            className="group/section flex min-h-8 items-center gap-2 px-1"
            onClick={(event) => {
              event.preventDefault();
              goToSection(item.id);
            }}>
            <span className="translate-x-1.5 whitespace-nowrap bg-background px-1.5 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-foreground opacity-0 transition-[opacity,transform] duration-200 group-hover/section:translate-x-0 group-hover/section:opacity-100 group-focus-visible/section:translate-x-0 group-focus-visible/section:opacity-100">
              {item.label}
            </span>
            <span
              className="block h-1.5 origin-right transition-[width,height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ backgroundColor: item.color, width: active ? '1.5rem' : '0.375rem' }}
              aria-hidden="true"
            />
          </a>
        );
      })}
    </nav>
  );
};
