# Deployment SOP — uluteamtransactions.com

**Stack:** GitHub repo `uluteam/uluteam-transaction-timeline` → Netlify → `uluteamtransactions.com` (auto-deploys on push to `main`).

The live file MUST be named exactly **`index.html`** at the repo root. Netlify will not serve `index (2).html`, `index copy.html`, etc.

## Standard update flow

1. **Edit source** in this project — `src/*.jsx`, `src/screens/*.jsx`, `src/data.jsx`, etc. The root `index.html` is the React app shell.
2. **Bundle** to a single self-contained file: ask the assistant to "bundle index.html". Output lands at `dist/index.html` (~1.6 MB, all React/components/styles inlined).
3. **Download** the bundle via the download card.
4. **Rename the downloaded file to exactly `index.html`** on your computer. Strip any `(1)`, `(2)`, `(3)` the browser added — GitHub upload preserves the local filename.
5. **Replace in GitHub:**
   - Go to https://github.com/uluteam/uluteam-transaction-timeline
   - Click existing `index.html` → 🗑 trash icon → **Commit changes**
   - **Add file → Upload files** → drag your renamed `index.html` → **Commit changes**
6. **Verify deploy:** Netlify → Deploys tab → wait for green "Published" badge (~1 min).
7. **Hard-reload** `uluteamtransactions.com` (Cmd+Shift+R / Ctrl+Shift+R) — regular refresh may show a cached 404.

## Known gotchas

- **Browser auto-numbers downloads** — `index (2).html`, `index (3).html`, etc. ALWAYS rename before uploading.
- **GitHub upload UI doesn't normalize filenames.** What you upload is what gets committed.
- **Netlify caches.** Hard-reload after deploy to see changes.
- **404 after a "Published" deploy** = file is named wrong in the repo. Check the repo root in GitHub.

## Project structure

```
index.html              ← React app shell (source)
src/
  app.jsx               ← router (16 screens)
  shared.jsx            ← hooks, primitive components
  data.jsx              ← all mock data (swap for real API)
  icons.jsx             ← icon set
  logos.jsx             ← UluLogo (uses assets/ulu-logo.png)
  sidebar.jsx           ← portal sidebar nav
  tweaks.jsx            ← editor controls
  screens/
    login.jsx
    dashboard.jsx       ← supports variant: actions | countdown | property
    transaction.jsx     ← ★ most-developed
    preapproval.jsx     ← ★
    saved.jsx
    documents.jsx
    messages.jsx
    calendar.jsx
    settings.jsx
    admin_login.jsx
    admin_dashboard.jsx
    admin_clients.jsx
    add_client_modal.jsx
    timeline_editor.jsx ← ★
    email_gem.jsx
    email_magic.jsx
assets/
  ulu-logo.png          ← real Ulu Team logo (DO NOT REGENERATE)
  gem-logo.png
dist/
  index.html            ← bundled, deployable output
```

## Tweaks (editor controls)

The bundled site supports in-page tweaks via `window.__TWEAKS__`. Defaults are JSON in `index.html` between `/*EDITMODE-BEGIN*/` and `/*EDITMODE-END*/`:

```json
{
  "accentRed": "#B32025",
  "gemBlue": "#004FA3",
  "showTCDirections": true,
  "sidebarDensity": "comfortable",
  "dashboardVariant": "actions"   // actions | countdown | property
}
```

## Logo policy

**Never regenerate the logo.** `UluLogo` MUST source from `assets/ulu-logo.png`. The bundler inlines it as a data URL.

## Emergency: bypass Git

If you need to push a change without going through GitHub:

1. Get the bundled `index.html`.
2. Netlify → Deploys tab → scroll to bottom → drag the file onto "Drag and drop your site output folder here."
3. This overrides the Git deploy until the next push.

---

_Last updated: April 27, 2026_
