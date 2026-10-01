import { SITE_URL } from '@/lib/siteConfig';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ogImageUrl = `${SITE_URL}/og-image.png`;
const logoUrl = `${SITE_URL}/logo.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'IndiaUseful - Free Calculators for India',
    template: '%s | IndiaUseful'
  },
  description:
    'Free online financial, banking, salary, gold jewellery and daily utility calculators engineered for India and Kerala. 100% free, private, and mobile-friendly.',
  keywords: [
    'India calculators',
    'loan emi calculator india',
    'sip calculator',
    'salary in hand calculator',
    'gold price calculator',
    'kerala pavan rate',
    'gst calculator india',
    'ppf calculator',
    'fd calculator'
  ],
  authors: [{ name: 'IndiaUseful Team' }],
  creator: 'IndiaUseful',
  publisher: 'IndiaUseful',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'IndiaUseful',
    title: 'IndiaUseful - Free Calculators for India',
    description: 'Accurate, instant calculators for Loans, Investments, Salary, Gold, and Everyday Math.',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'IndiaUseful - Free Calculators for India'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IndiaUseful - Free Calculators for India',
    description: 'Accurate, instant calculators for Loans, Investments, Salary, Gold, and Everyday Math.',
    images: [ogImageUrl]
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/logo.png',
    apple: '/logo.png'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Organization schema for homepage
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'IndiaUseful',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
      width: 512,
      height: 512
    },
    description: 'Free online calculators and financial tools for India',
    sameAs: [
      'https://github.com/ramnath086/indiauseful'
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <link rel="preload" as="image" href={ogImageUrl} />
        <link rel="preload" as="image" href={logoUrl} />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-gray-900 antialiased font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
