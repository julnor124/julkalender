"use client";

import { useMemo, useState } from "react";
import { DoorModel } from "@/models/door";

const MAX_GUESSES = 6;

const normalizeGuess = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();

interface MusicVideoGuessGameViewProps {
  door: DoorModel;
  onSolved?: () => void;
}

const MusicVideoGuessGameView = ({ door, onSolved }: MusicVideoGuessGameViewProps) => {
  const config = door.musicVideoConfig;

  const targetVariants = useMemo(() => {
    if (!config) return [];
    const base = config.acceptedAnswers ?? [];
    const all = new Set<string>(
      [config.solution, ...base].map((answer) => normalizeGuess(answer))
    );
    return Array.from(all);
  }, [config?.acceptedAnswers, config?.solution]);

  const [guess, setGuess] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!config || !config.images || config.images.length === 0) {
    return null;
  }

  const isSeriesGame = door.gameSlug === "gissa-serien" || door.id === 9;

  const currentImageIndex = Math.min(guessCount, config.images.length - 1);
  const gameFinished = isSolved || guessCount >= MAX_GUESSES;
  const maxVisibleIndex = gameFinished
    ? config.images.length - 1
    : currentImageIndex;
  const remainingGuesses = Math.max(0, MAX_GUESSES - guessCount);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSolved || guessCount >= MAX_GUESSES) {
      return;
    }

    const normalized = normalizeGuess(guess);
    const isCorrect = targetVariants.includes(normalized);

    if (isCorrect) {
      const currentIndex = Math.min(guessCount, config.images.length - 1);
      setIsSolved(true);
      setMessage(`JA!! Det är ${config.solution} 🎶`);
      if (config.videoUrl) {
        setShowVideo(true);
      }
      // Sätt galleryIndex till första bilden när man gissar rätt, så man kan se alla
      setGalleryIndex(0);
      setGuess("");
      onSolved?.();
      return;
    }

    setGuess("");
    setGuessCount((prev) => {
      const next = Math.min(MAX_GUESSES, prev + 1);
      const remaining = Math.max(0, MAX_GUESSES - next);
      const newMaxIndex = Math.min(next, config.images.length - 1);
      setGalleryIndex(newMaxIndex);

      if (next >= MAX_GUESSES) {
        setMessage("Sista gissningen gjord – nu får ni se videon!");
        setShowVideo(true);
        // Sätt galleryIndex till första bilden när alla gissningar är gjorda, så man kan se alla
        setGalleryIndex(0);
        onSolved?.();
      } else {
        setMessage(
          `Inte riktigt! ${remaining} ${
            remaining === 1 ? "gissning" : "gissningar"
          } kvar…`
        );
      }

      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050316] via-[#140b3a] to-[#230f5a] text-[#fdf7f7] font-festive">
      <div className="snow pointer-events-none" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center px-4 pb-20 pt-16">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl text-[#F9DADA] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            {door.title}
          </h1>
          {door.description && (
            <p className="mt-3 text-base md:text-lg text-[#F9DADA]/80 max-w-2xl mx-auto">
              {door.description}
            </p>
          )}
        </header>

        <section className="flex w-full flex-col items-center gap-10">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#0d0a29]/85 px-6 py-8 text-center shadow-[0_30px_60px_rgba(10,6,32,0.55)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ffe89c]/70">
              Bild {currentImageIndex + 1} av {config.images.length}
            </p>

            <div className="mt-4 flex w-full flex-col items-center gap-4">
              <div className="mx-auto w-full max-w-[340px] aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-[#000]/30 shadow-[0_22px_44px_rgba(6,3,22,0.65)]">
                <img
                  src={config.images[galleryIndex]}
                  alt={
                    `Bild ${galleryIndex + 1} av ${config.images.length}`
                  }
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Bildnavigation – alltid tillgänglig efter att minst en bild visats */}
              <div className="flex items-center justify-center gap-4 text-xs text-[#ffe89c]/80">
                <button
                  type="button"
                  onClick={() =>
                    setGalleryIndex((prev) => Math.max(0, prev - 1))
                  }
                  disabled={galleryIndex === 0}
                  className="rounded-full border border-[#ffe89c]/40 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Föregående bild
                </button>
                <span>
                  Bild {galleryIndex + 1} av {config.images.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setGalleryIndex((prev) =>
                      Math.min(maxVisibleIndex, prev + 1)
                    )
                  }
                  disabled={galleryIndex >= maxVisibleIndex}
                  className="rounded-full border border-[#ffe89c]/40 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Nästa bild →
                </button>
              </div>

              {!showVideo && (
                <>
                  <form
                    onSubmit={handleSubmit}
                    className="mt-4 flex flex-col items-center gap-4 text-center w-full max-w-sm"
                  >
                    <input
                      type="text"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                      value={guess}
                      onChange={(event) => setGuess(event.target.value)}
                      maxLength={80}
                      disabled={isSolved || guessCount >= MAX_GUESSES}
                      placeholder={
                        isSeriesGame
                          ? "Vilken serie är det?"
                          : door.gameSlug === "gissa-filmen"
                          ? "Vilken film är det?"
                          : "Vilken musikvideo är det?"
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#160d3d]/80 px-5 py-[0.9rem] text-center text-lg tracking-[0.15em] text-[#f8f4ff] shadow-[0_10px_25px_rgba(15,10,45,0.45)] outline-none transition focus:border-[#ffe89c] focus:ring-2 focus:ring-[#ffe89c]/80 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      className="rounded-full bg-[#ffe89c] px-6 py-3 text-base font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c] disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={
                        isSolved || guessCount >= MAX_GUESSES || guess.trim() === ""
                      }
                    >
                      Gissa
                    </button>
                  </form>

                  <div className="mt-2 text-sm text-[#ffe89c]/80">
                    {isSolved
                      ? null
                      : ``}
                  </div>
                </>
              )}

              {message && !showVideo && (
                <p className="mt-2 text-sm text-[#ffe89c]/75" role="alert">
                  {message}
                </p>
              )}

              {showVideo && config.videoUrl && (
                <div className="mt-6 w-full max-w-[640px]">
                  <div className="w-full h-[220px] md:h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_24px_50px_rgba(0,0,0,0.7)]">
                    <iframe
                      className="h-full w-full"
                      src={config.videoUrl}
                      title="Musikvideo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  {isSolved ? (
                    <p className="mt-4 text-sm text-[#ffe89c]/85">
                      LALALA JAAA! Det är rätt!{" "}
                      <span className="font-semibold">{config.solution}</span>.
                    </p>
                  ) : (
                    <p className="mt-4 text-sm text-[#ffe89c]/85">
                      Rätt svar är{" "}
                      <span className="font-semibold">{config.solution}</span>. Här är videon!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MusicVideoGuessGameView;


