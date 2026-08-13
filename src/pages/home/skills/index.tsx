import { ArrowUpRight, CloudCog, Code2, Database, ServerCog, Wrench } from 'lucide-react';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { ProjectService } from '@/services/project.service';

const CATEGORIES = [
  {
    name: 'Frontend',
    icon: Code2,
    color: '#ffd400',
    image: '/editorial/system-frontend-integrated.jpg',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Next.js', 'Zustand']
  },
  {
    name: 'Backend',
    icon: ServerCog,
    color: '#465bff',
    image: '/editorial/system-backend.jpg',
    technologies: ['Node.js', 'NestJS', 'Prisma', 'Express', 'JWT', 'Socket.IO']
  },
  {
    name: 'Database',
    icon: Database,
    color: '#74f0b3',
    image: '/editorial/system-database.jpg',
    technologies: ['PostgreSQL', 'Redis', 'MongoDB', 'MySQL']
  },
  {
    name: 'DevOps',
    icon: CloudCog,
    color: '#ff583d',
    image: '/editorial/system-devops.jpg',
    technologies: ['Docker', 'AWS', 'Nginx', 'GitHub Actions', 'Vercel', 'Linux']
  },
  {
    name: 'Tools',
    icon: Wrench,
    color: '#6c4eff',
    image: '/editorial/system-tools.jpg',
    technologies: ['Git', 'ESLint', 'Prettier', 'Jest', 'Swagger']
  }
] as const;

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]['name']>('Frontend');
  const projects = ProjectService.getAllProjects();
  const active = CATEGORIES.find((category) => category.name === activeCategory) ?? CATEGORIES[0];
  const evidenceProjects = useMemo(
    () =>
      projects.filter((project) =>
        project.detailedTechnologies.some((technology) => technology.category === activeCategory)
      ),
    [activeCategory, projects]
  );

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
                role="tab"
                aria-selected={activeCategory === category.name}
                aria-controls="technology-list"
                onClick={() => setActiveCategory(category.name)}
                className={cn(
                  'group flex min-h-14 items-center justify-center border-r border-current/25 px-2 last:border-r-0 lg:grid lg:min-h-20 lg:w-full lg:grid-cols-[1fr_auto] lg:justify-stretch lg:gap-4 lg:border-b lg:border-r-0 lg:px-5 lg:text-left lg:text-3xl lg:font-black lg:tracking-[-0.04em] lg:last:border-b-0 xl:min-h-24 xl:text-4xl',
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
                alt={`${active.name} engineering workbench with technology marks integrated into the scene`}
                className="absolute inset-0 size-full object-cover motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
              />
              <div className="relative flex min-h-[24rem] max-w-[82%] flex-col justify-end p-5 sm:max-w-[58%] md:min-h-[36rem] md:max-w-[52%] md:p-10">
                <h3 className="text-4xl font-black tracking-[-0.04em] md:text-7xl">{active.name}</h3>
                <p className="mt-4 max-w-56 text-sm leading-relaxed text-white/70">
                  Proven across {evidenceProjects.length} {evidenceProjects.length === 1 ? 'project' : 'projects'}{' '}
                  below.
                </p>
                <ul
                  className="mt-5 flex max-w-md flex-wrap gap-x-5 gap-y-2 md:mt-7"
                  aria-label={`${active.name} technologies`}>
                  {active.technologies.map((technology) => (
                    <li key={technology} className="flex items-center gap-2 text-sm font-bold text-white md:text-base">
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
                  <a
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group flex min-h-10 items-center gap-1.5 font-semibold">
                    {project.title}
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-200 group-hover:rotate-45"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
