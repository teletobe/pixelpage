/* ================================================================
   app.js — Mode switching
   ================================================================ */

function setMode(mode) {
  document.getElementById('wizard-mode').classList.toggle('active', mode === 'wizard');
  document.getElementById('coord-mode').classList.toggle('active', mode === 'coord');
  document.getElementById('baukasten-mode').classList.toggle('active', mode === 'baukasten');
  document.getElementById('btn-wizard').classList.toggle('active', mode === 'wizard');
  document.getElementById('btn-coord').classList.toggle('active', mode === 'coord');
  document.getElementById('btn-bk').classList.toggle('active', mode === 'baukasten');
}
