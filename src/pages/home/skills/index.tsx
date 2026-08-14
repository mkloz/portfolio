import { ArrowUpRight, CloudCog, Code2, Database, ServerCog, Wrench } from 'lucide-react';
import { useMemo, useState } from 'react';

import { SystemCanvasEffect } from '@/components/common/canvas-effects';
import { Link } from '@/components/common/link';
import { projectSummaries } from '@/data/project-summaries';
import { SYSTEM_EFFECT_META } from '@/data/system-effects';
import { useHoverIntent } from '@/hooks/use-hover-intent';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  {
    name: 'Frontend',
    ...SYSTEM_EFFECT_META.Frontend,
    icon: Code2,
    image: '/editorial/system-frontend-960.webp',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Next.js', 'Zustand']
  },
  {
    name: 'Backend',
    ...SYSTEM_EFFECT_META.Backend,
    icon: ServerCog,
    image: '/editorial/system-backend.webp',
    technologies: ['Node.js', 'NestJS', 'Prisma', 'Express', 'JWT', 'Socket.IO']
  },
  {
    name: 'Database',
    ...SYSTEM_EFFECT_META.Database,
    icon: Database,
    image: '/editorial/system-database.webp',
    technologies: ['PostgreSQL', 'Redis', 'MongoDB', 'MySQL']
  },
  {
    name: 'DevOps',
    ...SYSTEM_EFFECT_META.DevOps,
    icon: CloudCog,
    image: '/editorial/system-devops.webp',
    technologies: ['Docker', 'AWS', 'Nginx', 'GitHub Actions', 'Cloudflare Pages', 'Linux']
  },
  {
    name: 'Tools',
    ...SYSTEM_EFFECT_META.Tools,
    icon: Wrench,
    image: '/editorial/system-tools.webp',
    technologies: ['Git', 'ESLint', 'Prettier', 'Jest', 'Swagger']
  }
] as const;

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]['name']>('Frontend');
  const { schedule: previewCategory, cancel: cancelCategoryPreview } = useHoverIntent(setActiveCategory, 70);
  const projects = projectSummaries;
  const active = CATEGORIES.find((category) => category.name === activeCategory) ?? CATEGORIES[0];
  const evidenceProjects = useMemo(
    () => projects.filter((project) => project.evidenceCategories.includes(activeCategory)),
    [activeCategory, projects]
  );
  const activeIndex = CATEGORIES.findIndex((category) => category.name === activeCategory);
  const activeImageSrcSet = active.image.includes('-960.webp')
    ? `${active.image.replace('-960.webp', '-640.webp')} 640w, ${active.image} 960w`
    : `${active.image.replace(/\.webp$/, '-640.webp')} 640w, ${active.image} 1200w`;
  const selectAdjacentCategory = (direction: number) => {
    const nextIndex = (activeIndex + direction + CATEGORIES.length) % CATEGORIES.length;
    setActiveCategory(CATEGORIES[nextIndex].name);
    window.requestAnimationFrame(() =>
      document.querySelector<HTMLButtonElement>(`[data-skill-index="${nextIndex}"]`)?.focus()
    );
  };

  return (
    <section id="skills" className="border-b border-current/25 py-20 md:py-40">
      <div className="content-shell px-5 md:px-8 lg:px-12">
        <div className="grid gap-5 border-t-2 border-current pt-5 lg:grid-cols-12 lg:gap-10">
          <h2 className="section-type lg:col-span-8">Working system.</h2>
          <p className="max-w-xl self-end text-lg leading-relaxed text-muted-foreground lg:col-span-4">
            Choose a responsibility to see the tools and projects that carry it. Every tool shown here appears in the
            project record.
          </p>
        </div>

        <div className="mt-10 grid border-y-2 border-current md:mt-16 lg:grid-cols-12">
          <div
            className="grid grid-cols-5 lg:col-span-4 lg:block lg:border-r-2 lg:border-current"
            role="tablist"
            aria-label="Technology groups">
            {CATEGORIES.map((category) => (
              <button
                key={category.name}
                data-skill-index={CATEGORIES.indexOf(category)}
                data-signal
                data-signal-color={category.color}
                role="tab"
                aria-selected={activeCategory === category.name}
                tabIndex={activeCategory === category.name ? 0 : -1}
                aria-controls="technology-list"
                onMouseEnter={() => previewCategory(category.name)}
                onMouseLeave={cancelCategoryPreview}
                onPointerDown={cancelCategoryPreview}
                onClick={() => setActiveCategory(category.name)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    event.preventDefault();
                    selectAdjacentCategory(1);
                  }
                  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    selectAdjacentCategory(-1);
                  }
                }}
                className={cn(
                  'reactive-tab group flex min-h-14 items-center justify-center border-r border-current/25 px-2 last:border-r-0 lg:grid lg:min-h-20 lg:w-full lg:grid-cols-[1fr_auto] lg:justify-stretch lg:gap-4 lg:border-b lg:border-r-0 lg:px-5 lg:text-left lg:text-3xl lg:font-black lg:tracking-[-0.04em] lg:last:border-b-0 xl:min-h-24 xl:text-4xl',
                  activeCategory === category.name
                    ? 'bg-foreground text-background'
                    : 'hover:bg-foreground hover:text-background'
                )}>
                <category.icon className="size-5 lg:hidden" aria-hidden="true" />
                <span className="sr-only lg:not-sr-only">{category.name}</span>
                <span
                  className="hidden h-1 w-12 origin-right transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:block"
                  style={{
                    backgroundColor: category.color,
                    transform: activeCategory === category.name ? 'scaleX(1)' : 'scaleX(0.083333)'
                  }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          <div
            id="technology-list"
            role="tabpanel"
            className="grid min-h-[30rem] lg:col-span-8 lg:min-h-[36rem] lg:grid-rows-[1fr_auto]">
            <div className="relative min-h-[24rem] overflow-hidden bg-[#080808] text-white md:min-h-[36rem]">
              <img
                key={active.image}
                src={active.image}
                srcSet={activeImageSrcSet}
                sizes="(max-width: 1023px) 100vw, 67vw"
                alt={`${active.name} engineering workbench`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
              />
              <SystemCanvasEffect
                key={`${active.image}-effect`}
                variant={active.effect}
                tint={active.canvasTint}
                color={active.color}
                className="absolute inset-0 size-full">
                <img
                  src={active.image}
                  srcSet={activeImageSrcSet}
                  sizes="(max-width: 1023px) 100vw, 67vw"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
                />
              </SystemCanvasEffect>
              <div
                key={active.name}
                className="system-panel-content pointer-events-none relative z-10 flex min-h-[24rem] max-w-[82%] flex-col justify-end p-5 sm:max-w-[58%] md:min-h-[36rem] md:max-w-[52%] md:p-10">
                <h3 className="text-4xl font-black tracking-[-0.04em] md:text-7xl">{active.name}</h3>
                <p className="mt-4 max-w-56 text-sm leading-relaxed text-white/70">
                  Proven across {evidenceProjects.length} {evidenceProjects.length === 1 ? 'project' : 'projects'}{' '}
                  below.
                </p>
                <ul
                  className="mt-5 flex max-w-md flex-wrap gap-x-5 gap-y-2 md:mt-7"
                  aria-label={`${active.name} technologies`}>
                  {active.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="reactive-token flex items-center gap-2 text-sm font-bold text-white md:text-base">
                      <span
                        className="size-1.5 shrink-0"
                        style={{ backgroundColor: active.color }}
                        aria-hidden="true"
                      />
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex min-h-14 flex-wrap items-center gap-x-5 gap-y-1 border-t border-current/25 px-4 py-2">
              <span className="meta-type font-mono uppercase tracking-[0.08em] text-muted-foreground">Evidence</span>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                {evidenceProjects.map((project) => (
                  <Link
                    key={project.slug}
                    to={`/projects/${project.slug}`}
                    unstyled
                    data-cursor={`View ${project.title}`}
                    data-signal
                    data-signal-color={active.color}
                    className="reactive-link group flex min-h-10 items-center gap-1.5 font-semibold">
                    {project.title}
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-200 group-hover:rotate-45"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
