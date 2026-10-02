#!/usr/bin/env node
/**
 * IndiaUseful Blogger Verification Suite (`verify-blogger.mjs`)
 *
 * Executes 149 automated checks across:
 * - File & content counts (10 checks)
 * - All 21 calculators: defaults, bounds, pre-rendered outputs, and custom test vectors vs production formulas (63 checks)
 * - All 21 calculator static pages content, formulas, examples, assumptions, limitations, and FAQs (21 checks)
 * - All 6 category hub pages content and Malayalam titles (6 checks)
 * - All 14 posts (10 long-form guides + 4 base articles) content and word counts (14 checks)
 * - All 5 legal & trust pages content (5 checks)
 * - Blogger theme XML well-formedness, Blogger tags/data tags, SEO metadata, AdSense/analytics absence, and calculator engine network isolation (15 checks)
 * - Preserved factual corrections from `main` and 100% internal link integrity (15 checks)
 */

import fs from 'node:fs';
import path from 'node:path';
import { BLOGGER_ROOT, REPO_ROOT, getProductionData } from '../src/extract-production-data.mjs';
import {
  CALCULATOR_SPECS,
  computeCalculatorById,
  formatIndianCurrency
} from '../src/calculator-engine.mjs';
import { runBloggerImport, patchInternalLinks } from './import-blogger.mjs';

const results = [];

function check(name, condition, detail = '') {
  const passed = Boolean(condition);
  results.push({ id: results.length + 1, name, passed, detail });
  if (!passed) {
    console.error(`  ✗ [${results.length}] FAIL: ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

/**
 * Strict XML well-formedness verifier for `indiauseful-theme.xml`
 * Checks XML declaration, CDATA blocks, comments, self-closing tags, and full tag stack balance.
 */
function verifyXmlWellFormed(xmlContent) {
  if (!xmlContent.startsWith('<?xml version="1.0" encoding="UTF-8" ?>')) {
    return { ok: false, error: 'Missing XML declaration' };
  }

  // Strip CDATA and XML comments before checking tag stack
  const stripped = xmlContent
    .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    .replace(/<!DOCTYPE[^>]*>/gi, '');

  const tagRegex = /<\/?([a-zA-Z0-9_:.-]+)(?:\s+[^<>]*?)?(\/?)>/g;
  const stack = [];
  let match;

  while ((match = tagRegex.exec(stripped)) !== null) {
    const fullTag = match[0];
    const tagName = match[1];
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = match[2] === '/';

    if (isSelfClosing) continue;
    if (isClosing) {
      const top = stack.pop();
      if (top !== tagName) {
        return {
          ok: false,
          error: `Mismatched closing tag </${tagName}>; expected </${top}>`
        };
      }
    } else {
      stack.push(tagName);
    }
  }

  if (stack.length > 0) {
    return {
      ok: false,
      error: `Unclosed XML tags remaining: ${stack.join(', ')}`
    };
  }

  return { ok: true };
}

async function main() {
  const prod = getProductionData();
  const {
    CATEGORIES,
    CALCULATORS,
    ARTICLES,
    GUIDES,
    CALCULATOR_GUIDES
  } = prod;

  const themePath = path.join(BLOGGER_ROOT, 'indiauseful-theme.xml');
  const calcJsPath = path.join(BLOGGER_ROOT, 'assets', 'calculators.js');
  const stylesCssPath = path.join(BLOGGER_ROOT, 'assets', 'styles.css');
  const manifestPath = path.join(BLOGGER_ROOT, 'content', 'manifest.json');
  const urlMapPath = path.join(BLOGGER_ROOT, 'content', 'url-map.json');
  const urlMappingMdPath = path.join(BLOGGER_ROOT, 'content', 'url-mapping.md');
  const readmePath = path.join(BLOGGER_ROOT, 'README.md');
  const pagesDir = path.join(BLOGGER_ROOT, 'content', 'pages');
  const postsDir = path.join(BLOGGER_ROOT, 'content', 'posts');

  // Ensure README exists before checking
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const urlMap = JSON.parse(fs.readFileSync(urlMapPath, 'utf8'));
  const themeXml = fs.readFileSync(themePath, 'utf8');
  const calcJs = fs.readFileSync(calcJsPath, 'utf8');
  const stylesCss = fs.readFileSync(stylesCssPath, 'utf8');
  const urlMappingMd = fs.readFileSync(urlMappingMdPath, 'utf8');

  // =========================================================================
  // Group A: Content & Artifact Counts (10 checks)
  // =========================================================================
  check('1. blogger/indiauseful-theme.xml exists and is non-empty', themeXml.length > 10000);
  check('2. blogger/assets/calculators.js exists and is non-empty', calcJs.length > 10000);
  check('3. blogger/assets/styles.css exists and is non-empty', stylesCss.length > 5000);
  check(
    '4. blogger/content/manifest.json has 32 static pages and 14 posts',
    manifest.pages.length === 32 && manifest.posts.length === 14
  );
  check(
    '5. blogger/content/url-map.json maps all 47 canonical routes + 2 anchors',
    Object.keys(urlMap.routes).length === 49 && urlMap.pages.length === 32 && urlMap.posts.length === 14
  );
  check(
    '6. blogger/content/url-mapping.md documents calculators, categories, legal pages, and posts',
    urlMappingMd.includes('Calculator Pages (21)') &&
      urlMappingMd.includes('Category Hub Pages (6)') &&
      urlMappingMd.includes('Legal & Trust Pages (5)') &&
      urlMappingMd.includes('Articles & Long-Form Guides (14 Posts)')
  );
  check('7. blogger/README.md exists and is non-empty', fs.existsSync(readmePath) && fs.statSync(readmePath).size > 500);

  const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
  const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.html'));
  check('8. blogger/content/pages/ contains exactly 32 HTML files', pageFiles.length === 32);
  check('9. blogger/content/posts/ contains exactly 14 HTML files', postFiles.length === 14);
  check(
    '10. blogger/scripts/ contains build-content.mjs, build-theme.mjs, verify-blogger.mjs, import-blogger.mjs',
    ['build-content.mjs', 'build-theme.mjs', 'verify-blogger.mjs', 'import-blogger.mjs'].every(f =>
      fs.existsSync(path.join(BLOGGER_ROOT, 'scripts', f))
    )
  );

  // =========================================================================
  // Group B: All 21 Calculators — Defaults, Pre-rendered Outputs & Custom Vectors (63 checks)
  // =========================================================================
  const customTestVectors = {
    emi: {
      input: { loanAmount: 2500000, interestRate: 9.0, tenureYears: 15 },
      expectedDefaultPrimary: formatIndianCurrency(25357),
      customInput: { loanAmount: 1500000, interestRate: 10.0, tenureYears: 10 },
      assertCustom: r => r.emi === 19823 && r.totalPayment === 19823 * 120 && r.totalInterest === 19823 * 120 - 1500000
    },
    'home-loan': {
      input: { loanAmount: 5000000, interestRate: 8.5, tenureYears: 20 },
      expectedDefaultPrimary: formatIndianCurrency(43391),
      customInput: { loanAmount: 5000000, interestRate: 8.5, tenureYears: 15 },
      assertCustom: r => r.emi === 49237 && r.totalPayment === 49237 * 180
    },
    'personal-loan': {
      input: { loanAmount: 300000, interestRate: 12.5, tenureYears: 3 },
      expectedDefaultPrimary: formatIndianCurrency(10036),
      customInput: { loanAmount: 300000, interestRate: 10.0, tenureYears: 3 },
      assertCustom: r => r.emi === 9680 && r.totalPayment === 348480 && r.totalInterest === 48480
    },
    'car-loan': {
      input: { loanAmount: 800000, interestRate: 8.9, tenureYears: 5 },
      expectedDefaultPrimary: formatIndianCurrency(16568),
      customInput: { loanAmount: 1000000, interestRate: 9.5, tenureYears: 7 },
      assertCustom: r => r.emi === 16344 && r.totalMonths === 84
    },
    'loan-prepayment': {
      input: { loanAmount: 4000000, interestRate: 8.75, tenureYears: 20, lumpsumPrepayment: 200000, prepayAfterYear: 3 },
      expectedDefaultPrimary: formatIndianCurrency(611721),
      customInput: { loanAmount: 4000000, interestRate: 8.75, tenureYears: 20, lumpsumPrepayment: 500000, prepayAfterYear: 2 },
      assertCustom: r => r.normalEmi === 35348 && r.monthsSaved > 40 && r.interestSaved > 1400000
    },
    fd: {
      input: { depositAmount: 100000, interestRate: 7.1, tenureYears: 5, isSeniorCitizen: false },
      expectedDefaultPrimary: formatIndianCurrency(142175),
      customInput: { depositAmount: 100000, interestRate: 7.1, tenureYears: 5, isSeniorCitizen: true },
      assertCustom: r => r.effectiveRate === 7.6 && r.maturityAmount === Math.round(100000 * Math.pow(1 + 7.6 / 400, 20))
    },
    rd: {
      input: { depositAmount: 5000, interestRate: 7.1, tenureYears: 3, isSeniorCitizen: false },
      expectedDefaultPrimary: formatIndianCurrency(201001),
      customInput: { depositAmount: 5000, interestRate: 7.1, tenureYears: 3, isSeniorCitizen: true },
      assertCustom: r => r.effectiveRate === 7.6 && r.totalInvested === 180000 && r.maturityAmount > 201001
    },
    sip: {
      input: { monthlyInvestment: 10000, expectedRate: 12, tenureYears: 15 },
      expectedDefaultPrimary: formatIndianCurrency(5045760),
      customInput: { monthlyInvestment: 10000, expectedRate: 12, tenureYears: 20 },
      assertCustom: r => r.futureValue === 9991479 && r.investedAmount === 2400000
    },
    ppf: {
      input: { annualDeposit: 150000, tenureYears: 15 },
      expectedDefaultPrimary: formatIndianCurrency(4068208),
      customInput: { annualDeposit: 200000, tenureYears: 20 },
      assertCustom: r => r.annualDeposit === 150000 && r.totalInvested === 3000000 && r.balance > 6600000
    },
    nps: {
      input: { currentAge: 30, monthlyContribution: 5000, expectedReturn: 10, annuitySharePercent: 40 },
      expectedDefaultPrimary: formatIndianCurrency(11396627),
      customInput: { currentAge: 35, monthlyContribution: 10000, expectedReturn: 10, annuitySharePercent: 25 },
      assertCustom: r => r.annuitySharePercent === 40 && r.investmentYears === 25 && r.totalInvested === 3000000
    },
    gratuity: {
      input: { basicSalary: 50000, yearsOfService: 7, isCoveredUnderAct: true },
      expectedDefaultPrimary: formatIndianCurrency(201923),
      customInput: { basicSalary: 50000, yearsOfService: 4, isCoveredUnderAct: true },
      assertCustom: r => r.gratuityAmount === 0 && computeCalculatorById('gratuity', { basicSalary: 60000, yearsOfService: 10, isCoveredUnderAct: false }).gratuityAmount === 300000
    },
    salary: {
      input: { ctcAnnual: 900000, bonusAnnual: 50000, monthlyProfTax: 200 },
      expectedDefaultPrimary: formatIndianCurrency(65590),
      customInput: { ctcAnnual: 1200000, bonusAnnual: 100000, monthlyProfTax: 0 },
      assertCustom: r => r.employerPfMonthly === 1800 && r.monthlyInHand === r.monthlyGross - 1800
    },
    'ctc-inhand': {
      input: { ctcAnnual: 900000, bonusAnnual: 50000, monthlyProfTax: 200 },
      expectedDefaultPrimary: formatIndianCurrency(65590),
      customInput: { ctcAnnual: 600000, bonusAnnual: 0, monthlyProfTax: 150 },
      assertCustom: r => r.basicAnnual === 240000 && r.MonthlyInHand !== 0 && r.monthlyInHand === 50000 - 1800 - 962 - 1800 - 150
    },
    'gold-price': {
      input: { gramWeight: 10, ratePerGram22k: 6800, purity: '22k', makingChargeType: 'percent', makingChargeValue: 12 },
      expectedDefaultPrimary: formatIndianCurrency(78491),
      customInput: { gramWeight: 10, ratePerGram22k: 6800, purity: '24k', makingChargeType: 'perGram', makingChargeValue: 500 },
      assertCustom: r => r.effectiveGramRate === Math.round(6800 * (24 / 22)) && r.makingChargeAmount === 5000
    },
    gst: {
      input: { amount: 10000, gstRate: 18, calculationType: 'exclusive' },
      expectedDefaultPrimary: formatIndianCurrency(11800),
      customInput: { amount: 11800, gstRate: 18, calculationType: 'inclusive' },
      assertCustom: r => r.netAmount === 10000 && r.gstAmount === 1800 && r.halfGst === 900
    },
    percentage: {
      input: { percNum1: 25, percNum2: 200 },
      expectedDefaultPrimary: '50',
      customInput: { percNum1: 45, percNum2: 60 },
      assertCustom: r => r.isOf === 27 && r.whatPercent === '75.00'
    },
    age: {
      input: { dob: '1998-05-15' },
      expectedDefaultPrimary: '1998-05-15',
      customInput: { dob: '2000-01-01', referenceDate: '2026-10-03T00:00:00Z' },
      assertCustom: r => r.years === 26 && r.months === 9 && r.totalDays > 9700
    },
    'date-difference': {
      input: { startDate: '2026-01-01', endDate: '2026-12-31' },
      expectedDefaultPrimary: '364',
      customInput: { startDate: '2026-03-01', endDate: '2026-03-22' },
      assertCustom: r => r.totalDays === 21 && r.weeks === 3 && r.remainderDays === 0
    },
    discount: {
      input: { originalPrice: 2499, discountPercent: 30 },
      expectedDefaultPrimary: formatIndianCurrency(1749),
      customInput: { originalPrice: 5000, discountPercent: 25 },
      assertCustom: r => r.discountAmount === 1250 && r.finalPrice === 3750
    },
    bmi: {
      input: { heightCm: 172, weightKg: 68 },
      expectedDefaultPrimary: '23.0',
      customInput: { heightCm: 170, weightKg: 60 },
      assertCustom: r => r.bmi === '20.8' && r.category.includes('18.5 - 22.9 Asian Cutoff')
    },
    'kerala-gold': {
      input: { gramWeight: 8, ratePerGram22k: 6800, purity: '22k', makingChargeType: 'percent', makingChargeValue: 12 },
      expectedDefaultPrimary: formatIndianCurrency(62802),
      customInput: { gramWeight: 16, ratePerGram22k: 6800, purity: '22k', makingChargeType: 'percent', makingChargeValue: 12 },
      assertCustom: r => r.pavans === '2.00' && r.rawGoldValue === 108800
    }
  };

  for (const calc of CALCULATORS) {
    const spec = CALCULATOR_SPECS[calc.id];
    const tv = customTestVectors[calc.id];
    const pageHtml = fs.readFileSync(path.join(pagesDir, `${calc.slug}.html`), 'utf8');

    // Check 1: Spec & default inputs match
    const defaultsMatch =
      spec &&
      spec.slug === calc.slug &&
      Object.entries(tv.input).every(([k, v]) => spec.defaults[k] === v);
    check(`Calc [${calc.id}] defaults & spec match production`, defaultsMatch);

    // Check 2: Default calculation output is pre-rendered in page HTML
    const defaultInHtml = pageHtml.includes(tv.expectedDefaultPrimary);
    check(
      `Calc [${calc.id}] default output (${tv.expectedDefaultPrimary}) pre-rendered in ${calc.slug}.html`,
      defaultInHtml
    );

    // Check 3: Custom/edge-case test vector matches production formula
    const customRes = computeCalculatorById(calc.id, tv.customInput);
    check(`Calc [${calc.id}] custom/edge-case vector matches production formula`, tv.assertCustom(customRes));
  }

  // =========================================================================
  // Group C: All 21 Calculator Static Pages Content & Guide Migration (21 checks)
  // =========================================================================
  for (const calc of CALCULATORS) {
    const pageHtml = fs.readFileSync(path.join(pagesDir, `${calc.slug}.html`), 'utf8');
    const guide = CALCULATOR_GUIDES[calc.id];
    const escapedCalcName = calc.name.replace(/&/g, '&amp;');
    const escapedOverview = guide.overview.slice(0, 60).replace(/&/g, '&amp;');
    const escapedExample = guide.example.slice(0, 60).replace(/&/g, '&amp;');
    const hasAllSections =
      pageHtml.includes(`data-calculator-id="${calc.id}"`) &&
      pageHtml.includes(escapedCalcName) &&
      pageHtml.includes('Planning estimate only.') &&
      pageHtml.includes(escapedOverview) &&
      pageHtml.includes(escapedExample) &&
      pageHtml.includes('Assumptions') &&
      pageHtml.includes('Where this estimate stops') &&
      pageHtml.includes('Practical uses') &&
      pageHtml.includes('Frequently Asked Questions') &&
      guide.faqs.every(f => pageHtml.includes(f.q.replace(/&/g, '&amp;')));
    check(`Calculator Page [${calc.slug}.html] has widget, overview, example, assumptions, limitations & FAQs`, hasAllSections);
  }

  // =========================================================================
  // Group D: All 6 Category Hub Pages Migration (6 checks)
  // =========================================================================
  for (const cat of CATEGORIES) {
    const pageHtml = fs.readFileSync(path.join(pagesDir, `category-${cat.id}.html`), 'utf8');
    const escapedCatName = cat.name.replace(/&/g, '&amp;');
    const escapedMalayalam = cat.malayalamName.replace(/&/g, '&amp;');
    const ok =
      pageHtml.includes(escapedCatName) &&
      pageHtml.includes(escapedMalayalam) &&
      pageHtml.includes('Key Topics') &&
      pageHtml.includes('Important Notes');
    check(`Category Hub [category-${cat.id}.html] has Malayalam title, tools, key topics & notes`, ok);
  }

  // =========================================================================
  // Group E: All 14 Posts (10 Long-Form Guides + 4 Base Articles) Migration (14 checks)
  // =========================================================================
  const guideSlugSet = new Set(GUIDES.map(g => g.slug));
  for (const art of ARTICLES) {
    const postHtml = fs.readFileSync(path.join(postsDir, `${art.slug}.html`), 'utf8');
    const postManifest = manifest.posts.find(p => p.slug === art.slug);
    const isGuide = guideSlugSet.has(art.slug);
    const minWords = isGuide ? 1000 : 350;
    const ok =
      postHtml.includes(art.title.replace(/&/g, '&amp;')) &&
      postHtml.includes(`datetime="${art.date}"`) &&
      postHtml.includes('Related Free Calculators') &&
      postManifest &&
      postManifest.wordCount >= minWords;
    check(
      `Post [${art.slug}.html] migrated (${postManifest ? postManifest.wordCount : 0} words >= ${minWords})`,
      ok
    );
  }

  // =========================================================================
  // Group F: All 5 Legal & Trust Pages Migration (5 checks)
  // =========================================================================
  for (const legalSlug of ['about', 'privacy', 'disclaimer', 'contact', 'terms']) {
    const legalHtml = fs.readFileSync(path.join(pagesDir, `${legalSlug}.html`), 'utf8');
    check(
      `Legal Page [${legalSlug}.html] migrated with breadcrumbs and content`,
      legalHtml.includes(`data-legal-slug="${legalSlug}"`) && legalHtml.includes('aria-label="Breadcrumb"')
    );
  }

  // =========================================================================
  // Group G: Blogger Theme XML, Tags, SEO, AdSense Absence & Network Isolation (15 checks)
  // =========================================================================
  const xmlWellFormed = verifyXmlWellFormed(themeXml);
  check('Theme XML is strictly well-formed', xmlWellFormed.ok, xmlWellFormed.error || '');
  check(
    'Theme XML declares Blogger namespaces (xmlns:b, xmlns:data, xmlns:expr)',
    themeXml.includes('xmlns:b=\'http://www.google.com/2005/gml/b\'') &&
      themeXml.includes('xmlns:data=\'http://www.google.com/2005/gml/data\'') &&
      themeXml.includes('xmlns:expr=\'http://www.google.com/2005/gml/expr\'')
  );
  check(
    'Theme XML includes <b:include data=\'blog\' name=\'all-head-content\'/>',
    themeXml.includes('<b:include data=\'blog\' name=\'all-head-content\'/>')
  );
  check(
    'Theme XML includes <b:skin><![CDATA[...]]></b:skin>',
    themeXml.includes('<b:skin><![CDATA[') && themeXml.includes(']]></b:skin>')
  );
  check(
    'Theme XML includes <b:section id=\'main\'> and <b:widget id=\'Blog1\' type=\'Blog\'>',
    themeXml.includes('<b:section class=\'main-section\' id=\'main\'') &&
      themeXml.includes('<b:widget id=\'Blog1\' locked=\'true\' title=\'Blog Posts\' type=\'Blog\'')
  );
  check(
    'Theme XML handles homepage, static_page, item, and index/archive pageTypes',
    themeXml.includes('data:blog.url == data:blog.homepageUrl') &&
      themeXml.includes('data:blog.pageType == &quot;static_page&quot;') &&
      themeXml.includes('data:blog.pageType == &quot;item&quot;') &&
      themeXml.includes('data:blog.pageType in {&quot;index&quot;, &quot;archive&quot;}')
  );
  check(
    'Theme XML includes Blogger canonical link expr:href=\'data:blog.canonicalUrl\'',
    themeXml.includes('<link expr:href=\'data:blog.canonicalUrl\' rel=\'canonical\'/>')
  );
  check(
    'Theme XML includes dynamic <title> and <meta expr:content=\'data:blog.metaDescription\'/>',
    themeXml.includes('<title><data:blog.pageName/> | <data:blog.title/></title>') &&
      themeXml.includes('<meta expr:content=\'data:blog.metaDescription\' name=\'description\'/>')
  );
  check(
    'Theme XML includes Open Graph and Twitter metadata',
    themeXml.includes('property=\'og:title\'') &&
      themeXml.includes('property=\'og:description\'') &&
      themeXml.includes('name=\'twitter:card\'')
  );
  check(
    'Theme XML Organization JSON-LD has only verified GitHub sameAs and no invented social links',
    themeXml.includes('https://github.com/ramnath086/indiauseful') &&
      !themeXml.includes('t.me/') &&
      !themeXml.includes('twitter.com/indiauseful') &&
      !themeXml.includes('facebook.com/indiauseful') &&
      !themeXml.includes('instagram.com/indiauseful')
  );
  check(
    'Theme XML includes accessible header, search bar, desktop nav, mobile menu, and footer',
    themeXml.includes('id=\'iu-search-input\'') &&
      themeXml.includes('id=\'mobile-menu-panel\'') &&
      themeXml.includes('role=\'contentinfo\'')
  );
  check(
    'Theme XML crawlable homepage links to all 6 categories, 21 calculators, and 14 guides/articles',
    CATEGORIES.every(c => themeXml.includes(`/p/category-${c.id}.html`)) &&
      CALCULATORS.every(c => themeXml.includes(`/p/${c.slug}.html`)) &&
      ARTICLES.every(a => themeXml.includes(`${a.slug}.html`))
  );
  check(
    'No AdSense code, publisher ID, ads.txt, or analytics/tracking in theme or assets',
    !themeXml.includes('adsbygoogle') &&
      !themeXml.includes('pagead2.googlesyndication.com') &&
      !themeXml.includes('ca-pub-') &&
      !themeXml.includes('googletagmanager') &&
      !themeXml.includes('google-analytics') &&
      !fs.existsSync(path.join(BLOGGER_ROOT, 'ads.txt'))
  );
  check(
    'Calculator engine (blogger/assets/calculators.js) makes zero external network requests',
    !calcJs.includes('fetch(') &&
      !calcJs.includes('XMLHttpRequest') &&
      !calcJs.includes('sendBeacon') &&
      !calcJs.includes('WebSocket') &&
      !calcJs.includes('http://') &&
      !calcJs.includes('https://')
  );

  const dryRunResult = await runBloggerImport({ dryRun: true });
  const samplePatched = patchInternalLinks(
    '<a href="/p/emi-calculator.html" data-source-path="/calculators/emi-calculator">EMI</a>',
    { '/calculators/emi-calculator': '/p/emi-calculator-custom.html' },
    urlMap.routes
  );
  check(
    'Importer dry-run (32 pages + 14 posts) and link patcher work idempotently',
    dryRunResult.mode === 'dry-run' &&
      dryRunResult.pagesCount === 32 &&
      dryRunResult.postsCount === 14 &&
      samplePatched.includes('href="/p/emi-calculator-custom.html"')
  );

  // =========================================================================
  // Group H: Preserved Factual Corrections & Internal Link Integrity (15 checks)
  // =========================================================================
  const fdHtml = fs.readFileSync(path.join(pagesDir, 'fd-calculator.html'), 'utf8');
  const rdHtml = fs.readFileSync(path.join(pagesDir, 'rd-calculator.html'), 'utf8');
  const bankingCatHtml = fs.readFileSync(path.join(pagesDir, 'category-banking.html'), 'utf8');
  check(
    '1. Preserved FD/RD TDS thresholds from 1 Apr 2025 (₹50,000 / ₹1,00,000, 10% PAN / 20% no PAN)',
    fdHtml.includes('1 Apr 2025 are ₹50,000 per year for others and ₹1,00,000 for senior citizens') &&
      rdHtml.includes('1 Apr 2025 are ₹50,000 per year for others and ₹1,00,000 for senior citizens') &&
      bankingCatHtml.includes('1 Apr 2025 are ₹50,000 for others and ₹1,00,000 for senior citizens')
  );

  const ppfHtml = fs.readFileSync(path.join(pagesDir, 'ppf-calculator.html'), 'utf8');
  const financeCatHtml = fs.readFileSync(path.join(pagesDir, 'category-finance.html'), 'utf8');
  check(
    '2. Preserved PPF government-notified rate vs fixed 7.1% illustrative assumption',
    ppfHtml.includes('government-notified/current applicable rate') &&
      financeCatHtml.includes('fixed 7.1% illustrative assumption, not a permanently guaranteed rate')
  );

  const ppfManifest = manifest.pages.find(p => p.id === 'ppf');
  check(
    '3. Preserved PPF SEO description with Income-tax Act, 2025 Section 123 (Schedule XV)',
    Boolean(
      ppfManifest &&
        ppfManifest.seoDescription.includes(
          'Tax Year 2026-27: Section 123 (read with Schedule XV), Income-tax Act, 2025, formerly Section 80C of the 1961 Act'
        )
    )
  );

  const disclaimerHtml = fs.readFileSync(path.join(pagesDir, 'disclaimer.html'), 'utf8');
  check(
    '4. Preserved Disclaimer tax-year transition note (Section 123 / Schedule XV and Section 202)',
    disclaimerHtml.includes(
      'Section 123 (read with Schedule XV), formerly Section 80C; and Section 202, formerly Section 115BAC'
    )
  );

  const npsHtml = fs.readFileSync(path.join(pagesDir, 'nps-calculator.html'), 'utf8');
  check(
    '5. Preserved NPS normal-exit >₹12L minimum annuity (20% non-govt / 40% govt) and 40–100% model constraint',
    npsHtml.includes('20% for non-government and 40% for government subscribers') &&
      npsHtml.includes('The 40–100% input range is a modelling constraint, not a regulatory minimum')
  );

  const sipHtml = fs.readFileSync(path.join(pagesDir, 'sip-calculator.html'), 'utf8');
  const sipArticleHtml = fs.readFileSync(path.join(postsDir, 'sip-vs-lumpsum-mutual-funds-guide.html'), 'utf8');
  check(
    '6. Preserved SIP 12% (assumption) label and non-guaranteed rupee cost averaging wording',
    sipHtml.includes('12% (assumption)') &&
      sipArticleHtml.includes('does not guarantee a profit, a lower purchase cost than a lump sum, or outperformance')
  );

  const gstHtml = fs.readFileSync(path.join(pagesDir, 'gst-calculator.html'), 'utf8');
  const toolsCatHtml = fs.readFileSync(path.join(pagesDir, 'category-tools.html'), 'utf8');
  check(
    '7. Preserved GST limited/example presets and 22 September 2025 reform context with PIB/CBIC links',
    gstHtml.includes('Limited / Example GST Rate Presets') &&
      gstHtml.includes('https://www.pib.gov.in/PressReleasePage.aspx?PRID=2163555') &&
      toolsCatHtml.includes('reforms from 22 September 2025')
  );

  const goldHtml = fs.readFileSync(path.join(pagesDir, 'gold-price-calculator.html'), 'utf8');
  const goldCatHtml = fs.readFileSync(path.join(pagesDir, 'category-gold.html'), 'utf8');
  check(
    '8. Preserved Gold calculator & category hub user-entered 22K rate and fixed ₹45 hallmarking fee disclosure',
    goldHtml.includes('fixed ₹45 hallmarking-fee assumption') &&
      goldCatHtml.includes('live gold quotes are not fetched')
  );

  const salaryHtml = fs.readFileSync(path.join(pagesDir, 'salary-calculator.html'), 'utf8');
  const ctcHtml = fs.readFileSync(path.join(pagesDir, 'ctc-inhand-calculator.html'), 'utf8');
  const jobsCatHtml = fs.readFileSync(path.join(pagesDir, 'category-jobs.html'), 'utf8');
  check(
    '9. Preserved Salary & CTC pre-income-tax-TDS disclosures',
    salaryHtml.includes('Pre-Income Tax TDS') &&
      ctcHtml.includes('excludes income-tax TDS') &&
      jobsCatHtml.includes('before income-tax TDS')
  );

  const prepayHtml = fs.readFileSync(path.join(pagesDir, 'loan-prepayment-calculator.html'), 'utf8');
  check(
    '10. Preserved Loan Prepayment fixed-EMI single part-payment framing',
    prepayHtml.includes('keeping EMI unchanged') &&
      prepayHtml.includes('Simulation assumes the EMI and interest rate stay unchanged')
  );

  const percHtml = fs.readFileSync(path.join(pagesDir, 'percentage-calculator.html'), 'utf8');
  const dateDiffHtml = fs.readFileSync(path.join(pagesDir, 'date-difference-calculator.html'), 'utf8');
  const discountHtml = fs.readFileSync(path.join(pagesDir, 'discount-calculator.html'), 'utf8');
  check(
    '11. Preserved Percentage, Date Difference, and Discount scope disclosures',
    percHtml.includes('Calculate a percentage of a value or one number as a percentage share of another') &&
      dateDiffHtml.includes('Count elapsed calendar days and express the interval as whole weeks plus remaining days') &&
      discountHtml.includes('one percentage-discount stage per calculation')
  );

  const privacyHtml = fs.readFileSync(path.join(pagesDir, 'privacy.html'), 'utf8');
  check(
    '12. Preserved Privacy Policy conditional advertising & cookie opt-out disclosures',
    privacyHtml.includes('IndiaUseful currently does not load advertising scripts') &&
      privacyHtml.includes('https://www.google.com/settings/ads') &&
      privacyHtml.includes('https://www.aboutads.info/choices/') &&
      privacyHtml.includes('https://policies.google.com/technologies/partner-sites')
  );

  // Verify internal links across all 32 static pages and 14 posts
  const validBloggerTargets = new Set(Object.values(urlMap.routes));
  const hrefRegex = /\bhref="([^"]+)"/g;

  let allPageLinksValid = true;
  let badPageLink = '';
  for (const f of pageFiles) {
    const html = fs.readFileSync(path.join(pagesDir, f), 'utf8');
    let m;
    while ((m = hrefRegex.exec(html)) !== null) {
      const href = m[1];
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#')) continue;
      if (!validBloggerTargets.has(href)) {
        allPageLinksValid = false;
        badPageLink = `${f}: ${href}`;
        break;
      }
    }
  }
  check('13. All internal links in all 32 static pages resolve to valid Blogger targets', allPageLinksValid, badPageLink);

  let allPostLinksValid = true;
  let badPostLink = '';
  for (const f of postFiles) {
    const html = fs.readFileSync(path.join(postsDir, f), 'utf8');
    let m;
    while ((m = hrefRegex.exec(html)) !== null) {
      const href = m[1];
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#')) continue;
      if (!validBloggerTargets.has(href)) {
        allPostLinksValid = false;
        badPostLink = `${f}: ${href}`;
        break;
      }
    }
  }
  check('14. All internal links in all 14 posts resolve to valid Blogger targets', allPostLinksValid, badPostLink);

  // Check that no unrewritten Next.js routes exist in any generated HTML or theme XML
  const allHtmlContents = [
    themeXml,
    ...pageFiles.map(f => fs.readFileSync(path.join(pagesDir, f), 'utf8')),
    ...postFiles.map(f => fs.readFileSync(path.join(postsDir, f), 'utf8'))
  ];
  const unrewrittenPattern = /\bhref="\/(?:calculators|category|articles|about|privacy|disclaimer|contact|terms)\b/;
  const hasUnrewritten = allHtmlContents.some(c => unrewrittenPattern.test(c));
  check(
    '15. Zero unrewritten Next.js internal routes remain in theme XML, pages, or posts',
    !hasUnrewritten && REPO_ROOT.length > 0
  );

  // Summary
  const passedCount = results.filter(r => r.passed).length;
  const failedCount = results.length - passedCount;
  console.log(`\n[verify-blogger] Completed ${results.length} verification checks: ${passedCount} passed, ${failedCount} failed.`);

  if (failedCount > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('[verify-blogger] Unexpected error:', err);
  process.exit(1);
});
