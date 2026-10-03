#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { BLOGGER_ROOT, getProductionData } from '../src/extract-production-data.mjs';
import { buildUrlMapData } from '../src/url-mapper.mjs';
import { generateBrowserCalculatorRuntime } from '../src/browser-runtime.mjs';
import {
  generateStylesCss,
  generateBloggerThemeXml
} from '../src/theme-generator.mjs';

export function buildBloggerTheme() {
  const prod = getProductionData();
  const { CATEGORIES, CALCULATORS, ARTICLES } = prod;
  const urlMapData = buildUrlMapData(prod);
  const routesMap = urlMapData.routes;

  const assetsDir = path.join(BLOGGER_ROOT, 'assets');
  fs.mkdirSync(assetsDir, { recursive: true });

  const searchIndex = CALCULATORS.map(c => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    shortDesc: c.shortDesc,
    category: c.category,
    keywords: c.keywords,
    bloggerUrl: routesMap[`/calculators/${c.slug}`]
  }));

  const stylesCss = generateStylesCss();
  const calculatorRuntimeJs = generateBrowserCalculatorRuntime(searchIndex);

  fs.writeFileSync(path.join(assetsDir, 'styles.css'), stylesCss, 'utf8');
  fs.writeFileSync(path.join(assetsDir, 'calculators.js'), calculatorRuntimeJs, 'utf8');

  const themeXml = generateBloggerThemeXml({
    CATEGORIES,
    CALCULATORS,
    ARTICLES,
    routesMap,
    stylesCss,
    calculatorRuntimeJs
  });

  const themePath = path.join(BLOGGER_ROOT, 'indiauseful-theme.xml');
  fs.writeFileSync(themePath, themeXml, 'utf8');

  return {
    themePath,
    stylesPath: path.join(assetsDir, 'styles.css'),
    runtimePath: path.join(assetsDir, 'calculators.js')
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { themePath } = buildBloggerTheme();
  console.log(`[build-theme] Wrote Blogger theme XML to ${path.relative(BLOGGER_ROOT, themePath)} and assets to assets/.`);
}
