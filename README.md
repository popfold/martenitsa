# The First Martenitsa

The Bulgarian legend of the first martenitsa, in a pop-up book of cross-stitch: each page is sewn as it opens. A [Popfold](https://github.com/popfold/popfold) site, from its storybook template. The pictures (`public/art/`) were made with Midjourney.

**See it live: [storybook.popfold.ca](https://storybook.popfold.ca)** (English), and in Bulgarian at
[storybook.popfold.ca/bg/](https://storybook.popfold.ca/bg/).

```
pnpm install              # Popfold comes from npm (@popfold/engine), at the release package.json names
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

## How the stitching works

Each page of the book is a picture, and with `"stitch": true` in `src/home.json` Popfold sews it as cross-stitch
while the page opens, then unpicks it as the page closes. That code is in Popfold, not in this site, because any
book can use it: [`src/stitch.ts`](https://github.com/popfold/popfold/blob/main/src/stitch.ts) does the
embroidery, and [`src/book.ts`](https://github.com/popfold/popfold/blob/main/src/book.ts) puts it on the pages.
It was written for this book, and these are the choices made along the way.

**From a picture to a pattern.** The picture is shrunk to one pixel per stitch: 160 stitches across a spread,
or the number `"stitch"` gives. Then k-means sorts those pixels into 12 thread colours. The starting colours are
spread evenly over the pixels' brightness, not chosen at random, so a page comes out the same pattern every time
it loads.

**What is cloth.** The cloth is the colour most of the picture's edge shares. The pictures are photographs of
embroidery, so they also carry shadows and creases on the linen. Any pale, greyish colour joined to the edge
through such cells is filled in as cloth too, so the needle doesn't sew the shadows.

**Thread, not photo.** A photo averages a thread's colour with the cloth showing through it. So each colour is
made richer, as dyed thread looks, and the darkest ones are lifted so they still read as a colour rather than
black.

**The order of sewing.** The stitches are sewn the way an embroiderer works a pattern:
- **One colour at a time.** Reds go first, because the story is about a white thread turning red; then the
  rest, from light to dark.
- **Row by row, in the Danish method.** Every `/` leg goes along the row, then every `\` leg comes back, so a
  row first shows as half-stitches and then closes into crosses.

**Following the scroll.** How far a page is open decides how many legs are sewn, so scrolling back takes the
stitches out again. Each frame draws only what changed:
- Sewing on adds only the new legs.
- Unpicking clears only the cells it empties, back to the page as it was under the stitches, and redraws the
  neighbours' legs that cross into them.

**Fast enough to draw every frame.** At first a frame took about 150 ms. Three changes brought it to about 17 ms
(the median; 33 ms at the slowest 5%):
- drawing each frame incrementally, as above, rather than the whole picture;
- keeping the page canvases in memory (`willReadFrequently`), since a GPU canvas is slow to read back and upload
  to the 3D page every frame;
- drawing the pages at 768 pixels wide.

**The cloth.** The stitches sit on drawn Aida cloth, the plain weave embroidery is sewn on, with a hole at every
stitch corner.

## How the pictures were made

The five pictures (`public/art/`) were made with Midjourney:
- **The style:** a photograph of Bulgarian cross-stitch was the style reference for the first page.
- **The other pages:** they take the first page's picture as their style reference (`--sref`, at `--sw 50`), so
  the book reads as one piece of embroidery. Two references at once buried the story under flowers.
- **On the site:** the pictures are WebP files, 960 pixels wide.

## Credits

Created by **Dimiter Todorov**. Built with **Claude Code** (Anthropic), on [Popfold](https://github.com/popfold/popfold),
whose own credits are in its `CREDITS.md`.

- **The story:** the Bulgarian legend of Khan Asparuh, his sister Huba and the first martenitsa, retold from the
  traditional versions.
- **The pictures** (`public/art/`): made with Midjourney, in the style of Bulgarian cross-stitch embroidery.
- **Fonts:** Bricolage Grotesque and DM Sans (English), Rubik and Nunito (Bulgarian), all under the SIL Open Font
  License, through Fontsource.
