import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CATEGORIES, CALCULATORS } from '@/data/calculators';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdPlaceholder from '@/components/AdPlaceholder';
import { ArrowRight, Calculator } from 'lucide-react';

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map(cat => ({
    category: cat.id
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find(c => c.id === category);
  if (!cat) return {};

  return {
    title: `${cat.name} Calculators & Tools - Free Indian Utility`,
    description: cat.description,
    alternates: {
      canonical: `https://indiauseful.com/category/${cat.id}`
    }
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find(c => c.id === category);

  if (!cat) {
    notFound();
  }

  const tools = CALCULATORS.filter(c => c.category === cat.id);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${cat.name} Calculators`,
    description: cat.description,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: `https://indiauseful.com/calculators/${tool.slug}`
    }))
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Breadcrumbs items={[{ label: 'Categories', href: '/#categories' }, { label: cat.name }]} />

      <div className="mt-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 p-6 sm:p-10 text-white shadow-md">
        <div className="inline-block rounded-full bg-emerald-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
          Category Hub
        </div>
        <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight">
          {cat.name}
        </h1>
        <p className="mt-1 text-emerald-200 text-sm font-medium">
          {cat.malayalamName}
        </p>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-emerald-100/90 leading-relaxed">
          {cat.description}
        </p>
      </div>

      <AdPlaceholder slotId={`category-${cat.id}-top`} format="horizontal" />

      {/* Tools Listing */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Available {cat.name} Tools ({tools.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <Link
              key={tool.id}
              href={`/calculators/${tool.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 mb-4 group-hover:scale-105 transition-transform">
                  <Calculator className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {tool.shortDesc}
                </p>
              </div>
              <div className="mt-5 flex items-center text-xs font-semibold text-emerald-600">
                <span>Launch Calculator</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-xl bg-gray-50 p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-900 text-sm">Need a different tool in this category?</h3>
        <p className="text-xs text-gray-500 mt-1">
          We actively build new Indian calculators. Suggest an addition or state-specific calculation on our{' '}
          <Link href="/contact" className="text-emerald-700 font-medium hover:underline">
            Contact Page
          </Link>.
        </p>
      </div>
    </div>
  );
}
