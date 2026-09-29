import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/siteConfig';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url,
      siteName: 'IndiaUseful',
      title,
      description
    },
    twitter: {
      card: 'summary',
      title,
      description
    }
  };
}
