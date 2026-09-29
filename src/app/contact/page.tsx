import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createPageMetadata } from '@/lib/metadata';
import { Bug, Lightbulb, ShieldCheck } from 'lucide-react';

export const metadata = createPageMetadata({
  title: 'Contact Us',
  description: 'Contact IndiaUseful with feedback, calculator requests, corrections, or bug reports.',
  path: '/contact'
});

const issuesUrl = 'https://github.com/ramnath086/indiauseful/issues/new';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />
      <h1 className="mt-4 text-3xl font-extrabold text-gray-900">Contact IndiaUseful</h1>
      <p className="mt-1 text-sm text-gray-600">Share feedback, request a calculator, or report a correction through our public issue tracker.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <section className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-5">
          <Bug aria-hidden="true" className="mb-3 h-5 w-5 text-emerald-700" />
          <h2 className="text-sm font-semibold text-gray-900">Report a bug or correction</h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">Include the calculator name and a description of the issue. Please do not post account numbers, salary details, or other sensitive personal information.</p>
          <Link href={issuesUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
            Open a GitHub issue
          </Link>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5">
          <Lightbulb aria-hidden="true" className="mb-3 h-5 w-5 text-blue-700" />
          <h2 className="text-sm font-semibold text-gray-900">Suggest a tool</h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">Describe the calculation you need and any public rules or references that could help. Requests are reviewed as time allows; we cannot promise a response time or implementation.</p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5 md:col-span-2">
          <ShieldCheck aria-hidden="true" className="mb-3 h-5 w-5 text-teal-700" />
          <h2 className="text-sm font-semibold text-gray-900">Advertising and privacy</h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">No advertising scripts or live ads are currently displayed. The labeled spaces on some pages are empty layout placeholders only. If this changes, we will update the Privacy Policy.</p>
          <p className="mt-2 text-sm text-gray-600">For details, see our <Link href="/privacy" className="text-emerald-700 underline">Privacy Policy</Link> and <Link href="/disclaimer" className="text-emerald-700 underline">Financial Disclaimer</Link>.</p>
        </section>
      </div>
    </div>
  );
}
