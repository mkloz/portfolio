import { ArrowUpRight, Github } from 'lucide-react';
import { useState } from 'react';

import { EvidenceMagnifier } from '@/components/common/canvas-effects';
import { Link } from '@/components/common/link';
import { getResponsiveImageSrcSet, projectSummaries, type ProjectSummary } from '@/data/project-summaries';
import { useTheme } from '@/hooks/theme.store';
import { getProjectAccent } from '@/lib/project-accent';
import { cn } from '@/lib/utils';

const ProjectMedia = ({
  project,
  compact = false,
  enabled = true
}: {
  project: ProjectSummary;
  compact?: boolean;
  enabled?: boolean;
}) => {
  const { theme } = useTheme();
  const image = typeof project.image === 'string' ? project.image : project.image[theme];

  return (
    <div
      className={cn('project-media reactive-media relative', compact ? 'pb-0 pr-0' : 'pb-10 pr-7 md:pb-14 md:pr-12')}
      data-reactive
      data-depth>
      {enabled && !compact ? (
        <EvidenceMagnifier className="overflow-hidden border-2 border-current bg-[#080808]">
          <img
            src={image}
            srcSet={getResponsiveImageSrcSet(image)}
            sizes="(max-width: 1023px) calc(100vw - 2.5rem), 44vw"
            alt={`${project.title} interface`}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover/project:scale-[1.035]"
          />
        </EvidenceMagnifier>
      ) : enabled ? (
        <div className="overflow-hidden border-2 border-current bg-[#080808]">
          <img
            src={image}
            srcSet={getResponsiveImageSrcSet(image)}
            sizes="(max-width: 1023px) calc(100vw - 2.5rem), 44vw"
            alt={`${project.title} interface`}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover/project:scale-[1.035]"
          />
        </div>
      ) : (
        <div className="aspect-[16/10] overflow-hidden border-2 border-current bg-[#080808]" aria-hidden="true" />
      )}
      {!compact && project.secondaryImage && (
        <div className="absolute bottom-0 right-0 w-[38%] rotate-2 border-2 border-current bg-white p-1 transition-transform duration-500 group-hover/project:-translate-y-2 group-hover/project:rotate-0">
          <img
            src={enabled ? project.secondaryImage : undefined}
            srcSet={enabled ? getResponsiveImageSrcSet(project.secondaryImage) : undefined}
            sizes="(max-width: 767px) 36vw, 17vw"
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover object-top"
          />
        </div>
      )}
    </div>
  );
};

export const Projects = () => {
  const projects = projectSummaries;
  const [activeIndex, setActiveIndex] = useState(0);
  const selectAdjacentProject = (index: number, direction: number) => {
    const nextIndex = (index + direction + projects.length) % projects.length;
    setActiveIndex(nextIndex);
    const visibleTrigger = Array.from(
      document.querySelectorAll<HTMLButtonElement>(`[data-project-index="${nextIndex}"]`)
    ).find((trigger) => trigger.offsetParent !== null);
    window.requestAnimationFrame(() => visibleTrigger?.focus());
  };

  return (
    <section id="projects" className="border-b border-current/25 py-20 md:py-40">
      <div className="content-shell px-5 md:px-8 lg:px-12">
        <div className="mb-10 grid gap-5 md:mb-14 lg:grid-cols-12 lg:items-end">
          <h2 className="section-type lg:col-span-8">Selected work.</h2>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:col-span-4">
            Product interfaces, APIs, payments, collaboration tools, and deployment work. Open a panel for the case
            study and implementation evidence.
          </p>
        </div>

        <div className="border-y-2 border-current lg:hidden">
          {projects.map((project, index) => {
            const active = activeIndex === index;
            const accent = getProjectAccent(project.slug);
            const triggerId = `mobile-project-trigger-${project.slug}`;
            const panelId = `mobile-project-panel-${project.slug}`;

            return (
              <article key={project.slug} className="reactive-stack-row border-b border-current/25 last:border-b-0">
                <button
                  data-project-index={index}
                  data-signal
                  data-signal-color={accent.background}
                  id={triggerId}
                  type="button"
                  aria-expanded={active}
                  aria-controls={panelId}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                      event.preventDefault();
                      selectAdjacentProject(index, 1);
                    }
                    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                      event.preventDefault();
                      selectAdjacentProject(index, -1);
                    }
                  }}
                  className={cn(
                    'relative grid min-h-16 w-full grid-cols-[2rem_1fr_auto] items-center gap-3 px-4 text-left transition-colors duration-200',
                    active ? 'bg-foreground text-background' : 'hover:bg-foreground/5'
                  )}>
                  <span className="font-mono text-[0.65rem] opacity-60">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-lg font-black tracking-[-0.025em]">{project.title}</span>
                  <ArrowUpRight
                    className={cn(
                      'size-5 transition-transform duration-300 motion-reduce:transition-none',
                      active ? 'rotate-45' : 'rotate-0'
                    )}
                    style={{ color: accent.background }}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute bottom-0 left-0 top-0 w-1"
                    style={{ backgroundColor: accent.background }}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  {...(!active ? ({ inert: '' } as Record<string, string>) : {})}
                  className={cn(
                    'grid transition-[grid-template-rows] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                    active ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}>
                  <div className="overflow-hidden">
                    <div
                      className={cn(
                        'relative p-5 transition-[opacity,transform] duration-300 motion-reduce:transition-none',
                        active ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                      )}>
                      <Link
                        to={`/projects/${project.slug}`}
                        unstyled
                        tabIndex={active ? 0 : -1}
                        aria-label={`View ${project.title} case study`}
                        data-cursor={`View ${project.title}`}
                        className="absolute inset-0 z-10 cursor-pointer">
                        <span className="sr-only">View {project.title} case study</span>
                      </Link>
                      <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        {project.category} · {project.year}
                      </p>
                      <div className="mt-5">
                        <ProjectMedia project={project} compact enabled={active} />
                      </div>
                      <p className="mt-5 text-base font-medium leading-relaxed">{project.description}</p>
                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-muted-foreground">
                        {project.technologies.slice(0, 5).map((technology) => (
                          <li key={technology} className="reactive-token">
                            {technology}
                          </li>
                        ))}
                      </ul>
                      <div className="relative z-20 mt-6 grid grid-cols-[1fr_auto] border-y border-current/25">
                        <Link
                          to={`/projects/${project.slug}`}
                          unstyled
                          tabIndex={active ? 0 : -1}
                          className="flex min-h-14 items-center justify-between gap-3 pr-4 font-bold">
                          Open case study <ArrowUpRight className="size-4" aria-hidden="true" />
                        </Link>
                        {project.github[0] && (
                          <a
                            href={project.github[0].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} source code`}
                            tabIndex={active ? 0 : -1}
                            className="flex size-14 items-center justify-center border-l border-current/25">
                            <Github className="size-5" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="hidden overflow-hidden border-2 border-current lg:flex lg:h-[42rem] lg:flex-row">
          {projects.map((project, index) => {
            const active = activeIndex === index;
            const accent = getProjectAccent(project.slug);

            return (
              <article
                key={project.slug}
                onMouseEnter={() => setActiveIndex(index)}
                onFocusCapture={() => setActiveIndex(index)}
                className={cn(
                  'project-panel group/project relative flex min-w-0 flex-col border-current bg-background text-foreground lg:h-full lg:border-r-2 lg:last:border-r-0',
                  index > 0 && 'border-t-2 lg:border-t-0',
                  active ? 'lg:flex-[7]' : 'lg:flex-[1]'
                )}>
                <button
                  data-project-index={index}
                  data-signal
                  data-signal-color={accent.background}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                      event.preventDefault();
                      selectAdjacentProject(index, 1);
                    }
                    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                      event.preventDefault();
                      selectAdjacentProject(index, -1);
                    }
                  }}
                  aria-expanded={active}
                  className={cn(
                    'relative flex min-h-20 w-full items-center justify-between gap-4 overflow-hidden px-5 text-left font-black',
                    active
                      ? 'lg:min-h-14 lg:flex-none lg:flex-row lg:border-b-2 lg:border-current lg:py-0'
                      : 'lg:w-auto lg:min-w-24 lg:flex-1 lg:flex-col lg:items-center lg:px-4 lg:py-6'
                  )}>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute left-0 top-0 bg-current',
                      active ? 'h-2 w-full' : 'h-2 w-full lg:h-full lg:w-2'
                    )}
                    style={{ color: accent.background }}
                  />
                  <span className="font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
                  <span
                    className={cn(
                      'text-3xl tracking-[-0.05em]',
                      active ? 'lg:text-lg' : 'lg:rotate-180 lg:text-4xl lg:[writing-mode:vertical-rl]'
                    )}>
                    {project.title}
                  </span>
                  <ArrowUpRight
                    className={cn('size-5', !active && 'lg:rotate-45')}
                    style={{ color: accent.background }}
                    aria-hidden="true"
                  />
                </button>

                {active && (
                  <div className="relative flex h-full min-w-0 flex-1 flex-col p-5 md:p-8">
                    <Link
                      to={`/projects/${project.slug}`}
                      unstyled
                      aria-label={`View ${project.title} case study`}
                      data-cursor={`View ${project.title}`}
                      className="absolute inset-0 z-10 cursor-pointer">
                      <span className="sr-only">View {project.title} case study</span>
                    </Link>
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="meta-type font-mono font-semibold uppercase tracking-[0.1em]">
                          {project.category} · {project.year}
                        </p>
                        <h3 className="mt-3 text-5xl font-black leading-none tracking-[-0.06em] md:text-7xl">
                          {project.title}
                        </h3>
                      </div>
                      <span className="meta-type hidden font-mono md:block">{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    <div className="mt-6 grid flex-1 gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
                      <ProjectMedia project={project} />
                      <div className="flex flex-col justify-end">
                        <p className="text-lg font-medium leading-relaxed">{project.description}</p>
                        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
                          {project.technologies.slice(0, 5).map((technology) => (
                            <li key={technology} className="reactive-token">
                              {technology}
                            </li>
                          ))}
                        </ul>
                        <div className="relative z-20 mt-7 flex flex-wrap gap-3">
                          <Link
                            to={`/projects/${project.slug}`}
                            unstyled
                            data-cursor="Open case"
                            data-magnetic
                            data-signal
                            data-signal-color={accent.background}
                            className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-current px-5 font-bold transition-transform hover:-translate-y-1">
                            Case study <ArrowUpRight className="size-4" aria-hidden="true" />
                          </Link>
                          {project.github[0] && (
                            <a
                              href={project.github[0].link}
                              data-cursor="Source"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-12 items-center gap-2 px-3 font-bold">
                              <Github className="size-4" aria-hidden="true" /> Source
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
