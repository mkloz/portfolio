import type { Technology } from '@/data/technologies';
import { technologies } from '@/data/technologies';

/**
 * Service for accessing and manipulating technology data
 */
export class TechnologyService {
  /**
   * Get all technologies
   * @returns Array of all technologies
   */
  static getAllTechnologies(): Technology[] {
    return Object.values(technologies);
  }

  /**
   * Get a technology by its name
   * @param name The name of the technology
   * @returns The technology or undefined if not found
   */
  static getTechnologyByName(name: string): Technology | undefined {
    return Object.values(technologies).find((tech) => tech.name.toLowerCase() === name.toLowerCase());
  }

  /**
   * Get technologies by category
   * @param category The category to filter by
   * @returns Array of technologies in the specified category
   */
  static getTechnologiesByCategory(category: string): Technology[] {
    return Object.values(technologies).filter((tech) => tech.category === category);
  }

  /**
   * Get all technology categories
   * @returns Array of unique technology categories
   */
  static getTechnologyCategories(): string[] {
    return [...new Set(Object.values(technologies).map((tech) => tech.category))];
  }

  /**
   * Get technologies by their names
   * @param names Array of technology names
   * @returns Array of matching technology objects
   */
  static getTechnologiesByNames(names: string[]): Technology[] {
    return names.map((name) => this.getTechnologyByName(name)).filter((tech): tech is Technology => tech !== undefined);
  }

  /**
   * Get a technology by its key in the technologies object
   * @param key The key in the technologies object
   * @returns The technology or undefined if not found
   */
  static getTechnologyByKey(key: string): Technology | undefined {
    return technologies[key];
  }
}
