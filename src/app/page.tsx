import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Landmark,
  TrendingUp,
  Briefcase,
  Coins,
  Wrench,
  Palmtree,
  Calculator,
  ArrowRight,
  Shield,
  Zap,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { CALCULATORS, CATEGORIES, ARTICLES } from '@/data/calculators';
import AdPlaceholder from '@/components/AdPlaceholder';

export const metadata: Metadata = {
  title: 'IndiaUseful - Free Online Calculators for Finance, Banking, Jobs & Gold in India',
  description:
    'Free, accurate Indian calculators for Loan EMI, SIP, FD, PPF, NPS, Gratuity, In-Hand Salary, Gold Rates, 3% GST, and Kerala Pavan. No sign up required.',
  alternates: {
    canonical: 'https://indiauseful.com/'
  }
};

const categoryIconMap: Record<string, React.ReactNode> = {
  finance: <TrendingUp className="h-6 w-6 text-emerald-600" />,
  banking: <Landmark className="h-6 w-6 text-blue-600" />,
  jobs: <Briefcase className="h-6 w-6 text-purple-600" />,
  gold: <Coins className="h-6 w-6 text-amber-500" />,
  tools: <Wrench className="h-6 w-6 text-teal-600" />,
  kerala: <Palmtree className="h-6 w-6 text-green-600" />
};

export default function HomePage() {
  const featuredTools = CALCULATORS.slice(0, 8);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'IndiaUseful',
    url: 'https://indiauseful.com',
    description: 'Free, fast, mobile-friendly Indian utility tools and calculators.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://indiauseful.com/calculators/{search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-white py-12 sm:py-16 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            100% Free • No Signup • Indian Standards
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 max-w-3xl mx-auto leading-tight">
            Everyday Financial & Utility Calculators for <span className="text-emerald-600">India</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Accurate, lightning-fast tools for your loan EMIs, mutual fund SIPs, salary in-hand, gold jewellery billing, and Kerala sovereign rates.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 shadow-xs border border-gray-200">
              <Zap className="h-3.5 w-3.5 text-amber-500" /> Instant Calculations
            </span>
            <span className="flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 shadow-xs border border-gray-200">
              <Shield className="h-3.5 w-3.5 text-blue-500" /> Private & Client-side
            </span>
            <span className="flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 shadow-xs border border-gray-200">
              <Calculator className="h-3.5 w-3.5 text-emerald-500" /> Built using Indian financial rules and clearly stated assumptions.
            </span>
          </div>
        </div>
      </section>

      {/* AdSense Top Banner Placeholder */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slotId="home-top-responsive" format="horizontal" />
      </div>

      {/* Categories Grid */}
      <section id="categories" className="py-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Browse by Category
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Explore specialized tools tailored to Indian financial and daily needs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map(cat => {
              const toolsInCat = CALCULATORS.filter(c => c.category === cat.id);
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  className="group relative flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-6 shadow-xs transition-all hover:border-emerald-500 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 group-hover:scale-105 transition-transform">
                        {categoryIconMap[cat.id]}
                      </div>
                      <span className="text-xs font-semibold text-gray-400 group-hover:text-emerald-600 transition-colors">
                        {toolsInCat.length} tools
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {cat.name}
                      </h3>
                    </div>
                    <p className="text-xs font-medium text-emerald-700/80 mt-0.5">
                      {cat.malayalamName}
                    </p>
                    <p className="text-sm text-gray-500 mt-2.5 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center text-xs font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
                    <span>Explore Tools</span>
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured / Popular Calculators Grid */}
      <section className="py-10 bg-gray-50/60 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Most Popular Calculators
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Frequently used tools for loans, investments, taxes, and daily calculations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredTools.map(tool => (
              <Link
                key={tool.id}
                href={`/calculators/${tool.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 capitalize">
                      {tool.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {tool.shortDesc}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-medium text-emerald-600">
                  <span>Calculate now</span>
                  <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-Page Ad Placeholder */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slotId="home-middle-responsive" format="horizontal" />
      </div>

      {/* All 20+ Calculators Quick Index */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
            All Free Tools & Calculators Index
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CALCULATORS.map(tool => (
              <Link
                key={tool.id}
                href={`/calculators/${tool.slug}`}
                className="flex items-center space-x-3 rounded-lg border border-gray-100 p-3 hover:bg-emerald-50/50 hover:border-emerald-200 transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-50 text-gray-700">
                  <Calculator className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="truncate text-sm font-medium text-gray-800">
                    {tool.name}
                  </p>
                  <p className="text-[11px] text-gray-400 capitalize">{tool.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guides & Educational Articles */}
      <section id="guides" className="py-12 bg-gray-50 border-t border-gray-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                <BookOpen className="h-4 w-4" /> Financial Knowledge Base
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-1">
                Indian Practical Finance Guides
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ARTICLES.map(art => (
              <Link
                key={art.slug}
                href={`/articles/${art.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <span className="capitalize font-semibold text-emerald-700">{art.category}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {art.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                  {art.summary}
                </p>
                <div className="mt-4 flex items-center text-xs font-semibold text-emerald-600">
                  Read complete guide <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
