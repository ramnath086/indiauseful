import { renderCalculatorWidgetHtml } from './calculator-ui.mjs';
import { rewriteInternalUrl } from './url-mapper.mjs';

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const INLINE_TOKEN = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g;

export function renderInlineMarkdownToHtml(text, routesMap = {}) {
  let out = '';
  let lastIndex = 0;
  let match;
  const regex = new RegExp(INLINE_TOKEN.source, 'g');

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      out += escapeHtml(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      const label = escapeHtml(match[2]);
      const rawHref = match[3];
      const isExternal = /^https?:\/\//i.test(rawHref);
      const isInternal = rawHref.startsWith('/') && !rawHref.startsWith('//');
      if (isExternal) {
        out += `<a href="${escapeHtml(rawHref)}" class="iu-inline-link" target="_blank" rel="noopener noreferrer">${label}</a>`;
      } else if (isInternal) {
        const mappedHref = rewriteInternalUrl(rawHref, routesMap);
        out += `<a href="${escapeHtml(mappedHref)}" class="iu-inline-link" data-source-path="${escapeHtml(rawHref)}">${label}</a>`;
      } else {
        out += label;
      }
    } else if (match[4]) {
      out += `<strong>${escapeHtml(match[4])}</strong>`;
    } else if (match[5]) {
      out += `<code class="iu-inline-code">${escapeHtml(match[5])}</code>`;
    } else if (match[6]) {
      out += `<em>${escapeHtml(match[6])}</em>`;
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    out += escapeHtml(text.slice(lastIndex));
  }
  return out;
}

export function renderMarkdownToHtml(content, routesMap = {}) {
  const blocks = content.trim().split(/\n\s*\n/);
  const htmlBlocks = [];

  for (const block of blocks) {
    const lines = block
      .trim()
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);
    if (!lines.length) continue;

    const heading = lines[0].match(/^(#{1,3})\s+(.+)$/);
    if (heading && lines.length === 1) {
      const tag = heading[1].length === 1 ? 'h2' : 'h3';
      htmlBlocks.push(
        `<${tag} class="iu-prose-heading">${renderInlineMarkdownToHtml(heading[2], routesMap)}</${tag}>`
      );
      continue;
    }

    const isUnorderedList = lines.every(line => /^[-*]\s+/.test(line));
    if (isUnorderedList) {
      const items = lines
        .map(line => `<li>${renderInlineMarkdownToHtml(line.replace(/^[-*]\s+/, ''), routesMap)}</li>`)
        .join('\n  ');
      htmlBlocks.push(`<ul class="iu-prose-list">\n  ${items}\n</ul>`);
      continue;
    }

    const isOrderedList = lines.every(line => /^\d+\.\s+/.test(line));
    if (isOrderedList) {
      const items = lines
        .map(line => `<li>${renderInlineMarkdownToHtml(line.replace(/^\d+\.\s+/, ''), routesMap)}</li>`)
        .join('\n  ');
      htmlBlocks.push(`<ol class="iu-prose-olist">\n  ${items}\n</ol>`);
      continue;
    }

    const paragraphInner = lines
      .map(line => renderInlineMarkdownToHtml(line, routesMap))
      .join('<br />\n');
    htmlBlocks.push(`<p>${paragraphInner}</p>`);
  }

  return htmlBlocks.join('\n\n');
}

export function renderBreadcrumbsHtml(items, routesMap = {}) {
  const crumbs = [
    `<li><a href="${escapeHtml(rewriteInternalUrl('/', routesMap))}">Home</a></li>`,
    ...items.map(item => {
      if (item.href) {
        const mapped = rewriteInternalUrl(item.href, routesMap);
        return `<li><span class="iu-crumb-sep" aria-hidden="true">›</span><a href="${escapeHtml(mapped)}" data-source-path="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`;
      }
      return `<li><span class="iu-crumb-sep" aria-hidden="true">›</span><span aria-current="page">${escapeHtml(item.label)}</span></li>`;
    })
  ];
  return `<nav aria-label="Breadcrumb" class="iu-breadcrumbs">\n  <ol>\n    ${crumbs.join('\n    ')}\n  </ol>\n</nav>`;
}

export function renderCalculatorPageHtml({
  tool,
  category,
  guide,
  relatedGuides,
  relatedTools,
  routesMap
}) {
  const breadcrumbs = renderBreadcrumbsHtml(
    [
      { label: category ? category.name : 'Calculators', href: `/category/${tool.category}` },
      { label: tool.name }
    ],
    routesMap
  );

  const widgetHtml = renderCalculatorWidgetHtml(tool.id);

  const formulaHtml = guide.formula
    ? `<div class="iu-formula-box">
      <h3>The calculation used</h3>
      <p class="iu-formula-expr"><code>${escapeHtml(guide.formula.expression)}</code></p>
      <ul class="iu-prose-list">
        ${guide.formula.notes.map(n => `<li>${escapeHtml(n)}</li>`).join('\n        ')}
      </ul>
    </div>`
    : '';

  const relatedGuidesHtml =
    relatedGuides.length > 0
      ? `<section class="iu-related-section">
    <h2>Related Guides</h2>
    <ul class="iu-guide-link-list">
      ${relatedGuides
        .map(g => {
          const srcHref = `/articles/${g.slug}`;
          const mapped = rewriteInternalUrl(srcHref, routesMap);
          return `<li><a href="${escapeHtml(mapped)}" data-source-path="${escapeHtml(srcHref)}" class="iu-guide-link">${escapeHtml(g.title)} <span aria-hidden="true">→</span></a></li>`;
        })
        .join('\n      ')}
    </ul>
  </section>`
      : '';

  const relatedToolsHtml =
    relatedTools.length > 0
      ? `<section class="iu-related-section">
    <h2>Related Calculators in ${escapeHtml(category ? category.name : tool.category)}</h2>
    <div class="iu-related-grid">
      ${relatedTools
        .map(rel => {
          const srcHref = `/calculators/${rel.slug}`;
          const mapped = rewriteInternalUrl(srcHref, routesMap);
          return `<a href="${escapeHtml(mapped)}" data-source-path="${escapeHtml(srcHref)}" class="iu-tool-card">
        <div>
          <h3>${escapeHtml(rel.name)}</h3>
          <p>${escapeHtml(rel.shortDesc)}</p>
        </div>
        <span class="iu-tool-cta">Open tool →</span>
      </a>`;
        })
        .join('\n      ')}
    </div>
  </section>`
      : '';

  return `<!-- IndiaUseful Blogger Static Page: ${escapeHtml(tool.slug)} -->
<div class="iu-page-container iu-calculator-page" data-page-type="calculator" data-calculator-slug="${escapeHtml(tool.slug)}">
  ${breadcrumbs}

  <header class="iu-page-hero">
    <div class="iu-hero-badges">
      <span class="iu-cat-pill">${escapeHtml(tool.category)}</span>
      <span class="iu-free-pill">✨ 100% Free &amp; Instant</span>
    </div>
    <h1 class="iu-page-title">${escapeHtml(tool.name)}</h1>
    <p class="iu-page-subtitle">${escapeHtml(tool.shortDesc)}</p>
  </header>

  <section class="iu-calculator-section" aria-label="${escapeHtml(tool.name)}">
    ${widgetHtml}
    <p class="iu-planning-disclaimer">
      Planning estimate only. Results use the inputs and simplified assumptions shown in this calculator; actual amounts may vary with provider terms, timing, eligibility, fees, and applicable taxes. Verify important figures before acting.
    </p>
  </section>

  <section class="iu-guide-card">
    <div>
      <h2>How the ${escapeHtml(tool.name)} works</h2>
      <p>${escapeHtml(guide.overview)}</p>
    </div>

    ${formulaHtml}

    <div class="iu-guide-block">
      <h3>Worked example</h3>
      <p>${escapeHtml(guide.example)}</p>
    </div>

    <div class="iu-guide-block iu-two-col">
      <div>
        <h3>Assumptions</h3>
        <ul class="iu-prose-list">
          ${guide.assumptions.map(item => `<li>${escapeHtml(item)}</li>`).join('\n          ')}
        </ul>
      </div>
      <div>
        <h3>Where this estimate stops</h3>
        <ul class="iu-prose-list">
          ${guide.limitations.map(item => `<li>${escapeHtml(item)}</li>`).join('\n          ')}
        </ul>
      </div>
    </div>

    <div class="iu-guide-block">
      <h3>Practical uses</h3>
      <ul class="iu-prose-list">
        ${guide.useCases.map(item => `<li>${escapeHtml(item)}</li>`).join('\n        ')}
      </ul>
    </div>

    <div class="iu-guide-block">
      <h3>Frequently Asked Questions</h3>
      <div class="iu-faq-list">
        ${guide.faqs
          .map(
            faq => `<div class="iu-faq-item">
          <h4>${escapeHtml(faq.q)}</h4>
          <p>${escapeHtml(faq.a)}</p>
        </div>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  ${relatedGuidesHtml}
  ${relatedToolsHtml}
</div>
`.replace(/[ \t]+$/gm, '');
}

export function renderCategoryPageHtml({
  cat,
  tools,
  relatedGuides,
  content,
  routesMap
}) {
  const breadcrumbs = renderBreadcrumbsHtml(
    [{ label: 'Categories', href: '/#categories' }, { label: cat.name }],
    routesMap
  );

  const toolsGridHtml = `<section class="iu-category-tools-section">
    <h2>${escapeHtml(cat.name)} Calculators (${tools.length})</h2>
    <div class="iu-related-grid">
      ${tools
        .map(t => {
          const srcHref = `/calculators/${t.slug}`;
          const mapped = rewriteInternalUrl(srcHref, routesMap);
          return `<a href="${escapeHtml(mapped)}" data-source-path="${escapeHtml(srcHref)}" class="iu-tool-card">
        <div>
          <h3>${escapeHtml(t.name)}</h3>
          <p>${escapeHtml(t.shortDesc)}</p>
        </div>
        <span class="iu-tool-cta">Calculate now →</span>
      </a>`;
        })
        .join('\n      ')}
    </div>
  </section>`;

  const topicsHtml = content
    ? `<section class="iu-category-deepdive">
    <p class="iu-category-intro">${escapeHtml(content.intro)}</p>

    <h2>Key Topics</h2>
    <div class="iu-topic-list">
      ${content.keyTopics
        .map(topic => {
          const links = [];
          if (topic.articleLink) {
            const mappedArt = rewriteInternalUrl(topic.articleLink, routesMap);
            links.push(
              `<a href="${escapeHtml(mappedArt)}" data-source-path="${escapeHtml(topic.articleLink)}" class="iu-topic-article-link">Read article →</a>`
            );
          }
          if (topic.calculatorLinks) {
            for (const cLink of topic.calculatorLinks) {
              const mappedCalc = rewriteInternalUrl(cLink, routesMap);
              links.push(
                `<a href="${escapeHtml(mappedCalc)}" data-source-path="${escapeHtml(cLink)}" class="iu-topic-calc-link">Calculator</a>`
              );
            }
          }
          return `<article class="iu-topic-card">
        <h3>${escapeHtml(topic.title)}</h3>
        <p>${escapeHtml(topic.content)}</p>
        ${links.length ? `<div class="iu-topic-links">${links.join(' ')}</div>` : ''}
      </article>`;
        })
        .join('\n      ')}
    </div>

    ${
      cat.id === 'tools'
        ? `<p class="iu-calc-note">
      GST rate reference: the <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2163555" target="_blank" rel="noopener noreferrer">Ministry of Finance announcement dated 3 September 2025</a> describes the reforms from 22 September 2025. Check the <a href="https://taxinformation.cbic.gov.in/" target="_blank" rel="noopener noreferrer">current CBIC notifications and rate information</a> for the classification and date of your transaction. These presets do not determine the applicable GST rate.
    </p>`
        : ''
    }

    ${
      relatedGuides.length > 0
        ? `<section class="iu-related-section">
      <h2>Calculator Guides</h2>
      <ul class="iu-guide-link-list">
        ${relatedGuides
          .map(g => {
            const srcHref = `/articles/${g.slug}`;
            const mapped = rewriteInternalUrl(srcHref, routesMap);
            return `<li><a href="${escapeHtml(mapped)}" data-source-path="${escapeHtml(srcHref)}" class="iu-guide-link">${escapeHtml(g.title)} <span aria-hidden="true">→</span></a></li>`;
          })
          .join('\n        ')}
      </ul>
    </section>`
        : ''
    }

    ${
      content.clinicalNote
        ? `<div class="iu-important-note">
      <h3>Important Notes</h3>
      <p>${escapeHtml(content.clinicalNote)}</p>
    </div>`
        : ''
    }
  </section>`
    : '';

  return `<!-- IndiaUseful Blogger Category Hub Page: category-${escapeHtml(cat.id)} -->
<div class="iu-page-container iu-category-page" data-page-type="category" data-category-id="${escapeHtml(cat.id)}">
  ${breadcrumbs}

  <header class="iu-category-banner">
    <span class="iu-banner-badge">Category Hub</span>
    <h1 class="iu-page-title">${escapeHtml(cat.name)}</h1>
    <p class="iu-malayalam-sub">${escapeHtml(cat.malayalamName)}</p>
    <p class="iu-category-desc">${escapeHtml(cat.description)}</p>
  </header>

  ${toolsGridHtml}
  ${topicsHtml}
</div>
`.replace(/[ \t]+$/gm, '');
}

export function renderLegalPageHtml(slug, routesMap = {}) {
  const privacyHref = escapeHtml(rewriteInternalUrl('/privacy', routesMap));
  const contactHref = escapeHtml(rewriteInternalUrl('/contact', routesMap));
  const disclaimerHref = escapeHtml(rewriteInternalUrl('/disclaimer', routesMap));

  if (slug === 'about') {
    return `<!-- IndiaUseful Blogger Static Page: about -->
<div class="iu-page-container iu-legal-page" data-page-type="legal" data-legal-slug="about">
  ${renderBreadcrumbsHtml([{ label: 'About Us' }], routesMap)}
  <h1 class="iu-page-title">About IndiaUseful</h1>
  <p class="iu-page-subtitle iu-text-emerald">Free, practical tools for everyday calculations in India</p>

  <div class="iu-prose">
    <p>
      <strong>IndiaUseful</strong> is an independent collection of calculators and guides for common financial, work, gold, and everyday planning questions. The tools are designed around familiar Indian units and examples, including rupees, Kerala Pavan, and common deposit and loan scenarios.
    </p>

    <h2>How the tools work</h2>
    <ul class="iu-prose-list">
      <li><strong>No account required:</strong> Calculators can be used without signing in or sharing a phone number.</li>
      <li><strong>Calculations run in your browser:</strong> The values entered into the calculators are used locally for the result and are not sent to IndiaUseful servers by the calculator code. See our <a href="${privacyHref}" data-source-path="/privacy" class="iu-inline-link">Privacy Policy</a> for information about ordinary hosting logs and third-party services.</li>
      <li><strong>Estimates, not official advice:</strong> Results rely on displayed assumptions and may not reflect a bank, employer, jeweller, tax authority, or product provider's exact terms.</li>
      <li><strong>Focused on India:</strong> Tools cover common Indian banking, salary, GST, gold, and regional calculation scenarios.</li>
    </ul>

    <h2>Corrections and suggestions</h2>
    <p>
      We welcome reports of errors, accessibility issues, and requests for useful tools. Visit the <a href="${contactHref}" data-source-path="/contact" class="iu-inline-link">Contact page</a> to open a public issue. Please do not include personal, financial, or other sensitive information in an issue.
    </p>
  </div>
</div>
`;
  }

  if (slug === 'privacy') {
    return `<!-- IndiaUseful Blogger Static Page: privacy -->
<div class="iu-page-container iu-legal-page" data-page-type="legal" data-legal-slug="privacy">
  ${renderBreadcrumbsHtml([{ label: 'Privacy Policy' }], routesMap)}
  <h1 class="iu-page-title">Privacy Policy</h1>
  <p class="iu-meta-date">Last updated: 2 October 2026</p>

  <div class="iu-prose">
    <section>
      <h2>1. Calculator inputs</h2>
      <p>
        Calculator inputs are processed in your browser by the calculator code and are not sent to IndiaUseful servers by those calculations. Avoid entering sensitive personal information into any website. The calculators do not require an account.
      </p>
    </section>

    <section>
      <h2>2. Advertising and cookies</h2>
      <p>
        IndiaUseful currently does not load advertising scripts, serve live ads, or use advertising cookies. Some pages may show a clearly labeled, empty advertisement placeholder for layout purposes; it does not load an ad or set an advertising cookie. If advertising or other tracking services are introduced, this policy will be updated to explain the relevant services and choices.
      </p>
      <p>
        If Google AdSense or another third-party advertising service is enabled in the future, vendors including Google may place or read cookies, use web beacons, and process IP addresses or other identifiers for ad delivery, measurement, security, and, where applicable, personalization. Advertising cookies may enable Google and its partners to serve ads based on prior visits to this website or other websites. Personalization would depend on the services enabled, user settings, consent where required, and applicable rules; this is not a statement that those services operate here now.
      </p>
      <ul class="iu-prose-list">
        <li>
          You can manage or opt out of Google ad personalization through <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" class="iu-inline-link">Google Ads Settings</a>.
        </li>
        <li>
          Participating third-party vendors provide cookie-based personalized-advertising opt-outs through <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" class="iu-inline-link">Digital Advertising Alliance choices</a> or their own privacy and opt-out pages. Any additional advertising vendors used here would be identified and linked in this policy before activation.
        </li>
        <li>
          See <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" class="iu-inline-link">how Google uses information from sites or apps that use its services</a> for details. Browser settings can also control cookies. Opting out of personalized advertising does not necessarily disable all cookies or prevent non-personalized ads if advertising is later enabled.
        </li>
      </ul>
    </section>

    <section>
      <h2>3. Hosting and technical logs</h2>
      <p>
        Our hosting provider may process ordinary request information, such as IP address, browser details, requested pages, and timestamps, for delivery, security, and reliability. The calculator code does not attach your entered values to those requests. We do not currently use a separate analytics service.
      </p>
    </section>

    <section>
      <h2>4. External services</h2>
      <p>
        Links to external services, including GitHub for issue reports, are governed by those services' own privacy practices. Review their policies before sharing information with them.
      </p>
    </section>

    <section>
      <h2>5. Children and policy updates</h2>
      <p>
        IndiaUseful is a general-purpose information site and is not designed to collect personal information from children. We may update this policy as the site changes; the date above indicates the latest revision.
      </p>
    </section>

    <p>
      Questions about this policy? Visit our <a href="${contactHref}" data-source-path="/contact" class="iu-inline-link">Contact page</a>.
    </p>
  </div>
</div>
`;
  }

  if (slug === 'disclaimer') {
    return `<!-- IndiaUseful Blogger Static Page: disclaimer -->
<div class="iu-page-container iu-legal-page" data-page-type="legal" data-legal-slug="disclaimer">
  ${renderBreadcrumbsHtml([{ label: 'Financial Disclaimer' }], routesMap)}
  <h1 class="iu-page-title">Disclaimer</h1>
  <p class="iu-meta-date">Important Legal and Financial Notice</p>

  <div class="iu-prose">
    <div class="iu-banner-amber">
      <strong>Notice:</strong> IndiaUseful is an independent informational utility and is NOT a bank, Non-Banking Financial Company (NBFC), mutual fund distributor, SEBI-registered Investment Advisor, or chartered accountant firm.
    </div>

    <section>
      <h2>1. No Financial or Investment Advice</h2>
      <p>
        The content, tools, projections, and estimates on IndiaUseful are intended strictly for educational and self-planning purposes. Projections generated by our SIP, FD, PPF, NPS, or EMI calculators do not represent guaranteed returns or official bank repayment schedules.
      </p>
    </section>

    <section>
      <h2>2. Bank &amp; Lender Nuances</h2>
      <p>
        Actual bank EMI numbers may differ slightly due to rounding conventions, broken-period interest, processing fees, GST on documentation, insurance bundle premiums, or reset frequencies on floating-rate repo-linked home loans (EBLR/RLLR). Always verify with your respective financial institution before executing loan or deposit contracts.
      </p>
    </section>

    <section>
      <h2>3. Gold Rates &amp; Jewellery Bills</h2>
      <p>
        Gold prices, bullion rates, and jewellery making charges vary across retailers and Indian state associations (such as All Kerala Gold and Silver Merchants Association - AKGSMA). Our gold calculators are designed to help you verify billing arithmetic and 3% GST calculation, not provide official bullion spot rates.
      </p>
    </section>

    <section>
      <h2>4. Consult Professionals</h2>
      <p>
        For personal financial planning, tax filing, or legal decisions, please consult a certified financial planner (CFP), SEBI RIA, or Chartered Accountant (CA).
      </p>
      <p>
        Section 80C and Section 115BAC are references to the Income-tax Act, 1961, including for FY 2025-26 (AY 2026-27). For Tax Year 2026-27, beginning 1 April 2026, the corresponding provisions of the Income-tax Act, 2025 are Section 123 (read with Schedule XV), formerly Section 80C; and Section 202, formerly Section 115BAC. Deduction eligibility depends on the applicable tax year and regime; the Section 123 deduction is not available under the default/new regime in Section 202.
      </p>
    </section>
  </div>
</div>
`;
  }

  if (slug === 'contact') {
    return `<!-- IndiaUseful Blogger Static Page: contact -->
<div class="iu-page-container iu-legal-page" data-page-type="legal" data-legal-slug="contact">
  ${renderBreadcrumbsHtml([{ label: 'Contact Us' }], routesMap)}
  <h1 class="iu-page-title">Contact IndiaUseful</h1>
  <p class="iu-page-subtitle">Share feedback, request a calculator, or report a correction through our public issue tracker.</p>

  <div class="iu-contact-grid">
    <section class="iu-card iu-card-emerald">
      <h2>Report a bug or correction</h2>
      <p>Include the calculator name and a description of the issue. Please do not post account numbers, salary details, or other sensitive personal information.</p>
      <p>
        <a href="https://github.com/ramnath086/indiauseful/issues/new" target="_blank" rel="noopener noreferrer" class="iu-btn-primary">Open a GitHub issue</a>
      </p>
    </section>

    <section class="iu-card">
      <h2>Suggest a tool</h2>
      <p>Describe the calculation you need and any public rules or references that could help. Requests are reviewed as time allows; we cannot promise a response time or implementation.</p>
    </section>

    <section class="iu-card iu-span-2">
      <h2>Advertising and privacy</h2>
      <p>No advertising scripts or live ads are currently displayed. The labeled spaces on some pages are empty layout placeholders only. If this changes, we will update the Privacy Policy.</p>
      <p>For details, see our <a href="${privacyHref}" data-source-path="/privacy" class="iu-inline-link">Privacy Policy</a> and <a href="${disclaimerHref}" data-source-path="/disclaimer" class="iu-inline-link">Financial Disclaimer</a>.</p>
    </section>
  </div>
</div>
`;
  }

  if (slug === 'terms') {
    return `<!-- IndiaUseful Blogger Static Page: terms -->
<div class="iu-page-container iu-legal-page" data-page-type="legal" data-legal-slug="terms">
  ${renderBreadcrumbsHtml([{ label: 'Terms of Service' }], routesMap)}
  <h1 class="iu-page-title">Terms of Service</h1>
  <p class="iu-meta-date">Effective Date: September 2026</p>

  <div class="iu-prose">
    <section>
      <h2>1. Agreement to Terms</h2>
      <p>
        By accessing or using the IndiaUseful web application, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please discontinue using the service.
      </p>
    </section>

    <section>
      <h2>2. Nature of Utilities</h2>
      <p>
        All tools, calculators, tables, and articles provided on IndiaUseful are for personal, informational, and educational purposes only. Although we make every reasonable effort to keep mathematical formulas accurate and aligned with Indian banking practices (e.g., RBI guidelines, EPFO formulas, BIS jewellery standards), we make no warranties of any kind regarding completeness, absolute precision, or commercial fitness.
      </p>
    </section>

    <section>
      <h2>3. Intellectual Property</h2>
      <p>
        The software design, compilation, styling, branding, and original articles on IndiaUseful are the intellectual property of IndiaUseful. You may not scrape, frame, clone, or reproduce full site content without prior written permission.
      </p>
    </section>

    <section>
      <h2>4. Limitation of Liability</h2>
      <p>
        Under no circumstances shall IndiaUseful, its developers, or contributors be held liable for any direct, indirect, incidental, or consequential damages resulting from financial commitments, loans signed, tax returns filed, or jewellery bought based on calculators hosted on this site.
      </p>
    </section>
  </div>
</div>
`;
  }

  throw new Error(`Unknown legal page slug: ${slug}`);
}

export function renderArticlePostHtml({
  article,
  relatedCalculators,
  routesMap
}) {
  const breadcrumbs = renderBreadcrumbsHtml(
    [{ label: 'Guides', href: '/#guides' }, { label: article.title }],
    routesMap
  );

  const bodyHtml = renderMarkdownToHtml(article.content, routesMap);

  const relatedCalcHtml =
    relatedCalculators.length > 0
      ? `<section class="iu-related-calculators-callout">
    <h3>Related Free Calculators</h3>
    <p>Put this knowledge into practice with our fast, private financial calculators:</p>
    <div class="iu-related-grid">
      ${relatedCalculators
        .map(tool => {
          const srcHref = `/calculators/${tool.slug}`;
          const mapped = rewriteInternalUrl(srcHref, routesMap);
          return `<a href="${escapeHtml(mapped)}" data-source-path="${escapeHtml(srcHref)}" class="iu-tool-card">
        <div>
          <h4>${escapeHtml(tool.name)}</h4>
          <p>${escapeHtml(tool.shortDesc)}</p>
        </div>
        <span class="iu-tool-cta">Open calculator →</span>
      </a>`;
        })
        .join('\n      ')}
    </div>
  </section>`
      : '';

  return `<!-- IndiaUseful Blogger Post: ${escapeHtml(article.slug)} -->
<article class="iu-post-container" data-post-slug="${escapeHtml(article.slug)}" data-category="${escapeHtml(article.category)}">
  ${breadcrumbs}

  <header class="iu-post-header">
    <div class="iu-post-meta">
      <span class="iu-cat-pill">${escapeHtml(article.category)}</span>
      <span>Last updated: <time datetime="${escapeHtml(article.date)}">${escapeHtml(article.date)}</time></span>
      <span>•</span>
      <span>${escapeHtml(article.readTime)}</span>
    </div>
    <h1 class="iu-post-title">${escapeHtml(article.title)}</h1>
    <p class="iu-post-summary">${escapeHtml(article.summary)}</p>
  </header>

  <div class="iu-prose iu-post-body">
    ${bodyHtml}
  </div>

  ${relatedCalcHtml}
</article>
`.replace(/[ \t]+$/gm, '');
}
