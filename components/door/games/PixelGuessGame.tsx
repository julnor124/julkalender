"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const MAX_GUESSES = 6;
const TARGET_WORDS = ["zara", "zara larsson"];
const IMAGE_SRC = "/images/zara.jpg";

const PIXELATION_STEPS = [96, 64, 40, 24, 12, 6];

const normalizeGuess = (value: string) => value.trim().toLowerCase();

export const PixelGuessGame = () => {
  const [guess, setGuess] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const currentPixelSize = useMemo(() => {
    if (isSolved) {
      return 1;
    }
    const index = Math.min(guessCount, PIXELATION_STEPS.length - 1);
    return PIXELATION_STEPS[index];
  }, [guessCount, isSolved]);

  useEffect(() => {
    const image = new Image();
    image.src = IMAGE_SRC;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      imageRef.current = image;
      setImageLoaded(true);
    };
  }, []);

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

    if (!isSolved && guessCount >= MAX_GUESSES) {
      setIsSolved(true);
      setMessage("It’s Zara Larsson ✨");
      return;
    }

    if (isSolved) {
      setMessage("It’s Zara Larsson ✨");
      return;
    }

    if (guessCount === 0) {
      setMessage(null);
    }
  }, [guessCount, imageLoaded, isSolved]);

  useEffect(() => {
    if (isSolved && imageLoaded) {
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
  }, [isSolved, imageLoaded]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSolved || guessCount >= MAX_GUESSES) {
      return;
    }

    const normalized = normalizeGuess(guess);
    const isCorrect = TARGET_WORDS.some((word) => normalized === word);

    if (isCorrect) {
      setIsSolved(true);
      setGuess("");
      return;
    }

    setGuess("");
    setGuessCount((previous) => {
      const next = Math.min(MAX_GUESSES, previous + 1);
      const remaining = Math.max(0, MAX_GUESSES - next);
      setMessage(`Nope! ${remaining} ${
        remaining === 1 ? "gissning kvar." : "gissningar kvar."
      }`);
      return next;
    });
  };

  const remainingGuesses = Math.max(0, MAX_GUESSES - guessCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04020f] via-[#150b3b] to-[#250d6d] text-[#fdf7f7] font-festive">
      <div className="snow pointer-events-none" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-4 pb-20 pt-16">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl text-[#F9DADA] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            LUCKA 3: Vem här?
          </h1>
          <p className="mt-3 text-base md:text-lg text-[#F9DADA]/80 max-w-2xl mx-auto">
            Här bakom gömmer sig en kändis, men vem kan det vara? Bilden blir tydligare för varje gissning. Du har {MAX_GUESSES} gissningar att klura ut vem det är. Lycka till!
          </p>
        </header>

        <section className="flex w-full flex-col items-center gap-10">
          <div className="relative flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="rounded-3xl border border-white/10 bg-[#0f0a2b]/80 shadow-[0_25px_50px_rgba(10,7,35,0.5)]"
              style={{
                width: "min(90vw, 420px)",
                height: "min(90vw, 420px)",
              }}
            />
            <canvas
              ref={hiddenCanvasRef}
              className="hidden"
            />
          </div>

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
              value={guess}
              onChange={(event) => setGuess(event.target.value)}
              maxLength={30}
              disabled={isSolved || guessCount >= MAX_GUESSES}
              placeholder="Skriv din gissning..."
              className="
                w-full
                rounded-xl
                border border-white/10
                bg-[#160d3d]/80
                px-5 py-[0.5rem]
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
              style={{ maxWidth: "288px" }}
            />
            <button
              type="submit"
              className="
                rounded-full bg-[#ffe89c] px-[0.5rem] py-[0.5rem]
                text-base font-semibold uppercase tracking-wide text-[#1b0f3d]
                transition hover:bg-[#ffd45c]
                disabled:cursor-not-allowed disabled:opacity-60
              "
              disabled={isSolved || guessCount >= MAX_GUESSES || guess.trim() === ""}
            >
              Gissa
            </button>

            <div className="text-sm text-[#ffe89c]/80">
              {isSolved
                ? null
                : `Du har ${remainingGuesses} ${
                    remainingGuesses === 1 ? "försök" : "försök"
                  } kvar.`}
            </div>

            {message && !isSolved && (
              <p className="text-sm text-[#ffe89c]/70" role="alert">
                {message}
              </p>
            )}
          </form>

          {isSolved && (
            <p className="mt-4 text-lg font-semibold text-[#ffe89c]">
              WOHOOOO Visst var det Zara Larsson ✨
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default PixelGuessGame;


