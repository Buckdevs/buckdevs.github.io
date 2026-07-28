# buckdevs.github.io

Personal site for **Andrew Buck** — product marketing in the age of AI.
Live at <https://buckdevs.github.io>.

## What this is

A single, hand-built static page. No framework, no build step, no dependencies —
just `index.html`, `styles.css`, `script.js`, and self-hosted fonts. That's the
whole point: fast, durable, easy to edit.

## Editing

- **Copy / sections** → `index.html`
- **Look & feel** (colors, type, spacing) → `styles.css`. The design tokens live
  at the top under `:root` — change `--accent`, `--paper`, `--ink` there to
  re-skin the whole site.
- **Interaction** (the product ⇄ marketing merge, scroll reveals, clock) →
  `script.js`

Open `index.html` directly in a browser to preview, or run a tiny local server:

```bash
python -m http.server 8080
```

## Fonts

Self-hosted WOFF2 in `fonts/` — Bricolage Grotesque (display), Hanken Grotesk
(body), JetBrains Mono (labels). All open-licensed via Google Fonts. No external
requests, no tracking.

## Deploy

This repo is a GitHub **user Pages** site: pushing to the default branch publishes
automatically to <https://buckdevs.github.io>. `.nojekyll` tells Pages to serve
the files as-is.
