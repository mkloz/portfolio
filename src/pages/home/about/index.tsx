import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

import { ME } from '@/data/me';
import { cn } from '@/lib/utils';

const About = () => {
  const [activeIndex, setActiveIndex] = useState(ME.timeline.length - 1);
  const active = ME.timeline[activeIndex];

  return (
    <section id="about" className="border-b border-white/25 bg-[#080808] py-28 text-[#f4f2ed] md:py-40">
      <div className="content-shell px-5 md:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 className="section-type reactive-heading max-w-[9ch] lg:col-span-8">The route here.</h2>
          <div className="self-end border-t border-white/25 pt-6 lg:col-span-4">
            <p className="text-xl font-semibold leading-relaxed text-white/78">
              Frontend care, backend depth, and one connected view of the product.
            </p>
            <a
              href="mailto:mykhailo.kloz@gmail.com"
              className="reactive-link mt-6 inline-flex min-h-11 items-center gap-2 border-b border-current font-semibold">
              Start a conversation <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-16 grid border-y border-white/30 lg:grid-cols-12">
          <div className="relative min-h-[28rem] overflow-hidden border-b border-white/30 lg:col-span-5 lg:border-b-0 lg:border-r">
            <img
              src="/editorial/systems-workbench.webp"
              alt="Editorial model of connected interface, service, and data layers"
              loading="lazy"
              decoding="async"
              className="reactive-about-media absolute inset-0 size-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-[#080808]/52" aria-hidden="true" />
            <div className="relative flex min-h-[28rem] flex-col justify-between p-6 md:p-8">
              <p className="max-w-sm text-xl font-semibold leading-relaxed">
                I work across the browser, API, database, and deployment layers, so decisions remain connected.
              </p>
              <div>
                <p className="meta-type font-mono uppercase tracking-[0.08em] text-white/65">Current base</p>
                <p className="mt-2 text-4xl font-black tracking-[-0.04em]">Manchester, UK</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/68">
                  Originally from Ukraine. I relocated to the UK in 2022 and continued studying Software Development at
                  KHPI while building full-stack projects.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid min-h-56 gap-8 border-b border-white/30 p-6 md:grid-cols-[0.4fr_1fr] md:p-8">
              <p className="font-mono text-sm font-semibold text-[#ffd400]">{active.year}</p>
              <div>
                <h3 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">{active.title}</h3>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/68">{active.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3" role="list" aria-label="Career timeline">
              {ME.timeline.map((item, index) => (
                <button
                  key={`${item.year}-${item.title}`}
                  type="button"
                  role="listitem"
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  aria-pressed={activeIndex === index}
                  className={cn(
                    'reactive-timeline relative min-h-28 border-b border-r border-white/25 p-4 text-left md:min-h-36',
                    activeIndex === index ? 'bg-[#f4f2ed] text-[#080808]' : 'text-[#f4f2ed]'
                  )}>
                  <span className="meta-type block font-mono uppercase tracking-[0.08em] opacity-65">{item.year}</span>
                  <span className="mt-3 block font-bold leading-tight">{item.title}</span>
                  <span
                    className="absolute inset-x-4 bottom-0 h-1 origin-left bg-[#ffd400] transition-transform duration-200"
                    style={{ transform: activeIndex === index ? 'scaleX(1)' : 'scaleX(0)' }}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
