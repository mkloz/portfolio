import type { IconType } from 'react-icons';
import {
  SiAmazon,
  SiDocker,
  SiExpress,
  SiJest,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiStripe,
  SiTailwindcss,
  SiTypeorm,
  SiTypescript,
  SiVercel
} from 'react-icons/si';

export interface Technology {
  name: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Database';
  icon: IconType;
  color: string;
}

// Technology definitions
export const technologies: Record<string, Technology> = {
  react: { name: 'React', category: 'Frontend', icon: SiReact, color: '#61DAFB' },
  nextjs: { name: 'Next.js', category: 'Frontend', icon: SiNextdotjs, color: '#000000' },
  typescript: { name: 'TypeScript', category: 'Frontend', icon: SiTypescript, color: '#3178C6' },
  tailwind: { name: 'Tailwind CSS', category: 'Frontend', icon: SiTailwindcss, color: '#06B6D4' },
  nodejs: { name: 'Node.js', category: 'Backend', icon: SiNodedotjs, color: '#339933' },
  nestjs: { name: 'NestJS', category: 'Backend', icon: SiNestjs, color: '#E0234E' },
  express: { name: 'Express', category: 'Backend', icon: SiExpress, color: '#000000' },
  prisma: { name: 'Prisma', category: 'Backend', icon: SiPrisma, color: '#2D3748' },
  typeorm: { name: 'TypeORM', category: 'Backend', icon: SiTypeorm, color: '#F29111' },
  jest: { name: 'Jest', category: 'Backend', icon: SiJest, color: '#C21325' },
  postgresql: { name: 'PostgreSQL', category: 'Database', icon: SiPostgresql, color: '#4169E1' },
  mysql: { name: 'MySQL', category: 'Database', icon: SiMysql, color: '#4479A1' },
  mongodb: { name: 'MongoDB', category: 'Database', icon: SiMongodb, color: '#47A248' },
  redis: { name: 'Redis', category: 'Database', icon: SiRedis, color: '#DC382D' },
  docker: { name: 'Docker', category: 'DevOps', icon: SiDocker, color: '#2496ED' },
  aws: { name: 'AWS', category: 'DevOps', icon: SiAmazon, color: '#FF9900' },
  vercel: { name: 'Vercel', category: 'DevOps', icon: SiVercel, color: '#000000' },
  stripe: { name: 'Stripe', category: 'Backend', icon: SiStripe, color: '#635BFF' }
};

export const getTechnologyByName = (name: string): Technology | undefined => {
  return Object.values(technologies).find((tech) => tech.name.toLowerCase() === name.toLowerCase());
};

export const getTechnologiesByCategory = (category: string): Technology[] => {
  return Object.values(technologies).filter((tech) => tech.category === category);
};

export const getAllTechnologies = (): Technology[] => {
  return Object.values(technologies);
};

export const getTechnologyCategories = (): string[] => {
  return [...new Set(Object.values(technologies).map((tech) => tech.category))];
};
