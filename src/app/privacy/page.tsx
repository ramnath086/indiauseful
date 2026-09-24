import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'IndiaUseful Privacy Policy - Strict client-side computing and Google AdSense compliance.',
  alternates: {
    canonical: 'https://indiauseful.com/privacy'
  }
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 text-gray-800">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      <h1 className="text-3xl font-extrabold text-gray-900 mt-4">Privacy Policy</h1>
      <p className="text-gray-400 text-xs mt-1">Last updated: September 2026</p>

      <div className="mt-8 space-y-6 leading-relaxed text-sm sm:text-base">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. Client-Side Financial Calculations</h2>
          <p>
            At <strong>IndiaUseful</strong> (indiauseful.com), your financial privacy is paramount. All calculator inputs—including your loan amount, interest rate, salary, gold grams, and date of birth—are processed strictly in your web browser (client-side) using JavaScript. <strong>We do not transmit, log, or store your calculator inputs on any server or database.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. Google AdSense & Third-Party Cookies</h2>
          <p>
            We may use third-party advertising companies such as Google AdSense to serve ads when you visit our website. These companies may use cookies, web beacons, and similar tracking technologies to serve ads based on your prior visits to this website or other websites on the Internet:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2 text-sm">
            <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-emerald-600 underline">Google Ads Settings</a>.</li>
            <li>Alternatively, you can opt out of third-party vendor use of cookies by visiting <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-emerald-600 underline">aboutads.info</a>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Server Logs and Analytics</h2>
          <p>
            Like standard web hosts and Cloudflare CDN edges, standard technical web logs (such as IP address, browser type, referring pages, and access timestamps) may be recorded temporarily for security monitoring, DDoS mitigation, and site performance optimization.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. Children&apos;s Privacy</h2>
          <p>
            IndiaUseful does not knowingly collect personally identifiable information from children under the age of 13.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">5. Updates and Contact</h2>
          <p>
            If you have any questions regarding this Privacy Policy, you can email us at <a href="mailto:support@indiauseful.com" className="text-emerald-600 underline">support@indiauseful.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
