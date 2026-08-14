export type TechnologyCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools' | 'Full-Stack';

export interface Technology {
  name: string;
  category: TechnologyCategory;
}

const technology = (name: string, category: TechnologyCategory): Technology => ({ name, category });

/**
 * Lightweight technology metadata used to group case-study content.
 * Visual marks are rendered by the section itself, so bundling an icon
 * component for every catalog entry only added parse and transfer cost.
 */
export const technologies = {
  react: technology('React', 'Frontend'),
  nextjs: technology('Next.js', 'Frontend'),
  vite: technology('Vite', 'Frontend'),
  tailwind: technology('Tailwind CSS', 'Frontend'),
  html5: technology('HTML5', 'Frontend'),
  reactrouter: technology('React Router', 'Frontend'),
  reactquery: technology('React Query', 'Frontend'),
  zustand: technology('Zustand', 'Frontend'),
  reacthookform: technology('React Hook Form', 'Frontend'),
  shadcn: technology('ShadCN', 'Frontend'),
  konva: technology('Konva', 'Frontend'),
  javascript: technology('JavaScript', 'Full-Stack'),
  typescript: technology('TypeScript', 'Full-Stack'),
  nodejs: technology('Node.js', 'Full-Stack'),
  zod: technology('Zod', 'Full-Stack'),
  axios: technology('Axios', 'Full-Stack'),
  stripe: technology('Stripe', 'Full-Stack'),
  express: technology('Express', 'Backend'),
  nestjs: technology('NestJS', 'Backend'),
  prisma: technology('Prisma', 'Backend'),
  typeorm: technology('TypeORM', 'Backend'),
  jwt: technology('JWT', 'Backend'),
  websockets: technology('WebSockets', 'Backend'),
  socketio: technology('Socket.IO', 'Backend'),
  microservices: technology('Microservices', 'Backend'),
  serverless: technology('Serverless', 'Backend'),
  grpc: technology('gRPC', 'Backend'),
  mysql: technology('MySQL', 'Database'),
  postgresql: technology('PostgreSQL', 'Database'),
  redis: technology('Redis', 'Database'),
  mongodb: technology('MongoDB', 'Database'),
  docker: technology('Docker', 'DevOps'),
  githubactions: technology('GitHub Actions', 'DevOps'),
  azure: technology('Azure', 'DevOps'),
  awss3: technology('AWS S3', 'DevOps'),
  aws: technology('AWS', 'DevOps'),
  oraclecloud: technology('Oracle Cloud', 'DevOps'),
  cloudflarepages: technology('Cloudflare Pages', 'DevOps'),
  vercel: technology('Vercel', 'DevOps'),
  teamcity: technology('TeamCity', 'DevOps'),
  terraform: technology('Terraform', 'DevOps'),
  ansible: technology('Ansible', 'DevOps'),
  nginx: technology('Nginx', 'DevOps'),
  linux: technology('Linux', 'DevOps'),
  prettier: technology('Prettier', 'Tools'),
  eslint: technology('ESLint', 'Tools'),
  jest: technology('Jest', 'Tools'),
  swagger: technology('Swagger', 'Tools'),
  git: technology('Git', 'Tools')
} as const;

export const getTechnologyByName = (name: string): Technology | undefined =>
  Object.values(technologies).find((item) => item.name.toLowerCase() === name.toLowerCase());

export const getTechnologiesByCategory = (category: string): Technology[] =>
  Object.values(technologies).filter((item) => item.category === category);

export const getAllTechnologies = (): Technology[] => Object.values(technologies);

export const getTechnologyCategories = (): TechnologyCategory[] => [
  ...new Set(Object.values(technologies).map((item) => item.category))
];
