export const ALLOWED_CONTENT_FIELDS = new Set([
  'communityName', 'tagline', 'memberCount', 'topMembers', 'about',
  'projectInfo', 'inspirational', 'services', 'partners', 'gallery',
  'courses', 'certificates', 'socialLinks', 'contactInfo', 'stats',
  'path', 'data',
]);

export function sanitizeString(value: unknown, maxLength = 10000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength).replace(/<[^>]*>/g, '');
}

export function sanitizeHtml(value: unknown, maxLength = 10000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export function isValidObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isValidNumber(value: unknown, min = -Infinity, max = Infinity): value is number {
  return typeof value === 'number' && !isNaN(value) && value >= min && value <= max;
}

export interface StatsInput {
  members: number; services: number; projects: number; events: number;
}

export interface ProjectInfoInput {
  title: string; description: string; value: number;
}

export interface SocialLinksInput {
  discord: string; youtube: string; github: string; twitter: string;
}

export interface ContactInfoInput {
  email: string; location: string; website: string;
}

export function validateStats(input: unknown): StatsInput {
  const data = input as any;
  if (!data || typeof data !== 'object') throw new Error('Invalid input');
  return {
    members: typeof data.members === 'number' ? Math.max(0, Math.floor(data.members)) : 0,
    services: typeof data.services === 'number' ? Math.max(0, Math.floor(data.services)) : 0,
    projects: typeof data.projects === 'number' ? Math.max(0, Math.floor(data.projects)) : 0,
    events: typeof data.events === 'number' ? Math.max(0, Math.floor(data.events)) : 0,
  };
}

export function validateProjectInfo(input: unknown): ProjectInfoInput {
  const data = input as any;
  if (!data || typeof data !== 'object') throw new Error('Invalid input');
  return {
    title: typeof data.title === 'string' ? data.title.trim() : '',
    description: typeof data.description === 'string' ? data.description.trim() : '',
    value: typeof data.value === 'number' ? Math.max(0, data.value) : 0,
  };
}

export function validateSocialLinks(input: unknown): SocialLinksInput {
  const data = input as any;
  if (!data || typeof data !== 'object') throw new Error('Invalid input');
  return {
    discord: typeof data.discord === 'string' ? data.discord.trim() : '',
    youtube: typeof data.youtube === 'string' ? data.youtube.trim() : '',
    github: typeof data.github === 'string' ? data.github.trim() : '',
    twitter: typeof data.twitter === 'string' ? data.twitter.trim() : '',
  };
}

export function validateContactInfo(input: unknown): ContactInfoInput {
  const data = input as any;
  if (!data || typeof data !== 'object') throw new Error('Invalid input');
  return {
    email: typeof data.email === 'string' ? data.email.trim() : '',
    location: typeof data.location === 'string' ? data.location.trim() : '',
    website: typeof data.website === 'string' ? data.website.trim() : '',
  };
}
