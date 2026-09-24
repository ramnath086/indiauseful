import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for using IndiaUseful calculators and content.',
  alternates: {
    canonical: 'https://indiauseful.com/terms'
  }
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 text-gray-800">
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
      <h1 className="text-3xl font-extrabold text-gray-900 mt-4">Terms of Service</h1>
      <p className="text-gray-400 text-xs mt-1">Effective Date: September 2026</p>

      <div className="mt-8 space-y-6 leading-relaxed text-sm sm:text-base">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. Agreement to Terms</h2>
          <p>
            By accessing or using IndiaUseful (indiauseful.com), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please discontinue using the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. Nature of Utilities</h2>
          <p>
            All tools, calculators, tables, and articles provided on IndiaUseful are for personal, informational, and educational purposes only. Although we make every reasonable effort to keep mathematical formulas accurate and aligned with Indian banking practices (e.g., RBI guidelines, EPFO formulas, BIS jewellery standards), we make no warranties of any kind regarding completeness, absolute precision, or commercial fitness.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Intellectual Property</h2>
          <p>
            The software design, compilation, styling, branding, and original articles on IndiaUseful are the intellectual property of IndiaUseful. You may not scrape, frame, clone, or reproduce full site content without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. Limitation of Liability</h2>
          <p>
            Under no circumstances shall IndiaUseful, its developers, or contributors be held liable for any direct, indirect, incidental, or consequential damages resulting from financial commitments, loans signed, tax returns filed, or jewellery bought based on calculators hosted on this site.
          </p>
        </section>
      </div>
    </div>
  );
}
