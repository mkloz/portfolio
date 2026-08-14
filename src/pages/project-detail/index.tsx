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
  Minimize2,
  Monitor,
  Pause,
  Play,
  RefreshCw,
  ServerCog,
  Smartphone,
  Tablet,
  Volume2,
  VolumeX,
  Wrench,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent
} from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { SystemCanvasEffect } from '@/components/common/canvas-effects';
import { Link } from '@/components/common/link';
import { SectionNavigator } from '@/components/common/section-navigator';
import {
  getNextPriorityProject,
  getProjectPriorityRank,
  getResponsiveImageSrcSet,
  getSmallImageSrc,
  projectSummaries
} from '@/data/project-summaries';
import type { GalleryItem, Project } from '@/data/projects';
import { SYSTEM_EFFECT_META } from '@/data/system-effects';
import { getTechnologyByName } from '@/data/technologies';
import { useTheme } from '@/hooks/theme.store';
import { useIsMobile } from '@/hooks/use-breakpoint';
import { useHoverIntent } from '@/hooks/use-hover-intent';
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

const PROJECT_SYSTEM_META: Record<
  TechnologyCategory,
  (typeof SYSTEM_EFFECT_META)[keyof typeof SYSTEM_EFFECT_META] & { image: string; icon: typeof Code2 }
> = {
  Frontend: { ...SYSTEM_EFFECT_META.Frontend, image: '/editorial/project-system-frontend.webp', icon: Code2 },
  Backend: { ...SYSTEM_EFFECT_META.Backend, image: '/editorial/project-system-backend.webp', icon: ServerCog },
  Database: { ...SYSTEM_EFFECT_META.Database, image: '/editorial/project-system-database.webp', icon: Database },
  DevOps: { ...SYSTEM_EFFECT_META.DevOps, image: '/editorial/project-system-devops.webp', icon: CloudCog },
  Tools: { ...SYSTEM_EFFECT_META.Tools, image: '/editorial/project-system-tools.webp', icon: Wrench },
  'Full-Stack': { ...SYSTEM_EFFECT_META['Full-Stack'], image: '/editorial/systems-workbench.webp', icon: Layers3 }
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
const GALLERY_DIAGRAM_PATTERN = /diagram|schema|openapi|readme|stack/i;
const GALLERY_ZOOM_LEVELS = [1, 1.5, 2, 3] as const;
const GALLERY_ZOOM_MIN = GALLERY_ZOOM_LEVELS[0];
const GALLERY_ZOOM_MAX = GALLERY_ZOOM_LEVELS[GALLERY_ZOOM_LEVELS.length - 1];
const GALLERY_DOUBLE_TAP_DELAY = 320;
const GALLERY_GESTURE_HINT_STORAGE_KEY = 'mkloz:gallery-gestures-seen:v1';

type GalleryTouchPoint = {
  x: number;
  y: number;
};

type DemoMediaStatus = 'loading' | 'ready' | 'buffering' | 'error';

const clampGalleryZoom = (zoom: number) => Math.min(GALLERY_ZOOM_MAX, Math.max(GALLERY_ZOOM_MIN, zoom));

const shouldShowGalleryGestureHint = () => {
  if (typeof window === 'undefined' || !window.matchMedia('(pointer: coarse)').matches) return false;
  try {
    return window.localStorage.getItem(GALLERY_GESTURE_HINT_STORAGE_KEY) !== 'true';
  } catch {
    return true;
  }
};

const rememberGalleryGestures = () => {
  try {
    window.localStorage.setItem(GALLERY_GESTURE_HINT_STORAGE_KEY, 'true');
  } catch {
    // The hint can reappear when storage is unavailable.
  }
};

const getTouchDistance = (points: GalleryTouchPoint[]) => {
  const [first, second] = points;
  return Math.hypot(second.x - first.x, second.y - first.y);
};

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
  const stageRef = useRef<HTMLDivElement>(null);
  const touchPointsRef = useRef<Map<number, GalleryTouchPoint>>(new Map());
  const touchGestureRef = useRef<{
    didPinch: boolean;
    panStart: (GalleryTouchPoint & { scrollLeft: number; scrollTop: number }) | null;
    pinchDistance: number | null;
    pinchZoom: number;
    swipeStartX: number | null;
    tapStart: GalleryTouchPoint | null;
  }>({ didPinch: false, panStart: null, pinchDistance: null, pinchZoom: 1, swipeStartX: null, tapStart: null });
  const desktopPanRef = useRef<(GalleryTouchPoint & { scrollLeft: number; scrollTop: number }) | null>(null);
  const lastTapRef = useRef<(GalleryTouchPoint & { time: number }) | null>(null);
  const activeIndexRef = useRef(index);
  const closeTimerRef = useRef<number | null>(null);
  const isClosingRef = useRef(false);
  const returnFocusRef = useRef<HTMLElement | null>(document.activeElement as HTMLElement | null);
  const [zoom, setZoom] = useState<number>(GALLERY_ZOOM_MIN);
  const [isClosing, setIsClosing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [showGestureHint, setShowGestureHint] = useState(shouldShowGalleryGestureHint);

  const dismissGestureHint = useCallback(() => {
    setShowGestureHint(false);
    rememberGalleryGestures();
  }, []);

  const requestClose = useCallback(() => {
    if (isClosingRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose();
      return;
    }

    isClosingRef.current = true;
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(onClose, 180);
  }, [onClose]);

  useEffect(() => {
    activeIndexRef.current = index;
    touchPointsRef.current.clear();
    touchGestureRef.current = {
      didPinch: false,
      panStart: null,
      pinchDistance: null,
      pinchZoom: GALLERY_ZOOM_MIN,
      swipeStartX: null,
      tapStart: null
    };
    desktopPanRef.current = null;
    lastTapRef.current = null;
    setIsPanning(false);
    setZoom(GALLERY_ZOOM_MIN);
  }, [index]);

  useEffect(() => {
    if (!showGestureHint) return;
    const timer = window.setTimeout(dismissGestureHint, 4500);
    return () => window.clearTimeout(timer);
  }, [dismissGestureHint, showGestureHint]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const returnFocus = returnFocusRef.current;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose();
      if (event.key === 'ArrowLeft') {
        onIndexChange((activeIndexRef.current - 1 + gallery.length) % gallery.length);
      }
      if (event.key === 'ArrowRight') onIndexChange((activeIndexRef.current + 1) % gallery.length);
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
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
      returnFocus?.focus();
    };
  }, [gallery.length, onIndexChange, requestClose]);

  const item = gallery[index];
  const showPrevious = () => onIndexChange((index - 1 + gallery.length) % gallery.length);
  const showNext = () => onIndexChange((index + 1) % gallery.length);

  const zoomOut = () => {
    setZoom((current) => {
      const next = [...GALLERY_ZOOM_LEVELS].reverse().find((level) => level < current - 0.01);
      return next ?? GALLERY_ZOOM_MIN;
    });
  };

  const zoomIn = () => {
    setZoom((current) => {
      const next = GALLERY_ZOOM_LEVELS.find((level) => level > current + 0.01);
      return next ?? GALLERY_ZOOM_MAX;
    });
  };

  const toggleGalleryZoom = () => {
    setZoom((current) => (current > GALLERY_ZOOM_MIN + 0.01 ? GALLERY_ZOOM_MIN : 2));
  };

  useEffect(() => {
    const adjacentImages = [
      gallery[(index - 1 + gallery.length) % gallery.length]?.image,
      gallery[(index + 1) % gallery.length]?.image
    ].filter(Boolean) as string[];
    const preloaders = adjacentImages.map((src) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;
      return image;
    });
    return () => preloaders.forEach((image) => image.removeAttribute('src'));
  }, [gallery, index]);

  const startTouchGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') {
      if (event.button !== 0 || zoom <= GALLERY_ZOOM_MIN + 0.01 || !stageRef.current) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      desktopPanRef.current = {
        x: event.clientX,
        y: event.clientY,
        scrollLeft: stageRef.current.scrollLeft,
        scrollTop: stageRef.current.scrollTop
      };
      setIsPanning(true);
      return;
    }

    if (event.pointerType !== 'touch') return;

    dismissGestureHint();
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = { x: event.clientX, y: event.clientY };
    const points = touchPointsRef.current;
    points.set(event.pointerId, point);

    if (points.size === 1) {
      touchGestureRef.current.didPinch = false;
      touchGestureRef.current.swipeStartX = zoom <= GALLERY_ZOOM_MIN + 0.01 ? event.clientX : null;
      touchGestureRef.current.tapStart = point;
      touchGestureRef.current.panStart =
        zoom > GALLERY_ZOOM_MIN + 0.01 && stageRef.current
          ? {
              ...point,
              scrollLeft: stageRef.current.scrollLeft,
              scrollTop: stageRef.current.scrollTop
            }
          : null;
      return;
    }

    if (points.size === 2) {
      touchGestureRef.current.didPinch = true;
      touchGestureRef.current.swipeStartX = null;
      touchGestureRef.current.panStart = null;
      touchGestureRef.current.pinchDistance = getTouchDistance([...points.values()]);
      touchGestureRef.current.pinchZoom = zoom;
      touchGestureRef.current.tapStart = null;
    }
  };

  const moveTouchGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && desktopPanRef.current && stageRef.current) {
      event.preventDefault();
      stageRef.current.scrollLeft = desktopPanRef.current.scrollLeft - (event.clientX - desktopPanRef.current.x);
      stageRef.current.scrollTop = desktopPanRef.current.scrollTop - (event.clientY - desktopPanRef.current.y);
      return;
    }

    if (event.pointerType !== 'touch' || !touchPointsRef.current.has(event.pointerId)) return;

    const points = touchPointsRef.current;
    points.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (points.size >= 2 && touchGestureRef.current.pinchDistance) {
      event.preventDefault();
      const distance = getTouchDistance([...points.values()].slice(0, 2));
      const nextZoom = touchGestureRef.current.pinchZoom * (distance / touchGestureRef.current.pinchDistance);
      setZoom(clampGalleryZoom(nextZoom));
      return;
    }

    const panStart = touchGestureRef.current.panStart;
    const stage = stageRef.current;
    if (points.size === 1 && panStart && stage && zoom > GALLERY_ZOOM_MIN + 0.01) {
      event.preventDefault();
      stage.scrollLeft = panStart.scrollLeft - (event.clientX - panStart.x);
      stage.scrollTop = panStart.scrollTop - (event.clientY - panStart.y);
    }
  };

  const endTouchGesture = (event: ReactPointerEvent<HTMLDivElement>, allowSwipe: boolean) => {
    if (event.pointerType === 'mouse') {
      desktopPanRef.current = null;
      setIsPanning(false);
      if (event.currentTarget.hasPointerCapture(event.pointerId))
        event.currentTarget.releasePointerCapture(event.pointerId);
      return;
    }

    if (event.pointerType !== 'touch') return;

    const points = touchPointsRef.current;
    const gesture = touchGestureRef.current;
    const wasPinching = gesture.didPinch || points.size > 1;
    const tapStart = gesture.tapStart;
    points.delete(event.pointerId);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (points.size === 1) {
      const remainingPoint = [...points.values()][0];
      const stage = stageRef.current;
      gesture.pinchDistance = null;
      gesture.panStart =
        stage && zoom > GALLERY_ZOOM_MIN + 0.01
          ? {
              ...remainingPoint,
              scrollLeft: stage.scrollLeft,
              scrollTop: stage.scrollTop
            }
          : null;
      return;
    }

    if (allowSwipe && !wasPinching && zoom <= GALLERY_ZOOM_MIN + 0.01 && gesture.swipeStartX !== null) {
      const distance = event.clientX - gesture.swipeStartX;
      if (Math.abs(distance) >= 45) {
        onIndexChange(distance > 0 ? (index - 1 + gallery.length) % gallery.length : (index + 1) % gallery.length);
      }
    }

    if (
      allowSwipe &&
      !wasPinching &&
      tapStart &&
      Math.hypot(event.clientX - tapStart.x, event.clientY - tapStart.y) < 12
    ) {
      const now = performance.now();
      const previousTap = lastTapRef.current;
      if (
        previousTap &&
        now - previousTap.time <= GALLERY_DOUBLE_TAP_DELAY &&
        Math.hypot(event.clientX - previousTap.x, event.clientY - previousTap.y) < 32
      ) {
        toggleGalleryZoom();
        lastTapRef.current = null;
      } else {
        lastTapRef.current = { x: event.clientX, y: event.clientY, time: now };
      }
    }

    gesture.didPinch = false;
    gesture.panStart = null;
    gesture.pinchDistance = null;
    gesture.pinchZoom = zoom;
    gesture.swipeStartX = null;
    gesture.tapStart = null;
    if (zoom < 1.04) setZoom(GALLERY_ZOOM_MIN);
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stage = stageRef.current;
      if (!stage) return;
      stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2;
      stage.scrollTop = (stage.scrollHeight - stage.clientHeight) / 2;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [index, zoom]);

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image: ${item.title}`}
      data-state={isClosing ? 'closing' : 'open'}
      className="gallery-dialog fixed inset-0 z-[200] grid min-w-0 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden bg-[#080808] text-white">
      <header className="gallery-dialog-header grid min-h-16 grid-cols-[1fr_auto] items-center gap-4 border-b border-white/25 px-4 md:min-h-20 md:grid-cols-[1fr_auto_auto] md:px-8">
        <p className="min-w-0 truncate font-semibold md:text-lg">
          <span className="mr-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/50 md:text-xs">
            {String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
          </span>
          {item.title}
        </p>
        <div className="hidden items-center border border-white/30 md:flex" role="group" aria-label="Image zoom">
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= GALLERY_ZOOM_MIN}
            className="gallery-tool-control flex size-11 items-center justify-center border-r border-white/30 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Zoom out">
            <ZoomOut className="size-4" aria-hidden="true" />
          </button>
          <span className="w-16 text-center font-mono text-xs font-semibold tabular-nums" aria-live="polite">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= GALLERY_ZOOM_MAX}
            className="gallery-tool-control flex size-11 items-center justify-center border-l border-white/30 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Zoom in">
            <ZoomIn className="size-4" aria-hidden="true" />
          </button>
        </div>
        <button
          ref={closeButtonRef}
          onClick={requestClose}
          className="gallery-tool-control flex size-11 items-center justify-center rounded-full border border-white/60 md:size-12"
          aria-label="Close gallery">
          <X className="size-5" aria-hidden="true" />
        </button>
      </header>

      <div className="gallery-dialog-workspace relative grid min-h-0 grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-stretch md:grid-cols-[5rem_minmax(0,1fr)_5rem]">
        <button
          type="button"
          onClick={showPrevious}
          className="gallery-direction-control group flex min-h-11 items-center justify-center border-r border-white/20"
          aria-label="Previous image">
          <ChevronLeft
            className="size-5 transition-transform duration-150 group-hover:-translate-x-1"
            aria-hidden="true"
          />
        </button>

        <div
          ref={stageRef}
          onPointerDown={startTouchGesture}
          onPointerMove={moveTouchGesture}
          onPointerUp={(event) => endTouchGesture(event, true)}
          onPointerCancel={(event) => endTouchGesture(event, false)}
          onDoubleClick={() => {
            if (!window.matchMedia('(pointer: coarse)').matches) toggleGalleryZoom();
          }}
          className={cn(
            'gallery-dialog-stage min-h-0 overflow-auto bg-[#f4f2ed] p-2 md:p-5',
            zoom > GALLERY_ZOOM_MIN + 0.01 ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
          )}>
          <div className="flex h-full min-h-full min-w-full items-center justify-center">
            <img
              key={item.image}
              src={item.image}
              alt={item.title}
              draggable="false"
              className={cn(
                'gallery-dialog-image shrink-0 object-contain',
                zoom === 1 ? 'size-full max-h-full max-w-full' : 'h-auto max-w-none'
              )}
              style={zoom === 1 ? undefined : { width: `${zoom * 100}%`, maxWidth: 'none' }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={showNext}
          className="gallery-direction-control group flex min-h-11 items-center justify-center border-l border-white/20"
          aria-label="Next image">
          <ChevronRight
            className="size-5 transition-transform duration-150 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>

        <div
          className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center border border-white/40 bg-[#080808] shadow-[0_0_0_1px_rgba(0,0,0,0.35)] md:hidden"
          role="group"
          aria-label="Image zoom">
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= GALLERY_ZOOM_MIN}
            className="gallery-tool-control flex size-11 items-center justify-center border-r border-white/30 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Zoom out">
            <ZoomOut className="size-4" aria-hidden="true" />
          </button>
          <span className="w-14 text-center font-mono text-xs font-semibold tabular-nums" aria-live="polite">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= GALLERY_ZOOM_MAX}
            className="gallery-tool-control flex size-11 items-center justify-center border-l border-white/30 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Zoom in">
            <ZoomIn className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div
          className={cn(
            'pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 whitespace-nowrap border border-white/35 bg-[#080808] px-3 py-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.09em] text-white transition-[opacity,transform] duration-300 motion-reduce:transition-none md:hidden',
            showGestureHint ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          )}
          aria-hidden="true">
          Swipe to browse <span className="px-1.5 text-[#ffd400]">·</span> Pinch to zoom
        </div>
      </div>

      <footer className="gallery-dialog-footer min-w-0 overflow-hidden border-t border-white/25 px-4 py-3 md:px-8 md:py-4">
        <div
          className="gallery-thumbnail-strip flex w-full min-w-0 max-w-full gap-2 overflow-x-auto pb-1"
          role="list"
          aria-label="Gallery thumbnails">
          {gallery.map((thumbnail, thumbnailIndex) => (
            <button
              type="button"
              role="listitem"
              key={thumbnail.image}
              onClick={() => onIndexChange(thumbnailIndex)}
              aria-label={`View ${thumbnail.title}`}
              aria-current={thumbnailIndex === index ? 'true' : undefined}
              className="gallery-thumbnail group relative h-14 w-20 shrink-0 overflow-hidden border border-white/25 bg-white p-1 md:h-16 md:w-24">
              <img
                src={getSmallImageSrc(thumbnail.image)}
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-contain opacity-60 transition-opacity duration-150 group-hover:opacity-100"
              />
              <span
                className={cn(
                  'absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-150',
                  thumbnailIndex === index && 'scale-x-100'
                )}
                style={{ backgroundColor: SIGNAL_COLORS[thumbnailIndex % SIGNAL_COLORS.length] }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </footer>
    </div>,
    document.body
  );
};

export const ProjectDetailPage = ({ project }: { project: Project }) => {
  useRouteScroll(project.slug);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState(0);
  const [activeTechnologyGroup, setActiveTechnologyGroup] = useState(0);
  const { schedule: previewTechnologyGroup, cancel: cancelTechnologyGroupPreview } = useHoverIntent(
    setActiveTechnologyGroup,
    70
  );
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [isDemoMuted, setIsDemoMuted] = useState(true);
  const [isDemoFullscreen, setIsDemoFullscreen] = useState(false);
  const [isDemoTransitioning, setIsDemoTransitioning] = useState(false);
  const [pendingDemoIndex, setPendingDemoIndex] = useState<number | null>(null);
  const [demoMediaStatus, setDemoMediaStatus] = useState<DemoMediaStatus>('loading');
  const [demoProgress, setDemoProgress] = useState(0);
  const [demoDuration, setDemoDuration] = useState(0);
  const [demoAspectRatio, setDemoAspectRatio] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [projectJourney, setProjectJourney] = useState(() => readProjectJourney(PORTFOLIO_PROJECT_SLUGS));
  const [showJourneyComplete, setShowJourneyComplete] = useState(false);
  const { theme } = useTheme();
  const image = typeof project.image === 'string' ? project.image : project.image[theme];
  const demo = project.demo?.[activeDemo];
  const demoPoster = demo?.preview ?? image;
  const singleDemo = project.demo?.length === 1 ? project.demo[0] : undefined;
  const SingleDemoIcon = singleDemo ? DEVICE_CONFIG[singleDemo.device].icon : Monitor;
  const videoRef = useRef<HTMLVideoElement>(null);
  const demoFrameRef = useRef<HTMLDivElement>(null);
  const demoSurfaceClickRef = useRef<number | null>(null);
  const demoTransitionRef = useRef<number | null>(null);
  const resumeDemoAfterSwitchRef = useRef<number | null>(null);
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
  const activeSystemImageSrcSet = activeSystemMeta.image.endsWith('.webp')
    ? `${activeSystemMeta.image.replace(/\.webp$/, '-640.webp')} 640w, ${activeSystemMeta.image} 1200w`
    : undefined;
  const deviceConfig = demo ? DEVICE_CONFIG[demo.device] : DEVICE_CONFIG.desktop;
  const playbackDuration = demoDuration || (demo ? parseDemoLength(demo.length) : 0);
  const closeGallery = useCallback(() => setLightboxIndex(null), []);
  const sectionNavigationItems = useMemo(
    () => [
      { id: 'hero', label: 'Overview', color: accent.background },
      { id: 'overview', label: 'Features', color: '#ffd400' },
      ...(project.demo?.length ? [{ id: 'demo', label: 'Demo', color: '#465bff' }] : []),
      { id: 'journey', label: 'How I built it', color: '#74f0b3' },
      { id: 'tech-stack', label: 'Tools', color: '#6c4eff' },
      ...(project.gallery.length ? [{ id: 'gallery', label: 'Gallery', color: '#ff583d' }] : [])
    ],
    [accent.background, project.demo?.length, project.gallery.length]
  );

  const selectDemo = (index: number) => {
    if (index === activeDemo || isDemoTransitioning) return;
    if (demoSurfaceClickRef.current) window.clearTimeout(demoSurfaceClickRef.current);
    resumeDemoAfterSwitchRef.current = isDemoPlaying ? index : null;
    videoRef.current?.pause();
    setIsDemoPlaying(false);
    setPendingDemoIndex(index);
    setDemoMediaStatus('loading');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveDemo(index);
      setDemoProgress(0);
      setDemoDuration(0);
      setDemoAspectRatio(null);
      return;
    }
    setIsDemoTransitioning(true);
    if (demoTransitionRef.current) window.clearTimeout(demoTransitionRef.current);
    demoTransitionRef.current = window.setTimeout(() => {
      setActiveDemo(index);
      setDemoProgress(0);
      setDemoDuration(0);
      setDemoAspectRatio(null);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => setIsDemoTransitioning(false)));
    }, 160);
  };

  const seekDemo = (time: number) => {
    const nextTime = Math.max(0, Math.min(time, playbackDuration || 0));
    setDemoProgress(nextTime);
    if (videoRef.current) videoRef.current.currentTime = nextTime;
  };

  const toggleDemoFullscreen = async () => {
    const frame = demoFrameRef.current;
    const video = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => undefined);
      return;
    }
    if (frame?.requestFullscreen) {
      await frame.requestFullscreen().catch(() => undefined);
      return;
    }
    video?.webkitEnterFullscreen?.();
  };

  const retryDemo = () => {
    setDemoMediaStatus('loading');
    setIsDemoPlaying(false);
    videoRef.current?.load();
  };

  const toggleDemoPlayback = () => {
    resumeDemoAfterSwitchRef.current = null;
    if (demoMediaStatus === 'error') {
      retryDemo();
      return;
    }
    setIsDemoPlaying((playing) => !playing);
  };

  const handleDemoSurfaceClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (demoSurfaceClickRef.current) {
      window.clearTimeout(demoSurfaceClickRef.current);
      demoSurfaceClickRef.current = null;
    }
    if (event.detail > 1) return;
    if (demoMediaStatus === 'error') {
      retryDemo();
      return;
    }

    demoSurfaceClickRef.current = window.setTimeout(() => {
      toggleDemoPlayback();
      demoSurfaceClickRef.current = null;
    }, 220);
  };

  const handleDemoSurfaceDoubleClick = () => {
    if (demoSurfaceClickRef.current) {
      window.clearTimeout(demoSurfaceClickRef.current);
      demoSurfaceClickRef.current = null;
    }
    void toggleDemoFullscreen();
  };

  const handleDemoSurfaceKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const key = event.key.toLowerCase();
    if (key === 'enter' || key === ' ') {
      event.preventDefault();
      toggleDemoPlayback();
      return;
    }
    if (key === 'm') {
      event.preventDefault();
      setIsDemoMuted((muted) => !muted);
      return;
    }
    if (key === 'f') {
      event.preventDefault();
      void toggleDemoFullscreen();
    }
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
    setPendingDemoIndex(null);
    setDemoMediaStatus('loading');
    setDemoProgress(0);
    setDemoDuration(0);
    setDemoAspectRatio(null);
    resumeDemoAfterSwitchRef.current = null;
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
      setDemoMediaStatus((status) => (status === 'error' ? status : 'buffering'));
      void video.play().catch(() => {
        setIsDemoPlaying(false);
        setDemoMediaStatus('error');
      });
    } else {
      video.pause();
    }
  }, [activeDemo, isDemoMuted, isDemoPlaying]);

  useEffect(() => {
    const updateFullscreenState = () => setIsDemoFullscreen(document.fullscreenElement === demoFrameRef.current);
    document.addEventListener('fullscreenchange', updateFullscreenState);
    return () => document.removeEventListener('fullscreenchange', updateFullscreenState);
  }, []);

  useEffect(
    () => () => {
      if (demoSurfaceClickRef.current) window.clearTimeout(demoSurfaceClickRef.current);
      if (demoTransitionRef.current) window.clearTimeout(demoTransitionRef.current);
    },
    []
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#overview"
        className="fixed left-4 top-4 z-[190] -translate-y-24 bg-primary px-4 py-3 text-primary-foreground focus:translate-y-0">
        Skip to project overview
      </a>
      <ProjectHeader />
      <SectionNavigator items={sectionNavigationItems} className="2xl:right-8" />
      <main>
        <section id="hero" className="relative overflow-hidden border-b border-current/25">
          <div className="content-shell px-5 pb-8 pt-8 md:px-8 md:pb-12 md:pt-8 lg:px-12">
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
                    ['Coverage', `${technologyGroups.length} parts of the product`]
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
                  Visit the live product
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
                  <h2 className="case-study-primary-type max-w-[10ch]">What the product needed to do.</h2>
                </div>
              </div>
              <div className="grid border-t-2 border-current sm:grid-cols-2 lg:col-span-7">
                {project.highlights.map(({ title, description, icon: Icon }, index) => (
                  <article
                    key={title}
                    className="reactive-capability grid min-h-0 grid-cols-[2rem_minmax(0,1fr)_auto] grid-rows-[auto_1fr] gap-x-3 gap-y-3 border-b border-current/25 px-4 py-5 sm:min-h-56 sm:gap-x-4 sm:p-6 sm:odd:border-r md:grid-cols-[2.5rem_minmax(0,1fr)_auto] md:p-8">
                    <span className="self-center font-mono text-base font-bold text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="self-center text-xl font-black leading-none tracking-[-0.02em] md:text-2xl">
                      {title}
                    </h3>
                    <Icon
                      className="size-5 self-center md:size-6"
                      style={{ color: accent.background }}
                      aria-hidden="true"
                    />
                    <p className="col-span-2 col-start-2 row-start-2 max-w-md text-base leading-relaxed text-muted-foreground">
                      {description}
                    </p>
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
                <h2 className="case-study-primary-type max-w-[11ch] lg:col-span-8">See it in action.</h2>
                <p className="max-w-lg text-lg leading-relaxed text-background/65 lg:col-span-4">
                  {project.demo.length > 1
                    ? 'Choose a screen size and watch the product being used.'
                    : 'Watch the product being used.'}
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
                            aria-busy={pendingDemoIndex === index}
                            className={cn(
                              'reactive-tab flex min-h-14 min-w-[6.5rem] flex-1 snap-start items-center justify-center gap-2 border-r border-current/25 px-2 text-left text-sm font-bold capitalize last:border-r-0 sm:min-w-[7rem] lg:min-h-16 lg:min-w-0 lg:justify-start lg:gap-3 lg:border-b lg:border-r-0 lg:px-3 lg:text-base lg:last:border-b-0',
                              activeDemo === index && 'bg-background text-foreground'
                            )}>
                            {pendingDemoIndex === index ? (
                              <span className="demo-switch-indicator" aria-hidden="true" />
                            ) : (
                              <Icon
                                className={cn('size-5', item.device === 'tablet' && '-rotate-90')}
                                aria-hidden="true"
                              />
                            )}
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
                      Try the live product
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
                      data-demo-fullscreen={isDemoFullscreen ? 'true' : 'false'}
                      className={cn(
                        'demo-player-frame max-w-full origin-center border border-background bg-background p-2 text-foreground transition-[width,opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:p-3',
                        deviceConfig.frame,
                        isDemoTransitioning ? 'scale-[0.985] opacity-0' : 'scale-100 opacity-100'
                      )}>
                      <div className="demo-player-chrome mb-2 flex items-center gap-2">
                        <span className="size-2.5 rounded-full bg-[#ff583d]" aria-hidden="true" />
                        <span className="size-2.5 rounded-full bg-[#465bff]" aria-hidden="true" />
                        <span className="size-2.5 rounded-full bg-[#ffd400]" aria-hidden="true" />
                        <span className="ml-3 truncate font-mono text-xs text-foreground/55">
                          {project.liveDemo?.replace('https://', '') ?? project.title}
                        </span>
                      </div>
                      <div
                        role="button"
                        tabIndex={0}
                        aria-keyshortcuts="Enter Space M F"
                        aria-label={
                          demoMediaStatus === 'error'
                            ? 'Retry video'
                            : isDemoPlaying
                              ? 'Pause video'
                              : `Play ${demo.device} demo`
                        }
                        onClick={handleDemoSurfaceClick}
                        onDoubleClick={handleDemoSurfaceDoubleClick}
                        onKeyDown={handleDemoSurfaceKeyDown}
                        className={cn(
                          'demo-player-viewport group relative cursor-pointer select-none overflow-hidden bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white',
                          deviceConfig.ratio
                        )}
                        style={{ aspectRatio: isDemoFullscreen ? 'auto' : (demoAspectRatio ?? undefined) }}>
                        <video
                          ref={videoRef}
                          key={demo.link}
                          muted={isDemoMuted}
                          playsInline
                          preload="metadata"
                          poster={isMobile ? getSmallImageSrc(demoPoster) : demoPoster}
                          onLoadStart={() => setDemoMediaStatus('loading')}
                          onLoadedMetadata={(event) => {
                            const video = event.currentTarget;
                            setDemoDuration(video.duration);
                            if (video.videoWidth > 0 && video.videoHeight > 0) {
                              setDemoAspectRatio(video.videoWidth / video.videoHeight);
                            }
                          }}
                          onCanPlay={() => {
                            setDemoMediaStatus('ready');
                            setPendingDemoIndex(null);
                            if (resumeDemoAfterSwitchRef.current === activeDemo) {
                              resumeDemoAfterSwitchRef.current = null;
                              setIsDemoPlaying(true);
                            }
                          }}
                          onTimeUpdate={(event) => setDemoProgress(event.currentTarget.currentTime)}
                          onPlay={() => setIsDemoPlaying(true)}
                          onPlaying={() => setDemoMediaStatus('ready')}
                          onWaiting={() => setDemoMediaStatus('buffering')}
                          onStalled={() => setDemoMediaStatus('buffering')}
                          onSeeking={() => setDemoMediaStatus('buffering')}
                          onSeeked={() => setDemoMediaStatus('ready')}
                          onPause={() => setIsDemoPlaying(false)}
                          onEnded={() => setIsDemoPlaying(false)}
                          onError={() => {
                            resumeDemoAfterSwitchRef.current = null;
                            setIsDemoPlaying(false);
                            setPendingDemoIndex(null);
                            setDemoMediaStatus('error');
                          }}
                          className={cn(
                            'demo-media-treatment size-full object-contain',
                            !isDemoPlaying && demoProgress <= 0.05 && 'is-poster'
                          )}>
                          <source src={demo.link} type="video/mp4" />
                          Your browser does not support video playback.
                        </video>
                        {!isDemoPlaying && (
                          <span
                            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35 text-white transition-colors duration-200 group-hover:bg-black/25 motion-reduce:transition-none"
                            aria-hidden="true">
                            <span className="flex size-16 items-center justify-center rounded-full border-2 border-white bg-black/60">
                              <Play className="ml-1 size-6" aria-hidden="true" />
                            </span>
                          </span>
                        )}
                        {(demoMediaStatus === 'loading' || demoMediaStatus === 'buffering') && (
                          <span
                            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/55 text-white"
                            role="status"
                            aria-live="polite">
                            <span className="demo-buffering-indicator" aria-hidden="true">
                              {SIGNAL_COLORS.slice(0, 4).map((color) => (
                                <span key={color} style={{ backgroundColor: color }} />
                              ))}
                            </span>
                            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em]">
                              {pendingDemoIndex !== null
                                ? `Switching to ${project.demo?.[pendingDemoIndex]?.device ?? 'recording'}`
                                : demoMediaStatus === 'buffering'
                                  ? 'Buffering recording'
                                  : 'Preparing recording'}
                            </span>
                          </span>
                        )}
                        {demoMediaStatus === 'error' && (
                          <span
                            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 px-6 text-center text-white"
                            role="alert">
                            <RefreshCw className="size-6" aria-hidden="true" />
                            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em]">
                              Recording unavailable · select to retry
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="demo-player-controls grid grid-cols-[auto_1fr_auto_auto] items-center gap-2 border-t border-white/20 bg-[#080808] px-2 py-2 text-white sm:gap-3 sm:px-3">
                        <button
                          type="button"
                          onClick={toggleDemoPlayback}
                          className="flex size-11 items-center justify-center border border-white/25 transition-colors hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black"
                          aria-label={
                            demoMediaStatus === 'error' ? 'Retry video' : isDemoPlaying ? 'Pause video' : 'Play video'
                          }>
                          {demoMediaStatus === 'error' ? (
                            <RefreshCw className="size-4" aria-hidden="true" />
                          ) : isDemoPlaying ? (
                            <Pause className="size-4" aria-hidden="true" />
                          ) : (
                            <Play className="ml-0.5 size-4" aria-hidden="true" />
                          )}
                        </button>

                        <div className="grid min-w-0 gap-1">
                          <input
                            type="range"
                            min="0"
                            max={playbackDuration || 1}
                            step="0.1"
                            value={Math.min(demoProgress, playbackDuration || 1)}
                            onChange={(event) => seekDemo(Number(event.target.value))}
                            disabled={demoDuration <= 0 || demoMediaStatus === 'error'}
                            aria-label="Seek video"
                            className="h-5 min-w-0 w-full cursor-pointer accent-white"
                          />
                          <span className="font-mono text-[0.65rem] tracking-[0.04em] text-white/65">
                            {formatPlaybackTime(demoProgress)} / {formatPlaybackTime(playbackDuration)}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsDemoMuted((muted) => !muted)}
                          className="flex size-11 items-center justify-center border border-white/25 transition-colors hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black"
                          aria-label={isDemoMuted ? 'Unmute video' : 'Mute video'}
                          aria-keyshortcuts="M"
                          title={isDemoMuted ? 'Unmute video (M)' : 'Mute video (M)'}>
                          {isDemoMuted ? (
                            <VolumeX className="size-4" aria-hidden="true" />
                          ) : (
                            <Volume2 className="size-4" aria-hidden="true" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => void toggleDemoFullscreen()}
                          className="flex size-11 items-center justify-center border border-white/25 transition-colors hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black"
                          aria-label={isDemoFullscreen ? 'Exit full screen' : 'Enter full screen'}
                          aria-keyshortcuts="F"
                          title={isDemoFullscreen ? 'Exit full screen (F)' : 'Enter full screen (F)'}>
                          {isDemoFullscreen ? (
                            <Minimize2 className="size-4" aria-hidden="true" />
                          ) : (
                            <Maximize2 className="size-4" aria-hidden="true" />
                          )}
                        </button>
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
                <h2 className="case-study-primary-type max-w-[10ch]">How I built it.</h2>
                <p className="mt-4 max-w-sm text-lg leading-relaxed text-muted-foreground md:mt-7">
                  The main choices, trade-offs, and results from each stage of the build.
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
                              What I chose
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
                              What I built
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
              <h2 className="case-study-supporting-type md:col-span-8">Tools behind the project.</h2>
              <p className="max-w-lg self-end text-lg leading-relaxed text-muted-foreground md:col-span-4">
                Pick an area to see the tools I used there.
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
                      onMouseEnter={() => previewTechnologyGroup(index)}
                      onMouseLeave={cancelTechnologyGroupPreview}
                      onPointerDown={cancelTechnologyGroupPreview}
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
                  srcSet={activeSystemImageSrcSet}
                  sizes="(max-width: 1023px) 100vw, 67vw"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
                />
                <SystemCanvasEffect
                  key={`${activeSystemMeta.image}-effect`}
                  variant={activeSystemMeta.effect}
                  tint={activeSystemMeta.canvasTint}
                  color={activeSystemMeta.color}
                  className="absolute inset-0 size-full">
                  <img
                    src={activeSystemMeta.image}
                    srcSet={activeSystemImageSrcSet}
                    sizes="(max-width: 1023px) 100vw, 67vw"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
                  />
                </SystemCanvasEffect>
                <span className="pointer-events-none absolute inset-0 z-[2] bg-black/40" aria-hidden="true" />
                <div
                  key={activeGroup}
                  className="system-panel-content pointer-events-none relative z-10 flex min-h-[23rem] max-w-[90%] flex-col justify-end p-5 sm:max-w-[78%] md:min-h-[30rem] md:p-9 lg:max-w-[72%]">
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
              <div className="mb-8 grid gap-5 border-t-2 border-current pt-5 md:mb-10 md:grid-cols-12 md:items-end">
                <h2 className="case-study-supporting-type md:col-span-7">Look closer.</h2>
                <div className="flex items-end justify-between gap-5 md:col-span-5">
                  <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:text-lg">
                    Open any screen or diagram for a full-size view.
                  </p>
                  <span className="shrink-0 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {String(project.gallery.length).padStart(2, '0')} items
                  </span>
                </div>
              </div>
              <div className="evidence-wall grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
                {project.gallery.map((item, index) => (
                  <button
                    key={item.image}
                    type="button"
                    aria-label={`Open ${item.title} full size`}
                    onClick={() => setLightboxIndex(index)}
                    data-cursor="Inspect"
                    data-gallery-kind={GALLERY_DIAGRAM_PATTERN.test(item.title) ? 'diagram' : 'screen'}
                    data-signal
                    data-signal-color={SIGNAL_COLORS[index % SIGNAL_COLORS.length]}
                    className="evidence-wall-card group relative flex aspect-video items-center justify-center overflow-hidden border border-[#080808] bg-[#080808]">
                    <img
                      src={item.image}
                      srcSet={getResponsiveImageSrcSet(item.image)}
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                      width={960}
                      height={540}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="evidence-wall-image size-full"
                    />
                    <span
                      className="evidence-wall-signal absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-150 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      style={{ backgroundColor: SIGNAL_COLORS[index % SIGNAL_COLORS.length] }}
                      aria-hidden="true"
                    />
                    <span className="evidence-wall-open absolute bottom-3 right-3 flex size-11 translate-y-2 items-center justify-center bg-foreground text-background opacity-0 transition-[opacity,transform] duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <Maximize2 className="size-4" aria-hidden="true" />
                    </span>
                  </button>
                ))}
              </div>
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
                className="project-footer-title relative w-fit max-w-full break-words font-black leading-[0.82] tracking-[-0.04em]"
                data-signal
                data-signal-color={getProjectAccent(nextProject.slug).background}
                data-mobile-title-size={
                  nextProject.title.length <= 6 ? 'short' : nextProject.title.length <= 9 ? 'medium' : 'long'
                }>
                {nextProject.title}
              </h2>
              <span className="inline-flex min-h-12 items-center gap-2 justify-self-start border-b border-current text-lg font-bold">
                View next project
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
          onClose={closeGallery}
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
                You made it through all six projects. If one sparked an idea, I&apos;d love to hear about it.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              <button
                type="button"
                onClick={() => navigate('/#contact')}
                className="group inline-flex min-h-12 items-center gap-3 border-b border-current text-lg font-bold">
                Get in touch
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
