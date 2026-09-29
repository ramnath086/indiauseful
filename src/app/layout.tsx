import { SITE_URL } from '@/lib/siteConfig';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'IndiaUseful - Free Online Calculators & Financial Tools for India',
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
    title: 'IndiaUseful - Free Financial & Utility Tools for India',
    description: 'Accurate, instant calculators for Loans, Investments, Salary, Gold, and Everyday Math.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IndiaUseful - Free Financial & Utility Tools for India',
    description: 'Accurate, instant calculators for Loans, Investments, Salary, Gold, and Everyday Math.'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-gray-900 antialiased font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
