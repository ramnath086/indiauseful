/**
 * Deterministic URL mapper between Next.js production routes and Blogger URLs.
 */

export function buildBloggerPostPath(article) {
  const [year, month] = article.date.split('-');
  return `/${year}/${month}/${article.slug}.html`;
}

export function buildBloggerCalculatorPath(calc) {
  return `/p/${calc.slug}.html`;
}

export function buildBloggerCategoryPath(catId) {
  return `/p/category-${catId}.html`;
}

export function buildUrlMapData({ CATEGORIES, CALCULATORS, ARTICLES, GUIDES }) {
  const routes = {
    '/': '/',
    '/#categories': '/#categories',
    '/#guides': '/#guides',
    '/about': '/p/about.html',
    '/privacy': '/p/privacy.html',
    '/disclaimer': '/p/disclaimer.html',
    '/contact': '/p/contact.html',
    '/terms': '/p/terms.html'
  };

  const pages = [];
  const posts = [];
  const guideSlugs = new Set(GUIDES.map(g => g.slug));

  for (const calc of CALCULATORS) {
    const sourcePath = `/calculators/${calc.slug}`;
    const bloggerPath = buildBloggerCalculatorPath(calc);
    routes[sourcePath] = bloggerPath;
    pages.push({
      id: calc.id,
      slug: calc.slug,
      type: 'calculator',
      category: calc.category,
      title: calc.name,
      seoTitle: calc.seoTitle,
      seoDescription: calc.seoDescription,
      sourcePath,
      bloggerPath,
      contentFile: `content/pages/${calc.slug}.html`
    });
  }

  for (const cat of CATEGORIES) {
    const sourcePath = `/category/${cat.id}`;
    const bloggerPath = buildBloggerCategoryPath(cat.id);
    routes[sourcePath] = bloggerPath;
    pages.push({
      id: `category-${cat.id}`,
      slug: `category-${cat.id}`,
      type: 'category',
      category: cat.id,
      title: cat.name,
      seoTitle: `${cat.name} | IndiaUseful`,
      seoDescription: cat.description,
      sourcePath,
      bloggerPath,
      labelArchivePath: `/search/label/${cat.id}`,
      contentFile: `content/pages/category-${cat.id}.html`
    });
  }

  const legalPages = [
    {
      id: 'about',
      slug: 'about',
      title: 'About Us',
      seoTitle: 'About Us | IndiaUseful',
      seoDescription:
        'Learn about IndiaUseful, an independent collection of free, privacy-conscious calculators and everyday tools designed for people in India.',
      sourcePath: '/about',
      bloggerPath: '/p/about.html'
    },
    {
      id: 'privacy',
      slug: 'privacy',
      title: 'Privacy Policy',
      seoTitle: 'Privacy Policy | IndiaUseful',
      seoDescription:
        'How IndiaUseful handles calculator inputs, basic hosting logs, and third-party services.',
      sourcePath: '/privacy',
      bloggerPath: '/p/privacy.html'
    },
    {
      id: 'disclaimer',
      slug: 'disclaimer',
      title: 'Financial & General Disclaimer',
      seoTitle: 'Financial & General Disclaimer | IndiaUseful',
      seoDescription:
        'Important information about estimates, assumptions, and the limitations of IndiaUseful calculators and content.',
      sourcePath: '/disclaimer',
      bloggerPath: '/p/disclaimer.html'
    },
    {
      id: 'contact',
      slug: 'contact',
      title: 'Contact Us',
      seoTitle: 'Contact Us | IndiaUseful',
      seoDescription:
        'Contact IndiaUseful with feedback, calculator requests, corrections, or bug reports.',
      sourcePath: '/contact',
      bloggerPath: '/p/contact.html'
    },
    {
      id: 'terms',
      slug: 'terms',
      title: 'Terms of Service',
      seoTitle: 'Terms of Service | IndiaUseful',
      seoDescription:
        'Terms for using IndiaUseful calculators, tools, and informational content.',
      sourcePath: '/terms',
      bloggerPath: '/p/terms.html'
    }
  ];

  for (const lp of legalPages) {
    pages.push({
      ...lp,
      type: 'legal',
      contentFile: `content/pages/${lp.slug}.html`
    });
  }

  for (const art of ARTICLES) {
    const sourcePath = `/articles/${art.slug}`;
    const bloggerPath = buildBloggerPostPath(art);
    routes[sourcePath] = bloggerPath;
    const isGuide = guideSlugs.has(art.slug);
    posts.push({
      slug: art.slug,
      type: isGuide ? 'guide' : 'article',
      isLongFormGuide: isGuide,
      category: art.category,
      labels: [art.category, isGuide ? 'guide' : 'article'],
      title: art.title,
      seoTitle: `${art.title} | IndiaUseful`,
      seoDescription: art.summary,
      date: art.date,
      readTime: art.readTime,
      calculatorIds: art.calculatorIds || [],
      sourcePath,
      bloggerPath,
      contentFile: `content/posts/${art.slug}.html`
    });
  }

  return {
    version: '1.0.0',
    generatedFromCommit: '8540307882a503c7e114ff78b193fd4d089bbfcd',
    counts: {
      totalRoutes: Object.keys(routes).length,
      pages: pages.length,
      calculators: CALCULATORS.length,
      categories: CATEGORIES.length,
      legalPages: legalPages.length,
      posts: posts.length,
      longFormGuides: GUIDES.length,
      baseArticles: ARTICLES.length - GUIDES.length
    },
    routes,
    pages,
    posts
  };
}

export function rewriteInternalUrl(href, routesMap) {
  if (!href) return href;
  if (routesMap[href]) return routesMap[href];
  return href;
}

export function generateUrlMappingMarkdown(urlMapData) {
  const lines = [
    '# IndiaUseful — Next.js to Blogger URL Mapping & Sitemap Plan',
    '',
    'This document maps every canonical route from the Next.js production site (`src/`) to its corresponding Blogger static page (`/p/*.html`) or dated post permalink (`/YYYY/MM/*.html`).',
    '',
    '## Summary Counts',
    '',
    `- **Homepage**: 1 (\`/\`)`,
    `- **Calculator Static Pages**: ${urlMapData.counts.calculators} (\`/p/<slug>.html\`)`,
    `- **Category Hub Static Pages**: ${urlMapData.counts.categories} (\`/p/category-<id>.html\`, plus Blogger label archives \`/search/label/<id>\`)`,
    `- **Legal & Trust Static Pages**: ${urlMapData.counts.legalPages} (\`/p/about.html\`, \`/p/privacy.html\`, \`/p/disclaimer.html\`, \`/p/contact.html\`, \`/p/terms.html\`)`,
    `- **Long-Form Guides (Posts)**: ${urlMapData.counts.longFormGuides} (\`/YYYY/MM/<slug>.html\`)`,
    `- **Base Articles (Posts)**: ${urlMapData.counts.baseArticles} (\`/YYYY/MM/<slug>.html\`)`,
    `- **Total Mapped Content Items**: ${urlMapData.counts.pages} static pages + ${urlMapData.counts.posts} posts = ${urlMapData.counts.pages + urlMapData.counts.posts} items`,
    '',
    '## Blogger Sitemap & Crawlability Plan',
    '',
    'Blogger automatically generates and serves XML sitemaps at:',
    '- `/sitemap.xml` (primary posts sitemap index)',
    '- `/sitemap-pages.xml` (static pages sitemap covering all `/p/*.html` calculator, category, and legal pages)',
    '- `/atom.xml` and `/feeds/posts/default` (Atom/RSS feeds)',
    '',
    'In addition, the homepage (`/`) in `indiauseful-theme.xml` includes crawlable HTML links to all 6 category hubs, all 21 calculators, all 14 guides/articles, and all 5 legal/trust pages so search engine crawlers can discover every page within 1 click of the root URL.',
    '',
    '## 1. Calculator Pages (21)',
    '',
    '| # | Calculator ID | Production Route | Blogger Static Page Path | Category |',
    '|---|---|---|---|---|'
  ];

  const calcPages = urlMapData.pages.filter(p => p.type === 'calculator');
  calcPages.forEach((p, idx) => {
    lines.push(`| ${idx + 1} | \`${p.id}\` | \`${p.sourcePath}\` | \`${p.bloggerPath}\` | \`${p.category}\` |`);
  });

  lines.push(
    '',
    '## 2. Category Hub Pages (6)',
    '',
    '| # | Category ID | Production Route | Blogger Static Page Path | Blogger Label Archive |',
    '|---|---|---|---|---|'
  );

  const catPages = urlMapData.pages.filter(p => p.type === 'category');
  catPages.forEach((p, idx) => {
    lines.push(
      `| ${idx + 1} | \`${p.category}\` | \`${p.sourcePath}\` | \`${p.bloggerPath}\` | \`${p.labelArchivePath}\` |`
    );
  });

  lines.push(
    '',
    '## 3. Legal & Trust Pages (5)',
    '',
    '| # | Page | Production Route | Blogger Static Page Path |',
    '|---|---|---|---|'
  );

  const legalPages = urlMapData.pages.filter(p => p.type === 'legal');
  legalPages.forEach((p, idx) => {
    lines.push(`| ${idx + 1} | ${p.title} | \`${p.sourcePath}\` | \`${p.bloggerPath}\` |`);
  });

  lines.push(
    '',
    '## 4. Articles & Long-Form Guides (14 Posts)',
    '',
    '| # | Type | Production Route | Expected Blogger Post Path | Date | Category |',
    '|---|---|---|---|---|---|'
  );

  urlMapData.posts.forEach((post, idx) => {
    lines.push(
      `| ${idx + 1} | ${post.isLongFormGuide ? 'Guide' : 'Article'} | \`${post.sourcePath}\` | \`${post.bloggerPath}\` | ${post.date} | \`${post.category}\` |`
    );
  });

  lines.push('');
  return lines.join('\n');
}
