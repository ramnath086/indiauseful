'use client';

import React, { useState } from 'react';
import { formatIndianCurrency } from '@/lib/formatters';

interface Props {
  defaultTenureYears?: number;
  defaultRate?: number;
  defaultAmount?: number;
  label?: string;
}

export default function GenericEmiCalculator({
  defaultTenureYears = 20,
  defaultRate = 8.5,
  defaultAmount = 3000000,
  label = 'Loan'
}: Props) {
  const [loanAmount, setLoanAmount] = useState<number>(defaultAmount);
  const [interestRate, setInterestRate] = useState<number>(defaultRate);
  const [tenureYears, setTenureYears] = useState<number>(defaultTenureYears);

  // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const principal = loanAmount > 0 ? loanAmount : 0;
  const monthlyRate = interestRate > 0 ? interestRate / (12 * 100) : 0;
  const totalMonths = tenureYears > 0 ? tenureYears * 12 : 1;

  let emi = 0;
  let totalInterest = 0;
  let totalPayment = 0;

  if (principal > 0 && monthlyRate > 0 && totalMonths > 0) {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    emi = Math.round((principal * monthlyRate * factor) / (factor - 1));
    totalPayment = emi * totalMonths;
    totalInterest = totalPayment - principal;
  } else if (principal > 0 && monthlyRate === 0) {
    emi = Math.round(principal / totalMonths);
    totalPayment = principal;
    totalInterest = 0;
  }

  const principalPercent = totalPayment > 0 ? Math.round((principal / totalPayment) * 100) : 0;
  const interestPercent = 100 - principalPercent;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Inputs */}
      <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">{label} Amount</label>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-1 font-mono">₹</span>
              <input
                type="number"
                aria-label={`${label} amount`}
                min="10000"
                max="100000000"
                step="10000"
                value={loanAmount}
                onChange={e => setLoanAmount(Number(e.target.value))}
                className="w-32 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          <input
            type="range"
            aria-label={`${label} amount slider`}
            min="50000"
            max="15000000"
            step="25000"
            value={loanAmount}
            onChange={e => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>₹50,000</span>
            <span>₹50 Lakh</span>
            <span>₹1.5 Crore</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">Interest Rate (% p.a.)</label>
            <div className="flex items-center">
              <input
                type="number"
                aria-label="Interest rate annual percentage"
                min="1"
                max="36"
                step="0.1"
                value={interestRate}
                onChange={e => setInterestRate(Number(e.target.value))}
                className="w-24 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
              <span className="text-xs text-gray-500 ml-1">%</span>
            </div>
          </div>
          <input
            type="range"
            aria-label="Interest rate slider"
            min="6"
            max="24"
            step="0.1"
            value={interestRate}
            onChange={e => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>6%</span>
            <span>12%</span>
            <span>24%</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">Tenure (Years)</label>
            <div className="flex items-center">
              <input
                type="number"
                aria-label="Loan tenure in years"
                min="1"
                max="35"
                step="1"
                value={tenureYears}
                onChange={e => setTenureYears(Number(e.target.value))}
                className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
              <span className="text-xs text-gray-500 ml-1">Yrs ({tenureYears * 12} Mos)</span>
            </div>
          </div>
          <input
            type="range"
            aria-label="Loan tenure slider"
            min="1"
            max="30"
            step="1"
            value={tenureYears}
            onChange={e => setTenureYears(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>1 Yr</span>
            <span>15 Yrs</span>
            <span>30 Yrs</span>
          </div>
        </div>
      </div>

      {/* Results Display */}
      <div className="lg:col-span-5 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-xs space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Monthly Loan EMI
          </p>
          <div className="mt-1 text-3xl sm:text-4xl font-black text-gray-900">
            {formatIndianCurrency(emi)}
          </div>
          <p className="text-xs text-gray-500 mt-1">per month for {tenureYears * 12} months</p>
        </div>

        <div className="space-y-3 border-t border-emerald-100/70 pt-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Principal Amount:</span>
            <span className="font-semibold text-gray-900">{formatIndianCurrency(principal)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Interest Payable:</span>
            <span className="font-semibold text-amber-600">{formatIndianCurrency(totalInterest)}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-bold border-t border-dashed border-gray-200 pt-2">
            <span className="text-gray-800">Total Payment (P + I):</span>
            <span className="text-emerald-700">{formatIndianCurrency(totalPayment)}</span>
          </div>
        </div>

        {/* Visual Ratio Bar */}
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600"></span> Principal ({principalPercent}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span> Interest ({interestPercent}%)
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden flex">
            <div style={{ width: `${principalPercent}%` }} className="bg-emerald-600 h-full"></div>
            <div style={{ width: `${interestPercent}%` }} className="bg-amber-500 h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
