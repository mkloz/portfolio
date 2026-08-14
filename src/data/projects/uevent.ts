import { Bell, Building, CreditCard, MapPin, Search, Smartphone } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const ueventProject: Project = {
  // Basic info
  title: 'UEvent',
  slug: 'uevent',
  description: 'Event platform with ticket management, Stripe payments, location search, and real-time notifications.',
  image: {
    dark: '/project-media/uevent/uevent-dark.webp',
    light: '/project-media/uevent/uevent-light.webp'
  },

  highlights: [
    {
      title: 'Secure Payment Processing',
      description: 'Stripe ticket purchases with webhook handling and payment verification',
      icon: CreditCard,
      stats: '100% secure'
    },
    {
      title: 'Real-time Notifications',
      description: 'Built live notification system using Redis and WebSockets for instant event updates',
      icon: Bell,
      stats: '< 100ms'
    },
    {
      title: 'Interactive Maps',
      description: 'Google Maps integration for location-based event discovery and venue visualization',
      icon: MapPin,
      stats: 'GPS accurate'
    },
    {
      title: 'Company Profiles',
      description: 'Professional event organizer profiles with follower system and event management',
      icon: Building,
      stats: '500+ orgs'
    },
    {
      title: 'Advanced Search',
      description: 'Event filters for location, category, date, and price range',
      icon: Search,
      stats: '10+ filters'
    },
    {
      title: 'Mobile Optimized',
      description: 'Fully responsive design optimized for mobile event discovery and ticket purchasing',
      icon: Smartphone,
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
  year: 2025,
  progress: 100,

  // Detailed info
  tagline: 'Connect Through Events',
  longDescription:
    'UEvent lets people discover, create, and manage events. It combines Stripe payments, real-time notifications, interactive maps, tickets, and social features in one application.',
  status: 'Completed',
  category: 'Full-Stack',
  duration: '2 months',

  // Technical details
  detailedTechnologies: [
    technologies.typescript,
    technologies.docker,
    technologies.react,
    technologies.postgresql,
    technologies.aws,
    technologies.zustand,
    technologies.nestjs,
    technologies.vite,
    technologies.prisma,
    technologies.redis,
    technologies.tailwind,
    technologies.eslint,
    technologies.nodejs,
    technologies.jwt,
    technologies.swagger,
    technologies.reactquery,
    technologies.reacthookform,
    technologies.shadcn,
    technologies.zod,
    technologies.prettier,
    {
      name: 'KY',
      category: 'Frontend'
    },
    technologies.vercel,
    technologies.nginx,
    technologies.git
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
            reasoning: 'Card payments, webhooks, and payment verification'
          }
        ],
        achievements: [
          'System architecture design',
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
        duration: '1 week',
        technologies: ['PostgreSQL', 'Prisma', 'Stripe', 'AWS S3', 'Linux'],
        decisions: [
          {
            decision: 'AWS S3 for file storage',
            reasoning: 'File storage for event images'
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
          'Swagger API documentation',
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
          'React application built with hooks',
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
            reasoning: 'Cloud hosting for the production application'
          },
          {
            decision: 'Nginx for reverse proxy',
            reasoning: 'Reverse proxy for both services'
          },
          {
            decision: 'PM2 for process management',
            reasoning: 'Process management for both services'
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
      image: '/project-media/uevent/uevent-light.webp'
    },
    {
      title: 'Introduction',
      image: '/project-media/uevent/introduction.webp'
    },
    {
      title: 'Authentication',
      image: '/project-media/uevent/auth.webp'
    },
    {
      title: '404 Page',
      image: '/project-media/uevent/404.webp'
    },
    {
      title: 'Event Page',
      image: '/project-media/uevent/event.webp'
    },
    {
      title: 'User Profile',
      image: '/project-media/uevent/profile.webp'
    },
    {
      title: 'Company Page',
      image: '/project-media/uevent/company.webp'
    },
    {
      title: 'Database Schema',
      image: '/project-media/uevent/db-schema.webp'
    },
    {
      title: 'Company News',
      image: '/project-media/uevent/company-news.webp'
    },
    {
      title: 'Deployment Diagram',
      image: '/project-media/uevent/deployment-diagram.webp'
    },
    {
      title: 'Interactive Map',
      image: '/project-media/uevent/map.webp'
    },
    {
      title: 'Use Case Diagram',
      image: '/project-media/uevent/use-case-diagram.webp'
    }
  ],

  stats: {
    linesOfCode: '29.1k',
    commits: '100+',
    features: '35+',
    technologies: '28+'
  },
  demo: [
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/uevent-desktop-demo.mp4',
      device: 'desktop',
      length: '4:26',
      preview: '/project-media/uevent/demo-desktop-preview.webp'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/uevent-mobile-demo.mp4',
      device: 'mobile',
      length: '3:01',
      preview: '/project-media/uevent/demo-mobile-preview.webp'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/uevent/uevent-tablet-demo.mp4',
      device: 'tablet',
      length: '3:52',
      preview: '/project-media/uevent/demo-tablet-preview.webp'
    }
  ]
};
