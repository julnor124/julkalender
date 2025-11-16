"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DoorModel } from "@/models/door";

const MAX_GUESSES = 6;

const PIXELATION_STEPS = [96, 64, 40, 24, 12, 6];

const normalizeGuess = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();

type GameStatus = "playing" | "solved" | "revealed";

interface MoviePixelGuessGameProps {
  door: DoorModel;
}

const MoviePixelGuessGame = ({ door }: MoviePixelGuessGameProps) => {
  const config = door.pixelGuessConfig;

  if (!config) {
    return null;
  }

  const acceptedAnswers = useMemo(() => {
    const base = config.acceptedAnswers ?? [];
    const all = new Set<string>(
      [config.solution, ...base].map((answer) => normalizeGuess(answer))
    );
    return Array.from(all);
  }, [config.acceptedAnswers, config.solution]);

  const [guess, setGuess] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [message, setMessage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const currentPixelSize = useMemo(() => {
    if (status !== "playing") {
      return 1;
    }
    const index = Math.min(guessCount, PIXELATION_STEPS.length - 1);
    return PIXELATION_STEPS[index];
  }, [guessCount, status]);

  useEffect(() => {
    const image = new Image();
    image.src = config.image;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      imageRef.current = image;
      setImageLoaded(true);
    };
  }, [config.image]);

  const drawPixelated = () => {
    const canvas = canvasRef.current;
    const tempCanvas = hiddenCanvasRef.current;
    const image = imageRef.current;

    if (!canvas || !tempCanvas || !image) {
      return;
    }

    const context = canvas.getContext("2d");
    const tempContext = tempCanvas.getContext("2d");

    if (!context || !tempContext) {
      return;
    }

    const width = image.naturalWidth || image.width;
    const height = image.naturalHeight || image.height;

    if (width === 0 || height === 0) {
      return;
    }

    canvas.width = width;
    canvas.height = height;
    tempCanvas.width = Math.max(1, Math.floor(width / currentPixelSize));
    tempCanvas.height = Math.max(1, Math.floor(height / currentPixelSize));

    tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempContext.imageSmoothingEnabled = false;
    tempContext.drawImage(image, 0, 0, tempCanvas.width, tempCanvas.height);

    context.clearRect(0, 0, width, height);
    context.imageSmoothingEnabled = false;
    context.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, width, height);
  };

  useEffect(() => {
    if (imageLoaded) {
      drawPixelated();
    }
  }, [imageLoaded, currentPixelSize]);

  useEffect(() => {
    if (!imageLoaded) {
      return;
    }

    if (status === "playing" && guessCount >= MAX_GUESSES) {
      setStatus("revealed");
      setMessage(config.revealMessage || `Det var ${config.solution}!`);
      return;
    }

    if (status === "solved") {
      setMessage(config.successMessage || `Det är ${config.solution}!`);
      return;
    }

    if (guessCount === 0) {
      setMessage(null);
    }
  }, [guessCount, imageLoaded, status]);

  useEffect(() => {
    if (status !== "playing" && imageLoaded) {
      const canvas = canvasRef.current;
      const image = imageRef.current;
      if (!canvas || !image) {
        return;
      }
      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }

      canvas.width = image.width;
      canvas.height = image.height;

      context.clearRect(0, 0, image.width, image.height);
      context.imageSmoothingEnabled = true;
      context.drawImage(image, 0, 0);
    }
  }, [status, imageLoaded]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== "playing") {
      return;
    }

    const normalized = normalizeGuess(guess);
    const isCorrect = acceptedAnswers.includes(normalized);

    if (isCorrect) {
      setStatus("solved");
      setGuess("");
      return;
    }

    setGuess("");
    setGuessCount((previous) => {
      const next = Math.min(MAX_GUESSES, previous + 1);
      const remaining = Math.max(0, MAX_GUESSES - next);
      setMessage(
        `Inte riktigt! ${remaining} ${remaining === 1 ? "gissning" : "gissningar"} kvar…`
      );
      return next;
    });
  };

  const remainingGuesses = Math.max(0, MAX_GUESSES - guessCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070216] via-[#110a34] to-[#1a0f3f] text-[#fdf7f7] font-festive">
      <div className="snow pointer-events-none" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-4 pb-20 pt-16">
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
          <div className="relative flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="rounded-3xl border border-white/10 bg-[#0f0a2b]/80 shadow-[0_25px_50px_rgba(10,7,35,0.5)]"
              style={{
                width: "min(90vw, 440px)",
                height: "min(90vw, 440px)",
              }}
            />
            <canvas ref={hiddenCanvasRef} className="hidden" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 text-center w-full max-w-sm"
          >
            <input
              type="text"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              value={guess}
              onChange={(event) => setGuess(event.target.value)}
              maxLength={40}
              disabled={status !== "playing"}
              placeholder={config.placeholder || "Vad är det?"}
              className="
                w-full
                rounded-xl
                border border-white/10
                bg-[#160d3d]/80
                px-5 py-[1.1rem]
                text-center text-lg tracking-[0.25em]
                text-[#f8f4ff]
                shadow-[0_10px_25px_rgba(15,10,45,0.45)]
                outline-none transition
                focus:border-[#ffe89c]
                focus:ring-2
                focus:ring-[#ffe89c]/80
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />
            <button
              type="submit"
              className="
                rounded-full bg-[#ffe89c] px-6 py-3
                text-base font-semibold uppercase tracking-wide text-[#1b0f3d]
                transition hover:bg-[#ffd45c]
                disabled:cursor-not-allowed disabled:opacity-60
              "
              disabled={status !== "playing" || guess.trim() === ""}
            >
              Gissa
            </button>
            {message && status === "playing" && (
              <p className="text-sm text-[#ffe89c]/70" role="alert">
                {message}
              </p>
            )}
          </form>

          {status === "solved" && (
            <p className="mt-4 text-lg font-semibold text-[#ffe89c]">
              {config.successMessage || `Det stämmer! Det är ${config.solution}.`}
            </p>
          )}
          {status === "revealed" && (
            <p className="mt-4 text-lg font-semibold text-[#ffe89c]">
              {config.revealMessage || `Det var ${config.solution}.`}
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default MoviePixelGuessGame;


