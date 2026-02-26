# Pixpage

A retro pixel art personal portfolio . Sections are navigated by the character walking across a parallax scrolling game world.

Site is still work-in-progress. More regions to come + cleaner portfolio book.

[Check it out :)](https://teletobe.github.io/pixelpage/)

## Features

- **Game world** — Character walks between scenes (About, Photography, Experience, Contact) with idle/walk/run animations and clickable speech bubbles
- **Parallax scrolling** — Layered sky, scenery, and animated grass tiles
- **Photobook** — portfolio photos in a book-style modal, 4 at a time, keyboard navigable - WIP + **Experience rooms** — Education and work history as clickable boxes
- **Bilingual** — EN/DE switching through toggled in the navbar

## Tech

Plain HTML5, CSS3, and vanilla JavaScript

## Structure

```
pixpage/
├── index.html
├── css/
│   ├── base.css          # Global reset & pixel-art styles
│   ├── navigation.css
│   ├── game-world.css    # Viewport, parallax, sprites
│   ├── content.css
│   ├── modals.css
│   └── responsive.css
├── js/
│   ├── data.js           # Content & translations
│   ├── app.js            # State & initialization
│   ├── scene.js          # Scene navigation & parallax
│   ├── photobook.js
│   └── experience.js
└── img/
    ├── player/           # Sprites
    ├── photobook/        # Portfolio photos
    └── ...               # backgrounds, grass, sky
```
