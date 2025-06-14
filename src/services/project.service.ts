import type { Project } from '@/data/projects';
import { projects } from '@/data/projects';

/**
 * Service for accessing and manipulating project data
 */
export class ProjectService {
  /**
   * Get all projects
   * @returns Array of all projects
   */
  static getAllProjects(): Project[] {
    return projects;
  }

  /**
   * Get a project by its slug
   * @param slug The URL-friendly slug of the project
   * @returns The project or undefined if not found
   */
  static getProjectBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
  }

  /**
   * Get featured projects
   * @returns Array of featured projects
   */
  static getFeaturedProjects(): Project[] {
    return projects.filter((project) => project.featured);
  }

  /**
   * Get non-featured projects
   * @param limit Optional limit on the number of projects returned
   * @returns Array of non-featured projects
   */
  static getOtherProjects(limit?: number): Project[] {
    const otherProjects = projects.filter((project) => !project.featured);
    return limit ? otherProjects.slice(0, limit) : otherProjects;
  }

  /**
   * Get projects by category
   * @param category The category to filter by
   * @returns Array of projects in the specified category
   */
  static getProjectsByCategory(category: string): Project[] {
    return projects.filter((project) => project.category === category);
  }

  /**
   * Get projects by technology
   * @param technology The technology name to filter by
   * @returns Array of projects that use the specified technology
   */
  static getProjectsByTechnology(technology: string): Project[] {
    return projects.filter((project) =>
      project.technologies.some((tech) => tech.toLowerCase() === technology.toLowerCase())
    );
  }

  /**
   * Search projects by keyword
   * @param keyword The keyword to search for in title and description
   * @returns Array of matching projects
   */
  static searchProjects(keyword: string): Project[] {
    const lowercaseKeyword = keyword.toLowerCase();
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(lowercaseKeyword) ||
        project.description.toLowerCase().includes(lowercaseKeyword)
    );
  }

  /**
   * Get project categories
   * @returns Array of unique project categories
   */
  static getProjectCategories(): string[] {
    return [...new Set(projects.map((project) => project.category))];
  }
}
