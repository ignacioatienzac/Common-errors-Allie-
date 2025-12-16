import React, { useState } from 'react';
import { FlashcardDeck } from './components/FlashcardDeck';
import { PracticeSession } from './components/PracticeSession';
import { GraduationCap, BookOpen, PenTool } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'practice'>('flashcards');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <GraduationCap size={20} />
            </div>
            <h1 className="font-bold text-xl text-gray-800 hidden sm:block">Spanish Correction</h1>
          </div>

          <nav className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'flashcards' 
                  ? 'bg-white text-indigo-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen size={16} />
              <span className="hidden sm:inline">Review (Flashcards)</span>
              <span className="sm:hidden">Review</span>
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'practice' 
                  ? 'bg-white text-indigo-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <PenTool size={16} />
              <span className="hidden sm:inline">Practice (Texts)</span>
              <span className="sm:hidden">Practice</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'flashcards' && (
          <div className="animate-fade-in">
             <div className="text-center mb-8">
               <h2 className="text-2xl font-bold text-gray-800 mb-2">Activity 1: Memory Cards</h2>
               <p className="text-gray-600">Review common errors before practicing.</p>
             </div>
             <FlashcardDeck />
          </div>
        )}

        {activeTab === 'practice' && (
           <div className="animate-fade-in">
             <div className="text-center mb-8">
               <h2 className="text-2xl font-bold text-gray-800 mb-2">Activity 2 & 3: Text Practice</h2>
               <p className="text-gray-600">Identify errors in the text and then correct them.</p>
             </div>
             <PracticeSession />
           </div>
        )}
      </main>

      <footer className="text-center py-8 text-gray-400 text-sm">
        <p>© 2024 Personalized Spanish Practice</p>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default App;