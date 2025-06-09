import { ButtonGradient } from '../../../components/ui/button';

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveDemo: string;
  github: string;
  website: string;
  featured?: boolean;
  gradient: ButtonGradient;
  year: number;
  progress: number;
}

export const projects: Project[] = [
  {
    title: 'Citywheels',
    description:
      'E-commerce online store built from scratch. Used a lot of technologies and all my knowledge to give the best user experience.',
    image: '/placeholder.svg?height=300&width=500',
    technologies: ['NextJS', 'NestJS', 'Prisma', 'Tailwind', 'Docker', 'AWS', 'TypeScript'],
    liveDemo: 'https://citywheels.mkloz.com',
    github: 'https://github.com/mkloz/citywheels',
    website: 'https://citywheels.mkloz.com',
    featured: true,
    gradient: 'blue',
    year: 2024,
    progress: 100
  },
  {
    title: 'ToDo Application',
    description: 'Highly responsive and adaptive React SPA - to-do application with modern state management.',
    image: '/placeholder.svg?height=300&width=500',
    technologies: ['ReactJS', 'CSS Modules', 'ReactQuery', 'Zustand', 'TypeScript'],
    liveDemo: 'https://todo.mkloz.com',
    github: 'https://github.com/mkloz/todo',
    website: 'https://todo.mkloz.com',
    featured: true,
    gradient: 'purple',
    year: 2024,
    progress: 100
  },
  {
    title: 'Portfolio Website',
    description: 'Modern portfolio website showcasing my work with stunning animations and responsive design.',
    image: '/placeholder.svg?height=300&width=500',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'Vercel'],
    liveDemo: 'https://portfolio.mkloz.com',
    github: 'https://github.com/mkloz/portfolio',
    website: 'https://portfolio.mkloz.com',
    featured: true,
    gradient: 'green',
    year: 2024,
    progress: 100
  },
  {
    title: 'Swapi - Star Wars API',
    description: 'Star Wars API created to practice NestJS skills with comprehensive data management.',
    image: '/placeholder.svg?height=300&width=500',
    technologies: ['NestJS', 'TypeORM', 'MySQL', 'AWS', 'S3', 'Docker', 'TypeScript'],
    liveDemo: 'https://swapi.mkloz.com',
    github: 'https://github.com/mkloz/swapi',
    website: 'https://swapi.mkloz.com',
    gradient: 'pink',
    year: 2024,
    progress: 100
  },
  {
    title: 'Bulletproof Express',
    description:
      'Express.js template implementing best practices of backend development with comprehensive architecture.',
    image: '/placeholder.svg?height=300&width=500',
    technologies: ['ExpressJS', 'Prisma', 'OpenAPI', 'JWT', 'TypeScript'],
    liveDemo: 'https://express.mkloz.com',
    github: 'https://github.com/mkloz/bulletproof-express',
    website: 'https://express.mkloz.com',
    gradient: 'yellow',
    year: 2024,
    progress: 100
  },
  {
    title: 'Online Store Platform',
    description:
      'A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.',
    image: '/placeholder.svg?height=300&width=500',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveDemo: 'https://online-store.mkloz.com',
    github: 'https://github.com/mkloz/online-store',
    website: 'https://online-store.mkloz.com',
    gradient: 'violet',
    year: 2024,
    progress: 100
  }
];
