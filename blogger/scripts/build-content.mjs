#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { BLOGGER_ROOT, getProductionData } from '../src/extract-production-data.mjs';
import {
  buildUrlMapData,
  generateUrlMappingMarkdown
} from '../src/url-mapper.mjs';
import {
  renderCalculatorPageHtml,
  renderCategoryPageHtml,
  renderLegalPageHtml,
  renderArticlePostHtml
} from '../src/content-renderer.mjs';

function sha256(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

function countWords(html) {
  const plain = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain ? plain.split(' ').length : 0;
}

export function buildAllBloggerContent() {
  const prod = getProductionData();
  const {
    CATEGORIES,
    CALCULATORS,
    ARTICLES,
    GUIDES,
    CALCULATOR_GUIDES,
    CATEGORY_CONTENT
  } = prod;

  const urlMapData = buildUrlMapData(prod);
  const routesMap = urlMapData.routes;

  const contentDir = path.join(BLOGGER_ROOT, 'content');
  const pagesDir = path.join(contentDir, 'pages');
  const postsDir = path.join(contentDir, 'posts');

  fs.mkdirSync(pagesDir, { recursive: true });
  fs.mkdirSync(postsDir, { recursive: true });

  const manifestPages = [];
  const manifestPosts = [];

  // 1. Render all 21 Calculator static pages
  for (const tool of CALCULATORS) {
    const category = CATEGORIES.find(c => c.id === tool.category);
    const guide = CALCULATOR_GUIDES[tool.id];
    const relatedGuides = GUIDES.filter(g => g.calculatorIds.includes(tool.id));
    const relatedTools = CALCULATORS.filter(
      c => c.category === tool.category && c.id !== tool.id
    ).slice(0, 4);

    const html = renderCalculatorPageHtml({
      tool,
      category,
      guide,
      relatedGuides,
      relatedTools,
      routesMap
    });

    const relFile = `content/pages/${tool.slug}.html`;
    fs.writeFileSync(path.join(BLOGGER_ROOT, relFile), html, 'utf8');

    manifestPages.push({
      id: tool.id,
      slug: tool.slug,
      type: 'calculator',
      category: tool.category,
      title: tool.name,
      seoTitle: tool.seoTitle,
      seoDescription: tool.seoDescription,
      keywords: tool.keywords,
      sourcePath: `/calculators/${tool.slug}`,
      bloggerPath: `/p/${tool.slug}.html`,
      file: relFile,
      wordCount: countWords(html),
      sha256: sha256(html)
    });
  }

  // 2. Render all 6 Category Hub static pages
  for (const cat of CATEGORIES) {
    const tools = CALCULATORS.filter(c => c.category === cat.id);
    const relatedGuides = GUIDES.filter(g => g.category === cat.id);
    const content = CATEGORY_CONTENT[cat.id];

    const html = renderCategoryPageHtml({
      cat,
      tools,
      relatedGuides,
      content,
      routesMap
    });

    const slug = `category-${cat.id}`;
    const relFile = `content/pages/${slug}.html`;
    fs.writeFileSync(path.join(BLOGGER_ROOT, relFile), html, 'utf8');

    manifestPages.push({
      id: slug,
      slug,
      type: 'category',
      category: cat.id,
      title: cat.name,
      malayalamName: cat.malayalamName,
      seoTitle: `${cat.name} | IndiaUseful`,
      seoDescription: cat.description,
      sourcePath: `/category/${cat.id}`,
      bloggerPath: `/p/${slug}.html`,
      labelArchivePath: `/search/label/${cat.id}`,
      file: relFile,
      wordCount: countWords(html),
      sha256: sha256(html)
    });
  }

  // 3. Render all 5 Legal/Trust static pages
  const legalMeta = [
    {
      slug: 'about',
      title: 'About IndiaUseful',
      seoTitle: 'About Us | IndiaUseful',
      seoDescription:
        'Learn about IndiaUseful, an independent collection of free, privacy-conscious calculators and everyday tools designed for people in India.'
    },
    {
      slug: 'privacy',
      title: 'Privacy Policy',
      seoTitle: 'Privacy Policy | IndiaUseful',
      seoDescription:
        'How IndiaUseful handles calculator inputs, basic hosting logs, and third-party services.'
    },
    {
      slug: 'disclaimer',
      title: 'Disclaimer',
      seoTitle: 'Financial & General Disclaimer | IndiaUseful',
      seoDescription:
        'Important information about estimates, assumptions, and the limitations of IndiaUseful calculators and content.'
    },
    {
      slug: 'contact',
      title: 'Contact IndiaUseful',
      seoTitle: 'Contact Us | IndiaUseful',
      seoDescription:
        'Contact IndiaUseful with feedback, calculator requests, corrections, or bug reports.'
    },
    {
      slug: 'terms',
      title: 'Terms of Service',
      seoTitle: 'Terms of Service | IndiaUseful',
      seoDescription:
        'Terms for using IndiaUseful calculators, tools, and informational content.'
    }
  ];

  for (const lm of legalMeta) {
    const html = renderLegalPageHtml(lm.slug, routesMap);
    const relFile = `content/pages/${lm.slug}.html`;
    fs.writeFileSync(path.join(BLOGGER_ROOT, relFile), html, 'utf8');

    manifestPages.push({
      id: lm.slug,
      slug: lm.slug,
      type: 'legal',
      title: lm.title,
      seoTitle: lm.seoTitle,
      seoDescription: lm.seoDescription,
      sourcePath: `/${lm.slug}`,
      bloggerPath: `/p/${lm.slug}.html`,
      file: relFile,
      wordCount: countWords(html),
      sha256: sha256(html)
    });
  }

  // 4. Render all 14 Articles & Long-Form Guides as Blogger Posts
  const guideSlugs = new Set(GUIDES.map(g => g.slug));
  for (const article of ARTICLES) {
    const isGuide = guideSlugs.has(article.slug);
    const guideObj = GUIDES.find(g => g.slug === article.slug);
    const relatedCalculators = CALCULATORS.filter(c =>
      guideObj ? guideObj.calculatorIds.includes(c.id) : c.category === article.category
    ).slice(0, 4);

    const html = renderArticlePostHtml({
      article,
      relatedCalculators,
      routesMap
    });

    const relFile = `content/posts/${article.slug}.html`;
    fs.writeFileSync(path.join(BLOGGER_ROOT, relFile), html, 'utf8');

    const [year, month] = article.date.split('-');
    manifestPosts.push({
      slug: article.slug,
      type: isGuide ? 'guide' : 'article',
      isLongFormGuide: isGuide,
      category: article.category,
      labels: [article.category, isGuide ? 'guide' : 'article'],
      title: article.title,
      seoTitle: `${article.title} | IndiaUseful`,
      seoDescription: article.summary,
      summary: article.summary,
      date: article.date,
      publishedIso: `${article.date}T09:00:00+05:30`,
      readTime: article.readTime,
      calculatorIds: guideObj ? guideObj.calculatorIds : relatedCalculators.map(c => c.id),
      sourcePath: `/articles/${article.slug}`,
      bloggerPath: `/${year}/${month}/${article.slug}.html`,
      file: relFile,
      wordCount: countWords(html),
      sha256: sha256(html)
    });
  }

  // 5. Write url-map.json and url-mapping.md
  fs.writeFileSync(
    path.join(contentDir, 'url-map.json'),
    JSON.stringify(urlMapData, null, 2) + '\n',
    'utf8'
  );
  fs.writeFileSync(
    path.join(contentDir, 'url-mapping.md'),
    generateUrlMappingMarkdown(urlMapData),
    'utf8'
  );

  // 6. Write manifest.json
  const manifest = {
    siteName: 'IndiaUseful',
    edition: 'blogger',
    sourceCommit: '8540307882a503c7e114ff78b193fd4d089bbfcd',
    summary: {
      totalStaticPages: manifestPages.length,
      calculators: manifestPages.filter(p => p.type === 'calculator').length,
      categories: manifestPages.filter(p => p.type === 'category').length,
      legalPages: manifestPages.filter(p => p.type === 'legal').length,
      totalPosts: manifestPosts.length,
      longFormGuides: manifestPosts.filter(p => p.isLongFormGuide).length,
      baseArticles: manifestPosts.filter(p => !p.isLongFormGuide).length
    },
    pages: manifestPages,
    posts: manifestPosts
  };

  fs.writeFileSync(
    path.join(contentDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n',
    'utf8'
  );

  return { manifest, urlMapData };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { manifest } = buildAllBloggerContent();
  console.log(
    `[build-content] Generated ${manifest.summary.totalStaticPages} static pages (${manifest.summary.calculators} calculators, ${manifest.summary.categories} categories, ${manifest.summary.legalPages} legal) and ${manifest.summary.totalPosts} posts (${manifest.summary.longFormGuides} guides, ${manifest.summary.baseArticles} articles).`
  );
}
