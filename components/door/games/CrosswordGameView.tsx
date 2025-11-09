"use client";

import type {
  FC,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
} from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DoorModel } from "@/models/door";
import { useCrosswordGameViewModel } from "@/viewmodels/useCrosswordGameViewModel";

interface CrosswordGameViewProps {
  door: DoorModel;
}

export const CrosswordGameView: FC<CrosswordGameViewProps> = ({ door }) => {
  const {
    title,
    description,
    instructions,
    board,
    acrossClues,
    downClues,
    activeEntry,
    handleCellChange,
    handleCellFocus,
    handleSelectEntry,
    handleToggleEntry,
    getEntryCells,
    getEntryById,
    isRevealed,
    hasCompleted,
    feedback,
    handleRevealSolution,
    handleDismissFeedback,
  } = useCrosswordGameViewModel(door);

  const tileSize = "clamp(1.75rem, 7vw, 3.2rem)";
  const tileFontSize = "clamp(1rem, 4vw, 1.5rem)";
  const gapSize = "min(0.35rem, 4px)";
  const showCorrectHighlights = isRevealed || hasCompleted;
  const formatDurationMessage = useCallback((durationMs: number) => {
    const pad = (value: number) => value.toString().padStart(2, "0");
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `GRATTIS DU KLARADE DET PÅ ${pad(minutes)} min och ${pad(seconds)} sekunder.`;
  }, []);
  const createCellKey = useCallback(
    (row: number, col: number) => `${row}-${col}`,
    []
  );

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const feedbackButtonRef = useRef<HTMLButtonElement | null>(null);
  const revealConfirmPrimaryButtonRef = useRef<HTMLButtonElement | null>(null);
  const [showRevealConfirm, setShowRevealConfirm] = useState(false);

  const focusCell = useCallback(
    (row: number, col: number) => {
      const ref = inputRefs.current[createCellKey(row, col)];
      if (ref) {
        ref.focus();
        ref.select();
      }
    },
    [createCellKey]
  );

  const activeEntryCells = useMemo(() => {
    if (!activeEntry) {
      return [];
    }
    return getEntryCells(activeEntry.id);
  }, [activeEntry, getEntryCells]);

  useEffect(() => {
    if (isRevealed || !activeEntryCells.length) {
      return;
    }

    const firstIncomplete =
      activeEntryCells.find(({ row, col }) => {
        const cell = board[row]?.[col];
        return cell && cell.value === "";
      }) ?? activeEntryCells[0];

    if (firstIncomplete) {
      focusCell(firstIncomplete.row, firstIncomplete.col);
    }
  }, [activeEntryCells, board, focusCell, isRevealed]);

  const handleFocus = (event: FocusEvent<HTMLInputElement>, row: number, col: number) => {
    if (event.currentTarget.readOnly) {
      event.preventDefault();
      event.currentTarget.blur();
      return;
    }
    handleCellFocus(row, col);
  };

  const moveWithinEntry = useCallback(
    (row: number, col: number, offset: number) => {
      if (!activeEntry || !activeEntryCells.length) {
        return;
      }
      const index = activeEntryCells.findIndex(
        (cell) => cell.row === row && cell.col === col
      );
      if (index === -1) {
        return;
      }
      const nextCell = activeEntryCells[index + offset];
      if (nextCell) {
        focusCell(nextCell.row, nextCell.col);
      }
    },
    [activeEntry, activeEntryCells, focusCell]
  );

  const moveInGrid = useCallback(
    (row: number, col: number, deltaRow: number, deltaCol: number) => {
      let nextRow = row;
      let nextCol = col;

      while (true) {
        nextRow += deltaRow;
        nextCol += deltaCol;

        if (
          nextRow < 0 ||
          nextRow >= board.length ||
          nextCol < 0 ||
          nextCol >= (board[0]?.length ?? 0)
        ) {
          return;
        }

        const cell = board[nextRow]?.[nextCol];
        if (cell && !cell.isBlock) {
          focusCell(nextRow, nextCol);
          return;
        }
      }
    },
    [board, focusCell]
  );

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    if (isRevealed) {
      event.preventDefault();
      return;
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      const currentValue = board[row]?.[col]?.value ?? "";
      const index = activeEntryCells.findIndex(
        (cell) => cell.row === row && cell.col === col
      );

      if (currentValue) {
        handleCellChange(row, col, "");
        if (index > 0) {
          const previous = activeEntryCells[index - 1];
          focusCell(previous.row, previous.col);
        }
        return;
      }

      if (index > 0) {
        const previous = activeEntryCells[index - 1];
        handleCellChange(previous.row, previous.col, "");
        focusCell(previous.row, previous.col);
      }
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveWithinEntry(row, col, 1);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveWithinEntry(row, col, -1);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (activeEntry?.direction === "down") {
        moveWithinEntry(row, col, 1);
      } else {
        moveInGrid(row, col, 1, 0);
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (activeEntry?.direction === "down") {
        moveWithinEntry(row, col, -1);
      } else {
        moveInGrid(row, col, -1, 0);
      }
      return;
    }

    if (event.key === " " || event.code === "Space") {
      event.preventDefault();
      handleToggleEntry(row, col);
      focusCell(row, col);
    }
  };

  const handleInputChange = (
    row: number,
    col: number,
    value: string
  ) => {
    if (isRevealed) {
      return;
    }
    handleCellChange(row, col, value);

    if (!value || !activeEntry) {
      return;
    }

    const index = activeEntryCells.findIndex(
      (cell) => cell.row === row && cell.col === col
    );

    if (index > -1) {
      const nextCell = activeEntryCells[index + 1];
      if (nextCell) {
        focusCell(nextCell.row, nextCell.col);
      }
    }
  };

  const handleCellClick = (
    event: MouseEvent<HTMLLabelElement>,
    row: number,
    col: number,
    entryIds: string[]
  ) => {
    if (isRevealed) {
      focusCell(row, col);
      return;
    }
    if (event.detail === 2 && entryIds.length > 1) {
      event.preventDefault();
      const downEntryId = entryIds.find(
        (entryId) => getEntryById(entryId)?.direction === "down"
      );
      if (downEntryId) {
        if (activeEntry?.id === downEntryId) {
          const acrossEntryId = entryIds.find(
            (entryId) => getEntryById(entryId)?.direction === "across"
          );
          if (acrossEntryId) {
            handleSelectEntry(acrossEntryId);
          }
        } else {
          handleSelectEntry(downEntryId);
        }
      } else {
        handleToggleEntry(row, col);
      }
      focusCell(row, col);
      return;
    }

    if (entryIds.length && (!activeEntry || !entryIds.includes(activeEntry.id))) {
      handleSelectEntry(entryIds[0]);
    }
  };

  useEffect(() => {
    if (feedback && feedbackButtonRef.current) {
      feedbackButtonRef.current.focus();
    }
  }, [feedback]);

  useEffect(() => {
    if (showRevealConfirm && revealConfirmPrimaryButtonRef.current) {
      revealConfirmPrimaryButtonRef.current.focus();
    }
  }, [showRevealConfirm]);

  const handleRevealClick = () => {
    setShowRevealConfirm(true);
  };

  const handleConfirmReveal = () => {
    setShowRevealConfirm(false);
    handleRevealSolution();
  };

  const handleCancelReveal = () => {
    setShowRevealConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020511] via-[#130633] to-[#1f0d56] text-[#fdf7f7] font-festive">
      <div className="snow pointer-events-none" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-4 pb-24 pt-16">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl text-[#F9DADA] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            {title}
          </h1>
          <p className="mt-3 text-base md:text-lg text-[#F9DADA]/80 max-w-3xl mx-auto">
            {description}
          </p>
          {instructions && (
            <p className="mt-4 text-sm md:text-base text-[#F9DADA]/70 max-w-2xl mx-auto">
              {instructions}
            </p>
          )}
        </header>

        <section className="grid w-full gap-8 md:gap-10 md:grid-cols-[minmax(0,1fr)_minmax(260px,320px)]">
          <div className="flex w-full flex-col items-center">
            <div
              className="w-full overflow-x-auto"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div
                className="mx-auto grid rounded-2xl border border-white/10 bg-[#0f0a2b] p-3 shadow-[0_25px_50px_rgba(10,7,35,0.5)] sm:p-4"
                style={{
                  gridTemplateColumns: `repeat(${board[0]?.length ?? 0}, ${tileSize})`,
                  gap: gapSize,
                  width: "fit-content",
                  minWidth: "fit-content",
                }}
              >
                {board.map((row) =>
                  row.map((cell) => {
                    if (cell.isBlock) {
                      return (
                        <div
                          key={`cell-${cell.row}-${cell.col}`}
                          style={{
                            width: tileSize,
                            height: tileSize,
                          }}
                          className="rounded-lg border border-[#21174a] bg-[#120b2e]"
                        />
                      );
                    }

                    const cellKey = createCellKey(cell.row, cell.col);
                    const isCorrect =
                      showCorrectHighlights && cell.isCorrect && !cell.isActive;

                    return (
                      <label
                        key={cellKey}
                        onClick={(event) =>
                          handleCellClick(event, cell.row, cell.col, cell.entryIds)
                        }
                        className={[
                          "relative flex items-center justify-center rounded-xl border transition focus-within:border-[#ffe89c] focus-within:bg-[#2a1b5f]",
                          cell.isActive
                            ? "border-[#ffe89c] bg-[#2a1b5f]"
                            : isCorrect
                            ? "border-[#1c8655] bg-[#174246]"
                            : "border-[#2e225d] bg-[#1a1342]",
                        ].join(" ")}
                        style={{
                          width: tileSize,
                          height: tileSize,
                        }}
                      >
                        {cell.number && (
                          <span className="pointer-events-none absolute left-[6px] top-[4px] text-[0.6rem] text-[#ffe89c]/80">
                            {cell.number}
                          </span>
                        )}
                        <input
                          ref={(element) => {
                            if (element) {
                              inputRefs.current[cellKey] = element;
                            } else {
                              delete inputRefs.current[cellKey];
                            }
                          }}
                          type="text"
                          inputMode="text"
                          maxLength={1}
                          value={cell.value}
                          onFocus={(event) => handleFocus(event, cell.row, cell.col)}
                          onChange={(event) =>
                            handleInputChange(cell.row, cell.col, event.target.value)
                          }
                          onKeyDown={(event) =>
                            handleKeyDown(event, cell.row, cell.col)
                          }
                          className={[
                            "h-full w-full bg-transparent text-center font-bold uppercase outline-none",
                            "text-[#f8f4ff] selection:bg-[#ffe89c] selection:text-[#1f153d]",
                          ].join(" ")}
                          style={{
                            fontSize: tileFontSize,
                            letterSpacing: "0.08em",
                          }}
                          readOnly={isRevealed}
                          aria-label={`Ruta ${cell.number ?? ""}`}
                        />
                      </label>
                    );
                  })
                )}
              </div>
            </div>
            {!isRevealed && (
              <div className="mt-5 flex w-full justify-center">
                <button
                  type="button"
                  onClick={handleRevealClick}
                  className="rounded-full bg-[#ffe89c] px-6 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c]"
                >
                  Visa facit
                </button>
              </div>
            )}
          </div>

          <aside className="flex w-full flex-col gap-6 lg:flex-row">
            <div className="flex w-full flex-col gap-6 lg:flex-1">
              <div className="rounded-2xl border border-white/10 bg-[#0f0a2b]/70 p-5 shadow-[0_20px_45px_rgba(12,8,40,0.55)]">
                <h2 className="text-xl font-semibold text-[#F9DADA]">Vågrätt</h2>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-[#F9DADA]/80">
                  {acrossClues.map((clue) => (
                    <li key={clue.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectEntry(clue.id)}
                        className={[
                          "flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left transition",
                          clue.isActive
                            ? "bg-[#251860] text-[#ffe89c]"
                            : "hover:bg-[#1a1044] hover:text-[#ffe89c]",
                        ].join(" ")}
                      >
                        <span className="min-w-[2.5rem] font-semibold text-[#ffe89c]">
                          {clue.number}V
                        </span>
                        <span className="flex-1">
                          {clue.clue}
                          <span className="ml-2 text-xs uppercase tracking-wide text-[#ffe89c]/60">
                            ({clue.answerLength})
                          </span>
                        </span>
                        {clue.isComplete && (
                          <span role="img" aria-hidden="true">
                            ✨
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex w-full flex-col gap-6 lg:flex-1">
              <div className="rounded-2xl border border-white/10 bg-[#0f0a2b]/70 p-5 shadow-[0_20px_45px_rgba(12,8,40,0.55)]">
                <h2 className="text-xl font-semibold text-[#F9DADA]">Lodrätt</h2>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-[#F9DADA]/80">
                  {downClues.map((clue) => (
                    <li key={clue.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectEntry(clue.id)}
                        className={[
                          "flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left transition",
                          clue.isActive
                            ? "bg-[#251860] text-[#ffe89c]"
                            : "hover:bg-[#1a1044] hover:text-[#ffe89c]",
                        ].join(" ")}
                      >
                        <span className="min-w-[2.5rem] font-semibold text-[#ffe89c]">
                          {clue.number}D
                        </span>
                        <span className="flex-1">
                          {clue.clue}
                          <span className="ml-2 text-xs uppercase tracking-wide text-[#ffe89c]/60">
                            ({clue.answerLength})
                          </span>
                        </span>
                        {clue.isComplete && (
                          <span role="img" aria-hidden="true">
                            ✨
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </section>

        {showRevealConfirm && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-md rounded-3xl bg-[#170a3d] px-6 py-8 text-center shadow-[0_25px_70px_rgba(8,6,28,0.75)] outline outline-1 outline-white/10">
              <p className="text-lg font-semibold text-[#ffe89c] md:text-xl">
                Är du säker på att du vill visa facit?
              </p>
              <p className="mt-3 text-sm text-[#f9dada]/70">
                Facit fyller i alla rutor och stoppar spelet.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={handleCancelReveal}
                  className="inline-flex items-center justify-center rounded-full bg-[#ffe89c] px-6 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ffe89c]/60"
                >
                  Avbryt
                </button>
                <button
                  ref={revealConfirmPrimaryButtonRef}
                  type="button"
                  onClick={handleConfirmReveal}
                  className="inline-flex items-center justify-center rounded-full bg-[#ffe89c] px-6 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ffe89c]/60"
                >
                  Visa facit
                </button>
              </div>
            </div>
          </div>
        )}

        {feedback && (
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 px-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-md rounded-3xl bg-[#140a33] px-6 py-8 text-center shadow-[0_25px_70px_rgba(8,6,28,0.75)] outline outline-1 outline-white/10">
              <p className="text-lg font-semibold text-[#ffe89c] md:text-xl">
                {feedback.type === "success"
                  ? formatDurationMessage(feedback.durationMs)
                  : "Hmm något är fel..."}
              </p>
              <button
                ref={feedbackButtonRef}
                type="button"
                onClick={handleDismissFeedback}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#ffe89c] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ffe89c]/60"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};


