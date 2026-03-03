import type { GuessRecord } from './types';

const STORAGE_KEY = 'dialektr_guesses_v1';

// Seeded fake guesses so the game feels populated from the start
const SEED_DATA: GuessRecord[] = [
  { wordId: 'paradeiser', text: 'Tomate', timestamp: Date.now() - 86400000 * 5 },
  { wordId: 'paradeiser', text: 'rote Frucht irgendwie?', timestamp: Date.now() - 86400000 * 4 },
  { wordId: 'paradeiser', text: 'Tomaten', timestamp: Date.now() - 86400000 * 3 },
  { wordId: 'paradeiser', text: '🤷 keine Ahnung', timestamp: Date.now() - 86400000 * 2 },
  { wordId: 'erdaepfel', text: 'Kartoffel', timestamp: Date.now() - 86400000 * 6 },
  { wordId: 'erdaepfel', text: 'Knolle aus der Erde', timestamp: Date.now() - 86400000 * 4 },
  { wordId: 'erdaepfel', text: '🤷 keine Ahnung', timestamp: Date.now() - 86400000 * 3 },
  { wordId: 'marille', text: 'Aprikose', timestamp: Date.now() - 86400000 * 3 },
  { wordId: 'marille', text: 'eine Art Pfirsich?', timestamp: Date.now() - 86400000 * 2 },
  { wordId: 'marille', text: 'Frucht', timestamp: Date.now() - 86400000 },
  { wordId: 'topfen', text: 'Quark', timestamp: Date.now() - 86400000 * 5 },
  { wordId: 'topfen', text: 'Käse', timestamp: Date.now() - 86400000 * 3 },
  { wordId: 'topfen', text: 'Joghurt?', timestamp: Date.now() - 86400000 * 2 },
  { wordId: 'oida', text: 'Alter', timestamp: Date.now() - 86400000 * 4 },
  { wordId: 'oida', text: 'Hey Leute', timestamp: Date.now() - 86400000 * 3 },
  { wordId: 'oida', text: 'Ausruf der Überraschung', timestamp: Date.now() - 86400000 * 2 },
  { wordId: 'oida', text: '🤷 keine Ahnung', timestamp: Date.now() - 86400000 },
  { wordId: 'schlagobers', text: 'Schlagsahne', timestamp: Date.now() - 86400000 * 4 },
  { wordId: 'schlagobers', text: 'Sahne', timestamp: Date.now() - 86400000 * 2 },
  { wordId: 'schlagobers', text: 'Rahm', timestamp: Date.now() - 86400000 },
  { wordId: 'hawara', text: 'Freund', timestamp: Date.now() - 86400000 * 3 },
  { wordId: 'hawara', text: 'Kumpel', timestamp: Date.now() - 86400000 * 2 },
  { wordId: 'hawara', text: '🤷 keine Ahnung', timestamp: Date.now() - 86400000 },
  { wordId: 'jause', text: 'Snack', timestamp: Date.now() - 86400000 * 4 },
  { wordId: 'jause', text: 'Brotzeit', timestamp: Date.now() - 86400000 * 2 },
  { wordId: 'jause', text: 'kleine Mahlzeit', timestamp: Date.now() - 86400000 },
  { wordId: 'semmel', text: 'Brötchen', timestamp: Date.now() - 86400000 * 5 },
  { wordId: 'semmel', text: 'Brot', timestamp: Date.now() - 86400000 * 3 },
  { wordId: 'powidl', text: 'Pflaumenmus', timestamp: Date.now() - 86400000 * 3 },
  { wordId: 'powidl', text: 'Marmelade', timestamp: Date.now() - 86400000 * 2 },
  { wordId: 'powidl', text: '🤷 keine Ahnung', timestamp: Date.now() - 86400000 },
  { wordId: 'palatschinken', text: 'Pfannkuchen', timestamp: Date.now() - 86400000 * 4 },
  { wordId: 'palatschinken', text: 'Crêpe', timestamp: Date.now() - 86400000 * 3 },
  { wordId: 'heurigen', text: 'Weinlokal', timestamp: Date.now() - 86400000 * 4 },
  { wordId: 'heurigen', text: '🤷 keine Ahnung', timestamp: Date.now() - 86400000 * 2 },
  { wordId: 'nockerln', text: 'Knödel', timestamp: Date.now() - 86400000 * 3 },
  { wordId: 'nockerln', text: 'Spätzle?', timestamp: Date.now() - 86400000 * 2 },
  { wordId: 'sturm', text: 'Federweißer', timestamp: Date.now() - 86400000 * 3 },
  { wordId: 'sturm', text: 'junger Wein', timestamp: Date.now() - 86400000 * 2 },
  { wordId: 'sturm', text: '🤷 keine Ahnung', timestamp: Date.now() - 86400000 },
];

function load(): GuessRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as GuessRecord[];
  } catch {
    // ignore parse errors
  }
  // First visit: save seed data
  save(SEED_DATA);
  return [...SEED_DATA];
}

function save(records: GuessRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // ignore storage errors (e.g. private mode quota)
  }
}

export function getGuessesForWord(wordId: string): GuessRecord[] {
  return load().filter((r) => r.wordId === wordId);
}

export function addGuess(wordId: string, text: string): void {
  const records = load();
  records.push({ wordId, text, timestamp: Date.now() });
  save(records);
}
