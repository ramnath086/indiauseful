# IndiaUseful — Next.js to Blogger URL Mapping & Sitemap Plan

This document maps every canonical route from the Next.js production site (`src/`) to its corresponding Blogger static page (`/p/*.html`) or dated post permalink (`/YYYY/MM/*.html`).

## Summary Counts

- **Homepage**: 1 (`/`)
- **Calculator Static Pages**: 21 (`/p/<slug>.html`)
- **Category Hub Static Pages**: 6 (`/p/category-<id>.html`, plus Blogger label archives `/search/label/<id>`)
- **Legal & Trust Static Pages**: 5 (`/p/about.html`, `/p/privacy.html`, `/p/disclaimer.html`, `/p/contact.html`, `/p/terms.html`)
- **Long-Form Guides (Posts)**: 10 (`/YYYY/MM/<slug>.html`)
- **Base Articles (Posts)**: 4 (`/YYYY/MM/<slug>.html`)
- **Total Mapped Content Items**: 32 static pages + 14 posts = 46 items

## Blogger Sitemap & Crawlability Plan

Blogger automatically generates and serves XML sitemaps at:
- `/sitemap.xml` (primary posts sitemap index)
- `/sitemap-pages.xml` (static pages sitemap covering all `/p/*.html` calculator, category, and legal pages)
- `/atom.xml` and `/feeds/posts/default` (Atom/RSS feeds)

In addition, the homepage (`/`) in `indiauseful-theme.xml` includes crawlable HTML links to all 6 category hubs, all 21 calculators, all 14 guides/articles, and all 5 legal/trust pages so search engine crawlers can discover every page within 1 click of the root URL.

## 1. Calculator Pages (21)

| # | Calculator ID | Production Route | Blogger Static Page Path | Category |
|---|---|---|---|---|
| 1 | `emi` | `/calculators/emi-calculator` | `/p/emi-calculator.html` | `banking` |
| 2 | `home-loan` | `/calculators/home-loan-emi-calculator` | `/p/home-loan-emi-calculator.html` | `banking` |
| 3 | `personal-loan` | `/calculators/personal-loan-emi-calculator` | `/p/personal-loan-emi-calculator.html` | `banking` |
| 4 | `car-loan` | `/calculators/car-loan-emi-calculator` | `/p/car-loan-emi-calculator.html` | `banking` |
| 5 | `loan-prepayment` | `/calculators/loan-prepayment-calculator` | `/p/loan-prepayment-calculator.html` | `banking` |
| 6 | `fd` | `/calculators/fd-calculator` | `/p/fd-calculator.html` | `banking` |
| 7 | `rd` | `/calculators/rd-calculator` | `/p/rd-calculator.html` | `banking` |
| 8 | `sip` | `/calculators/sip-calculator` | `/p/sip-calculator.html` | `finance` |
| 9 | `ppf` | `/calculators/ppf-calculator` | `/p/ppf-calculator.html` | `finance` |
| 10 | `nps` | `/calculators/nps-calculator` | `/p/nps-calculator.html` | `finance` |
| 11 | `gratuity` | `/calculators/gratuity-calculator` | `/p/gratuity-calculator.html` | `jobs` |
| 12 | `salary` | `/calculators/salary-calculator` | `/p/salary-calculator.html` | `jobs` |
| 13 | `ctc-inhand` | `/calculators/ctc-inhand-calculator` | `/p/ctc-inhand-calculator.html` | `jobs` |
| 14 | `gold-price` | `/calculators/gold-price-calculator` | `/p/gold-price-calculator.html` | `gold` |
| 15 | `gst` | `/calculators/gst-calculator` | `/p/gst-calculator.html` | `tools` |
| 16 | `percentage` | `/calculators/percentage-calculator` | `/p/percentage-calculator.html` | `tools` |
| 17 | `age` | `/calculators/age-calculator` | `/p/age-calculator.html` | `tools` |
| 18 | `date-difference` | `/calculators/date-difference-calculator` | `/p/date-difference-calculator.html` | `tools` |
| 19 | `discount` | `/calculators/discount-calculator` | `/p/discount-calculator.html` | `tools` |
| 20 | `bmi` | `/calculators/bmi-calculator` | `/p/bmi-calculator.html` | `tools` |
| 21 | `kerala-gold` | `/calculators/kerala-gold-pavan-calculator` | `/p/kerala-gold-pavan-calculator.html` | `kerala` |

## 2. Category Hub Pages (6)

| # | Category ID | Production Route | Blogger Static Page Path | Blogger Label Archive |
|---|---|---|---|---|
| 1 | `finance` | `/category/finance` | `/p/category-finance.html` | `/search/label/finance` |
| 2 | `banking` | `/category/banking` | `/p/category-banking.html` | `/search/label/banking` |
| 3 | `jobs` | `/category/jobs` | `/p/category-jobs.html` | `/search/label/jobs` |
| 4 | `gold` | `/category/gold` | `/p/category-gold.html` | `/search/label/gold` |
| 5 | `tools` | `/category/tools` | `/p/category-tools.html` | `/search/label/tools` |
| 6 | `kerala` | `/category/kerala` | `/p/category-kerala.html` | `/search/label/kerala` |

## 3. Legal & Trust Pages (5)

| # | Page | Production Route | Blogger Static Page Path |
|---|---|---|---|
| 1 | About Us | `/about` | `/p/about.html` |
| 2 | Privacy Policy | `/privacy` | `/p/privacy.html` |
| 3 | Financial & General Disclaimer | `/disclaimer` | `/p/disclaimer.html` |
| 4 | Contact Us | `/contact` | `/p/contact.html` |
| 5 | Terms of Service | `/terms` | `/p/terms.html` |

## 4. Articles & Long-Form Guides (14 Posts)

| # | Type | Production Route | Expected Blogger Post Path | Date | Category |
|---|---|---|---|---|---|
| 1 | Article | `/articles/how-to-calculate-home-loan-emi-india` | `/2026/09/how-to-calculate-home-loan-emi-india.html` | 2026-09-20 | `banking` |
| 2 | Article | `/articles/sip-vs-lumpsum-mutual-funds-guide` | `/2026/09/sip-vs-lumpsum-mutual-funds-guide.html` | 2026-09-18 | `finance` |
| 3 | Article | `/articles/gold-buying-guide-hallmarking-gst-making-charges` | `/2026/09/gold-buying-guide-hallmarking-gst-making-charges.html` | 2026-09-15 | `gold` |
| 4 | Article | `/articles/understanding-ctc-vs-in-hand-salary-india` | `/2026/09/understanding-ctc-vs-in-hand-salary-india.html` | 2026-09-12 | `jobs` |
| 5 | Guide | `/articles/home-loan-emi-salary-affordability-guide` | `/2026/10/home-loan-emi-salary-affordability-guide.html` | 2026-10-02 | `banking` |
| 6 | Guide | `/articles/personal-loan-flat-vs-reducing-interest-guide` | `/2026/10/personal-loan-flat-vs-reducing-interest-guide.html` | 2026-10-02 | `banking` |
| 7 | Guide | `/articles/car-loan-down-payment-tenure-guide` | `/2026/10/car-loan-down-payment-tenure-guide.html` | 2026-10-02 | `banking` |
| 8 | Guide | `/articles/loan-prepayment-emi-vs-tenure-guide` | `/2026/10/loan-prepayment-emi-vs-tenure-guide.html` | 2026-10-02 | `banking` |
| 9 | Guide | `/articles/fd-maturity-quarterly-compounding-guide` | `/2026/10/fd-maturity-quarterly-compounding-guide.html` | 2026-10-02 | `banking` |
| 10 | Guide | `/articles/rd-maturity-monthly-deposits-guide` | `/2026/10/rd-maturity-monthly-deposits-guide.html` | 2026-10-02 | `banking` |
| 11 | Guide | `/articles/sip-return-calculation-guide` | `/2026/10/sip-return-calculation-guide.html` | 2026-10-02 | `finance` |
| 12 | Guide | `/articles/ppf-maturity-fifth-of-month-rule-guide` | `/2026/10/ppf-maturity-fifth-of-month-rule-guide.html` | 2026-10-02 | `finance` |
| 13 | Guide | `/articles/nps-corpus-annuity-pension-guide` | `/2026/10/nps-corpus-annuity-pension-guide.html` | 2026-10-02 | `finance` |
| 14 | Guide | `/articles/gratuity-calculation-guide` | `/2026/10/gratuity-calculation-guide.html` | 2026-10-02 | `jobs` |
