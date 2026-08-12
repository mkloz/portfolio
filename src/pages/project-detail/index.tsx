import { ArrowUpRight, ChevronLeft, ChevronRight, Github, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Link } from '@/components/common/link';
import { Button } from '@/components/ui/button';
import type { GalleryItem, Project } from '@/data/projects';
import { useTheme } from '@/hooks/theme.store';
import { getProjectAccent } from '@/lib/project-accent';
import { cn } from '@/lib/utils';
import { ProjectService } from '@/services/project.service';

import { ProjectHeader } from './project-header';

const SectionHeading = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-14 grid gap-6 border-t-2 border-current pt-5 md:mb-20 md:grid-cols-12">
    <h2 className="section-type md:col-span-8">{title}</h2>
    {description && (
      <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:col-span-4">{description}</p>
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

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onIndexChange((index - 1 + gallery.length) % gallery.length);
      if (event.key === 'ArrowRight') onIndexChange((index + 1) % gallery.length);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [gallery.length, index, onClose, onIndexChange]);

  const item = gallery[index];
  return (
    <div
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  const image = typeof project.image === 'string' ? project.image : project.image[theme];
  const demo = project.demo?.[activeDemo];
  const accent = getProjectAccent(project.slug);
  const nextProject = ProjectService.getRelatedProjects(project.slug, 1)[0];
  const technologyGroups = [...new Set(project.detailedTechnologies.map((technology) => technology.category))];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.slug]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHeader projectTitle={project.title} />
      <main>
        <section id="hero" className="relative bg-foreground pt-header text-background">
          <span
            className="absolute inset-x-0 top-header h-2"
            style={{ backgroundColor: accent.background }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-[100rem] px-5 pb-8 pt-12 md:px-8 md:pt-16 lg:px-12">
            <div className="grid gap-8 border-b border-background/25 pb-8 md:grid-cols-12">
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.13em] md:col-span-4">
                {project.category} / {project.year} / {project.status}
              </p>
              <p className="max-w-xl text-lg font-semibold leading-relaxed md:col-span-5 md:col-start-8">
                {project.tagline}
              </p>
            </div>
            <h1 className="mt-12 break-words text-[clamp(4.5rem,15vw,14rem)] font-black leading-[0.72] tracking-[-0.055em]">
              {project.title}
            </h1>

            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
              <p className="max-w-2xl text-xl leading-relaxed text-background/68 lg:col-span-5">
                {project.longDescription}
              </p>
              <div className="flex flex-wrap gap-4 lg:col-span-5 lg:col-start-8 lg:justify-end">
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 border-b border-current font-bold">
                    Open live site <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                )}
                {project.github.map((repo) => (
                  <a
                    key={repo.link}
                    href={repo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 font-bold text-background/68 hover:text-background">
                    <Github className="size-4" aria-hidden="true" /> {repo.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-12 border border-background/25 p-2" style={{ backgroundColor: accent.background }}>
              <img
                src={image}
                alt={`${project.title} interface`}
                className="aspect-[16/9] w-full object-cover object-top"
              />
            </div>
          </div>
        </section>

        <section id="overview" className="border-b border-current/25 py-28 md:py-40">
          <div className="mx-auto max-w-[100rem] px-5 md:px-8 lg:px-12">
            <SectionHeading title="What it does." description={project.description} />
            <div className="grid border-y-2 border-current md:grid-cols-2 lg:grid-cols-3">
              {project.highlights.map(({ title, description, icon: Icon }, index) => (
                <article
                  key={title}
                  className={cn(
                    'min-h-64 p-6 md:p-8',
                    index > 0 && 'border-t-2 border-current md:border-l-2 md:border-t-0',
                    index === 2 && 'md:col-span-2 md:border-l-0 md:border-t-2 lg:col-span-1 lg:border-l-2 lg:border-t-0'
                  )}>
                  <div
                    className="flex size-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: accent.background, color: accent.foreground }}>
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-10 text-3xl font-black tracking-[-0.045em]">{title}</h3>
                  <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tech-stack" className="bg-foreground py-28 text-background md:py-40">
          <div className="mx-auto max-w-[100rem] px-5 md:px-8 lg:px-12">
            <SectionHeading
              title="The working system."
              description="Each group is tied to a responsibility in this build."
            />
            <div className="grid border-y border-background/25 lg:grid-cols-2">
              {technologyGroups.map((category, index) => (
                <div
                  key={category}
                  className="grid min-h-64 gap-8 border-b border-background/25 p-6 even:lg:border-l lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">{category}</h3>
                    <span
                      className="mt-2 h-2 w-14"
                      style={{ backgroundColor: index % 2 ? accent.background : '#ffffff' }}
                      aria-hidden="true"
                    />
                  </div>
                  <ul className="grid grid-cols-2 content-end gap-x-6 gap-y-3 text-lg text-background/68 sm:grid-cols-3">
                    {project.detailedTechnologies
                      .filter((technology) => technology.category === category)
                      .map((technology) => (
                        <li key={technology.name} className="border-b border-background/20 pb-2">
                          {technology.name}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {project.demo && project.demo.length > 0 && (
          <section id="demo" className="border-b border-current/25 py-28 md:py-40">
            <div className="mx-auto max-w-[100rem] px-5 md:px-8 lg:px-12">
              <SectionHeading title="See the interface move." description="Recorded walkthroughs from the project." />
              <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Choose demo device">
                {project.demo.map((item, index) => (
                  <Button
                    key={item.device}
                    variant="outline"
                    onClick={() => setActiveDemo(index)}
                    aria-pressed={activeDemo === index}
                    style={
                      activeDemo === index ? { borderColor: accent.background, color: accent.background } : undefined
                    }>
                    {item.device}
                  </Button>
                ))}
              </div>
              {demo && (
                <div className="border-2 border-current bg-[#080808] p-2 md:p-4">
                  <video
                    key={demo.link}
                    controls
                    preload="metadata"
                    poster={demo.preview}
                    className="mx-auto max-h-[78vh] w-full bg-black">
                    <source src={demo.link} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                </div>
              )}
            </div>
          </section>
        )}

        <section id="journey" className="border-b border-current/25 py-28 md:py-40">
          <div className="mx-auto grid max-w-[100rem] gap-12 px-5 md:px-8 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 className="section-type">Build log.</h2>
                <p className="mt-7 max-w-sm text-lg leading-relaxed text-muted-foreground">
                  The implementation sequence and the reasons recorded for each phase.
                </p>
              </div>
            </div>
            <div className="border-t-2 border-current lg:col-span-8">
              {project.developmentJourney.steps.map((step, index) => (
                <article
                  key={`${step.id}-${step.title}`}
                  className="grid gap-7 border-b border-current/25 py-9 md:grid-cols-[7rem_1fr]">
                  <div>
                    <span className="font-mono text-sm font-semibold" style={{ color: accent.background }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="mt-3 text-xs text-muted-foreground">{step.duration}</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">{step.title}</h3>
                    {step.technologies && (
                      <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
                        {step.technologies.join(' / ')}
                      </p>
                    )}
                    <div className="mt-8 grid gap-8 md:grid-cols-2">
                      <div>
                        <h4 className="font-bold">Decisions</h4>
                        <ul className="mt-4 space-y-5 text-sm text-muted-foreground">
                          {step.decisions.map((item) => (
                            <li key={item.decision}>
                              <strong className="block text-foreground">{item.decision}</strong>
                              {item.reasoning}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold">Delivered</h4>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                          {step.achievements.map((achievement) => (
                            <li key={achievement}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {project.gallery.length > 0 && (
          <section id="gallery" className="border-b border-current/25 py-28 md:py-40">
            <div className="mx-auto max-w-[100rem] px-5 md:px-8 lg:px-12">
              <SectionHeading title="Interface gallery." description="Screens and diagrams from the project." />
              <div className="grid grid-flow-dense grid-cols-1 border-2 border-current sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((item, index) => (
                  <button
                    key={item.image}
                    onClick={() => setLightboxIndex(index)}
                    className="group min-h-11 overflow-hidden border-b-2 border-current text-left sm:border-r-2 lg:[&:nth-child(3n)]:border-r-0">
                    <img
                      src={item.image}
                      alt=""
                      className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="block border-t-2 border-current bg-background p-4 font-bold text-foreground group-hover:bg-foreground group-hover:text-background">
                      {item.title}
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
              className="group mx-auto grid min-h-[32rem] max-w-[100rem] content-between px-5 py-20 md:px-8 lg:px-12">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.12em] text-background/55">
                <span>Next project</span>
                <span>
                  {nextProject.category} / {nextProject.year}
                </span>
              </div>
              <h2 className="break-words text-[clamp(4.5rem,14vw,13rem)] font-black leading-[0.75] tracking-[-0.055em]">
                {nextProject.title}
              </h2>
              <span className="inline-flex min-h-12 items-center gap-2 justify-self-start border-b border-current text-lg font-bold">
                Open case study{' '}
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
