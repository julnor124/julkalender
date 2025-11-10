"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";
import { DoorModel } from "@/models/door";

interface HeardleGameViewProps {
  door: DoorModel;
}

type GuessResult = "correct" | "revealed";

const normalise = (value: string) => value.trim().toLowerCase();

const isCorrectGuess = (
  guess: string,
  acceptedSolutions: string[],
  artist: string
) => {
  const input = normalise(guess);
  const artistTarget = normalise(artist);

  return acceptedSolutions.some((solution) => {
    const target = normalise(solution);
    return (
      input === target ||
      input === `${artistTarget} ${target}` ||
      input === `${target} ${artistTarget}` ||
      input.includes(target)
    );
  });
};

export const HeardleGameView = ({ door }: HeardleGameViewProps) => {
  if (!door.heardleConfig) {
    return null;
  }

  const {
    audioSrc,
    revealDurations,
    solution,
    artist,
    acceptedAnswers,
    videoUrl,
  } = door.heardleConfig;

  const validAnswers = useMemo(() => {
    const baseAnswers = acceptedAnswers ?? [];
    if (baseAnswers.length === 0) {
      return [solution];
    }
    if (!baseAnswers.includes(solution)) {
      return [...baseAnswers, solution];
    }
    return baseAnswers;
  }, [acceptedAnswers, solution]);

  const cumulativeDurations = useMemo(() => {
    const totals: number[] = [];
    revealDurations.reduce((sum, value, index) => {
      const total = sum + value;
      totals[index] = total;
      return total;
    }, 0);
    return totals;
  }, [revealDurations]);

  const totalDuration = cumulativeDurations[cumulativeDurations.length - 1] ?? 1;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const [currentSegment, setCurrentSegment] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<GuessResult | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const maxSegments = revealDurations.length;

  const stopPlayback = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  }, []);

  const playSegment = useCallback(
    async (segmentIndex: number) => {
      if (!audioRef.current || !hasLoaded) {
        return;
      }
      const audio = audioRef.current;
      const duration = cumulativeDurations[segmentIndex];

      stopPlayback();
      audio.currentTime = 0;

      try {
        await audio.play();
        setIsPlaying(true);
        const timeoutId = window.setTimeout(() => {
          audio.pause();
          setIsPlaying(false);
        }, duration * 1000);
        timeoutRef.current = timeoutId;
      } catch (error) {
        console.error("Could not play audio", error);
        setMessage("Kunde inte spela klippet. Kontrollera att ljud är tillåtet.");
        setIsPlaying(false);
      }
    },
    [cumulativeDurations, hasLoaded, stopPlayback]
  );

  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, [stopPlayback]);

  const handlePlay = () => {
    if (result) {
      return;
    }
    playSegment(currentSegment);
  };

  const handleSkip = () => {
    if (result || !hasLoaded) {
      return;
    }
    if (currentSegment + 1 < maxSegments) {
      setCurrentSegment((prev) => prev + 1);
      playSegment(currentSegment + 1);
    } else {
      setResult("revealed");
      setShowVideo(true);
      stopPlayback();
    }
  };

  const handleGuessSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!guess.trim() || result) {
      return;
    }
    if (isCorrectGuess(guess, validAnswers, artist)) {
      setResult("correct");
      setMessage(
        `AAAAHH en klassiker! Klart det är “${solution}” av ${artist} 🎉`
      );
      setShowVideo(true);
      stopPlayback();
    } else {
      setMessage(
        "BUUUUHH kom igen nu då! Prova att skippa om du behöver höra mer."
      );
      handleSkip();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#130825] via-[#1f0d52] to-[#310f78] text-[#fdf7f7] font-festive">
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
          <div className="flex w-full justify-center">
            <div className="relative h-[180px] w-[180px] overflow-hidden rounded-full border border-white/15 bg-[#0f0a2b]/80 shadow-[0_20px_40px_rgba(12,8,40,0.5)]">
              <img
                src="/images/singingsanta.png"
                alt="Sjunger tomte"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

      {showVideo && videoUrl ? (
        <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0f0a2b]/80 shadow-[0_30px_60px_rgba(12,8,40,0.45)]">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={videoUrl}
            title={`${solution} – ${artist}`}
            className="absolute left-0 top-0 h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
        </div>
      ) : showVideo ? (
        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0f0a2b]/80 px-6 py-8 text-center shadow-[0_30px_60px_rgba(12,8,40,0.45)]">
          <p className="text-sm text-[#ffe89c]/80">
            Kunde inte visa videon, men du kan lyssna igen på Spotify eller YouTube!
          </p>
        </div>
          ) : (
            <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0f0a2b]/80 px-6 py-8 text-center shadow-[0_30px_60px_rgba(12,8,40,0.45)]">
              <audio
                ref={audioRef}
                preload="auto"
                onCanPlay={() => setHasLoaded(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={audioSrc} type="audio/mp4" />
              </audio>

              <div className="text-sm uppercase tracking-[0.3em] text-[#ffe89c]/80">
                Försök {result ? maxSegments : currentSegment + 1} av {maxSegments}
              </div>

              <div className="mt-4 flex w-full flex-col items-center gap-3">
                <div className="h-2 w-9/12 overflow-hidden rounded-full bg-[#21104d]">
                  <div
                    className="h-full rounded-full bg-[#ffe89c]"
                    style={{
                      width: `${(cumulativeDurations[currentSegment] / totalDuration) * 100}%`,
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={handlePlay}
                  disabled={!hasLoaded || result === "revealed"}
                  className="w-9/12 rounded-full bg-[#ffe89c] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPlaying ? "Spelar..." : "Spela klippet"}
                </button>
                <button
                  type="button"
                  onClick={handleSkip}
                  disabled={result === "revealed" || !hasLoaded}
                  className="w-9/12 rounded-full bg-[#ffe89c] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {currentSegment + 1 < maxSegments
                    ? `Skippa (+${revealDurations[currentSegment + 1]}s)`
                    : "Visa svaret"}
                </button>
              </div>

              <form
                onSubmit={handleGuessSubmit}
                className="mt-6 flex w-full flex-col items-center gap-3"
              >
                <input
                  type="text"
                  autoCapitalize="words"
                  placeholder="Skriv en låt..."
                  value={guess}
                  onChange={(event) => setGuess(event.target.value)}
                  disabled={result === "revealed"}
                  className="w-9/12 rounded-xl border border-white/10 bg-[#160d3d]/80 px-5 py-3 text-center text-lg text-[#f8f4ff] shadow-[0_10px_25px_rgba(15,10,45,0.45)] outline-none transition focus:border-[#ffe89c] focus:ring-2 focus:ring-[#ffe89c]/80 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={result === "revealed" || !guess.trim()}
                  className="w-9/12 rounded-full bg-[#ffe89c] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Gissa
                </button>
              </form>
            </div>
          )}

          {message && (
            <p className="text-sm text-[#ffe89c]/80 text-center">{message}</p>
          )}

          {result && result !== "revealed" && (
            <div className="mt-6 text-center text-sm text-[#fdf7f7]/70">
              Du klarade det på {currentSegment + 1} försök!
            </div>
          )}

          {result === "revealed" && (
            <div className="mt-6 text-center text-sm text-[#fdf7f7]/80">
              HUUUR KUNDE DU INTE DENNAAAAA??? Det var ju “{solution}” av {artist}. 🎧
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HeardleGameView;


