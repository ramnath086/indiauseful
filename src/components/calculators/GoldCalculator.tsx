'use client';

import React, { useState } from 'react';
import { formatIndianCurrency } from '@/lib/formatters';

interface Props {
  isKeralaPavan?: boolean;
}

export default function GoldCalculator({ isKeralaPavan = false }: Props) {
  const [gramWeight, setGramWeight] = useState<number>(isKeralaPavan ? 8 : 10);
  const [ratePerGram22k, setRatePerGram22k] = useState<number>(6800);
  const [purity, setPurity] = useState<'24k' | '22k' | '18k'>('22k');
  const [makingChargeType, setMakingChargeType] = useState<'percent' | 'perGram'>('percent');
  const [makingChargeValue, setMakingChargeValue] = useState<number>(12); // 12% standard Indian jeweller VA
  const [hallmarkFee] = useState<number>(45); // BIS standard fee per article

  // Effective rate per gram based on purity
  // Base input is 22K (916)
  const base24k = ratePerGram22k * (24 / 22);
  let effectiveGramRate = ratePerGram22k;
  if (purity === '24k') {
    effectiveGramRate = Math.round(base24k);
  } else if (purity === '18k') {
    effectiveGramRate = Math.round(base24k * 0.75);
  }

  const rawGoldValue = gramWeight * effectiveGramRate;

  let makingChargeAmount = 0;
  if (makingChargeType === 'percent') {
    makingChargeAmount = Math.round((rawGoldValue * makingChargeValue) / 100);
  } else {
    makingChargeAmount = Math.round(gramWeight * makingChargeValue);
  }

  const subTotalBeforeGst = rawGoldValue + makingChargeAmount + hallmarkFee;
  const gstAmount = Math.round(subTotalBeforeGst * 0.03); // Mandatory 3% GST on gold
  const totalBillAmount = subTotalBeforeGst + gstAmount;

  const pavans = (gramWeight / 8).toFixed(2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-6">
        {isKeralaPavan && (
          <div className="rounded-xl bg-amber-50 p-3.5 border border-amber-200 text-xs text-amber-900 font-medium">
            ✨ <strong>Kerala Sovereign Standard:</strong> 1 Pavan = exactly 8 grams of 22K (916) gold.
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-800 block mb-1">
              {isKeralaPavan ? 'Weight (Grams / Pavans)' : 'Gold Weight (Grams)'}
            </label>
            <div className="flex items-center">
              <input
                type="number"
                min="0.1"
                max="5000"
                step="0.1"
                value={gramWeight}
                onChange={e => setGramWeight(Math.max(0.1, Number(e.target.value)))}
                className="w-full rounded-lg border border-gray-200 p-2 text-sm font-semibold text-gray-900 focus:border-amber-500 focus:outline-none"
              />
              <span className="text-xs text-gray-500 ml-2">grams</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">= {pavans} Kerala Pavan</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800 block mb-1">
              22K Rate / Gram
            </label>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-1">₹</span>
              <input
                type="number"
                min="3000"
                max="15000"
                step="10"
                value={ratePerGram22k}
                onChange={e => setRatePerGram22k(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 p-2 text-sm font-semibold text-gray-900 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-1">1 Pavan = {formatIndianCurrency(ratePerGram22k * 8)}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-800 block mb-2">Gold Purity Hallmark</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: '22k', label: '22K (916 Hallmark)', desc: 'Bridal & Daily' },
              { id: '24k', label: '24K (999 Pure)', desc: 'Bullion / Coins' },
              { id: '18k', label: '18K (750 Purity)', desc: 'Diamond Jewellery' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPurity(item.id as '24k' | '22k' | '18k')}
                className={`rounded-xl border p-2.5 text-center transition-all ${
                  purity === item.id
                    ? 'border-amber-500 bg-amber-50/70 text-amber-900 font-semibold'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="text-xs font-bold">{item.label}</div>
                <div className="text-[10px] text-gray-400">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-semibold text-gray-800">Making Charges / Wastage (VA)</label>
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                onClick={() => setMakingChargeType('percent')}
                className={`px-2 py-0.5 rounded ${makingChargeType === 'percent' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                % Percent
              </button>
              <button
                type="button"
                onClick={() => setMakingChargeType('perGram')}
                className={`px-2 py-0.5 rounded ${makingChargeType === 'perGram' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                ₹ Per Gram
              </button>
            </div>
          </div>
          <input
            type="number"
            min="0"
            max={makingChargeType === 'percent' ? 40 : 3000}
            step={makingChargeType === 'percent' ? 0.5 : 50}
            value={makingChargeValue}
            onChange={e => setMakingChargeValue(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-200 p-2 text-sm font-semibold focus:border-amber-500 focus:outline-none"
          />
          <p className="text-[11px] text-gray-400 mt-1">Typical South Indian jewellery making charges range from 8% to 18%.</p>
        </div>
      </div>

      <div className="lg:col-span-5 rounded-2xl border border-amber-200 bg-gradient-to-b from-amber-50/60 to-white p-6 shadow-xs space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-900">
            Final Estimated Jewellery Invoice
          </p>
          <div className="mt-1 text-3xl sm:text-4xl font-black text-gray-900">
            {formatIndianCurrency(totalBillAmount)}
          </div>
          <p className="text-xs text-gray-500 mt-1">Inclusive of 3% GST & BIS Hallmarking Fee</p>
        </div>

        <div className="space-y-2.5 border-t border-amber-200/60 pt-4 text-xs sm:text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Net Gold Value ({gramWeight}g @ {formatIndianCurrency(effectiveGramRate)}/g):</span>
            <span className="font-semibold text-gray-900">{formatIndianCurrency(rawGoldValue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Making Charges ({makingChargeType === 'percent' ? `${makingChargeValue}%` : `₹${makingChargeValue}/g`}):</span>
            <span className="font-semibold text-gray-900">{formatIndianCurrency(makingChargeAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">BIS Hallmarking Fee (HUID):</span>
            <span className="font-semibold text-gray-900">₹{hallmarkFee}</span>
          </div>
          <div className="flex justify-between border-t border-dashed border-gray-200 pt-2 font-bold text-amber-800">
            <span>3% GST (CGST 1.5% + SGST 1.5%):</span>
            <span>+{formatIndianCurrency(gstAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
