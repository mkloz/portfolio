import { Edit, FileText, LayoutDashboard, MessageSquare, ThumbsUp, UserCircle } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const usofProject: Project = {
  // Basic info
  title: 'Usof',
  slug: 'usof',
  description:
    'A modern Reddit-like application with full-stack implementation featuring posts, comments, voting, and user authentication.',
  image: {
    dark: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/usof-dark.png',
    light: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/usof-light.png'
  },

  highlights: [
    {
      title: 'Social Platform',
      description: 'Complete Reddit-like social media platform with posts, comments, and voting system',
      icon: MessageSquare,
      color: 'from-blue-400 to-cyan-500',
      stats: 'Social ready'
    },
    {
      title: 'Voting System',
      description: 'Real-time upvote/downvote functionality with karma tracking and post ranking',
      icon: ThumbsUp,
      color: 'from-green-400 to-emerald-500',
      stats: 'Real-time'
    },
    {
      title: 'Content Creation',
      description: 'Rich text editor for posts with markdown support',
      icon: Edit,
      color: 'from-purple-400 to-indigo-500',
      stats: 'Rich editor'
    },
    {
      title: 'User Profiles',
      description: 'Comprehensive user profiles with activity history, karma, and customizable settings',
      icon: UserCircle,
      color: 'from-orange-400 to-red-500',
      stats: 'Full profiles'
    },
    {
      title: 'Clean UI/UX',
      description: 'Clean and modern UI/UX design with responsive design',
      icon: LayoutDashboard,
      color: 'from-pink-400 to-purple-500',
      stats: 'Clean UI/UX'
    },
    {
      title: 'API Documentation',
      description: 'Comprehensive Swagger API documentation with interactive testing capabilities',
      icon: FileText,
      color: 'from-teal-400 to-blue-500',
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
  gradient: 'pink',
  year: 2024,
  progress: 100,

  // Detailed info
  tagline: 'Modern Social Media Platform',
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
            reasoning: 'Clean and modern UI/UX design with responsive design'
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
          'Comprehensive input validation with Zod',
          'File upload integration with AWS S3',
          'Comprehensive error handling middleware',
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
            reasoning: 'Scalable and reliable cloud platform'
          },
          {
            decision: 'Nginx for reverse proxy',
            reasoning: 'Scalable and reliable reverse proxy for both services'
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
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/usof-light.png'
    },
    {
      title: 'Introduction to USOF',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/introduction.png'
    },
    {
      title: 'Article View',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/article.png'
    },
    {
      title: 'Posts Feed',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/posts.png'
    },
    {
      title: 'Categories',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/categories.png'
    },
    {
      title: 'Favorites',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/favorites.png'
    },
    {
      title: 'User Profile',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/user.png'
    },
    {
      title: 'Dark Mode',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/dark-mode.png'
    },
    {
      title: 'Database Schema',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/db-schema.png'
    },
    {
      title: 'Deployment Diagram',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/deploy-diagram.png'
    },
    {
      title: 'Use Case Diagram',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/use-case-diagram.png'
    },
    {
      title: 'OpenAPI Documentation',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/open-api.png'
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
      preview: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/demo-desktop-preview.png',
      length: '2:15'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/usof-mobile.mp4',
      device: 'mobile',
      preview: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/demo-mobile-preview.png',
      length: '1:27'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/usof-tablet.mp4',
      device: 'tablet',
      preview: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/usof/demo-tablet-preview.png',
      length: '1:26'
    }
  ]
};
