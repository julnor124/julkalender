"use client";

import { useState } from "react";
import { DoorModel } from "@/models/door";

interface TriviaGameViewProps {
  door: DoorModel;
}

export const TriviaGameView = ({ door }: TriviaGameViewProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  if (!door.triviaConfig) {
    return null;
  }

  const { question, answer } = door.triviaConfig;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120c2f] via-[#1f0d56] to-[#2f0f6f] text-[#fdf7f7] font-festive">
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
                src="/images/thinking.png"
                alt="Tänker"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="w-full rounded-2xl border border-white/10 bg-[#0f0a2b]/80 px-6 py-8 text-center shadow-[0_30px_60px_rgba(12,8,40,0.45)]">
            <p className="text-lg md:text-xl text-[#ffe89c]">
              {question}
            </p>
            <div className="mt-6 flex flex-col items-center gap-4">
              {!showAnswer ? (
                <>
                  <p className="text-sm text-[#F9DADA]/70">
                    Fundera en stund… vågar du avslöja svaret?
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAnswer(true)}
                    className="rounded-full bg-[#ffe89c] px-6 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c]"
                  >
                    Visa svar
                  </button>
                </>
              ) : (
                <div className="w-full rounded-xl border border-[#ffe89c]/40 bg-[#1b1148]/70 px-5 py-4 text-[#fdf7f7]">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#ffe89c]/70">
                    Svar
                  </p>
                  <p className="mt-2 text-base md:text-lg text-[#ffe89c]">
                    {answer}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAnswer(false)}
                    className="rounded-full bg-[#ffe89c] px-6 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c]"
                  >
                    Dölj svaret
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TriviaGameView;


