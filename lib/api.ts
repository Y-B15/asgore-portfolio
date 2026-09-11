/**
 * API layer for the portfolio.
 *
 * Talks to an external C# ASP.NET Core REST API. The base URL is configurable
 * via the `NEXT_PUBLIC_API_URL` environment variable and falls back to the
 * `API_BASE_URL` constant below so the site keeps working during local dev.
 *
 * Every fetcher is defensive: if the backend is unreachable or returns a
 * non-OK response, callers can decide to surface an error state and/or fall
 * back to the bundled sample data exported from this module.
 */

/** Configurable base URL. Set NEXT_PUBLIC_API_URL in your Vercel project. */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? ''

export type SkillCategory = 'engineering' | 'community'

export interface Skill {
  id: string | number
  name: string
  /** 0–100 proficiency used for the meter. */
  level: number
  category: SkillCategory
}

export type ProjectCategory = 'development' | 'community'

export interface Project {
  id: string | number
  title: string
  description: string
  tech: string[]
  category: ProjectCategory
  url?: string
}

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export interface ContactMessage extends ContactPayload {
  id: string | number
  /** ISO timestamp of when the message was received. */
  receivedAt: string
  read?: boolean
}

/** Shared fetcher used with SWR. Throws on network / non-OK responses. */
export async function apiFetcher<T>(path: string): Promise<T> {
  if (!API_BASE_URL) {
    // No backend configured — treat as an error so the UI shows fallback data.
    throw new Error('API_BASE_URL is not configured')
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  }

  return (await res.json()) as T
}

/** POST the contact form payload to the backend. */
export async function submitContact(payload: ContactPayload): Promise<void> {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not configured')
  }

  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Failed to send message: ${res.status}`)
  }
}

/* -------------------------------------------------------------------------- */
/* Fallback data — used when the API is unavailable so the site never breaks. */
/* -------------------------------------------------------------------------- */

export const FALLBACK_SKILLS: Skill[] = [
  { id: 'c', name: 'C', level: 90, category: 'engineering' },
  { id: 'mysql', name: 'MySQL', level: 95, category: 'engineering' },
  { id: 'networking', name: 'Networking', level: 80, category: 'engineering' },
  { id: 'web', name: 'HTML / CSS / JS', level: 78, category: 'engineering' },
  { id: 'python', name: 'Python', level: 82, category: 'engineering' },
  {
    id: 'architecture',
    name: 'Server Architecture',
    level: 92,
    category: 'community',
  },
  { id: 'bots', name: 'Bot Integration', level: 88, category: 'community' },
  { id: 'events', name: 'Event Management', level: 84, category: 'community' },
  { id: 'moderation', name: 'Moderation', level: 90, category: 'community' },
]

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'horizon-piece',
    title: 'Horizon Piece',
    description:
      'Managed the Discord community for this Roblox game to 1,000+ members — full server architecture, role hierarchy, event nights and an active moderation team.',
    tech: ['Roblox', '1K+ Members', 'Server Design', 'Moderation'],
    category: 'community',
  },
  {
    id: 'ghoul-battleground',
    title: 'Ghoul Battleground',
    description:
      'Built and ran the Discord server for this Roblox title to 500+ members, with onboarding flows, bot integrations and community events driving retention.',
    tech: ['Roblox', '500+ Members', 'Bot Integration', 'Events'],
    category: 'community',
  },
  {
    id: 'prism',
    title: 'Prism Marketing Server',
    description:
      'Currently architecting a marketing-focused Discord server — channel structure, growth funnels and automation to convert members into an engaged audience.',
    tech: ['Marketing', 'Growth', 'Automation', 'In Progress'],
    category: 'community',
  },
  {
    id: 'portfolio-site',
    title: 'Personal Portfolio Website',
    description:
      'A responsive, cyberpunk-themed portfolio built from scratch with a clean layout, dynamic sections and a working contact form.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    category: 'development',
  },
  {
    id: 'landing-page',
    title: 'Product Landing Page',
    description:
      'A high-converting landing page with hero section, feature grid and call-to-action buttons, optimized for mobile and desktop.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    category: 'development',
  },
  {
    id: 'business-site',
    title: 'Small Business Website',
    description:
      'A multi-page website for a local business, featuring services, gallery and a contact page with form validation.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    category: 'development',
  },
  {
    id: 'community-hub',
    title: 'Community Hub Website',
    description:
      'A web landing page for a Discord community with server stats, join links and an event schedule.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    category: 'development',
  },
]

/**
 * Sample contact messages for the admin dashboard.
 * Used when the API has no GET /contact/messages endpoint available.
 */
export const FALLBACK_MESSAGES: ContactMessage[] = [
  {
    id: 'm1',
    name: 'Léa Moreau',
    email: 'lea.moreau@example.com',
    message:
      'Hi! I run a small Roblox game and would love help structuring our Discord server. What does the Growth Server tier include exactly?',
    receivedAt: '2026-09-08T14:22:00.000Z',
    read: false,
  },
  {
    id: 'm2',
    name: 'Marcus Webb',
    email: 'marcus.webb@example.com',
    message:
      'We need a multi-page website for our esports team. Do you handle deployment to Vercel as part of the project?',
    receivedAt: '2026-09-06T09:05:00.000Z',
    read: true,
  },
  {
    id: 'm3',
    name: 'Aisha Khan',
    email: 'aisha.k@example.com',
    message:
      'Loved the portfolio. Are you available for a landing page build in the next few weeks?',
    receivedAt: '2026-09-03T18:41:00.000Z',
    read: true,
  },
]

export type ServiceGroup = 'community' | 'development'

export interface PricingTier {
  id: string
  name: string
  price: number
  tagline: string
  features: string[]
  group: ServiceGroup
  featured?: boolean
}

/** Discord community management service tiers ($20 min – $100 max). */
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
]

/** Website creation / development service tiers. */
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
]
