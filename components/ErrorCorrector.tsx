import React, { useState, useEffect } from 'react';
import { TextToken } from '../types';
import { PenTool, Check, X, RefreshCw } from 'lucide-react';

interface ErrorCorrectorProps {
  errorsToFix: TextToken[];
  onLoadNextText: () => void;
  hasMoreTexts: boolean;
}

export const ErrorCorrector: React.FC<ErrorCorrectorProps> = ({ errorsToFix, onLoadNextText, hasMoreTexts }) => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
  const [allCorrect, setAllCorrect] = useState(false);

  useEffect(() => {
    // Reset state when errorsToFix changes
    setInputs({});
    setResults({});
    setAllCorrect(false);
  }, [errorsToFix]);

  const handleInputChange = (id: string, value: string) => {
    setInputs(prev => ({ ...prev, [id]: value }));
    // Reset result for this field when typing
    if (results[id]) {
      setResults(prev => ({ ...prev, [id]: null }));
    }
  };

  const checkCorrections = () => {
    const newResults: Record<string, 'correct' | 'incorrect'> = {};
    let isPerfect = true;

    errorsToFix.forEach(error => {
      const userInput = inputs[error.id]?.trim().toLowerCase() || '';
      const correctAnswers = error.correction?.toLowerCase().split('/').map(s => s.trim()) || [];
      
      // Allow for basic punctuation differences or casing
      const isMatch = correctAnswers.some(ans => userInput === ans || userInput.replace(/[.,]/g, '') === ans.replace(/[.,]/g, ''));
      
      newResults[error.id] = isMatch ? 'correct' : 'incorrect';
      if (!isMatch) isPerfect = false;
    });

    setResults(newResults);
    setAllCorrect(isPerfect);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-8 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="bg-green-100 p-2 rounded-lg text-green-600">
          <PenTool size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Correct Errors</h3>
          <p className="text-sm text-gray-500">Write the correct form of the errors found.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {errorsToFix.map((error) => (
          <div key={error.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2">
               <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">X</span>
               <span className="font-medium text-gray-700 line-through decoration-red-400 decoration-2">{error.text}</span>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={inputs[error.id] || ''}
                onChange={(e) => handleInputChange(error.id, e.target.value)}
                placeholder="Type the correction..."
                className={`w-full p-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  results[error.id] === 'correct' 
                    ? 'border-green-300 bg-green-50 text-green-800' 
                    : results[error.id] === 'incorrect'
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 focus:border-blue-400 focus:ring-blue-100'
                }`}
              />
              {results[error.id] === 'correct' && (
                <Check size={18} className="absolute right-3 top-3 text-green-600" />
              )}
              {results[error.id] === 'incorrect' && (
                <X size={18} className="absolute right-3 top-3 text-red-600" />
              )}
            </div>
            
            {results[error.id] === 'incorrect' && (
              <div className="sm:col-span-2 text-sm text-red-500 mt-1 ml-2">
                 Hint: The correct answer might be "{error.correction}"
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end items-center gap-4">
        {allCorrect ? (
           <div className="flex items-center gap-4 animate-pulse-once">
             <span className="text-green-600 font-bold bg-green-50 px-4 py-2 rounded-lg">
                Well done!
             </span>
             {hasMoreTexts && (
               <button 
               onClick={onLoadNextText}
               className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md flex items-center gap-2 transition-transform hover:scale-105"
             >
               <RefreshCw size={18} />
               Next Text
             </button>
             )}
           </div>
        ) : (
          <button 
            onClick={checkCorrections}
            className="px-6 py-2.5 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 shadow-md hover:shadow-lg transition-all"
          >
            Check Corrections
          </button>
        )}
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};