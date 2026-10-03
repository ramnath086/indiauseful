# IndiaUseful — Blogger Edition (`blogger/`)

This directory contains the complete, self-contained **Blogger edition** of **IndiaUseful**, generated directly from the current production source (`src/`) without modifying any files outside `blogger/`.

---

## Directory Structure

```text
blogger/
├── README.md                        # Documentation, deployment & verification guide
├── indiauseful-theme.xml            # Complete responsive Blogger XML theme (CSS + 21 calculators JS embedded)
├── assets/
│   ├── calculators.js               # Standalone client-side calculator engine + header search/nav runtime
│   └── styles.css                   # Responsive stylesheet matching IndiaUseful branding
├── content/
│   ├── manifest.json                # Complete inventory of 32 static pages and 14 posts with SHA-256 & metadata
│   ├── url-map.json                 # Deterministic route mapping from Next.js paths to Blogger paths
│   ├── url-mapping.md               # Human-readable route mapping table & Blogger sitemap plan
│   ├── pages/                       # 32 static pages (21 calculators + 6 category hubs + 5 legal/trust pages)
│   └── posts/                       # 14 blog posts (10 long-form guides + 4 foundational articles)
├── scripts/
│   ├── build-content.mjs            # Generates pages, posts, manifest.json, url-map.json, and url-mapping.md
│   ├── build-theme.mjs              # Generates assets/styles.css, assets/calculators.js, and indiauseful-theme.xml
│   ├── import-blogger.mjs           # Idempotent Blogger API v3 publisher (supports --dry-run & 2-pass link patching)
│   └── verify-blogger.mjs           # Automated 149-check verification suite
└── src/
    ├── browser-runtime.mjs          # Generates the zero-network client-side JS runtime
    ├── calculator-engine.mjs        # Pure calculation functions & specs for all 21 calculators
    ├── calculator-ui.mjs            # Pre-rendered HTML widgets for all 21 calculators
    ├── content-renderer.mjs         # Markdown & page/post HTML renderer with automatic internal link rewriting
    ├── extract-production-data.mjs  # Reads production TypeScript data directly from ../src/
    ├── theme-generator.mjs          # Generates styles.css and indiauseful-theme.xml
    └── url-mapper.mjs               # Builds canonical route mappings
```

---

## Content Inventory

- **21 Client-Side Calculators** (`/p/<slug>.html`):
  1. `emi-calculator` — Loan EMI Calculator
  2. `home-loan-emi-calculator` — Home Loan EMI Calculator
  3. `personal-loan-emi-calculator` — Personal Loan EMI Calculator
  4. `car-loan-emi-calculator` — Car / Vehicle Loan Calculator
  5. `loan-prepayment-calculator` — Loan Prepayment Calculator
  6. `fd-calculator` — Fixed Deposit (FD) Calculator
  7. `rd-calculator` — Recurring Deposit (RD) Calculator
  8. `sip-calculator` — SIP Calculator (Mutual Funds)
  9. `ppf-calculator` — PPF (Public Provident Fund) Calculator
  10. `nps-calculator` — NPS (National Pension System) Calculator
  11. `gratuity-calculator` — Gratuity Calculator
  12. `salary-calculator` — In-Hand Salary Calculator
  13. `ctc-inhand-calculator` — CTC to In-Hand Salary Breakdown
  14. `gold-price-calculator` — Gold Price & Jewellery Billing Calculator
  15. `gst-calculator` — GST Calculator (India)
  16. `percentage-calculator` — Percentage Calculator
  17. `age-calculator` — Age Calculator
  18. `date-difference-calculator` — Date Difference / Duration Calculator
  19. `discount-calculator` — Discount & Sale Price Calculator
  20. `bmi-calculator` — BMI (Body Mass Index) Calculator
  21. `kerala-gold-pavan-calculator` — Kerala Pavan & Sovereign Gold Calculator
- **6 Category Hub Pages** (`/p/category-<id>.html`):
  - `category-finance.html`, `category-banking.html`, `category-jobs.html`, `category-gold.html`, `category-tools.html`, `category-kerala.html`
- **5 Legal & Trust Pages** (`/p/<slug>.html`):
  - `about.html`, `privacy.html`, `disclaimer.html`, `contact.html`, `terms.html`
- **14 Articles & Long-Form Guides** (`/YYYY/MM/<slug>.html`):
  - 10 long-form calculator guides (>1,000 words each) + 4 foundational articles

---

## Build, Verify & Publish Commands

### 1. Rebuild Content & Theme from Production Source
```bash
node blogger/scripts/build-content.mjs
node blogger/scripts/build-theme.mjs
```

### 2. Run the 149-Check Verification Suite
```bash
node blogger/scripts/verify-blogger.mjs
```

### 3. Dry-Run or Publish via Blogger API v3
```bash
# Dry-run validation (no credentials required)
node blogger/scripts/import-blogger.mjs --dry-run

# Live idempotent upsert + two-pass internal link patching
BLOGGER_BLOG_ID="your-blog-id" \
BLOGGER_ACCESS_TOKEN="your-oauth2-token" \
node blogger/scripts/import-blogger.mjs --execute
```

---

## SEO, Sitemap & Privacy Posture

- **Blogger Native Sitemaps**: Blogger automatically serves `/sitemap.xml` (posts) and `/sitemap-pages.xml` (all `/p/*.html` static pages).
- **Crawlable Homepage**: The root homepage (`/`) in `indiauseful-theme.xml` includes direct HTML links to all 6 categories, all 21 calculators, all 14 guides/articles, and all 5 legal/trust pages.
- **No AdSense / No Analytics**: No AdSense script, publisher ID, `ads.txt`, or analytics/tracking code is included. All calculator computations run 100% locally in the user's browser with zero network requests.
