import { House } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Link } from '@/components/common/link';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const ProjectHeader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? Math.min(1, window.scrollY / distance) : 0);
    };
    const queueProgressUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener('scroll', queueProgressUpdate, { passive: true });
    window.addEventListener('resize', queueProgressUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queueProgressUpdate);
      window.removeEventListener('resize', queueProgressUpdate);
    };
  }, []);

  return (
    <>
      <div className="reactive-header-control fixed left-5 top-4 z-50 md:left-8 lg:left-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex">
              <Link
                to="/#hero"
                unstyled
                aria-label="Back to portfolio"
                data-signal
                data-signal-color="#ff583d"
                className="floating-header-button flex size-11 items-center justify-center rounded-full">
                <House className="size-[1.125rem]" aria-hidden="true" />
              </Link>
            </span>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            sideOffset={8}
            className="rounded-none border border-[#f4f2ed]/35 bg-[#080808] px-2.5 py-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#f4f2ed] shadow-none [&_.tooltip-arrow]:bg-[#080808] [&_.tooltip-arrow]:fill-[#080808]">
            Back to portfolio
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="reactive-header-control fixed right-5 top-4 z-50 md:right-8 lg:right-12">
        <ThemeToggle />
      </div>

      <span className="fixed inset-x-0 top-0 z-[60] h-0.5" aria-hidden="true">
        <span
          className="block h-full origin-left bg-[#ff583d] motion-reduce:hidden"
          style={{ transform: `scaleX(${progress})` }}
        />
      </span>
    </>
  );
};
