import { Package, ShoppingCart, TrendingUp, User } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const citywheelsProject: Project = {
  // Basic info
  title: 'Citywheels',
  slug: 'citywheels',
  description:
    'E-commerce online store built from scratch. Used a lot of technologies and all my knowledge to give the best user experience.',
  image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/hero.png',
  highlights: [
    {
      title: 'E-commerce Platform',
      description: 'Complete online store with product catalog, shopping cart, and order management',
      icon: ShoppingCart,
      color: 'from-blue-400 to-cyan-500',
      stats: 'Full featured'
    },
    {
      title: 'Inventory System',
      description: 'Real-time inventory tracking with low stock alerts and automated reordering',
      icon: Package,
      color: 'from-orange-400 to-red-500',
      stats: 'Auto alerts'
    },
    {
      title: 'SEO Optimized',
      description: 'Next.js SSR implementation for optimal search engine visibility and performance',
      icon: TrendingUp,
      color: 'from-yellow-400 to-orange-500',
      stats: '95+ score'
    },
    {
      title: 'User Accounts',
      description: 'Customer accounts with order history, wishlist, and personalized recommendations',
      icon: User,
      color: 'from-pink-400 to-purple-500',
      stats: 'Personalized'
    }
  ],

  technologies: [
    // Core Technologies (Most Important)
    'Next.js',
    'React',
    'NestJS',
    'MySQL',
    'TypeScript',
    'Prisma',
    'Stripe',
    'Docker',
    'Tailwind CSS',
    'AWS',
    // Supporting Technologies
    'Node.js',
    'GitHub Actions',
    'React Query',
    'Zustand',
    'ShadCN',
    'Zod',
    'Jest',
    'ESLint',
    'Prettier',
    'JavaScript',
    'Axios',
    'Vercel',
    'Oracle Cloud'
  ],
  liveDemo: 'https://citywheels.mkloz.com',
  github: [
    { name: 'Frontend', link: 'https://github.com/mkloz/citywheels-frontend' },
    { name: 'Backend API', link: 'https://github.com/mkloz/citywheels-backend' }
  ],
  website: 'https://citywheels.mkloz.com',
  featured: false,
  gradient: 'violet',
  year: 2023,
  progress: 100,

  // Detailed info
  tagline: 'Modern E-commerce Experience for Wheels & Vehicles',
  longDescription:
    'Citywheels is a modern e-commerce platform for wheels—bicycles, skateboards, scooters, and more. Built with the latest web technologies, it delivers a seamless user experience with responsive design, secure payments, and efficient inventory management.',
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
    technologies.nextjs,
    technologies.vite,
    technologies.prisma,
    technologies.nestjs,
    technologies.tailwind,
    technologies.eslint,
    technologies.zod,
    technologies.axios,
    technologies.jest,
    technologies.nodejs,
    technologies.javascript,
    technologies.prettier
  ],

  developmentJourney: {
    steps: [
      {
        id: 'design',
        title: 'Design',
        duration: '2 weeks',
        technologies: ['Figma'],
        decisions: [
          {
            decision: 'Figma for design',
            reasoning: 'Figma is a powerful design tool that allows for easy collaboration and prototyping'
          },
          {
            decision: 'SQL database',
            reasoning: 'SQL is a mature database technology that is well-understood and has a large community'
          },
          {
            decision: 'Basic database structure',
            reasoning: 'Implementing a basic database structure for the project'
          }
        ],
        achievements: [
          'Design system with consistent UI components',
          'Different pages for the website',
          'Multiple responsive designs for the website',
          'Consistent buttons variations',
          'Right colors for the website'
        ]
      },
      {
        id: 'backend',
        title: 'Backend Development',
        duration: '3 weeks',
        technologies: ['Node.js', 'NestJS', 'Prisma', 'MySQL', 'JWT', 'Jest', 'TypeScript'],
        decisions: [
          {
            decision: 'TypeScript over JavaScript',
            reasoning: 'Better type safety and developer experience'
          },
          {
            decision: 'NestJS over Express.js',
            reasoning: 'Better structure for complex e-commerce logic and built-in TypeScript support'
          },
          {
            decision: 'MySQL over PostgreSQL',
            reasoning: 'Team familiarity and hosting infrastructure compatibility'
          }
        ],
        achievements: [
          'RESTful API with comprehensive endpoints',
          'JWT-based authentication system',
          'Role-based access control (RBAC)',
          'Comprehensive API documentation',
          'Unit and integration testing with Jest',
          'Database schema design and optimization'
        ]
      },
      {
        id: 'frontend',
        title: 'Frontend Setup',
        duration: '4 weeks',
        technologies: [
          'Next.js',
          'React',
          'TypeScript',
          'Tailwind CSS',
          'ShadCN',
          'Zod',
          'React Query',
          'Axios',
          'Zustand'
        ],
        decisions: [
          {
            decision: 'Next.js over Create React App',
            reasoning: 'Needed SSR for SEO optimization and better performance for e-commerce'
          },
          {
            decision: 'ShadCN UI over custom components',
            reasoning: 'Faster development with consistent, accessible design system'
          },
          {
            decision: 'Zod for form validation',
            reasoning: 'Type-safe validation with excellent TypeScript integration'
          }
        ],
        achievements: [
          'Responsive design system with Tailwind CSS',
          'Type-safe form handling with Zod validation',
          'Accessible UI components with ShadCN',
          'Optimized image handling with Next.js Image',
          'SEO-friendly routing and meta tags'
        ]
      },

      {
        id: 'deployment',
        title: 'Deployment & DevOps',
        duration: '1 week',
        technologies: ['Docker', 'GitHub Actions', 'AWS', 'Vercel'],
        decisions: [
          {
            decision: 'Docker containerization',
            reasoning: 'Consistent deployment across environments and easier scaling'
          },
          {
            decision: 'GitHub Actions for CI/CD',
            reasoning: 'Automated testing and deployment pipeline'
          },
          {
            decision: 'Vercel for frontend, AWS for backend',
            reasoning: 'Optimal performance and cost-effectiveness for each service'
          }
        ],
        achievements: [
          'Containerized application with Docker',
          'Automated CI/CD pipeline with GitHub Actions',
          'Production deployment on AWS and Vercel',
          'Environment-specific configurations',
          'Monitoring and logging setup',
          'Database backup and recovery procedures'
        ]
      }
    ]
  },

  gallery: [
    {
      title: 'Homepage Hero',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/hero.png'
    },
    {
      title: 'Authentication',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/auth.png'
    },
    {
      title: 'Shopping Cart',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/cart.png'
    },
    {
      title: 'Product Catalog',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/catalog.png'
    },
    {
      title: 'Categories',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/categories.png'
    },
    {
      title: 'Favorites',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/favorites.png'
    },
    {
      title: 'Order',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/order.png'
    },
    {
      title: 'Product Details',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/product.png'
    },
    {
      title: 'Sections',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/sections.png'
    },
    {
      title: 'Project Readme',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/readme.png'
    },
    {
      title: 'OpenAPI Documentation',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/open-api.png'
    },
    {
      title: 'Database Schema',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/db-schema.png'
    }
  ],

  stats: {
    linesOfCode: '18.4k',
    commits: '95',
    features: '30+',
    technologies: '18+'
  },
  demo: [
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/citywheels-desktop.mp4',
      device: 'desktop',
      length: '1:48'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/citywheels-tablet.mp4',
      device: 'tablet',
      length: '1:41',
      preview: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/demo-tablet-thumb.png'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/citywheels-mobile.mp4',
      device: 'mobile',
      length: '1:39',
      preview: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/citywheels/demo-mobile-thumb.png'
    }
  ]
};
