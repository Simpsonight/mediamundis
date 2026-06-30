import type { SiteContent } from './types'

export const site: SiteContent = {
  email: 'hello@mediamundis.de',
  location: 'Rheinland · remote überall',
  navLinks: [
    { href: '#leistungen', label: 'Leistungen' },
    { href: '#work', label: 'Work' },
  ],
  legalLinks: [
    { href: '/impressum', label: 'Impressum' },
    { href: '/datenschutz', label: 'Datenschutz' },
  ],
  hero: {
    lead: 'Schlank, schnell und kompromisslos bei Qualität — mediamundis baut Software für Unternehmen, die den ',
    faded: 'Maßstab setzen.',
    sub: 'Die Software-Manufaktur mit echtem Anspruch.',
  },
  lead: {
    primaryHtml:
      'Seit über zehn Jahren entwickeln wir Plattformen für <a href="#work">den Mittelstand</a>, <a href="#work">Startups</a> und <a href="#work">Konzerne</a>, beraten <a href="#leistungen">technische Teams</a> und bringen <a href="#leistungen">KI in Produktion</a>.',
    secondary:
      'Im Rheinland zuhause, remote überall. Senior-Entwickler:innen statt Schichten — lauffähige Software statt Slides.',
  },
}
