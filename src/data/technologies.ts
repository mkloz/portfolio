import { Cloud } from 'lucide-react';
import type { IconType } from 'react-icons';
import { FaCloud, FaNetworkWired, FaServer } from 'react-icons/fa';
import {
  SiAmazon,
  SiAnsible,
  SiAxios,
  SiDocker,
  SiEslint,
  SiExpress,
  SiGit,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiKonva,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOracle,
  SiPostgresql,
  SiPrettier,
  SiPrisma,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiReactrouter,
  SiRedis,
  SiSocketdotio,
  SiStripe,
  SiSwagger,
  SiTailwindcss,
  SiTerraform,
  SiTypeorm,
  SiTypescript,
  SiVercel,
  SiZod
} from 'react-icons/si';

import { AWSS3 } from '../assets/logos/aws-s3';
import { JWT } from '../assets/logos/jwt';
import { Linux } from '../assets/logos/linux';
import { ShadCN } from '../assets/logos/shadcn';
import { TeamCity } from '../assets/logos/team-city';
import { Vite } from '../assets/logos/vite';
import { WebSocket } from '../assets/logos/websocket';
import { Zustand } from '../assets/logos/zustand';

export interface Technology {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools';
  icon: IconType;
  color: string;
  isCustomIcon?: boolean;
}

// Technology definitions
export const technologies: Record<string, Technology> = {
  // Frontend Technologies
  javascript: { name: 'JavaScript', category: 'Frontend', icon: SiJavascript, color: '#F7DF1E' },
  typescript: { name: 'TypeScript', category: 'Frontend', icon: SiTypescript, color: '#3178C6' },
  react: { name: 'React', category: 'Frontend', icon: SiReact, color: '#61DAFB' },
  nextjs: { name: 'Next.js', category: 'Frontend', icon: SiNextdotjs, color: '#000000' },
  vite: { name: 'Vite', category: 'Frontend', icon: Vite, color: '#646CFF', isCustomIcon: true },
  tailwind: { name: 'Tailwind CSS', category: 'Frontend', icon: SiTailwindcss, color: '#06B6D4' },
  html5: { name: 'HTML5', category: 'Frontend', icon: SiHtml5, color: '#E34F26' },
  reactrouter: { name: 'React Router', category: 'Frontend', icon: SiReactrouter, color: '#CA4245' },
  reactquery: { name: 'React Query', category: 'Frontend', icon: SiReactquery, color: '#FF4154' },
  zustand: { name: 'Zustand', category: 'Frontend', icon: Zustand, color: '#443E38', isCustomIcon: true },
  reacthookform: { name: 'React Hook Form', category: 'Frontend', icon: SiReacthookform, color: '#EC5990' },
  shadcn: { name: 'ShadCN', category: 'Frontend', icon: ShadCN, color: '#000000', isCustomIcon: true },
  zod: { name: 'Zod', category: 'Frontend', icon: SiZod, color: '#3E67B1' },
  axios: { name: 'Axios', category: 'Frontend', icon: SiAxios, color: '#5A29E4' },
  konva: { name: 'Konva', category: 'Frontend', icon: SiKonva, color: '#0D83CD' },

  // Backend Technologies
  nodejs: { name: 'Node.js', category: 'Backend', icon: SiNodedotjs, color: '#339933' },
  express: { name: 'Express', category: 'Backend', icon: SiExpress, color: '#000000' },
  nestjs: { name: 'NestJS', category: 'Backend', icon: SiNestjs, color: '#E0234E' },
  prisma: { name: 'Prisma', category: 'Backend', icon: SiPrisma, color: '#2D3748' },
  typeorm: { name: 'TypeORM', category: 'Backend', icon: SiTypeorm, color: '#F29111' },
  jwt: { name: 'JWT', category: 'Backend', icon: JWT, color: '#000000', isCustomIcon: true },
  stripe: { name: 'Stripe', category: 'Backend', icon: SiStripe, color: '#635BFF' },
  websockets: { name: 'WebSockets', category: 'Backend', icon: WebSocket, color: '#010101', isCustomIcon: true },
  socketio: { name: 'Socket.IO', category: 'Backend', icon: SiSocketdotio, color: '#010101' },
  microservices: { name: 'Microservices', category: 'Backend', icon: FaServer, color: '#FF6B6B' },
  serverless: { name: 'Serverless', category: 'Backend', icon: FaCloud, color: '#FD7E14' },
  grpc: { name: 'gRPC', category: 'Backend', icon: FaNetworkWired, color: '#244C5A' },

  // Database Technologies
  mysql: { name: 'MySQL', category: 'Database', icon: SiMysql, color: '#4479A1' },
  postgresql: { name: 'PostgreSQL', category: 'Database', icon: SiPostgresql, color: '#4169E1' },
  redis: { name: 'Redis', category: 'Database', icon: SiRedis, color: '#DC382D' },
  mongodb: { name: 'MongoDB', category: 'Database', icon: SiMongodb, color: '#47A248' },

  // DevOps Technologies
  docker: { name: 'Docker', category: 'DevOps', icon: SiDocker, color: '#2496ED' },
  githubactions: { name: 'GitHub Actions', category: 'DevOps', icon: SiGithubactions, color: '#2088FF' },
  azure: { name: 'Azure', category: 'DevOps', icon: Cloud, color: '#0078D4' },
  awss3: { name: 'AWS S3', category: 'DevOps', icon: AWSS3, color: '#FF9900', isCustomIcon: true },
  aws: { name: 'AWS', category: 'DevOps', icon: SiAmazon, color: '#FF9900' },
  oraclecloud: { name: 'Oracle Cloud', category: 'DevOps', icon: SiOracle, color: '#F80000' },
  vercel: { name: 'Vercel', category: 'DevOps', icon: SiVercel, color: '#000000' },
  teamcity: { name: 'TeamCity', category: 'DevOps', icon: TeamCity, color: '#000000', isCustomIcon: true },
  terraform: { name: 'Terraform', category: 'DevOps', icon: SiTerraform, color: '#7B42BC' },
  ansible: { name: 'Ansible', category: 'DevOps', icon: SiAnsible, color: '#EE0000' },
  nginx: { name: 'Nginx', category: 'DevOps', icon: SiNginx, color: '#009639' },
  linux: { name: 'Linux', category: 'DevOps', icon: Linux, color: '#FCC624', isCustomIcon: true },

  // Tools
  prettier: { name: 'Prettier', category: 'Tools', icon: SiPrettier, color: '#F7B93E' },
  eslint: { name: 'ESLint', category: 'Tools', icon: SiEslint, color: '#4B32C3' },
  jest: { name: 'Jest', category: 'Tools', icon: SiJest, color: '#C21325' },
  swagger: { name: 'Swagger', category: 'Tools', icon: SiSwagger, color: '#85EA2D' },
  git: { name: 'Git', category: 'Tools', icon: SiGit, color: '#F05032' }
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
