import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { ProjectService } from '@/services/project.service';

const CATEGORIES = [
  {
    name: 'Frontend',
    color: '#ffd400',
    image: '/editorial/system-frontend-integrated.jpg',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Next.js', 'Zustand']
  },
  {
    name: 'Backend',
    color: '#465bff',
    image: '/editorial/system-backend.jpg',
    technologies: ['Node.js', 'NestJS', 'Prisma', 'Express', 'JWT', 'Socket.IO']
  },
  {
    name: 'Database',
    color: '#74f0b3',
    image: '/editorial/system-database.jpg',
    technologies: ['PostgreSQL', 'Redis', 'MongoDB', 'MySQL']
  },
  {
    name: 'DevOps',
    color: '#ff583d',
    image: '/editorial/system-devops.jpg',
    technologies: ['Docker', 'AWS', 'Nginx', 'GitHub Actions', 'Vercel', 'Linux']
  },
  {
    name: 'Tools',
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
    <section id="skills" className="border-b border-current/25 py-28 md:py-40">
      <div className="content-shell px-5 md:px-8 lg:px-12">
        <div className="grid gap-10 border-t-2 border-current pt-5 lg:grid-cols-12">
          <h2 className="section-type lg:col-span-8">Working system.</h2>
          <p className="max-w-xl self-end text-lg leading-relaxed text-muted-foreground lg:col-span-4">
            Choose a responsibility to see the tools and projects that carry it. Every tool shown here appears in the
            project record.
          </p>
        </div>

        <div className="mt-16 grid border-y-2 border-current lg:grid-cols-12">
          <div className="lg:col-span-4 lg:border-r-2 lg:border-current" role="tablist" aria-label="Technology groups">
            {CATEGORIES.map((category) => (
              <button
                key={category.name}
                role="tab"
                aria-selected={activeCategory === category.name}
                aria-controls="technology-list"
                onClick={() => setActiveCategory(category.name)}
                className={cn(
                  'group grid min-h-20 w-full grid-cols-[1fr_auto] items-center border-b border-current/25 px-5 text-left text-3xl font-black tracking-[-0.04em] last:border-b-0 md:min-h-24 md:text-4xl',
                  activeCategory === category.name
                    ? 'bg-foreground text-background'
                    : 'hover:bg-foreground hover:text-background'
                )}>
                {category.name}
                <span
                  className="h-1 w-12 origin-right transition-transform duration-200"
                  style={{
                    backgroundColor: category.color,
                    transform: activeCategory === category.name ? 'scaleX(1)' : 'scaleX(0.25)'
                  }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          <div
            id="technology-list"
            role="tabpanel"
            className="grid min-h-[36rem] lg:col-span-8 lg:grid-rows-[1fr_auto]">
            <div className="relative min-h-[28rem] overflow-hidden bg-[#080808] text-white md:min-h-[36rem]">
              <img
                key={active.image}
                src={active.image}
                alt={`${active.name} engineering workbench with technology marks integrated into the scene`}
                className="absolute inset-0 size-full object-cover motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
              />
              <div className="relative flex min-h-[28rem] max-w-[72%] flex-col justify-end p-6 sm:max-w-[58%] md:min-h-[36rem] md:max-w-[52%] md:p-10">
                <span className="mb-5 block h-2 w-20" style={{ backgroundColor: active.color }} aria-hidden="true" />
                <h3 className="text-5xl font-black tracking-[-0.05em] md:text-7xl">{active.name}</h3>
                <p className="mt-4 max-w-56 text-sm leading-relaxed text-white/70">
                  Proven across {evidenceProjects.length} {evidenceProjects.length === 1 ? 'project' : 'projects'}{' '}
                  below.
                </p>
                <ul className="mt-7 flex max-w-md flex-wrap gap-x-5 gap-y-2" aria-label={`${active.name} technologies`}>
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
