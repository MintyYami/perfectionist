# Perfectionist

A browser game about precision: you're given a random percentage and have to hit it as exactly as you can, by dragging an angle, filling a water tank, moving a slider, and so on.

Built with React, TypeScript and Vite, and hosted on GitHub Pages.

## Getting started

Requires [Node.js](https://nodejs.org/) (LTS).

```sh
npm install
npm run dev
```

Then open http://localhost:5173/.

## Scripts

| Command           | What it does                                       |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload               |
| `npm run build`   | Type-check and build the production site to `dist/` |
| `npm run preview` | Serve the production build locally                 |
| `npm run lint`    | Lint the code with Oxlint                          |


## Deployment

The site is published at `https://mintyyami.github.io/perfectionist/`.

Production builds use `/perfectionist/` as the base path (see `vite.config.ts`) so asset URLs match the GitHub Pages project URL. If the repository is renamed, update `base` to match.
