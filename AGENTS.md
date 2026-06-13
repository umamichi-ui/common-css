# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **build-only CSS package** (`@umamichi-ui/common-css`): shared design tokens + UI primitives consumed by other projects. There is **no server, database, dev server, or test suite**.

- Build (the only meaningful command): `npm run build`. It runs `scripts/generate-palettes.mjs` (regenerates `styles/palettes/index.css` + `dist/palettes.json` from `styles/palettes/*.css`) then PostCSS compiles `styles/**/*.css` → `dist/` with sRGB/Display-P3/OKLCH `@supports` fallbacks. See `package.json` scripts.
- `npm install` auto-runs the build via the `prepare` hook, so `dist/` is populated after install.
- There are **no `lint` or `test` scripts**; do not invent them.
- Generated artifacts `dist/` and `styles/palettes/index.css` are gitignored — never commit them. Edit sources under `styles/` instead.
- Adding a palette: create `styles/palettes/<id>.css` containing a `/* @palette label: ... intro: ... */` block and a `--theme-500:` value, then run `npm run build`; the generator picks it up automatically and validates the metadata (missing `--theme-500`/`label`/`intro` throws).
- Previewing styles: the repo ships no demo page. Build, then point an HTML file at `dist/index.css` (+ optionally `dist/palettes/index.css`, set `data-palette` on `<html>`, toggle `html.dark` for dark mode) and serve it with any static server.
