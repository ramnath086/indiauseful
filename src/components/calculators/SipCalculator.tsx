'use client';

import React, { useState } from 'react';
import { formatIndianCurrency } from '@/lib/formatters';

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [expectedRate, setExpectedRate] = useState<number>(12);
  const [tenureYears, setTenureYears] = useState<number>(15);

  // SIP formula: M = P * [ (1+i)^n - 1 ] * (1+i) / i
  const i = expectedRate / (12 * 100);
  const n = tenureYears * 12;
  const investedAmount = monthlyInvestment * n;

  let futureValue = 0;
  if (i > 0 && n > 0 && monthlyInvestment > 0) {
    futureValue = Math.round(monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  } else {
    futureValue = investedAmount;
  }

  const wealthGained = Math.max(0, futureValue - investedAmount);
  const investedPercent = futureValue > 0 ? Math.round((investedAmount / futureValue) * 100) : 0;
  const wealthPercent = 100 - investedPercent;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">Monthly Investment Amount</label>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-1 font-mono">₹</span>
              <input
                type="number"
                aria-label="Monthly investment amount"
                min="500"
                max="500000"
                step="500"
                value={monthlyInvestment}
                onChange={e => setMonthlyInvestment(Number(e.target.value))}
                className="w-28 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          <input
            type="range"
            aria-label="Monthly investment slider"
            min="500"
            max="100000"
            step="500"
            value={monthlyInvestment}
            onChange={e => setMonthlyInvestment(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>₹500</span>
            <span>₹50,000</span>
            <span>₹1,00,000</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">Expected Annual Return Rate (CAGR)</label>
            <div className="flex items-center">
              <input
                type="number"
                aria-label="Expected annual return rate"
                min="1"
                max="30"
                step="0.5"
                value={expectedRate}
                onChange={e => setExpectedRate(Number(e.target.value))}
                className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
              <span className="text-xs text-gray-500 ml-1">%</span>
            </div>
          </div>
          <input
            type="range"
            aria-label="Expected return rate slider"
            min="1"
            max="25"
            step="0.5"
            value={expectedRate}
            onChange={e => setExpectedRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>6% (Conservative)</span>
            <span>12% (Nifty Index)</span>
            <span>15%+ (Mid/Small Cap)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">Time Period (Years)</label>
            <div className="flex items-center">
              <input
                type="number"
                aria-label="Investment tenure in years"
                min="1"
                max="40"
                step="1"
                value={tenureYears}
                onChange={e => setTenureYears(Number(e.target.value))}
                className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
              <span className="text-xs text-gray-500 ml-1">Years</span>
            </div>
          </div>
          <input
            type="range"
            aria-label="Investment tenure slider"
            min="1"
            max="35"
            step="1"
            value={tenureYears}
            onChange={e => setTenureYears(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>1 Year</span>
            <span>15 Years</span>
            <span>35 Years</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-xs space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Expected Total Wealth Corpus
          </p>
          <div className="mt-1 text-3xl sm:text-4xl font-black text-emerald-700">
            {formatIndianCurrency(futureValue)}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            after {tenureYears} years ({tenureYears * 12} installments)
          </p>
        </div>

        <div className="space-y-3 border-t border-emerald-100/70 pt-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Invested Amount:</span>
            <span className="font-semibold text-gray-900">{formatIndianCurrency(investedAmount)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Estimated Capital Gains:</span>
            <span className="font-semibold text-emerald-600">+{formatIndianCurrency(wealthGained)}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-400"></span> Principal ({investedPercent}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600"></span> Gain ({wealthPercent}%)
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden flex">
            <div style={{ width: `${investedPercent}%` }} className="bg-gray-400 h-full"></div>
            <div style={{ width: `${wealthPercent}%` }} className="bg-emerald-600 h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
