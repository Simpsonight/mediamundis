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

export interface Work {
  id: string
  eyebrow: string
  title: string
  description: string
  meta: string[]
  href: string
  mini: { cols: number; rows: number; onIndex: number }
}

export type ClientMark =
  | 'ringo'
  | 'veltra'
  | 'nordwerk'
  | 'paytide'
  | 'orbion'
  | 'helixa'
  | 'klinverio'
  | 'statera'

export interface Client {
  name: string
  mark: ClientMark
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
