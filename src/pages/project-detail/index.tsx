import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Github,
  Maximize2,
  Monitor,
  Pause,
  Play,
  RotateCcw,
  Smartphone,
  Tablet,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Link } from '@/components/common/link';
import type { GalleryItem, Project } from '@/data/projects';
import { getTechnologyByName } from '@/data/technologies';
import { useTheme } from '@/hooks/theme.store';
import { getProjectAccent } from '@/lib/project-accent';
import { cn } from '@/lib/utils';
import { ProjectService } from '@/services/project.service';

import { ProjectHeader } from './project-header';

const DEVICE_CONFIG = {
  desktop: { icon: Monitor, frame: 'w-full', ratio: 'aspect-[16/9]', ratioLabel: '16:9' },
  laptop: { icon: Monitor, frame: 'w-11/12', ratio: 'aspect-[16/10]', ratioLabel: '16:10' },
  tablet: { icon: Tablet, frame: 'w-3/4', ratio: 'aspect-[4/3]', ratioLabel: '4:3' },
  mobile: { icon: Smartphone, frame: 'w-[min(19rem,85%)]', ratio: 'aspect-[9/16]', ratioLabel: '9:16' }
} as const;

const TECHNOLOGY_GROUP_ORDER = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Full-Stack'];

type TechnologyCategory = Project['detailedTechnologies'][number]['category'];

const PROJECT_SYSTEM_META: Record<TechnologyCategory, { color: string; image: string }> = {
  Frontend: { color: '#ffd400', image: '/editorial/project-system-frontend.jpg' },
  Backend: { color: '#465bff', image: '/editorial/project-system-backend.jpg' },
  Database: { color: '#74f0b3', image: '/editorial/project-system-database.jpg' },
  DevOps: { color: '#ff583d', image: '/editorial/project-system-devops.jpg' },
  Tools: { color: '#6c4eff', image: '/editorial/project-system-tools.jpg' },
  'Full-Stack': { color: '#ffffff', image: '/editorial/systems-workbench.webp' }
};

const EXTRA_TECHNOLOGY_CATEGORIES: Record<string, TechnologyCategory> = {
  'ci/cd': 'DevOps',
  dayjs: 'Frontend',
  'google maps api': 'Frontend',
  'lucide react': 'Frontend',
  nodemon: 'Tools',
  openapi: 'Backend',
  postcss: 'Frontend',
  'react konva': 'Frontend',
  'react mail': 'Frontend',
  s3: 'DevOps'
};

const TECHNOLOGY_NAME_ALIASES: Record<string, string> = {
  nestjs: 'NestJS',
  ts: 'TypeScript'
};

const normalizeTechnologyName = (name: string) => name.trim().toLowerCase().replace(/\./g, '');

const getProjectTechnologyGroups = (project: Project) => {
  const groups = new Map<TechnologyCategory, string[]>();
  const detailedByName = new Map(
    project.detailedTechnologies.map((technology) => [normalizeTechnologyName(technology.name), technology])
  );

  const addTechnology = (name: string, category: TechnologyCategory) => {
    const technologies = groups.get(category) ?? [];
    if (!technologies.some((technology) => normalizeTechnologyName(technology) === normalizeTechnologyName(name))) {
      technologies.push(name);
      groups.set(category, technologies);
    }
  };

  project.technologies.forEach((name) => {
    const normalizedName = normalizeTechnologyName(name);
    const canonicalName = TECHNOLOGY_NAME_ALIASES[normalizedName] ?? name;
    const detailedTechnology = detailedByName.get(normalizeTechnologyName(canonicalName));
    const catalogTechnology = getTechnologyByName(canonicalName);
    const category =
      detailedTechnology?.category ??
      catalogTechnology?.category ??
      EXTRA_TECHNOLOGY_CATEGORIES[normalizedName] ??
      'Tools';
    addTechnology(detailedTechnology?.name ?? catalogTechnology?.name ?? name, category);
  });

  project.detailedTechnologies.forEach((technology) => addTechnology(technology.name, technology.category));

  return TECHNOLOGY_GROUP_ORDER.map((name) => ({
    name: name as TechnologyCategory,
    technologies: groups.get(name as TechnologyCategory) ?? []
  })).filter((group) => group.technologies.length > 0);
};

const parseDemoLength = (length: string) => {
  const [minutes, seconds] = length.split(':').map(Number);
  return Number.isFinite(minutes) && Number.isFinite(seconds) ? minutes * 60 + seconds : 0;
};

const formatPlaybackTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')}`;
};

const SectionHeading = ({
  title,
  description,
  compact = false,
  inverse = false
}: {
  title: string;
  description?: string;
  compact?: boolean;
  inverse?: boolean;
}) => (
  <div
    className={cn(
      'grid gap-5 border-t-2 border-current pt-5 md:grid-cols-12',
      compact ? 'mb-8 md:mb-10' : 'mb-12 md:mb-16'
    )}>
    <h2 className="text-[clamp(3rem,5vw,4.75rem)] font-black leading-[0.88] tracking-[-0.04em] md:col-span-8">
      {title}
    </h2>
    {description && (
      <p
        className={cn(
          'max-w-lg self-end text-lg leading-relaxed md:col-span-4',
          inverse ? 'text-background/65' : 'text-muted-foreground'
        )}>
        {description}
      </p>
    )}
  </div>
);

const GalleryDialog = ({
  gallery,
  index,
  onIndexChange,
  onClose
}: {
  gallery: GalleryItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(document.activeElement as HTMLElement | null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onIndexChange((index - 1 + gallery.length) % gallery.length);
      if (event.key === 'ArrowRight') onIndexChange((index + 1) % gallery.length);
      if (event.key === 'Tab') {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [gallery.length, index, onClose, onIndexChange]);

  const item = gallery[index];
  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image: ${item.title}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080808] p-4 text-white">
      <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-4">
        <p className="font-semibold">
          {item.title}{' '}
          <span className="ml-2 font-mono text-sm text-white/55">
            {index + 1}/{gallery.length}
          </span>
        </p>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="flex size-12 items-center justify-center rounded-full border-2 border-white"
          aria-label="Close gallery">
          <X aria-hidden="true" />
        </button>
      </div>
      <button
        onClick={() => onIndexChange((index - 1 + gallery.length) % gallery.length)}
        className="absolute left-4 flex size-12 items-center justify-center rounded-full border-2 border-white"
        aria-label="Previous image">
        <ChevronLeft aria-hidden="true" />
      </button>
      <img src={item.image} alt={item.title} className="max-h-[80vh] max-w-[82vw] object-contain" />
      <button
        onClick={() => onIndexChange((index + 1) % gallery.length)}
        className="absolute right-4 flex size-12 items-center justify-center rounded-full border-2 border-white"
        aria-label="Next image">
        <ChevronRight aria-hidden="true" />
      </button>
    </div>
  );
};

export const ProjectDetailPage = ({ project }: { project: Project }) => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [activeTechnologyGroup, setActiveTechnologyGroup] = useState(0);
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [isDemoMuted, setIsDemoMuted] = useState(true);
  const [isDemoTransitioning, setIsDemoTransitioning] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);
  const [demoDuration, setDemoDuration] = useState(0);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const { theme } = useTheme();
  const image = typeof project.image === 'string' ? project.image : project.image[theme];
  const demo = project.demo?.[activeDemo];
  const singleDemo = project.demo?.length === 1 ? project.demo[0] : undefined;
  const SingleDemoIcon = singleDemo ? DEVICE_CONFIG[singleDemo.device].icon : Monitor;
  const videoRef = useRef<HTMLVideoElement>(null);
  const demoFrameRef = useRef<HTMLDivElement>(null);
  const demoTransitionRef = useRef<number | null>(null);
  const accent = getProjectAccent(project.slug);
  const currentProjectRank = ProjectService.getPriorityRank(project.slug);
  const nextProject = ProjectService.getNextPriorityProject(project.slug);
  const nextProjectRank = nextProject ? ProjectService.getPriorityRank(nextProject.slug) : undefined;
  const projectCount = ProjectService.getAllProjects().length;
  const technologyGroups = getProjectTechnologyGroups(project);
  const activeTechnologyGroupData = technologyGroups[activeTechnologyGroup] ?? technologyGroups[0];
  const activeGroup = activeTechnologyGroupData?.name ?? 'Full-Stack';
  const activeTechnologies = activeTechnologyGroupData?.technologies ?? [];
  const activeSystemMeta = PROJECT_SYSTEM_META[activeGroup];
  const deviceConfig = demo ? DEVICE_CONFIG[demo.device] : DEVICE_CONFIG.desktop;
  const playbackDuration = demoDuration || (demo ? parseDemoLength(demo.length) : 0);

  const selectDemo = (index: number) => {
    if (index === activeDemo || isDemoTransitioning) return;
    videoRef.current?.pause();
    setIsDemoPlaying(false);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveDemo(index);
      setDemoProgress(0);
      setDemoDuration(0);
      return;
    }
    setIsDemoTransitioning(true);
    if (demoTransitionRef.current) window.clearTimeout(demoTransitionRef.current);
    demoTransitionRef.current = window.setTimeout(() => {
      setActiveDemo(index);
      setDemoProgress(0);
      setDemoDuration(0);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => setIsDemoTransitioning(false)));
    }, 160);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setExpandedStep(0);
    setActiveDemo(0);
    setActiveTechnologyGroup(0);
    setIsDemoPlaying(false);
    setIsDemoMuted(true);
    setDemoProgress(0);
    setDemoDuration(0);
    setShowAllGallery(false);
  }, [project.slug]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isDemoMuted;
    if (isDemoPlaying) {
      void video.play().catch(() => setIsDemoPlaying(false));
    } else {
      video.pause();
    }
  }, [activeDemo, isDemoMuted, isDemoPlaying]);

  useEffect(
    () => () => {
      if (demoTransitionRef.current) window.clearTimeout(demoTransitionRef.current);
    },
    []
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHeader />
      <main>
        <section id="hero" className="relative overflow-hidden bg-foreground text-background">
          <div className="content-shell px-5 pb-12 pt-28 md:px-8 lg:px-12">
            <div className="flex min-h-14 items-center justify-between gap-6 border-y border-background/25 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-background/60">
              <span>
                Case study {String(currentProjectRank ?? 1).padStart(2, '0')} / {String(projectCount).padStart(2, '0')}
              </span>
              <span className="text-right">
                {project.category} · {project.year} · {project.status}
              </span>
            </div>

            <div className="relative flex min-h-[clamp(22rem,48vh,30rem)] items-center border-b border-background/25 py-16 md:py-20">
              <span
                className="absolute left-0 top-0 h-2 w-[min(12rem,32vw)]"
                style={{ backgroundColor: accent.background }}
                aria-hidden="true"
              />
              <h1 className="max-w-full break-words text-[clamp(4rem,8vw,7rem)] font-black leading-[0.76] tracking-[-0.04em]">
                {project.title}
                <span style={{ color: accent.background }}>.</span>
              </h1>
            </div>

            <div className="grid border-b border-background/25 lg:grid-cols-12">
              <p className="max-w-[20ch] py-9 text-[clamp(2rem,3.5vw,3.5rem)] font-black leading-[0.94] tracking-[-0.03em] lg:col-span-8 lg:py-10 lg:pr-10">
                {project.tagline}
              </p>

              <div className="flex flex-wrap content-center gap-x-7 gap-y-2 border-t border-background/25 py-7 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8">
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-12 items-center gap-2 border-b border-background/50 font-bold">
                    Open live site
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:rotate-45 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </a>
                )}
                {project.github.map((repo) => (
                  <a
                    key={repo.link}
                    href={repo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-12 items-center gap-2 font-bold text-background/60 hover:text-background">
                    <Github className="size-4" aria-hidden="true" />
                    {repo.name}
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:rotate-45 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="tech-stack" className="border-b border-current/25 py-24 md:py-32">
          <div className="content-shell px-5 md:px-8 lg:px-12">
            <SectionHeading
              title="The working system."
              description="The project stack grouped by the responsibility each tool carries."
            />
            <div className="grid border-y border-current/25 lg:grid-cols-12">
              <div
                className="lg:col-span-4 lg:border-r lg:border-current/25"
                role="tablist"
                aria-label="Project technology groups">
                {technologyGroups.map((category, index) => (
                  <button
                    key={category.name}
                    role="tab"
                    aria-selected={activeTechnologyGroup === index}
                    aria-controls="project-technology-panel"
                    onClick={() => setActiveTechnologyGroup(index)}
                    className={cn(
                      'flex min-h-14 w-full items-center justify-between border-b border-current/20 px-5 text-left text-2xl font-black tracking-[-0.03em] last:border-0',
                      activeTechnologyGroup === index
                        ? 'bg-foreground text-background'
                        : 'text-foreground hover:bg-foreground hover:text-background'
                    )}>
                    {category.name}
                    <span
                      className="h-1 w-9"
                      style={{ backgroundColor: PROJECT_SYSTEM_META[category.name].color }}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
              <div
                id="project-technology-panel"
                role="tabpanel"
                className="relative min-h-[34rem] overflow-hidden bg-[#080808] text-white lg:col-span-8">
                <img
                  key={activeSystemMeta.image}
                  src={activeSystemMeta.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
                />
                <span className="absolute inset-0 bg-black/40" aria-hidden="true" />
                <div className="relative flex min-h-[34rem] max-w-full flex-col justify-end p-6 sm:max-w-[72%] md:p-10 lg:max-w-[68%]">
                  <span
                    className="mb-5 block h-2 w-20"
                    style={{ backgroundColor: activeSystemMeta.color }}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <h3 className="text-5xl font-black tracking-[-0.04em] md:text-6xl">{activeGroup}</h3>
                    <span className="font-mono text-xs uppercase tracking-[0.08em] text-white/65">
                      {activeTechnologies.length} tools
                    </span>
                  </div>
                  <ul
                    className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4"
                    aria-label={`${activeGroup} technologies used in ${project.title}`}>
                    {activeTechnologies.map((technology) => (
                      <li
                        key={technology}
                        className="flex items-center gap-3 border-b border-white/25 pb-3 text-base font-bold">
                        <span
                          className="size-2 shrink-0"
                          style={{ backgroundColor: activeSystemMeta.color }}
                          aria-hidden="true"
                        />
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="overview" className="border-b border-current/25 py-24 md:py-32">
          <div className="content-shell grid gap-12 px-5 md:px-8 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Product overview
                </p>
                <h2 className="mt-5 text-[clamp(3rem,5vw,4.75rem)] font-black leading-[0.88] tracking-[-0.04em]">
                  Product capabilities.
                </h2>
                <p className="mt-7 max-w-sm text-lg leading-relaxed text-muted-foreground">{project.description}</p>
              </div>
            </div>
            <div className="border-t-2 border-current lg:col-span-8">
              {project.highlights.map(({ title, description, icon: Icon }, index) => (
                <article
                  key={title}
                  className="grid gap-4 border-b border-current/25 py-6 sm:grid-cols-[3rem_1fr] md:grid-cols-[3rem_13rem_1fr] md:items-start md:gap-6">
                  <span className="font-mono text-sm font-semibold text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex size-9 shrink-0 items-center justify-center"
                      style={{ backgroundColor: accent.background, color: accent.foreground }}>
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <h3 className="text-xl font-black leading-tight tracking-[-0.025em]">{title}</h3>
                  </div>
                  <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {project.demo && project.demo.length > 0 && (
          <section id="demo" className="bg-foreground py-28 text-background md:py-40">
            <div className="content-shell px-5 md:px-8 lg:px-12">
              <SectionHeading
                title="See it move."
                description={
                  project.demo.length > 1
                    ? 'Recorded walkthroughs of the working product.'
                    : 'A recorded walkthrough of the working product.'
                }
                inverse
              />
              <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                <div className="border-y border-current/25 lg:col-span-4">
                  {project.demo.length > 1 ? (
                    <div className="grid grid-cols-3 lg:grid-cols-1" role="group" aria-label="Choose demo device">
                      {project.demo.map((item, index) => {
                        const Icon = DEVICE_CONFIG[item.device].icon;
                        return (
                          <button
                            key={item.device}
                            type="button"
                            onClick={() => selectDemo(index)}
                            aria-pressed={activeDemo === index}
                            className={cn(
                              'flex min-h-16 items-center gap-3 border-r border-current/25 px-3 text-left font-bold capitalize last:border-r-0 lg:border-b lg:border-r-0 lg:last:border-b-0',
                              activeDemo === index && 'bg-background text-foreground'
                            )}>
                            <Icon
                              className={cn('size-5', item.device === 'tablet' && '-rotate-90')}
                              aria-hidden="true"
                            />
                            <span>
                              {item.device}
                              <span className="mt-0.5 block font-mono text-xs opacity-60">{item.length}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : singleDemo ? (
                    <div className="flex min-h-16 items-center gap-3 bg-background px-4 font-bold capitalize text-foreground">
                      <SingleDemoIcon
                        className={cn('size-5', singleDemo.device === 'tablet' && '-rotate-90')}
                        aria-hidden="true"
                      />
                      <span>
                        {singleDemo.device} recording
                        <span className="mt-0.5 block font-mono text-xs opacity-60">{singleDemo.length}</span>
                      </span>
                    </div>
                  ) : null}
                  <div className="border-t border-current/25 p-4">
                    <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.08em]">
                      <span>Playback</span>
                      <span className="text-background/65">
                        {formatPlaybackTime(demoProgress)} / {demo?.length ?? '0:00'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={playbackDuration || 1}
                      step="0.1"
                      value={Math.min(demoProgress, playbackDuration || 1)}
                      disabled={!demo}
                      onChange={(event) => {
                        const nextTime = Number(event.target.value);
                        setDemoProgress(nextTime);
                        if (videoRef.current) videoRef.current.currentTime = nextTime;
                      }}
                      aria-label={`Seek ${demo?.device ?? ''} demo`}
                      className="mt-4 h-6 w-full cursor-pointer accent-current disabled:cursor-not-allowed disabled:opacity-40"
                    />
                  </div>
                  <div className="grid grid-cols-2 border-t border-current/25">
                    <button
                      type="button"
                      onClick={() => setIsDemoPlaying((playing) => !playing)}
                      className="flex min-h-14 items-center justify-center gap-2 border-b border-r border-current/25 bg-background px-3 font-bold text-foreground">
                      {isDemoPlaying ? (
                        <Pause className="size-4" aria-hidden="true" />
                      ) : (
                        <Play className="size-4" aria-hidden="true" />
                      )}
                      {isDemoPlaying ? 'Stop' : 'Play'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsDemoPlaying(false);
                        window.requestAnimationFrame(() => {
                          if (!videoRef.current) return;
                          videoRef.current.currentTime = 0;
                          setDemoProgress(0);
                        });
                      }}
                      className="flex min-h-14 items-center justify-center gap-2 border-b border-current/25 px-3 font-bold">
                      <RotateCcw className="size-4" aria-hidden="true" />
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsDemoMuted((muted) => !muted)}
                      className="flex min-h-14 items-center justify-center gap-2 border-r border-current/25 px-3 font-bold">
                      {isDemoMuted ? (
                        <VolumeX className="size-4" aria-hidden="true" />
                      ) : (
                        <Volume2 className="size-4" aria-hidden="true" />
                      )}
                      {isDemoMuted ? 'Unmute' : 'Mute'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const frame = demoFrameRef.current;
                        if (frame?.requestFullscreen) void frame.requestFullscreen().catch(() => undefined);
                      }}
                      className="flex min-h-14 items-center justify-center gap-2 px-3 font-bold">
                      <Maximize2 className="size-4" aria-hidden="true" />
                      Full screen
                    </button>
                  </div>
                  {demo && (
                    <dl className="grid grid-cols-2 border-t border-current/25 text-sm">
                      <div className="border-b border-r border-current/25 p-4">
                        <dt className="font-mono text-xs uppercase tracking-[0.08em] text-background/65">Frame</dt>
                        <dd className="mt-1 font-bold">{deviceConfig.ratioLabel}</dd>
                      </div>
                      <div className="border-b border-current/25 p-4">
                        <dt className="font-mono text-xs uppercase tracking-[0.08em] text-background/65">Run time</dt>
                        <dd className="mt-1 font-bold">{demo.length}</dd>
                      </div>
                      <div className="border-r border-current/25 p-4">
                        <dt className="font-mono text-xs uppercase tracking-[0.08em] text-background/65">View</dt>
                        <dd className="mt-1 font-bold capitalize">{demo.device}</dd>
                      </div>
                      <div className="p-4">
                        <dt className="font-mono text-xs uppercase tracking-[0.08em] text-background/65">Audio</dt>
                        <dd className="mt-1 font-bold">{isDemoMuted ? 'Muted' : 'On'}</dd>
                      </div>
                    </dl>
                  )}
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-14 items-center justify-between border-t border-current/25 px-4 font-bold">
                      Open working product
                      <ArrowUpRight
                        className="size-4 transition-transform duration-200 group-hover:rotate-45 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
                {demo && (
                  <div className="flex min-h-[22rem] items-center justify-center md:min-h-[32rem] lg:col-span-8">
                    <div
                      ref={demoFrameRef}
                      className={cn(
                        'max-w-full origin-center border border-background bg-background p-3 text-foreground transition-[width,opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:p-4',
                        deviceConfig.frame,
                        isDemoTransitioning ? 'scale-[0.985] opacity-0' : 'scale-100 opacity-100'
                      )}>
                      <div className="mb-3 flex items-center gap-2">
                        <span className="size-2.5 rounded-full bg-[#ff583d]" aria-hidden="true" />
                        <span className="size-2.5 rounded-full bg-[#465bff]" aria-hidden="true" />
                        <span className="size-2.5 rounded-full bg-[#ffd400]" aria-hidden="true" />
                        <span className="ml-3 truncate font-mono text-xs text-foreground/55">
                          {project.liveDemo?.replace('https://', '') ?? project.title}
                        </span>
                      </div>
                      <div className={cn('relative overflow-hidden bg-black', deviceConfig.ratio)}>
                        <video
                          ref={videoRef}
                          key={demo.link}
                          muted={isDemoMuted}
                          playsInline
                          preload="metadata"
                          poster={demo.preview ?? image}
                          onLoadedMetadata={(event) => setDemoDuration(event.currentTarget.duration)}
                          onTimeUpdate={(event) => setDemoProgress(event.currentTarget.currentTime)}
                          onPlay={() => setIsDemoPlaying(true)}
                          onPause={() => setIsDemoPlaying(false)}
                          onEnded={() => setIsDemoPlaying(false)}
                          className="size-full object-contain">
                          <source src={demo.link} type="video/mp4" />
                          Your browser does not support video playback.
                        </video>
                        {!isDemoPlaying && (
                          <button
                            type="button"
                            onClick={() => setIsDemoPlaying(true)}
                            className="absolute inset-0 flex items-center justify-center bg-black/35 text-white transition-colors duration-200 hover:bg-black/25 motion-reduce:transition-none"
                            aria-label={`Play ${demo.device} demo`}>
                            <span className="flex size-16 items-center justify-center rounded-full border-2 border-white bg-black/60">
                              <Play className="ml-1 size-6" aria-hidden="true" />
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <section id="journey" className="border-b border-current/25 py-28 md:py-40">
          <div className="content-shell grid gap-14 px-5 md:px-8 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <h2 className="text-[clamp(3rem,5vw,4.75rem)] font-black leading-[0.88] tracking-[-0.04em]">
                  Build log.
                </h2>
                <p className="mt-7 max-w-sm text-lg leading-relaxed text-muted-foreground">
                  The implementation sequence, pivotal choices, and what each phase delivered.
                </p>
              </div>
            </div>
            <div className="border-t-2 border-current lg:col-span-8">
              {project.developmentJourney.steps.map((step, index) => {
                const isExpanded = expandedStep === index;
                const triggerId = `build-step-trigger-${index}`;
                const panelId = `build-step-panel-${index}`;

                return (
                  <article key={`${step.id}-${step.title}`} className="border-b border-current/25">
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => setExpandedStep((current) => (current === index ? null : index))}
                      className={cn(
                        'grid w-full gap-4 px-4 py-6 text-left transition-colors duration-200 md:grid-cols-[4rem_1fr_auto] md:items-center md:px-5',
                        isExpanded
                          ? 'bg-foreground text-background'
                          : 'hover:bg-foreground/5 focus-visible:bg-foreground/5'
                      )}>
                      <span
                        className={cn(
                          'font-mono text-sm font-semibold transition-colors duration-200',
                          isExpanded ? 'text-background/60' : 'text-muted-foreground'
                        )}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-3xl font-black leading-[0.95] tracking-[-0.03em] md:text-4xl">
                          {step.title}
                        </span>
                        <span
                          className={cn(
                            'mt-2 block text-sm transition-colors duration-200',
                            isExpanded ? 'text-background/60' : 'text-muted-foreground'
                          )}>
                          {step.duration}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'flex size-11 items-center justify-center border transition-[background-color,color,transform] duration-300 motion-reduce:transition-none',
                          isExpanded
                            ? 'rotate-180 border-background bg-background text-foreground'
                            : 'border-current text-foreground'
                        )}>
                        <ChevronDown className="size-5" aria-hidden="true" />
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      aria-hidden={!isExpanded}
                      className={cn(
                        'grid transition-[grid-template-rows] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                        isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      )}>
                      <div className="overflow-hidden">
                        <div
                          className={cn(
                            'grid gap-10 px-4 pb-12 pt-9 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:ml-[4rem] md:grid-cols-2 md:px-5',
                            isExpanded ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                          )}>
                          <div>
                            <h4 className="border-b border-current/25 pb-3 text-xl font-black tracking-[-0.02em]">
                              Decisions
                            </h4>
                            <ul className="mt-6 space-y-6 text-base leading-relaxed text-muted-foreground">
                              {step.decisions.map((item) => (
                                <li key={item.decision}>
                                  <strong className="mb-1 block text-lg leading-snug text-foreground">
                                    {item.decision}
                                  </strong>
                                  {item.reasoning}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="border-b border-current/25 pb-3 text-xl font-black tracking-[-0.02em]">
                              Delivered
                            </h4>
                            <ul className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                              {step.achievements.map((achievement) => (
                                <li key={achievement} className="grid grid-cols-[0.5rem_1fr] gap-3">
                                  <span
                                    className="mt-[0.65em] size-1.5"
                                    style={{ backgroundColor: accent.background }}
                                    aria-hidden="true"
                                  />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {step.technologies && (
                            <p className="border-t border-current/25 pt-4 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground md:col-span-2">
                              {step.technologies.join(' / ')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {project.gallery.length > 0 && (
          <section id="gallery" className="border-b border-current/25 py-20 md:py-24">
            <div className="content-shell px-5 md:px-8 lg:px-12">
              <SectionHeading
                title="Selected evidence."
                description="Interface screens and technical diagrams, kept together for closer inspection."
                compact
              />
              <div className="grid gap-px border border-current/25 bg-current/25 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((item, index) => (
                  <button
                    key={item.image}
                    onClick={() => setLightboxIndex(index)}
                    className={cn('group min-h-11 bg-background text-left', !showAllGallery && index >= 9 && 'hidden')}>
                    <span className="flex h-[clamp(13rem,20vw,18rem)] items-center overflow-hidden bg-white p-2">
                      <img
                        src={item.image}
                        alt=""
                        loading={index > 2 ? 'lazy' : undefined}
                        className="size-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </span>
                    <span className="flex min-h-14 items-center justify-between gap-4 px-4 py-3 font-bold group-hover:bg-foreground group-hover:text-background">
                      <span>{item.title}</span>
                      <span className="flex items-center gap-1.5 text-sm font-semibold">
                        Full size
                        <ArrowUpRight
                          className="size-3.5 transition-transform group-hover:rotate-45"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              {project.gallery.length > 9 && (
                <button
                  type="button"
                  onClick={() => setShowAllGallery((visible) => !visible)}
                  aria-expanded={showAllGallery}
                  className="mt-8 inline-flex min-h-12 items-center gap-3 border-b-2 border-current text-lg font-bold">
                  {showAllGallery ? 'Show selected evidence' : `View all ${project.gallery.length} artefacts`}
                  <ChevronDown
                    className={cn('size-5 transition-transform', showAllGallery && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
          </section>
        )}

        {nextProject && (
          <section className="relative bg-foreground text-background">
            <span
              className="absolute inset-x-0 top-0 h-2"
              style={{ backgroundColor: getProjectAccent(nextProject.slug).background }}
              aria-hidden="true"
            />
            <Link
              to={`/projects/${nextProject.slug}`}
              unstyled
              className="content-shell group grid min-h-[26rem] content-between px-5 py-20 md:px-8 lg:px-12">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.12em] text-background/55">
                <span>Next in priority</span>
                <span>
                  {nextProjectRank !== undefined && (
                    <>
                      {String(nextProjectRank).padStart(2, '0')} / {String(projectCount).padStart(2, '0')} &middot;{' '}
                    </>
                  )}
                  {nextProject.category} / {nextProject.year}
                </span>
              </div>
              <h2 className="break-words text-[clamp(4rem,6vw,6rem)] font-black leading-[0.82] tracking-[-0.04em]">
                {nextProject.title}
              </h2>
              <span className="inline-flex min-h-12 items-center gap-2 justify-self-start border-b border-current text-lg font-bold">
                Open case study
                <ArrowUpRight className="transition-transform duration-200 group-hover:rotate-45" aria-hidden="true" />
              </span>
            </Link>
          </section>
        )}
      </main>

      {lightboxIndex !== null && (
        <GalleryDialog
          gallery={project.gallery}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};
