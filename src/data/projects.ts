import type { ButtonGradient } from '@/components/ui/button';

import type { Technology } from './technologies';
import { technologies } from './technologies';

export interface KeyDecision {
  decision: string;
  reasoning: string;
}

export interface DevelopmentStep {
  id: string;
  title: string;
  duration: string;
  technologies: string[];
  decisions: KeyDecision[];
  achievements: string[];
}

export interface DevelopmentJourney {
  steps: DevelopmentStep[];
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
  developmentJourney: DevelopmentJourney;
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

    developmentJourney: {
      steps: [
        {
          id: 'frontend',
          title: 'Frontend Development',
          duration: '2 weeks',
          technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
          decisions: [
            {
              decision: 'Next.js over Create React App',
              reasoning: 'Needed SSR for SEO and performance optimization'
            },
            {
              decision: 'Tailwind CSS over styled-components',
              reasoning: 'Faster development and better consistency'
            }
          ],
          achievements: [
            '98+ Lighthouse performance score',
            'Fully responsive design across all devices',
            'Advanced product filtering system',
            'Smooth shopping cart animations'
          ]
        },
        {
          id: 'backend',
          title: 'Backend API Development',
          duration: '3 weeks',
          technologies: ['NestJS', 'Prisma', 'JWT', 'Stripe API'],
          decisions: [
            {
              decision: 'NestJS over Express.js',
              reasoning: 'Better structure for complex business logic and built-in TypeScript support'
            },
            {
              decision: 'Prisma over TypeORM',
              reasoning: 'Better type safety and developer experience'
            }
          ],
          achievements: [
            'Secure payment processing with Stripe',
            'Real-time inventory management',
            'Comprehensive API documentation',
            'JWT-based authentication system'
          ]
        },
        {
          id: 'database',
          title: 'Database Design',
          duration: '1 week',
          technologies: ['PostgreSQL', 'Prisma', 'Redis'],
          decisions: [
            {
              decision: 'PostgreSQL over MongoDB',
              reasoning: 'ACID compliance needed for e-commerce transactions'
            },
            {
              decision: 'Redis for caching',
              reasoning: 'Improved performance for frequently accessed data'
            }
          ],
          achievements: [
            'Optimized database queries',
            'Data integrity and consistency',
            'Efficient caching strategy',
            'Scalable database architecture'
          ]
        },
        {
          id: 'deployment',
          title: 'Deployment & DevOps',
          duration: '1 week',
          technologies: ['Docker', 'AWS ECS', 'CloudFront', 'GitHub Actions'],
          decisions: [
            {
              decision: 'AWS over Vercel',
              reasoning: 'Needed full control over backend infrastructure and database'
            },
            {
              decision: 'Docker containerization',
              reasoning: 'Consistent deployment across environments'
            }
          ],
          achievements: [
            'Auto-scaling infrastructure setup',
            '99.9% uptime achievement',
            'Automated CI/CD pipeline',
            'Global CDN distribution'
          ]
        }
      ]
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

    developmentJourney: {
      steps: [
        {
          id: 'frontend',
          title: 'Frontend Development',
          duration: '3 weeks',
          technologies: ['React', 'TypeScript', 'Zustand', 'Tailwind CSS'],
          decisions: [
            {
              decision: 'Zustand over Redux',
              reasoning: 'Simpler state management for small to medium app'
            },
            {
              decision: 'Local storage over external database',
              reasoning: 'Offline-first approach for better user experience'
            }
          ],
          achievements: [
            'Offline functionality with local storage',
            'Smooth animations and transitions',
            'Advanced task filtering and sorting',
            'Responsive design for all devices'
          ]
        },
        {
          id: 'deployment',
          title: 'Static Deployment',
          duration: '2 days',
          technologies: ['Vercel', 'GitHub Actions'],
          decisions: [
            {
              decision: 'Vercel over Netlify',
              reasoning: 'Better integration with React and automatic deployments'
            }
          ],
          achievements: [
            'Automated deployments from GitHub',
            'Edge optimization for global performance',
            'Custom domain configuration',
            'Continuous integration setup'
          ]
        }
      ]
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

    developmentJourney: {
      steps: [
        {
          id: 'frontend',
          title: 'Frontend Development',
          duration: '6 weeks',
          technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
          decisions: [
            {
              decision: 'Next.js over Gatsby',
              reasoning: 'Better developer experience and more flexible routing'
            },
            {
              decision: 'Framer Motion for animations',
              reasoning: 'Powerful animation library with great React integration'
            }
          ],
          achievements: [
            'Stunning animated hero section',
            'Interactive project showcase',
            'Smooth page transitions',
            'Optimized performance metrics'
          ]
        },
        {
          id: 'deployment',
          title: 'Deployment & Optimization',
          duration: '1 week',
          technologies: ['Vercel', 'GitHub Actions', 'Lighthouse'],
          decisions: [
            {
              decision: 'Vercel for hosting',
              reasoning: 'Seamless Next.js integration and global CDN'
            }
          ],
          achievements: [
            'Perfect Lighthouse scores',
            'Global CDN distribution',
            'Automated deployments',
            'Custom domain setup'
          ]
        }
      ]
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

    developmentJourney: {
      steps: [
        {
          id: 'backend',
          title: 'API Development',
          duration: '4 weeks',
          technologies: ['NestJS', 'TypeScript', 'TypeORM'],
          decisions: [
            {
              decision: 'NestJS over Express',
              reasoning: 'Better structure and built-in features for complex APIs'
            },
            {
              decision: 'TypeORM over Prisma',
              reasoning: 'Better MySQL support and decorator-based approach'
            }
          ],
          achievements: [
            'Comprehensive RESTful API',
            'Swagger documentation',
            'Data validation and transformation',
            'Error handling middleware'
          ]
        },
        {
          id: 'database',
          title: 'Database Setup',
          duration: '1 week',
          technologies: ['MySQL', 'TypeORM'],
          decisions: [
            {
              decision: 'MySQL over PostgreSQL',
              reasoning: 'Team familiarity and hosting constraints'
            }
          ],
          achievements: [
            'Normalized database schema',
            'Efficient query optimization',
            'Data seeding scripts',
            'Migration system setup'
          ]
        },
        {
          id: 'deployment',
          title: 'Docker Deployment',
          duration: '1 week',
          technologies: ['Docker', 'AWS', 'S3'],
          decisions: [
            {
              decision: 'Docker containerization',
              reasoning: 'Consistent deployment across environments'
            }
          ],
          achievements: [
            'Containerized application',
            'AWS deployment setup',
            'File upload to S3',
            'Environment configuration'
          ]
        }
      ]
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

    developmentJourney: {
      steps: [
        {
          id: 'backend',
          title: 'Express API Template',
          duration: '3 weeks',
          technologies: ['Express.js', 'TypeScript', 'JWT'],
          decisions: [
            {
              decision: 'Express.js as base framework',
              reasoning: 'Flexibility and extensive ecosystem for template creation'
            },
            {
              decision: 'TypeScript for type safety',
              reasoning: 'Better developer experience and error prevention'
            }
          ],
          achievements: [
            'Modular architecture setup',
            'Authentication middleware',
            'Error handling system',
            'Request validation pipeline'
          ]
        },
        {
          id: 'database',
          title: 'Database Integration',
          duration: '1 week',
          technologies: ['Prisma', 'PostgreSQL'],
          decisions: [
            {
              decision: 'Prisma over raw SQL',
              reasoning: 'Type-safe database access and better developer experience'
            }
          ],
          achievements: ['Database schema design', 'Migration system', 'Seed data scripts', 'Query optimization']
        },
        {
          id: 'testing',
          title: 'Testing & Documentation',
          duration: '1 week',
          technologies: ['Jest', 'Supertest', 'OpenAPI'],
          decisions: [
            {
              decision: 'Jest for testing framework',
              reasoning: 'Comprehensive testing features and good TypeScript support'
            }
          ],
          achievements: [
            'Unit and integration tests',
            'API documentation with OpenAPI',
            'Test coverage reports',
            'CI/CD pipeline setup'
          ]
        }
      ]
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

    developmentJourney: {
      steps: [
        {
          id: 'frontend',
          title: 'React Frontend',
          duration: '3 weeks',
          technologies: ['React', 'Tailwind CSS', 'React Router'],
          decisions: [
            {
              decision: 'React over Vue.js',
              reasoning: 'Larger ecosystem and team expertise'
            },
            {
              decision: 'Tailwind CSS for styling',
              reasoning: 'Rapid development and consistent design system'
            }
          ],
          achievements: [
            'Modern React application with hooks',
            'Responsive design system',
            'Component library creation',
            'State management with Context API'
          ]
        },
        {
          id: 'backend',
          title: 'Node.js API',
          duration: '3 weeks',
          technologies: ['Node.js', 'Express', 'Mongoose'],
          decisions: [
            {
              decision: 'Express.js for API framework',
              reasoning: 'Simplicity and flexibility for rapid development'
            },
            {
              decision: 'Mongoose for MongoDB ODM',
              reasoning: 'Schema validation and easier data modeling'
            }
          ],
          achievements: [
            'RESTful API development',
            'JWT authentication system',
            'Business logic implementation',
            'Comprehensive error handling'
          ]
        },
        {
          id: 'database',
          title: 'MongoDB Integration',
          duration: '1 week',
          technologies: ['MongoDB', 'Mongoose'],
          decisions: [
            {
              decision: 'MongoDB over SQL database',
              reasoning: 'Flexible schema for product catalog and rapid prototyping'
            }
          ],
          achievements: [
            'Flexible database schema design',
            'Data modeling with Mongoose',
            'Query optimization and indexing',
            'Database seeding scripts'
          ]
        },
        {
          id: 'payment',
          title: 'Payment Integration',
          duration: '1 week',
          technologies: ['Stripe API', 'Webhooks'],
          decisions: [
            {
              decision: 'Stripe over PayPal',
              reasoning: 'Better developer experience and documentation'
            }
          ],
          achievements: [
            'Secure payment processing',
            'Webhook handling for order updates',
            'Payment method management',
            'Subscription billing setup'
          ]
        }
      ]
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
      },
      {
        title: 'Payment Flow',
        description: 'Secure checkout and payment processing',
        image: '/placeholder.svg?height=600&width=900',
        category: 'E-commerce'
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
