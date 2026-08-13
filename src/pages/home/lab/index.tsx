import { ArrowUpRight } from 'lucide-react';

import { Link } from '@/components/common/link';

const OWNERSHIP_LAYERS = [
  {
    label: 'Interface',
    action: 'Design the experience.',
    responsibility: 'Flows, responsive states, interaction, and accessibility.',
    output: 'A clear product people can use',
    color: '#74f0b3',
    foreground: '#080808'
  },
  {
    label: 'Application',
    action: 'Build the behaviour.',
    responsibility: 'Domain logic, APIs, authentication, payments, and realtime.',
    output: 'Rules that hold beyond the screen',
    color: '#ffd400',
    foreground: '#080808'
  },
  {
    label: 'Data',
    action: 'Model the system.',
    responsibility: 'Schemas, relationships, queries, caching, and consistency.',
    output: 'State the whole product can trust',
    color: '#465bff',
    foreground: '#ffffff'
  },
  {
    label: 'Production',
    action: 'Ship and keep it running.',
    responsibility: 'Containers, CI/CD, deployment, routing, and monitoring.',
    output: 'A service ready for real use',
    color: '#ff583d',
    foreground: '#080808'
  }
] as const;

const CAPABILITY_ITEMS = [
  { label: 'Product', color: '#ffd400' },
  { label: 'UX', color: '#74f0b3' },
  { label: 'Interface', color: '#74f0b3' },
  { label: 'Accessibility', color: '#ffd400' },
  { label: 'Frontend', color: '#ff583d' },
  { label: 'API', color: '#ffd400' },
  { label: 'Auth', color: '#6c4eff' },
  { label: 'Payments', color: '#74f0b3' },
  { label: 'Realtime', color: '#ff583d' },
  { label: 'Data', color: '#465bff' },
  { label: 'Testing', color: '#ffd400' },
  { label: 'CI/CD', color: '#6c4eff' },
  { label: 'Deployment', color: '#ff583d' },
  { label: 'Monitoring', color: '#74f0b3' }
] as const;

const DELIVERY_OUTPUT_ITEMS = [
  { label: 'User flows', color: '#74f0b3' },
  { label: 'Responsive states', color: '#ff583d' },
  { label: 'Interaction states', color: '#ffd400' },
  { label: 'Component systems', color: '#6c4eff' },
  { label: 'API contracts', color: '#ffd400' },
  { label: 'Access control', color: '#6c4eff' },
  { label: 'Payment flows', color: '#74f0b3' },
  { label: 'Data models', color: '#465bff' },
  { label: 'Cache strategy', color: '#ff583d' },
  { label: 'Test suites', color: '#ffd400' },
  { label: 'Containers', color: '#ff583d' },
  { label: 'Release pipelines', color: '#6c4eff' },
  { label: 'Routing rules', color: '#465bff' },
  { label: 'Service health', color: '#74f0b3' }
] as const;

export const Lab = () => (
  <section id="lab" className="overflow-hidden border-b border-background/20 bg-foreground text-background">
    <div className="border-y border-background/20 py-3" aria-hidden="true">
      <div className="signal-rail flex w-max whitespace-nowrap font-mono text-sm font-semibold uppercase tracking-[0.12em]">
        {[0, 1].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center gap-7 pr-7">
            {CAPABILITY_ITEMS.map((item) => (
              <span key={`${copy}-${item.label}`} className="flex items-center gap-7">
                {item.label}
                <span className="size-1.5 rounded-full" style={{ backgroundColor: item.color }} />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>

    <div className="content-shell px-5 py-16 md:px-8 md:py-24 lg:px-12 lg:py-28">
      <div className="grid gap-8 border-t border-background/25 pt-5 lg:grid-cols-12 lg:items-end">
        <h2 className="reactive-heading max-w-[10ch] text-[clamp(3.25rem,5vw,6rem)] font-black leading-[0.88] tracking-[-0.04em] lg:col-span-7">
          One product. Every layer.
        </h2>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="max-w-md text-xl font-semibold leading-relaxed text-background">
            I can design, build, connect, and ship a complete web product independently.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-background/65">
            The value is not knowing every tool. It is owning the handoffs between them.
          </p>
        </div>
      </div>

      <p className="mt-8 flex items-center justify-end gap-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-background/60 md:hidden">
        Swipe through layers <span aria-hidden="true">→</span>
      </p>
      <ol className="mobile-scroll-strip relative -mx-5 mt-3 flex snap-x snap-mandatory overflow-x-auto border-y border-background/30 px-5 md:mx-0 md:mt-10 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
        {OWNERSHIP_LAYERS.map((layer, index) => (
          <li
            key={layer.label}
            className="reactive-layer relative grid min-h-[19rem] w-[82vw] max-w-[20rem] shrink-0 snap-start content-between gap-7 border-r border-background/25 px-5 py-7 last:border-r-0 md:min-h-[20rem] md:w-auto md:max-w-none md:border-b md:px-7 md:[&:nth-child(2n)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0 lg:min-h-[21rem] lg:border-b-0 lg:border-r lg:[&:nth-child(2n)]:border-r lg:last:border-r-0 lg:first:pl-0 lg:last:pr-0">
            <div>
              <div className="flex items-center gap-4">
                <span
                  className="flex size-11 shrink-0 items-center justify-center font-mono text-xs font-bold"
                  style={{ backgroundColor: layer.color, color: layer.foreground }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-sm font-semibold uppercase tracking-[0.1em] text-background/60">
                  {layer.label}
                </span>
              </div>
              <h3 className="mt-7 max-w-[12ch] text-3xl font-black leading-[0.98] tracking-[-0.03em] md:text-4xl">
                {layer.action}
              </h3>
              <p className="mt-5 max-w-xs text-base leading-relaxed text-background/68">{layer.responsibility}</p>
            </div>
            <p className="flex max-w-xs items-start gap-3 border-t border-background/20 pt-4 text-sm font-semibold leading-relaxed text-background">
              <span className="mt-2 size-2 shrink-0" style={{ backgroundColor: layer.color }} aria-hidden="true" />
              {layer.output}
            </p>
          </li>
        ))}
      </ol>

      <div className="grid gap-5 border-b border-background/30 py-6 md:grid-cols-[1fr_auto] md:items-center md:py-7">
        <p className="max-w-3xl text-xl font-black leading-tight tracking-[-0.025em] md:text-3xl">
          One continuous responsibility—from the first decision to the live service.
        </p>
        <Link
          to="/projects/uevent"
          unstyled
          className="reactive-link group inline-flex min-h-12 items-center gap-2 justify-self-start border-b border-background/50 font-bold hover:border-background">
          See the complete build
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:rotate-45" aria-hidden="true" />
        </Link>
      </div>
    </div>

    <div className="border-y border-background/20 py-3" aria-hidden="true">
      <div className="signal-rail signal-rail-reverse flex w-max whitespace-nowrap font-mono text-sm font-semibold uppercase tracking-[0.12em]">
        {[0, 1].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center gap-7 pr-7">
            {DELIVERY_OUTPUT_ITEMS.map((item) => (
              <span key={`${copy}-${item.label}`} className="flex items-center gap-7">
                {item.label}
                <span className="size-1.5 rounded-full" style={{ backgroundColor: item.color }} />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  </section>
);
