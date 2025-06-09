import { Outlet } from 'react-router-dom';

import { Header } from './components/common/header';
import { BoxBordersSwitch } from './components/dev/box-borders-switch';
import { TailwindIndicator } from './components/dev/tailwindIndicator';
import { useTheme } from './hooks/theme.store';

export const App = () => {
  useTheme();

  return (
    <div className="min-h-screen  transition-colors duration-300">
      <Header />
      <Outlet />
      <TailwindIndicator />
      <BoxBordersSwitch />
    </div>
  );
};
