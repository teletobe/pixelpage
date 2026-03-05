import { STATE_LABELS, getRandomWord } from './data';
import { renderGeoMap } from './map';
import type { FeatureCollection } from 'geojson';
import _geoData from '../map/atstates.json';
const geoData = _geoData as unknown as FeatureCollection;
import { getGuessesForWord, addGuess } from './storage';
import type { DialektWord, GamePhase, AustriaState } from './types';
import './style.css';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// States with enough word data to be selectable
const AVAILABLE_STATES: AustriaState[] = ['wien', 'tirol'];

const ALL_DISPLAY_STATES: AustriaState[] = [
  'wien',
  'niederoesterreich',
  'oberoesterreich',
  'salzburg',
  'tirol',
  'vorarlberg',
  'steiermark',
  'kaernten',
  'burgenland',
];

// GeoJSON properties.name → AustriaState key
const NAME_TO_STATE: Record<string, AustriaState> = {
  Wien: 'wien',
  Niederösterreich: 'niederoesterreich',
  Oberösterreich: 'oberoesterreich',
  Salzburg: 'salzburg',
  Tirol: 'tirol',
  Vorarlberg: 'vorarlberg',
  Steiermark: 'steiermark',
  Kärnten: 'kaernten',
  Burgenland: 'burgenland',
};

// AustriaState key → GeoJSON properties.name
const GEOJSON_NAME: Record<AustriaState, string | null> = {
  wien: 'Wien',
  niederoesterreich: 'Niederösterreich',
  oberoesterreich: 'Oberösterreich',
  salzburg: 'Salzburg',
  tirol: 'Tirol',
  vorarlberg: 'Vorarlberg',
  steiermark: 'Steiermark',
  kaernten: 'Kärnten',
  burgenland: 'Burgenland',
  allgemein: null,
};

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let currentWord: DialektWord;
let phase: GamePhase = 'filter';
let selectedRegions = new Set<AustriaState>(AVAILABLE_STATES);
// Explicit "all of Austria" mode
let allAustria = true;

// ---------------------------------------------------------------------------
// Rendering helpers
// ---------------------------------------------------------------------------

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function regionIndicator(): string {
  const label = allAustria
    ? 'Ganz Österreich'
    : [...selectedRegions].map((s) => STATE_LABELS[s]).join(', ');
  return `<button id="filter-btn" class="region-indicator-btn">↩ ${escapeHtml(label)}</button>`;
}

function renderRevealMap(region: AustriaState): string {
  const name = GEOJSON_NAME[region];
  const svg = renderGeoMap(geoData, {
    activeStates: name ? [name] : [],
    allActive: region === 'allgemein',
  });
  return `
    <figure class="map-wrap">
      ${svg}
      <figcaption class="map-caption">${STATE_LABELS[region]}</figcaption>
    </figure>`;
}

function renderGuessList(wordId: string): string {
  const guesses = getGuessesForWord(wordId);
  if (guesses.length === 0) return '';
  const sorted = [...guesses]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 24);
  const items = sorted
    .map((g) => `<li class="guess-chip">${escapeHtml(g.text)}</li>`)
    .join('');
  return `
    <div class="guesses-panel">
      <p class="guesses-label">Was andere geraten haben <span class="guesses-count">${guesses.length}</span></p>
      <ul class="guesses-list">${items}</ul>
    </div>`;
}

// ---------------------------------------------------------------------------
// Phase renderers
// ---------------------------------------------------------------------------

function renderFilter(): string {
  const activeGeoNames = allAustria
    ? []
    : ([...selectedRegions].map((s) => GEOJSON_NAME[s]).filter(Boolean) as string[]);

  const svg = renderGeoMap(geoData, {
    activeStates: activeGeoNames,
    allActive: allAustria,
  });

  const chips = ALL_DISPLAY_STATES.map((state) => {
    const available = AVAILABLE_STATES.includes(state);
    if (!available) {
      return `<button class="region-chip region-chip--disabled" disabled>${STATE_LABELS[state]}</button>`;
    }
    const active = !allAustria && selectedRegions.has(state);
    return `<button class="region-chip${active ? ' region-chip--active' : ''}" data-region="${state}">${STATE_LABELS[state]}</button>`;
  }).join('');

  return `
    <div class="game-card">
      <p class="word-label">Welche Region?</p>
      <div class="filter-map-wrap">${svg}</div>
      <div class="region-chips">${chips}</div>
      <p class="region-coming-soon">Weitere Bundesländer folgen bald.</p>
      <div class="filter-footer">
        <button id="all-btn" class="btn btn--ghost${allAustria ? ' btn--active' : ''}">Alle Bundesländer</button>
        <button id="start-btn" class="btn btn--primary">Los! →</button>
      </div>
    </div>`;
}

function renderGuessing(): string {
  return `
    <div class="game-card">
      ${regionIndicator()}
      <p class="word-label">Welches Wort steckt dahinter?</p>
      <h1 class="dialect-word">${escapeHtml(currentWord.word)}</h1>
      <p class="dialect-group">${escapeHtml(currentWord.dialectGroup)}</p>
      <div class="input-area">
        <input
          type="text"
          id="guess-input"
          class="guess-input"
          placeholder="Deine Antwort auf Deutsch..."
          autocomplete="off"
          spellcheck="false"
        />
        <div class="button-row">
          <button id="submit-btn" class="btn btn--primary">Raten</button>
          <button id="noidea-btn" class="btn btn--ghost">Keine Ahnung</button>
        </div>
      </div>
    </div>`;
}

function renderRevealed(): string {
  const example = currentWord.example
    ? `<blockquote class="example">${escapeHtml(currentWord.example)}</blockquote>`
    : '';

  return `
    <div class="game-card">
      <p class="word-label">Das Wort war:</p>
      <h1 class="dialect-word">${escapeHtml(currentWord.word)}</h1>
      <p class="dialect-group">${escapeHtml(currentWord.dialectGroup)}</p>

      <div class="reveal-panel">
        <div class="translation-row">
          <span class="translation-label">Hochdeutsch</span>
          <span class="translation-value">${escapeHtml(currentWord.translation)}</span>
        </div>
        ${example}
        <p class="description">${escapeHtml(currentWord.description)}</p>
        ${renderRevealMap(currentWord.region)}
      </div>

      ${renderGuessList(currentWord.id)}

      <button id="next-btn" class="btn btn--primary btn--full">Nächstes Wort →</button>
    </div>`;
}

// ---------------------------------------------------------------------------
// Main render + event wiring
// ---------------------------------------------------------------------------

function wireFilterEvents(): void {
  // Map path clicks — only available states react
  document
    .querySelector('.filter-map-wrap .austria-map')
    ?.addEventListener('click', (e) => {
      const path = (e.target as Element).closest<SVGPathElement>('[data-state]');
      if (!path) return;
      const state = NAME_TO_STATE[path.dataset.state ?? ''];
      if (!state || !AVAILABLE_STATES.includes(state)) return;
      selectSpecific(state);
    });

  // Chip buttons
  document
    .querySelectorAll<HTMLButtonElement>('.region-chip:not([disabled])')
    .forEach((btn) => {
      btn.addEventListener('click', () => {
        selectSpecific(btn.dataset.region as AustriaState);
      });
    });

  document.getElementById('all-btn')?.addEventListener('click', () => {
    allAustria = true;
    render();
  });

  document.getElementById('start-btn')?.addEventListener('click', handleStartGame);
}

// Switch into specific-state mode and toggle the given state.
function selectSpecific(state: AustriaState): void {
  if (allAustria) {
    allAustria = false;
    selectedRegions = new Set([state]);
  } else {
    if (selectedRegions.has(state)) {
      if (selectedRegions.size > 1) selectedRegions.delete(state);
    } else {
      selectedRegions.add(state);
    }
  }
  render();
}

function render(): void {
  const app = document.getElementById('app');
  if (!app) return;

  if (phase === 'filter') {
    app.innerHTML = renderFilter();
    wireFilterEvents();
    return;
  }

  app.innerHTML = phase === 'guessing' ? renderGuessing() : renderRevealed();

  if (phase === 'guessing') {
    const input = document.getElementById('guess-input') as HTMLInputElement | null;
    input?.focus();
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSubmit();
    });
    document.getElementById('submit-btn')?.addEventListener('click', handleSubmit);
    document.getElementById('noidea-btn')?.addEventListener('click', handleNoIdea);
    document.getElementById('filter-btn')?.addEventListener('click', handleBackToFilter);
  } else {
    document.getElementById('next-btn')?.addEventListener('click', handleNext);
  }
}

// ---------------------------------------------------------------------------
// Event handlers
// ---------------------------------------------------------------------------

function activeRegions(): AustriaState[] {
  return allAustria ? ['allgemein'] : [...selectedRegions];
}

function handleStartGame(): void {
  currentWord = getRandomWord(undefined, activeRegions());
  phase = 'guessing';
  render();
}

function handleBackToFilter(): void {
  phase = 'filter';
  render();
}

function handleSubmit(): void {
  const input = document.getElementById('guess-input') as HTMLInputElement | null;
  const guess = input?.value.trim() ?? '';
  if (!guess) {
    input?.focus();
    return;
  }
  addGuess(currentWord.id, guess);
  phase = 'revealed';
  render();
}

function handleNoIdea(): void {
  addGuess(currentWord.id, '🤷 keine Ahnung');
  phase = 'revealed';
  render();
}

function handleNext(): void {
  // After revealing, go back to the map so the user can pick their region again
  phase = 'filter';
  render();
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
render();
