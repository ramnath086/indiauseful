'use client';

import React, { useState } from 'react';
import { formatIndianCurrency } from '@/lib/formatters';

export default function GratuityCalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(50000);
  const [yearsOfService, setYearsOfService] = useState<number>(7);
  const [isCoveredUnderAct, setIsCoveredUnderAct] = useState<boolean>(true);

  // Payment of Gratuity Act 1972 formula:
  // Covered: (15 * Last Basic & DA * Years) / 26
  // Not Covered: (15 * Last Basic & DA * Years) / 30
  const denominator = isCoveredUnderAct ? 26 : 30;
  let gratuityAmount = 0;

  if (yearsOfService >= 5 && basicSalary > 0) {
    gratuityAmount = Math.round((15 * basicSalary * yearsOfService) / denominator);
  }

  // Statutory maximum tax-free cap in India is ₹20,00,000 (20 Lakhs)
  const taxExemptLimit = 2000000;
  const exemptGratuity = Math.min(gratuityAmount, taxExemptLimit);
  const taxableGratuity = Math.max(0, gratuityAmount - taxExemptLimit);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">
              Last Drawn Monthly Basic + Dearness Allowance (DA)
            </label>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-1 font-mono">₹</span>
              <input
                type="number"
                min="5000"
                max="2000000"
                step="1000"
                value={basicSalary}
                onChange={e => setBasicSalary(Number(e.target.value))}
                className="w-28 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          <input
            type="range"
            min="10000"
            max="300000"
            step="5000"
            value={basicSalary}
            onChange={e => setBasicSalary(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <p className="text-[11px] text-gray-400 mt-1">Excludes HRA, special allowances, bonuses, and incentives.</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">Completed Years of Service</label>
            <div className="flex items-center">
              <input
                type="number"
                min="1"
                max="45"
                value={yearsOfService}
                onChange={e => setYearsOfService(Number(e.target.value))}
                className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
              <span className="text-xs text-gray-500 ml-1">Years</span>
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="40"
            step="1"
            value={yearsOfService}
            onChange={e => setYearsOfService(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          {yearsOfService < 5 && (
            <p className="text-xs text-amber-600 font-medium mt-1">
              ⚠️ Minimum 5 years continuous service required to qualify for statutory gratuity (except in death/disablement).
            </p>
          )}
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-2">Organization Coverage</label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="actCoverage"
                checked={isCoveredUnderAct}
                onChange={() => setIsCoveredUnderAct(true)}
                className="accent-emerald-600"
              />
              <span>Covered by Gratuity Act 1972 (10+ employees)</span>
            </label>
            <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="actCoverage"
                checked={!isCoveredUnderAct}
                onChange={() => setIsCoveredUnderAct(false)}
                className="accent-emerald-600"
              />
              <span>Not Covered (&lt; 10 employees)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-xs space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Calculated Gratuity Payout
          </p>
          <div className="mt-1 text-3xl sm:text-4xl font-black text-gray-900">
            {formatIndianCurrency(gratuityAmount)}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Formula: (15 × {formatIndianCurrency(basicSalary)} × {yearsOfService}) / {denominator}
          </p>
        </div>

        <div className="space-y-2 border-t border-emerald-100/70 pt-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax-Free Exemption (Max ₹20 Lakh):</span>
            <span className="font-semibold text-emerald-600">{formatIndianCurrency(exemptGratuity)}</span>
          </div>
          {taxableGratuity > 0 && (
            <div className="flex justify-between items-center text-amber-700 font-medium">
              <span>Taxable Portion:</span>
              <span>{formatIndianCurrency(taxableGratuity)}</span>
            </div>
          )}
        </div>

        <div className="rounded-xl bg-gray-50 p-3.5 border border-gray-100 text-xs text-gray-500 leading-relaxed">
          💼 <strong>Rounding of months rule:</strong> If you served 7 years and 7 months, it rounds up to 8 years under the Gratuity Act!
        </div>
      </div>
    </div>
  );
}
