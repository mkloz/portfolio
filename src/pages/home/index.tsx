import About from './about';
import { Contact } from './contact';
import { Hero } from './hero';
import { Projects } from './projects';
import { Skills } from './skills';

export const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
};
