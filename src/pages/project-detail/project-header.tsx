import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Link } from '@/components/common/link';
import { ThemeToggle } from '@/components/common/theme-toggle';

export const ProjectHeader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? Math.min(1, window.scrollY / distance) : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <>
      <Link
        to="/#projects"
        unstyled
        aria-label="Back to selected work"
        className="fixed left-5 top-4 z-50 flex size-11 items-center justify-center border border-current/60 bg-background text-foreground transition-colors hover:bg-foreground hover:text-background md:left-8 lg:left-12">
        <ArrowLeft className="size-5" aria-hidden="true" />
      </Link>

      <div className="fixed right-5 top-4 z-50 md:right-8 lg:right-12">
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
