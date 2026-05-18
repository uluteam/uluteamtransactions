# Step 2 — Google Cloud + Service Account Setup

**Time:** ~20 min, one-time
**Who does it:** Daniel (you), in your own Google account

This connects your Google Sheet to the React app so it can read and write data programmatically. A "service account" is a non-human Google identity the app uses to log in.

---

## What we have so far

| Thing | ID / Link |
|---|---|
| Parent Drive folder | `1Lq6-BsxVZQfMMa4Dt7KG_dAbM2sfX8Go` ([open](https://drive.google.com/drive/folders/1Lq6-BsxVZQfMMa4Dt7KG_dAbM2sfX8Go)) |
| Transactions Sheet | `1QHLIMb8_4QHxKHgK1cZYG7RcCAwamTGW8CqqbLJAQXA` ([open](https://docs.google.com/spreadsheets/d/1QHLIMb8_4QHxKHgK1cZYG7RcCAwamTGW8CqqbLJAQXA/edit)) |
| Allowed users | `info@uluteam.com`, `kportillo.ulu@gmail.com` |

---

## Part A — Create the Google Cloud project

1. Go to **https://console.cloud.google.com/**
2. Sign in as `info@uluteam.com`.
3. Top bar, click the project dropdown (says "Select a project") → **New Project**.
4. Name it: `ulu-team-platform`. Leave organization as-is. Click **Create**.
5. Wait ~10 sec, then make sure the project selector now shows `ulu-team-platform`. If not, click it and select it.

## Part B — Enable the two APIs we need

6. In the left nav (☰ menu): **APIs & Services → Library**.
7. Search for **Google Sheets API** → click it → **Enable**.
8. Click ← back to Library, search for **Google Drive API** → click it → **Enable**.

## Part C — Create the service account

9. Left nav: **APIs & Services → Credentials**.
10. Top bar: **+ Create Credentials → Service account**.
11. Fill in:
    - Service account name: `ulu-platform-api`
    - Service account ID: auto-fills, leave it
    - Description: `Reads/writes Ulu Team transactions sheet`
12. Click **Create and Continue**.
13. Skip the optional "Grant access" step → **Continue** → **Done**.

## Part D — Generate the JSON key

14. You're back on the Credentials page. Under **Service Accounts**, click the one you just made (`ulu-platform-api@...`).
15. Top tabs → **Keys**.
16. **Add Key → Create new key → JSON → Create**.
17. A `.json` file downloads to your computer. **This is a secret — treat it like a password.** Do NOT email it, do NOT commit it to GitHub.
18. **Copy the service account email** from the same page (looks like `ulu-platform-api@ulu-team-platform.iam.gserviceaccount.com`). You'll need it next.

## Part E — Share the Sheet + Drive folder with the service account

19. Open the [Transactions Sheet](https://docs.google.com/spreadsheets/d/1QHLIMb8_4QHxKHgK1cZYG7RcCAwamTGW8CqqbLJAQXA/edit) → **Share** button (top right).
20. Paste the service account email → set role to **Editor** → uncheck "Notify people" → **Share**.
21. Open the [Drive folder](https://drive.google.com/drive/folders/1Lq6-BsxVZQfMMa4Dt7KG_dAbM2sfX8Go) → right-click → **Share**.
22. Paste the same service account email → **Editor** → uncheck notify → **Share**.

## Part F — Hand the key to Netlify

23. Open Netlify → your site (`uluteamtransactions.com`) → **Site settings → Environment variables**.
24. **Add a variable**:
    - Key: `GOOGLE_SERVICE_ACCOUNT_JSON`
    - Value: open the JSON file you downloaded in step 17, paste the **entire contents** (the whole `{...}` blob)
    - Scope: Functions + Builds
    - Click **Create variable**.
25. Add a second variable:
    - Key: `SHEET_ID`
    - Value: `1QHLIMb8_4QHxKHgK1cZYG7RcCAwamTGW8CqqbLJAQXA`
26. Add a third:
    - Key: `DRIVE_ROOT_FOLDER_ID`
    - Value: `1Lq6-BsxVZQfMMa4Dt7KG_dAbM2sfX8Go`

## Part G — Tell me when done

27. Message me **"step 2 done"** and confirm:
    - ✅ JSON key downloaded and stored somewhere safe locally
    - ✅ Service account email shared on both Sheet + Drive folder
    - ✅ Three env vars in Netlify (`GOOGLE_SERVICE_ACCOUNT_JSON`, `SHEET_ID`, `DRIVE_ROOT_FOLDER_ID`)

You do NOT need to send me the JSON contents. The env var is enough.

---

## If something goes wrong

| Problem | Fix |
|---|---|
| "Permission denied" when creating project | You're not the owner of `info@uluteam.com` or the account doesn't have billing enabled. The Sheets/Drive APIs are free — you'll need a billing account on file but won't be charged. |
| Can't find the service account email | Credentials page → click the service account → top of the detail page, "Email" field. |
| Downloaded the wrong key type | Make sure you picked **JSON**, not P12. |
| Lost the JSON | Generate a new key in Part D — old one stays valid but you can delete it. Re-paste into Netlify env var. |

---

## What I do next (step 3)

Once step 2 is done:
1. Add Netlify Function endpoints (`/api/sheets/*`) that proxy to the Sheets API using the service account
2. Stamp the 8 tabs with column headers (one-time write)
3. Seed `TimelineTemplate` with the HAR rows already in the code
4. Seed `Settings` with the firm info
5. Replace `src/data.jsx` mock objects with `fetch('/api/sheets/...')` calls
6. Add Netlify Identity widget + email allowlist gate
7. Rebundle and deploy
