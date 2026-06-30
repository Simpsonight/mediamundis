import type { SiteContent } from './types';

export const site: SiteContent = {
  email: 'hello@mediamundis.de',
  location: 'Rheinland · remote überall',
  navLinks: [
    { href: '#ueber-uns', label: 'Über uns' },
    { href: '#leistungen', label: 'Leistungen' },
    { href: '#work', label: 'Work' },
  ],
  legalLinks: [
    { href: '/impressum', label: 'Impressum' },
    { href: '/datenschutz', label: 'Datenschutz' },
  ],
  hero: {
    lead: 'Wir entwickeln Individualsoftware, digitale Plattformen und KI-gestützte Prozessautomatisierung — und beraten Teams ',
    faded: 'von der Idee bis in Produktion.',
    sub: 'mediamundis ist die Software-Manufaktur aus dem Rheinland — Entwicklung, KI und Prozessberatung seit über zehn Jahren.',
  },
  lead: {
    primaryHtml:
      'Seit über zehn Jahren entwickeln wir Plattformen für <a href="#work">den Mittelstand</a>, <a href="#work">Startups</a> und <a href="#work">Konzerne</a>, beraten <a href="#leistungen">technische Teams</a> und bringen <a href="#leistungen">KI in Produktion</a>.',
    secondary:
      'Im Rheinland zuhause, remote überall. Senior-Entwickler:innen statt Schichten — lauffähige Software statt Slides. Im Rheinland zuhause, remote überall. Senior-Entwickler:innen statt Schichten — lauffähige Software statt Slides. Im Rheinland zuhause, remote überall. Senior-Entwickler:innen statt Schichten — lauffähige Software statt Slides. Im Rheinland zuhause, remote überall. Senior-Entwickler:innen statt Schichten — lauffähige Software statt Slides.',
  },
};
