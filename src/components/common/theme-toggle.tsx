import { MoonIcon, SunIcon } from 'lucide-react';
import { useRef } from 'react';
import { flushSync } from 'react-dom';

import { Theme, useTheme } from '@/hooks/theme.store';
import { runViewTransition } from '@/lib/view-transition';

import { Toggle } from '../ui/toggle';

export const ThemeToggle = () => {
  const { setTheme, isDark } = useTheme();
  const originRef = useRef({ x: window.innerWidth, y: 0 });

  return (
    <div className="flex items-center">
      <Toggle
        aria-label="Toggle dark mode"
        pressed={isDark}
        variant={'default'}
        size={'default'}
        data-magnetic
        data-signal
        data-signal-color="#ffd400"
        data-cursor={isDark ? 'Use light theme' : 'Use dark theme'}
        onPointerDown={(event) => {
          originRef.current = { x: event.clientX, y: event.clientY };
        }}
        onPressedChange={(value) => {
          const nextTheme = value ? Theme.DARK : Theme.LIGHT;
          window.dispatchEvent(
            new CustomEvent('portfolio:signal', {
              detail: { ...originRef.current, color: value ? '#465bff' : '#ffd400' }
            })
          );
          runViewTransition(() => flushSync(() => setTheme(nextTheme)), {
            kind: 'theme',
            ...originRef.current
          });
        }}
        className="floating-header-button relative min-h-11 min-w-11 rounded-full p-0!">
        {isDark ? <MoonIcon className="size-[1.125rem]" /> : <SunIcon className="size-[1.125rem]" />}
      </Toggle>
    </div>
  );
};
