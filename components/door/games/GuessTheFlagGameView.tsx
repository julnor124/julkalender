"use client";

import { useMemo, useState } from "react";
import { DoorModel } from "@/models/door";

const MAX_GUESSES = 6;
interface ClipStep {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const CLIP_STEPS: ClipStep[] = [
  { top: 30, right: 40, bottom: 30, left: 40 }, // lite tydligare centralt fönster direkt
  { top: 40, right: 45, bottom: 25, left: 25 },
  { top: 40, right: 15, bottom: 15, left: 15 },
  { top: 40, right: 10, bottom: 10, left: 10 },
  { top: 40, right: 10, bottom: 5, left: 5 },
  { top: 0, right: 0, bottom: 0, left: 0 },
];

const normalise = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

interface GuessEntry {
  guess: string;
  correct: boolean;
}

interface GuessTheFlagGameViewProps {
  door: DoorModel;
}

const GuessTheFlagGameView = ({ door }: GuessTheFlagGameViewProps) => {
  const config = door.flagGuessConfig;

  if (!config) {
    return null;
  }

  const acceptedAnswers = useMemo(() => {
    const base = config.acceptedAnswers ?? [];
    const set = new Set<string>(
      [config.solution, ...base]
        .map(normalise)
        .filter(Boolean)
    );
    return Array.from(set);
  }, [config.acceptedAnswers, config.solution]);

  const [entries, setEntries] = useState<GuessEntry[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [feedback, setFeedback] = useState<string | null>(null);

  const remainingGuesses = Math.max(MAX_GUESSES - entries.length, 0);

  const clipIndex = Math.min(entries.length, CLIP_STEPS.length - 1);
  const clipInset =
    status === "playing"
      ? CLIP_STEPS[clipIndex]
      : { top: 0, right: 0, bottom: 0, left: 0 };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status !== "playing") {
      return;
    }

    const trimmed = inputValue.trim();

    if (!trimmed) {
      return;
    }

    const normalisedGuess = normalise(trimmed);
    const isCorrect = acceptedAnswers.includes(normalisedGuess);

    const newEntries: GuessEntry[] = [
      ...entries,
      { guess: trimmed, correct: isCorrect },
    ];

    setEntries(newEntries);
    setInputValue("");

    if (isCorrect) {
      setStatus("won");
      setFeedback(`Yay! Det är ${config.solution}.`);
      return;
    }

    if (newEntries.length >= MAX_GUESSES) {
      setStatus("lost");
      return;
    }

    setFeedback("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05121f] via-[#0b1f34] to-[#122a45] text-[#fdf7f7] font-festive">
      <div className="snow pointer-events-none" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-4 pb-20 pt-16">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl text-[#F9DADA] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            {door.title}
          </h1>
          <p className="mt-3 text-base md:text-lg text-[#F9DADA]/75 max-w-2xl mx-auto">
            {door.description}
          </p>
        </header>

        <section className="flex w-full flex-col items-center gap-8">
          <div className="w-full rounded-3xl border border-white/10 bg-[#0d1a2c]/80 px-6 py-8 text-center shadow-[0_30px_60px_rgba(5,12,28,0.45)]">
            <div className="flex flex-col items-center gap-6">
              <div className="w-full max-w-xl">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#020b16] shadow-[0_20px_40px_rgba(5,12,28,0.5)]">
                  <img
                    src={config.image}
                    alt={
                      config.guessType === "capital"
                        ? "Gissa huvudstaden"
                        : "Gissa flaggan"
                    }
                    className="w-full object-cover transition-[clip-path] duration-700 ease-out"
                    style={{
                      clipPath: `inset(${clipInset.top}% ${clipInset.right}% ${clipInset.bottom}% ${clipInset.left}%)`,
                    }}
                  />

                  <div className="absolute bottom-3 right-4 rounded-full bg-[#05121f]/80 px-4 py-1 text-xs uppercase tracking-[0.35em] text-[#F9DADA]/70 shadow-[0_6px_20px_rgba(0,0,0,0.4)]">
                    {remainingGuesses} gissningar kvar
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-xl flex-col items-center gap-4"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder={
                    status === "playing"
                      ? config.guessType === "capital"
                        ? "Vilken huvudstad?"
                        : "Vilket land?"
                      : "Spelet är slut"
                  }
                  disabled={status !== "playing"}
                  className="w-full rounded-xl border border-white/10 bg-[#172949]/80 px-5 py-[1.1rem] text-center text-lg text-[#fdf7f7] shadow-[0_10px_25px_rgba(5,12,28,0.45)] outline-none transition focus:border-[#ffe89c] focus:ring-2 focus:ring-[#ffe89c]/80 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status !== "playing"}
                  className="w-full rounded-full bg-[#e84a5f] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_15px_35px_rgba(232,74,95,0.35)] transition hover:bg-[#d93c50] focus:outline-none focus:ring-2 focus:ring-[#ffe89c] focus:ring-offset-2 focus:ring-offset-[#0b1f34] disabled:cursor-not-allowed disabled:bg-[#7a2c37] disabled:shadow-none"
                >
                  Gissa
                </button>
              </form>

              {feedback && (
                <p className="mt-2 text-sm text-[#ffe89c]/80">{feedback}</p>
              )}

              <div className="mt-4 w-full max-w-xl text-left">
                <ul className="mt-3 space-y-2">
                  {entries.length === 0 && (
                    <li className="rounded-2xl border border-white/5 bg-[#0f2035]/60 px-4 py-3 text-sm text-[#F9DADA]/60">
                      Inga gissningar ännu!
                    </li>
                  )}
                  {entries.map((entry, index) => (
                    <li
                      key={`${entry.guess}-${index}`}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm shadow-[0_10px_18px_rgba(5,12,28,0.35)] ${
                        entry.correct
                          ? "border-emerald-300/60 bg-emerald-300/10 text-emerald-100"
                          : "border-white/10 bg-[#101f33]/70 text-[#fdf7f7]/80"
                      }`}
                    >
                      <span className="font-medium uppercase tracking-wide">
                        {index + 1}. {entry.guess}
                      </span>
                      <span className="text-xs uppercase tracking-[0.3em]">
                        {entry.correct ? "Rätt" : "Fel"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {status !== "playing" && (
                <div className="mt-6 rounded-3xl border border-emerald-200/30 bg-emerald-200/15 px-6 py-5 text-sm text-emerald-50">
                  <p>
                    {status === "won"
                      ? "LALALALALAAAAA! 🎉 Braaaaa jävla jobbat."
                      : `Den var svår:( Svaret var ${config.solution}.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GuessTheFlagGameView;
