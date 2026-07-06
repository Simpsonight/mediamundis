import type { Client } from './types';

const base = '/references/logos';

/**
 * Real client logos. Rendered monochrome (greyscale) and restored to full
 * colour on hover by ClientLogo. `scale` fine-tunes optical weight because the
 * source files differ wildly in proportion (wide wordmarks vs. tall crest).
 */
export const clients: Client[] = [
  { name: '1. FC Köln', src: `${base}/1fc-koeln.svg`, scale: 1.75 },
  { name: 'RTL', src: `${base}/rtl.svg`, scale: 0.9 },
  { name: 'Fressnapf', src: `${base}/fressnapf.svg` },
  { name: 'toom Baumarkt', src: `${base}/toom-baumarkt.svg` },
  { name: 'Medion', src: `${base}/Medion_logo.svg` },
  { name: 'HDI', src: `${base}/HDI-Logo.svg`, scale: 0.9 },
  { name: 'C&A', src: `${base}/canda.svg`, scale: 1.15 },
  { name: 'Steiff', src: `${base}/Steiff_logo.svg`, scale: 1.15 },
  { name: 'Tippkemper-Maternus', src: `${base}/tippkemper.svg` },
  { name: 'Europa', src: `${base}/europa.svg` },
  { name: 'Martin Schopps', src: `${base}/martin-schopps.png`, scale: 1.5 },
  { name: 'C+', src: `${base}/cplus.avif` },
];
