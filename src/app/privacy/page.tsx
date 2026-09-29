import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Privacy Policy',
  description: 'How IndiaUseful handles calculator inputs, basic hosting logs, and third-party services.',
  path: '/privacy'
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-gray-800 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      <h1 className="mt-4 text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
      <p className="mt-1 text-xs text-gray-500">Last updated: September 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed sm:text-base">
        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">1. Calculator inputs</h2>
          <p>
            Calculator inputs are processed in your browser by the calculator code and are not sent to IndiaUseful servers by those calculations. Avoid entering sensitive personal information into any website. The calculators do not require an account.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">2. Advertising and cookies</h2>
          <p>
            IndiaUseful currently does not load advertising scripts, serve live ads, or use advertising cookies. Some pages may show a clearly labeled, empty advertisement placeholder for layout purposes; it does not load an ad or set an advertising cookie. If advertising or other tracking services are introduced, this policy will be updated to explain the relevant services and choices.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">3. Hosting and technical logs</h2>
          <p>
            Our hosting provider may process ordinary request information, such as IP address, browser details, requested pages, and timestamps, for delivery, security, and reliability. The calculator code does not attach your entered values to those requests. We do not currently use a separate analytics service.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">4. External services</h2>
          <p>
            Links to external services, including GitHub for issue reports, are governed by those services&apos; own privacy practices. Review their policies before sharing information with them.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-gray-900">5. Children and policy updates</h2>
          <p>
            IndiaUseful is a general-purpose information site and is not designed to collect personal information from children. We may update this policy as the site changes; the date above indicates the latest revision.
          </p>
        </section>

        <p>
          Questions about this policy? Visit our <Link href="/contact" className="text-emerald-700 underline">Contact page</Link>.
        </p>
      </div>
    </div>
  );
}
