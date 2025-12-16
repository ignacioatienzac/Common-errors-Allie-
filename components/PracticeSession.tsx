import React, { useState } from 'react';
import { PRACTICE_TEXTS } from '../data';
import { ErrorIdentifier } from './ErrorIdentifier';
import { ErrorCorrector } from './ErrorCorrector';
import { TextToken } from '../types';
import { BookOpen } from 'lucide-react';

export const PracticeSession: React.FC = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [foundErrors, setFoundErrors] = useState<TextToken[] | null>(null);

  const currentText = PRACTICE_TEXTS[currentTextIndex];

  const handleIdentifierSuccess = (errors: TextToken[]) => {
    setFoundErrors(errors);
  };

  const handleNextText = () => {
    setFoundErrors(null);
    setCurrentTextIndex((prev) => (prev + 1) % PRACTICE_TEXTS.length);
  };

  const jumpToText = (index: number) => {
    setFoundErrors(null);
    setCurrentTextIndex(index);
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Navigation for texts */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
            {PRACTICE_TEXTS.map((text, idx) => (
                <button
                    key={text.id}
                    onClick={() => jumpToText(idx)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        currentTextIndex === idx 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                    {idx + 1}. {text.title}
                </button>
            ))}
        </div>
      </div>

      <div className="grid gap-8">
        <div className="relative">
             {/* Connector line visual */}
             {foundErrors && (
                <div className="absolute left-8 top-full h-8 w-0.5 bg-indigo-200 -z-10"></div>
            )}
            
            <ErrorIdentifier 
                textData={currentText} 
                onSuccess={handleIdentifierSuccess} 
            />
        </div>

        {foundErrors && (
            <ErrorCorrector 
                errorsToFix={foundErrors}
                onLoadNextText={handleNextText}
                hasMoreTexts={true} // Since we loop, always true
            />
        )}
      </div>

        {/* Empty state placeholder if needed, though usually covered */}
        {!foundErrors && (
            <div className="text-center p-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                <BookOpen size={48} className="mx-auto mb-2 opacity-50" />
                <p>Complete the previous activity to unlock correction.</p>
            </div>
        )}
    </div>
  );
};