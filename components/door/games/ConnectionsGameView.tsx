"use client";

import { useMemo, useState } from "react";
import { DoorModel } from "@/models/door";

interface PuzzleGroup {
  id: string;
  title: string;
  description: string;
  words: string[];
}

interface WordState {
  word: string;
  groupId: string;
}

interface ConnectionsGameViewProps {
  door: DoorModel;
}

const puzzleGroups: PuzzleGroup[] = [
  {
    id: "umea",
    title: "Kändisar från Umeå",
    description: "William Spetz · Tove Styrke · Mikael Lustig · Hanna Ljungberg",
    words: ["William Spetz", "Tove Styrke", "Mikael Lustig", "Hanna Ljungberg"],
  },
  {
    id: "tandettljus",
    title: "Textrader från ”Tänd ett ljus”",
    description: "Dom dom dom · Låt aldrig hoppet försvinna · Fred på jorden · Samma himmel",
    words: ["Dom dom dom", "Låt aldrig hoppet försvinna", "Fred på jorden", "Samma himmel"],
  },
  {
    id: "hatlag",
    title: "Lag Julia hatar!!!",
    description: "Guif · Djurgården · Modo · Skellefteå",
    words: ["Guif", "Djurgården", "Modo", "Skellefteå"],
  },
  {
    id: "favoritlag",
    title: "Lag Julia gillar <3",
    description: "Björklöven · Liverpool · Sandvik · Holmsund City",
    words: ["Björklöven", "Liverpool", "Sandvik", "Holmsund City"],
  },
];

const MAX_ERRORS = 4;

export const ConnectionsGameView = ({ door }: ConnectionsGameViewProps) => {
  const allWords = useMemo<WordState[]>(() => {
    return puzzleGroups.flatMap((group) =>
      group.words.map((word) => ({
        word,
        groupId: group.id,
      }))
    );
  }, []);

  const [availableWords, setAvailableWords] = useState<WordState[]>(allWords);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [solvedGroups, setSolvedGroups] = useState<PuzzleGroup[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [remainingErrors, setRemainingErrors] = useState<number>(MAX_ERRORS);

  const handleWordClick = (word: string) => {
    if (message && solvedGroups.length < puzzleGroups.length) {
      setMessage(null);
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
    if (selectedWords.includes(word)) {
      setSelectedWords((prev) => prev.filter((item) => item !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords((prev) => [...prev, word]);
    }
  };

  const resetSelection = () => {
    setSelectedWords([]);
  };

  const revealRemainingGroups = () => {
    const unsolvedGroupIds = new Set(
      solvedGroups.map((group) => group.id)
    );
    const remainingGroups = puzzleGroups.filter(
      (group) => !unsolvedGroupIds.has(group.id)
    );
    setSolvedGroups([...solvedGroups, ...remainingGroups]);
    setAvailableWords([]);
    setSelectedWords([]);
  };

  const checkSelection = () => {
    if (selectedWords.length !== 4) {
      setErrorMessage("Välj fyra ord innan du gissar.");
      return;
    }

    const wordsWithGroups = selectedWords.map((word) =>
      availableWords.find((entry) => entry.word === word)
    );

    if (wordsWithGroups.some((entry) => !entry)) {
      setErrorMessage("Ett av orden kunde inte hittas. Försök igen.");
      return;
    }

    const groupCounts = new Map<string, number>();
    wordsWithGroups.forEach((entry) => {
      const current = groupCounts.get(entry!.groupId) ?? 0;
      groupCounts.set(entry!.groupId, current + 1);
    });

    const matchedGroupId = Array.from(groupCounts.entries()).find(
      ([, count]) => count === 4
    )?.[0];

    if (matchedGroupId) {
      const group = puzzleGroups.find((item) => item.id === matchedGroupId);
      if (group) {
        setSolvedGroups((prev) => [...prev, group]);
        setAvailableWords((prev) =>
          prev.filter((entry) => entry.groupId !== matchedGroupId)
        );
        setSelectedWords([]);
        setMessage(`Rätt! Grupp: ${group.title}`);
        if (solvedGroups.length + 1 === puzzleGroups.length) {
          setMessage("Du löste alla grupper! 🎉");
        }
      }
      return;
    }

    const oneAway = Array.from(groupCounts.entries()).some(
      ([, count]) => count === 3
    );

    if (oneAway) {
      setMessage("One away...");
    } else {
      setMessage("Fel grupp!");
    }

    const nextErrors = remainingErrors - 1;
    setRemainingErrors(nextErrors);

    if (nextErrors <= 0) {
      setMessage("Inga gissningar kvar! Här är lösningarna.");
      revealRemainingGroups();
    }
  };

  const isGameOver =
    remainingErrors <= 0 || solvedGroups.length === puzzleGroups.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b33] via-[#1c0d52] to-[#26006f] text-[#fdf7f7] font-festive">
      <div className="snow pointer-events-none" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center px-4 pb-24 pt-16">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl text-[#F9DADA] drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
            {door.title}
          </h1>
          <p className="mt-3 text-base md:text-lg text-[#F9DADA]/80 max-w-3xl mx-auto">
            {door.description}
          </p>
        </header>

        <section className="flex w-full flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-3">
            {availableWords.map((entry) => {
              const isSelected = selectedWords.includes(entry.word);
              return (
                <button
                  key={entry.word}
                  type="button"
                  onClick={() => handleWordClick(entry.word)}
                  disabled={isGameOver}
                  className={[
                    "min-w-[140px] rounded-xl border border-white/10 bg-[#160d3d]/80 px-4 py-3 text-center text-sm font-semibold text-[#f8f4ff] shadow-[0_15px_30px_rgba(12,8,40,0.45)] transition",
                    isSelected
                      ? "border-[#ffe89c] bg-[#2a1b5f]"
                      : "hover:border-[#ffe89c]/60 hover:bg-[#211054]",
                    isGameOver ? "cursor-not-allowed opacity-60" : "",
                  ].join(" ")}
                >
                  {entry.word}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-3 text-sm text-[#F9DADA]/80">
            <div>Markerade ord: {selectedWords.length} / 4</div>
            <div>Gissningar kvar: {remainingErrors}</div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={checkSelection}
              disabled={isGameOver}
              className="rounded-full bg-[#ffe89c] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Kontrollera grupp
            </button>
            <button
              type="button"
              onClick={resetSelection}
              disabled={selectedWords.length === 0 || isGameOver}
              className="rounded-full bg-[#ffe89c] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[#1b0f3d] transition hover:bg-[#ffd45c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Avmarkera
            </button>
          </div>

          {(message || errorMessage) && (
            <div
              className={[
                "rounded-xl px-4 py-3 text-center text-sm font-semibold",
                errorMessage
                  ? "bg-rose-500/20 text-rose-200"
                  : "bg-[#ffe89c]/20 text-[#ffe89c]",
              ].join(" ")}
            >
              {errorMessage ?? message}
            </div>
          )}

          <div className="flex w-full flex-col items-center gap-4">
            {solvedGroups.map((group) => (
              <div
                key={group.id}
                className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0f0a2b]/70 px-6 py-4 text-center text-[#fdf7f7]"
              >
                <h2 className="text-lg font-semibold text-[#ffe89c]">
                  {group.title}
                </h2>
                <p className="mt-2 text-sm text-[#fdf7f7]/80">
                  {group.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ConnectionsGameView;


