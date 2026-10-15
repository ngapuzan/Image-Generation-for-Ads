# Development instructions

- Use the existing checkout; cloud tasks are isolated. Do not create a Git worktree unless requested.
- Use Node.js 24. Install with `npm ci`; run `npm test` and `npm run build` for relevant code changes.
- Start development with `npm run dev` (port 3000 by default). `GET /api/status` reports generation configuration without exposing secrets.
- Preserve the generate-once workflow: editing text, images, backgrounds, or visual effects must not call the generation API.
- Keep credentials server-side and out of Git, browser code, logs, and project files.
- The original Dark Bike and Outdoor Action skills and retained references are in skills/. Read the relevant skill for image-generation work. Keep ad copy in editable layers for this app workflow.
- Run browser checks with `npm run test:e2e` after installing Chromium with Playwright.
