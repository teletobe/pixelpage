import { AUSTRIA_SVG, STATE_LABELS, getRandomWord } from './data';
import { getGuessesForWord, addGuess } from './storage';
import type { DialektWord, GamePhase, AustriaState } from './types';
import './style.css';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let currentWord: DialektWord = getRandomWord();
let phase: GamePhase = 'guessing';
let lastGuess = '';
let lastNoIdea = false;

// ---------------------------------------------------------------------------
// Answer checking
// ---------------------------------------------------------------------------
function checkAnswer(guess: string): 'correct' | 'close' | 'wrong' {
  const g = guess.toLowerCase().trim();
  const t = currentWord.translation.toLowerCase();
  const alts = (currentWord.alternates ?? []).map((a) => a.toLowerCase());
  const allTargets = [t, ...alts];

  if (allTargets.includes(g)) return 'correct';
  if (allTargets.some((a) => a.includes(g) || g.includes(a))) return 'close';
  return 'wrong';
}

// ---------------------------------------------------------------------------
// Rendering helpers
// ---------------------------------------------------------------------------
function renderMap(region: AustriaState): string {
  const isAllgemein = region === 'allgemein';
  const paths = Object.entries(AUSTRIA_SVG.states)
    .map(([state, d]) => {
      const active = isAllgemein || state === region;
      return `<path d="${d}" class="map-state${active ? ' map-state--active' : ''}" />`;
    })
    .join('');
  return `
    <figure class="map-wrap">
      <svg viewBox="${AUSTRIA_SVG.viewBox}" class="austria-map" xmlns="http://www.w3.org/2000/svg">
        ${paths}
      </svg>
      <figcaption class="map-caption">${STATE_LABELS[region]}</figcaption>
    </figure>`;
}

function renderGuessList(wordId: string): string {
  const guesses = getGuessesForWord(wordId);
  if (guesses.length === 0) return '';
  const sorted = [...guesses]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 24);
  const items = sorted.map((g) => `<li class="guess-chip">${escapeHtml(g.text)}</li>`).join('');
  return `
    <div class="guesses-panel">
      <p class="guesses-label">Was andere geraten haben <span class="guesses-count">${guesses.length}</span></p>
      <ul class="guesses-list">${items}</ul>
    </div>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------------
// Phase renderers
// ---------------------------------------------------------------------------
function renderGuessing(): string {
  return `
    <div class="game-card">
      <p class="word-label">Welches Hochdeutsche Wort steckt dahinter?</p>
      <h1 class="dialect-word">${escapeHtml(currentWord.word)}</h1>
      <p class="dialect-group">${escapeHtml(currentWord.dialectGroup)}</p>
      <div class="input-area">
        <input
          type="text"
          id="guess-input"
          class="guess-input"
          placeholder="Deine Antwort auf Hochdeutsch…"
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
  let feedback = '';
  if (lastNoIdea) {
    feedback = `<div class="feedback feedback--neutral">Kein Problem — jetzt weißt du's!</div>`;
  } else {
    const result = checkAnswer(lastGuess);
    if (result === 'correct') {
      feedback = `<div class="feedback feedback--correct">Richtig! 🎉</div>`;
    } else if (result === 'close') {
      feedback = `<div class="feedback feedback--close">Fast! Die Lösung: <strong>${escapeHtml(currentWord.translation)}</strong></div>`;
    } else {
      feedback = `<div class="feedback feedback--wrong">Nicht ganz. Die Lösung: <strong>${escapeHtml(currentWord.translation)}</strong></div>`;
    }
  }

  const example = currentWord.example
    ? `<blockquote class="example">${escapeHtml(currentWord.example)}</blockquote>`
    : '';

  return `
    <div class="game-card">
      <p class="word-label">Das Wort war:</p>
      <h1 class="dialect-word">${escapeHtml(currentWord.word)}</h1>
      <p class="dialect-group">${escapeHtml(currentWord.dialectGroup)}</p>

      ${feedback}

      <div class="reveal-panel">
        <div class="translation-row">
          <span class="translation-label">Hochdeutsch</span>
          <span class="translation-value">${escapeHtml(currentWord.translation)}</span>
        </div>
        ${example}
        <p class="description">${escapeHtml(currentWord.description)}</p>
        ${renderMap(currentWord.region)}
      </div>

      ${renderGuessList(currentWord.id)}

      <button id="next-btn" class="btn btn--primary btn--full">Nächstes Wort →</button>
    </div>`;
}

// ---------------------------------------------------------------------------
// Main render + event wiring
// ---------------------------------------------------------------------------
function render(): void {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = phase === 'guessing' ? renderGuessing() : renderRevealed();

  if (phase === 'guessing') {
    const input = document.getElementById('guess-input') as HTMLInputElement | null;
    input?.focus();
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSubmit();
    });
    document.getElementById('submit-btn')?.addEventListener('click', handleSubmit);
    document.getElementById('noidea-btn')?.addEventListener('click', handleNoIdea);
  } else {
    document.getElementById('next-btn')?.addEventListener('click', handleNext);
  }
}

function handleSubmit(): void {
  const input = document.getElementById('guess-input') as HTMLInputElement | null;
  const guess = input?.value.trim() ?? '';
  if (!guess) {
    input?.focus();
    return;
  }
  addGuess(currentWord.id, guess);
  lastGuess = guess;
  lastNoIdea = false;
  phase = 'revealed';
  render();
}

function handleNoIdea(): void {
  addGuess(currentWord.id, '🤷 keine Ahnung');
  lastGuess = '';
  lastNoIdea = true;
  phase = 'revealed';
  render();
}

function handleNext(): void {
  currentWord = getRandomWord(currentWord.id);
  phase = 'guessing';
  lastGuess = '';
  lastNoIdea = false;
  render();
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
render();
