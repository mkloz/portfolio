import { Award, Briefcase, Code, GraduationCap } from 'lucide-react';
import { ElementType } from 'react';

// Default icon for timeline items
export interface TimelineIconProps {
  size: number;
  className: string;
}
export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: {
    city: string;
    country: string;
    flag: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  social: {
    github: string;
    linkedin: string;
    telegram: string;
    whatsapp: string;
  };
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    message: string;
  };
  education: {
    degree: string;
    institution: string;
    period?: string;
  };
  languages: Array<{
    name: string;
    level: string;
    flag: string;
    percentage: number;
  }>;
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
    linesOfCode: string;
  };
  timeline: Array<{
    year: string;
    title: string;
    description: string;
    type: 'education' | 'work' | 'project' | 'achievement';
    icon?: ElementType;
    color?: string;
  }>;
}

export const ME: PersonalInfo = {
  name: 'Mykhailo Kloz',
  title: 'Full-Stack Web Developer',
  tagline: '',

  location: {
    city: 'Manchester City',
    country: 'UK',
    flag: '🇬🇧'
  },

  contact: {
    email: 'micha21cloz@gmail.com',
    phone: '+44 7388232276',
    whatsapp: '+380994577468'
  },

  social: {
    github: 'https://github.com/mkloz',
    linkedin: 'https://www.linkedin.com/in/mkloz',
    telegram: 'https://mkl0z.t.me',
    whatsapp: 'https://wa.me/380994577468'
  },

  availability: {
    status: 'available',
    message: 'Available'
  },

  education: {
    degree: 'Software Development',
    institution: 'Kharkiv Polytechnic Institute (KHPI)',
    period: '2022-2026'
  },

  languages: [
    {
      name: 'English',
      level: 'Highly proficient',
      flag: '🇬🇧',
      percentage: 90
    },
    {
      name: 'Ukrainian',
      level: 'Native speaker',
      flag: '🇺🇦',
      percentage: 100
    },
    {
      name: 'Russian',
      level: 'Native speaker',
      flag: '🇷🇺',
      percentage: 100
    }
  ],

  stats: {
    yearsOfExperience: 3,
    projectsCompleted: 10,
    linesOfCode: '150k'
  },

  timeline: [
    {
      year: 'November 2021',
      title: 'Began Web Development Journey',
      description:
        'Took the first step into web development, mastering HTML, CSS, and JavaScript fundamentals through self-driven projects and online courses.',
      type: 'education',
      icon: GraduationCap,
      color: 'from-blue-500 to-purple-500'
    },
    {
      year: 'September 2022',
      title: 'Started University at KHPI',
      description:
        'Enrolled in Software Development at Kharkiv Polytechnic Institute, deepening knowledge in computer science, algorithms, and collaborative software engineering.',
      type: 'education',
      icon: GraduationCap,
      color: 'from-blue-500 to-purple-500'
    },
    {
      year: 'November 2022',
      title: 'First Backend Project & Relocation',
      description:
        'Engineered a complex backend system using Node.js and PostgreSQL, and relocated to the UK, adapting to a new environment and broadening my global perspective.',
      type: 'achievement',
      icon: Award,
      color: 'from-orange-500 to-red-500'
    },
    {
      year: 'August 2023',
      title: 'Backend Developer',
      description:
        'Collaborated as a backend developer in a cross-functional team, delivering robust APIs and improving project efficiency through code reviews and agile practices.',
      type: 'work',
      icon: Code,
      color: 'from-green-500 to-blue-500'
    },
    {
      year: 'July 2024',
      title: 'Transitioned to Full-Stack',
      description:
        'Expanded expertise to full-stack development, building end-to-end solutions with React, TypeScript, and modern backend technologies.',
      type: 'achievement',
      icon: Award,
      color: 'from-orange-500 to-red-500'
    },
    {
      year: 'Now',
      title: 'Full-Stack Developer',
      description:
        'Delivering impactful full-stack projects using cutting-edge technologies, focusing on scalable architecture, user experience, and continuous learning.',
      type: 'work',
      icon: Briefcase,
      color: 'from-green-500 to-blue-500'
    }
  ]
};

// Helper functions for accessing personal data
export const getContactInfo = () => ME.contact;

export const getSocialLinks = () => ME.social;

export const getLocationInfo = () => ME.location;

export const getEducationInfo = () => ME.education;

export const getLanguages = () => ME.languages;

export const getAvailabilityStatus = () => ME.availability;
