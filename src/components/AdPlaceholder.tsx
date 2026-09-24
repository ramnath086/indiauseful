'use client';

import React from 'react';

interface AdPlaceholderProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'responsive';
  className?: string;
}

export default function AdPlaceholder({
  slotId = 'sample-slot',
  format = 'responsive',
  className = ''
}: AdPlaceholderProps) {
  return (
    <div
      aria-label="Advertisement"
      className={`my-6 rounded-xl border border-dashed border-gray-200 bg-gray-50/70 p-4 text-center transition-all ${className}`}
    >
      <div className="flex flex-col items-center justify-center space-y-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Advertisement
        </span>
        <div
          className={`flex w-full items-center justify-center rounded-lg border border-gray-100 bg-white/60 text-xs text-gray-400 ${
            format === 'horizontal'
              ? 'h-24 sm:h-28'
              : format === 'rectangle'
              ? 'h-64 sm:h-64'
              : 'min-h-[90px] py-4'
          }`}
        >
          <div className="text-center">
            <p className="font-mono text-xs text-gray-400">Google AdSense Slot</p>
            <p className="text-[10px] text-gray-300">ID: {slotId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
