import { SectionDivider } from '../../../components/common/section-divider';
import { SectionTitle } from '../../../components/common/section-title';
import { getAllTechnologies } from '../../../data/technologies';
import { SkillsBackgroundElements } from './background-elements';
import { TechnologiesGrid } from './technologies-grid';

const categoryColors = {
  Frontend: 'from-pink-500 to-purple-500',
  Backend: 'from-green-500 to-emerald-500',
  Database: 'from-violet-500 to-purple-500',
  DevOps: 'from-orange-500 to-amber-500',
  Tools: 'from-blue-500 to-cyan-500'
};

export const Skills = () => {
  const allTechnologies = getAllTechnologies().map((tech) => ({
    name: tech.name,
    icon: tech.icon,
    color: `from-[${tech.color}] to-[${tech.color}]`,
    category: tech.category
  }));

  return (
    <section id="skills" className="py-10 md:py-16 relative overflow-hidden">
      <SkillsBackgroundElements />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          title="Skills & Technologies"
          subtitle="Technologies and tools I use to build modern web applications"
          backgroundTitle="SKILLS"
        />

        <SectionDivider />

        <TechnologiesGrid technologies={allTechnologies} categoryColors={categoryColors} />
      </div>
    </section>
  );
};
