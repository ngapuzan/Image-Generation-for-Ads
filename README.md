# Ride Studio

A starter app for bicycle advertising: generate or upload a base image, then edit text, graphics, backgrounds, brightness, contrast, saturation, grain, and vignette locally. Image generation is separate from editing.

## Start coding

Requires Node.js 24 and npm 11. Use the existing checkout; cloud tasks are already isolated and do not need a Git worktree.

```sh
npm ci
npm run dev
```

The development server listens on port 3000. `PORT` overrides the default. npm caches stay in the checkout's `.cache/npm` directory, so setup works in restricted cloud workspaces.

```sh
npm test          # generation input validation and prompt tests
npm run build    # production frontend build
npm start        # serve the built frontend and API
```

## Layout

- `src/main.jsx` — React editor UI
- `src/editor.js` — canvas composition, export, project validation and local storage
- `src/sample.js` — original vector starter artwork
- `src/style.css` — responsive styling
- `server/index.js` — Express API and Vite development middleware
- `server/generation.js` — generation presets and validation
- `tests/` — Node tests and browser smoke tests

## Optional AI generation

The editor and uploads work without credentials. To enable paid image generation, copy `.env.example` to `.env`, set `IMAGE_API_KEY` securely, and restart the server. Never commit or paste a real key into chat. `IMAGE_MODEL` defaults to `gpt-image-1`; the key needs access to that model. The server needs HTTPS access to `api.openai.com`.

“Complete scene” creates a bike and environment together. “Transparent bike” creates a cutout that can be placed over interchangeable backgrounds. Full scene photos retain their original background. Only **Generate base photo** calls the image provider. Canceling the wait does not guarantee cancellation or prevent provider charges.

The original Dark Bike Ads and Outdoor Action Bike Ads skill archives are retained unchanged in `skills/`. Generation defaults follow their product fidelity and photography guidance. Ad copy is kept in editable layers, separate from generated photography. The starter image is a vector illustration, not a generated photograph.

## Project files

Changes autosave to IndexedDB in the current browser. **Save project** downloads an editable JSON file with its embedded images; **Open project** restores it. **Export ad** downloads a flattened PNG or JPG. Local browser storage is not a cloud backup.

## Browser checks

```sh
npx playwright install chromium
npm run test:e2e
```

Playwright starts a dedicated server on port 3100. Browser binaries may require additional OS libraries in a fresh machine. CI installs them automatically.

## Git hygiene

The shared `.gitignore` excludes dependencies, build output, test reports, caches and environment secrets. Review `git status` before committing. No commits or pushes are performed by setup.

## Current limits

This is an early development scaffold, not a deployed public service. Generation has no user authentication or per-user quota; do not expose the paid generation endpoint publicly before adding them. Live provider generation requires credentials and has not been validated by setup. All other checks can run without credentials.
