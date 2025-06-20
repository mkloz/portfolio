import { Eye, Monitor, Moon, MousePointer, Sparkles, Zap } from 'lucide-react';

import { technologies } from '../technologies';
import type { Project } from './index';

export const portfolioProject: Project = {
  // Basic info
  title: 'Portfolio',
  slug: 'portfolio',
  description:
    'Modern, responsive portfolio website showcasing my development skills and projects with stunning animations and interactive elements.',
  image: {
    light: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/portfolio-light.png',
    dark: 'https://mkloz-portfolio.s3.us-east-1.amazonaws.com/portfolio/portfolio-dark.png'
  },
  highlights: [
    {
      title: 'Modern Design',
      description: 'Clean, modern interface with smooth animations and micro-interactions',
      icon: Sparkles,
      color: 'from-purple-400 to-pink-500',
      stats: 'Animated'
    },
    {
      title: 'Responsive Layout',
      description: 'Fully responsive design optimized for all device sizes and orientations',
      icon: Monitor,
      color: 'from-blue-400 to-cyan-500',
      stats: 'All devices'
    },
    {
      title: 'Interactive Elements',
      description: 'Engaging animations and interactive components built with Framer Motion',
      icon: MousePointer,
      color: 'from-green-400 to-emerald-500',
      stats: 'Interactive'
    },
    {
      title: 'Dark Mode',
      description: 'Seamless dark/light theme switching with smooth transitions and persistence',
      icon: Moon,
      color: 'from-indigo-400 to-purple-500',
      stats: 'Theme aware'
    },
    {
      title: 'Performance Optimized',
      description: 'Optimized for speed with lazy loading, code splitting, and efficient rendering',
      icon: Zap,
      color: 'from-yellow-400 to-orange-500',
      stats: '95+ score'
    },
    {
      title: 'Accessibility',
      description: 'Built with accessibility in mind using semantic HTML and ARIA attributes',
      icon: Eye,
      color: 'from-teal-400 to-green-500',
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
  gradient: 'blue',
  year: 2025,
  progress: 90,

  // Detailed info
  tagline: 'Showcasing creativity through code',
  longDescription:
    'A comprehensive portfolio website built with modern web technologies, featuring interactive animations, responsive design, and detailed project showcases. The site demonstrates advanced React patterns, TypeScript implementation, and creative UI/UX design principles.',
  status: 'In Progress',
  category: 'Frontend',
  duration: '3 weeks',

  // Technical details
  detailedTechnologies: [
    technologies.react,
    technologies.typescript,
    technologies.tailwind,
    technologies.vite,
    technologies.eslint,
    technologies.prettier,
    technologies.reactrouter,
    technologies.shadcn,
    technologies.awss3,
    technologies.vercel,
    technologies.git,
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
            reasoning: 'Designing the website with a modern and clean look'
          }
        ],
        achievements: [
          'Created comprehensive design system',
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
            reasoning: 'Enhanced user experience and modern web standards'
          },
          {
            decision: 'Add advanced animations and micro-interactions',
            reasoning: 'Creates engaging user experience and showcases technical skills'
          },
          {
            decision: 'Implement detailed project showcase pages',
            reasoning: 'Provides comprehensive view of development capabilities'
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
            reasoning: 'Vercel is a powerful platform for deploying websites'
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
      title: 'Hero Section',
      image: '/placeholder.svg?height=400&width=600'
    },
    {
      title: 'Projects Showcase',
      image: '/placeholder.svg?height=400&width=600'
    },
    {
      title: 'Project Detail Page',
      image: '/placeholder.svg?height=400&width=600'
    },
    {
      title: 'Skills Section',
      image: '/placeholder.svg?height=400&width=600'
    },
    {
      title: 'About Section',
      image: '/placeholder.svg?height=400&width=600'
    },
    {
      title: 'Contact Form',
      image: '/placeholder.svg?height=400&width=600'
    },
    {
      title: 'Dark Mode',
      image: '/placeholder.svg?height=400&width=600'
    },
    {
      title: 'Mobile Responsive',
      image: '/placeholder.svg?height=400&width=600'
    }
  ],

  stats: {
    linesOfCode: '8,500+',
    commits: '120+',
    features: '25+',
    technologies: '12'
  },
  demo: [
    {
      link: 'https://portfolio.mkloz.com/demo-desktop',
      device: 'desktop',
      length: '100',
      preview: '/placeholder.svg?height=400&width=600'
    },
    {
      link: 'https://portfolio.mkloz.com/demo-mobile',
      device: 'mobile',
      length: '70',
      preview: '/placeholder.svg?height=400&width=600'
    }
  ]
};
