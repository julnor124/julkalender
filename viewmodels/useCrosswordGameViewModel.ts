"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DoorModel } from "@/models/door";
import { CrosswordDirection, CrosswordEntry } from "@/models/crossword";

type CellKey = `${number}-${number}`;

export interface CrosswordCellViewModel {
  row: number;
  col: number;
  isBlock: boolean;
  number?: number;
  solution?: string;
  value: string;
  entryIds: string[];
  isActive: boolean;
  isCorrect: boolean;
}

export interface CrosswordClueViewModel {
  id: string;
  number: number;
  clue: string;
  answerLength: number;
  isComplete: boolean;
  isActive: boolean;
}

export type CrosswordFeedback =
  | { type: "success"; durationMs: number }
  | { type: "error" };

interface CrosswordViewModel {
  title: string;
  description: string;
  instructions?: string;
  rows: number;
  cols: number;
  board: CrosswordCellViewModel[][];
  acrossClues: CrosswordClueViewModel[];
  downClues: CrosswordClueViewModel[];
  activeEntry: CrosswordEntry | null;
  activeEntryId: string | null;
  getEntryCells: (entryId: string) => { row: number; col: number }[];
  getEntryById: (entryId: string) => CrosswordEntry | null;
  isRevealed: boolean;
  hasCompleted: boolean;
  feedback: CrosswordFeedback | null;
  handleRevealSolution: () => void;
  handleDismissFeedback: () => void;
  handleCellChange: (row: number, col: number, value: string) => void;
  handleCellFocus: (row: number, col: number) => void;
  handleSelectEntry: (entryId: string) => void;
  handleToggleEntry: (row: number, col: number) => void;
}

const createCellKey = (row: number, col: number): CellKey => `${row}-${col}`;

const isLetter = (value: string) => /^[A-ZÅÄÖ]$/i.test(value);

const getEntryCells = (entry: CrosswordEntry) => {
  return Array.from({ length: entry.answer.length }, (_, index) => {
    if (entry.direction === "across") {
      return { row: entry.row, col: entry.col + index };
    }
    return { row: entry.row + index, col: entry.col };
  });
};

const normalizeValue = (value: string) =>
  value.normalize("NFC").toUpperCase().trim();

const normalizeForComparison = (value: string) =>
  normalizeValue(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const useCrosswordGameViewModel = (door: DoorModel): CrosswordViewModel => {
  if (!door.crosswordConfig) {
    throw new Error("Crossword configuration missing for door.");
  }

  const { rows, cols, entries, instructions } = door.crosswordConfig;

  const [values, setValues] = useState<Record<CellKey, string>>({});
  const [activeEntryId, setActiveEntryId] = useState<string | null>(
    entries[0]?.id ?? null
  );
  const startTimeRef = useRef<number>(Date.now());
  const lastEvaluatedSignatureRef = useRef<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [feedback, setFeedback] = useState<CrosswordFeedback | null>(null);

  const entryMap = useMemo(() => {
    const map = new Map<string, CrosswordEntry>();
    entries.forEach((entry) => {
      map.set(entry.id, {
        ...entry,
        answer: normalizeValue(entry.answer),
      });
    });
    return map;
  }, [entries]);

  const board = useMemo(() => {
    const grid: CrosswordCellViewModel[][] = Array.from(
      { length: rows },
      (_, row) =>
        Array.from({ length: cols }, (_, col): CrosswordCellViewModel => ({
          row,
          col,
          isBlock: true,
          value: "",
          entryIds: [],
          isActive: false,
          isCorrect: false,
        }))
    );

    entries.forEach((entry) => {
      const normalizedAnswer = normalizeValue(entry.answer);
      const cells = getEntryCells({ ...entry, answer: normalizedAnswer });

      cells.forEach(({ row, col }, index) => {
        const cell = grid[row][col];
        cell.isBlock = false;
        const solutionLetter = normalizedAnswer[index] ?? "";
        cell.solution = solutionLetter;
        cell.entryIds = [...cell.entryIds, entry.id];
        const key = createCellKey(row, col);
        const cellValue = values[key] ?? "";
        cell.value = cellValue;
        const normalizedCellValue = normalizeForComparison(cellValue);
        const normalizedSolutionLetter = normalizeForComparison(solutionLetter);
        cell.isCorrect =
          normalizedCellValue !== "" &&
          normalizedCellValue === normalizedSolutionLetter;
        if (entry.number && index === 0 && cell.number === undefined) {
          cell.number = entry.number;
        }
      });
    });

    return grid;
  }, [cols, entries, rows, values]);

  const getEntryCellsForId = useCallback(
    (entryId: string) => {
      const entry = entryMap.get(entryId);
      if (!entry) {
        return [];
      }
      return getEntryCells(entry);
    },
    [entryMap]
  );

  const getEntryById = useCallback(
    (entryId: string) => entryMap.get(entryId) ?? null,
    [entryMap]
  );

  const buildClueViewModel = useCallback(
    (direction: CrosswordDirection): CrosswordClueViewModel[] => {
      return entries
        .filter((entry) => entry.direction === direction)
        .map((entry) => {
          const normalizedAnswer = normalizeValue(entry.answer);
    const comparisonAnswer = normalizeForComparison(entry.answer);
          const occupiedCells = getEntryCells(entry);
          const comparisonValue = occupiedCells
            .map(({ row, col }) =>
              normalizeForComparison(values[createCellKey(row, col)] ?? "")
            )
            .join("");
          const isComplete =
            comparisonValue.length === comparisonAnswer.length &&
            comparisonValue === comparisonAnswer;

          const isActive = activeEntryId === entry.id;

          return {
            id: entry.id,
            number: entry.number,
            clue: entry.clue,
            answerLength: normalizedAnswer.length,
            isComplete,
            isActive,
          };
        });
    },
    [activeEntryId, entries, values]
  );

  const acrossClues = useMemo(
    () => buildClueViewModel("across"),
    [buildClueViewModel]
  );
  const downClues = useMemo(
    () => buildClueViewModel("down"),
    [buildClueViewModel]
  );

  const handleSelectEntry = useCallback((entryId: string) => {
    setActiveEntryId(entryId);
  }, []);

  const handleCellFocus = useCallback(
    (row: number, col: number) => {
      const key = createCellKey(row, col);
      const cellEntries = board[row]?.[col]?.entryIds ?? [];
      if (!cellEntries.length) {
        return;
      }

      if (activeEntryId && cellEntries.includes(activeEntryId)) {
        return;
      }

      setActiveEntryId(cellEntries[0] ?? null);
    },
    [activeEntryId, board]
  );

  const handleCellChange = useCallback(
    (row: number, col: number, rawValue: string) => {
      if (isRevealed) {
        return;
      }
      const key = createCellKey(row, col);
      const cell = board[row]?.[col];

      if (!cell || cell.isBlock) {
        return;
      }

      const trimmed = normalizeValue(rawValue).slice(-1);

      if (trimmed === "") {
        setValues((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
        return;
      }

      if (!isLetter(trimmed)) {
        return;
      }

      setValues((prev) => ({
        ...prev,
        [key]: trimmed,
      }));
    },
    [board, isRevealed]
  );

  const activeEntry =
    activeEntryId && entryMap.has(activeEntryId)
      ? entryMap.get(activeEntryId) ?? null
      : null;

  const decoratedBoard = useMemo(() => {
    if (!activeEntryId) {
      return board;
    }

    const activeEntry = entryMap.get(activeEntryId);
    if (!activeEntry) {
      return board;
    }

    const activeCells = new Set<CellKey>(
      getEntryCells(activeEntry).map(({ row, col }) => createCellKey(row, col))
    );

    return board.map((rowCells) =>
      rowCells.map((cell) => ({
        ...cell,
        isActive: activeCells.has(createCellKey(cell.row, cell.col)),
      }))
    );
  }, [activeEntryId, board, entryMap]);

  const handleRevealSolution = useCallback(() => {
    const nextValues: Record<CellKey, string> = {};
    entries.forEach((entry) => {
      const normalizedAnswer = normalizeValue(entry.answer);
      getEntryCells(entry).forEach(({ row, col }, index) => {
        nextValues[createCellKey(row, col)] = normalizedAnswer[index] ?? "";
      });
    });
    setValues(nextValues);
    setIsRevealed(true);
    setHasCompleted(true);
    setFeedback(null);
    setActiveEntryId(null);
    lastEvaluatedSignatureRef.current = null;
  }, [entries]);

  const handleToggleEntry = useCallback(
    (row: number, col: number) => {
      const cellEntries = board[row]?.[col]?.entryIds ?? [];
      if (!cellEntries.length) {
        return;
      }

      if (!activeEntryId) {
        setActiveEntryId(cellEntries[0]);
        return;
      }

      const currentIndex = cellEntries.indexOf(activeEntryId);
      const nextEntryId = cellEntries[(currentIndex + 1) % cellEntries.length];
      setActiveEntryId(nextEntryId);
    },
    [activeEntryId, board]
  );

  useEffect(() => {
    if (isRevealed) {
      return;
    }

    const uniqueCellKeys = new Set<CellKey>();
    entries.forEach((entry) => {
      getEntryCells(entry).forEach(({ row, col }) => {
        uniqueCellKeys.add(createCellKey(row, col));
      });
    });

    const orderedKeys = Array.from(uniqueCellKeys).sort();
    const allFilled = orderedKeys.every(
      (key) => (values[key] ?? "").length === 1
    );

    if (!allFilled) {
      lastEvaluatedSignatureRef.current = null;
      if (!isRevealed && hasCompleted) {
        setHasCompleted(false);
      }
      if (feedback !== null) {
        setFeedback(null);
      }
      return;
    }

    const signature = orderedKeys
      .map((key) => values[key] ?? "")
      .join("|");

    if (lastEvaluatedSignatureRef.current === signature) {
      return;
    }
    lastEvaluatedSignatureRef.current = signature;

    const allCorrect = entries.every((entry) => {
      const comparisonAnswer = normalizeForComparison(entry.answer);
      return getEntryCells(entry).every(({ row, col }, index) => {
        const key = createCellKey(row, col);
        return (
          normalizeForComparison(values[key] ?? "") ===
          (comparisonAnswer[index] ?? "")
        );
      });
    });

    if (allCorrect) {
      if (!hasCompleted) {
        setHasCompleted(true);
      }
      setFeedback({
        type: "success",
        durationMs: Date.now() - startTimeRef.current,
      });
      return;
    }

    if (hasCompleted) {
      setHasCompleted(false);
    }
    setFeedback({ type: "error" });
  }, [entries, feedback, hasCompleted, isRevealed, values]);

  const handleDismissFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  return {
    title: door.title,
    description: door.description,
    instructions,
    rows,
    cols,
    board: decoratedBoard,
    acrossClues,
    downClues,
    activeEntry,
    activeEntryId,
    getEntryCells: getEntryCellsForId,
    getEntryById,
    isRevealed,
    hasCompleted,
    feedback,
    handleRevealSolution,
    handleDismissFeedback,
    handleCellChange,
    handleCellFocus,
    handleSelectEntry,
    handleToggleEntry,
  };
};


