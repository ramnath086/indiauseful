import fs from 'node:fs';
import path from 'node:path';
import { stripTypeScriptTypes } from 'node:module';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const REPO_ROOT = path.resolve(__dirname, '..', '..');
export const BLOGGER_ROOT = path.resolve(__dirname, '..');

/**
 * Evaluates a TypeScript data module from `src/data/` in memory using Node's
 * native `stripTypeScriptTypes` so the Blogger build always uses the exact
 * current production source without modifying any files outside `blogger/`.
 */
function loadTsDataModule(relPath, injectedExports = {}) {
  const fullPath = path.join(REPO_ROOT, relPath);
  const rawTs = fs.readFileSync(fullPath, 'utf8');
  const stripped = stripTypeScriptTypes(rawTs, { mode: 'strip' });

  // Remove import lines and convert `export const` / `export function` to local bindings
  const withoutImports = stripped.replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');
  const exportedNames = [];
  const transformed = withoutImports.replace(
    /export\s+(const|let|function)\s+([A-Za-z0-9_]+)/g,
    (_, keyword, name) => {
      exportedNames.push(name);
      return `${keyword} ${name}`;
    }
  );

  const injectedKeys = Object.keys(injectedExports);
  const injectedValues = Object.values(injectedExports);
  const fnBody = `"use strict";\n${transformed}\nreturn { ${exportedNames.join(', ')} };`;
  const runner = new Function(...injectedKeys, fnBody);
  return runner(...injectedValues);
}

/**
 * Extracts `categoryContent` from `src/app/category/[category]/page.tsx`.
 */
function loadCategoryHubContent() {
  const fullPath = path.join(REPO_ROOT, 'src/app/category/[category]/page.tsx');
  const rawTs = fs.readFileSync(fullPath, 'utf8');
  const startMarker = 'const categoryContent:';
  const startIdx = rawTs.indexOf(startMarker);
  const endMarker = '\nexport default async function CategoryPage';
  const endIdx = rawTs.indexOf(endMarker, startIdx);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Could not locate categoryContent in src/app/category/[category]/page.tsx');
  }
  const snippet = rawTs.slice(startIdx, endIdx);
  const stripped = stripTypeScriptTypes(snippet, { mode: 'strip' });
  const runner = new Function(`"use strict";\n${stripped}\nreturn categoryContent;`);
  return runner();
}

export function getProductionData() {
  const { GUIDES } = loadTsDataModule('src/data/guides.ts');
  const { CALCULATOR_GUIDES } = loadTsDataModule('src/data/calculatorGuides.ts');
  const { CATEGORIES, CALCULATORS, ARTICLES } = loadTsDataModule('src/data/calculators.ts', {
    GUIDES
  });
  const CATEGORY_CONTENT = loadCategoryHubContent();

  // Separate the 4 base articles from the 10 long-form guides while also keeping full ARTICLES
  const guideSlugs = new Set(GUIDES.map(g => g.slug));
  const BASE_ARTICLES = ARTICLES.filter(a => !guideSlugs.has(a.slug));

  return {
    CATEGORIES,
    CALCULATORS,
    ARTICLES,
    BASE_ARTICLES,
    GUIDES,
    CALCULATOR_GUIDES,
    CATEGORY_CONTENT
  };
}
