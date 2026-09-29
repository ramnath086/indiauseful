import { SITE_URL } from '@/lib/siteConfig';
import { createPageMetadata } from '@/lib/metadata';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ARTICLES, CALCULATORS } from '@/data/calculators';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdPlaceholder from '@/components/AdPlaceholder';
import { renderMarkdown } from '@/lib/renderMarkdown';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ARTICLES.map(art => ({
    slug: art.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) return {};

  return createPageMetadata({
    title: article.title,
    description: article.summary,
    path: `/articles/${article.slug}`
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedCalculators = CALCULATORS.filter(c => c.category === article.category).slice(0, 4);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    author: {
      '@type': 'Organization',
      name: 'IndiaUseful Team',
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'IndiaUseful',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.ico`
      }
    },
    mainEntityOfPage: `${SITE_URL}/articles/${article.slug}`
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Breadcrumbs items={[{ label: 'Guides', href: '/#guides' }, { label: article.title }]} />

      <header className="mt-4 mb-6">
        <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
          <span className="rounded bg-emerald-50 px-2.5 py-0.5 font-semibold text-emerald-800 uppercase">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> {article.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {article.readTime}
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
          {article.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 border-l-4 border-emerald-500 pl-4 py-1 italic bg-emerald-50/30">
          {article.summary}
        </p>
      </header>

      <AdPlaceholder slotId="article-top" format="horizontal" />

      {/* Article Body */}
      <div className="prose prose-emerald max-w-none text-gray-800 leading-relaxed space-y-5 text-sm sm:text-base mt-6">
        {renderMarkdown(article.content)}
      </div>

      <AdPlaceholder slotId="article-bottom" format="horizontal" />

      {/* Related Calculators Callout */}
      <div className="mt-12 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-gray-900">
          Related Free Calculators
        </h3>
        <p className="text-xs text-gray-600 mt-1 mb-4">
          Put this knowledge into practice with our fast, private financial calculators:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {relatedCalculators.map(tool => (
            <Link
              key={tool.id}
              href={`/calculators/${tool.slug}`}
              className="flex items-center justify-between rounded-xl border border-white bg-white p-3.5 shadow-2xs hover:border-emerald-500 hover:shadow-xs transition-all"
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">{tool.name}</p>
                <p className="text-[11px] text-gray-500 line-clamp-1">{tool.shortDesc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-emerald-600 shrink-0 ml-2" />
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
