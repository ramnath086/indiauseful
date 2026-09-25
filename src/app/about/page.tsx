import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about IndiaUseful - high-speed, private, free financial and daily utility calculators for India.',
  alternates: {
    canonical: 'https://indiauseful.com/about'
  }
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'About Us' }]} />
      <h1 className="text-3xl font-extrabold text-gray-900 mt-4">About IndiaUseful</h1>
      <p className="text-emerald-700 font-medium text-sm mt-1">Free, Private & Indian-Centric Utilities</p>

      <div className="mt-8 space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
        <p>
          <strong>IndiaUseful</strong> was founded with a single mission: to provide Indian citizens, salaried professionals, retirees, and NRI families with clean, fast, completely free financial and daily calculation tools.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-6">Why We Built IndiaUseful</h2>
        <p>
          Most financial websites in India are cluttered with aggressive popups, mandatory phone number captures, intrusive OTPs, and affiliate lead traps. Finding an honest, instant EMI or SIP calculator shouldn&apos;t require giving away your personal contact details to telemarketers.
        </p>
        <p>
          At IndiaUseful:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>No Login / No Sign Up:</strong> You can use every single calculator without creating an account.</li>
          <li><strong>100% Client-Side Privacy:</strong> Your financial numbers, loan amounts, and salaries are calculated instantly in your browser and never saved on our servers.</li>
          <li><strong>Engineered for India & Kerala:</strong> We incorporate Indian banking norms (reducing balance interest, quarterly FD compounding, Section 80C rules, BIS 916 gold making charges, and Kerala sovereign / Pavan units).</li>
          <li><strong>Mobile First & Fast:</strong> Optimized to load in under a second even on modest mobile 4G networks across India.</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-6">Bilingual Malayalam & English Vision</h2>
        <p>
          With deep roots in South India and Kerala, IndiaUseful is architected to bring local convenience—such as gold pavan and sovereign calculations, hallmark guidelines, and Malayalam subtitles—with an English-first and Malayalam-ready framework.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-6">Contact & Suggestions</h2>
        <p>
          Have a feature request or noticed a formula nuance you want us to incorporate? We value community feedback. Please visit our <a href="/contact" className="text-emerald-600 underline">Contact Page</a> to reach our team.
        </p>
      </div>
    </div>
  );
}
