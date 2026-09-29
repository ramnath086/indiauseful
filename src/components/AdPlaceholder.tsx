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
    <aside
      aria-label="Advertisement placeholder"
      data-slot-id={slotId}
      className={`my-6 rounded-xl border border-dashed border-gray-200 bg-gray-50/70 p-4 text-center ${className}`}
    >
      <div className="flex flex-col items-center justify-center space-y-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          Advertisement placeholder
        </span>
        <div
          className={`flex w-full items-center justify-center rounded-lg border border-gray-100 bg-white/60 px-4 text-xs text-gray-600 ${
            format === 'horizontal'
              ? 'h-24 sm:h-28'
              : format === 'rectangle'
              ? 'h-64'
              : 'min-h-[90px] py-4'
          }`}
        >
          No advertisement is currently displayed here.
        </div>
      </div>
    </aside>
  );
}
