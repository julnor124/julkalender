import {
  WordleConfig,
  WordleGuessResult,
  WordleLetterResult,
  WordleLetterState,
} from "@/models/wordle";

const LETTER_STATE_PRIORITY: Record<WordleLetterState, number> = {
  correct: 3,
  present: 2,
  absent: 1,
};

const normalizeWord = (value: string) =>
  value
    .normalize("NFKC")
    .toLocaleUpperCase("sv-SE")
    .replace(/[^A-ZÅÄÖ]/g, "");

const buildLetterCounts = (letters: string[]) => {
  const counts = new Map<string, number>();
  letters.forEach((letter) => {
    counts.set(letter, (counts.get(letter) ?? 0) + 1);
  });
  return counts;
};

export const wordleService = {
  normalizeWord,

  isCorrectLength(guess: string, config: WordleConfig) {
    const expectedLength = config.solution.length;
    return normalizeWord(guess).length === expectedLength;
  },

  isValidWord() {
    return true;
  },

  evaluateGuess(guess: string, config: WordleConfig): WordleGuessResult {
    const normalizedGuess = normalizeWord(guess);
    const normalizedSolution = normalizeWord(config.solution);

    const guessLetters = normalizedGuess.split("");
    const solutionLetters = normalizedSolution.split("");

    const results: WordleLetterResult[] = guessLetters.map((letter) => ({
      letter,
      state: "absent",
    }));

    const remaining = buildLetterCounts(solutionLetters);

    // First pass: mark correct positions
    guessLetters.forEach((letter, index) => {
      if (letter === solutionLetters[index]) {
        results[index].state = "correct";
        remaining.set(letter, (remaining.get(letter) ?? 1) - 1);
      }
    });

    // Second pass: mark present letters
    guessLetters.forEach((letter, index) => {
      if (results[index].state === "correct") {
        return;
      }
      const count = remaining.get(letter) ?? 0;
      if (count > 0) {
        results[index].state = "present";
        remaining.set(letter, count - 1);
      }
    });

    return {
      guess: normalizedGuess,
      letters: results,
      isCorrect: normalizedGuess === normalizedSolution,
    };
  },

  mergeLetterStates(
    previous: Map<string, WordleLetterState>,
    current: WordleLetterResult[]
  ) {
    current.forEach(({ letter, state }) => {
      const existing = previous.get(letter);
      if (!existing || LETTER_STATE_PRIORITY[state] > LETTER_STATE_PRIORITY[existing]) {
        previous.set(letter, state);
      }
    });
    return previous;
  },
};

