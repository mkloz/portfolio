import {
  SiAmazon,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJest,
  SiJsonwebtokens,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypeorm,
  SiTypescript,
  SiVercel
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

import { SectionDivider } from '../../../components/common/section-divider';
import { SectionTitle } from '../../../components/common/section-title';
import { SkillsBackgroundElements } from './background-elements';
import { TechnologiesGrid } from './technologies-grid';

const allTechnologies = [
  // Frontend
  { name: 'React', icon: SiReact, color: 'from-[#61DAFB] to-[#61DAFB]', category: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'from-[#000000] to-[#000000]', category: 'Frontend' },
  { name: 'TypeScript', icon: SiTypescript, color: 'from-[#3178C6] to-[#3178C6]', category: 'Frontend' },
  { name: 'Tailwind', icon: SiTailwindcss, color: 'from-[#06B6D4] to-[#06B6D4]', category: 'Frontend' },
  { name: 'HTML/CSS', icon: SiHtml5, color: 'from-[#E34F26] to-[#1572B6]', category: 'Frontend' },
  { name: 'Shadcn/ui', icon: SiReact, color: 'from-[#000000] to-[#000000]', category: 'Frontend' },

  // Backend
  { name: 'Node.js', icon: SiNodedotjs, color: 'from-[#339933] to-[#339933]', category: 'Backend' },
  { name: 'NestJS', icon: SiNestjs, color: 'from-[#E0234E] to-[#E0234E]', category: 'Backend' },
  { name: 'Express', icon: SiExpress, color: 'from-[#000000] to-[#000000]', category: 'Backend' },
  { name: 'Prisma', icon: SiPrisma, color: 'from-[#2D3748] to-[#2D3748]', category: 'Backend' },
  { name: 'TypeORM', icon: SiTypeorm, color: 'from-[#F29111] to-[#F29111]', category: 'Backend' },
  { name: 'JWT', icon: SiJsonwebtokens, color: 'from-[#000000] to-[#000000]', category: 'Backend' },

  // Database
  { name: 'MySQL', icon: SiMysql, color: 'from-[#4479A1] to-[#4479A1]', category: 'Database' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'from-[#4169E1] to-[#4169E1]', category: 'Database' },
  { name: 'MongoDB', icon: SiMongodb, color: 'from-[#47A248] to-[#47A248]', category: 'Database' },
  { name: 'Redis', icon: SiRedis, color: 'from-[#DC382D] to-[#DC382D]', category: 'Database' },

  // DevOps
  { name: 'AWS', icon: SiAmazon, color: 'from-[#FF9900] to-[#FF9900]', category: 'DevOps' },
  { name: 'Docker', icon: SiDocker, color: 'from-[#2496ED] to-[#2496ED]', category: 'DevOps' },
  { name: 'Linux', icon: SiLinux, color: 'from-[#FCC624] to-[#FCC624]', category: 'DevOps' },
  { name: 'Git', icon: SiGit, color: 'from-[#F05032] to-[#F05032]', category: 'DevOps' },

  // Tools
  { name: 'VS Code', icon: VscCode, color: 'from-[#007ACC] to-[#007ACC]', category: 'Tools' },
  { name: 'Postman', icon: SiPostman, color: 'from-[#FF6C37] to-[#FF6C37]', category: 'Tools' },
  { name: 'Figma', icon: SiFigma, color: 'from-[#F24E1E] to-[#F24E1E]', category: 'Tools' },
  { name: 'GitHub', icon: SiGithub, color: 'from-[#181717] to-[#181717]', category: 'Tools' },
  { name: 'Vercel', icon: SiVercel, color: 'from-[#000000] to-[#000000]', category: 'Tools' },
  { name: 'Jest', icon: SiJest, color: 'from-[#C21325] to-[#C21325]', category: 'Tools' }
];

const categoryColors = {
  Frontend: 'from-pink-500 to-purple-500',
  Backend: 'from-green-500 to-emerald-500',
  Database: 'from-violet-500 to-purple-500',
  DevOps: 'from-orange-500 to-amber-500',
  Tools: 'from-blue-500 to-cyan-500'
};

export const Skills = () => {
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
