import { escapeHtml } from './content-renderer.mjs';
import { rewriteInternalUrl } from './url-mapper.mjs';

export function generateStylesCss() {
  return `/* IndiaUseful Blogger Edition Stylesheet — Lightweight, Accessible, Mobile-First */
:root {
  --iu-emerald-50: #ecfdf5;
  --iu-emerald-100: #d1fae5;
  --iu-emerald-200: #a7f3d0;
  --iu-emerald-500: #10b981;
  --iu-emerald-600: #059669;
  --iu-emerald-700: #047857;
  --iu-emerald-800: #065f46;
  --iu-emerald-900: #064e3b;
  --iu-teal-700: #0f766e;
  --iu-teal-800: #115e59;
  --iu-amber-50: #fffbeb;
  --iu-amber-100: #fef3c7;
  --iu-amber-200: #fde68a;
  --iu-amber-500: #f59e0b;
  --iu-amber-600: #d97706;
  --iu-amber-800: #92400e;
  --iu-amber-900: #78350f;
  --iu-blue-50: #eff6ff;
  --iu-blue-100: #dbeafe;
  --iu-blue-700: #1d4ed8;
  --iu-blue-800: #1e40af;
  --iu-red-100: #fee2e2;
  --iu-red-600: #dc2626;
  --iu-red-800: #991b1b;
  --iu-gray-50: #f9fafb;
  --iu-gray-100: #f3f4f6;
  --iu-gray-200: #e5e7eb;
  --iu-gray-300: #d1d5db;
  --iu-gray-400: #9ca3af;
  --iu-gray-500: #6b7280;
  --iu-gray-600: #4b5563;
  --iu-gray-700: #374151;
  --iu-gray-800: #1f2937;
  --iu-gray-900: #111827;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background: #ffffff;
  color: var(--iu-gray-900);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Noto Sans Malayalam", sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

.iu-skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--iu-emerald-700);
  color: #fff;
  padding: 0.5rem 1rem;
  z-index: 1000;
}
.iu-skip-link:focus {
  left: 0.5rem;
  top: 0.5rem;
}

/* Header & Navigation */
.iu-site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--iu-gray-100);
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
}
.iu-header-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.iu-brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
.iu-brand-mark {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, var(--iu-emerald-600), #14b8a6);
  color: #fff;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}
.iu-brand-title {
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--iu-gray-900);
}
.iu-brand-title span {
  color: var(--iu-emerald-600);
}
.iu-brand-badge {
  background: var(--iu-emerald-50);
  color: var(--iu-emerald-700);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.35rem;
  border-radius: 0.25rem;
  margin-left: 0.3rem;
}
.iu-brand-tag {
  font-size: 0.68rem;
  color: var(--iu-gray-400);
  margin: 0;
}

.iu-search-wrap {
  position: relative;
  flex: 1;
  max-width: 22rem;
}
.iu-search-input {
  width: 100%;
  border: 1px solid var(--iu-gray-200);
  background: var(--iu-gray-50);
  border-radius: 0.75rem;
  padding: 0.5rem 0.85rem;
  font-size: 0.875rem;
  color: var(--iu-gray-800);
}
.iu-search-input:focus {
  outline: 2px solid var(--iu-emerald-500);
  background: #fff;
}
.iu-search-dropdown {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 0.35rem);
  background: #fff;
  border: 1px solid var(--iu-gray-200);
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 60;
}
.iu-search-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 0.85rem;
  font-size: 0.85rem;
  color: var(--iu-gray-800);
}
.iu-search-item:hover {
  background: var(--iu-emerald-50);
}
.iu-search-item small {
  background: var(--iu-gray-100);
  color: var(--iu-gray-600);
  padding: 0.1rem 0.4rem;
  border-radius: 0.25rem;
  text-transform: capitalize;
}
.iu-search-empty {
  padding: 0.75rem;
  font-size: 0.85rem;
  color: var(--iu-gray-500);
  text-align: center;
}

.iu-desktop-nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--iu-gray-600);
}
.iu-desktop-nav a:hover {
  color: var(--iu-emerald-600);
}
.iu-desktop-nav .iu-kerala-link {
  color: var(--iu-emerald-700);
  font-weight: 700;
}

.iu-mobile-controls {
  display: none;
  gap: 0.4rem;
}
.iu-icon-btn {
  border: 1px solid var(--iu-gray-200);
  background: #fff;
  border-radius: 0.5rem;
  padding: 0.4rem 0.65rem;
  font-size: 0.85rem;
  cursor: pointer;
}
.iu-mobile-panel {
  border-top: 1px solid var(--iu-gray-100);
  padding: 0.75rem 1rem;
  background: #fff;
}
.iu-mobile-nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.iu-mobile-nav-list a {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.65rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--iu-gray-700);
}
.iu-mobile-nav-list a:hover {
  background: var(--iu-emerald-50);
  color: var(--iu-emerald-700);
}

/* Main Layout & Containers */
.iu-page-container, .iu-post-container, .iu-home-section-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.iu-post-container, .iu-legal-page {
  max-width: 56rem;
}

/* Breadcrumbs */
.iu-breadcrumbs {
  margin: 0.5rem 0 1rem;
  font-size: 0.78rem;
  color: var(--iu-gray-500);
}
.iu-breadcrumbs ol {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
}
.iu-breadcrumbs a:hover {
  color: var(--iu-emerald-600);
}
.iu-crumb-sep {
  margin-right: 0.35rem;
  color: var(--iu-gray-400);
}

/* Homepage Hero & Grids */
.iu-home-hero {
  background: linear-gradient(180deg, rgba(236, 253, 245, 0.75) 0%, #ffffff 100%);
  border-bottom: 1px solid var(--iu-gray-100);
  text-align: center;
  padding: 3rem 1rem;
}
.iu-hero-pill {
  display: inline-block;
  border: 1px solid var(--iu-emerald-200);
  background: var(--iu-emerald-50);
  color: var(--iu-emerald-800);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.85rem;
  border-radius: 999px;
  margin-bottom: 1rem;
}
.iu-home-hero h1 {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  max-width: 46rem;
  margin: 0 auto;
  line-height: 1.2;
}
.iu-home-hero h1 span {
  color: var(--iu-emerald-600);
}
.iu-home-hero p {
  max-width: 40rem;
  margin: 1rem auto 0;
  color: var(--iu-gray-600);
  font-size: 1.05rem;
}
.iu-trust-badges {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem;
}
.iu-trust-badge {
  background: #fff;
  border: 1px solid var(--iu-gray-200);
  border-radius: 0.5rem;
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  color: var(--iu-gray-600);
}

.iu-home-band {
  padding: 2.5rem 0;
  border-top: 1px solid var(--iu-gray-100);
}
.iu-home-band-alt {
  background: var(--iu-gray-50);
}
.iu-section-head {
  margin-bottom: 1.5rem;
}
.iu-section-head h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
}
.iu-section-head p {
  font-size: 0.9rem;
  color: var(--iu-gray-500);
  margin: 0.25rem 0 0;
}

.iu-cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
  gap: 1.25rem;
}
.iu-cat-card, .iu-tool-card, .iu-article-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--iu-gray-200);
  border-radius: 1rem;
  background: #fff;
  padding: 1.35rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.iu-cat-card:hover, .iu-tool-card:hover, .iu-article-card:hover {
  border-color: var(--iu-emerald-500);
  box-shadow: 0 4px 14px rgba(5, 150, 105, 0.08);
}
.iu-cat-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.65rem;
}
.iu-cat-count {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--iu-emerald-700);
  background: var(--iu-emerald-50);
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}
.iu-cat-malayalam {
  font-size: 0.78rem;
  color: var(--iu-emerald-700);
  margin: 0.15rem 0 0.5rem;
  font-weight: 600;
}
.iu-related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15.5rem, 1fr));
  gap: 1rem;
}
.iu-tool-card h3, .iu-tool-card h4 {
  margin: 0 0 0.35rem;
  font-size: 0.98rem;
  color: var(--iu-gray-900);
}
.iu-tool-card p {
  margin: 0;
  font-size: 0.8rem;
  color: var(--iu-gray-500);
}
.iu-tool-cta {
  margin-top: 0.85rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--iu-emerald-600);
}

.iu-index-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14.5rem, 1fr));
  gap: 0.75rem;
}
.iu-index-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--iu-gray-200);
  border-radius: 0.65rem;
  padding: 0.65rem 0.85rem;
  background: #fff;
  font-size: 0.85rem;
  font-weight: 600;
}
.iu-index-item:hover {
  border-color: var(--iu-emerald-500);
  background: var(--iu-emerald-50);
}
.iu-index-item small {
  font-size: 0.7rem;
  color: var(--iu-gray-500);
  text-transform: capitalize;
}

.iu-articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
  gap: 1.25rem;
}

/* Calculator Widget Layout */
.iu-page-hero {
  margin-bottom: 1.75rem;
}
.iu-hero-badges {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.iu-cat-pill {
  background: var(--iu-emerald-100);
  color: var(--iu-emerald-800);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.15rem 0.6rem;
  border-radius: 0.35rem;
  text-transform: uppercase;
}
.iu-free-pill {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--iu-emerald-700);
}
.iu-page-title, .iu-post-title {
  font-size: 2rem;
  font-weight: 800;
  margin: 0.25rem 0;
  line-height: 1.25;
}
.iu-page-subtitle {
  color: var(--iu-gray-600);
  font-size: 1rem;
  max-width: 48rem;
  margin: 0.35rem 0 0;
}

.iu-calc-grid {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 1.75rem;
  align-items: start;
}
.iu-two-col-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
}
.iu-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.iu-card {
  border: 1px solid var(--iu-gray-200);
  border-radius: 1rem;
  background: #fff;
  padding: 1.5rem;
}
.iu-result-card {
  border: 1px solid var(--iu-emerald-100);
  border-radius: 1rem;
  background: linear-gradient(180deg, rgba(236, 253, 245, 0.7) 0%, #ffffff 100%);
  padding: 1.5rem;
}
.iu-result-card-amber {
  border-color: var(--iu-amber-200);
  background: linear-gradient(180deg, rgba(255, 251, 235, 0.75) 0%, #ffffff 100%);
}

.iu-field {
  margin-bottom: 1.25rem;
}
.iu-field:last-child {
  margin-bottom: 0;
}
.iu-field-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.45rem;
  gap: 0.5rem;
}
.iu-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--iu-gray-800);
  display: block;
}
.iu-label-sm {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--iu-gray-700);
  display: block;
  margin-bottom: 0.3rem;
}
.iu-input-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.iu-prefix, .iu-suffix {
  font-size: 0.78rem;
  color: var(--iu-gray-500);
}
.iu-num-input, .iu-select, .iu-date-input {
  border: 1px solid var(--iu-gray-200);
  border-radius: 0.5rem;
  padding: 0.4rem 0.6rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--iu-gray-900);
  text-align: right;
  width: 7.5rem;
}
.iu-select, .iu-date-input {
  text-align: left;
  width: auto;
}
.iu-w-20 { width: 5.2rem; }
.iu-w-24 { width: 6.2rem; }
.iu-w-full { width: 100%; }

.iu-range {
  width: 100%;
  accent-color: var(--iu-emerald-600);
  cursor: pointer;
}
.iu-range-ticks {
  display: flex;
  justify-content: space-between;
  font-size: 0.68rem;
  color: var(--iu-gray-400);
  margin-top: 0.2rem;
}
.iu-field-hint {
  font-size: 0.72rem;
  color: var(--iu-gray-500);
  margin: 0.25rem 0 0;
}
.iu-warning-hint {
  font-size: 0.75rem;
  color: var(--iu-amber-600);
  font-weight: 600;
  margin: 0.35rem 0 0;
}

.iu-checkbox-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--iu-emerald-50);
  border: 1px solid var(--iu-emerald-100);
  padding: 0.65rem 0.85rem;
  border-radius: 0.75rem;
  margin-bottom: 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
}
.iu-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
}
.iu-radio-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
}

.iu-btn-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  margin-top: 0.4rem;
}
.iu-btn-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-top: 0.4rem;
}
.iu-choice-btn, .iu-rate-btn {
  border: 1px solid var(--iu-gray-200);
  background: #fff;
  border-radius: 0.75rem;
  padding: 0.6rem 0.4rem;
  cursor: pointer;
  text-align: center;
}
.iu-choice-btn-active {
  border-color: var(--iu-emerald-500);
  background: var(--iu-emerald-50);
  color: var(--iu-emerald-900);
  font-weight: 700;
}
.iu-rate-btn {
  font-weight: 700;
  font-size: 0.875rem;
}
.iu-rate-btn-active {
  background: var(--iu-emerald-600);
  border-color: var(--iu-emerald-600);
  color: #fff;
}
.iu-choice-title {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
}
.iu-choice-sub {
  display: block;
  font-size: 0.65rem;
  color: var(--iu-gray-500);
}
.iu-toggle-pair {
  display: flex;
  gap: 0.35rem;
}
.iu-mini-btn {
  border: 1px solid var(--iu-gray-200);
  background: var(--iu-gray-100);
  border-radius: 0.35rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.72rem;
  cursor: pointer;
}
.iu-mini-btn-active {
  background: var(--iu-amber-600);
  border-color: var(--iu-amber-600);
  color: #fff;
}

.iu-result-eyebrow {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--iu-emerald-800);
  margin: 0;
}
.iu-result-primary {
  font-size: 2rem;
  font-weight: 900;
  color: var(--iu-gray-900);
  margin: 0.25rem 0;
}
.iu-result-secondary {
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--iu-emerald-800);
}
.iu-result-sub {
  font-size: 0.75rem;
  color: var(--iu-gray-500);
  margin: 0;
}
.iu-result-rows {
  border-top: 1px solid var(--iu-emerald-100);
  padding-top: 0.85rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  font-size: 0.875rem;
}
.iu-result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}
.iu-result-row-total {
  border-top: 1px dashed var(--iu-gray-200);
  padding-top: 0.55rem;
  font-weight: 700;
}
.iu-sub-row {
  padding-left: 0.6rem;
  border-left: 2px solid var(--iu-emerald-200);
  font-size: 0.78rem;
  color: var(--iu-gray-500);
}

.iu-ratio-box {
  margin-top: 1rem;
}
.iu-ratio-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--iu-gray-600);
  margin-bottom: 0.35rem;
}
.iu-dot {
  display: inline-block;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
}
.iu-dot-emerald, .iu-ratio-fill-emerald { background: var(--iu-emerald-600); }
.iu-dot-amber, .iu-ratio-fill-amber { background: var(--iu-amber-500); }
.iu-dot-gray, .iu-ratio-fill-gray { background: var(--iu-gray-400); }
.iu-ratio-bar {
  height: 0.65rem;
  border-radius: 999px;
  background: var(--iu-gray-200);
  overflow: hidden;
  display: flex;
}

.iu-calc-note {
  margin-top: 1rem;
  background: var(--iu-gray-50);
  border: 1px solid var(--iu-gray-100);
  border-radius: 0.75rem;
  padding: 0.75rem;
  font-size: 0.75rem;
  color: var(--iu-gray-600);
  line-height: 1.5;
}
.iu-calc-note a, .iu-inline-link {
  color: var(--iu-emerald-700);
  text-decoration: underline;
}
.iu-planning-disclaimer {
  margin-top: 1rem;
  border: 1px solid var(--iu-amber-200);
  background: var(--iu-amber-50);
  color: var(--iu-amber-900);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.78rem;
}

.iu-highlight-box {
  margin-top: 1rem;
  background: var(--iu-emerald-50);
  border: 1px solid var(--iu-emerald-200);
  border-radius: 0.75rem;
  padding: 0.85rem;
}
.iu-highlight-blue {
  background: var(--iu-blue-50);
  border-color: var(--iu-blue-100);
}
.iu-banner-amber {
  background: var(--iu-amber-50);
  border: 1px solid var(--iu-amber-200);
  color: var(--iu-amber-900);
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.82rem;
  margin-bottom: 1rem;
}
.iu-banner-blue {
  background: var(--iu-blue-50);
  border: 1px solid var(--iu-blue-100);
  color: var(--iu-blue-800);
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.82rem;
  margin-bottom: 1rem;
}
.iu-info-pill {
  display: flex;
  justify-content: space-between;
  background: var(--iu-gray-50);
  border: 1px solid var(--iu-gray-200);
  padding: 0.65rem 0.85rem;
  border-radius: 0.75rem;
  font-size: 0.82rem;
  margin-top: 0.35rem;
}
.iu-inline-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0.75rem 0;
}
.iu-stat-tile {
  background: #fff;
  border: 1px solid var(--iu-emerald-100);
  border-radius: 0.65rem;
  padding: 0.65rem;
}
.iu-badge {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.78rem;
  font-weight: 700;
}
.iu-badge-emerald { background: var(--iu-emerald-100); color: var(--iu-emerald-800); }
.iu-badge-blue { background: var(--iu-blue-100); color: var(--iu-blue-800); }
.iu-badge-amber { background: var(--iu-amber-100); color: var(--iu-amber-800); }
.iu-badge-red { background: var(--iu-red-100); color: var(--iu-red-800); }

.iu-text-emerald { color: var(--iu-emerald-700); }
.iu-text-amber { color: var(--iu-amber-600); }
.iu-text-red { color: var(--iu-red-600); }
.iu-text-muted { color: var(--iu-gray-500); font-size: 0.78rem; }

/* Guide Card & Prose */
.iu-guide-card {
  margin-top: 2.5rem;
  border: 1px solid var(--iu-gray-200);
  border-radius: 1rem;
  background: #fff;
  padding: 1.75rem;
}
.iu-guide-block {
  border-top: 1px solid var(--iu-gray-100);
  padding-top: 1.25rem;
  margin-top: 1.25rem;
}
.iu-formula-box {
  background: var(--iu-gray-50);
  border: 1px solid var(--iu-gray-200);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-top: 1rem;
}
.iu-formula-expr {
  background: #fff;
  border: 1px solid var(--iu-gray-200);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.85rem;
  overflow-x: auto;
}
.iu-faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.iu-faq-item {
  border: 1px solid var(--iu-gray-100);
  background: var(--iu-gray-50);
  border-radius: 0.75rem;
  padding: 1rem;
}
.iu-faq-item h4 {
  margin: 0 0 0.35rem;
  font-size: 0.95rem;
}
.iu-faq-item p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--iu-gray-600);
}

.iu-related-section {
  margin-top: 2.5rem;
}
.iu-guide-link-list {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.iu-guide-link {
  color: var(--iu-emerald-700);
  font-weight: 600;
  font-size: 0.92rem;
}
.iu-guide-link:hover {
  text-decoration: underline;
}

/* Category Hub Banner & Topics */
.iu-category-banner {
  background: linear-gradient(135deg, var(--iu-emerald-700), var(--iu-teal-800));
  color: #fff;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
}
.iu-banner-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.18);
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
}
.iu-malayalam-sub {
  color: var(--iu-emerald-200);
  font-weight: 600;
  margin: 0.25rem 0;
}
.iu-category-desc {
  color: rgba(255, 255, 255, 0.92);
  max-width: 44rem;
  margin: 0.5rem 0 0;
}
.iu-topic-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.iu-topic-card {
  border: 1px solid var(--iu-gray-200);
  border-radius: 0.85rem;
  padding: 1.25rem;
  background: #fff;
}
.iu-topic-card h3 {
  margin: 0 0 0.4rem;
  font-size: 1.05rem;
}
.iu-topic-links {
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.iu-topic-article-link {
  color: var(--iu-emerald-700);
  font-weight: 600;
  font-size: 0.85rem;
}
.iu-topic-calc-link {
  background: var(--iu-emerald-50);
  border: 1px solid var(--iu-emerald-200);
  color: var(--iu-emerald-700);
  padding: 0.25rem 0.65rem;
  border-radius: 0.45rem;
  font-size: 0.78rem;
  font-weight: 600;
}
.iu-important-note {
  margin-top: 2rem;
  background: var(--iu-gray-50);
  border: 1px solid var(--iu-gray-200);
  border-radius: 0.85rem;
  padding: 1.15rem;
}

/* Post / Article Layout */
.iu-post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: var(--iu-gray-500);
  margin-bottom: 0.5rem;
}
.iu-post-summary {
  border-left: 4px solid var(--iu-emerald-500);
  background: var(--iu-emerald-50);
  padding: 0.65rem 1rem;
  font-style: italic;
  color: var(--iu-gray-700);
  margin: 1rem 0 1.5rem;
}
.iu-prose p {
  margin: 0 0 1.1rem;
  color: var(--iu-gray-800);
}
.iu-prose h2, .iu-prose h3, .iu-prose-heading {
  color: var(--iu-gray-900);
  margin: 1.75rem 0 0.6rem;
  font-size: 1.3rem;
}
.iu-prose-list, .iu-prose-olist {
  padding-left: 1.4rem;
  margin: 0.75rem 0 1.1rem;
}
.iu-prose-list li, .iu-prose-olist li {
  margin-bottom: 0.4rem;
}
.iu-inline-code {
  background: var(--iu-gray-100);
  padding: 0.1rem 0.35rem;
  border-radius: 0.25rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
}
.iu-related-calculators-callout {
  margin-top: 2.5rem;
  background: var(--iu-emerald-50);
  border: 1px solid var(--iu-emerald-200);
  border-radius: 1rem;
  padding: 1.5rem;
}

/* Contact Grid */
.iu-contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-top: 1.5rem;
}
.iu-span-2 {
  grid-column: span 2;
}
.iu-btn-primary {
  display: inline-block;
  background: var(--iu-emerald-700);
  color: #fff;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.55rem 1rem;
  border-radius: 0.5rem;
}
.iu-btn-primary:hover {
  background: var(--iu-emerald-800);
}

/* Footer */
.iu-site-footer {
  margin-top: 4rem;
  border-top: 1px solid var(--iu-gray-200);
  background: var(--iu-gray-50);
  color: var(--iu-gray-600);
}
.iu-footer-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 1rem;
}
.iu-footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
}
.iu-footer-col h3 {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--iu-gray-900);
  margin: 0 0 0.75rem;
}
.iu-footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: 0.875rem;
}
.iu-footer-col a:hover {
  color: var(--iu-emerald-600);
}
.iu-footer-bottom {
  margin-top: 2.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--iu-gray-200);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: var(--iu-gray-500);
}

@media (max-width: 900px) {
  .iu-desktop-nav, .iu-search-wrap {
    display: none;
  }
  .iu-mobile-controls {
    display: flex;
  }
  .iu-calc-grid, .iu-two-col-cards, .iu-contact-grid, .iu-footer-grid {
    grid-template-columns: 1fr;
  }
  .iu-span-2 {
    grid-column: span 1;
  }
  .iu-home-hero h1 {
    font-size: 1.75rem;
  }
}
`;
}

export function generateBloggerThemeXml({
  CATEGORIES,
  CALCULATORS,
  ARTICLES,
  routesMap,
  stylesCss,
  calculatorRuntimeJs
}) {
  const featuredTools = CALCULATORS.slice(0, 8);

  const categoriesGridHtml = CATEGORIES.map(cat => {
    const count = CALCULATORS.filter(c => c.category === cat.id).length;
    const href = escapeHtml(rewriteInternalUrl(`/category/${cat.id}`, routesMap));
    return `<a href="${href}" class="iu-cat-card">
                <div>
                  <div class="iu-cat-card-top">
                    <strong>${escapeHtml(cat.name)}</strong>
                    <span class="iu-cat-count">${count} tools</span>
                  </div>
                  <p class="iu-cat-malayalam">${escapeHtml(cat.malayalamName)}</p>
                  <p>${escapeHtml(cat.description)}</p>
                </div>
                <span class="iu-tool-cta">Explore Tools →</span>
              </a>`;
  }).join('\n              ');

  const featuredGridHtml = featuredTools
    .map(tool => {
      const href = escapeHtml(rewriteInternalUrl(`/calculators/${tool.slug}`, routesMap));
      return `<a href="${href}" class="iu-tool-card">
                <div>
                  <span class="iu-cat-pill">${escapeHtml(tool.category)}</span>
                  <h3>${escapeHtml(tool.name)}</h3>
                  <p>${escapeHtml(tool.shortDesc)}</p>
                </div>
                <span class="iu-tool-cta">Calculate now →</span>
              </a>`;
    })
    .join('\n              ');

  const allToolsIndexHtml = CALCULATORS.map(tool => {
    const href = escapeHtml(rewriteInternalUrl(`/calculators/${tool.slug}`, routesMap));
    return `<a href="${href}" class="iu-index-item">
                <span>${escapeHtml(tool.name)}</span>
                <small>${escapeHtml(tool.category)}</small>
              </a>`;
  }).join('\n              ');

  const guidesGridHtml = ARTICLES.map(art => {
    const href = escapeHtml(rewriteInternalUrl(`/articles/${art.slug}`, routesMap));
    return `<a href="${href}" class="iu-article-card">
                <div>
                  <div class="iu-post-meta">
                    <span class="iu-cat-pill">${escapeHtml(art.category)}</span>
                    <span>•</span>
                    <span>${escapeHtml(art.readTime)}</span>
                  </div>
                  <h3>${escapeHtml(art.title)}</h3>
                  <p>${escapeHtml(art.summary)}</p>
                </div>
                <span class="iu-tool-cta">Read complete guide →</span>
              </a>`;
  }).join('\n              ');

  const footerCategoriesHtml = CATEGORIES.map(cat => {
    const href = escapeHtml(rewriteInternalUrl(`/category/${cat.id}`, routesMap));
    return `<li><a href="${href}">${escapeHtml(cat.name)}</a></li>`;
  }).join('\n              ');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsVersion='3' expr:dir='data:blog.languageDirection' lang='en' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
  <head>
    <meta charset='utf-8'/>
    <meta content='width=device-width, initial-scale=1' name='viewport'/>
    <b:include data='blog' name='all-head-content'/>

    <b:if cond='data:blog.url == data:blog.homepageUrl'>
      <title>Free Online Calculators for Finance, Banking, Jobs &amp; Gold in India | IndiaUseful</title>
    <b:elseif cond='data:blog.pageName'/>
      <title><data:blog.pageName/> | <data:blog.title/></title>
    <b:else/>
      <title><data:blog.pageTitle/></title>
    </b:if>

    <b:if cond='data:blog.metaDescription'>
      <meta expr:content='data:blog.metaDescription' name='description'/>
    <b:else/>
      <meta content='Free Indian calculators for Loan EMI, SIP, FD, PPF, NPS, gratuity, take-home salary, gold rates, GST, and Kerala Pavan. No sign-up required.' name='description'/>
    </b:if>

    <link expr:href='data:blog.canonicalUrl' rel='canonical'/>

    <b:if cond='data:blog.pageType in {&quot;archive&quot;, &quot;search&quot;}'>
      <meta content='noindex,follow' name='robots'/>
    <b:else/>
      <meta content='index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' name='robots'/>
    </b:if>

    <!-- Open Graph / Twitter Metadata supported by Blogger -->
    <meta content='en_IN' property='og:locale'/>
    <meta content='IndiaUseful' property='og:site_name'/>
    <b:if cond='data:blog.pageType == &quot;item&quot;'>
      <meta content='article' property='og:type'/>
    <b:else/>
      <meta content='website' property='og:type'/>
    </b:if>
    <b:if cond='data:blog.pageName'>
      <meta expr:content='data:blog.pageName + &quot; | IndiaUseful&quot;' property='og:title'/>
      <meta expr:content='data:blog.pageName + &quot; | IndiaUseful&quot;' name='twitter:title'/>
    <b:else/>
      <meta content='IndiaUseful - Free Calculators for India' property='og:title'/>
      <meta content='IndiaUseful - Free Calculators for India' name='twitter:title'/>
    </b:if>
    <b:if cond='data:blog.metaDescription'>
      <meta expr:content='data:blog.metaDescription' property='og:description'/>
      <meta expr:content='data:blog.metaDescription' name='twitter:description'/>
    <b:else/>
      <meta content='Accurate, instant calculators for Loans, Investments, Salary, Gold, and Everyday Math.' property='og:description'/>
      <meta content='Accurate, instant calculators for Loans, Investments, Salary, Gold, and Everyday Math.' name='twitter:description'/>
    </b:if>
    <meta expr:content='data:blog.canonicalUrl' property='og:url'/>
    <meta content='summary_large_image' name='twitter:card'/>

    <script type='application/ld+json'>
      {
        &quot;@context&quot;: &quot;https://schema.org&quot;,
        &quot;@type&quot;: &quot;Organization&quot;,
        &quot;name&quot;: &quot;IndiaUseful&quot;,
        &quot;description&quot;: &quot;Free online calculators and financial tools for India&quot;,
        &quot;sameAs&quot;: [
          &quot;https://github.com/ramnath086/indiauseful&quot;
        ]
      }
    </script>

    <b:skin><![CDATA[
/*
-----------------------------------------------
Blogger Template Style
Name:     IndiaUseful Blogger Edition
Designer: IndiaUseful Team
Version:  1.0.0
----------------------------------------------- */
${stylesCss}
    ]]></b:skin>
  </head>

  <body>
    <a class='iu-skip-link' href='#main-content'>Skip to main content</a>

    <header class='iu-site-header' role='banner'>
      <div class='iu-header-inner'>
        <a class='iu-brand' expr:href='data:blog.homepageUrl'>
          <div class='iu-brand-mark'>IU</div>
          <div>
            <div>
              <span class='iu-brand-title'>India<span>Useful</span></span>
              <span class='iu-brand-badge'>IN</span>
            </div>
            <p class='iu-brand-tag'>Smart Calculators &amp; Utilities</p>
          </div>
        </a>

        <div class='iu-search-wrap' role='search'>
          <input aria-label='Search calculators and tools' autocomplete='off' class='iu-search-input' id='iu-search-input' placeholder='Search EMI, SIP, Gold, Salary, GST...' type='search'/>
          <div class='iu-search-dropdown' hidden='hidden' id='iu-search-results'/>
        </div>

        <nav aria-label='Primary categories' class='iu-desktop-nav'>
          <a href='/p/category-finance.html'>Finance</a>
          <a href='/p/category-banking.html'>Banking</a>
          <a href='/p/category-jobs.html'>Jobs &amp; CTC</a>
          <a href='/p/category-gold.html'>Gold</a>
          <a href='/p/category-tools.html'>Utility Tools</a>
          <a class='iu-kerala-link' href='/p/category-kerala.html'>കേരളം</a>
        </nav>

        <div class='iu-mobile-controls'>
          <button aria-controls='mobile-search-panel' aria-expanded='false' aria-label='Toggle Search' class='iu-icon-btn' id='iu-mobile-search-btn' type='button'>Search</button>
          <button aria-controls='mobile-menu-panel' aria-expanded='false' aria-label='Toggle Menu' class='iu-icon-btn' id='iu-mobile-menu-btn' type='button'>Menu</button>
        </div>
      </div>

      <div class='iu-mobile-panel' hidden='hidden' id='mobile-search-panel'>
        <input aria-label='Search calculators and tools' autocomplete='off' class='iu-search-input' id='iu-mobile-search-input' placeholder='Search EMI, SIP, Gold, Salary, GST...' type='search'/>
        <div class='iu-search-dropdown' hidden='hidden' id='iu-mobile-search-results'/>
      </div>

      <nav aria-label='Mobile navigation' class='iu-mobile-panel' hidden='hidden' id='mobile-menu-panel'>
        <div class='iu-mobile-nav-list'>
          <a href='/p/category-finance.html'><span>Finance &amp; Investments</span><small>ധനകാര്യം &amp; നിക്ഷേപങ്ങൾ</small></a>
          <a href='/p/category-banking.html'><span>Banking &amp; Loans</span><small>ബാങ്കിംഗ് &amp; വായ്പകൾ</small></a>
          <a href='/p/category-jobs.html'><span>Salary &amp; Employment</span><small>ശമ്പളം &amp; തൊഴിൽ</small></a>
          <a href='/p/category-gold.html'><span>Gold &amp; Jewellery</span><small>സ്വർണം &amp; ആഭരണങ്ങൾ</small></a>
          <a href='/p/category-tools.html'><span>Everyday Utility Tools</span><small>ദൈനംദിന യൂട്ടിലിറ്റികൾ</small></a>
          <a href='/p/category-kerala.html'><span>Kerala Special Corner</span><small>കേരള സ്പെഷ്യൽ</small></a>
          <a href='/p/about.html'><span>About IndiaUseful</span></a>
          <a href='/p/contact.html'><span>Contact Us</span></a>
        </div>
      </nav>
    </header>

    <main id='main-content' role='main'>
      <b:section class='main-section' id='main' showaddelement='yes'>
        <b:widget id='Blog1' locked='true' title='Blog Posts' type='Blog' version='2'>
          <b:includable id='main' var='top'>
            <b:if cond='data:blog.url == data:blog.homepageUrl'>
              <!-- Crawlable IndiaUseful Homepage -->
              <section class='iu-home-hero'>
                <div class='iu-hero-pill'>✨ 100% Free • No Signup • Indian Standards</div>
                <h1>Everyday Financial &amp; Utility Calculators for <span>India</span></h1>
                <p>Accurate, lightning-fast tools for your loan EMIs, mutual fund SIPs, salary in-hand, gold jewellery billing, and Kerala sovereign rates.</p>
                <div class='iu-trust-badges'>
                  <span class='iu-trust-badge'>⚡ Instant Calculations</span>
                  <span class='iu-trust-badge'>🛡️ Private &amp; Client-side</span>
                  <span class='iu-trust-badge'>🧮 Built using Indian financial rules and clearly stated assumptions.</span>
                </div>
              </section>

              <section class='iu-home-band' id='categories'>
                <div class='iu-home-section-inner'>
                  <div class='iu-section-head'>
                    <h2>Browse by Category</h2>
                    <p>Explore specialized tools tailored to Indian financial and daily needs.</p>
                  </div>
                  <div class='iu-cat-grid'>
                    ${categoriesGridHtml}
                  </div>
                </div>
              </section>

              <section class='iu-home-band iu-home-band-alt'>
                <div class='iu-home-section-inner'>
                  <div class='iu-section-head'>
                    <h2>Most Popular Calculators</h2>
                    <p>Frequently used tools for loans, investments, taxes, and daily calculations.</p>
                  </div>
                  <div class='iu-related-grid'>
                    ${featuredGridHtml}
                  </div>
                </div>
              </section>

              <section class='iu-home-band'>
                <div class='iu-home-section-inner'>
                  <div class='iu-section-head'>
                    <h2>All Free Tools &amp; Calculators Index</h2>
                    <p>Complete directory of all 21 interactive calculators.</p>
                  </div>
                  <div class='iu-index-grid'>
                    ${allToolsIndexHtml}
                  </div>
                </div>
              </section>

              <section class='iu-home-band iu-home-band-alt' id='guides'>
                <div class='iu-home-section-inner'>
                  <div class='iu-section-head'>
                    <h2>Indian Practical Finance Guides</h2>
                    <p>In-depth financial knowledge base, formulas, and practical walkthroughs.</p>
                  </div>
                  <div class='iu-articles-grid'>
                    ${guidesGridHtml}
                  </div>
                </div>
              </section>

            <b:elseif cond='data:blog.pageType == &quot;static_page&quot;'/>
              <b:loop values='data:posts' var='post'>
                <div class='iu-static-page-wrapper'>
                  <data:post.body/>
                </div>
              </b:loop>

            <b:elseif cond='data:blog.pageType == &quot;item&quot;'/>
              <b:loop values='data:posts' var='post'>
                <div class='iu-post-item-wrapper'>
                  <data:post.body/>
                </div>
              </b:loop>

            <b:elseif cond='data:blog.pageType in {&quot;index&quot;, &quot;archive&quot;}'/>
              <div class='iu-page-container'>
                <nav aria-label='Breadcrumb' class='iu-breadcrumbs'>
                  <ol>
                    <li><a expr:href='data:blog.homepageUrl'>Home</a></li>
                    <b:if cond='data:blog.searchLabel'>
                      <li><span aria-hidden='true' class='iu-crumb-sep'>›</span><span aria-current='page'><data:blog.searchLabel/></span></li>
                    </b:if>
                  </ol>
                </nav>
                <header class='iu-page-hero'>
                  <b:if cond='data:blog.searchLabel'>
                    <h1 class='iu-page-title'>Guides &amp; Articles: <data:blog.searchLabel/></h1>
                    <p class='iu-page-subtitle'>Browse our full category hub and calculators or read the guides below.</p>
                  <b:else/>
                    <h1 class='iu-page-title'>All Guides &amp; Articles</h1>
                  </b:if>
                </header>
                <div class='iu-articles-grid'>
                  <b:loop values='data:posts' var='post'>
                    <a class='iu-article-card' expr:href='data:post.url'>
                      <div>
                        <h3><data:post.title/></h3>
                        <p><data:post.snippet/></p>
                      </div>
                      <span class='iu-tool-cta'>Read complete guide →</span>
                    </a>
                  </b:loop>
                </div>
              </div>

            <b:else/>
              <div class='iu-page-container'>
                <h1 class='iu-page-title'>Page Not Found</h1>
                <p class='iu-page-subtitle'>The page you requested could not be found. Explore our free Indian calculators from the homepage.</p>
                <p><a class='iu-btn-primary' expr:href='data:blog.homepageUrl'>Return to IndiaUseful Home</a></p>
              </div>
            </b:if>
          </b:includable>
        </b:widget>
      </b:section>
    </main>

    <footer class='iu-site-footer' role='contentinfo'>
      <div class='iu-footer-inner'>
        <div class='iu-footer-grid'>
          <div class='iu-footer-col'>
            <div class='iu-brand'>
              <div class='iu-brand-mark'>IU</div>
              <span class='iu-brand-title'>India<span>Useful</span></span>
            </div>
            <p>IndiaUseful offers free calculators and practical guides for common questions in India. Calculator inputs are processed in your browser; the site may still receive ordinary hosting request data. No account is required.</p>
            <p class='iu-text-muted'>ഭാരതീയർക്കായുള്ള ലളിതമായ കണക്കുകൂട്ടൽ സഹായികൾ. കൂടുതൽ വിവരങ്ങൾക്ക് സ്വകാര്യതാ നയം കാണുക.</p>
          </div>

          <div class='iu-footer-col'>
            <h3>Categories</h3>
            <ul>
              ${footerCategoriesHtml}
            </ul>
          </div>

          <div class='iu-footer-col'>
            <h3>Popular Tools</h3>
            <ul>
              <li><a href='/p/emi-calculator.html'>Loan EMI Calculator</a></li>
              <li><a href='/p/sip-calculator.html'>SIP Wealth Calculator</a></li>
              <li><a href='/p/salary-calculator.html'>In-Hand Salary</a></li>
              <li><a href='/p/gold-price-calculator.html'>Gold Billing &amp; GST</a></li>
              <li><a href='/p/kerala-gold-pavan-calculator.html'>Kerala Pavan Gold</a></li>
              <li><a href='/p/gst-calculator.html'>Indian GST Calculator</a></li>
            </ul>
          </div>

          <div class='iu-footer-col'>
            <h3>Legal &amp; Trust</h3>
            <ul>
              <li><a href='/p/about.html'>About Us</a></li>
              <li><a href='/p/contact.html'>Contact</a></li>
              <li><a href='/p/privacy.html'>Privacy Policy</a></li>
              <li><a href='/p/terms.html'>Terms of Service</a></li>
              <li><a href='/p/disclaimer.html'>Financial Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div class='iu-footer-bottom'>
          <p>© 2026 IndiaUseful. All rights reserved. Built for India with precision.</p>
          <p>Calculations are for informational purposes only. Consult certified financial or legal advisors for regulated transactions.</p>
        </div>
      </div>
    </footer>

    <script type='text/javascript'>
//<![CDATA[
${calculatorRuntimeJs}
//]]>
    </script>
  </body>
</html>
`;
}
