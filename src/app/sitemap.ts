import { MetadataRoute } from 'next';
import { CALCULATORS, CATEGORIES, ARTICLES } from '@/data/calculators';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://indiauseful.com';
  const now = new Date();

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.6
  }));

  const categoryPages = CATEGORIES.map(cat => ({
    url: `${baseUrl}/category/${cat.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }));

  const calculatorPages = CALCULATORS.map(calc => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }));

  const articlePages = ARTICLES.map(art => ({
    url: `${baseUrl}/articles/${art.slug}`,
    lastModified: new Date(art.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  return [...staticPages, ...categoryPages, ...calculatorPages, ...articlePages];
}
