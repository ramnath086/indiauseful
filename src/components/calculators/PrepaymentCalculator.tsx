'use client';

import React, { useState } from 'react';
import { formatIndianCurrency } from '@/lib/formatters';

export default function PrepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(4000000);
  const [interestRate, setInterestRate] = useState<number>(8.75);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [lumpsumPrepayment, setLumpsumPrepayment] = useState<number>(200000);
  const [prepayAfterYear, setPrepayAfterYear] = useState<number>(3);

  // Normal EMI
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const factor = Math.pow(1 + monthlyRate, totalMonths);
  const normalEmi = Math.round((loanAmount * monthlyRate * factor) / (factor - 1));
  const normalTotalInterest = normalEmi * totalMonths - loanAmount;

  // Simulate month by month
  let balance = loanAmount;
  let monthsWithPrepay = 0;
  let totalInterestWithPrepay = 0;
  const prepayMonth = prepayAfterYear * 12;

  for (let m = 1; m <= totalMonths; m++) {
    if (balance <= 0) break;
    const interestForMonth = balance * monthlyRate;
    totalInterestWithPrepay += interestForMonth;
    const principalPaid = normalEmi - interestForMonth;
    balance -= principalPaid;

    if (m === prepayMonth) {
      balance -= lumpsumPrepayment;
    }

    monthsWithPrepay = m;
    if (balance <= 0) {
      balance = 0;
      break;
    }
  }

  const interestSaved = Math.max(0, Math.round(normalTotalInterest - totalInterestWithPrepay));
  const monthsSaved = Math.max(0, totalMonths - monthsWithPrepay);
  const yearsSaved = (monthsSaved / 12).toFixed(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-semibold text-gray-800">Original Loan Amount</label>
            <span className="font-bold text-gray-900">{formatIndianCurrency(loanAmount)}</span>
          </div>
          <input
            type="range"
            min="500000"
            max="15000000"
            step="50000"
            value={loanAmount}
            onChange={e => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={e => setInterestRate(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 p-2 text-sm font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Tenure (Years)</label>
            <input
              type="number"
              value={tenureYears}
              onChange={e => setTenureYears(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 p-2 text-sm font-semibold"
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 space-y-4">
          <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wide">
            Prepayment Details
          </h3>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold text-gray-800">One-time Part Payment Amount</label>
              <span className="font-bold text-emerald-700">{formatIndianCurrency(lumpsumPrepayment)}</span>
            </div>
            <input
              type="range"
              min="25000"
              max="2000000"
              step="25000"
              value={lumpsumPrepayment}
              onChange={e => setLumpsumPrepayment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Make prepayment after year
            </label>
            <select
              value={prepayAfterYear}
              onChange={e => setPrepayAfterYear(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 p-2 text-sm font-semibold"
            >
              {[1, 2, 3, 5, 7, 10].map(yr => (
                <option key={yr} value={yr}>
                  After Year {yr} ({yr * 12}th EMI)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-xs space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Total Interest Saved
          </p>
          <div className="mt-1 text-3xl sm:text-4xl font-black text-emerald-600">
            {formatIndianCurrency(interestSaved)}
          </div>
          <p className="text-xs text-gray-500 mt-1">Direct interest money kept in your pocket</p>
        </div>

        <div className="rounded-xl bg-white p-4 border border-emerald-100 shadow-2xs space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tenure Reduction:</span>
            <span className="font-bold text-gray-900">{yearsSaved} Years earlier ({monthsSaved} months)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">New Loan Payoff Time:</span>
            <span className="font-semibold text-emerald-700">{(monthsWithPrepay / 12).toFixed(1)} Years</span>
          </div>
          <div className="flex justify-between text-sm border-t border-dashed border-gray-200 pt-2">
            <span className="text-gray-600">Monthly EMI (Unchanged):</span>
            <span className="font-bold text-gray-900">{formatIndianCurrency(normalEmi)}</span>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-3.5 border border-gray-100 text-xs text-gray-500 leading-relaxed">
          ⚡ <strong>RBI Regulation:</strong> Under RBI mandates, individual floating-rate home loans cannot be charged any prepayment penalties or foreclosure charges by banks!
        </div>
      </div>
    </div>
  );
}
