"use client";

import { useCallback, useMemo, useState } from "react";
import { DoorModel } from "@/models/door";

interface RebusGameViewProps {
  door: DoorModel;
  onSolved?: () => void;
}

const normalise = (value: string) =>
  value.toLowerCase().replace(/\s+/g, " ").trim();

export const RebusGameView = ({ door, onSolved }: RebusGameViewProps) => {
  if (!door.rebusConfig) {
    return null;
  }

  const { prompt, solution, acceptedAnswers = [], hint } = door.rebusConfig;

  const allValidAnswers = useMemo(() => {
    const base = acceptedAnswers.map(normalise);
    const sol = normalise(solution);
    return base.includes(sol) ? base : [...base, sol];
  }, [acceptedAnswers, solution]);

  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (revealed) {
        return;
      }
      const candidate = normalise(guess);
      if (!candidate) {
        setMessage("Skriv in en gissning först!");
        return;
      }
      if (allValidAnswers.includes(candidate)) {
        setMessage(`Woho! Rätt svar är “${solution}”. 🌟`);
        onSolved?.();
      } else {
        setMessage("Nja, inte riktigt. Testa igen eller visa svaret!");
      }
    },
    [allValidAnswers, guess, revealed, solution]
  );

  const handleReveal = useCallback(() => {
    setRevealed(true);
    setMessage(`Svaret på rebusen är “${solution}”. 🎉`);
    onSolved?.();
  }, [solution, onSolved]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0924] via-[#19104a] to-[#2d0f62] text-[#fdf7f7] font-festive">
      <div className="snow pointer-events-none" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-4 pb-24 pt-16">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl text-[#F9DADA] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            {door.title}
          </h1>
          <p className="mt-3 text-base md:text-lg text-[#F9DADA]/80 max-w-2xl mx-auto">
            {door.description}
          </p>
        </header>

        <section className="flex w-full flex-col items-center gap-8">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#100a33]/80 px-6 py-8 text-center shadow-[0_30px_60px_rgba(12,8,40,0.45)]">
            <p className="text-lg font-semibold text-[#ffe89c]">
              Kan du lösa rebusen?
            </p>
            <p className="mt-4 whitespace-pre-line text-base text-[#fdf7f7]/85">
              {prompt}
            </p>
            {hint && (
              <p className="mt-4 text-sm text-[#ffe89c]/70">
                Hint: {hint}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex w-full flex-col items-center gap-3"
            >
              <input
                type="text"
                value={guess}
                onChange={(event) => setGuess(event.target.value)}
                disabled={revealed}
                placeholder="Skriv din gissning..."
                className="w-9/12 rounded-xl border border-white/10 bg-[#160d3d]/80 px-5 py-3 text-center text-lg text-[#f8f4ff] shadow-[0_10px_25px_rgba(15,10,45,0.45)] outline-none transition focus:border-[#ffe89c] focus:ring-2 focus:ring-[#ffe89c]/80 disabled:cursor-not-allowed disabled:opacity-60"
              />
              <div className="flex w-9/12 flex-col gap-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={revealed}
                  className="flex-1 rounded-full bg-[#ffe89c] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Gissa
                </button>
                <button
                  type="button"
                  onClick={handleReveal}
                  disabled={revealed}
                  className="flex-1 rounded-full bg-[#ffe89c] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Visa svaret
                </button>
              </div>
            </form>
          </div>

          {message && (
            <p className="text-sm text-[#ffe89c]/80 text-center">{message}</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default RebusGameView;


