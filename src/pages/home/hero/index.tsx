import { ArrowDownRight } from 'lucide-react';

import { useScrollIntoView } from '@/hooks/use-scroll-into-view';

import { PortraitSignal } from './portrait-signal';

export const Hero = () => {
  const scrollToSection = useScrollIntoView();

  return (
    <section id="hero" className="border-b border-current/25">
      <div className="content-shell px-5 pt-16 md:min-h-[clamp(44rem,100svh,58rem)] md:px-8 lg:px-12">
        <div className="flex min-h-14 items-center justify-between gap-6 border-b border-current/25 font-mono text-xs font-semibold uppercase tracking-[0.1em]">
          <span>
            Mykhailo Kloz <span className="hidden sm:inline">/ Portfolio</span>
          </span>
        </div>

        <div className="grid lg:min-h-[calc(clamp(44rem,100svh,58rem)-7.5rem)] lg:grid-cols-12">
          <div className="flex min-w-0 flex-col py-10 lg:col-span-7 lg:border-r lg:border-current/25 lg:py-16 lg:pr-10 xl:pr-14">
            <div className="my-auto">
              <h1
                aria-label="Full-stack developer."
                className="hero-type interactive-type uppercase"
                data-signal
                data-signal-color="#ff583d">
                <span aria-hidden="true" className="interactive-type-line block" data-ghost="Full-stack">
                  Full-stack
                </span>
                <span aria-hidden="true" className="interactive-type-line block" data-ghost="Developer.">
                  developer<span className="text-[#ff583d]">.</span>
                </span>
              </h1>
            </div>

            <div className="mt-10 grid gap-6 border-t border-current/25 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:mt-16 lg:gap-8 lg:pt-6">
              <p className="max-w-[33rem] text-lg font-semibold leading-snug md:text-2xl">
                I turn complex product requirements into clear, working software.
              </p>
              <button
                onClick={() => scrollToSection('projects')}
                data-cursor="See work"
                data-magnetic
                data-signal
                data-signal-color="#ff583d"
                className="group/work hidden min-h-14 items-center gap-3 text-lg font-bold sm:flex sm:justify-self-end">
                Selected work
                <span className="flex size-11 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover/work:rotate-45 group-focus-visible/work:rotate-45 motion-reduce:transition-none">
                  <ArrowDownRight aria-hidden="true" />
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center border-t border-current/25 py-8 lg:col-span-5 lg:border-t-0 lg:py-16 lg:pl-10 xl:pl-14">
            <PortraitSignal />
          </div>
        </div>
      </div>
    </section>
  );
};
