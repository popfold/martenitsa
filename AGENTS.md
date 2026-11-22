# martenitsa

A site built with Popfold, which it takes as a package from a release tag (`package.json`), installed in
`node_modules/popfold`. Read [node_modules/popfold/AGENTS.md](node_modules/popfold/AGENTS.md) before changing anything, and
[node_modules/popfold/docs/create-a-site.md](node_modules/popfold/docs/create-a-site.md) for what each file here does.

The book's page pictures and their stitching need Popfold's `martenitsa/book-art` branch until it is released:
while working, link the site to that checkout (`"popfold": "link:../popfold-bookart"`, then `pnpm install`), and
do not commit that line.
