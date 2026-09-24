import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/calculators';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50 text-gray-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand & mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 font-bold text-white">
                IU
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                India<span className="text-emerald-600">Useful</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-sm">
              IndiaUseful provides fast, 100% free, browser-calculated utilities tailored for Indian citizens, salaried employees, taxpayers, NRI families, and Kerala communities. No signup or personal data collection required.
            </p>
            <p className="text-xs text-gray-400">
              ഭാരതീയർക്കായി ലളിതമായ കണക്കുകൂട്ടൽ സഹായികൾ. സ്വകാര്യത പൂർണ്ണമായും ഉറപ്പുനൽകുന്നു.
            </p>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Categories
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {CATEGORIES.map(c => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.id}`}
                    className="hover:text-emerald-600 transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Calculators */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Popular Tools
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/calculators/emi-calculator" className="hover:text-emerald-600">
                  Loan EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/sip-calculator" className="hover:text-emerald-600">
                  SIP Wealth Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/salary-calculator" className="hover:text-emerald-600">
                  In-Hand Salary
                </Link>
              </li>
              <li>
                <Link href="/calculators/gold-price-calculator" className="hover:text-emerald-600">
                  Gold Billing & GST
                </Link>
              </li>
              <li>
                <Link href="/calculators/kerala-gold-pavan-calculator" className="hover:text-emerald-600">
                  Kerala Pavan Gold
                </Link>
              </li>
              <li>
                <Link href="/calculators/gst-calculator" className="hover:text-emerald-600">
                  Indian GST Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust, Legal & Compliance */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Legal & Trust
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-emerald-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-600">
                  Financial Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 border-t border-gray-200/80 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} IndiaUseful.com. All rights reserved. Built for India with precision.</p>
          <p>
            Calculations are for informational purposes only. Consult certified financial or legal advisors for regulated transactions.
          </p>
        </div>
      </div>
    </footer>
  );
}
