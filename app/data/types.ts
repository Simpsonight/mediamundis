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
  year: number
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
    primaryHtml: string
    secondary: string
  }
}
