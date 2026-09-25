import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Mail, MessageSquare, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the IndiaUseful team for feedback, calculator requests, or bug reports.',
  alternates: {
    canonical: 'https://indiauseful.com/contact'
  }
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />
      <h1 className="text-3xl font-extrabold text-gray-900 mt-4">Contact IndiaUseful</h1>
      <p className="text-gray-500 text-sm mt-1">We welcome your suggestions, feedback, and calculator requests.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-start space-x-3 rounded-xl border border-gray-100 bg-emerald-50/50 p-4">
            <Mail className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Direct Online Inquiries</h3>
              <p className="text-xs text-gray-600 mt-0.5">For general queries, bug reports, and formula corrections:</p>
              <p className="text-sm font-semibold text-emerald-800 mt-1">
                Please submit the contact form or open an issue on our GitHub repository.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Feedback & New Tools</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Need a specific Indian state tax calculator, post office scheme, or Kerala utility? Email us your idea and we usually implement valid formulas within 48 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <ShieldCheck className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Ad Disclosure & Partnerships</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                We believe in ethical, non-intrusive banner ads that do not disrupt calculations or harvest user financial data.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Send a Quick Note</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Message / Suggestion</label>
              <textarea
                rows={4}
                required
                placeholder="What can we improve or add for you?"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors"
            >
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
