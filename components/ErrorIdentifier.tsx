import React, { useState, useEffect } from 'react';
import { PracticeText, TextToken } from '../types';
import { CheckCircle2, AlertCircle, Search } from 'lucide-react';

interface ErrorIdentifierProps {
  textData: PracticeText;
  onSuccess: (foundErrors: TextToken[]) => void;
}

export const ErrorIdentifier: React.FC<ErrorIdentifierProps> = ({ textData, onSuccess }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Reset state when text changes
  useEffect(() => {
    setSelectedIds(new Set());
    setSubmitted(false);
    setFeedbackMsg(null);
  }, [textData.id]);

  const toggleSelection = (id: string) => {
    if (submitted) return; // Lock after submission
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
    setFeedbackMsg(null);
  };

  const checkAnswers = () => {
    const allErrors = textData.tokens.filter(t => t.isError);
    const selectedErrorIds = Array.from(selectedIds);
    
    const correctSelections = selectedErrorIds.filter(id => 
      allErrors.find(e => e.id === id)
    );
    
    const missedErrors = allErrors.filter(e => !selectedIds.has(e.id));
    const falsePositives = selectedErrorIds.filter(id => 
      !allErrors.find(e => e.id === id)
    );

    setSubmitted(true);

    if (missedErrors.length === 0 && falsePositives.length === 0) {
      setFeedbackMsg({ type: 'success', text: 'Excellent! You found all errors.' });
      // Wait a moment so the user sees the green success state before the next part unlocks
      setTimeout(() => {
        onSuccess(allErrors);
      }, 1000);
    } else {
      let msg = 'Try again. ';
      if (missedErrors.length > 0) msg += `You missed ${missedErrors.length} errors. `;
      if (falsePositives.length > 0) msg += `You selected ${falsePositives.length} correct words by mistake.`;
      setFeedbackMsg({ type: 'error', text: msg });
    }
  };

  const retry = () => {
    setSubmitted(false);
    setFeedbackMsg(null);
    setSelectedIds(new Set());
  };

  const getTokenStyle = (token: TextToken) => {
    const isSelected = selectedIds.has(token.id);
    
    if (!submitted) {
      return isSelected 
        ? 'bg-yellow-200 text-yellow-900 border-yellow-400' 
        : 'hover:bg-gray-100 border-transparent';
    }

    // Submitted State Logic
    if (token.isError && isSelected) return 'bg-green-200 text-green-900 border-green-400'; // Correctly found
    if (token.isError && !isSelected) return 'bg-red-100 text-red-900 border-red-300 border-dashed'; // Missed
    if (!token.isError && isSelected) return 'bg-red-200 text-red-900 border-red-400 line-through'; // False positive
    
    return 'border-transparent opacity-50'; // Neutral words faded out slightly to focus on errors
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
          <Search size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Identify Errors</h3>
          <p className="text-sm text-gray-500">Click on the words that contain errors.</p>
        </div>
      </div>

      <div className="p-8 bg-gray-50 rounded-xl leading-relaxed text-lg border border-gray-200 shadow-inner">
        {textData.tokens.map((token) => (
          <span
            key={token.id}
            onClick={() => toggleSelection(token.id)}
            className={`inline-block px-1 mx-0.5 rounded cursor-pointer transition-all border-b-2 ${getTokenStyle(token)}`}
          >
            {token.text}
          </span>
        ))}
      </div>

      {feedbackMsg && (
        <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${
          feedbackMsg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {feedbackMsg.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{feedbackMsg.text}</span>
        </div>
      )}

      <div className="mt-6 flex justify-end gap-3">
        {submitted && feedbackMsg?.type === 'error' && (
           <button 
           onClick={retry}
           className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
         >
           Retry
         </button>
        )}
        {!submitted && (
          <button 
            onClick={checkAnswers}
            disabled={selectedIds.size === 0}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
              selectedIds.size === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
            }`}
          >
            Check
          </button>
        )}
      </div>
    </div>
  );
};