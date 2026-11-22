# The First Martenitsa

The Bulgarian legend of the first martenitsa, in a pop-up book of cross-stitch: each page is sewn as it opens. A [Popfold](node_modules/popfold/README.md) site, from its storybook template. The pictures (`public/art/`) were made with Midjourney. The pages' pictures and stitching need Popfold's
`martenitsa/book-art` branch until it is released (AGENTS.md).

```
pnpm install              # Popfold comes from its git repository, at the release package.json names
pnpm dev                  # http://127.0.0.1:5196   (studio: /studio.html)
pnpm exec popfold check   # find mistakes
pnpm build:static         # capture the stills, then build dist/
pnpm exec popfold update  # move to the newest Popfold release
pnpm deploy:site          # build and upload to storybook.popfold.ca
```

| File | What to change |
|---|---|
| `index.html` | The copy. One `<section class="stage" id="…">` per page of the book; each page's section has the page's id |
| `src/home.json` | The home as data: the book (`book`: its pages, each with an id, a label and the colour printed on it, and the covers' and paper's colours), the story (`beats`: one per section, with its camera and which pages are turned) and the pop-ups on each page (`pieces`), with the story card behind a piece |
| `src/home.ts` | Kinds of piece of your own, if you add any (`kinds`): any object, mounted on its page like a stand |
| `src/main.ts` | What a click on a page does (`onZone`) |
| `src/style.css` | The page's look |
| `vite.config.ts` | The site's name |
| `src/studio.ts`, `studio.html` | The studio page; nothing to change unless you add homes |
