"use client";

import { FormEvent, useCallback, useState } from "react";
import { DoorModel } from "@/models/door";
import {
  WordleGuessResult,
  WordleLetterResult,
  WordleLetterState,
} from "@/models/wordle";
import { wordleService } from "@/services/wordleService";

type GameStatus = "playing" | "won" | "lost";

interface UseWordleGameViewModelReturn {
  title: string;
  description: string;
  instructions?: string;
  hint?: string;
  guesses: WordleGuessResult[];
  currentGuess: string;
  maxGuesses: number;
  status: GameStatus;
  error: string | null;
  remainingAttempts: number;
  handleInputChange: (value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitCurrentGuess: () => void;
  resetGame: () => void;
  solutionLength: number;
}

export const useWordleGameViewModel = (
  door: DoorModel
): UseWordleGameViewModelReturn => {
  const config = door.wordleConfig;

  if (!config) {
    throw new Error("Wordle configuration is missing for this door.");
  }

  const solutionLength = wordleService.normalizeWord(config.solution).length;
  const maxGuesses = config.maxGuesses ?? 6;

  const [guesses, setGuesses] = useState<WordleGuessResult[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [status, setStatus] = useState<GameStatus>("playing");
  const [error, setError] = useState<string | null>(null);

  const remainingAttempts = maxGuesses - guesses.length;

  const updateGuess = useCallback(
    (value: string) => {
      if (status !== "playing") {
        return;
      }
      const sanitized = value
        .normalize("NFKC")
        .toLocaleUpperCase("sv-SE")
        .replace(/[^A-ZÅÄÖ]/g, "")
        .slice(0, solutionLength);

      setCurrentGuess(sanitized);
      if (error) {
        setError(null);
      }
    },
    [error, solutionLength, status]
  );

  const submitCurrentGuess = useCallback(() => {
    if (status !== "playing") {
      return;
    }

    if (currentGuess.length !== solutionLength) {
      setError(`Ordet måste vara ${solutionLength} bokstäver.`);
      return;
    }

    const normalizedGuess = wordleService.normalizeWord(currentGuess);
    const normalizedSolution = wordleService.normalizeWord(config.solution);

    const guessLetters = normalizedGuess.split("");
    const solutionLetters = normalizedSolution.split("");

    const results: WordleLetterResult[] = guessLetters.map((letter) => ({
      letter,
      state: "absent" as WordleLetterState,
    }));

    const remainingCounts = new Map<string, number>();
    solutionLetters.forEach((letter) => {
      remainingCounts.set(letter, (remainingCounts.get(letter) ?? 0) + 1);
    });

    // First pass: correct letters in correct positions
    guessLetters.forEach((letter, index) => {
      if (letter === solutionLetters[index]) {
        results[index].state = "correct";
        remainingCounts.set(letter, (remainingCounts.get(letter) ?? 0) - 1);
      }
    });

    // Second pass: letters present elsewhere
    guessLetters.forEach((letter, index) => {
      if (results[index].state === "correct") {
        return;
      }
      const available = remainingCounts.get(letter) ?? 0;
      if (available > 0) {
        results[index].state = "present";
        remainingCounts.set(letter, available - 1);
      }
    });

    const result: WordleGuessResult = {
      guess: normalizedGuess,
      letters: results,
      isCorrect: normalizedGuess === normalizedSolution,
    };
    const nextGuesses = [...guesses, result];
    setGuesses(nextGuesses);
    setCurrentGuess("");
    setError(null);

    if (result.isCorrect) {
      setStatus("won");
      return;
    }

    if (nextGuesses.length >= maxGuesses) {
      setStatus("lost");
    }
  }, [config, currentGuess, guesses, maxGuesses, solutionLength, status]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitCurrentGuess();
    },
    [submitCurrentGuess]
  );

  const resetGame = useCallback(() => {
    setGuesses([]);
    setCurrentGuess("");
    setStatus("playing");
    setError(null);
  }, []);

  return {
    title: `Lucka ${door.id}: ${door.title}`,
    description: door.description,
    instructions: config.instructions,
    hint: config.hint,
    guesses,
    currentGuess,
    maxGuesses,
    status,
    error,
    remainingAttempts,
    handleInputChange: updateGuess,
    handleSubmit,
    submitCurrentGuess,
    resetGame,
    solutionLength,
  };
};

