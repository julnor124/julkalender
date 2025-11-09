export type WordleLetterState = "correct" | "present" | "absent";

export interface WordleConfig {
  solution: string;
  maxGuesses?: number;
  instructions?: string;
  hint?: string;
}

export interface WordleLetterResult {
  letter: string;
  state: WordleLetterState;
}

export interface WordleGuessResult {
  guess: string;
  letters: WordleLetterResult[];
  isCorrect: boolean;
}

