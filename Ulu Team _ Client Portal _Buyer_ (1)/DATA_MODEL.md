# Google Sheets Data Model — Ulu Team TC Tool

**Status:** v2 · decisions locked, ready to build

**Locked decisions:**
- **Join key:** escrow number (e.g. `ESC-24881`). Leads without an escrow # yet use a placeholder `LEAD-NNN` and get renamed when escrow opens.
- **Users:** 2 — Daniel (`info@uluteam.com`) + Kristina TC (`kportillo.ulu@gmail.com`). Both have full read/write. Netlify Identity gate restricted to these two addresses only.
- **HAR checklist template:** yes — Tab 8 seeds every new transaction.
- **Drive folders:** one folder per transaction (cleaner sharing, easier handoff).
- **Deletes:** hard delete. When a deal is removed, its rows are dropped from every tab.
**Goal:** every editable thing in the React app lives as a row in one of these tabs. The TC can open the Sheet directly as a fallback if the app ever breaks.

---

## Workbook layout

One Google Sheet titled **`Ulu Team — Transactions`** with these tabs:

| # | Tab | What it holds | Approx. rows |
|---|---|---|---|
| 1 | `Transactions` | One row per deal — the master record | dozens/yr |
| 2 | `Parties` | All people on each deal (buyers, sellers, agents, lender, escrow) | 5–8 per deal |
| 3 | `Timeline` | Every contingency / milestone row across all deals | 30–50 per deal |
| 4 | `Tasks` | Action items for the TC | 5–15 per deal |
| 5 | `Documents` | Links to files in Google Drive | 10–20 per deal |
| 6 | `Activity` | Auto-log of changes (audit trail) | grows over time |
| 7 | `Settings` | App-wide config (firm info, email templates, defaults) | ~20 |
| 8 | `TimelineTemplate` | Master HAR checklist — copied into every new deal | ~40 fixed |

**Join key:** every tab except `Settings` and `TimelineTemplate` has an `escrow_number` column. Format: `ESC-NNNNN` (e.g. `ESC-24881`), or `LEAD-NNN` for pre-escrow deals.

---

## Tab 1 — `Transactions`

Master row per deal. Created when TC clicks "Add Client" in the app.

| Column | Type | Example | Notes |
|---|---|---|---|
| `escrow_number` | text (PK) | `ESC-24881` | Real escrow # once opened, else `LEAD-NNN` |
| `status` | enum | `under_contract` | `lead` / `under_contract` / `closed` / `cancelled` |
| `assigned_to` | enum | `kristina` | `daniel` / `kristina` — controls who sees it as "mine" |
| `side` | enum | `buyer` | `buyer` / `seller` / `dual` |
| `property_address` | text | `94-1004 Kaukahi Pl #K11` | |
| `property_city` | text | `Waipahu` | |
| `property_state` | text | `HI` | |
| `property_zip` | text | `96797` | |
| `property_type` | enum | `Condominium` | Condo / SFH / Townhome / Land |
| `beds` | number | `4` | |
| `baths` | number | `3` | |
| `sqft` | number | `2840` | |
| `price` | number | `2195000` | Stored as raw number, formatted in UI |
| `escrow_company` | text | `Title Guaranty` | |
| `mls_number` | text | `202407612` | Optional |
| `acceptance_date` | date | `2026-03-28` | ISO format |
| `closing_date` | date | `2026-05-12` | |
| `closing_time` | text | `11:00 AM` | |
| `closing_location` | text | `Title Guaranty, Ala Moana` | |
| `loan_approval_due` | date | `2026-04-22` | |
| `lender_name` | text | `GEM Mortgage` | |
| `listing_agent_id` | text | `P-0042` | FK → Parties |
| `buyer_agent_id` | text | `P-0001` | FK → Parties |
| `notes` | text (long) | `Seller wants quick close` | |
| `drive_folder_id` | text | `1Xy3Z...` | Drive folder for this deal's documents |
| `drive_folder_url` | text | `https://drive.google.com/...` | Quick link |
| `created_at` | timestamp | `2026-03-28T14:02:00Z` | |
| `created_by` | text | `kristina@uluteam.com` | |
| `updated_at` | timestamp | `2026-04-22T09:11:00Z` | Updated by app on any write |

---

## Tab 2 — `Parties`

Everyone associated with a deal — buyers, sellers, co-agents, lender, escrow officer, inspector.

| Column | Type | Example | Notes |
|---|---|---|---|
| `party_id` | text (PK) | `P-0142` | Auto-generated |
| `escrow_number` | text (FK) | `ESC-24881` | |
| `role` | enum | `buyer_1` | `buyer_1` / `buyer_2` / `seller_1` / `seller_2` / `listing_agent` / `buyer_agent` / `lender` / `escrow_officer` / `inspector` / `other` |
| `name` | text | `Daniel Tester` | |
| `email` | text | `daniel.tester@example.com` | |
| `phone` | text | `(808) 555-0142` | |
| `company` | text | `Keller Williams Honolulu` | Optional |
| `license` | text | `RS-83724` | For agents only |
| `notes` | text | | Optional |

---

## Tab 3 — `Timeline` ★ heart of the tool

Every contingency / milestone row. This is what the TC checks off daily and what triggers auto-emails. Each row matches one line of the HAR checklist.

| Column | Type | Example | Notes |
|---|---|---|---|
| `timeline_id` | text (PK) | `TL-0001` | Auto |
| `escrow_number` | text (FK) | `ESC-24881` | |
| `section` | text | `Loan & Appraisal` | Groups rows in UI |
| `term` | text | `L-1` | HAR reference code (e.g. `C-1`, `I-3a`) |
| `description` | text | `Appraisal scheduled` | What needs to happen |
| `due_date` | date | `2026-04-22` | |
| `status` | enum | `complete` | `pending` / `in_progress` / `complete` / `waived` / `na` |
| `completed_at` | timestamp | `2026-04-16T14:14:00Z` | Set when status flips to `complete` |
| `critical` | boolean | `TRUE` | Renders red in the timeline |
| `responsible` | enum | `buyer` | `buyer` / `seller` / `tc` / `agent` / `lender` / `escrow` |
| `email_sent` | boolean | `TRUE` | Did the auto-email go out? |
| `email_sent_at` | timestamp | `2026-04-16T14:15:00Z` | |
| `next_step_term` | text | `L-2` | Optional — what comes next |
| `notes` | text | | Free text TC scratchpad |

**Important:** the TC checking a box in the app should:
1. Set `status = complete` + `completed_at = now`
2. Trigger the contingency email (writes `email_sent = TRUE` + `email_sent_at`)
3. Append an `Activity` row

---

## Tab 4 — `Tasks`

Action items not tied to the HAR checklist — TC's own to-dos.

| Column | Type | Example | Notes |
|---|---|---|---|
| `task_id` | text (PK) | `T-0091` | |
| `escrow_number` | text (FK) | `ESC-24881` | |
| `title` | text | `Confirm final walkthrough time` | |
| `sub` | text | `Daniel suggested Apr 30, 3:00 PM` | Secondary line |
| `due_date` | date | `2026-04-30` | Optional |
| `urgent` | boolean | `FALSE` | |
| `done` | boolean | `FALSE` | |
| `done_at` | timestamp | | |
| `created_at` | timestamp | | |

---

## Tab 5 — `Documents`

Pointers to actual files in Google Drive. The Sheet stores **the Drive link**, not the file.

| Column | Type | Example | Notes |
|---|---|---|---|
| `doc_id` | text (PK) | `D-0331` | |
| `escrow_number` | text (FK) | `ESC-24881` | |
| `kind` | enum | `purchase_contract` | `purchase_contract` / `preapproval` / `disclosure` / `inspection_report` / `appraisal` / `insurance` / `id` / `other` |
| `name` | text | `Purchase Contract — signed.pdf` | |
| `drive_file_id` | text | `1A2b3C4d5E6f...` | Google Drive file ID |
| `drive_url` | text | `https://drive.google.com/...` | |
| `uploaded_at` | timestamp | | |
| `uploaded_by` | text | `kristina@uluteam.com` | |
| `needs_signature` | boolean | `FALSE` | Surfaces in stats |

**Folder convention:** one Drive folder per transaction, named `ESC-24881 — Tester (Kaukahi Pl)`. Folder ID + URL stored on the `Transactions` row (`drive_folder_id`, `drive_folder_url`). On "Add Client," the app creates the folder and stamps both columns. Folder is shared with both Daniel and Kristina.

---

## Tab 6 — `Activity`

Append-only log. Every meaningful action writes a row. Used for the "Recent activity" stream + audit trail.

| Column | Type | Example | Notes |
|---|---|---|---|
| `activity_id` | text (PK) | `A-00219` | |
| `escrow_number` | text (FK) | `ESC-24881` | |
| `timestamp` | timestamp | `2026-04-16T14:14:00Z` | |
| `actor` | text | `kristina@uluteam.com` | Who did it |
| `event` | enum | `milestone_completed` | `milestone_completed` / `task_added` / `task_done` / `document_uploaded` / `email_sent` / `transaction_created` / `transaction_updated` |
| `label` | text | `Appraisal scheduled` | Human-readable |
| `ref_id` | text | `TL-0001` | Points at the row that changed |
| `tone` | enum | `green` | Hint for UI: `green` / `red` / `ink` |

---

## Tab 7 — `Settings`

App-wide config. Key/value rows. Editable by TC for things like default email signature.

| Column | Type | Example |
|---|---|---|
| `key` | text (PK) | `firm_email` |
| `value` | text | `aloha@uluteam.com` |
| `notes` | text | What this controls |

**Suggested initial rows:**
- `firm_name` → `The Ulu Team`
- `firm_email` → `aloha@uluteam.com`
- `firm_phone` → `808-201-7751`
- `firm_address` → `590 Farrington Hwy, Kapolei, HI 96707`
- `brokerage_name` → `Keller Williams Honolulu`
- `brokerage_license` → `RB-21303`
- `default_closing_days` → `45`
- `email_signature` → (multi-line)
- `next_lead_seq` → `001` (used to mint `LEAD-NNN` placeholders)
- `drive_root_folder_id` → ID of the parent folder where per-deal folders are created

---

## Tab 8 — `TimelineTemplate`

Master HAR checklist. Edited rarely (only when HAR updates the standard form). Copied into Tab 3 every time a new transaction is created — with `due_date` computed from `acceptance_date + offset_days`.

| Column | Type | Example | Notes |
|---|---|---|---|
| `template_id` | text (PK) | `TT-L-1` | `TT-` + term |
| `section` | text | `Loan & Appraisal` | |
| `term` | text | `L-1` | HAR reference code |
| `description` | text | `Appraisal scheduled` | |
| `offset_days` | number | `19` | Days after acceptance date |
| `offset_from` | enum | `acceptance` | `acceptance` / `closing` (negative offset = days before closing) |
| `critical` | boolean | `TRUE` | |
| `responsible` | enum | `lender` | `buyer` / `seller` / `tc` / `agent` / `lender` / `escrow` |
| `applies_to` | enum | `buyer` | `buyer` / `seller` / `both` — which side's deals get this row |
| `next_step_term` | text | `L-2` | Optional chaining |
| `active` | boolean | `TRUE` | Set FALSE to retire a row without deleting |

**"Add Client" flow:**
1. TC enters property, parties, acceptance & closing dates, side (buyer/seller).
2. App reads `TimelineTemplate` rows where `active=TRUE` and `applies_to ∈ {side, both}`.
3. For each template row, app creates a `Timeline` row with `due_date = acceptance_date + offset_days` (or `closing_date - |offset_days|` if `offset_from = closing`).
4. All new rows start with `status = pending`.

---

## Things I'm intentionally NOT putting in Sheets

- **Generated email bodies.** They're rendered from data at send time. No reason to store the rendered HTML.
- **UI tweaks** (accent color, density). Stay in `index.html` between `EDITMODE` markers.
- **Auth/user accounts.** Netlify Identity handles that — no need to mirror the TC's identity into the Sheet.

---

## Next step

**Step 2 — Google Cloud + Sheets API setup (~20 min, one-time).**

What I'll need from you:
1. Create the empty Google Sheet titled `Ulu Team — Transactions` and the parent Drive folder (`Ulu Team — Deal Files` or similar). Share both with `daniel@uluteam.com` and `kristina@uluteam.com` as editors.
2. Create a Google Cloud project (or I walk you through it), enable Sheets API + Drive API, generate a service account, share the Sheet + Drive folder with the service account's email as Editor.
3. Send me the service account JSON key (or paste it into a Netlify environment variable directly).

Once that's done I:
- Stamp the 8 tabs with their column headers
- Seed `TimelineTemplate` from the existing HAR rows already in the React code
- Seed `Settings` with the firm info
- Replace `src/data.jsx` with read/write functions that call the Sheets API
- Add Netlify Identity gating in front of the app, restricted to `daniel@uluteam.com` and `kristina@uluteam.com`
- Rebundle and deploy
