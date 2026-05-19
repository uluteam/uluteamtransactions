# Ulu Team — Client Portal

Internal transaction-management portal for The Ulu Team (Keller Williams Honolulu, RB-21303).

Single-page React app served as static files. No build step.

## Stack

- React 18 (via UMD CDN)
- Babel Standalone (in-browser JSX compilation)
- jsPDF for timeline PDF export
- ElevenLabs ConvAI widget (floating voice assistant)
- LocalStorage for transaction persistence

## Local development

Just open `index.html` in a browser, or serve the folder with any static server:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy to Netlify

1. Push this repo to GitHub.
2. On Netlify: **Add new site → Import from Git → pick this repo**.
3. Build settings:
   - **Build command:** *(leave blank)*
   - **Publish directory:** `.`
4. Deploy.

That's it — no node, no build, no env vars required.

## File structure

```
index.html                   Entry point + global styles + script imports
src/
  shared.jsx                 Auth, users, transaction store, hooks
  data.jsx                   Static demo data
  icons.jsx                  Icon set
  logo-data.jsx, logos.jsx   Ulu Team brand marks
  sidebar.jsx                Left navigation
  tweaks.jsx                 In-design tweak controls
  app.jsx                    Hash router + screen mounting
  screens/
    admin_login.jsx          Sign-in screen
    admin_dashboard.jsx      Timelines list with filters
    timeline_editor.jsx      Per-transaction editor (buyer/seller side)
    timeline_print.jsx       Print-optimized layout
```

## Demo credentials

The portal currently uses frontend-only auth (passwords in `src/shared.jsx`).

| User          | Email                  | Password       |
|---------------|------------------------|----------------|
| Kristina Ulu  | kristina@uluteam.com   | kristina2026   |
| Daniel Ulu    | daniel@uluteam.com     | daniel2026     |
| Admin         | info@uluteam.com       | ulu2026        |

**Before going live with real client data:** migrate auth to Firebase / Supabase / Auth0. See the comments in `src/shared.jsx` (`USERS`, `PASSWORDS` constants).

## Transaction storage

Transactions are persisted in `localStorage` under `ulu_transactions_v1`. This is per-device — there's no sync between Kristina's laptop and Daniel's phone yet.

**Before launch:** swap the four CRUD methods on `transactionStore` (in `src/shared.jsx`) to hit Firestore or Supabase.

## Key features

- **Per-transaction timelines** for buyer and listing sides
- **Auto-calculated due dates** from Acceptance / Closing anchors using HAR standard contingency periods
- **Manual override with audit trail** — when a TM overrides a date, the original is auto-stamped into the comment field; dependent rows visibly flash as they re-cascade
- **PDF export** via jsPDF (single-page landscape)
- **Responsive** — sidebar collapses to top tabs below 860px

## License

© 2026 The Ulu Team. Proprietary — internal use only.
