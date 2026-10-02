'use client';

import React, { useState } from 'react';
import { formatIndianCurrency } from '@/lib/formatters';

export default function NpsCalculator() {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(10);
  const [annuitySharePercent, setAnnuitySharePercent] = useState<number>(40);
  const annuityReturnRate = 6;

  const retirementAge = 60;
  const investmentYears = Math.max(1, retirementAge - currentAge);
  const totalMonths = investmentYears * 12;

  // Future value compounding
  const r = expectedReturn / (12 * 100);
  let totalCorpus = 0;
  const totalInvested = monthlyContribution * totalMonths;

  if (r > 0) {
    totalCorpus = Math.round(monthlyContribution * ((Math.pow(1 + r, totalMonths) - 1) / r) * (1 + r));
  } else {
    totalCorpus = totalInvested;
  }

  const annuityAmount = Math.round((totalCorpus * annuitySharePercent) / 100);
  const lumpsumAmount = totalCorpus - annuityAmount;

  // Monthly pension from annuity
  const monthlyPension = Math.round((annuityAmount * (annuityReturnRate / 100)) / 12);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">Your Current Age</label>
            <div className="flex items-center">
              <input aria-label="Current age in years"
                type="number"
                min="18"
                max="59"
                value={currentAge}
                onChange={e => setCurrentAge(Number(e.target.value))}
                className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
              <span className="text-xs text-gray-500 ml-1">Yrs</span>
            </div>
          </div>
          <input aria-label="Current age slider"
            type="range"
            min="18"
            max="55"
            value={currentAge}
            onChange={e => setCurrentAge(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <p className="text-[11px] text-gray-400 mt-1">Investing for {investmentYears} years until age 60.</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">Monthly Contribution</label>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-1 font-mono">₹</span>
              <input aria-label="Monthly NPS contribution in rupees"
                type="number"
                min="500"
                max="150000"
                step="500"
                value={monthlyContribution}
                onChange={e => setMonthlyContribution(Number(e.target.value))}
                className="w-28 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          <input aria-label="Monthly contribution slider"
            type="range"
            min="1000"
            max="50000"
            step="500"
            value={monthlyContribution}
            onChange={e => setMonthlyContribution(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Expected Return (CAGR %)</label>
            <input aria-label="Expected annual return rate in percent"
              type="number"
              min="5"
              max="16"
              step="0.5"
              value={expectedReturn}
              onChange={e => setExpectedReturn(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 p-2 text-sm font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Annuity Allocation (Modelled %)</label>
            <input aria-label="Annuity share in percent"
              type="number"
              min="40"
              max="100"
              step="5"
              value={annuitySharePercent}
              onChange={e => setAnnuitySharePercent(Math.max(40, Number(e.target.value)))}
              className="w-full rounded-lg border border-gray-200 p-2 text-sm font-semibold"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-xs space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Total Retirement Corpus at 60
          </p>
          <div className="mt-1 text-3xl font-black text-gray-900">
            {formatIndianCurrency(totalCorpus)}
          </div>
        </div>

        <div className="rounded-xl bg-emerald-100/60 p-4 border border-emerald-200">
          <p className="text-xs font-semibold text-emerald-900 uppercase">Estimated Monthly Pension</p>
          <div className="text-2xl font-black text-emerald-800 mt-1">
            {formatIndianCurrency(monthlyPension)} / month
          </div>
          <p className="text-[11px] text-emerald-700 mt-0.5">Illustration using a fixed 6% annual annuity payout assumption</p>
        </div>

        <div className="space-y-2 border-t border-emerald-100 pt-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Illustrative lump-sum portion ({100 - annuitySharePercent}%):</span>
            <span className="font-semibold text-gray-900">{formatIndianCurrency(lumpsumAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Annuity Purchased ({annuitySharePercent}%):</span>
            <span className="font-semibold text-emerald-700">{formatIndianCurrency(annuityAmount)}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Total Out-of-pocket Invested:</span>
            <span>{formatIndianCurrency(totalInvested)}</span>
          </div>
          <p className="rounded-lg bg-gray-50 p-3 text-xs leading-relaxed text-gray-600">
            Assumes contributions at the start of each month, with a fixed return until age 60 and a 6% annual annuity payout estimate. For normal-exit corpus above ₹12 lakh, current minimum annuity requirements are 20% for non-government and 40% for government subscribers; smaller-corpus exceptions and premature-exit rules differ. The 40–100% input range is a modelling constraint, not a regulatory minimum. Verify exit eligibility, tax treatment and insurer terms; this is not a guaranteed pension quote.
          </p>
        </div>
      </div>
    </div>
  );
}
