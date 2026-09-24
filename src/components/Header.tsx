'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { CALCULATORS, CATEGORIES } from '@/data/calculators';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const filtered = searchQuery.trim()
    ? CALCULATORS.filter(
        c =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 font-bold text-white shadow-sm shadow-emerald-500/20">
            IU
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-gray-900">
                India<span className="text-emerald-600">Useful</span>
              </span>
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                IN
              </span>
            </div>
            <p className="text-[11px] text-gray-400">Smart Calculators & Utilities</p>
          </div>
        </Link>

        {/* Global Search Bar (Desktop) */}
        <div className="relative hidden md:block w-72 lg:w-96">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search EMI, SIP, Gold, Salary, GST..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-2 pl-9 pr-4 text-sm text-gray-800 placeholder-gray-400 transition-colors focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Instant Search Results Dropdown */}
          {searchQuery && (
            <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
              {filtered.length > 0 ? (
                <div className="py-2">
                  <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Calculators & Tools
                  </div>
                  {filtered.map(tool => (
                    <Link
                      key={tool.id}
                      href={`/calculators/${tool.slug}`}
                      onClick={() => setSearchQuery('')}
                      className="flex items-center justify-between px-3 py-2 hover:bg-emerald-50/60"
                    >
                      <span className="text-sm font-medium text-gray-800">{tool.name}</span>
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600 capitalize">
                        {tool.category}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No matching calculator found for &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>

        {/* Categories Nav (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-gray-600">
          <Link href="/category/finance" className="hover:text-emerald-600 transition-colors">
            Finance
          </Link>
          <Link href="/category/banking" className="hover:text-emerald-600 transition-colors">
            Banking
          </Link>
          <Link href="/category/jobs" className="hover:text-emerald-600 transition-colors">
            Jobs & CTC
          </Link>
          <Link href="/category/gold" className="hover:text-emerald-600 transition-colors">
            Gold
          </Link>
          <Link href="/category/tools" className="hover:text-emerald-600 transition-colors">
            Utility Tools
          </Link>
          <Link href="/category/kerala" className="flex items-center gap-1 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors">
            <span>കേരളം</span>
          </Link>
        </nav>

        {/* Mobile Action Controls */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Toggle Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search EMI, SIP, Gold, Salary, GST..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/80 py-2 pl-9 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          {searchQuery && (
            <div className="mt-2 divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white shadow-lg">
              {filtered.map(tool => (
                <Link
                  key={tool.id}
                  href={`/calculators/${tool.slug}`}
                  onClick={() => {
                    setSearchQuery('');
                    setSearchOpen(false);
                  }}
                  className="flex items-center justify-between p-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  <span>{tool.name}</span>
                  <span className="text-xs text-gray-400 capitalize">{tool.category}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <div className="space-y-1">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <span>{cat.name}</span>
                <span className="text-xs text-gray-400">{cat.malayalamName}</span>
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-2 mt-2">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-gray-500 hover:text-gray-900"
              >
                About IndiaUseful
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-gray-500 hover:text-gray-900"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
