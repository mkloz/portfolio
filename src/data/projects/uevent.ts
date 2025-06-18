import { Bell, Building, CreditCard, MapPin, Search, Smartphone } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const ueventProject: Project = {
  // Basic info
  title: 'UEvent',
  slug: 'uevent',
  description:
    'Comprehensive event sharing platform API with ticket management, payments, and real-time notifications.',
  image: {
    dark: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/uevent-dark.png',
    light: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/uevent-light.png'
  },

  highlights: [
    {
      title: 'Secure Payment Processing',
      description: 'Integrated Stripe for seamless ticket purchases with webhook handling and payment verification',
      icon: CreditCard,
      color: 'from-green-400 to-emerald-500',
      stats: '100% secure'
    },
    {
      title: 'Real-time Notifications',
      description: 'Built live notification system using Redis and WebSockets for instant event updates',
      icon: Bell,
      color: 'from-blue-400 to-cyan-500',
      stats: '< 100ms'
    },
    {
      title: 'Interactive Maps',
      description: 'Google Maps integration for location-based event discovery and venue visualization',
      icon: MapPin,
      color: 'from-red-400 to-pink-500',
      stats: 'GPS accurate'
    },
    {
      title: 'Company Profiles',
      description: 'Professional event organizer profiles with follower system and event management',
      icon: Building,
      color: 'from-purple-400 to-indigo-500',
      stats: '500+ orgs'
    },
    {
      title: 'Advanced Search',
      description: 'Powerful filtering system by location, category, date, and price range',
      icon: Search,
      color: 'from-yellow-400 to-orange-500',
      stats: '10+ filters'
    },
    {
      title: 'Mobile Optimized',
      description: 'Fully responsive design optimized for mobile event discovery and ticket purchasing',
      icon: Smartphone,
      color: 'from-teal-400 to-green-500',
      stats: 'Mobile first'
    }
  ],

  technologies: [
    // Core Technologies (Most Important)
    'Nest.js',
    'React',
    'PostgreSQL',
    'TS',
    'Prisma',
    'Stripe',
    'Redis',
    'AWS S3',
    'Docker',
    // Frontend Technologies
    'Tailwind CSS',
    'Vite',
    'Zustand',
    'React Query',
    'React Hook Form',
    'ShadCN',
    // Backend Technologies
    'Node.js',
    'JWT',
    'Swagger',
    'OpenAPI',
    'WebSockets',
    'Google Maps API',
    // Development & Testing
    'ESLint',
    'Prettier',
    'Zod',
    'Axios',
    'PostCSS',
    'Day.js',
    'Jest'
  ],
  liveDemo: 'https://uevent.mkloz.com',
  github: [
    { name: 'Frontend', link: 'https://github.com/mkloz/uevent-frontend' },
    { name: 'Backend', link: 'https://github.com/mkloz/uevent-backend' }
  ],
  website: 'https://uevent.mkloz.com',
  featured: true,
  gradient: 'purple',
  year: 2025,
  progress: 100,

  // Detailed info
  tagline: 'Connect Through Events',
  longDescription:
    'UEvent is a comprehensive event sharing platform that enables users to discover, create, and manage events seamlessly. Built with modern technologies, it features secure payment processing, real-time notifications, interactive maps, and social engagement tools for a complete event management experience.',
  status: 'Completed',
  category: 'Full-Stack',
  duration: '2 months',

  // Technical details
  detailedTechnologies: [
    technologies.nestjs,
    technologies.react,
    technologies.postgresql,
    technologies.typescript,
    technologies.prisma,
    technologies.redis,
    technologies.aws,
    technologies.docker,
    technologies.tailwind,
    technologies.vite,
    technologies.zustand,
    technologies.jest,
    technologies.eslint,
    technologies.prettier,
    technologies.axios,
    technologies.zod,
    technologies.reactquery,
    technologies.shadcn,
    technologies.jwt,
    technologies.swagger,
    technologies.axios,
    technologies.reacthookform,
    technologies.linux
  ],

  developmentJourney: {
    steps: [
      {
        id: 'planning',
        title: 'Planning & Architecture',
        duration: '1 week',
        technologies: [
          'System Design',
          'Database Design',
          'API Planning',
          'CI/CD Pipeline',
          'Docker',
          'Linux',
          'UI/UX Design'
        ],
        decisions: [
          {
            decision: 'Google Maps API for location-based event discovery',
            reasoning: 'Better integration with location services and familiar UX'
          },
          {
            decision: 'Google OAuth for authentication',
            reasoning: 'Better integration with Google services and familiar UX'
          },
          {
            decision: 'Stripe for payment processing',
            reasoning: 'Robust payment processing with excellent developer experience'
          }
        ],
        achievements: [
          'Comprehensive system architecture design',
          'Database schema with 15+ entities',
          'API endpoint planning (40+ endpoints)',
          'Technology stack finalization',
          'Docker containerization',
          'UI/UX design'
        ]
      },
      {
        id: 'database',
        title: 'Database & Payment Integration',
        duration: '1 weeks',
        technologies: ['PostgreSQL', 'Prisma', 'Stripe', 'AWS S3', 'Linux'],
        decisions: [
          {
            decision: 'AWS S3 for file storage',
            reasoning: 'Scalable and reliable file storage for event images'
          },
          {
            decision: 'Shadow database for Stripe integration',
            reasoning: 'Better performance and scalability'
          },
          {
            decision: 'Redis for authentication sessions',
            reasoning: 'Fast and reliable authentication sessions'
          }
        ],
        achievements: [
          'Complex database relationships optimization',
          'Stripe payment integration for ticket purchases',
          'File upload system with AWS S3',
          'Database indexing for performance',
          'Payment webhook handling'
        ]
      },
      {
        id: 'backend',
        title: 'NestJS API Development',
        duration: '3 weeks',
        technologies: ['Nest.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'JWT', 'Swagger', 'React Mail', 'Zod'],
        decisions: [
          {
            decision: 'React Mail for email notifications',
            reasoning: 'Simple email notifications with excellent developer experience'
          },
          {
            decision: 'Position sensitive search for event discovery',
            reasoning: 'Better event discovery with location-based search'
          },
          {
            decision: 'Stripe marketplace for event creation',
            reasoning: 'Periodic payment for event creators'
          }
        ],
        achievements: [
          '40+ RESTful API endpoints',
          'JWT-based authentication system',
          'Role-based authorization (User, Company, Admin)',
          'Comprehensive Swagger documentation',
          'Data validation with Zod schemas',
          'Error handling middleware'
        ]
      },
      {
        id: 'frontend',
        title: 'React Frontend Development',
        duration: '3 weeks',
        technologies: [
          'React',
          'TypeScript',
          'Tailwind CSS',
          'Vite',
          'Zustand',
          'React Query',
          'ShadCN',
          'React Hook Form'
        ],
        decisions: [
          {
            decision: 'Landing page with animated background and interactive elements',
            reasoning: 'Better user engagement and brand awareness'
          },
          {
            decision: 'Event discovery page with filtering and sorting',
            reasoning: 'Better user experience and event discovery'
          },
          {
            decision: 'Theme and color scheme',
            reasoning: 'Customizable and consistent design system'
          }
        ],
        achievements: [
          'Modern React application with hooks',
          'Responsive design system with Tailwind CSS',
          'Advanced event discovery with filtering',
          'User profile management',
          'Company profile pages with following system',
          'Event creation and management system'
        ]
      },
      {
        id: 'deployment',
        title: 'Testing & Deployment',
        duration: '1 day',
        technologies: ['Docker', 'AWS', 'Linux', 'CI/CD Pipeline', 'Nginx', 'PM2', 'Vercel', 'Oracle Cloud', 'SSH'],
        decisions: [
          {
            decision: 'Oracle Cloud for production deployment',
            reasoning: 'Scalable and reliable cloud platform'
          },
          {
            decision: 'Nginx for reverse proxy',
            reasoning: 'Scalable and reliable reverse proxy for both services'
          },
          {
            decision: 'PM2 for process management',
            reasoning: 'Scalable and reliable process management for both services'
          }
        ],
        achievements: [
          'Performance optimization',
          'Security audit and fixes',
          'Logs and monitoring',
          'Automated deployment pipeline',
          'SSH for remote access'
        ]
      }
    ]
  },

  gallery: [
    {
      title: 'UEvent (light)',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/uevent-light.png'
    },
    {
      title: 'Introduction',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/introduction.png'
    },
    {
      title: 'Authentication',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/auth.png'
    },
    {
      title: '404 Page',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/404.png'
    },
    {
      title: 'Event Page',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/event.png'
    },
    {
      title: 'User Profile',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/profile.png'
    },
    {
      title: 'Company Page',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/company.png'
    },
    {
      title: 'Database Schema',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/db-schema.png'
    },
    {
      title: 'Company News',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/company-news.png'
    },
    {
      title: 'Deployment Diagram',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/deployment-diagram.png'
    },
    {
      title: 'Interactive Map',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/map.png'
    },
    {
      title: 'Use Case Diagram',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/use-case-diagram.png'
    }
  ],

  stats: {
    linesOfCode: '22.5k',
    commits: '387',
    features: '35+',
    technologies: '29+'
  }
};
