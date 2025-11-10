"use client";

import type { FC } from "react";
import { DoorModel } from "@/models/door";
import { useWordleGameViewModel } from "@/viewmodels/useWordleGameViewModel";

type BoardState = "correct" | "present" | "absent" | "empty";

const tilePalette: Record<
  BoardState,
  { background: string; border: string; color: string }
> = {
  correct: {
    background: "#22c55e",
    border: "#16a34a",
    color: "#ffffff",
  },
  present: {
    background: "#f59e0b",
    border: "#fbbf24",
    color: "#1f2937",
  },
  absent: {
    background: "#271f4a",
    border: "#3a336a",
    color: "#9f9cc4",
  },
  empty: {
    background: "#1b173a",
    border: "#2f2a57",
    color: "#6e66a3",
  },
};

interface WordleGameViewProps {
  door: DoorModel;
}

interface BoardCell {
  letter: string;
  state: BoardState;
}

export const WordleGameView: FC<WordleGameViewProps> = ({ door }) => {
  const {
    title,
    description,
    instructions,
    guesses,
    currentGuess,
    maxGuesses,
    status,
    error,
    remainingAttempts,
    handleInputChange,
    handleSubmit,
    solutionLength,
  } = useWordleGameViewModel(door);

  const boardRows: BoardCell[][] = Array.from({ length: maxGuesses }, (_, index) => {
    if (index < guesses.length) {
      return guesses[index].letters.map((letter) => ({
        letter: letter.letter,
        state: letter.state,
      }));
    }

    if (index === guesses.length && status === "playing") {
      return Array.from({ length: solutionLength }, () => ({
        letter: "",
        state: "empty" as const,
      }));
    }

    return Array.from({ length: solutionLength }, () => ({
      letter: "",
      state: "empty" as const,
    }));
  });

  const gameMessage = (() => {
    if (status === "won") {
      return "Vem fan är som dig queen, klart ordet var glöööögg 🎉";
    }
    if (status === "lost" && door.wordleConfig) {
      return `Ordet var ${door.wordleConfig.solution.toUpperCase()}. Bättre lycka nästa gång!`;
    }
    return ``;
  })();

  const tileSize = "clamp(2.6rem, 12vw, 3.6rem)";
  const tileFontSize = "clamp(1.4rem, 5vw, 1.6rem)";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04020f] via-[#150b3b] to-[#250d6d] text-[#fdf7f7] font-festive">
      <div className="snow pointer-events-none" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center px-4 pb-16 pt-12">
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

        {/* ✅ BOARD */}
        <section className="flex w-full flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-0">
            {boardRows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className="grid gap-0"
                style={{
                  gridTemplateColumns: `repeat(${solutionLength}, ${tileSize})`,
                  justifyContent: "center",
                }}
              >
                {row.map((cell, cellIndex) => {
                  const palette = tilePalette[cell.state];
                  return (
                    <div
                      key={`cell-${rowIndex}-${cellIndex}`}
                      className="flex items-center justify-center font-bold transition"
                      style={{
                        aspectRatio: "1 / 1",
                        height: tileSize,
                        fontSize: tileFontSize,
                        backgroundColor: palette.background,
                        border: `1px solid ${palette.border}`,
                        color: palette.color,
                        transition: "background-color 200ms ease, color 200ms ease, border 200ms ease",
                      }}
                    >
                      {cell.letter}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ✅ INPUT + BUTTON */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 text-center w-full max-w-sm"
          >
            <input
              type="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="characters"
              spellCheck={false}
              value={currentGuess}
              onChange={(event) => handleInputChange(event.target.value)}
              maxLength={solutionLength}
              disabled={status !== "playing"}
              placeholder="Skriv din gissning..."
              className="
                w-full
px-[0.5rem] py-[0.525rem]

                rounded-xl
                border border-white/10
                bg-[#160d3d]/80
                px-5 py-4
                text-center text-xl tracking-[0.4em]
                text-[#f8f4ff]
                shadow-[0_10px_25px_rgba(15,10,45,0.45)]
                outline-none transition
                focus:border-[#ffe89c]
                focus:ring-2
                focus:ring-[#ffe89c]/80
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
              style={{
                maxWidth: "288px", // ✅ doesn’t stretch full screen
              }}
            />
            <button
              type="submit"
              className="
                rounded-full bg-[#ffe89c] px-[1rem] py-[0.5rem]
                text-base font-semibold uppercase tracking-wide text-[#1b0f3d]
                transition hover:bg-[#ffd45c]
                disabled:cursor-not-allowed disabled:opacity-60
              "
              disabled={status !== "playing"}
            >
              Gissa
            </button>

            <p className="text-sm text-[#ffe89c]/80">{gameMessage}</p>
            {error && (
              <p role="alert" className="text-sm font-semibold text-rose-300">
                {error}
              </p>
            )}
          </form>
        </section>
      </main>
    </div>
  );
};
