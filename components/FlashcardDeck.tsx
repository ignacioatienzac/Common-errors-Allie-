import React, { useState } from 'react';
import { ERROR_CATALOG } from '../data';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export const FlashcardDeck: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = ERROR_CATALOG[currentIndex];

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % ERROR_CATALOG.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + ERROR_CATALOG.length) % ERROR_CATALOG.length);
    }, 150);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4">
      <div className="mb-4 text-gray-600 font-medium">
        Card {currentIndex + 1} of {ERROR_CATALOG.length}
      </div>

      <div 
        className="relative w-full h-80 perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full duration-500 transform transition-all transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white border-2 border-blue-100 rounded-2xl shadow-lg flex flex-col items-center justify-center p-8 text-center hover:shadow-xl transition-shadow">
            <span className="text-sm font-bold tracking-wider text-blue-500 mb-2 uppercase">Common Error</span>
            <h3 className="text-3xl text-gray-800 font-bold mb-4">
              "{currentCard.incorrect}"
            </h3>
            <p className="text-gray-500 mt-4 text-sm">(Click to see correction)</p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg rotate-y-180 flex flex-col items-center justify-center p-8 text-center">
            <span className="text-sm font-bold tracking-wider text-blue-100 mb-2 uppercase">{currentCard.category}</span>
            <h3 className="text-3xl font-bold mb-2">
              "{currentCard.correct}"
            </h3>
            <div className="w-16 h-1 bg-white/30 rounded-full mb-4"></div>
            <p className="text-blue-50 leading-relaxed">
              {currentCard.explanation}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <button 
          onClick={(e) => { e.stopPropagation(); prevCard(); }}
          className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }}
          className="px-6 py-2 rounded-full bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition-colors"
        >
          <RotateCcw size={18} className="inline mr-2" />
          Flip
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); nextCard(); }}
          className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Styles for 3D flip effect manually since tailwind default doesn't have all rotate-y utilities by default sometimes */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};