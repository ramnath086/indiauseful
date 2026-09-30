import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/siteConfig';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  ogImage?: string;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  ogType = 'website',
  ogImage
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const defaultOgImage = `${SITE_URL}/og-image.png`;
  const image = ogImage || defaultOgImage;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      locale: 'en_IN',
      url,
      siteName: 'IndiaUseful',
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  };
}
