import { MoonIcon, SunIcon } from 'lucide-react';
import { useRef } from 'react';
import { flushSync } from 'react-dom';

import { Theme, useTheme } from '@/hooks/theme.store';
import { runViewTransition } from '@/lib/view-transition';

import { Toggle } from '../ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const ThemeToggle = () => {
  const { setTheme, isDark } = useTheme();
  const originRef = useRef({ x: window.innerWidth, y: 0 });
  const actionLabel = isDark ? 'Use light theme' : 'Use dark theme';

  return (
    <div className="flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex">
            <Toggle
              aria-label={actionLabel}
              pressed={isDark}
              variant={'default'}
              size={'default'}
              data-magnetic
              data-signal
              data-signal-color="#ffd400"
              data-cursor={actionLabel}
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
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          sideOffset={8}
          className="rounded-none border border-[#f4f2ed]/35 bg-[#080808] px-2.5 py-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#f4f2ed] shadow-none [&_.tooltip-arrow]:bg-[#080808] [&_.tooltip-arrow]:fill-[#080808]">
          {actionLabel}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
