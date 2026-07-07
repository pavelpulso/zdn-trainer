# Защитись! Договорись! Насладись! — online trainer

> A negotiation-skills trainer that rebuilds Albert Safin's card game «Защитись! Договорись! Насладись!» ("Defend! Negotiate! Enjoy!") as a fast, offline-first web app — in Russian and English.

**Live demo:** _<add Vercel URL>_

The original online trainer at [qcic.ru/k-online](https://qcic.ru/k-online/) went dark — only the instructions and a few static images were left. This project brings it back as a real, self-contained app, and takes it further: a full text dataset, two languages, per-card control, and a training journal.

---

## What it does

Verbal aikido, one round at a time. A manipulation ("крючок") comes at you; you learn to answer it with five techniques:

1. **Inner defense** — notice what you're being pushed to *think / feel / do*, and choose your own.
2. **De-escalation** — take the heat out of the exchange.
3. **Speech strategy** — minimize harm, extract value.
4. **Seize with a question** — take back the initiative.
5. **Principle** — reframe toward cooperation.

A guided six-step flow walks you through it, and everything you write is saved to a local journal.

### Features

- **Two languages (RU / EN)** — the entire UI *and* all card content, switchable live.
- **Two modes** — quick hooks, or 100 real-life **scenarios** across 10 areas of life (work, family, money, relationships…), each with a coaching read: who says it, the trap, and the charitable interpretation.
- **Per-card refresh** — don't like a de-escalation, a question, or a principle? Swap just that card without re-dealing the rest.
- **Original card view** — see the author's original card image behind any technique.
- **Progress** — round counter, day streak, hooks practiced; journal persists in `localStorage`.
- **Offline-first** — no backend, no external calls at runtime. Fonts and images are bundled.

---

## How this was built — engineering with AI, deliberately

The interesting part isn't the framework choice. It's that the entire dataset had to be **recovered and reconstructed**, and I ran that as an AI-orchestrated pipeline while keeping the engineering decisions my own:

- **Reverse-engineered the dead trainer** with headless browser automation — found that the six card categories were served as randomized images under `/images/zdn-4/*`, and that exactly one card (the awareness formula) never rotates while the other five do.
- **Scraped 200 manipulations + 100 structured scenarios** from the live site and normalized them into clean JSON.
- **OCR'd ~85 card images into text** by fanning out parallel AI subagents — one per category — so the cards render in the app's own typography instead of as flat pictures (searchable, themeable, animatable, accessible).
- **Translated 600+ content strings to English** the same way: parallel translation agents writing mirrored `*.en.json`, with the manipulative tone deliberately preserved.
- **Designed a distinctive UI** — a dark "verbal-aikido console" where each technique keeps a meaning-color, the incoming hook reads as an attack, and "new combination" deals the cards. Cyrillic-first type pairing (Unbounded + Golos Text), self-hosted for offline use.

The takeaway: AI wasn't a code autocomplete here — it was leverage for the parts that would otherwise be days of manual transcription and translation, directed by hand where judgment mattered (data model, i18n architecture, what to keep as image vs. text, respecting the source).

---

## Tech stack

- **Vue 3** (`<script setup>`) + **Vite**
- Lightweight custom **i18n** (reactive locale, persisted, pluralization)
- **localStorage** for journal and progress — no backend
- Self-hosted fonts via `@fontsource` (Unbounded, Golos Text)
- Static build — deploys to any static host (Vercel, Netlify, GitHub Pages)

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Project structure

```
src/
├── i18n/            reactive locale + all UI strings (ru/en)
├── data/            hooks + scenarios + OCR'd card text (ru + *.en.json)
├── composables/     useDeck (deck logic), useJournal, useProgress
├── components/      HookCard, TechniqueCard, TechniqueIcon, StepPanel
└── modules/         TrainerFlow (6-step flow), JournalView
public/cards/        original card images (fallback / "show original")
```

---

## Credits & rights

Method and card material by **Albert Safin** — the [QCIC](https://qcic.ru) project. The physical game is available on Ozon. This is an **unofficial educational trainer** for self-study, built out of appreciation for the method. If you represent the author and want changes, open an issue.

Built by **Ilya**.
