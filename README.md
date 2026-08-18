# huzhi.dev

Personal portfolio — Next.js (static export) + Tailwind CSS + [Aceternity UI](https://ui.aceternity.com) components.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into ./out
```

## Branches & deployment

- `main` — development / source branch. All changes go here.
- `gh-pages` — **publish branch**, generated automatically. Never edit by hand.

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
it builds the static export (`./out`) and force-pushes it to `gh-pages`.

One-time setup in the repo: **Settings → Pages → Source: "Deploy from a branch" →
Branch `gh-pages` / `(root)`**. The custom domain (`www.huzhi.dev`) is kept via
`public/CNAME`; `public/.nojekyll` keeps GitHub Pages from stripping `_next/`.

## Structure

```
app/                 Next.js app router (layout, page, globals.css)
components/          Page sections (hero, skills, projects, ...)
components/ui/       Aceternity UI components (3d-card, spotlight, tracing-beam, ...)
public/              CNAME, .nojekyll
```
