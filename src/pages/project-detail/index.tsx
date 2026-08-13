import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CloudCog,
  Code2,
  Database,
  Github,
  Layers3,
  Maximize2,
  Monitor,
  Pause,
  Play,
  RotateCcw,
  ServerCog,
  Smartphone,
  Tablet,
  Volume2,
  VolumeX,
  Wrench,
  X
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from '@/components/common/link';
import { SectionNavigator } from '@/components/common/section-navigator';
import { getNextPriorityProject, getProjectPriorityRank, projectSummaries } from '@/data/project-summaries';
import type { GalleryItem, Project } from '@/data/projects';
import { getTechnologyByName } from '@/data/technologies';
import { useTheme } from '@/hooks/theme.store';
import { useRouteScroll } from '@/hooks/use-route-scroll';
import { getProjectAccent } from '@/lib/project-accent';
import { celebrateProjectJourney, readProjectJourney, visitProject, writeProjectJourney } from '@/lib/project-journey';
import { cn } from '@/lib/utils';

import { ProjectHeader } from './project-header';

const DEVICE_CONFIG = {
  desktop: { icon: Monitor, frame: 'w-full', ratio: 'aspect-[16/9]', ratioLabel: '16:9' },
  laptop: { icon: Monitor, frame: 'w-11/12', ratio: 'aspect-[16/10]', ratioLabel: '16:10' },
  tablet: { icon: Tablet, frame: 'w-3/4', ratio: 'aspect-[4/3]', ratioLabel: '4:3' },
  mobile: { icon: Smartphone, frame: 'w-[min(19rem,85%)]', ratio: 'aspect-[9/16]', ratioLabel: '9:16' }
} as const;

const TECHNOLOGY_GROUP_ORDER = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Full-Stack'];

type TechnologyCategory = Project['detailedTechnologies'][number]['category'];

const PROJECT_SYSTEM_META: Record<TechnologyCategory, { color: string; image: string; icon: typeof Code2 }> = {
  Frontend: { color: '#ffd400', image: '/editorial/project-system-frontend.jpg', icon: Code2 },
  Backend: { color: '#465bff', image: '/editorial/project-system-backend.jpg', icon: ServerCog },
  Database: { color: '#74f0b3', image: '/editorial/project-system-database.jpg', icon: Database },
  DevOps: { color: '#ff583d', image: '/editorial/project-system-devops.jpg', icon: CloudCog },
  Tools: { color: '#6c4eff', image: '/editorial/project-system-tools.jpg', icon: Wrench },
  'Full-Stack': { color: '#6c4eff', image: '/editorial/systems-workbench.webp', icon: Layers3 }
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

const SIGNAL_COLORS = ['#74f0b3', '#ffd400', '#465bff', '#ff583d', '#6c4eff'] as const;
const PORTFOLIO_PROJECT_SLUGS = projectSummaries.map((project) => project.slug);

const ProjectSignalRail = ({
  items,
  label,
  reverse = false,
  duration = 42
}: {
  items: { label: string; color: string }[];
  label: string;
  reverse?: boolean;
  duration?: number;
}) => (
  <div
    className="signal-rail-wrap overflow-hidden border-y border-background/20 bg-foreground py-3 text-background"
    role="group"
    aria-label={`${label}: ${items.map((item) => item.label).join(', ')}`}
    tabIndex={0}>
    <div
      className={cn(
        'signal-rail flex w-max whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-[0.12em] md:text-sm',
        reverse && 'signal-rail-reverse'
      )}
      style={{ animationDuration: `${duration}s` }}
      aria-hidden="true">
      {[0, 1].map((copy) => (
        <span key={copy} className="flex shrink-0 items-center gap-7 pr-7">
          {items.map((item) => (
            <span key={`${copy}-${item.label}`} className="flex items-center gap-7">
              {item.label}
              <span className="size-1.5 rounded-full" style={{ backgroundColor: item.color }} />
            </span>
          ))}
        </span>
      ))}
    </div>
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
  const swipeStartRef = useRef<number | null>(null);
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
      onPointerDown={(event) => {
        if (event.pointerType === 'touch') swipeStartRef.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (event.pointerType !== 'touch' || swipeStartRef.current === null) return;
        const distance = event.clientX - swipeStartRef.current;
        swipeStartRef.current = null;
        if (Math.abs(distance) < 45) return;
        onIndexChange(distance > 0 ? (index - 1 + gallery.length) % gallery.length : (index + 1) % gallery.length);
      }}
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
      <img
        key={item.image}
        src={item.image}
        alt={item.title}
        className="gallery-dialog-image max-h-[80vh] max-w-[82vw] object-contain"
      />
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
  useRouteScroll(project.slug);
  const navigate = useNavigate();
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
  const [projectJourney, setProjectJourney] = useState(() => readProjectJourney(PORTFOLIO_PROJECT_SLUGS));
  const [showJourneyComplete, setShowJourneyComplete] = useState(false);
  const { theme } = useTheme();
  const image = typeof project.image === 'string' ? project.image : project.image[theme];
  const demo = project.demo?.[activeDemo];
  const singleDemo = project.demo?.length === 1 ? project.demo[0] : undefined;
  const SingleDemoIcon = singleDemo ? DEVICE_CONFIG[singleDemo.device].icon : Monitor;
  const videoRef = useRef<HTMLVideoElement>(null);
  const demoFrameRef = useRef<HTMLDivElement>(null);
  const demoTransitionRef = useRef<number | null>(null);
  const journeyRedirectRef = useRef<number | null>(null);
  const accent = getProjectAccent(project.slug);
  const currentProjectRank = getProjectPriorityRank(project.slug);
  const nextProject = getNextPriorityProject(project.slug);
  const nextProjectRank = nextProject ? getProjectPriorityRank(nextProject.slug) : undefined;
  const projectCount = projectSummaries.length;
  const visitedProjectCount = projectJourney.visited.length;
  const projectJourneyProgress = projectCount > 0 ? visitedProjectCount / projectCount : 0;
  const technologyGroups = getProjectTechnologyGroups(project);
  const projectFlowItems = project.highlights.map((highlight, index) => ({
    label: highlight.title,
    color: SIGNAL_COLORS[index % SIGNAL_COLORS.length]
  }));
  const technologySignalItems = technologyGroups.flatMap((group) =>
    group.technologies.map((technology) => ({
      label: technology,
      color: PROJECT_SYSTEM_META[group.name].color
    }))
  );
  const activeTechnologyGroupData = technologyGroups[activeTechnologyGroup] ?? technologyGroups[0];
  const activeGroup = activeTechnologyGroupData?.name ?? 'Full-Stack';
  const activeTechnologies = activeTechnologyGroupData?.technologies ?? [];
  const activeSystemMeta = PROJECT_SYSTEM_META[activeGroup];
  const deviceConfig = demo ? DEVICE_CONFIG[demo.device] : DEVICE_CONFIG.desktop;
  const playbackDuration = demoDuration || (demo ? parseDemoLength(demo.length) : 0);
  const sectionNavigationItems = useMemo(
    () => [
      { id: 'hero', label: 'Summary', color: accent.background },
      { id: 'overview', label: 'Product', color: '#ffd400' },
      ...(project.demo?.length ? [{ id: 'demo', label: 'Working proof', color: '#465bff' }] : []),
      { id: 'journey', label: 'Decisions', color: '#74f0b3' },
      { id: 'tech-stack', label: 'System', color: '#6c4eff' },
      ...(project.gallery.length ? [{ id: 'gallery', label: 'Evidence', color: '#ff583d' }] : [])
    ],
    [accent.background, project.demo?.length, project.gallery.length]
  );

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

  const selectAdjacentTechnologyGroup = (direction: number) => {
    const nextIndex = (activeTechnologyGroup + direction + technologyGroups.length) % technologyGroups.length;
    setActiveTechnologyGroup(nextIndex);
    window.requestAnimationFrame(() =>
      document.querySelector<HTMLButtonElement>(`[data-project-skill-index="${nextIndex}"]`)?.focus()
    );
  };

  useEffect(() => {
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
    const nextJourney = visitProject(
      readProjectJourney(PORTFOLIO_PROJECT_SLUGS),
      project.slug,
      PORTFOLIO_PROJECT_SLUGS
    );
    writeProjectJourney(nextJourney);
    setProjectJourney(nextJourney);
  }, [project.slug]);

  useEffect(() => {
    const journeyIsComplete =
      projectJourney.visited.length === PORTFOLIO_PROJECT_SLUGS.length && !projectJourney.celebrated;
    if (!journeyIsComplete) return;

    const revealCompletionAtPageEnd = () => {
      const remainingDistance = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      if (remainingDistance > Math.min(240, window.innerHeight * 0.2)) return;

      const completedJourney = celebrateProjectJourney(projectJourney, PORTFOLIO_PROJECT_SLUGS);
      writeProjectJourney(completedJourney);
      setProjectJourney(completedJourney);
      setShowJourneyComplete(true);
    };

    revealCompletionAtPageEnd();
    window.addEventListener('scroll', revealCompletionAtPageEnd, { passive: true });
    window.addEventListener('resize', revealCompletionAtPageEnd);
    return () => {
      window.removeEventListener('scroll', revealCompletionAtPageEnd);
      window.removeEventListener('resize', revealCompletionAtPageEnd);
    };
  }, [projectJourney]);

  useEffect(() => {
    if (!showJourneyComplete) return;

    journeyRedirectRef.current = window.setTimeout(() => navigate('/#contact'), 3600);
    return () => {
      if (journeyRedirectRef.current) window.clearTimeout(journeyRedirectRef.current);
    };
  }, [navigate, showJourneyComplete]);

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
      <a
        href="#overview"
        className="fixed left-4 top-4 z-[190] -translate-y-24 bg-primary px-4 py-3 text-primary-foreground focus:translate-y-0">
        Skip to project details
      </a>
      <ProjectHeader />
      <SectionNavigator items={sectionNavigationItems} className="2xl:right-8" />
      <main>
        <section id="hero" className="relative overflow-hidden border-b border-current/25">
          <div className="content-shell px-5 pb-8 pt-16 md:px-8 md:pb-12 md:pt-16 lg:px-12">
            <div className="border-y border-current/25">
              <div className="flex min-h-14 items-center justify-between gap-6 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                <span>
                  Case study {String(currentProjectRank ?? 1).padStart(2, '0')} /{' '}
                  {String(projectCount).padStart(2, '0')}
                </span>
                <span className="text-right">
                  Viewed {String(visitedProjectCount).padStart(2, '0')} / {String(projectCount).padStart(2, '0')}
                </span>
              </div>
              <span
                role="progressbar"
                aria-label="Portfolio case studies viewed"
                aria-valuemin={0}
                aria-valuemax={projectCount}
                aria-valuenow={visitedProjectCount}
                className="block h-2 overflow-hidden bg-current/10">
                <span
                  className="block h-full origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                  style={{ backgroundColor: accent.background, transform: `scaleX(${projectJourneyProgress})` }}
                />
              </span>
            </div>

            <div className="grid border-b border-current/25 lg:grid-cols-12">
              <div className="relative flex min-h-0 flex-col justify-end py-10 lg:col-span-8 lg:min-h-[30rem] lg:border-r lg:border-current/25 lg:py-14 lg:pr-12">
                <h1
                  className="project-hero-type interactive-type reactive-heading max-w-full break-words"
                  data-signal
                  data-signal-color={accent.background}
                  data-mobile-title-size={
                    project.title.length <= 6 ? 'short' : project.title.length <= 9 ? 'medium' : 'long'
                  }>
                  {project.title}
                  <span style={{ color: accent.background }}>.</span>
                </h1>
                <p className="mt-6 max-w-[22ch] text-[1.5rem] font-black leading-[1.04] tracking-[-0.025em] md:mt-9 md:text-[clamp(1.75rem,2.5vw,2.625rem)]">
                  {project.tagline}
                </p>
              </div>

              <div className="flex flex-col justify-between gap-7 py-7 lg:col-span-4 lg:min-h-[30rem] lg:gap-10 lg:py-10 lg:pl-10">
                <p className="max-w-[30rem] text-lg font-semibold leading-relaxed md:text-xl">{project.description}</p>
                <dl className="border-t border-current/25">
                  {[
                    ['Scope', project.category],
                    ['Year', project.year],
                    ['Status', project.status],
                    ['System', `${technologyGroups.length} responsibility layers`]
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="reactive-meta-row grid grid-cols-[5.25rem_1fr] gap-4 border-b border-current/25 py-3.5 md:grid-cols-[6rem_1fr] md:gap-5 md:py-4">
                      <dt className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="font-bold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-current/25 md:flex md:flex-wrap md:items-center md:gap-x-8 md:gap-y-2 md:py-5">
              <span
                className="hidden h-3 w-3 shrink-0 md:block"
                style={{ backgroundColor: accent.background }}
                aria-hidden="true"
              />
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-signal
                  data-signal-color={accent.background}
                  className="group col-span-2 inline-flex min-h-14 items-center justify-between gap-2 border-b border-current/25 px-3 font-bold md:min-h-12 md:justify-start md:border-current/50 md:px-0">
                  Open live product
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
                  data-signal
                  data-signal-color={accent.background}
                  className="group inline-flex min-h-14 items-center gap-2 border-r border-current/25 px-3 font-bold text-muted-foreground last:border-r-0 hover:text-foreground md:min-h-12 md:border-r-0 md:px-0">
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
        </section>

        <ProjectSignalRail items={projectFlowItems} label={`${project.title} product flow`} duration={34} />

        <section id="overview" className="border-b border-current/25 py-16 md:py-32">
          <div className="content-shell px-5 md:px-8 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-24">
                  <h2 className="case-study-primary-type reactive-heading max-w-[10ch]">
                    What the product had to hold together.
                  </h2>
                </div>
              </div>
              <div className="grid border-t-2 border-current sm:grid-cols-2 lg:col-span-7">
                {project.highlights.map(({ title, description, icon: Icon }, index) => (
                  <article
                    key={title}
                    className="reactive-capability grid min-h-0 grid-cols-[1.5rem_1fr_auto] gap-2 border-b border-current/25 px-2 py-5 sm:flex sm:min-h-56 sm:flex-col sm:justify-between sm:p-6 sm:odd:border-r md:p-8">
                    <div className="contents sm:flex sm:items-center sm:justify-between sm:gap-4">
                      <span className="font-mono text-xs font-semibold text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <Icon
                        className="order-3 size-5 sm:order-none"
                        style={{ color: accent.background }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="col-start-2 row-start-1 sm:block">
                      <h3 className="text-lg font-black leading-tight tracking-[-0.02em] md:text-2xl">{title}</h3>
                      <p className="mt-2 max-w-md text-base leading-relaxed text-muted-foreground sm:mt-3">
                        {description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {project.demo && project.demo.length > 0 && (
          <section id="demo" className="bg-foreground py-16 text-background md:py-32">
            <div className="content-shell px-5 md:px-8 lg:px-12">
              <div className="mb-8 grid gap-4 border-t-2 border-current pt-5 md:mb-12 md:gap-8 lg:grid-cols-12 lg:items-end">
                <h2 className="case-study-primary-type reactive-heading max-w-[11ch] lg:col-span-8">
                  The product, working.
                </h2>
                <p className="max-w-lg text-lg leading-relaxed text-background/65 lg:col-span-4">
                  {project.demo.length > 1
                    ? 'Switch between recorded views of the same working product.'
                    : 'A recorded view of the working product.'}
                </p>
              </div>
              <div className="grid min-w-0 gap-6 lg:grid-cols-12 lg:gap-8 lg:items-stretch">
                <div className="order-2 min-w-0 border-y border-current/25 lg:order-1 lg:col-span-3">
                  {project.demo.length > 1 ? (
                    <div
                      className="mobile-scroll-strip flex snap-x snap-mandatory overflow-x-auto lg:grid lg:grid-cols-1 lg:overflow-visible"
                      role="group"
                      aria-label="Choose demo device">
                      {project.demo.map((item, index) => {
                        const Icon = DEVICE_CONFIG[item.device].icon;
                        return (
                          <button
                            key={item.device}
                            type="button"
                            onClick={() => selectDemo(index)}
                            data-cursor={`Show ${item.device}`}
                            data-signal
                            data-signal-color={accent.background}
                            aria-pressed={activeDemo === index}
                            className={cn(
                              'reactive-tab flex min-h-14 min-w-[6.5rem] flex-1 snap-start items-center justify-center gap-2 border-r border-current/25 px-2 text-left text-sm font-bold capitalize last:border-r-0 sm:min-w-[7rem] lg:min-h-16 lg:min-w-0 lg:justify-start lg:gap-3 lg:border-b lg:border-r-0 lg:px-3 lg:text-base lg:last:border-b-0',
                              activeDemo === index && 'bg-background text-foreground'
                            )}>
                            <Icon
                              className={cn('size-5', item.device === 'tablet' && '-rotate-90')}
                              aria-hidden="true"
                            />
                            <span>
                              <span>{item.device}</span>
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
                  <div className="border-t border-current/25 p-4 lg:block">
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
                      data-signal
                      data-signal-color={accent.background}
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
                      data-signal
                      data-signal-color={accent.background}
                      className="flex min-h-14 items-center justify-center gap-2 border-b border-current/25 px-3 font-bold">
                      <RotateCcw className="size-4" aria-hidden="true" />
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsDemoMuted((muted) => !muted)}
                      data-signal
                      data-signal-color={accent.background}
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
                      data-signal
                      data-signal-color={accent.background}
                      className="flex min-h-14 items-center justify-center gap-2 px-3 font-bold">
                      <Maximize2 className="size-4" aria-hidden="true" />
                      Full screen
                    </button>
                  </div>
                  {demo && (
                    <dl className="hidden grid-cols-2 border-t border-current/25 text-sm sm:grid">
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
                  <div className="order-1 flex min-h-[15rem] min-w-0 items-center justify-center md:min-h-[32rem] lg:order-2 lg:col-span-9">
                    <div
                      ref={demoFrameRef}
                      className={cn(
                        'max-w-full origin-center border border-background bg-background p-2 text-foreground transition-[width,opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:p-4',
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
                          preload="none"
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

        <section id="journey" className="border-b border-current/25 py-16 md:py-32">
          <div className="content-shell grid gap-8 px-5 md:px-8 lg:grid-cols-12 lg:gap-14 lg:px-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <h2 className="case-study-primary-type reactive-heading max-w-[10ch]">Decisions that shaped it.</h2>
                <p className="mt-4 max-w-sm text-lg leading-relaxed text-muted-foreground md:mt-7">
                  The implementation sequence matters where it exposes a choice, constraint, or delivered result.
                </p>
              </div>
            </div>
            <div className="border-t-2 border-current lg:col-span-8">
              {project.developmentJourney.steps.map((step, index) => {
                const isExpanded = expandedStep === index;
                const triggerId = `build-step-trigger-${index}`;
                const panelId = `build-step-panel-${index}`;

                return (
                  <article key={`${step.id}-${step.title}`} className="reactive-stack-row border-b border-current/25">
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => setExpandedStep((current) => (current === index ? null : index))}
                      data-cursor={isExpanded ? 'Collapse' : 'Open decision'}
                      data-signal
                      data-signal-color={SIGNAL_COLORS[index % SIGNAL_COLORS.length]}
                      className={cn(
                        'grid w-full grid-cols-[2rem_1fr_auto] items-center gap-3 px-3 py-5 text-left transition-colors duration-200 md:grid-cols-[4rem_1fr_auto] md:gap-4 md:px-5 md:py-6',
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
                        <span className="block text-xl font-black leading-[1] tracking-[-0.025em] md:text-3xl">
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
                      {...(!isExpanded ? ({ inert: '' } as Record<string, string>) : {})}
                      className={cn(
                        'grid transition-[grid-template-rows] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                        isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      )}>
                      <div className="overflow-hidden">
                        <div
                          className={cn(
                            'grid gap-8 px-3 pb-9 pt-7 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:ml-[4rem] md:grid-cols-2 md:gap-10 md:px-5 md:pb-12 md:pt-9',
                            isExpanded ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                          )}>
                          <div>
                            <h3 className="border-b border-current/25 pb-3 text-xl font-black tracking-[-0.02em]">
                              Decisions
                            </h3>
                            <ul className="mt-6 space-y-6 text-base leading-relaxed text-muted-foreground">
                              {step.decisions.map((item) => (
                                <li key={item.decision} className="reactive-decision">
                                  <strong className="mb-1 block text-lg leading-snug text-foreground">
                                    {item.decision}
                                  </strong>
                                  {item.reasoning}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="border-b border-current/25 pb-3 text-xl font-black tracking-[-0.02em]">
                              Delivered
                            </h3>
                            <ul className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                              {step.achievements.map((achievement) => (
                                <li
                                  key={achievement}
                                  className="reactive-achievement grid grid-cols-[0.5rem_1fr] gap-3">
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

        <section id="tech-stack" className="border-b border-current/25 py-16 md:py-28">
          <div className="content-shell px-5 md:px-8 lg:px-12">
            <div className="mb-8 grid gap-4 border-t-2 border-current pt-5 md:mb-10 md:grid-cols-12 md:gap-5">
              <h2 className="case-study-supporting-type reactive-heading md:col-span-8">The working system.</h2>
              <p className="max-w-lg self-end text-lg leading-relaxed text-muted-foreground md:col-span-4">
                Choose a responsibility to inspect the tools behind this project.
              </p>
            </div>

            <div className="grid border-y border-current/25 lg:grid-cols-12">
              <div
                className="flex lg:col-span-4 lg:block lg:border-r lg:border-current/25"
                role="tablist"
                aria-label="Technology groups">
                {technologyGroups.map((group, index) => {
                  const GroupIcon = PROJECT_SYSTEM_META[group.name].icon;
                  return (
                    <button
                      key={group.name}
                      data-project-skill-index={index}
                      data-signal
                      data-signal-color={PROJECT_SYSTEM_META[group.name].color}
                      type="button"
                      role="tab"
                      aria-selected={activeTechnologyGroup === index}
                      tabIndex={activeTechnologyGroup === index ? 0 : -1}
                      aria-controls="project-technology-panel"
                      onClick={() => setActiveTechnologyGroup(index)}
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                          event.preventDefault();
                          selectAdjacentTechnologyGroup(1);
                        }
                        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                          event.preventDefault();
                          selectAdjacentTechnologyGroup(-1);
                        }
                      }}
                      className={cn(
                        'reactive-tab flex min-h-14 min-w-0 flex-1 items-center justify-center border-r border-current/20 px-2 last:border-r-0 lg:w-full lg:justify-between lg:gap-4 lg:border-b lg:border-r-0 lg:px-5 lg:text-left lg:text-xl lg:font-black lg:tracking-[-0.025em] lg:last:border-b-0 xl:text-2xl',
                        activeTechnologyGroup === index
                          ? 'bg-foreground text-background'
                          : 'hover:bg-foreground hover:text-background'
                      )}>
                      <GroupIcon className="size-5 lg:hidden" aria-hidden="true" />
                      <span className="sr-only lg:not-sr-only">{group.name}</span>
                      <span
                        className="hidden h-1 w-9 origin-right transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:block"
                        style={{
                          backgroundColor: PROJECT_SYSTEM_META[group.name].color,
                          transform: activeTechnologyGroup === index ? 'scaleX(1)' : 'scaleX(0.111111)'
                        }}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>

              <div
                id="project-technology-panel"
                role="tabpanel"
                className="relative min-h-[23rem] overflow-hidden bg-[#080808] text-white md:min-h-[30rem] lg:col-span-8">
                <img
                  key={activeSystemMeta.image}
                  src={activeSystemMeta.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
                />
                <span className="absolute inset-0 bg-black/40" aria-hidden="true" />
                <div
                  key={activeGroup}
                  className="system-panel-content relative flex min-h-[23rem] max-w-[90%] flex-col justify-end p-5 sm:max-w-[78%] md:min-h-[30rem] md:p-9 lg:max-w-[72%]">
                  <h3 className="text-[clamp(2.5rem,4vw,3.75rem)] font-black leading-[0.9] tracking-[-0.03em]">
                    {activeGroup}
                  </h3>
                  <ul
                    className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:mt-7 sm:gap-x-6 sm:gap-y-3 sm:text-base md:grid-cols-3"
                    aria-label={`${activeGroup} technologies used in ${project.title}`}>
                    {activeTechnologies.map((technology) => (
                      <li
                        key={technology}
                        className="reactive-token flex items-center gap-3 border-b border-white/25 pb-3 font-bold">
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

        <ProjectSignalRail
          items={technologySignalItems}
          label={`${project.title} technology stack`}
          reverse
          duration={58}
        />

        {project.gallery.length > 0 && (
          <section id="gallery" className="border-b border-current/25 py-16 md:py-24">
            <div className="content-shell px-5 md:px-8 lg:px-12">
              <div className="mb-8 grid gap-4 border-t-2 border-current pt-5 md:mb-10 md:grid-cols-12 md:gap-5">
                <h2 className="case-study-supporting-type reactive-heading md:col-span-8">Inspect the evidence.</h2>
                <p className="max-w-lg self-end text-lg leading-relaxed text-muted-foreground md:col-span-4">
                  Screens and diagrams remain available for close inspection, after the project story.
                </p>
              </div>
              <div className="mobile-scroll-strip -mx-5 flex snap-x snap-mandatory gap-px overflow-x-auto bg-current/25 px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:border sm:border-current/25 sm:px-0 lg:grid-cols-4">
                {project.gallery.map((item, index) => (
                  <button
                    key={item.image}
                    onClick={() => setLightboxIndex(index)}
                    data-cursor="Inspect"
                    data-signal
                    data-signal-color={SIGNAL_COLORS[index % SIGNAL_COLORS.length]}
                    data-evidence
                    className={cn(
                      'group min-h-11 w-[84vw] max-w-[20rem] shrink-0 snap-start bg-background text-left sm:w-auto sm:max-w-none',
                      !showAllGallery && index >= 8 && 'sm:hidden'
                    )}>
                    <span className="flex h-48 items-center overflow-hidden bg-white p-2 sm:h-[clamp(11rem,16vw,15rem)]">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
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
              {project.gallery.length > 8 && (
                <button
                  type="button"
                  onClick={() => setShowAllGallery((visible) => !visible)}
                  aria-expanded={showAllGallery}
                  className="mt-8 hidden min-h-12 items-center gap-3 border-b-2 border-current text-lg font-bold sm:inline-flex">
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
              data-signal
              data-signal-color={getProjectAccent(nextProject.slug).background}
              className="content-shell group grid min-h-[20rem] content-between px-5 py-14 md:min-h-[26rem] md:px-8 md:py-20 lg:px-12">
              <div className="flex items-center justify-between gap-3 whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.08em] text-background/70 sm:text-xs sm:tracking-[0.12em]">
                <span className="shrink-0">Next project</span>
                <span className="min-w-0 text-right leading-none">
                  {nextProjectRank !== undefined && (
                    <>
                      {String(nextProjectRank).padStart(2, '0')} / {String(projectCount).padStart(2, '0')} &middot;{' '}
                    </>
                  )}
                  {nextProject.category} / {nextProject.year}
                </span>
              </div>
              <h2
                className="project-footer-title reactive-heading break-words font-black leading-[0.82] tracking-[-0.04em]"
                data-mobile-title-size={
                  nextProject.title.length <= 6 ? 'short' : nextProject.title.length <= 9 ? 'medium' : 'long'
                }>
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

      {showJourneyComplete && (
        <div
          className="project-journey-complete fixed inset-0 z-[200] flex bg-[#080808] px-5 text-[#f4f2ed] md:px-8 lg:px-12"
          role="status"
          aria-live="polite">
          <span className="absolute inset-x-0 top-0 flex h-2" aria-hidden="true">
            {SIGNAL_COLORS.slice(0, 4).map((color, index) => (
              <span
                key={color}
                className="project-journey-signal w-1/4 origin-left"
                style={{ backgroundColor: color, animationDelay: `${index * 80}ms` }}
              />
            ))}
          </span>
          <div className="content-shell flex flex-1 flex-col justify-between py-12 md:py-16">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f2ed]/55">
              06 / 06 · Portfolio viewed
            </p>
            <div className="project-journey-message">
              <h2 className="max-w-[9ch] text-[clamp(3.75rem,8vw,6rem)] font-black leading-[0.82] tracking-[-0.04em]">
                Thank you<span className="text-[#ff583d]">.</span>
              </h2>
              <p className="mt-7 max-w-md text-xl font-semibold leading-relaxed text-[#f4f2ed]/70">
                You have seen the whole portfolio. Let&apos;s talk about what needs to work next.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              <button
                type="button"
                onClick={() => navigate('/#contact')}
                className="group inline-flex min-h-12 items-center gap-3 border-b border-current text-lg font-bold">
                Continue to contact
                <ArrowUpRight
                  className="size-5 transition-transform duration-200 group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (journeyRedirectRef.current) window.clearTimeout(journeyRedirectRef.current);
                  setShowJourneyComplete(false);
                }}
                className="min-h-12 text-sm font-semibold text-[#f4f2ed]/60 hover:text-[#f4f2ed] focus-visible:text-[#f4f2ed]">
                Stay on this case study
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
