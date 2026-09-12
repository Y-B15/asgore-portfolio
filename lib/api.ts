/**
 * API layer for the portfolio.
 *
 * Uses internal Next.js App Router API endpoints (`/api/*`).
 * Relative routes ensure seamless operation on both localhost and Vercel.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function fetchSkills() {
  const response = await fetch(`${API_BASE_URL}/skills`);
  if (!response.ok) throw new Error('Failed to fetch skills');
  return response.json();
}

export type SkillCategory = 'engineering' | 'community';

export interface Skill {
  id: string | number;
  name: string;
  /** 0–100 proficiency used for the meter. */
  level: number;
  category: SkillCategory;
}

export type ProjectCategory = 'development' | 'community';

export interface Project {
  id: string | number;
  title: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  url?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactMessage extends ContactPayload {
  id: string | number;
  /** ISO timestamp of when the message was received. */
  receivedAt: string;
  read?: boolean;
}

/** Shared fetcher used with SWR. */
export async function apiFetcher<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as T;
}

/** POST the contact form payload to the internal Next.js API route. */
export async function submitContact(payload: ContactPayload): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to send message: ${res.status}`);
  }
}

/* -------------------------------------------------------------------------- */
/* Fallback data — updated for Next.js / Web Development tech stack           */
/* -------------------------------------------------------------------------- */

export const FALLBACK_SKILLS: Skill[] = [
  { id: 'nextjs', name: 'Next.js', level: 90, category: 'engineering' },
  { id: 'react', name: 'React', level: 92, category: 'engineering' },
  { id: 'typescript', name: 'TypeScript', level: 85, category: 'engineering' },
  { id: 'tailwind', name: 'Tailwind CSS', level: 90, category: 'engineering' },
  { id: 'web', name: 'HTML / CSS / JS', level: 95, category: 'engineering' },
  {
    id: 'architecture',
    name: 'Server Architecture',
    level: 92,
    category: 'community',
  },
  { id: 'bots', name: 'Bot Integration', level: 88, category: 'community' },
  { id: 'events', name: 'Event Management', level: 84, category: 'community' },
  { id: 'moderation', name: 'Moderation', level: 90, category: 'community' },
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'portfolio-site',
    title: 'Personal Portfolio Website',
    description:
      'A responsive, dark-themed developer portfolio built with Next.js App Router, Tailwind CSS, and serverless API endpoints.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    category: 'development',
  },
  {
    id: 'landing-page',
    title: 'Product Landing Page',
    description:
      'A high-converting landing page with animated hero sections, dynamic feature grids, and form validation.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    category: 'development',
  },
  {
    id: 'horizon-piece',
    title: 'Horizon Piece',
    description:
      'Managed the Discord community for this Roblox game to 1,000+ members — full server architecture, role hierarchy, event nights, and moderation.',
    tech: ['Roblox', '1K+ Members', 'Server Design', 'Moderation'],
    category: 'community',
  },
  {
    id: 'ghoul-battleground',
    title: 'Ghoul Battleground',
    description:
      'Built and ran the Discord server for this Roblox title to 500+ members with onboarding flows, bot integrations, and events.',
    tech: ['Roblox', '500+ Members', 'Bot Integration', 'Events'],
    category: 'community',
  },
];

export const FALLBACK_MESSAGES: ContactMessage[] = [
  {
    id: 'm1',
    name: 'Léa Moreau',
    email: 'lea.moreau@example.com',
    message:
      'Hi! I run a small game project and would love help structuring our Discord server. What does the Growth Server tier include?',
    receivedAt: '2026-09-08T14:22:00.000Z',
    read: false,
  },
];

export type ServiceGroup = 'community' | 'development';

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  group: ServiceGroup;
  featured?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter Setup',
    price: 20,
    tagline: 'A clean, ready-to-launch server foundation.',
    group: 'community',
    features: [
      'Core channel & category structure',
      'Role hierarchy + permissions',
      'One moderation/utility bot configured',
      'Basic verification gate',
    ],
  },
  {
    id: 'growth',
    name: 'Growth Server',
    price: 50,
    tagline: 'A full community build tuned for engagement.',
    group: 'community',
    featured: true,
    features: [
      'Everything in Starter',
      'Custom onboarding & reaction roles',
      'Multi-bot integration & automation',
      'Event scheduling + announcement flows',
      'Moderation guidelines & staff setup',
    ],
  },
  {
    id: 'elite',
    name: 'Elite Architecture',
    price: 100,
    tagline: 'End-to-end architecture for a serious community.',
    group: 'community',
    features: [
      'Everything in Growth',
      'Marketing & growth funnel design',
      'Advanced automation & custom bot logic',
      'Analytics, tickets & audit logging',
      '30 days of hands-on management support',
    ],
  },
];

export const DEV_PRICING_TIERS: PricingTier[] = [
  {
    id: 'landing',
    name: 'Landing Page',
    price: 80,
    tagline: 'A single, polished page built to convert.',
    group: 'development',
    features: [
      'One responsive page (mobile → desktop)',
      'Hero, features & call-to-action sections',
      'Contact form with validation',
      'Basic SEO & fast load times',
    ],
  },
  {
    id: 'multi-page',
    name: 'Multi-Page Website',
    price: 200,
    tagline: 'A complete site for a business or brand.',
    group: 'development',
    featured: true,
    features: [
      'Up to 5 responsive pages',
      'Custom design & reusable components',
      'Gallery, services & contact pages',
      'SEO metadata + analytics setup',
      'Deployment to Vercel included',
    ],
  },
  {
    id: 'web-app',
    name: 'Custom Web App',
    price: 400,
    tagline: 'A dynamic, data-driven web application.',
    group: 'development',
    features: [
      'Everything in Multi-Page',
      'API integration & dynamic content',
      'Interactive UI & state management',
      'Database-backed features',
      '30 days of post-launch support',
    ],
  },
];