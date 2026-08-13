import { useEffect, useLayoutEffect } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  inverse: () => void;
}

const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return Theme.LIGHT;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;
};

export const useThemeStore = create(
  persist<ThemeStore>(
    (set, get) => {
      const initialTheme = getPreferredTheme();

      return {
        theme: initialTheme,
        setTheme: (theme) => set({ theme }),
        inverse: () => {
          const newTheme = get().theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
          set({ theme: newTheme });
        }
      };
    },
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const inverse = useThemeStore((state) => state.inverse);

  return {
    theme,
    setTheme,
    inverse,
    isDark: theme === Theme.DARK,
    isLight: theme === Theme.LIGHT
  };
};

/** Synchronizes the shared theme with the DOM and operating-system preference once at the application root. */
export const useThemeSync = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.remove(Theme.LIGHT, Theme.DARK);
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (event: MediaQueryListEvent) => {
      const newColorScheme = event.matches ? Theme.DARK : Theme.LIGHT;
      setTheme(newColorScheme);
    };
    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    };
  }, [setTheme]);
};
