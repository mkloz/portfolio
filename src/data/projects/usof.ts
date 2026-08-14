import { Edit, FileText, LayoutDashboard, MessageSquare, ThumbsUp, UserCircle } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const usofProject: Project = {
  // Basic info
  title: 'Usof',
  slug: 'usof',
  description: 'A Reddit-like full-stack application with posts, comments, voting, and user authentication.',
  image: {
    dark: '/project-media/usof/usof-dark.webp',
    light: '/project-media/usof/usof-light.webp'
  },

  highlights: [
    {
      title: 'Social Platform',
      description: 'Complete Reddit-like social media platform with posts, comments, and voting system',
      icon: MessageSquare,
      stats: 'Social ready'
    },
    {
      title: 'Voting System',
      description: 'Real-time upvote/downvote functionality with karma tracking and post ranking',
      icon: ThumbsUp,
      stats: 'Real-time'
    },
    {
      title: 'Content Creation',
      description: 'Rich text editor for posts with markdown support',
      icon: Edit,
      stats: 'Rich editor'
    },
    {
      title: 'User Profiles',
      description: 'User profiles with activity history, karma, and account settings',
      icon: UserCircle,
      stats: 'Full profiles'
    },
    {
      title: 'Clean UI/UX',
      description: 'Responsive interface for desktop and mobile',
      icon: LayoutDashboard,
      stats: 'Clean UI/UX'
    },
    {
      title: 'API Documentation',
      description: 'Swagger API documentation with interactive request testing',
      icon: FileText,
      stats: '25+ endpoints'
    }
  ],

  technologies: [
    // Core Technologies (Most Important)
    'React',
    'Node.js',
    'Express',
    'MySQL',
    'TypeScript',
    'Prisma',
    'AWS S3',
    'Docker',
    // Frontend Technologies
    'Tailwind CSS',
    'Vite',
    'Zustand',
    'React Query',
    'React Hook Form',
    'React Router',
    'ShadCN',
    // Backend Technologies
    'Swagger',
    'JWT',
    // Development & Testing
    'ESLint',
    'Prettier',
    'Zod',
    'Axios',
    'Day.js',
    'JavaScript',
    'Nodemon',
    'Azure'
  ],
  liveDemo: 'https://usof.mkloz.com',
  github: [
    { name: 'Frontend', link: 'https://github.com/mkloz/usof-frontend' },
    { name: 'Backend', link: 'https://github.com/mkloz/usof-backend' }
  ],
  website: 'https://usof.mkloz.com',
  featured: false,
  year: 2024,
  progress: 100,

  // Detailed info
  tagline: 'Posts, comments, and community voting',
  longDescription:
    'USOF is a Reddit-style social platform for sharing content and building communities. Users can create posts, comment, and vote while tracking their karma and influence. The platform offers real-time updates and image sharing for a complete social experience.',
  status: 'Completed',
  category: 'Full-Stack',
  duration: '2.5 months',

  // Technical details
  detailedTechnologies: [
    technologies.typescript,
    technologies.docker,
    technologies.react,
    technologies.mysql,
    technologies.aws,
    technologies.zustand,
    technologies.express,
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
    technologies.reactrouter,
    technologies.shadcn,
    technologies.zod,
    technologies.prettier,
    technologies.axios,
    technologies.azure,
    technologies.git
  ],

  developmentJourney: {
    steps: [
      {
        id: 'planning',
        title: 'Planning & Architecture',
        duration: '1 week',
        technologies: ['System Design', 'Database Design', 'API Planning', 'UI/UX Design', 'Field Research'],
        decisions: [
          {
            decision: 'Monorepo vs Separate Repositories',
            reasoning: 'Chose separate repositories for better deployment flexibility and team collaboration'
          },
          {
            decision: 'UI/UX Design',
            reasoning: 'Responsive layouts for desktop and mobile'
          }
        ],
        achievements: [
          'Complete system architecture design',
          'Database schema planning with relationships',
          'API endpoint specification',
          'User flow and wireframe creation'
        ]
      },
      {
        id: 'database',
        title: 'Database Design',
        duration: '1 week',
        technologies: ['MySQL', 'Prisma', 'Database Migrations', 'Triggers', 'Stored Procedures'],
        decisions: [
          {
            decision: 'Normalized database design',
            reasoning: 'Ensure data integrity and efficient queries for social media features'
          },
          {
            decision: 'Triggers for real-time updates',
            reasoning: 'Real-time updates for posts, comments, and votes'
          },
          {
            decision: 'Stored Procedures for complex queries',
            reasoning: 'Complex queries for feed algorithms'
          }
        ],
        achievements: [
          'Optimized database schema with proper indexing',
          'User, Post, Comment, Vote relationship modeling',
          'Category and tag system implementation',
          'Database seeding scripts for development',
          'Query optimization for feed algorithms',
          'Infinite scroll for posts and comments'
        ]
      },
      {
        id: 'backend',
        title: 'Backend Development',
        duration: '4 weeks',
        technologies: [
          'Node.js',
          'Express',
          'Prisma',
          'MySQL',
          'JWT',
          'Swagger',
          'OpenAPI',
          'Nodemon',
          'Prettier',
          'Zod',
          'Axios',
          'MySQL'
        ],
        decisions: [
          {
            decision: 'Prisma for database ORM',
            reasoning: 'Better TypeScript integration and more intuitive query builder'
          },
          {
            decision: 'Nodemailer for email notifications',
            reasoning: 'Simple email notifications with excellent developer experience'
          },
          {
            decision: 'OpenAPI for documentation',
            reasoning: 'Interactive API documentation for better developer experience'
          }
        ],
        achievements: [
          'RESTful API with 25+ endpoints',
          'JWT-based authentication system',
          'Input validation with Zod',
          'File upload integration with AWS S3',
          'Error handling middleware',
          'API rate limiting and security measures'
        ]
      },
      {
        id: 'frontend',
        title: 'React Frontend Development',
        duration: '5 weeks',
        technologies: [
          'React',
          'TypeScript',
          'Tailwind CSS',
          'React Query',
          'Zustand',
          'Vite',
          'ShadCN',
          'Zod',
          'React Hook Form',
          'React Router',
          'Axios'
        ],
        decisions: [
          {
            decision: 'React Query for server state',
            reasoning: 'Excellent caching and synchronization for social media data'
          },
          {
            decision: 'Zustand for client state',
            reasoning: 'Lightweight and simple state management for UI state'
          },
          {
            decision: 'ShadCN UI components',
            reasoning: 'Consistent design system with accessibility built-in'
          }
        ],
        achievements: [
          'Responsive Reddit-like interface',
          'Infinite scroll for posts and comments',
          'Real-time voting and comment updates',
          'Advanced post editor with markdown support',
          'Search and filtering functionality',
          'Dark/light theme support'
        ]
      },
      {
        id: 'deployment',
        title: 'Deployment & DevOps',
        duration: '1 day',
        technologies: ['Docker', 'Azure', 'AWS S3', 'Linux', 'Nginx', 'PM2', 'SSH', 'Oracle Cloud'],
        decisions: [
          {
            decision: 'Oracle Cloud for production deployment',
            reasoning: 'Cloud hosting for the production application'
          },
          {
            decision: 'Nginx for reverse proxy',
            reasoning: 'Reverse proxy for both services'
          }
        ],
        achievements: [
          'Production database setup with backups',
          'SSL certificate configuration',
          'Environment-based configuration management',
          'Monitoring and logging setup'
        ]
      }
    ]
  },

  gallery: [
    {
      title: 'Main UI Overview',
      image: '/project-media/usof/usof-light.webp'
    },
    {
      title: 'Introduction to USOF',
      image: '/project-media/usof/introduction.webp'
    },
    {
      title: 'Article View',
      image: '/project-media/usof/article.webp'
    },
    {
      title: 'Posts Feed',
      image: '/project-media/usof/posts.webp'
    },
    {
      title: 'Categories',
      image: '/project-media/usof/categories.webp'
    },
    {
      title: 'Favorites',
      image: '/project-media/usof/favorites.webp'
    },
    {
      title: 'User Profile',
      image: '/project-media/usof/user.webp'
    },
    {
      title: 'Dark Mode',
      image: '/project-media/usof/dark-mode.webp'
    },
    {
      title: 'Database Schema',
      image: '/project-media/usof/db-schema.webp'
    },
    {
      title: 'Deployment Diagram',
      image: '/project-media/usof/deploy-diagram.webp'
    },
    {
      title: 'Use Case Diagram',
      image: '/project-media/usof/use-case-diagram.webp'
    },
    {
      title: 'OpenAPI Documentation',
      image: '/project-media/usof/open-api.webp'
    }
  ],

  stats: {
    linesOfCode: '15.6k',
    commits: '30+',
    features: '20+',
    technologies: '24+'
  },
  demo: [
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/usof-desktop.mp4',
      device: 'desktop',
      preview: '/project-media/usof/demo-desktop-preview.webp',
      length: '2:15'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/usof-mobile.mp4',
      device: 'mobile',
      preview: '/project-media/usof/demo-mobile-preview.webp',
      length: '1:27'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/usof-tablet.mp4',
      device: 'tablet',
      preview: '/project-media/usof/demo-tablet-preview.webp',
      length: '1:26'
    }
  ]
};
