# IndiaUseful — Blogger Import (`blogger/import/`)

This folder holds the **single-file Blogger content import** for
[**indiauseful.blogspot.com**](https://indiauseful.blogspot.com/).

| File | Purpose |
|---|---|
| `indiauseful-blogger-import.xml` | Blogger backup/import file (Atom, `524,348` bytes) containing **32 static pages** and **14 posts**, ready for Blogger's *Import content* screen. |
| `README.md` | This guide: what is inside the file, how to import it, and how to verify the result. |

The XML uses the same Atom shape Blogger itself produces from
**Settings → Manage blog → Back up content**, and that Blogger accepts from
**Settings → Manage blog → Import content**. It contains **pages and posts only** —
no theme, no comments, no blog settings — so importing it cannot overwrite
`blogger/indiauseful-theme.xml` or any other setting.

---

## 1. What the file contains

| Entry type | Count | Blogger URL pattern | Marker in the XML |
|---|---|---|---|
| Static pages — 21 calculators | 21 | `/p/<slug>.html` | `kind#page` + `blogger:type` = `PAGE` |
| Static pages — 6 category hubs | 6 | `/p/category-<id>.html` | `kind#page` + `blogger:type` = `PAGE` |
| Static pages — 5 legal/trust pages | 5 | `/p/<slug>.html` | `kind#page` + `blogger:type` = `PAGE` |
| Posts — 10 long-form guides + 4 foundational articles | 14 | `/YYYY/MM/<slug>.html` | `kind#post` + `blogger:type` = `POST` |
| **Total** | **46** | | |

Every entry carries:

- the **exact HTML body** from `blogger/content/`, byte-for-byte (its own
  `iu-page-container` / `iu-post-container` wrapper, breadcrumbs and internal
  links already rewritten to Blogger paths), so the theme's `<data:post.body/>`
  renders it directly;
- the **post title**, and the post's **labels** (`banking`, `finance`, `gold`,
  `jobs`, plus `article` / `guide`) so label archives resolve;
- `blogger:filename` — the intended Blogger path (`/p/<slug>.html` for pages,
  `/YYYY/MM/<slug>.html` for posts), which is the same path the theme and every
  internal link already point at;
- the **original publish date** for each post (2026-09-12 … 2026-10-02).

### Placeholder IDs

Blogger exports identify a blog with a numeric id. That id is private to the
target account, so the file uses the obvious placeholder `blog-0000000000000000000`
in the feed id, entry ids and `edit`/`self` links. This is normal for a
cross-blog import: Blogger ignores the incoming ids and issues its own when the
content is created. Nothing needs to be edited before importing.

---

## 2. How to import (Blogger UI)

> Import into an **empty blog** (a fresh `indiauseful.blogspot.com`). Blogger's
> importer is **not** idempotent — running it twice creates duplicates.

1. Sign in to Blogger and select **indiauseful.blogspot.com**.
2. (Recommended, optional) Back up first: **Settings → Manage blog → Back up
   content → Download**.
3. Upload the theme so the imported content renders immediately:
   **Theme → ⋮ (Customise) → Backup/Restore → Upload**, and choose
   `blogger/indiauseful-theme.xml` from this repository. *(Theme and content are
   independent — importing content never touches the theme.)*
4. Import the content: **Settings → Manage blog → Import content → Import**.
5. Choose `blogger/import/indiauseful-blogger-import.xml`.
6. Leave **"Automatically publish all imported posts and pages"** checked to
   publish everything at once. If you want to review first, untick it — the
   content is imported unpublished and you publish it from **Posts** / **Pages**.
7. Click **Import** and wait for the import to finish (46 entries).
8. Open `https://indiauseful.blogspot.com/` and check the homepage links.

### Importing by API instead

`blogger/scripts/import-blogger.mjs` performs an **idempotent** upsert through
the Blogger API v3 (`node blogger/scripts/import-blogger.mjs --dry-run`), which
is the better choice for repeat/re-runnable publishing. Use one route or the
other, not both, unless you have removed the entries the first one created.

---

## 3. Expected result and verification checklist

**Pages** — 32 entries, `Pages` count in the Blogger dashboard:

| # | Page | Blogger URL |
|---|---|---|
| 1 | Loan EMI Calculator | `/p/emi-calculator.html` |
| 2 | Home Loan EMI Calculator | `/p/home-loan-emi-calculator.html` |
| 3 | Personal Loan EMI Calculator | `/p/personal-loan-emi-calculator.html` |
| 4 | Car / Vehicle Loan Calculator | `/p/car-loan-emi-calculator.html` |
| 5 | Loan Prepayment Calculator | `/p/loan-prepayment-calculator.html` |
| 6 | Fixed Deposit (FD) Calculator | `/p/fd-calculator.html` |
| 7 | Recurring Deposit (RD) Calculator | `/p/rd-calculator.html` |
| 8 | SIP Calculator (Mutual Funds) | `/p/sip-calculator.html` |
| 9 | PPF (Public Provident Fund) Calculator | `/p/ppf-calculator.html` |
| 10 | NPS (National Pension System) Calculator | `/p/nps-calculator.html` |
| 11 | Gratuity Calculator | `/p/gratuity-calculator.html` |
| 12 | In-Hand Salary Calculator | `/p/salary-calculator.html` |
| 13 | CTC to In-Hand Salary Breakdown | `/p/ctc-inhand-calculator.html` |
| 14 | Gold Price & Jewellery Billing Calculator | `/p/gold-price-calculator.html` |
| 15 | GST Calculator (India) | `/p/gst-calculator.html` |
| 16 | Percentage Calculator | `/p/percentage-calculator.html` |
| 17 | Age Calculator | `/p/age-calculator.html` |
| 18 | Date Difference / Duration Calculator | `/p/date-difference-calculator.html` |
| 19 | Discount & Sale Price Calculator | `/p/discount-calculator.html` |
| 20 | BMI (Body Mass Index) Calculator | `/p/bmi-calculator.html` |
| 21 | Kerala Pavan & Sovereign Gold Calculator | `/p/kerala-gold-pavan-calculator.html` |
| 22 | Finance & Investments | `/p/category-finance.html` |
| 23 | Banking & Loans | `/p/category-banking.html` |
| 24 | Salary & Employment | `/p/category-jobs.html` |
| 25 | Gold & Jewellery | `/p/category-gold.html` |
| 26 | Everyday Utility Tools | `/p/category-tools.html` |
| 27 | Kerala Special Corner | `/p/category-kerala.html` |
| 28 | About IndiaUseful | `/p/about.html` |
| 29 | Privacy Policy | `/p/privacy.html` |
| 30 | Disclaimer | `/p/disclaimer.html` |
| 31 | Contact IndiaUseful | `/p/contact.html` |
| 32 | Terms of Service | `/p/terms.html` |

**Category hubs and legal pages** (part of the 32 pages above):

| Type | Title | Blogger URL | Category |
|---|---|---|---|
| category | Finance & Investments | `/p/category-finance.html` | finance |
| category | Banking & Loans | `/p/category-banking.html` | banking |
| category | Salary & Employment | `/p/category-jobs.html` | jobs |
| category | Gold & Jewellery | `/p/category-gold.html` | gold |
| category | Everyday Utility Tools | `/p/category-tools.html` | tools |
| category | Kerala Special Corner | `/p/category-kerala.html` | kerala |
| legal | About IndiaUseful | `/p/about.html` | — |
| legal | Privacy Policy | `/p/privacy.html` | — |
| legal | Disclaimer | `/p/disclaimer.html` | — |
| legal | Contact IndiaUseful | `/p/contact.html` | — |
| legal | Terms of Service | `/p/terms.html` | — |

**Posts** — 14 entries, `Posts` count in the Blogger dashboard:

| # | Title | Blogger URL | Date | Label |
|---|---|---|---|---|
| 1 | SIP Return Calculation: Contributions, Compounding and Assumptions | `/2026/10/sip-return-calculation-guide.html` | 2026-10-02 | finance |
| 2 | RD Maturity Calculation: Monthly Deposits, Compounding and TDS | `/2026/10/rd-maturity-monthly-deposits-guide.html` | 2026-10-02 | banking |
| 3 | PPF Maturity and the 5th-of-the-Month Interest Rule | `/2026/10/ppf-maturity-fifth-of-month-rule-guide.html` | 2026-10-02 | finance |
| 4 | Personal Loan EMI: Flat Rate vs Reducing Balance Explained | `/2026/10/personal-loan-flat-vs-reducing-interest-guide.html` | 2026-10-02 | banking |
| 5 | NPS Corpus, Annuity and Pension: Calculation and Exit-Rule Context | `/2026/10/nps-corpus-annuity-pension-guide.html` | 2026-10-02 | finance |
| 6 | Loan Prepayment: Reduce EMI or Shorten Tenure? | `/2026/10/loan-prepayment-emi-vs-tenure-guide.html` | 2026-10-02 | banking |
| 7 | Home Loan EMI and Salary Affordability: A Practical Planning Guide | `/2026/10/home-loan-emi-salary-affordability-guide.html` | 2026-10-02 | banking |
| 8 | Gratuity Calculation: Salary, Service Years and Estimate Limits | `/2026/10/gratuity-calculation-guide.html` | 2026-10-02 | jobs |
| 9 | FD Maturity Calculation: Quarterly Compounding, Interest and TDS | `/2026/10/fd-maturity-quarterly-compounding-guide.html` | 2026-10-02 | banking |
| 10 | Car Loan EMI: Down Payment, On-Road Price and Tenure | `/2026/10/car-loan-down-payment-tenure-guide.html` | 2026-10-02 | banking |
| 11 | How Home Loan EMI is Calculated in India: Formula, Amortization, and Prepayment Hacks | `/2026/09/how-to-calculate-home-loan-emi-india.html` | 2026-09-20 | banking |
| 12 | SIP vs Lumpsum Mutual Fund Investing in India: Compounding and Rupee Cost Averaging | `/2026/09/sip-vs-lumpsum-mutual-funds-guide.html` | 2026-09-18 | finance |
| 13 | Buying Gold Jewellery in India: Hallmark HUID, 3% GST, and Making Charges Explained | `/2026/09/gold-buying-guide-hallmarking-gst-making-charges.html` | 2026-09-15 | gold |
| 14 | CTC vs In-Hand Salary Explained: EPF, Gratuity, Professional Tax, and Income Tax | `/2026/09/understanding-ctc-vs-in-hand-salary-india.html` | 2026-09-12 | jobs |

After importing, confirm:

- [ ] Blogger shows **32 pages** and **14 posts**.
- [ ] `https://indiauseful.blogspot.com/p/emi-calculator.html` loads with a
      working calculator.
- [ ] `https://indiauseful.blogspot.com/p/category-finance.html` lists the
      finance calculators.
- [ ] A guide such as
      `https://indiauseful.blogspot.com/2026/10/gratuity-calculation-guide.html`
      renders inside the IndiaUseful theme.
- [ ] Spot-check a few internal links (breadcrumbs, "Related calculators"
      cards) resolve instead of returning *Page not found*.
- [ ] Each post carries its label (`banking`, `finance`, `gold`, `jobs`) and the
      `article` / `guide` label, visible under **Posts → filter by label**.

If a link 404s, compare its path with the `blogger:filename` values in this XML —
the theme, the content and this file are all built from the same
`blogger/content/manifest.json` route map.

---

## 4. What is intentionally *not* in the file

| Not included | Why | Where it lives instead |
|---|---|---|
| Theme / template | Content import must never overwrite the layout | `blogger/indiauseful-theme.xml` |
| Blog settings (title, description, URLs) | Would overwrite the live blog configuration | Blogger **Settings** |
| Comments | The Blogger edition has no comments; none were generated | — |
| Per-post search descriptions (`seoDescription` in the manifest) | Blogger's Atom import carries no field for them | Set manually per post, or use the API importer |
| AdSense, analytics, `ads.txt` | The Blogger edition is deliberately ad-free and tracker-free | — |

---

## 5. Provenance and integrity

- Generated from the **Blogger edition** in this repository:
  `blogger/content/manifest.json` plus the 46 files in `blogger/content/pages/`
  and `blogger/content/posts/`
  (manifest `sourceCommit`: `8540307882a503c7e114ff78b193fd4d089bbfcd`).
- Every content file's **SHA-256 is recorded in the manifest** and was verified
  while building this XML; the HTML inside `<content type='html'>` is the source
  file escaped for XML (`&`, `<`, `>` only) and nothing else, so unescaping
  reproduces the repository file byte-for-byte.
- The output is **deterministic**: the same manifest and content produce the same
  XML byte-for-byte, and dates come from the content (not wall-clock time), which
  keeps the file stable in git.
- **No `src/`, `public/`, Cloudflare/Wrangler, sitemap, robots or AdSense file is
  involved or modified** by this import file.
