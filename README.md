# AMXL L6 Interview Prep — Sorabh

Single-page study hub for Amazon L6 AMXL JP prep: sections from your master guide, STAR stories (editable), quizzes, checklist, mock interviews, and notes. **All progress is stored in your browser** (`localStorage`).

## Prerequisites

- Node.js 20+ recommended  
- npm

## Setup

```bash
cd amazon-l6-prep
npm install
# If npm reports a peer dependency conflict (Vite 8 vs vite-plugin-pwa), use:
# npm install --legacy-peer-deps
npm run dev
```

Open **http://localhost:5173**

### Phone on the same Wi‑Fi (dev)

1. On your PC, run **`npm run dev:lan`** (listens on all interfaces).  
2. Find your PC’s LAN IP (for example **Settings → Network → Properties** on Windows, or `ipconfig`).  
3. On the phone, open **`http://<PC-IP>:5173`** (same port as Vite).  
4. If it does not load, allow **Node / Vite** through Windows Firewall for **private** networks, or add an inbound rule for TCP **5173**.

### Production hosting (static site)

The app is a client-side SPA: deploy the **`dist/`** folder after `npm run build`.

| Where | What to do |
|--------|------------|
| [Vercel](https://vercel.com) / [Netlify](https://netlify.com) / [Cloudflare Pages](https://pages.cloudflare.com) | Connect the repo or drag-and-drop `dist`; set **build command** `npm run build` and **output directory** `dist`. Configure SPA fallback so unknown paths serve `index.html` (often automatic for Vite). |
| Any static host (S3, nginx, etc.) | Upload `dist` contents; configure **try_files** / fallback to `index.html` for client routes. |

After deploy, open the HTTPS URL on your phone from anywhere.

### GitHub Pages (`*.github.io`) — free

This repo includes **`.github/workflows/deploy-github-pages.yml`**. Use it when the **Git repository root is this folder** (`amazon-l6-prep` is the repo root, not a parent monorepo). If the app lives inside a larger repo, copy the workflow and add `defaults.run.working-directory` plus artifact `path` pointing at that app folder.

1. Create a new repository on GitHub and push this project (see [GitHub docs](https://docs.github.com/en/get-started/quickstart/create-a-repo)).
2. In the repo on GitHub: **Settings → Pages → Build and deployment → Source**: choose **GitHub Actions** (not “Deploy from a branch”).
3. Merge or push to **`main`** or **`master`**; the workflow uses **`actions/configure-pages`** so **`BASE_PATH`** matches GitHub’s real site path, then publishes **`dist/`**.
4. After a successful run: **Settings → Pages** shows the site URL, typically **`https://<your-username>.github.io/<repo-name>/`**.

If the repository is named **`<username>.github.io`** (user site), **`configure-pages`** supplies an empty base path and the app is served at **`https://<username>.github.io/`**.

**If a run fails or the site 404s:** open **Actions**, click the failed run, and read the red step (often **`npm ci` / build**, **`configure-pages`**, or **`deploy-pages`**). On the first deploy, GitHub may show **“Review deployments”** for the **`github-pages`** environment—approve it, then **Re-run all jobs** or use **Actions → Deploy to GitHub Pages → Run workflow** (`workflow_dispatch`).

**Local check** (subpath, same as a project repo):

```bash
set BASE_PATH=/your-repo-name/
set GITHUB_PAGES=1
npm run build
npm run preview
```

(PowerShell: `$env:BASE_PATH='/your-repo-name/'; $env:GITHUB_PAGES='1'; npm run build`)

`GITHUB_PAGES=1` adds **`404.html`** (copy of `index.html`) so refreshing a deep link (for example `/repo/star-stories`) still loads the SPA.

### Offline (PWA)

Production build registers a **service worker** that precaches the app shell, assets, and **`/content/prep-guide.md`**. Google Fonts are cached after the first successful load.

1. Deploy or run **`npm run build`** then **`npm run preview`** (or `preview:lan`).  
2. Open the site **once while online** so the worker can populate caches.  
3. You can then use the app **offline** in the same browser; on mobile, use **Add to Home Screen** for a full-screen shortcut (behavior varies by browser).

**Note:** `npm run dev` does not enable the PWA service worker by default (`devOptions.enabled: false`). Use **`preview`** against a production build to test offline.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Dev server (localhost) |
| `npm run dev:lan` | Dev server reachable on LAN (phone / other devices) |
| `npm run build` | Regenerate STAR stories from `public/content/prep-guide.md`, then typecheck + production build |
| `npm run preview` | Serve the `dist` folder locally |
| `npm run preview:lan` | Same, bound to all interfaces (test PWA / phone) |
| `npm run gen:stories` | Only regenerate `src/data/starStories.generated.ts` from the markdown |

## Content source

- Main markdown: `public/content/prep-guide.md` (copy of your guide).  
- After editing the guide, run `npm run gen:stories` (or `npm run build`) so the first **10** STAR stories (CV block in the markdown) stay in sync.
- **Eight additional stories** (11–18) live in `src/data/additionalStories11to14.ts` and `additionalStories15to18.ts` and are merged in `src/data/allStories.ts`. Two are marked **constructed**—personalize before interviews.

## Story storage migration

Stories persist under the key **`amazon-l6-stories-v2`**. Older `amazon-l6-stories` data is not read automatically (avoids shape conflicts when new fields were added). If you had local edits in v1 only, open the old key in DevTools → Application → Local Storage and copy text out before clearing.

## Interview date

Countdown and scheduling use **8 May 2026** (`INTERVIEW_DATE_ISO` in `src/constants.ts`).

## Keyboard shortcuts

- **Ctrl / ⌘ + K** — Search  
- **Esc** — Close dialogs  
- **?** — Shortcuts help  
- **1–9** — Jump to sections 1–9 in order listed in the sidebar  

## Stack

React 19, Vite 8, TypeScript, Tailwind CSS v4, Zustand (persist), React Router 7, Framer Motion, Recharts, Radix primitives, `react-markdown` + `remark-gfm`.

---

Good luck with the interview.
