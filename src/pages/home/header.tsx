import { useEffect, useState } from 'react';

import { ThemeToggle } from '@/components/common/theme-toggle';

export const Header = () => {
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
      <div
        className={`fixed right-5 z-50 transition-[top] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:right-8 md:top-4 lg:right-12 ${
          progress > 0.005 ? 'top-4' : 'top-[4.375rem]'
        }`}>
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
