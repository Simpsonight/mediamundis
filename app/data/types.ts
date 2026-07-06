export type Reveal = 'top' | 'bottom' | 'center'

export interface Service {
  id: string
  title: string
  body: string
  tags: string[]
  /** Dot-matrix glyph as bitmap rows ('#' = icon dot, '.' = empty). */
  glyph: string[]
  /** Direction the glyph renders in as the card scrolls into view. */
  reveal: Reveal
}

export type WorkKind = 'technical' | 'showcase'

interface WorkBase {
  id: string
  kind: WorkKind
  eyebrow: string
  title: string
  description: string
  meta: string[]
}

/** Software/consulting project — no public URL, the stack/meta is the visual. */
export interface TechnicalWork extends WorkBase {
  kind: 'technical'
}

/** Live web reference — links out to the running site, shown with a screenshot. */
export interface ShowcaseWork extends WorkBase {
  kind: 'showcase'
  /** External live site the whole row links to. */
  url: string
  /** Display label for the link; falls back to the host of `url` if omitted. */
  siteName?: string
  image: { src: string; alt: string; width: number; height: number }
}

export type Work = TechnicalWork | ShowcaseWork

export interface Client {
  /** Brand name — used as the image alt text. */
  name: string
  /** Public path to the real logo file (SVG/PNG/AVIF). */
  src: string
  /** Optical size multiplier (default 1) to balance uneven logo proportions. */
  scale?: number
}

export interface NavLink {
  href: string
  label: string
}

export interface SocialLink {
  href: string
  label: string
}

/** One of the two ways to work together (Arbeitsweise section). */
export interface Engagement {
  id: string
  eyebrow: string
  title: string
  body: string
  points: string[]
  cta: { href: string; label: string }
}

export interface SiteContent {
  email: string
  location: string
  navLinks: NavLink[]
  legalLinks: NavLink[]
  hero: {
    lead: string
    faded: string
    sub: string
  }
  lead: {
    name: string
    role: string
    headline: string
    primaryHtml: string
    secondary: string
    profile: string
    socials: SocialLink[]
  }
}
