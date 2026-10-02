#!/usr/bin/env node
/**
 * IndiaUseful Blogger Importer & Link Patcher (`import-blogger.mjs`)
 *
 * Supports:
 * - `--dry-run` (default when credentials or `--execute` are omitted): validates
 *   manifest, simulates idempotent page/post upsert, and tests second-pass link patching.
 * - Live Blogger API v3 publishing (`--execute --blog-id <ID> --access-token <TOKEN>`
 *   or `BLOGGER_BLOG_ID` / `BLOGGER_ACCESS_TOKEN` environment variables):
 *   1. Pass 1 (Idempotent Upsert): Lists existing Blogger pages & posts, matches by
 *      canonical slug marker or title, and creates (`POST`) or updates (`PUT`) all
 *      32 static pages and 14 posts without creating duplicates.
 *   2. Pass 2 (Link Patching): Maps each canonical route (`data-source-href` or
 *      predicted Blogger path) to the actual live URL returned by Blogger API v3
 *      and patches any page/post whose internal links changed.
 */

import fs from 'node:fs';
import path from 'node:path';
import { BLOGGER_ROOT } from '../src/extract-production-data.mjs';

export function patchInternalLinks(html, liveRoutesMap = {}, fallbackRoutesMap = {}) {
  let patched = html;

  // 1. Patch any anchor carrying explicit `data-source-path="/..."`
  patched = patched.replace(
    /(<a\b[^>]*?\bhref=")([^"]*)("[^>]*?\bdata-source-path=")([^"]+)("[^>]*>)/g,
    (full, pre, currentHref, mid, sourceHref, post) => {
      const targetHref = liveRoutesMap[sourceHref] || fallbackRoutesMap[sourceHref] || currentHref;
      return `${pre}${targetHref}${mid}${sourceHref}${post}`;
    }
  );

  // 2. Also patch any predicted Blogger path if live URL path differs
  for (const [sourcePath, fallbackPath] of Object.entries(fallbackRoutesMap)) {
    const livePath = liveRoutesMap[sourcePath];
    if (livePath && livePath !== fallbackPath) {
      patched = patched.split(`href="${fallbackPath}"`).join(`href="${livePath}"`);
    }
  }

  return patched;
}

function parseCliArgs(argv) {
  const opts = {
    dryRun: true,
    execute: false,
    patchLinks: true,
    blogId: process.env.BLOGGER_BLOG_ID || '',
    accessToken: process.env.BLOGGER_ACCESS_TOKEN || ''
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--execute') {
      opts.execute = true;
      opts.dryRun = false;
    } else if (arg === '--dry-run') {
      opts.dryRun = true;
      opts.execute = false;
    } else if (arg === '--no-patch-links') {
      opts.patchLinks = false;
    } else if (arg === '--blog-id' && argv[i + 1]) {
      opts.blogId = argv[++i];
    } else if (arg === '--access-token' && argv[i + 1]) {
      opts.accessToken = argv[++i];
    }
  }
  return opts;
}

async function bloggerApiRequest(url, method, accessToken, bodyObj = null) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json'
  };
  if (bodyObj) {
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(url, {
    method,
    headers,
    body: bodyObj ? JSON.stringify(bodyObj) : undefined
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Blogger API ${method} ${url} failed (${res.status}): ${text}`);
  }
  return res.json();
}

function extractPathname(urlStr) {
  try {
    const u = new URL(urlStr);
    return u.pathname;
  } catch {
    return urlStr;
  }
}

export async function runBloggerImport(options = {}) {
  const manifestPath = path.join(BLOGGER_ROOT, 'content', 'manifest.json');
  const urlMapPath = path.join(BLOGGER_ROOT, 'content', 'url-map.json');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const urlMap = JSON.parse(fs.readFileSync(urlMapPath, 'utf8'));

  const isDryRun = options.dryRun !== false || !options.execute;
  const operations = [];
  const liveRoutesMap = { ...urlMap.routes };

  if (isDryRun) {
    for (const page of manifest.pages) {
      const fullPath = path.join(BLOGGER_ROOT, page.file);
      const html = fs.readFileSync(fullPath, 'utf8');
      const patched = patchInternalLinks(html, liveRoutesMap, urlMap.routes);
      operations.push({
        kind: 'page',
        action: 'DRY_RUN_UPSERT',
        slug: page.slug,
        title: page.title,
        sourcePath: page.sourcePath,
        bloggerPath: page.bloggerPath,
        bytes: Buffer.byteLength(patched, 'utf8')
      });
    }

    for (const post of manifest.posts) {
      const fullPath = path.join(BLOGGER_ROOT, post.file);
      const html = fs.readFileSync(fullPath, 'utf8');
      const patched = patchInternalLinks(html, liveRoutesMap, urlMap.routes);
      operations.push({
        kind: 'post',
        action: 'DRY_RUN_UPSERT',
        slug: post.slug,
        title: post.title,
        labels: post.labels,
        published: post.publishedIso,
        sourcePath: post.sourcePath,
        bloggerPath: post.bloggerPath,
        bytes: Buffer.byteLength(patched, 'utf8')
      });
    }

    return {
      mode: 'dry-run',
      pagesCount: manifest.pages.length,
      postsCount: manifest.posts.length,
      operations
    };
  }

  if (!options.blogId || !options.accessToken) {
    throw new Error(
      'Live publishing requires --blog-id (or BLOGGER_BLOG_ID) and --access-token (or BLOGGER_ACCESS_TOKEN).'
    );
  }

  const baseUrl = `https://www.googleapis.com/blogger/v3/blogs/${encodeURIComponent(options.blogId)}`;

  // Fetch existing pages and posts for idempotent matching
  const existingPagesResp = await bloggerApiRequest(
    `${baseUrl}/pages?fetchBodies=true&maxResults=500`,
    'GET',
    options.accessToken
  );
  const existingPostsResp = await bloggerApiRequest(
    `${baseUrl}/posts?fetchBodies=true&maxResults=500`,
    'GET',
    options.accessToken
  );

  const existingPages = existingPagesResp.items || [];
  const existingPosts = existingPostsResp.items || [];

  const publishedPages = [];
  const publishedPosts = [];

  // Pass 1A: Upsert static pages
  for (const page of manifest.pages) {
    const html = fs.readFileSync(path.join(BLOGGER_ROOT, page.file), 'utf8');
    const marker = `<!-- IndiaUseful Blogger Static Page: ${page.slug} -->`;
    const match = existingPages.find(
      item => (item.content && item.content.includes(marker)) || item.title === page.title
    );

    const payload = {
      kind: 'blogger#page',
      title: page.title,
      content: html
    };

    const result = match
      ? await bloggerApiRequest(`${baseUrl}/pages/${match.id}`, 'PUT', options.accessToken, payload)
      : await bloggerApiRequest(`${baseUrl}/pages`, 'POST', options.accessToken, payload);

    const actualPath = extractPathname(result.url || page.bloggerPath);
    liveRoutesMap[page.sourcePath] = actualPath;
    publishedPages.push({ page, remoteId: result.id, html, actualPath });
    operations.push({
      kind: 'page',
      action: match ? 'UPDATED' : 'CREATED',
      slug: page.slug,
      remoteId: result.id,
      url: result.url
    });
  }

  // Pass 1B: Upsert posts
  for (const post of manifest.posts) {
    const html = fs.readFileSync(path.join(BLOGGER_ROOT, post.file), 'utf8');
    const marker = `<!-- IndiaUseful Blogger Post: ${post.slug} -->`;
    const match = existingPosts.find(
      item => (item.content && item.content.includes(marker)) || item.title === post.title
    );

    const payload = {
      kind: 'blogger#post',
      title: post.title,
      content: html,
      labels: post.labels,
      published: post.publishedIso
    };

    const result = match
      ? await bloggerApiRequest(`${baseUrl}/posts/${match.id}`, 'PUT', options.accessToken, payload)
      : await bloggerApiRequest(`${baseUrl}/posts`, 'POST', options.accessToken, payload);

    const actualPath = extractPathname(result.url || post.bloggerPath);
    liveRoutesMap[post.sourcePath] = actualPath;
    publishedPosts.push({ post, remoteId: result.id, html, actualPath });
    operations.push({
      kind: 'post',
      action: match ? 'UPDATED' : 'CREATED',
      slug: post.slug,
      remoteId: result.id,
      url: result.url
    });
  }

  // Pass 2: Link Patching across pages & posts if any live Blogger URL differs
  if (options.patchLinks !== false) {
    for (const item of publishedPages) {
      const patchedHtml = patchInternalLinks(item.html, liveRoutesMap, urlMap.routes);
      if (patchedHtml !== item.html) {
        await bloggerApiRequest(
          `${baseUrl}/pages/${item.remoteId}`,
          'PUT',
          options.accessToken,
          {
            kind: 'blogger#page',
            title: item.page.title,
            content: patchedHtml
          }
        );
        operations.push({
          kind: 'page',
          action: 'LINK_PATCHED',
          slug: item.page.slug,
          remoteId: item.remoteId
        });
      }
    }

    for (const item of publishedPosts) {
      const patchedHtml = patchInternalLinks(item.html, liveRoutesMap, urlMap.routes);
      if (patchedHtml !== item.html) {
        await bloggerApiRequest(
          `${baseUrl}/posts/${item.remoteId}`,
          'PUT',
          options.accessToken,
          {
            kind: 'blogger#post',
            title: item.post.title,
            content: patchedHtml,
            labels: item.post.labels,
            published: item.post.publishedIso
          }
        );
        operations.push({
          kind: 'post',
          action: 'LINK_PATCHED',
          slug: item.post.slug,
          remoteId: item.remoteId
        });
      }
    }
  }

  return {
    mode: 'live',
    pagesCount: publishedPages.length,
    postsCount: publishedPosts.length,
    operations
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const opts = parseCliArgs(process.argv.slice(2));
  runBloggerImport(opts)
    .then(res => {
      console.log(
        `[import-blogger] Mode=${res.mode} | Static Pages=${res.pagesCount} | Posts=${res.postsCount} | Operations=${res.operations.length}`
      );
    })
    .catch(err => {
      console.error('[import-blogger] Error:', err.message);
      process.exit(1);
    });
}
