import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';

import { getAllTechnologies } from '@/data/technologies';
import { cn } from '@/lib/utils';
import { ProjectService } from '@/services/project.service';

const CATEGORIES = [
  { name: 'Frontend', color: '#ffd400', foreground: '#080808' },
  { name: 'Backend', color: '#465bff', foreground: '#ffffff' },
  { name: 'Database', color: '#74f0b3', foreground: '#080808' },
  { name: 'DevOps', color: '#ff583d', foreground: '#080808' },
  { name: 'Tools', color: '#6c4eff', foreground: '#ffffff' }
] as const;

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]['name']>('Frontend');
  const technologies = getAllTechnologies();
  const projects = ProjectService.getAllProjects();
  const active = CATEGORIES.find((category) => category.name === activeCategory) ?? CATEGORIES[0];
  const activeTechnologies = useMemo(
    () => technologies.filter((technology) => technology.category === activeCategory),
    [activeCategory, technologies]
  );
  const evidenceProjects = useMemo(
    () =>
      projects.filter((project) =>
        project.detailedTechnologies.some((technology) => technology.category === activeCategory)
      ),
    [activeCategory, projects]
  );

  return (
    <section id="skills" className="border-b border-current/25 py-28 md:py-40">
      <div className="mx-auto max-w-[100rem] px-5 md:px-8 lg:px-12">
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
            <div className="relative min-h-72 overflow-hidden bg-[#080808] text-white">
              <img
                src="/editorial/interface-workshop.webp"
                alt="Editorial interface assembly with drafting tools and paper components"
                className="absolute inset-0 size-full object-cover opacity-30 grayscale"
              />
              <div className="absolute inset-0 bg-[#080808]/35" aria-hidden="true" />
              <div className="relative grid gap-10 p-6 md:grid-cols-[0.75fr_1.25fr] md:p-10">
                <div>
                  <span className="mb-6 block h-2 w-20" style={{ backgroundColor: active.color }} aria-hidden="true" />
                  <h3 className="text-5xl font-black tracking-[-0.05em] md:text-7xl">{active.name}</h3>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
                    Used in {evidenceProjects.length} {evidenceProjects.length === 1 ? 'project' : 'projects'} shown
                    here.
                  </p>
                </div>
                <ul className="grid grid-cols-2 content-start gap-x-7 gap-y-3 text-xl font-bold tracking-[-0.02em] sm:grid-cols-3 md:text-2xl">
                  {activeTechnologies.map((technology) => (
                    <li key={technology.name} className="border-b border-white/25 pb-2">
                      {technology.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3">
              {evidenceProjects.map((project) => (
                <a
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group min-h-16 border-r border-t border-current/25 px-4 py-4 font-semibold">
                  <span className="font-mono text-[0.61rem] uppercase tracking-[0.1em] text-muted-foreground">
                    Evidence
                  </span>
                  <span className="mt-1 flex items-center justify-between text-lg">
                    {project.title}
                    <ArrowUpRight
                      className="size-4 transition-transform duration-200 group-hover:rotate-45"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
