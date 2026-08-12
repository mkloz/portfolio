import { useEffect } from 'react';

import { Header } from '@/pages/home/header';

import { Contact } from './contact';
import { Hero } from './hero';
import { Lab } from './lab';
import { Projects } from './projects';
import { Skills } from './skills';

export const HomePage = () => {
  useEffect(() => {
    const sectionId = window.location.hash.slice(1);
    if (!sectionId) return;

    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ block: 'start' });
    });
  }, []);

  return (
    <>
      <a
        href="#hero"
        className="fixed left-4 top-4 z-[100] -translate-y-24 bg-primary px-4 py-3 text-primary-foreground focus:translate-y-0">
        Skip to main content
      </a>
      <Header />
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
