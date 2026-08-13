import { MoonIcon, SunIcon } from 'lucide-react';

import { Theme, useTheme } from '@/hooks/theme.store';

import { Toggle } from '../ui/toggle';

export const ThemeToggle = () => {
  const { setTheme, isDark } = useTheme();

  return (
    <div className="flex items-center">
      <Toggle
        aria-label="Toggle dark mode"
        pressed={isDark}
        variant={'default'}
        size={'default'}
        onPressedChange={(value) => {
          setTheme(value ? Theme.DARK : Theme.LIGHT);
        }}
        className="relative min-h-11 min-w-11 rounded-full p-0! text-foreground/50 transition-[color,background-color] duration-200 hover:bg-foreground/8 hover:text-foreground data-[state=on]:bg-transparent data-[state=on]:text-foreground/50 data-[state=on]:hover:bg-foreground/8 data-[state=on]:hover:text-foreground">
        {isDark ? <MoonIcon className="size-[1.125rem]" /> : <SunIcon className="size-[1.125rem]" />}
      </Toggle>
    </div>
  );
};
