import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'About Us',
  description: 'Learn about IndiaUseful, an independent collection of free, privacy-conscious calculators and everyday tools designed for people in India.',
  path: '/about'
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'About Us' }]} />
      <h1 className="mt-4 text-3xl font-extrabold text-gray-900">About IndiaUseful</h1>
      <p className="mt-1 text-sm font-medium text-emerald-700">Free, practical tools for everyday calculations in India</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-700 sm:text-base">
        <p>
          <strong>IndiaUseful</strong> is an independent collection of calculators and guides for common financial, work, gold, and everyday planning questions. The tools are designed around familiar Indian units and examples, including rupees, Kerala Pavan, and common deposit and loan scenarios.
        </p>

        <h2 className="mt-6 text-xl font-bold text-gray-900">How the tools work</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>No account required:</strong> Calculators can be used without signing in or sharing a phone number.</li>
          <li><strong>Calculations run in your browser:</strong> The values entered into the calculators are used locally for the result and are not sent to IndiaUseful servers by the calculator code. See our <Link href="/privacy" className="text-emerald-700 underline">Privacy Policy</Link> for information about ordinary hosting logs and third-party services.</li>
          <li><strong>Estimates, not official advice:</strong> Results rely on displayed assumptions and may not reflect a bank, employer, jeweller, tax authority, or product provider&apos;s exact terms.</li>
          <li><strong>Focused on India:</strong> Tools cover common Indian banking, salary, GST, gold, and regional calculation scenarios.</li>
        </ul>

        <h2 className="mt-6 text-xl font-bold text-gray-900">Corrections and suggestions</h2>
        <p>
          We welcome reports of errors, accessibility issues, and requests for useful tools. Visit the <Link href="/contact" className="text-emerald-700 underline">Contact page</Link> to open a public issue. Please do not include personal, financial, or other sensitive information in an issue.
        </p>
      </div>
    </div>
  );
}
