export interface Service {
  id: string
  title: string
  body: string
  tags: string[]
  matrix: { cols: number; rows: number; onIndex: number }
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
