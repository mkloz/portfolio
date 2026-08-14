import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Link } from '@/components/common/link';
import { projectSummaries } from '@/data/project-summaries';

export const NotFound = () => {
  const navigate = useNavigate();
  const projects = projectSummaries.slice(0, 3);
  const goBack = () => {
    const historyIndex = window.history.state?.idx;
    if (typeof historyIndex === 'number' && historyIndex > 0) {
      navigate(-1);
      return;
    }
    navigate('/#hero');
  };

  return (
    <main className="min-h-svh bg-[#080808] text-white">
      <div className="mx-auto flex min-h-svh max-w-[100rem] flex-col px-5 py-7 md:px-8 lg:px-12">
        <div className="flex items-center justify-between border-b border-white/25 pb-5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.13em]">
          <span>MK / Route monitor</span>
          <span className="text-[#ff583d]">404 / Signal lost</span>
        </div>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1 className="text-[clamp(5rem,14vw,13rem)] font-black leading-[0.74] tracking-[-0.055em]">
              Wrong
              <br />
              turn<span className="text-[#ffd400]">.</span>
            </h1>
            <p className="mt-8 max-w-lg text-xl font-medium leading-relaxed text-white/65">
              This route does not connect to the portfolio. Use the project ledger or return to the previous page.
            </p>
          </div>

          <div className="border-y border-white/25 lg:col-span-4">
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                unstyled
                className="group grid min-h-20 grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-white/25 last:border-b-0">
                <span className="font-mono text-xs text-white/45">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-2xl font-black">{project.title}</span>
                <ArrowUpRight
                  className="size-5 transition-transform duration-200 group-hover:rotate-45"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-5 border-t border-white/25 pt-5">
          <button onClick={() => navigate('/#projects')} className="inline-flex min-h-12 items-center gap-2 font-bold">
            Project ledger <ArrowUpRight aria-hidden="true" />
          </button>
          <button onClick={goBack} className="inline-flex min-h-12 items-center gap-2 text-white/65 hover:text-white">
            <ArrowLeft aria-hidden="true" /> Go back
          </button>
        </div>
      </div>
    </main>
  );
};
