'use client';

import React, { useState } from 'react';
import { formatIndianCurrency } from '@/lib/formatters';

export default function PpfCalculator() {
  const [annualDeposit, setAnnualDeposit] = useState<number>(150000);
  const [tenureYears, setTenureYears] = useState<number>(15);
  const interestRate = 7.1; // Government gazette PPF rate

  // Yearly compounding for PPF: interest compounded annually on balances deposited before 5th of each month
  let balance = 0;
  let totalInvested = 0;
  const yearlyBreakdown: { year: number; deposited: number; interest: number; closing: number }[] = [];

  for (let y = 1; y <= tenureYears; y++) {
    totalInvested += annualDeposit;
    const interest = Math.round((balance + annualDeposit) * (interestRate / 100));
    balance = balance + annualDeposit + interest;
    yearlyBreakdown.push({
      year: y,
      deposited: totalInvested,
      interest,
      closing: balance
    });
  }

  const totalInterest = balance - totalInvested;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">Yearly Deposit (Max ₹1.5 Lakh)</label>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-1 font-mono">₹</span>
              <input
                type="number"
                min="500"
                max="150000"
                step="5000"
                value={annualDeposit}
                onChange={e => setAnnualDeposit(Math.min(150000, Number(e.target.value)))}
                className="w-28 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          <input
            type="range"
            min="500"
            max="150000"
            step="5000"
            value={annualDeposit}
            onChange={e => setAnnualDeposit(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-800 mb-2 block">
            Current Sovereign Interest Rate (Govt of India)
          </label>
          <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3 border border-gray-100">
            <span className="text-sm text-gray-600 font-medium">Ministry of Finance Mandated Rate:</span>
            <span className="font-bold text-emerald-700">{interestRate}% p.a. (Tax-Free EEE)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">PPF Tenure</label>
            <div className="flex items-center">
              <select
                value={tenureYears}
                onChange={e => setTenureYears(Number(e.target.value))}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              >
                <option value={15}>15 Years (Base Lock-in)</option>
                <option value={20}>20 Years (1 Extension block)</option>
                <option value={25}>25 Years (2 Extension blocks)</option>
                <option value={30}>30 Years (3 Extension blocks)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-xs space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            100% Tax-Free Maturity Corpus
          </p>
          <div className="mt-1 text-3xl sm:text-4xl font-black text-gray-900">
            {formatIndianCurrency(balance)}
          </div>
          <p className="text-xs text-emerald-700 font-medium mt-1">
            ✓ EEE Status: Principal, Interest & Maturity are 100% Tax-Free
          </p>
        </div>

        <div className="space-y-3 border-t border-emerald-100/70 pt-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Invested:</span>
            <span className="font-semibold text-gray-900">{formatIndianCurrency(totalInvested)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Interest Accrued:</span>
            <span className="font-semibold text-emerald-600">+{formatIndianCurrency(totalInterest)}</span>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-3.5 border border-gray-100 text-xs text-gray-500 leading-relaxed">
          📌 <strong>Pro Tip:</strong> Deposit your PPF contribution between the 1st and 5th of each month. Interest is calculated on the lowest balance between the 5th and the last day of the month!
        </div>
      </div>
    </div>
  );
}
