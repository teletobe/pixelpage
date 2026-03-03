export type AustriaState =
  | 'wien'
  | 'niederoesterreich'
  | 'oberoesterreich'
  | 'salzburg'
  | 'tirol'
  | 'vorarlberg'
  | 'steiermark'
  | 'kaernten'
  | 'burgenland'
  | 'allgemein'; // österreichweit

export interface DialektWord {
  id: string;
  word: string;           // Das Dialektwort
  translation: string;   // Hochdeutsche Übersetzung
  alternates?: string[]; // Andere akzeptierte Antworten
  description: string;   // Herkunft und Kontext
  region: AustriaState;
  dialectGroup: string;  // z.B. "Wienerisch", "Tirolerisch"
  example?: string;      // Beispielsatz
}

export interface GuessRecord {
  wordId: string;
  text: string;
  timestamp: number;
}

export type GamePhase = 'filter' | 'guessing' | 'revealed';
