import { ME, type PersonalInfo } from '@/data/me';

export class PersonalService {
  /**
   * Get complete personal information
   */
  static getPersonalInfo(): PersonalInfo {
    return ME;
  }

  /**
   * Get basic personal details
   */
  static getBasicInfo() {
    return {
      name: ME.name,
      title: ME.title,
      tagline: ME.tagline
    };
  }

  /**
   * Get contact information
   */
  static getContactInfo() {
    return ME.contact;
  }

  /**
   * Get social media links
   */
  static getSocialLinks() {
    return ME.social;
  }

  /**
   * Get location information
   */
  static getLocationInfo() {
    return ME.location;
  }

  /**
   * Get education information
   */
  static getEducationInfo() {
    return ME.education;
  }

  /**
   * Get languages with proficiency levels
   */
  static getLanguages() {
    return ME.languages;
  }

  /**
   * Get professional statistics
   */
  static getStats() {
    return ME.stats;
  }

  /**
   * Get career timeline
   */
  static getTimeline() {
    return ME.timeline;
  }

  /**
   * Get availability status
   */
  static getAvailabilityStatus() {
    return ME.availability;
  }

  /**
   * Get language by name
   */
  static getLanguageByName(name: string) {
    return ME.languages.find((lang) => lang.name.toLowerCase() === name.toLowerCase());
  }

  /**
   * Get timeline entries by type
   */
  static getTimelineByType(type: PersonalInfo['timeline'][0]['type']) {
    return ME.timeline.filter((entry) => entry.type === type);
  }

  /**
   * Check if available for work
   */
  static isAvailable(): boolean {
    return ME.availability.status === 'available';
  }

  /**
   * Get formatted contact email
   */
  static getFormattedEmail() {
    return `mailto:${ME.contact.email}`;
  }

  /**
   * Get formatted phone number
   */
  static getFormattedPhone() {
    return `tel:${ME.contact.phone}`;
  }

  /**
   * Get formatted WhatsApp link
   */
  static getFormattedWhatsApp() {
    return `https://wa.me/${ME.contact.whatsapp}`;
  }

  /**
   * Get location display string
   */
  static getLocationDisplay() {
    return `${ME.location.flag} ${ME.location.city}, ${ME.location.country}`;
  }

  /**
   * Get years of experience
   */
  static getYearsOfExperience(): number {
    return ME.stats.yearsOfExperience;
  }

  /**
   * Get projects completed count
   */
  static getProjectsCompleted(): number {
    return ME.stats.projectsCompleted;
  }

  /**
   * Get lines of code written
   */
  static getLinesOfCode(): string {
    return ME.stats.linesOfCode;
  }
}
