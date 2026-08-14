import { SectionNavigator } from '@/components/common/section-navigator';
import { useRouteScroll } from '@/hooks/use-route-scroll';
import { Header } from '@/pages/home/header';

import { Contact } from './contact';
import { Hero } from './hero';
import { Lab } from './lab';
import { Projects } from './projects';
import { Skills } from './skills';

export const HomePage = () => {
  useRouteScroll('home');

  return (
    <>
      <a
        href="#projects"
        className="fixed left-4 top-4 z-[100] -translate-y-24 bg-primary px-4 py-3 text-primary-foreground focus:translate-y-0">
        Skip to selected work
      </a>
      <Header />
      <SectionNavigator
        items={[
          { id: 'hero', label: 'Hello', color: '#ff583d' },
          { id: 'projects', label: 'Projects', color: '#ffd400' },
          { id: 'lab', label: 'What I cover', color: '#465bff' },
          { id: 'skills', label: 'Tools', color: '#74f0b3' },
          { id: 'contact', label: 'Contact', color: '#6c4eff' }
        ]}
      />
      <main>
        <Hero />
        <Projects />
        <Lab />
        <Skills />
        <Contact />
      </main>
    </>
  );
};
