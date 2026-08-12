import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';

import { Link } from '@/components/common/link';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const TRACE_ITEMS = [
  {
    id: 'interface',
    label: 'Interface',
    title: 'Make the next action obvious.',
    description:
      'The event page brings location, price, organiser details, and ticket purchase into one responsive flow.',
    facts: ['React interface', 'Google Maps discovery', 'Stripe checkout'],
    image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/event.png',
    imageAlt: 'UEvent event detail interface',
    accent: '#74f0b3',
    foreground: '#080808'
  },
  {
    id: 'api',
    label: 'API',
    title: 'Enforce the rules behind the screen.',
    description:
      'The NestJS API handles payment verification, role permissions, event management, and the contracts used by the interface.',
    facts: ['40+ REST endpoints', 'Role-based access', 'Payment webhooks'],
    image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/use-case-diagram.png',
    imageAlt: 'UEvent use case diagram',
    accent: '#ffd400',
    foreground: '#080808'
  },
  {
    id: 'data',
    label: 'Data',
    title: 'Keep shared state consistent.',
    description:
      'PostgreSQL and Prisma model the event, company, ticket, and payment relationships. Redis supports sessions and live notifications.',
    facts: ['15+ connected entities', 'PostgreSQL and Prisma', 'Redis sessions'],
    image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/db-schema.png',
    imageAlt: 'UEvent database schema',
    accent: '#465bff',
    foreground: '#ffffff'
  },
  {
    id: 'production',
    label: 'Production',
    title: 'Ship the system that has to keep working.',
    description:
      'Docker, Nginx, process management, deployment automation, and logs turn the application into a production service.',
    facts: ['Docker services', 'Nginx reverse proxy', 'Logs and monitoring'],
    image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/deployment-diagram.png',
    imageAlt: 'UEvent deployment diagram',
    accent: '#ff583d',
    foreground: '#080808'
  }
] as const;

export const Lab = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const traceRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const trace = traceRef.current;
    const summary = summaryRef.current;
    const rail = railRef.current;
    if (!section || !trace || !summary || !rail) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const context = gsap.context(() => {
      const railMotion = gsap.fromTo(
        rail,
        { xPercent: 0 },
        { xPercent: -50, duration: 22, ease: 'none', repeat: -1, paused: true }
      );
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) railMotion.play();
          else railMotion.pause();
        },
        { threshold: 0.1 }
      );
      observer.observe(rail);

      const mediaQuery = gsap.matchMedia();
      mediaQuery.add('(min-width: 1024px)', () => {
        ScrollTrigger.create({
          trigger: trace,
          start: 'top top+=88',
          end: 'bottom bottom-=48',
          pin: summary,
          pinSpacing: false
        });
      });

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const image = item.querySelector('[data-trace-image]');
        ScrollTrigger.create({
          trigger: item,
          start: 'top 55%',
          end: 'bottom 45%',
          onToggle: ({ isActive }) => {
            if (isActive) setActiveIndex(index);
          }
        });
        if (image) {
          gsap.fromTo(
            image,
            { scale: 0.94, autoAlpha: 0.45 },
            {
              scale: 1,
              autoAlpha: 1,
              ease: 'none',
              scrollTrigger: { trigger: item, start: 'top 85%', end: 'top 38%', scrub: 0.5 }
            }
          );
        }
      });

      return () => {
        observer.disconnect();
        mediaQuery.revert();
      };
    }, section);

    return () => context.revert();
  }, []);

  const jumpToItem = (index: number) => {
    setActiveIndex(index);
    itemRefs.current[index]?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center'
    });
  };

  return (
    <section ref={sectionRef} id="lab" className="overflow-hidden border-b border-white/20 bg-[#080808] text-white">
      <div className="border-y border-white/20 py-3" aria-hidden="true">
        <div
          ref={railRef}
          className="flex w-max whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-[0.16em]">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center gap-7 pr-7">
              {TRACE_ITEMS.map((item) => (
                <span key={`${copy}-${item.id}`} className="flex items-center gap-7">
                  {item.label}
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: item.accent }} />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[100rem] px-5 py-28 md:px-8 md:py-40 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div ref={summaryRef} className="self-start lg:col-span-4">
            <h2 className="section-type max-w-[8ch]">One action. Every layer.</h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-white/70">
              A ticket purchase in UEvent moves through four connected decisions. Follow the same action from the screen
              to the production service.
            </p>

            <div className="mt-10 grid grid-cols-2 border-y border-white/25 sm:grid-cols-4 lg:grid-cols-2">
              {TRACE_ITEMS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={activeIndex === index}
                  onClick={() => jumpToItem(index)}
                  className={cn(
                    'relative min-h-16 border-b border-r border-white/25 px-3 text-left text-sm font-bold sm:min-h-20 lg:border-b lg:last:border-b-0 lg:odd:border-r lg:even:border-r-0',
                    index % 2 === 1 && 'border-r-0',
                    index >= TRACE_ITEMS.length - 2 && 'border-b-0',
                    activeIndex !== index && 'text-white/58 hover:text-white focus-visible:text-white'
                  )}
                  style={activeIndex === index ? { backgroundColor: item.accent, color: item.foreground } : undefined}>
                  {item.label}
                </button>
              ))}
            </div>

            <Link
              to="/projects/uevent"
              unstyled
              data-cursor="Open case"
              className="mt-8 inline-flex min-h-12 items-center gap-3 border-b border-white/50 font-bold hover:border-white">
              Read the UEvent case study <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div ref={traceRef} className="lg:col-span-8">
            {TRACE_ITEMS.map((item, index) => (
              <article
                key={item.id}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                className="flex min-h-[42rem] flex-col justify-center border-t border-white/25 py-16 first:border-t-0 first:pt-0 last:pb-0 md:min-h-[50rem] lg:min-h-[76vh]">
                <div className="flex items-center justify-between gap-5">
                  <p className="text-2xl font-black tracking-[-0.03em]">{item.label}</p>
                  <span
                    aria-hidden="true"
                    className="h-2 w-28 origin-right transition-[transform,background-color] duration-300"
                    style={{
                      transform: activeIndex === index ? 'scaleX(1)' : 'scaleX(0.58)',
                      backgroundColor: item.accent
                    }}
                  />
                </div>

                <h3 className="mt-6 max-w-[13ch] text-5xl font-black leading-[0.92] tracking-[-0.045em] md:text-7xl">
                  {item.title}
                </h3>
                <div className="mt-8 grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
                  <p className="max-w-[38rem] text-lg leading-relaxed text-white/72">{item.description}</p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-white/72 md:max-w-[20rem] md:justify-end">
                    {item.facts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/projects/uevent"
                  unstyled
                  data-cursor="Inspect evidence"
                  className="group/trace relative mt-10 block overflow-hidden border border-white/40 bg-white p-2 text-[#080808]">
                  <img
                    data-trace-image
                    src={item.image}
                    alt={item.imageAlt}
                    className="aspect-[16/9] w-full object-cover object-top"
                  />
                  <span
                    className="absolute bottom-5 right-5 flex size-12 items-center justify-center rounded-full border border-[#080808] bg-[#f4f2ed] transition-transform duration-300 group-hover/trace:rotate-45 group-focus-visible/trace:rotate-45"
                    aria-hidden="true">
                    <ArrowDownRight className="size-5" />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
