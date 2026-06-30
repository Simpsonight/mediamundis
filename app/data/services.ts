import type { Service } from './types';

/**
 * Glyphs are 17×17 dot bitmaps ('#' = icon dot), centered on the grid. Each
 * lights out of the neutral grey dot field as the card scrolls, in a direction
 * that fits the motif.
 */

// </> — code brackets, types in from the top
const codeGlyph = [
  '.................',
  '.................',
  '.................',
  '.................',
  '......#...#......',
  '.....#.....#.....',
  '....#.......#....',
  '...#.........#...',
  '..#...........#..',
  '...#.........#...',
  '....#.......#....',
  '.....#.....#.....',
  '......#...#......',
  '.................',
  '.................',
  '.................',
  '.................',
];

// ↗ — growth arrow (pointed head + bold shaft), rises from the bottom
const growthGlyph = [
  '.................',
  '.................',
  '.................',
  '.................',
  '.......######....',
  '........#####....',
  '.........####....',
  '.........####....',
  '........##.##....',
  '.......##...#....',
  '......##.........',
  '.....##..........',
  '....##...........',
  '...##............',
  '.................',
  '.................',
  '.................',
];

// ✦ — spark, ignites from the center outward
const sparkGlyph = [
  '.................',
  '.................',
  '.................',
  '........#........',
  '........#........',
  '........#........',
  '.......###.......',
  '......#####......',
  '...###########...',
  '......#####......',
  '.......###.......',
  '........#........',
  '........#........',
  '........#........',
  '.................',
  '.................',
  '.................',
];

export const services: Service[] = [
  {
    id: 'software-development',
    title: 'Software Development',
    body: 'Gute Software läuft. Großartige Software trägt Unternehmen über Jahre — von der Architektur bis zum Betrieb.',
    tags: ['Web & API', 'Cloud-native', 'CI/CD', 'Plattformen'],
    glyph: codeGlyph,
    reveal: 'top',
  },
  {
    id: 'consulting',
    title: 'Consulting',
    body: 'Wachstum erzeugt Chaos. Wir bringen Strategie, Reviews und Enablement, damit Teams schneller und sicherer liefern.',
    tags: ['Architektur-Reviews', 'Tech-Due-Diligence', 'Team-Enablement'],
    glyph: growthGlyph,
    reveal: 'bottom',
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    body: 'KI als Demo ist einfach. KI in Produktion ist die Arbeit — evaluierbar, abgesichert, im Betrieb getestet.',
    tags: ['LLM & RAG', 'Automatisierung', 'Evaluation', 'Guardrails'],
    glyph: sparkGlyph,
    reveal: 'center',
  },
];
