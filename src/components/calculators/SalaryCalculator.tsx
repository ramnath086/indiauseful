'use client';

import React, { useState } from 'react';
import { formatIndianCurrency } from '@/lib/formatters';

interface Props {
  mode?: 'simple' | 'detailed';
}

export default function SalaryCalculator({ mode = 'simple' }: Props) {
  const isDetailed = mode === 'detailed';
  const [ctcAnnual, setCtcAnnual] = useState<number>(900000);
  const [bonusAnnual, setBonusAnnual] = useState<number>(50000);
  const [monthlyProfTax, setMonthlyProfTax] = useState<number>(200);

  // Typical Indian IT / Corporate Salary Breakup heuristic:
  // Gross = CTC - Employer PF - Gratuity Reserve - Variable Bonus
  const basicAnnual = Math.round(ctcAnnual * 0.40); // 40% basic
  const employerPfMonthly = Math.min(1800, Math.round((basicAnnual / 12) * 0.12));
  const employeePfMonthly = employerPfMonthly;
  const gratuityMonthlyReserve = Math.round((basicAnnual / 12) * 0.0481);

  const monthlyGross = Math.round((ctcAnnual - bonusAnnual) / 12) - employerPfMonthly - gratuityMonthlyReserve;
  const monthlyDeductions = employeePfMonthly + monthlyProfTax;
  const monthlyInHand = Math.max(0, monthlyGross - monthlyDeductions);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-6">
        {isDetailed && (
          <div className="rounded-xl bg-blue-50 p-3 border border-blue-200 text-xs text-blue-900 font-medium">
            📋 <strong>Full CTC Breakdown View:</strong> Line-item calculation of employee vs employer statutory liabilities.
          </div>
        )}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">Annual Gross CTC (Cost to Company)</label>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-1 font-mono">₹</span>
              <input
                type="number"
                min="100000"
                max="100000000"
                step="50000"
                value={ctcAnnual}
                onChange={e => setCtcAnnual(Number(e.target.value))}
                className="w-32 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          <input
            type="range"
            min="200000"
            max="4000000"
            step="25000"
            value={ctcAnnual}
            onChange={e => setCtcAnnual(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>₹3 Lakhs</span>
            <span>₹15 Lakhs</span>
            <span>₹40 Lakhs</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">Annual Variable / Performance Bonus</label>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-1 font-mono">₹</span>
              <input
                type="number"
                min="0"
                max="2000000"
                step="10000"
                value={bonusAnnual}
                onChange={e => setBonusAnnual(Number(e.target.value))}
                className="w-28 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="500000"
            step="10000"
            value={bonusAnnual}
            onChange={e => setBonusAnnual(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">Monthly Professional Tax (PT)</label>
            <div className="flex items-center">
              <select
                value={monthlyProfTax}
                onChange={e => setMonthlyProfTax(Number(e.target.value))}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              >
                <option value={200}>₹200 / month (Standard: Kerala, Karnataka, MH)</option>
                <option value={150}>₹150 / month</option>
                <option value={0}>₹0 (States with no PT / Delhi)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-xs space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Estimated Monthly In-Hand (Take-Home) Pay
          </p>
          <div className="mt-1 text-3xl sm:text-4xl font-black text-emerald-700">
            {formatIndianCurrency(monthlyInHand)}
          </div>
          <p className="text-xs text-gray-500 mt-1">Direct monthly bank credit (Pre-Income Tax TDS)</p>
        </div>

        <div className="space-y-2 border-t border-emerald-100/70 pt-4 text-xs sm:text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Monthly Gross Salary:</span>
            <span className="font-semibold text-gray-900">{formatIndianCurrency(monthlyGross)}</span>
          </div>
          <div className="flex justify-between items-center text-red-600">
            <span>Employee EPF (12%):</span>
            <span>-{formatIndianCurrency(employeePfMonthly)}</span>
          </div>
          <div className="flex justify-between items-center text-red-600">
            <span>Professional Tax:</span>
            <span>-{formatIndianCurrency(monthlyProfTax)}</span>
          </div>
          <div className="flex justify-between items-center text-gray-400 border-t border-dashed border-gray-200 pt-2 text-xs">
            <span>Employer PF & Gratuity (Included in CTC):</span>
            <span>{formatIndianCurrency(employerPfMonthly + gratuityMonthlyReserve)} /mo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
