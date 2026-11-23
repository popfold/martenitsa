import { defineConfig } from 'vite';
import { homeSaver, popfoldFallback } from 'popfold/vite';

// A Popfold site. base './' keeps every asset path relative, so dist/ works from any host or sub-folder.
// Two pages: the site (index.html) and Popfold Studio (studio.html), whose Save writes src/home.json.
// popfoldFallback builds the page without 3D into index.html: the stories under their sections, the stills from
// public/stills/, llms.txt and robots.txt. Add siteUrl and jsonLd once the site has a real address.
export default defineConfig({
  base: './',
  plugins: [
    // the studio's Save writes moved pieces into the home file; on the deployed site, Save to GitHub sends them
    // through Popfold's save service as a pull request from studio/<login> into main
    homeSaver({ home: 'src/home.json', save: { service: 'https://popfold-save.popfold.workers.dev', repo: 'popfold/martenitsa' } }),
    popfoldFallback({
      siteName: 'The First Martenitsa',
      pages: [
        // its pieces' stories are written under their sections, and its id names the stills
        { html: 'index.html', homeFile: 'src/home.json', storiesHeading: 'On this page' },
        // the same page in Bulgarian, at bg/: its words swapped by src/i18n/bg.json
        { html: 'bg/index.html', from: 'index.html', lang: 'bg', text: 'src/i18n/bg.json', homeFile: 'src/home.json', storiesHeading: 'On this page' },
      ],
    }),
  ],
  build: {
    target: 'es2020', assetsInlineLimit: 0, chunkSizeWarningLimit: 760, // three.js is lazy-loaded
    rollupOptions: { input: { main: 'index.html', studio: 'studio.html' } },
  },
});
