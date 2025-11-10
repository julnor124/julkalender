"use client";

import { useMemo, useState } from "react";
import { DoorModel } from "@/models/door";

interface TriviaQuizGameViewProps {
  door: DoorModel;
}

type AnswerStatus = "pending" | "correct" | "incorrect";

const GRADIENT =
  "min-h-screen bg-gradient-to-b from-[#0b0b29] via-[#1a134d] to-[#2a1761] text-[#fdf7f7] font-festive";

const OPTION_BASE =
  "w-full rounded-2xl border px-5 py-4 text-left text-sm md:text-base font-medium transition shadow-[0_16px_32px_rgba(14,10,40,0.35)]";

export const TriviaQuizGameView = ({ door }: TriviaQuizGameViewProps) => {
  const config = door.triviaQuizConfig;

  if (!config || config.questions.length === 0) {
    return null;
  }

  const totalQuestions = config.questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerStatuses, setAnswerStatuses] = useState<AnswerStatus[]>(
    Array(totalQuestions).fill("pending")
  );
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentQuestion = config.questions[currentIndex];
  const progressLabel = useMemo(
    () => `${currentIndex + 1}/${totalQuestions}`,
    [currentIndex, totalQuestions]
  );

  const handleSelect = (index: number) => {
    if (showFeedback) {
      return;
    }
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null || showFeedback) {
      return;
    }

    const isCorrect = selectedOption === currentQuestion.correctOption;

    setAnswerStatuses((prev) => {
      const next = [...prev];
      next[currentIndex] = isCorrect ? "correct" : "incorrect";
      return next;
    });

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setShowFeedback(true);
  };

  const handleNext = () => {
    if (!showFeedback) {
      return;
    }

    if (currentIndex === totalQuestions - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswerStatuses(Array(totalQuestions).fill("pending"));
    setScore(0);
    setShowFeedback(false);
    setFinished(false);
  };

  const correctOptionText = currentQuestion.options[currentQuestion.correctOption];

  return (
    <div className={GRADIENT}>
      <div className="snow pointer-events-none" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center px-4 pb-20 pt-16">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl text-[#F9DADA] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            {door.title}
          </h1>
          <p className="mt-3 text-base md:text-lg text-[#F9DADA]/75 max-w-2xl mx-auto">
            {door.description}
          </p>
        </header>

        {!finished ? (
          <section className="w-full">
            <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#ffe89c]/70">
              <span>Fråga {progressLabel}</span>
              <span>Poäng: {score}</span>
            </div>

            <div className="w-full rounded-3xl border border-white/10 bg-[#120a3a]/80 px-6 py-8 text-left shadow-[0_30px_60px_rgba(12,8,40,0.45)]">
              <p className="text-lg md:text-xl text-[#ffe89c]">{currentQuestion.question}</p>

              <div className="mt-6 space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  const isCorrect = showFeedback && index === currentQuestion.correctOption;
                  const isIncorrect =
                    showFeedback && isSelected && index !== currentQuestion.correctOption;

                  const className = [
                    OPTION_BASE,
                    isCorrect
                      ? "border-emerald-300/60 bg-emerald-400/10 text-emerald-100"
                      : isIncorrect
                      ? "border-rose-400/70 bg-rose-500/10 text-rose-100"
                      : isSelected
                      ? "border-[#ffe89c]/90 bg-[#ffe89c]/10 text-[#ffe89c]"
                      : "border-white/10 bg-[#0b0b29]/70 text-[#fdf7f7]/80 hover:border-[#ffe89c]/50 hover:bg-[#1b164a]/60",
                  ].join(" ");

                  return (
                    <button
                      key={option}
                      type="button"
                      className={className}
                      onClick={() => handleSelect(index)}
                      disabled={showFeedback}
                    >
                      <span className="block text-sm uppercase tracking-[0.2em] text-[#ffe89c]/60">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="mt-1 block text-base">{option}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={selectedOption === null || showFeedback}
                  className="w-full rounded-full bg-[#ffe89c] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  Lås in svar
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!showFeedback}
                  className="w-full rounded-full bg-[#ffe89c] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {currentIndex === totalQuestions - 1 ? "Visa resultat" : "Nästa fråga"}
                </button>
              </div>

              {showFeedback && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-[#0a0a26]/75 px-5 py-4 text-sm">
                  {selectedOption === currentQuestion.correctOption ? (
                    <p className="text-emerald-200">
                      Rätt! <span className="font-semibold text-emerald-100">{correctOptionText}</span>{" "}
                      var det vi sökte.
                    </p>
                  ) : (
                    <p className="text-rose-200">
                      Nära! Rätt svar var{" "}
                      <span className="font-semibold text-rose-100">{correctOptionText}</span>.
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="w-full">
            <div className="w-full rounded-3xl border border-white/10 bg-[#120a3a]/80 px-6 py-10 text-center shadow-[0_30px_60px_rgba(12,8,40,0.45)]">
              <h2 className="text-2xl font-semibold text-[#ffe89c]">Quizet är klart!</h2>
              <p className="mt-4 text-base text-[#fdf7f7]/80">
                Du fick <span className="font-semibold text-[#ffe89c]">{score}</span> av{" "}
                {totalQuestions} rätt.
              </p>

              <div className="mt-6 grid gap-3 text-left">
                {config.questions.map((question, index) => {
                  const status = answerStatuses[index];
                  const isCorrect = status === "correct";
                  const icon = isCorrect ? "✨" : "🛷";
                  const answerText = question.options[question.correctOption];
                  return (
                    <div
                      key={question.question}
                      className={`rounded-2xl border px-5 py-4 text-sm shadow-[0_18px_36px_rgba(12,8,40,0.4)] ${
                        isCorrect
                          ? "border-emerald-300/50 bg-emerald-300/10 text-emerald-50"
                          : "border-white/10 bg-[#0c0b2d]/70 text-[#fdf7f7]/75"
                      }`}
                    >
                      <p className="font-semibold uppercase tracking-[0.2em]">
                        {icon} {index + 1}. {question.question}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#ffe89c]/70">
                        Rätt svar:
                      </p>
                      <p className="text-sm text-[#ffe89c]">{answerText}</p>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleRestart}
                className="mt-8 rounded-full bg-[#ffe89c] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c]"
              >
                Spela igen
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default TriviaQuizGameView;


