import React from 'react';
import type { CardTheme } from '../types';

interface ThemeSelectorProps {
  selectedTheme: CardTheme;
  onThemeChange: (theme: CardTheme) => void;
}

const THEMES: { id: CardTheme; colorClass: string }[] = [
  { id: 'indigo', colorClass: 'bg-indigo-500' },
  { id: 'teal', colorClass: 'bg-teal-500' },
  { id: 'rose', colorClass: 'bg-rose-500' },
  { id: 'slate', colorClass: 'bg-slate-500' },
];

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-center lg:text-left">
        Card Theme
      </label>
      <div className="flex items-center justify-center lg:justify-start space-x-2 bg-gray-100 dark:bg-slate-700 p-1 rounded-lg">
        {THEMES.map(({ id, colorClass }) => (
          <button
            key={id}
            type="button"
            onClick={() => onThemeChange(id)}
            className={`w-8 h-8 rounded-full transition-transform duration-200 focus:outline-none ${
              selectedTheme === id
                ? 'ring-2 ring-offset-2 ring-offset-gray-100 dark:ring-offset-slate-700 ring-indigo-500 scale-110'
                : 'hover:scale-110'
            }`}
            aria-label={`Select ${id} theme`}
            aria-pressed={selectedTheme === id}
          >
            <div className={`w-full h-full rounded-full ${colorClass}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;