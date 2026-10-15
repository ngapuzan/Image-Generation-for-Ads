# Ride Studio setup

Your GitHub account is ngapuzan and the repository is https://github.com/ngapuzan/Image-Generation-for-Ads.

## Use the editor

Install Node.js 24. From the project directory run:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Choose Assets → Upload base photo to import a photo generated in chat. Select text to change its content, font, size, colour and position. Adjust controls brightness, contrast, saturation, grain and vignette. Save project keeps editable layers; Export ad creates a PNG or JPG. Keep downloaded project files as backups; browser autosave is device-specific.

## Put the source on GitHub

In GitHub Desktop, sign in as ngapuzan, clone Image-Generation-for-Ads, and copy these project files into that checkout. Review changes, commit, then Push origin. Do not copy node_modules, .env, caches or test reports. The included workflow checks tests and production build on pushes and pull requests.

## Optional in-app image generation

You can generate in chat and upload images without configuring a paid API. In-app generation is optional and separate from the editor. Set IMAGE_API_KEY in private server environment settings and restart; never paste the key into chat or GitHub source. The key needs model access and API billing. No paid generation was performed during setup.

The original skills and reference assets are preserved in skills/. The API sends the product photo first and the matching retained style image second. Presets use safe defaults and leave ad text out of the photograph for editing. Art direction accepts scene, angle and lighting requests. For exact product fidelity, include the brand/model and a clear bike photo. For additional style images, supply them in chat during generation and then upload the result into the editor.

## Hosting

GitHub stores source code. GitHub Pages can serve a static editor but cannot run this Express generation API. The full app requires a Node.js host with build command `npm ci && npm run build` and start command `npm start`. Keep generation disabled on a public host until authentication and usage limits are implemented. Use private hosting for personal access.

No domain purchase is required. Choosing a full-app host, granting repository access to that host, and enabling paid API generation are remaining account setup steps. This package does not claim a live deployment.
