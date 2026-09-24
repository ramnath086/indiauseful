'use client';

import React, { useState } from 'react';
import { formatIndianCurrency } from '@/lib/formatters';

export default function GstCalculator() {
  const [amount, setAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [calculationType, setCalculationType] = useState<'exclusive' | 'inclusive'>('exclusive');

  let netAmount = 0;
  let gstAmount = 0;
  let totalAmount = 0;

  if (calculationType === 'exclusive') {
    // Add GST
    netAmount = amount;
    gstAmount = Math.round((amount * gstRate) / 100);
    totalAmount = netAmount + gstAmount;
  } else {
    // Remove GST
    totalAmount = amount;
    netAmount = Math.round((amount * 100) / (100 + gstRate));
    gstAmount = totalAmount - netAmount;
  }

  const halfGst = Math.round(gstAmount / 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-6">
        <div>
          <label className="text-sm font-semibold text-gray-800 block mb-2">Calculation Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setCalculationType('exclusive')}
              className={`rounded-xl border p-3 text-center transition-all ${
                calculationType === 'exclusive'
                  ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-semibold'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="text-sm font-bold">GST Exclusive</div>
              <div className="text-xs text-gray-500">Add GST to base amount</div>
            </button>
            <button
              type="button"
              onClick={() => setCalculationType('inclusive')}
              className={`rounded-xl border p-3 text-center transition-all ${
                calculationType === 'inclusive'
                  ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-semibold'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="text-sm font-bold">GST Inclusive</div>
              <div className="text-xs text-gray-500">Extract GST from MRP</div>
            </button>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-800">
              {calculationType === 'exclusive' ? 'Base Amount (Without GST)' : 'MRP / Invoice Total (With GST)'}
            </label>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-1 font-mono">₹</span>
              <input
                type="number"
                aria-label="GST calculation amount"
                min="1"
                max="100000000"
                step="100"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-32 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          <input
            type="range"
            aria-label="GST calculation amount slider"
            min="100"
            max="200000"
            step="100"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-800 block mb-2">Standard Indian GST Slabs</label>
          <div className="grid grid-cols-4 gap-2">
            {[5, 12, 18, 28].map(rate => (
              <button
                key={rate}
                type="button"
                onClick={() => setGstRate(rate)}
                className={`rounded-xl border py-2.5 text-center font-bold text-sm transition-all ${
                  gstRate === rate
                    ? 'border-emerald-500 bg-emerald-600 text-white shadow-xs'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-800'
                }`}
              >
                {rate}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-xs space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            {calculationType === 'exclusive' ? 'Final Total Bill (Incl. GST)' : 'Net Base Price (Excl. GST)'}
          </p>
          <div className="mt-1 text-3xl sm:text-4xl font-black text-gray-900">
            {formatIndianCurrency(calculationType === 'exclusive' ? totalAmount : netAmount)}
          </div>
          <p className="text-xs text-gray-500 mt-1">GST Rate applied: {gstRate}%</p>
        </div>

        <div className="space-y-2 border-t border-emerald-100/70 pt-4 text-xs sm:text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Net Pre-GST Amount:</span>
            <span className="font-semibold text-gray-900">{formatIndianCurrency(netAmount)}</span>
          </div>
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>Total GST ({gstRate}%):</span>
            <span>+{formatIndianCurrency(gstAmount)}</span>
          </div>
          <div className="flex justify-between text-gray-500 text-xs pl-2 border-l-2 border-emerald-300">
            <span>CGST ({gstRate / 2}%):</span>
            <span>{formatIndianCurrency(halfGst)}</span>
          </div>
          <div className="flex justify-between text-gray-500 text-xs pl-2 border-l-2 border-emerald-300">
            <span>SGST / UTGST ({gstRate / 2}%):</span>
            <span>{formatIndianCurrency(halfGst)}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 border-t border-dashed border-gray-200 pt-2">
            <span>Gross Total Amount:</span>
            <span>{formatIndianCurrency(totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
