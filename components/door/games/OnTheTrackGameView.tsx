"use client";

import { useEffect, useMemo, useState } from "react";
import { DoorModel } from "@/models/door";

interface OnTheTrackGameViewProps {
  door: DoorModel;
  onSolved?: () => void;
}

const normalise = (value: string) =>
  value.toLowerCase().replace(/\s+/g, " ").trim();

const POINT_COLORS: Record<number, string> = {
  10: "#fde68a",
  8: "#fcd34d",
  6: "#fbbf24",
  4: "#f59e0b",
  2: "#d97706",
};

export const OnTheTrackGameView = ({ door, onSolved }: OnTheTrackGameViewProps) => {
  const config = door.onTheTrackConfig;

  if (!config) {
    return null;
  }

  const levels = config.levels ?? [];

  if (levels.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#07051d] via-[#110a34] to-[#1f104d] text-[#fdf7f7] font-festive">
        <div className="snow pointer-events-none" />
        <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center px-4 pb-20 pt-16">
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl text-[#F9DADA] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              {door.title}
            </h1>
            <p className="mt-3 text-base md:text-lg text-[#F9DADA]/75 max-w-3xl mx-auto">
              {door.description}
            </p>
          </header>
          <p className="mt-6 text-sm text-[#ffe89c]/80">
            Inga ledtrådar kunde läsas in för denna resa.
          </p>
        </main>
      </div>
    );
  }

  const acceptedAnswers = useMemo(() => {
    const base = config.acceptedAnswers ?? [];
    const answer = normalise(config.answer);
    const set = new Set<string>(base.map(normalise));
    set.add(answer);
    return Array.from(set);
  }, [config.acceptedAnswers, config.answer]);

  const [levelIndex, setLevelIndex] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(30);
  const [guessed, setGuessed] = useState<{
    guess: string;
    correct: boolean;
    points: number;
  } | null>(null);
  const [showGuessField, setShowGuessField] = useState(false);
  const [guessInput, setGuessInput] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const gameFinished = levelIndex >= levels.length;

  useEffect(() => {
    if (!hasStarted) {
      setShowVideo(false);
      return;
    }

    if (levelIndex >= levels.length && !message) {
      if (!guessed) {
        setMessage(`Du drog aldrig i nödbromsen:( Svaret var ${config.answer}.`);
      } else if (guessed.correct) {
        setMessage(
          `Snyggt TJOHOOO! Du tog den på ${guessed.points} poäng. Rätt svar är givetvis ${config.answer}.`
        );
      } else {
        setMessage(
          `Tyvärr! ${guessed.guess} var fel. Rätt svar är ${config.answer}.`
        );
      }
    }
  }, [hasStarted, config.answer, guessed, levelIndex, levels.length, message]);

  useEffect(() => {
    if (guessed?.correct) {
      onSolved?.();
    }
  }, [guessed, onSolved]);

  useEffect(() => {
    if (gameFinished) {
      onSolved?.();
    }
  }, [gameFinished, onSolved]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    if (levelIndex >= levels.length && config.videoUrl) {
      setShowVideo(true);
    }
  }, [hasStarted, levelIndex, levels.length, config.videoUrl]);

  useEffect(() => {
    if (!hasStarted || levelIndex >= levels.length) {
      return;
    }
    setRemainingSeconds(30);
  }, [hasStarted, levelIndex, levels.length]);

  useEffect(() => {
    if (!hasStarted || gameFinished || showGuessField) {
      return;
    }

    const interval = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          setLevelIndex((current) =>
            current + 1 <= levels.length ? current + 1 : current
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [hasStarted, gameFinished, showGuessField, levelIndex, levels.length]);

  const currentLevel =
    levels.length > 0
      ? levels[Math.min(levelIndex, levels.length - 1)]
      : null;

  const handleSubmitGuess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (guessed || !guessInput.trim()) {
      return;
    }

    const normalisedGuess = normalise(guessInput);
    const currentPoints =
      levelIndex < levels.length
        ? levels[levelIndex].points
        : levels[levels.length - 1]?.points ?? 0;
    const isCorrect = acceptedAnswers.includes(normalisedGuess);

    setGuessed({
      guess: guessInput.trim(),
      correct: isCorrect,
      points: isCorrect ? currentPoints : 0,
    });
    setShowGuessField(false);
    setGuessInput("");

    if (isCorrect) {
      setMessage("Häng kvar och se om du hade rätt!");
    } else {
      setMessage("Häng kvar och se om du hade rätt!");
    }
  };

  const advanceLevel = () => {
    setShowGuessField(false);
    setGuessInput("");

    if (levelIndex + 1 < levels.length) {
      setLevelIndex((prev) => prev + 1);
      setMessage(null);
    } else {
      setLevelIndex(levels.length);
      if (!guessed) {
        setMessage(`Du drog aldrig i nödbromsen:( Svaret var ${config.answer}.`);
      } else if (guessed.correct) {
        setMessage(
            `Snyggt TJOHOOO! Du tog den på ${guessed.points} poäng. Rätt svar är givetvis ${config.answer}.`
        );
      } else {
        setMessage(
          `Tyvärr! ${guessed.guess} var fel. Rätt svar är ${config.answer}.`
        );
      }
    }
  };

  const handleStart = () => {
    setHasStarted(true);
    setLevelIndex(0);
    setRemainingSeconds(30);
    setGuessed(null);
    setShowGuessField(false);
    setGuessInput("");
    setMessage(null);
    setShowVideo(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07051d] via-[#110a34] to-[#1f104d] text-[#fdf7f7] font-festive">
      <div className="snow pointer-events-none" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center px-4 pb-20 pt-16">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl text-[#F9DADA] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            {door.title}
          </h1>
          <p className="mt-3 text-base md:text-lg text-[#F9DADA]/75 max-w-3xl mx-auto">
            {door.description}
          </p>
        </header>

        <section className="flex w-full flex-col items-center gap-8">
          {!hasStarted && (
            <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#120a33]/85 px-6 py-12 text-center shadow-[0_30px_60px_rgba(12,8,40,0.45)]">
              <p className="text-lg font-semibold text-[#ffe89c]">
                Välkommen ombord på På spåret!
              </p>
              <button
                type="button"
                onClick={handleStart}
                className="mt-6 w-2/3 rounded-full bg-[#ffe89c] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c]"
              >
                Starta resan
              </button>
            </div>
          )}

          {hasStarted && !gameFinished && currentLevel && (
            <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#120a33]/85 px-6 py-8 text-center shadow-[0_30px_60px_rgba(12,8,40,0.45)]">
              <p className="text-sm uppercase tracking-[0.3em] text-[#ffe89c]/80">
                {currentLevel.points} poäng
              </p>
              <div className="mt-4 flex w-full flex-col items-center gap-4">
                <div className="mx-auto w-full max-w-[220px] aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#000]/20">
                  <img
                    src={currentLevel.image}
                    alt={`Ledtråd för ${currentLevel.points} poäng`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="whitespace-pre-line text-base text-[#fdf7f7]/90">
                  {currentLevel.clue}
                </p>

                <div className="w-full">
                  <div className="mx-auto mt-2 h-2 w-3/4 overflow-hidden rounded-full bg-[#22124c]">
                    <div
                      className="h-full rounded-full transition-[width] duration-1000 ease-linear"
                      style={{
                        width: `${(remainingSeconds / 30) * 100}%`,
                        backgroundColor:
                          POINT_COLORS[currentLevel.points] ?? "#ffe89c",
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#ffe89c]/70">
                    {remainingSeconds}s kvar till nästa ledtråd
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center gap-3">
                {!guessed && (
                  showGuessField ? (
                    <form
                      onSubmit={handleSubmitGuess}
                      className="flex w-full flex-col items-center gap-3"
                    >
                      <input
                        type="text"
                        value={guessInput}
                        onChange={(event) => setGuessInput(event.target.value)}
                        placeholder="Var är vi på väg?"
                        className="w-9/12 rounded-xl border border-white/10 bg-[#160d3d]/80 px-5 py-3 text-center text-lg text-[#f8f4ff] shadow-[0_10px_25px_rgba(15,10,45,0.45)] outline-none transition focus:border-[#ffe89c] focus:ring-2 focus:ring-[#ffe89c]/80"
                      />
                      <div className="flex w-9/12 flex-col gap-2 sm:flex-row">
                        <button
                          type="submit"
                          className="flex-1 rounded-full bg-[#ffe89c] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c]"
                        >
                          Gissa
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowGuessField(false);
                            setGuessInput("");
                          }}
                          className="flex-1 rounded-full bg-[#ffe89c] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c]"
                          >
                          Avbryt
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowGuessField(true)}
                      className="w-9/12 rounded-full bg-[red] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#ffd45c]"
                    >
                      Dra i nödbromsen
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={advanceLevel}
                  className="w-9/12 rounded-full bg-[#ffe89c] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c]"
                >
                  {levelIndex + 1 < levels.length ? "Nästa ledtråd" : "Visa resultat"}
                </button>
              </div>
            </div>
          )}

          {hasStarted && gameFinished && (
            <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#120a33]/85 px-6 py-10 text-center shadow-[0_30px_60px_rgba(12,8,40,0.45)]">
              <h2 className="text-2xl font-semibold text-[#ffe89c]">
                Resan är slut!
              </h2>
              <p className="mt-4 text-base text-[#fdf7f7]/85">{message}</p>
              {guessed && (
                <p className="mt-3 text-sm text-[#ffe89c]/70">
                  Din gissning: {guessed.guess}
                </p>
              )}

              {showVideo && config.videoUrl && (
                <div className="mt-6 w-full">
                  <div className="mx-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-[#050216]/80 shadow-[0_30px_60px_rgba(12,8,40,0.45)]">
                    <iframe
                      src={config.videoUrl}
                      title="På spåret avslutning"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      frameBorder="0"
                      className="block w-full"
                      style={{ aspectRatio: "16 / 9" }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {message && hasStarted && !gameFinished && (
            <p className="text-sm text-[#ffe89c]/80 text-center">{message}</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default OnTheTrackGameView;


