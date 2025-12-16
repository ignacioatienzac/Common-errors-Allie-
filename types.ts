export interface ErrorItem {
  id: string;
  incorrect: string;
  correct: string;
  category: 'Léxico' | 'Gramática' | 'Concordancia' | 'Ortografía' | 'Preposiciones';
  explanation: string;
}

export interface TextToken {
  id: string;
  text: string;
  isError: boolean;
  correction?: string;
  feedback?: 'correct' | 'missed' | 'false-positive' | null; // For UI state
}

export interface PracticeText {
  id: number;
  title: string;
  tokens: TextToken[];
}
