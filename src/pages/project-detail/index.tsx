'use client';

import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from '@/components/common/link';
import { ProjectService } from '@/services/project.service';

import { NotFound } from '../not-found';
import { ExploreConnect } from './explore-connect';
import { ProjectHero } from './hero';
import { InteractiveDemo } from './interactive-demo';
import { ProjectOverview } from './overview';
import { ProjectHeader } from './project-header';
import { TechStackShowcase } from './tech-stack';
import { TechnicalArchitecture } from './technical-architecture';
import { VisualGallery } from './visual-gallery';

export const ProjectDetailPage = () => {
  // Get the project slug from URL params
  const { slug } = useParams<{ slug: string }>();
  const [showBackButton, setShowBackButton] = useState(false);

  // Get project data using the service
  const project = slug ? ProjectService.getProjectBySlug(slug) : undefined;

  // Handle scroll to show/hide back button
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled past hero section (approximately 100vh)
      const heroHeight = window.innerHeight;
      setShowBackButton(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // If project not found, show 404 page
  if (!project) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Project Header with Stats */}
      <ProjectHeader projectTitle={project.title} />

      {/* Go Back Button */}
      <Link
        to="/#projects"
        unstyled
        className={`fixed top-20 left-4 z-40 p-3 rounded-full bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-900/20 transition-all duration-300 group shadow-lg hover:shadow-xl ${
          showBackButton ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
        aria-label="Go back to projects">
        <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white group-hover:-translate-x-0.5 transition-all duration-300" />
      </Link>

      {/* Project Hero Section */}
      <ProjectHero project={project} />

      {/* Project Overview */}
      <ProjectOverview project={project} />

      {/* Tech Stack Showcase */}
      <TechStackShowcase technologies={project.detailedTechnologies} />

      {/* Interactive Demo */}
      <InteractiveDemo project={project} />
      {/* Technical Architecture */}
      <TechnicalArchitecture />

      {/* Visual Gallery */}
      <VisualGallery gallery={project.gallery} gradient={project.gradient} />

      {/* Explore & Connect */}
      <ExploreConnect project={project} />
    </div>
  );
};
