import React from 'react';
import type { CardData, CardSize, CardTheme } from '../types';

interface BusinessCardProps {
  data: CardData;
  isLoading: boolean;
  size: CardSize;
  theme: CardTheme;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ data, isLoading, size, theme }) => {
  const { name, imageUrl, summary } = data;

  const sizeStyles = {
    '1:1': {
      container: 'max-w-xs',
      aspectRatio: 'aspect-square',
      imageContainer: 'h-28 w-28',
      imagePlaceholder: 'h-14 w-14',
      name: 'text-2xl',
      summary: 'text-base',
      padding: 'p-6',
      topBannerHeight: 'h-24',
      contentTopPadding: 'pt-10'
    },
    '9:16': {
      container: 'max-w-[280px]',
      aspectRatio: 'aspect-[9/16]',
      imageContainer: 'h-24 w-24',
      imagePlaceholder: 'h-12 w-12',
      name: 'text-xl',
      summary: 'text-sm',
      padding: 'p-6',
      topBannerHeight: 'h-20',
      contentTopPadding: 'pt-8'
    },
    '16:9': {
      container: 'max-w-md',
      aspectRatio: 'aspect-[16/9]',
      imageContainer: 'h-24 w-24',
      imagePlaceholder: 'h-12 w-12',
      name: 'text-2xl',
      summary: 'text-base',
      padding: 'p-6',
      topBannerHeight: 'h-16',
      contentTopPadding: 'pt-6'
    },
    '3:2': {
        container: 'max-w-sm',
        aspectRatio: 'aspect-[3/2]',
        imageContainer: 'h-24 w-24',
        imagePlaceholder: 'h-12 w-12',
        name: 'text-xl',
        summary: 'text-sm',
        padding: 'p-6',
        topBannerHeight: 'h-16',
        contentTopPadding: 'pt-6'
    }
  };
  
  const themeStyles = {
    indigo: {
        banner: 'bg-indigo-500 dark:bg-indigo-700',
        text: 'text-indigo-500 dark:text-indigo-400',
    },
    teal: {
        banner: 'bg-teal-500 dark:bg-teal-700',
        text: 'text-teal-500 dark:text-teal-400',
    },
    rose: {
        banner: 'bg-rose-500 dark:bg-rose-700',
        text: 'text-rose-500 dark:text-rose-400',
    },
    slate: {
        banner: 'bg-slate-500 dark:bg-slate-700',
        text: 'text-slate-500 dark:text-slate-400',
    }
  };

  const styles = sizeStyles[size];
  const currentTheme = themeStyles[theme];

  const CardContent = () => (
    <div className={`flex flex-col items-center text-center ${styles.padding}`}>
      <div className="relative mb-6">
        {imageUrl ? (
          <img className={`${styles.imageContainer} object-cover rounded-full shadow-lg border-4 border-white dark:border-slate-700`} src={imageUrl} alt={name} />
        ) : (
          <div className={`${styles.imageContainer} bg-gray-200 dark:bg-slate-600 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-700 shadow-lg`}>
            <svg className={`${styles.imagePlaceholder} text-gray-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>
      <h3 className={`${styles.name} font-bold text-gray-800 dark:text-white tracking-tight`}>{name}</h3>
      <p className={`mt-2 ${styles.summary} ${currentTheme.text} font-medium italic`}>
        {summary}
      </p>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className={`flex flex-col items-center text-center animate-pulse ${styles.padding}`}>
        <div className={`${styles.imageContainer} bg-gray-300 dark:bg-slate-600 rounded-full mb-6`}></div>
        <div className="h-8 w-48 bg-gray-300 dark:bg-slate-600 rounded mb-3"></div>
        <div className="h-5 w-64 bg-gray-300 dark:bg-slate-600 rounded"></div>
    </div>
  );

  return (
    <div className={`w-full ${styles.container} ${styles.aspectRatio} mx-auto bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105`}>
      <div className="relative">
        <div className={`absolute top-0 left-0 w-full ${styles.topBannerHeight} ${currentTheme.banner}`}></div>
        <div className={`relative ${styles.contentTopPadding}`}>
           {isLoading ? <LoadingSkeleton /> : <CardContent />}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;