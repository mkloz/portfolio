import { ArrowDownRight } from 'lucide-react';

import { useScrollIntoView } from '@/hooks/use-scroll-into-view';

import { PortraitSignal } from './portrait-signal';

export const Hero = () => {
  const scrollToSection = useScrollIntoView();

  return (
    <section id="hero" className="min-h-svh border-b border-current/25 pt-header">
      <div className="mx-auto grid min-h-[calc(100svh-var(--header-height))] max-w-[100rem] grid-cols-1 gap-10 px-5 pb-8 pt-8 md:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-12 lg:pt-10">
        <div className="flex min-w-0 flex-col lg:col-span-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em]">Mykhailo Kloz / Manchester</p>
          <div className="my-auto py-14 lg:py-10">
            <h1 className="hero-type uppercase">
              <span className="block">Full-stack</span>
              <span className="block">
                developer<span className="text-[#ff583d]">.</span>
              </span>
            </h1>
            <p className="mt-8 max-w-[33rem] text-xl font-semibold leading-snug md:text-2xl">
              I design the interface and build the systems behind it.
            </p>
          </div>
          <div className="border-t border-current/25 pt-5">
            <button
              onClick={() => scrollToSection('projects')}
              data-cursor="See work"
              className="group/work flex min-h-14 items-center gap-3 text-lg font-bold">
              Selected work
              <span className="flex size-11 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover/work:rotate-45">
                <ArrowDownRight aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
        <div className="flex items-center lg:col-span-4 lg:pl-4">
          <PortraitSignal />
        </div>
      </div>
    </section>
  );
};
