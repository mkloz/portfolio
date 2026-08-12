import { Eye, Monitor, Moon, MousePointer, Sparkles, Zap } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const portfolioProject: Project = {
  // Basic info
  title: 'Portfolio',
  slug: 'portfolio',
  description: 'Responsive portfolio with project case studies, demos, implementation notes, and image galleries.',
  image: {
    light: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/portfolio-light.png',
    dark: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/portfolio-dark.png'
  },
  highlights: [
    {
      title: 'Responsive interface',
      description: 'Layouts designed for desktop and mobile use',
      icon: Sparkles,
      stats: 'Animated'
    },
    {
      title: 'Responsive Layout',
      description: 'Fully responsive design optimized for all device sizes and orientations',
      icon: Monitor,
      stats: 'All devices'
    },
    {
      title: 'Interactive Elements',
      description: 'Engaging animations and interactive components built with Framer Motion',
      icon: MousePointer,
      stats: 'Interactive'
    },
    {
      title: 'Dark Mode',
      description: 'Persistent light and dark themes',
      icon: Moon,
      stats: 'Theme aware'
    },
    {
      title: 'Performance Optimized',
      description: 'Optimized for speed with lazy loading, code splitting, and efficient rendering',
      icon: Zap,
      stats: '95+ score'
    },
    {
      title: 'Accessibility',
      description: 'Built with accessibility in mind using semantic HTML and ARIA attributes',
      icon: Eye,
      stats: 'WCAG 2.1'
    }
  ],

  technologies: [
    // Core Technologies (Most Important)
    'React',
    'TS',
    'Tailwind CSS',
    'ShadCN',
    'Vite',
    'React Router',
    'Lucide React',
    'ESLint',
    'S3',
    'Vercel',
    'CI/CD',

    // Supporting Technologies
    'Prettier'
  ],
  liveDemo: 'https://portfolio.mkloz.com',
  github: [
    {
      name: 'Portfolio Frontend',
      link: 'https://github.com/mkloz/portfolio'
    }
  ],
  website: 'https://portfolio.mkloz.com',
  featured: false,
  year: 2025,
  progress: 90,

  // Detailed info
  tagline: 'Selected work and implementation notes',
  longDescription:
    'This portfolio presents selected development work through responsive case-study pages. Each project can include implementation notes, demos, source links, and an image gallery. The interface is built with React and TypeScript and supports light and dark themes.',
  status: 'In Progress',
  category: 'Frontend',
  duration: '3 weeks',

  // Technical details
  detailedTechnologies: [
    technologies.typescript,
    technologies.vite,
    technologies.react,
    technologies.aws,
    technologies.vercel,
    technologies.eslint,
    technologies.shadcn,
    technologies.git,
    technologies.tailwind,
    technologies.prettier,
    technologies.reactrouter,
    technologies.html5
  ],

  developmentJourney: {
    steps: [
      {
        id: 'planning',
        title: 'Design & Planning',
        duration: '1 week',
        decisions: [
          {
            decision: 'Choose React with TypeScript for type safety',
            reasoning: 'Ensures code reliability and better developer experience'
          },
          {
            decision: 'Use Tailwind CSS for styling',
            reasoning: 'Rapid development with consistent design system'
          },
          {
            decision: 'Staning design',
            reasoning: 'Defining the layout and visual direction before implementation'
          }
        ],
        achievements: [
          'Created a shared design system',
          'Planned component architecture',
          'Defined project structure and routing',
          'Created a responsive design for the website'
        ]
      },
      {
        id: 'frontend',
        title: 'Core Development',
        duration: '1 week',

        technologies: [
          'React',
          'TypeScript',
          'Tailwind CSS',
          'Vite',
          'React Router',
          'ShadCN',
          'Lucide React',
          'ESLint',
          'Prettier'
        ],
        decisions: [
          {
            decision: 'Implement custom theme system with dark/light mode',
            reasoning: 'Consistent components and browser-native interaction patterns'
          },
          {
            decision: 'Add advanced animations and micro-interactions',
            reasoning: 'Keeps optional motion separate from core navigation and content'
          },
          {
            decision: 'Implement project case-study pages',
            reasoning: 'Keeps implementation evidence with each project'
          }
        ],
        achievements: [
          'Built responsive layout system',
          'Implemented theme switching',
          'Added smooth page transitions',
          'Created interactive project galleries',
          'Implemented contact form functionality'
        ]
      },
      {
        id: 'deployment',
        title: 'Deployment',
        duration: '1 day',
        decisions: [
          {
            decision: 'Deploy the website to Vercel',
            reasoning: 'Vercel hosts the production website'
          },
          {
            decision: 'Set up multiple domains',
            reasoning: 'Multiple domains for the website to be used for SEO'
          },
          {
            decision: 'CI/CD pipeline',
            reasoning: 'Automate the deployment process'
          }
        ],
        achievements: [
          'Deployed the website to Vercel',
          'Set up multiple domains for the website',
          'CI/CD pipeline for the website',
          'Set up a monitoring system for the website',
          'Set up a backup system for the website'
        ]
      }
    ]
  },

  gallery: [
    {
      title: 'Project Stack',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/project-stack.png'
    },
    {
      title: '404 Page',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/404.png'
    },
    {
      title: 'Highlights',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/highlights.png'
    },
    {
      title: 'Contact Section',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/contact.png'
    },
    {
      title: 'Projects Section',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/projects.png'
    },
    {
      title: 'Hero Section',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/hero.png'
    },
    {
      title: 'Demo',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/demo.png'
    },
    {
      title: 'Journey',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/journey.png'
    },
    {
      title: 'Project Hero',
      image: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/project-hero.png'
    }
  ],

  stats: {
    linesOfCode: '12.6k',
    commits: '20+',
    features: '10+',
    technologies: '12+'
  },
  demo: [
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/portfolio-desktop-demo.mp4',
      device: 'desktop',
      length: '',
      preview: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/demo-desktop-preview.png'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/portfolio-tablet-demo.mp4',
      device: 'tablet',
      length: '',
      preview: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/demo-tablet-preview.png'
    },
    {
      link: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/portfolio-mobile-demo.mp4',
      device: 'mobile',
      length: '',
      preview: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/demo-mobile-preview.png'
    }
  ]
};
