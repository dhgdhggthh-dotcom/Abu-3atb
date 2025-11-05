import React, { useState, useCallback } from 'react';
import type { CardData, CardSize, CardTheme } from './types';
import InputForm from './components/InputForm';
import BusinessCard from './components/BusinessCard';
import SizeSelector from './components/SizeSelector';
import ThemeSelector from './components/ThemeSelector';
import GithubIcon from './components/icons/GithubIcon';
import { generateSummary } from './services/geminiService';
import { createGist } from './services/githubService';

const App: React.FC = () => {
  const [cardData, setCardData] = useState<CardData>({
    name: 'Your Name',
    imageUrl: null,
    experience: '',
    summary: 'Your professional AI summary will appear here.',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<CardSize>('1:1');
  const [selectedTheme, setSelectedTheme] = useState<CardTheme>('indigo');

  const [isSavingGist, setIsSavingGist] = useState<boolean>(false);
  const [gistUrl, setGistUrl] = useState<string | null>(null);
  const [gistError, setGistError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (formData: Omit<CardData, 'summary'>) => {
    if (!formData.experience) {
      setError('Please provide your experience.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGistUrl(null);
    setGistError(null);
    setCardData(prev => ({...prev, ...formData, summary: ''}));

    try {
      const summary = await generateSummary(formData.experience);
      setCardData(prev => ({ ...prev, ...formData, summary }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate summary: ${errorMessage}`);
      setCardData(prev => ({ ...prev, summary: 'Could not generate summary.' }));
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleSaveToGist = useCallback(async () => {
    setIsSavingGist(true);
    setGistUrl(null);
    setGistError(null);
    try {
      const url = await createGist(cardData);
      setGistUrl(url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setGistError(`Failed to save to Gist: ${errorMessage}`);
    } finally {
      setIsSavingGist(false);
    }
  }, [cardData]);

  const hasGeneratedCard = cardData.summary !== 'Your professional AI summary will appear here.' && cardData.summary !== 'Could not generate summary.' && cardData.summary !== '';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 font-sans">
      <header className="bg-white dark:bg-slate-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">AI Business Card Generator</h1>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-8">
        {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">Enter Your Details</h2>
            <InputForm 
              onGenerate={handleGenerate}
              isLoading={isLoading} 
            />
          </div>
          <div className="sticky top-8">
             <div className="flex flex-col items-center lg:items-start mb-4">
                <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">Your Generated Card</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <SizeSelector selectedSize={selectedSize} onSizeChange={setSelectedSize} />
                  <ThemeSelector selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />
                </div>
            </div>
            <BusinessCard data={cardData} isLoading={isLoading} size={selectedSize} theme={selectedTheme} />
            <div className="mt-4 text-center">
                {hasGeneratedCard && (
                    <button
                        onClick={handleSaveToGist}
                        disabled={isSavingGist || isLoading}
                        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                         {isSavingGist ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <GithubIcon />
                                Save to Gist
                            </>
                        )}
                    </button>
                )}
                 {gistUrl && (
                    <div className="mt-3 text-sm text-green-600 dark:text-green-400">
                        Successfully saved!{' '}
                        <a href={gistUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-green-700 dark:hover:text-green-300">
                            View Gist
                        </a>
                    </div>
                )}
                {gistError && (
                     <div className="mt-3 text-sm text-red-600 dark:text-red-400">
                        {gistError}
                    </div>
                )}
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center p-4 mt-8 text-gray-500 dark:text-gray-400 text-sm">
        <p>Powered by React, Tailwind CSS, and Gemini API</p>
      </footer>
    </div>
  );
};

export default App;