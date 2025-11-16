"use client";

import { useState } from "react";
import { DoorModel } from "@/models/door";

interface HistoryGuessGameViewProps {
  door: DoorModel;
}

interface EventResult {
  eventIndex: number;
  guessedYear: number | null;
  wasCorrect: boolean;
  isRevealed: boolean;
}

const HistoryGuessGameView = ({ door }: HistoryGuessGameViewProps) => {
  const config = door.historyGuessConfig;

  if (!config || !config.events || config.events.length === 0) {
    return null;
  }

  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [yearGuess, setYearGuess] = useState("");
  const [results, setResults] = useState<EventResult[]>([]);
  const [showAllResults, setShowAllResults] = useState(false);

  const currentEvent = config.events[currentEventIndex];
  const allEventsCompleted = currentEventIndex >= config.events.length;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!yearGuess.trim()) {
      return;
    }

    const guessedYear = parseInt(yearGuess, 10);
    if (isNaN(guessedYear)) {
      return;
    }

    const acceptedYears = currentEvent.acceptedYears || [currentEvent.year];
    const isCorrect = acceptedYears.includes(guessedYear);

    const newResult: EventResult = {
      eventIndex: currentEventIndex,
      guessedYear,
      wasCorrect: isCorrect,
      isRevealed: true,
    };

    setResults((prev) => [...prev, newResult]);
  };

  const handleNext = () => {
    if (currentEventIndex < config.events.length - 1) {
      setCurrentEventIndex((prev) => prev + 1);
      setYearGuess("");
    } else {
      // Alla events är klara
      setShowAllResults(true);
    }
  };

  const getResultForEvent = (eventIndex: number): EventResult | null => {
    return results.find((r) => r.eventIndex === eventIndex) || null;
  };

  if (showAllResults || allEventsCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0519] via-[#1a0f3a] to-[#2a1555] text-[#fdf7f7] font-festive">
        <div className="snow pointer-events-none" />

        <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-4 pb-20 pt-16">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl text-[#F9DADA] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              {door.title}
            </h1>
            {door.description && (
              <p className="mt-3 text-base md:text-lg text-[#F9DADA]/80 max-w-2xl mx-auto">
                {door.description}
              </p>
            )}
          </header>

          <section className="w-full max-w-4xl space-y-8">
            {config.events.map((event, index) => {
              const result = getResultForEvent(index);
              return (
                <div
                  key={index}
                  className="rounded-3xl border border-white/20 bg-[#1a0f3a]/90 p-6 md:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full md:w-64 h-48 md:h-48 object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#ffe89c] mb-2">
                        {event.title}
                      </h3>
                      <div className="mb-4">
                        <span className="text-xl font-semibold text-[#fdf7f7]">
                          År: {event.year}
                        </span>
                        {result && (
                          <span
                            className={`ml-4 text-lg ${
                              result.wasCorrect
                                ? "text-emerald-300"
                                : "text-red-300"
                            }`}
                          >
                            {result.wasCorrect
                              ? "✓ Rätt!"
                              : `✗ Du gissade ${result.guessedYear}`}
                          </span>
                        )}
                      </div>
                      <p className="text-base md:text-lg text-[#fdf7f7]/90 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </main>
      </div>
    );
  }

  const result = getResultForEvent(currentEventIndex);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0519] via-[#1a0f3a] to-[#2a1555] text-[#fdf7f7] font-festive">
      <div className="snow pointer-events-none" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-4 pb-20 pt-16">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl text-[#F9DADA] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            {door.title}
          </h1>
          {door.description && (
            <p className="mt-3 text-base md:text-lg text-[#F9DADA]/80 max-w-2xl mx-auto">
              {door.description}
            </p>
          )}
          <div className="mt-4 text-lg text-[#ffe89c]">
            Event {currentEventIndex + 1} av {config.events.length}
          </div>
        </header>

        <section className="w-full max-w-3xl">
          <div className="rounded-3xl border border-white/20 bg-[#1a0f3a]/90 p-6 md:p-10 text-center shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            {!result ? (
              <>
                <div className="mb-6">
                  <img
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    className="w-full max-w-2xl mx-auto h-auto rounded-xl shadow-lg"
                  />
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center gap-4"
                >
                  <input
                    type="number"
                    value={yearGuess}
                    onChange={(e) => setYearGuess(e.target.value)}
                    placeholder="Vilket år?"
                    min="1900"
                    max="2100"
                    className="w-full max-w-xs rounded-xl border border-white/10 bg-[#0a0519]/80 px-5 py-3 text-center text-2xl font-bold text-[#f8f4ff] shadow-[0_10px_25px_rgba(15,10,45,0.45)] outline-none transition focus:border-[#ffe89c] focus:ring-2 focus:ring-[#ffe89c]/80"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!yearGuess.trim()}
                    className="rounded-full bg-[#ffe89c] px-8 py-3 text-base font-semibold uppercase tracking-wide text-[#1b0f3d] shadow-[0_10px_30px_rgba(0,0,0,0.55)] transition hover:bg-[#ffd45c] hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Gissa år
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <img
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    className="w-full max-w-2xl mx-auto h-auto rounded-xl shadow-lg"
                  />
                </div>

                <div
                  className={`mb-6 rounded-xl border px-6 py-4 ${
                    result.wasCorrect
                      ? "border-emerald-300/60 bg-emerald-300/10"
                      : "border-red-300/60 bg-red-300/10"
                  }`}
                >
                  <p
                    className={`text-2xl font-bold mb-2 ${
                      result.wasCorrect ? "text-emerald-100" : "text-red-100"
                    }`}
                  >
                    {result.wasCorrect ? "✓ Rätt!" : "✗ Fel"}
                  </p>
                  {!result.wasCorrect && (
                    <p className="text-lg text-[#fdf7f7]/80">
                      Du gissade {result.guessedYear}, men rätt svar är{" "}
                      {currentEvent.year}
                    </p>
                  )}
                </div>

                <div className="mb-6 rounded-xl border border-white/20 bg-[#0a0519]/60 px-6 py-4">
                  <h3 className="text-xl font-bold text-[#ffe89c] mb-2">
                    {currentEvent.title}
                  </h3>
                  <p className="text-lg text-[#fdf7f7]">
                    {currentEvent.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-full bg-[#ffe89c] px-8 py-3 text-base font-semibold uppercase tracking-wide text-[#1b0f3d] shadow-[0_10px_30px_rgba(0,0,0,0.55)] transition hover:bg-[#ffd45c] hover:scale-105"
                >
                  {currentEventIndex < config.events.length - 1
                    ? "Nästa event →"
                    : "Visa alla resultat"}
                </button>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HistoryGuessGameView;

