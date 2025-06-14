import type { ButtonGradient } from '@/components/ui/button';

import type { Technology } from './technologies';
import { technologies } from './technologies';

export interface ArchitectureNode {
  title: string;
  technologies: string[];
  description: string;
  connections: string[];
}

export interface GalleryItem {
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface GitHubLink {
  name: string;
  link: string;
}

export interface Project {
  // Basic info (used in project cards)
  title: string;
  slug: string; // URL-friendly version of title
  description: string;
  image: string;
  technologies: string[];
  liveDemo: string;
  github: GitHubLink[];
  website: string;
  featured?: boolean;
  gradient: ButtonGradient;
  year: number;
  progress: number;

  // Detailed info (used in project detail page)
  tagline: string;
  longDescription: string;
  heroImage: string;
  status: string;
  category: string;
  duration: string;

  // Technical details
  detailedTechnologies: Technology[];
  architecture: Record<string, ArchitectureNode>;
  gallery: GalleryItem[];

  // Stats
  stats: {
    linesOfCode: string;
    commits: string;
    features: string;
    technologies: string;
  };
}

export const projects: Project[] = [
  {
    // Basic info
    title: 'Citywheels',
    slug: 'citywheels',
    description:
      'E-commerce online store built from scratch. Used a lot of technologies and all my knowledge to give the best user experience.',
    image: '/placeholder.svg?height=300&width=500',
    technologies: ['NextJS', 'NestJS', 'Prisma', 'Tailwind', 'Docker', 'AWS', 'TypeScript'],
    liveDemo: 'https://citywheels.mkloz.com',
    github: [
      { name: 'Main Repository', link: 'https://github.com/mkloz/citywheels' },
      { name: 'Frontend', link: 'https://github.com/mkloz/citywheels-frontend' },
      { name: 'Backend API', link: 'https://github.com/mkloz/citywheels-backend' }
    ],
    website: 'https://citywheels.mkloz.com',
    featured: true,
    gradient: 'blue',
    year: 2024,
    progress: 100,

    // Detailed info
    tagline: 'Modern E-commerce Experience',
    longDescription:
      'A full-stack e-commerce platform built with cutting-edge technologies, featuring real-time inventory management, secure payments, and an intuitive user experience. This project showcases modern web development practices with a focus on performance, security, and scalability.',
    heroImage: '/placeholder.svg?height=800&width=1400',
    status: 'Completed',
    category: 'Full-Stack Development',
    duration: '6 months',

    // Technical details
    detailedTechnologies: [
      technologies.nextjs,
      technologies.react,
      technologies.typescript,
      technologies.tailwind,
      technologies.nodejs,
      technologies.nestjs,
      technologies.prisma,
      technologies.postgresql,
      technologies.redis,
      technologies.docker,
      technologies.aws,
      technologies.stripe
    ],

    architecture: {
      frontend: {
        title: 'Frontend Layer',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
        description: 'Server-side rendered React application with optimized performance',
        connections: ['backend']
      },
      backend: {
        title: 'Backend Services',
        technologies: ['Node.js', 'NestJS', 'Prisma', 'JWT'],
        description: 'RESTful API with authentication and business logic',
        connections: ['database', 'payment', 'storage']
      },
      database: {
        title: 'Database Layer',
        technologies: ['PostgreSQL', 'Redis'],
        description: 'Relational database with caching layer',
        connections: []
      },
      payment: {
        title: 'Payment Gateway',
        technologies: ['Stripe', 'Webhooks'],
        description: 'Secure payment processing with real-time updates',
        connections: []
      },
      storage: {
        title: 'File Storage',
        technologies: ['AWS S3', 'CloudFront'],
        description: 'Scalable file storage with CDN distribution',
        connections: []
      },
      infrastructure: {
        title: 'Infrastructure',
        technologies: ['Docker', 'AWS ECS', 'Load Balancer'],
        description: 'Containerized deployment with auto-scaling',
        connections: ['backend', 'frontend']
      }
    },

    gallery: [
      {
        title: 'Homepage Hero',
        description: 'Modern landing page with dynamic product showcases and smooth animations',
        image: '/placeholder.svg?height=600&width=900',
        category: 'UI Design'
      },
      {
        title: 'Product Catalog',
        description: 'Advanced filtering system with real-time search and infinite scroll',
        image: '/placeholder.svg?height=600&width=900',
        category: 'User Experience'
      },
      {
        title: 'Product Details',
        description: 'Comprehensive product view with image gallery and specifications',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Product Pages'
      },
      {
        title: 'Shopping Cart',
        description: 'Intuitive cart management with quantity updates and price calculations',
        image: '/placeholder.svg?height=600&width=900',
        category: 'E-commerce'
      },
      {
        title: 'Checkout Flow',
        description: 'Streamlined multi-step checkout with progress indicators',
        image: '/placeholder.svg?height=600&width=900',
        category: 'E-commerce'
      },
      {
        title: 'User Dashboard',
        description: 'Personal account management with order history and preferences',
        image: '/placeholder.svg?height=600&width=900',
        category: 'User Experience'
      },
      {
        title: 'Admin Panel',
        description: 'Comprehensive management interface with analytics and controls',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Admin'
      },
      {
        title: 'Mobile Experience',
        description: 'Fully responsive design optimized for mobile shopping',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Mobile'
      }
    ],

    stats: {
      linesOfCode: '12.5k',
      commits: '247',
      features: '15+',
      technologies: '8+'
    }
  },

  {
    // Basic info
    title: 'ToDo Application',
    slug: 'todo-application',
    description: 'Highly responsive and adaptive React SPA - to-do application with modern state management.',
    image: '/placeholder.svg?height=300&width=500',
    technologies: ['ReactJS', 'CSS Modules', 'ReactQuery', 'Zustand', 'TypeScript'],
    liveDemo: 'https://todo.mkloz.com',
    github: [{ name: 'Source Code', link: 'https://github.com/mkloz/todo' }],
    website: 'https://todo.mkloz.com',
    featured: true,
    gradient: 'purple',
    year: 2024,
    progress: 100,

    // Detailed info
    tagline: 'Smart Task Management',
    longDescription:
      'A modern, responsive single-page application for task management built with React and TypeScript. Features advanced state management, real-time updates, and an intuitive user interface designed for productivity.',
    heroImage: '/placeholder.svg?height=800&width=1400',
    status: 'Completed',
    category: 'Frontend Development',
    duration: '3 months',

    // Technical details
    detailedTechnologies: [technologies.react, technologies.typescript, technologies.tailwind, technologies.vercel],

    architecture: {
      frontend: {
        title: 'Frontend Application',
        technologies: ['React', 'TypeScript', 'Zustand', 'React Query'],
        description: 'Single-page application with modern state management',
        connections: ['storage']
      },
      storage: {
        title: 'Local Storage',
        technologies: ['Browser Storage', 'IndexedDB'],
        description: 'Client-side data persistence',
        connections: []
      },
      infrastructure: {
        title: 'Deployment',
        technologies: ['Vercel', 'CDN'],
        description: 'Static site deployment with global CDN',
        connections: ['frontend']
      }
    },

    gallery: [
      {
        title: 'Task Dashboard',
        description: 'Clean and intuitive task management interface',
        image: '/placeholder.svg?height=600&width=900',
        category: 'UI Design'
      },
      {
        title: 'Task Creation',
        description: 'Simple and efficient task creation flow',
        image: '/placeholder.svg?height=600&width=900',
        category: 'User Experience'
      },
      {
        title: 'Task Filtering',
        description: 'Advanced filtering and sorting capabilities',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Features'
      },
      {
        title: 'Mobile View',
        description: 'Responsive design optimized for mobile devices',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Mobile'
      }
    ],

    stats: {
      linesOfCode: '5.2k',
      commits: '89',
      features: '8+',
      technologies: '5+'
    }
  },

  {
    // Basic info
    title: 'Portfolio Website',
    slug: 'portfolio-website',
    description: 'Modern portfolio website showcasing my work with stunning animations and responsive design.',
    image: '/placeholder.svg?height=300&width=500',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'Vercel'],
    liveDemo: 'https://portfolio.mkloz.com',
    github: [{ name: 'Portfolio Source', link: 'https://github.com/mkloz/portfolio' }],
    website: 'https://portfolio.mkloz.com',
    featured: true,
    gradient: 'green',
    year: 2024,
    progress: 100,

    // Detailed info
    tagline: 'Personal Brand Showcase',
    longDescription:
      'A modern, animated portfolio website built with Next.js and Tailwind CSS. Features smooth animations, responsive design, and optimized performance to showcase projects and skills effectively.',
    heroImage: '/placeholder.svg?height=800&width=1400',
    status: 'Completed',
    category: 'Frontend Development',
    duration: '2 months',

    // Technical details
    detailedTechnologies: [
      technologies.nextjs,
      technologies.react,
      technologies.typescript,
      technologies.tailwind,
      technologies.vercel
    ],

    architecture: {
      frontend: {
        title: 'Static Site',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
        description: 'Static site generation with modern animations',
        connections: ['deployment']
      },
      deployment: {
        title: 'Vercel Deployment',
        technologies: ['Vercel', 'CDN', 'Edge Functions'],
        description: 'Global deployment with edge optimization',
        connections: []
      }
    },

    gallery: [
      {
        title: 'Hero Section',
        description: 'Animated hero section with dynamic background',
        image: '/placeholder.svg?height=600&width=900',
        category: 'UI Design'
      },
      {
        title: 'Projects Gallery',
        description: 'Interactive project showcase with hover effects',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Portfolio'
      },
      {
        title: 'About Section',
        description: 'Personal information with timeline and skills',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Content'
      },
      {
        title: 'Contact Form',
        description: 'Interactive contact form with validation',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Features'
      }
    ],

    stats: {
      linesOfCode: '8.1k',
      commits: '156',
      features: '12+',
      technologies: '6+'
    }
  },

  {
    // Basic info
    title: 'Swapi - Star Wars API',
    slug: 'swapi-star-wars-api',
    description: 'Star Wars API created to practice NestJS skills with comprehensive data management.',
    image: '/placeholder.svg?height=300&width=500',
    technologies: ['NestJS', 'TypeORM', 'MySQL', 'AWS', 'S3', 'Docker', 'TypeScript'],
    liveDemo: 'https://swapi.mkloz.com',
    github: [{ name: 'API Source', link: 'https://github.com/mkloz/swapi' }],
    website: 'https://swapi.mkloz.com',
    gradient: 'pink',
    year: 2024,
    progress: 100,

    // Detailed info
    tagline: 'RESTful API for Star Wars Data',
    longDescription:
      'A comprehensive RESTful API built with NestJS that provides access to Star Wars universe data. Features include data seeding, file uploads, caching, and comprehensive API documentation.',
    heroImage: '/placeholder.svg?height=800&width=1400',
    status: 'Completed',
    category: 'Backend Development',
    duration: '4 months',

    // Technical details
    detailedTechnologies: [
      technologies.nestjs,
      technologies.nodejs,
      technologies.typescript,
      technologies.typeorm,
      technologies.mysql,
      technologies.aws,
      technologies.docker
    ],

    architecture: {
      backend: {
        title: 'NestJS API',
        technologies: ['NestJS', 'TypeScript', 'TypeORM'],
        description: 'RESTful API with comprehensive endpoints',
        connections: ['database', 'storage']
      },
      database: {
        title: 'MySQL Database',
        technologies: ['MySQL', 'TypeORM'],
        description: 'Relational database with Star Wars data',
        connections: []
      },
      storage: {
        title: 'File Storage',
        technologies: ['AWS S3'],
        description: 'Cloud storage for images and assets',
        connections: []
      },
      infrastructure: {
        title: 'Docker Deployment',
        technologies: ['Docker', 'AWS'],
        description: 'Containerized deployment on AWS',
        connections: ['backend']
      }
    },

    gallery: [
      {
        title: 'API Documentation',
        description: 'Comprehensive Swagger documentation',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Documentation'
      },
      {
        title: 'Data Models',
        description: 'Well-structured data models and relationships',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Backend'
      },
      {
        title: 'Endpoint Testing',
        description: 'Interactive API testing interface',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Testing'
      }
    ],

    stats: {
      linesOfCode: '7.8k',
      commits: '134',
      features: '20+',
      technologies: '7+'
    }
  },

  {
    // Basic info
    title: 'Bulletproof Express',
    slug: 'bulletproof-express',
    description:
      'Express.js template implementing best practices of backend development with comprehensive architecture.',
    image: '/placeholder.svg?height=300&width=500',
    technologies: ['ExpressJS', 'Prisma', 'OpenAPI', 'JWT', 'TypeScript'],
    liveDemo: 'https://express.mkloz.com',
    github: [{ name: 'Express Template', link: 'https://github.com/mkloz/bulletproof-express' }],
    website: 'https://express.mkloz.com',
    gradient: 'yellow',
    year: 2024,
    progress: 100,

    // Detailed info
    tagline: 'Production-Ready Express Template',
    longDescription:
      'A robust Express.js template following industry best practices for backend development. Includes authentication, validation, error handling, logging, and comprehensive API documentation.',
    heroImage: '/placeholder.svg?height=800&width=1400',
    status: 'Completed',
    category: 'Backend Development',
    duration: '3 months',

    // Technical details
    detailedTechnologies: [
      technologies.express,
      technologies.nodejs,
      technologies.typescript,
      technologies.prisma,
      technologies.postgresql,
      technologies.jest
    ],

    architecture: {
      backend: {
        title: 'Express API',
        technologies: ['Express.js', 'TypeScript', 'JWT'],
        description: 'RESTful API with authentication and validation',
        connections: ['database']
      },
      database: {
        title: 'Database Layer',
        technologies: ['Prisma', 'PostgreSQL'],
        description: 'Type-safe database access with Prisma',
        connections: []
      }
    },

    gallery: [
      {
        title: 'Project Structure',
        description: 'Well-organized project architecture',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Architecture'
      },
      {
        title: 'API Documentation',
        description: 'OpenAPI specification with Swagger UI',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Documentation'
      },
      {
        title: 'Testing Suite',
        description: 'Comprehensive test coverage with Jest',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Testing'
      }
    ],

    stats: {
      linesOfCode: '4.5k',
      commits: '78',
      features: '10+',
      technologies: '6+'
    }
  },

  {
    // Basic info
    title: 'Online Store Platform',
    slug: 'online-store-platform',
    description:
      'A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.',
    image: '/placeholder.svg?height=300&width=500',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveDemo: 'https://online-store.mkloz.com',
    github: [
      { name: 'Full Stack Code', link: 'https://github.com/mkloz/online-store' },
      { name: 'React Frontend', link: 'https://github.com/mkloz/online-store-frontend' },
      { name: 'Node.js Backend', link: 'https://github.com/mkloz/online-store-backend' }
    ],
    website: 'https://online-store.mkloz.com',
    gradient: 'violet',
    year: 2024,
    progress: 100,

    // Detailed info
    tagline: 'Complete E-commerce Solution',
    longDescription:
      'A comprehensive e-commerce platform featuring product management, order processing, payment integration, and administrative tools. Built with modern technologies for scalability and performance.',
    heroImage: '/placeholder.svg?height=800&width=1400',
    status: 'Completed',
    category: 'Full-Stack Development',
    duration: '5 months',

    // Technical details
    detailedTechnologies: [
      technologies.react,
      technologies.nodejs,
      technologies.express,
      technologies.mongodb,
      technologies.stripe,
      technologies.tailwind
    ],

    architecture: {
      frontend: {
        title: 'React Frontend',
        technologies: ['React', 'Tailwind CSS'],
        description: 'Modern React application with responsive design',
        connections: ['backend']
      },
      backend: {
        title: 'Node.js API',
        technologies: ['Node.js', 'Express'],
        description: 'RESTful API with business logic',
        connections: ['database', 'payment']
      },
      database: {
        title: 'MongoDB',
        technologies: ['MongoDB', 'Mongoose'],
        description: 'NoSQL database for flexible data storage',
        connections: []
      },
      payment: {
        title: 'Payment Processing',
        technologies: ['Stripe API'],
        description: 'Secure payment processing',
        connections: []
      }
    },

    gallery: [
      {
        title: 'Product Catalog',
        description: 'Comprehensive product browsing experience',
        image: '/placeholder.svg?height=600&width=900',
        category: 'E-commerce'
      },
      {
        title: 'Admin Dashboard',
        description: 'Administrative interface for store management',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Admin'
      },
      {
        title: 'Order Management',
        description: 'Order tracking and management system',
        image: '/placeholder.svg?height=600&width=900',
        category: 'Features'
      }
    ],

    stats: {
      linesOfCode: '15.2k',
      commits: '298',
      features: '25+',
      technologies: '8+'
    }
  }
];
