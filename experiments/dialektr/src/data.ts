import type { DialektWord, AustriaState } from './types';
import { ALLGEMEIN_WORDS } from './words/allgemein';
import { WIEN_WORDS } from './words/wien';
import { NIEDEROESTERREICH_WORDS } from './words/niederoesterreich';
import { SALZBURG_WORDS } from './words/salzburg';
import { TIROL_WORDS } from './words/tirol';

export const STATE_LABELS: Record<AustriaState, string> = {
  wien: 'Wien',
  niederoesterreich: 'Niederösterreich',
  oberoesterreich: 'Oberösterreich',
  salzburg: 'Salzburg',
  tirol: 'Tirol',
  vorarlberg: 'Vorarlberg',
  steiermark: 'Steiermark',
  kaernten: 'Kärnten',
  burgenland: 'Burgenland',
  allgemein: 'Österreich (allgemein)',
};

// -----------------------------------------------------------------------
// WÖRTERLISTE — neue Wörter in words/<region>.ts hinzufügen
// -----------------------------------------------------------------------
export const WORDS: DialektWord[] = [
  ...ALLGEMEIN_WORDS,
  ...WIEN_WORDS,
  ...NIEDEROESTERREICH_WORDS,
  ...SALZBURG_WORDS,
  ...TIROL_WORDS,
];

export function getRandomWord(excludeId?: string, allowedRegions?: AustriaState[]): DialektWord {
  let pool = excludeId ? WORDS.filter((w) => w.id !== excludeId) : [...WORDS];
  if (allowedRegions && allowedRegions.length > 0) {
    const filtered = pool.filter((w) => allowedRegions.includes(w.region));
    if (filtered.length > 0) pool = filtered;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}
