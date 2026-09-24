'use client';

import React, { useState } from 'react';
import { formatIndianCurrency } from '@/lib/formatters';

interface Props {
  type: 'percentage' | 'age' | 'date-difference' | 'discount' | 'bmi';
}

export default function GenericUtilityCalculator({ type }: Props) {
  // Percentage State
  const [percNum1, setPercNum1] = useState<number>(25);
  const [percNum2, setPercNum2] = useState<number>(200);

  // Age State
  const [dob, setDob] = useState<string>('1998-05-15');

  // Date Diff State
  const [startDate, setStartDate] = useState<string>('2026-01-01');
  const [endDate, setEndDate] = useState<string>('2026-12-31');

  // Discount State
  const [originalPrice, setOriginalPrice] = useState<number>(2499);
  const [discountPercent, setDiscountPercent] = useState<number>(30);

  // BMI State
  const [heightCm, setHeightCm] = useState<number>(172);
  const [weightKg, setWeightKg] = useState<number>(68);

  if (type === 'percentage') {
    const isOf = (percNum1 / 100) * percNum2;
    const whatPercent = percNum2 !== 0 ? ((percNum1 / percNum2) * 100).toFixed(2) : 0;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">Calculate Percentage Value</h3>
          <p className="text-xs text-gray-500">What is X% of Y?</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">What is</span>
            <input
              type="number"
              aria-label="Percentage value"
              value={percNum1}
              onChange={e => setPercNum1(Number(e.target.value))}
              className="w-20 rounded border border-gray-200 p-1.5 text-center font-bold"
            />
            <span className="text-sm font-semibold">% of</span>
            <input
              type="number"
              aria-label="Base value"
              value={percNum2}
              onChange={e => setPercNum2(Number(e.target.value))}
              className="w-24 rounded border border-gray-200 p-1.5 text-center font-bold"
            />
            <span className="text-sm font-semibold">?</span>
          </div>
          <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-center">
            <span className="text-xs text-emerald-800 uppercase font-semibold">Answer</span>
            <div className="text-3xl font-black text-emerald-700 mt-1">{isOf}</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">Find Ratio Percentage</h3>
          <p className="text-xs text-gray-500">X is what percentage of Y? (e.g. Exam marks)</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              aria-label="Score obtained"
              value={percNum1}
              onChange={e => setPercNum1(Number(e.target.value))}
              className="w-20 rounded border border-gray-200 p-1.5 text-center font-bold"
            />
            <span className="text-sm font-semibold">out of</span>
            <input
              type="number"
              aria-label="Total maximum score"
              value={percNum2}
              onChange={e => setPercNum2(Number(e.target.value))}
              className="w-24 rounded border border-gray-200 p-1.5 text-center font-bold"
            />
          </div>
          <div className="mt-4 rounded-xl bg-blue-50 p-4 text-center">
            <span className="text-xs text-blue-800 uppercase font-semibold">Percentage Score</span>
            <div className="text-3xl font-black text-blue-700 mt-1">{whatPercent}%</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'age') {
    const birth = new Date(dob);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
          <label className="text-sm font-semibold text-gray-800 block">Select Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            className="w-full rounded-xl border border-gray-200 p-3 text-sm font-semibold focus:border-emerald-500 focus:outline-none"
          />
          <p className="text-xs text-gray-500">
            Calculates exact chronological age required for Indian competitive exam forms (UPSC, SSC, IBPS, KPSC).
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-xs space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Exact Age as of Today
          </p>
          <div className="text-3xl sm:text-4xl font-black text-gray-900">
            {years} <span className="text-lg font-normal text-gray-500">Yrs</span> {months}{' '}
            <span className="text-lg font-normal text-gray-500">Mos</span> {days}{' '}
            <span className="text-lg font-normal text-gray-500">Days</span>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-emerald-100 pt-3 text-xs">
            <div className="bg-white p-3 rounded-lg border border-emerald-100">
              <span className="text-gray-500 block">Total Weeks</span>
              <span className="font-bold text-gray-900 text-sm">{totalWeeks.toLocaleString()} weeks</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-emerald-100">
              <span className="text-gray-500 block">Total Days Lived</span>
              <span className="font-bold text-gray-900 text-sm">{totalDays.toLocaleString()} days</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'date-difference') {
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remainderDays = totalDays % 7;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-2.5 text-sm font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-2.5 text-sm font-semibold"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-xs space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Total Calendar Difference
          </p>
          <div className="text-3xl sm:text-4xl font-black text-gray-900">
            {totalDays} <span className="text-lg font-normal text-gray-500">Days</span>
          </div>
          <p className="text-sm font-medium text-emerald-800">
            Equivalent to: {weeks} weeks and {remainderDays} days
          </p>
        </div>
      </div>
    );
  }

  if (type === 'discount') {
    const discountAmount = Math.round((originalPrice * discountPercent) / 100);
    const finalPrice = Math.max(0, originalPrice - discountAmount);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-800 block mb-1">Original Price (MRP)</label>
            <div className="flex items-center">
              <span className="text-sm mr-1 font-mono">₹</span>
              <input
                type="number"
                value={originalPrice}
                onChange={e => setOriginalPrice(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 p-2 text-sm font-semibold"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold text-gray-800">Discount Offered (%)</label>
              <span className="font-bold text-emerald-700">{discountPercent}% OFF</span>
            </div>
            <input
              type="range"
              min="1"
              max="95"
              value={discountPercent}
              onChange={e => setDiscountPercent(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-xs space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Final Deal Price to Pay
          </p>
          <div className="text-3xl sm:text-4xl font-black text-gray-900">
            {formatIndianCurrency(finalPrice)}
          </div>
          <div className="rounded-lg bg-emerald-100/70 p-3 text-emerald-900 font-semibold text-sm">
            🎉 You save {formatIndianCurrency(discountAmount)} ({discountPercent}% discount)
          </div>
        </div>
      </div>
    );
  }

  // BMI
  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? (weightKg / (heightM * heightM)).toFixed(1) : '0';
  const numericBmi = parseFloat(bmi);

  let category = 'Normal';
  let badgeColor = 'bg-emerald-100 text-emerald-800';
  // Asian Indian cutoffs: Underweight < 18.5, Normal 18.5-22.9, Overweight 23-24.9, Obese >= 25
  if (numericBmi < 18.5) {
    category = 'Underweight (< 18.5)';
    badgeColor = 'bg-blue-100 text-blue-800';
  } else if (numericBmi <= 22.9) {
    category = 'Healthy / Normal (18.5 - 22.9 Asian Cutoff)';
    badgeColor = 'bg-emerald-100 text-emerald-800';
  } else if (numericBmi <= 24.9) {
    category = 'Overweight (23.0 - 24.9 Asian Cutoff)';
    badgeColor = 'bg-amber-100 text-amber-800';
  } else {
    category = 'Obese (≥ 25 Asian Cutoff)';
    badgeColor = 'bg-red-100 text-red-800';
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-5">
        <div>
          <label className="text-sm font-semibold text-gray-800 block mb-1">Height (cm)</label>
          <input
            type="number"
            min="90"
            max="250"
            value={heightCm}
            onChange={e => setHeightCm(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-200 p-2 text-sm font-semibold"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-800 block mb-1">Weight (kg)</label>
          <input
            type="number"
            min="20"
            max="250"
            value={weightKg}
            onChange={e => setWeightKg(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-200 p-2 text-sm font-semibold"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-xs space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
          Your Body Mass Index (BMI)
        </p>
        <div className="text-4xl font-black text-gray-900">{bmi} <span className="text-sm font-normal text-gray-500">kg/m²</span></div>
        <div className={`inline-block rounded-lg px-3 py-1.5 text-xs font-bold ${badgeColor}`}>
          Classification: {category}
        </div>
        <p className="text-xs text-gray-500">
          Note: This calculator uses Consensus Guidelines for Asian Indians (ICMR/WHO), which define normal BMI between 18.5 and 22.9 to account for higher body fat percentages.
        </p>
      </div>
    </div>
  );
}
