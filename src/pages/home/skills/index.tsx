import { SectionDivider } from '../../../components/common/section-divider';
import { SectionTitle } from '../../../components/common/section-title';
import { getAllTechnologies } from '../../../data/technologies';
import { SkillsBackgroundElements } from './background-elements';
import { TechnologiesGrid } from './technologies-grid';

export const Skills = () => {
  const allTechnologies = getAllTechnologies().map((tech) => ({
    name: tech.name,
    icon: tech.icon,
    color: `from-[${tech.color}] to-[${tech.color}]`,
    category: tech.category,
    bgColor: tech.bgColor
  }));

  return (
    <section id="skills" className="py-10 md:py-16 relative overflow-hidden">
      <SkillsBackgroundElements />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="Skills & Technologies" backgroundTitle="SKILLS" />

        <SectionDivider />

        <TechnologiesGrid technologies={allTechnologies} />
      </div>
    </section>
  );
};
