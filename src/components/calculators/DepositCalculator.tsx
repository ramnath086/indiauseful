'use client';

import React, { useState } from 'react';
import { formatIndianCurrency } from '@/lib/formatters';

interface Props {
  type: 'fd' | 'rd';
}

export default function DepositCalculator({ type }: Props) {
  const isFd = type === 'fd';
  const [depositAmount, setDepositAmount] = useState<number>(isFd ? 100000 : 5000);
  const [interestRate, setInterestRate] = useState<number>(7.1);
  const [tenureYears, setTenureYears] = useState<number>(isFd ? 5 : 3);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState<boolean>(false);

  const effectiveRate = interestRate + (isSeniorCitizen ? 0.5 : 0);
  let maturityAmount = 0;
  let totalInvested = 0;

  if (isFd) {
    // FD Quarterly Compounding: A = P * (1 + r/400)^(4*t)
    totalInvested = depositAmount;
    const nQuarter = 4;
    maturityAmount = Math.round(
      depositAmount * Math.pow(1 + effectiveRate / (100 * nQuarter), nQuarter * tenureYears)
    );
  } else {
    // RD Compound Interest quarterly formula used by Indian post offices & banks
    // M = P * sum((1 + r/400)^(4 * (monthsLeft)/12))
    const totalMonths = tenureYears * 12;
    totalInvested = depositAmount * totalMonths;
    let sum = 0;
    const r = effectiveRate / 100;
    for (let m = 1; m <= totalMonths; m++) {
      // time remaining in years
      const tRem = (totalMonths - m + 1) / 12;
      sum += depositAmount * Math.pow(1 + r / 4, 4 * tRem);
    }
    maturityAmount = Math.round(sum);
  }

  const interestEarned = Math.max(0, maturityAmount - totalInvested);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">
              {isFd ? 'Total Deposit Amount' : 'Monthly Deposit Amount'}
            </label>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-1 font-mono">₹</span>
              <input
                type="number"
                min="500"
                max={isFd ? 10000000 : 200000}
                step={isFd ? 5000 : 500}
                value={depositAmount}
                onChange={e => setDepositAmount(Number(e.target.value))}
                className="w-28 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          <input
            type="range"
            min={isFd ? 10000 : 500}
            max={isFd ? 2000000 : 50000}
            step={isFd ? 5000 : 500}
            value={depositAmount}
            onChange={e => setDepositAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">Base Annual Interest Rate (%)</label>
            <div className="flex items-center">
              <input
                type="number"
                min="3"
                max="12"
                step="0.1"
                value={interestRate}
                onChange={e => setInterestRate(Number(e.target.value))}
                className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
              <span className="text-xs text-gray-500 ml-1">%</span>
            </div>
          </div>
          <input
            type="range"
            min="3"
            max="10"
            step="0.1"
            value={interestRate}
            onChange={e => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        <div className="flex items-center gap-3 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
          <input
            type="checkbox"
            id="seniorCitizen"
            checked={isSeniorCitizen}
            onChange={e => setIsSeniorCitizen(e.target.checked)}
            className="h-4 w-4 rounded text-emerald-600 accent-emerald-600"
          />
          <label htmlFor="seniorCitizen" className="text-sm text-gray-700 cursor-pointer font-medium">
            Senior Citizen (+0.50% extra interest)
          </label>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">Deposit Tenure (Years)</label>
            <div className="flex items-center">
              <input
                type="number"
                min="1"
                max="10"
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
            min="1"
            max="10"
            step="1"
            value={tenureYears}
            onChange={e => setTenureYears(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>
      </div>

      <div className="lg:col-span-5 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-xs space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Total Maturity Value
          </p>
          <div className="mt-1 text-3xl sm:text-4xl font-black text-gray-900">
            {formatIndianCurrency(maturityAmount)}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Effective Interest: {effectiveRate.toFixed(2)}% with Indian quarterly compounding
          </p>
        </div>

        <div className="space-y-3 border-t border-emerald-100/70 pt-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Invested:</span>
            <span className="font-semibold text-gray-900">{formatIndianCurrency(totalInvested)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Interest Earned:</span>
            <span className="font-semibold text-emerald-600">+{formatIndianCurrency(interestEarned)}</span>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-3.5 border border-gray-100 text-xs text-gray-500 leading-relaxed">
          💡 <strong>TDS Note:</strong> Under Section 194A, banks deduct 10% TDS if interest exceeds ₹40,000/year (₹50,000 for senior citizens) unless Form 15G/15H is submitted.
        </div>
      </div>
    </div>
  );
}
