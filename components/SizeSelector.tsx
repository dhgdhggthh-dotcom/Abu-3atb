import React from 'react';
import type { CardSize } from '../types';

interface SizeSelectorProps {
  selectedSize: CardSize;
  onSizeChange: (size: CardSize) => void;
}

const SIZES: { id: CardSize; label: string }[] = [
  { id: '1:1', label: '1:1' },
  { id: '9:16', label: '9:16' },
  { id: '16:9', label: '16:9' },
  { id: '3:2', label: '3:2' },
];

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, onSizeChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-center lg:text-left">
        Card Ratio
      </label>
      <div className="flex items-center justify-center lg:justify-start space-x-2 bg-gray-100 dark:bg-slate-700 p-1 rounded-lg">
        {SIZES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSizeChange(id)}
            className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-w-[50px] ${
              selectedSize === id
                ? 'bg-indigo-600 text-white shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
            aria-pressed={selectedSize === id}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;