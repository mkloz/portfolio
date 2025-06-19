import { Outlet } from 'react-router-dom';

import { BoxBordersSwitch } from './components/dev/box-borders-switch';
import { TailwindIndicator } from './components/dev/tailwindIndicator';
import { Toaster } from './components/ui/sonner';
import { useTheme } from './hooks/theme.store';

export const App = () => {
  useTheme();

  return (
    <div className="min-h-screen  transition-colors duration-300">
      <Outlet />
      <TailwindIndicator />
      <Toaster expand />
      <BoxBordersSwitch />
    </div>
  );
};
