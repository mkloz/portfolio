'use client';

import { useParams } from 'react-router-dom';

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

  // Get project data using the service
  const project = slug ? ProjectService.getProjectBySlug(slug) : undefined;

  // If project not found, show 404 page
  if (!project) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Project Hero Section */}
      <ProjectHero project={project} />

      {/* Project Header with Stats */}
      <ProjectHeader projectTitle={project.title} />

      {/* Project Overview */}
      <ProjectOverview project={project} />

      {/* Tech Stack Showcase */}
      <TechStackShowcase technologies={project.detailedTechnologies} />

      {/* Interactive Demo */}
      <InteractiveDemo project={project} />
      {/* Technical Architecture */}
      <TechnicalArchitecture architecture={project.architecture} />

      {/* Visual Gallery */}
      <VisualGallery gallery={project.gallery} gradient={project.gradient} />

      {/* Explore & Connect */}
      <ExploreConnect project={project} />
    </div>
  );
};
