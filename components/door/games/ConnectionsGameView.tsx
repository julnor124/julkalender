"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DoorConnectionsGroup, DoorModel } from "@/models/door";
import PopupMessage from "@/components/ui/PopupMessage";

interface WordState {
  word: string;
  groupId: string;
}

const DEFAULT_GROUPS: DoorConnectionsGroup[] = [
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

interface ConnectionsGameViewProps {
  door: DoorModel;
}

export const ConnectionsGameView = ({ door }: ConnectionsGameViewProps) => {
  const groupsFromDoor = door.connectionsConfig?.groups ?? [];

  const puzzleGroups = useMemo<DoorConnectionsGroup[]>(() => {
    if (groupsFromDoor.length > 0) {
      return groupsFromDoor;
    }
    return DEFAULT_GROUPS;
  }, [groupsFromDoor]);

  const baseWords = useMemo<WordState[]>(() => {
    return puzzleGroups.flatMap((group) =>
      group.words.map((word) => ({
        word,
        groupId: group.id,
      }))
    );
  }, [puzzleGroups]);

  const shuffleWords = useCallback((words: WordState[]) => {
    const copy = [...words];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, []);

  const [availableWords, setAvailableWords] = useState<WordState[]>(baseWords);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [solvedGroups, setSolvedGroups] = useState<DoorConnectionsGroup[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [messageTone, setMessageTone] = useState<"status" | "error">("status");
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [remainingErrors, setRemainingErrors] = useState<number>(MAX_ERRORS);
  const [shakeSelection, setShakeSelection] = useState(false);
  useEffect(() => {
    if (!hintMessage) {
      return;
    }
    const timer = window.setTimeout(() => {
      setHintMessage(null);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [hintMessage]);

  useEffect(() => {
    setAvailableWords(shuffleWords(baseWords));
    setSelectedWords([]);
    setSolvedGroups([]);
    setMessage(null);
    setMessageTone("status");
    setHintMessage(null);
    setRemainingErrors(MAX_ERRORS);
    setShakeSelection(false);
  }, [baseWords, shuffleWords]);

  const handleWordClick = (word: string) => {
    if (message && solvedGroups.length < puzzleGroups.length) {
      setMessage(null);
      setMessageTone("status");
    }
    if (hintMessage) {
      setHintMessage(null);
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
    setSolvedGroups((prev) => {
      const solvedIds = new Set(prev.map((group) => group.id));
      const remaining = puzzleGroups.filter((group) => !solvedIds.has(group.id));
      return [...prev, ...remaining];
    });
    setAvailableWords([]);
    setSelectedWords([]);
  };

  const checkSelection = () => {
    if (selectedWords.length !== 4) {
      setMessage("Välj fyra ord innan du gissar.");
      setMessageTone("error");
      return;
    }

    const counts = puzzleGroups.map((group) => {
      const count = selectedWords.filter((word) =>
        group.words.includes(word)
      ).length;
      return { group, count };
    });

    const matched = counts.find(({ count }) => count === 4);

    if (matched) {
      setSolvedGroups((prev) => [...prev, matched.group]);
      setAvailableWords((prev) =>
        prev.filter((entry) => entry.groupId !== matched.group.id)
      );
      setSelectedWords([]);
      setMessage(`Rätt! Grupp: ${matched.group.title}`);
      setMessageTone("status");
      if (solvedGroups.length + 1 === puzzleGroups.length) {
        setMessage("Du löste alla grupper! 🎉");
        setMessageTone("status");
      }
      return;
    }

    const almost = counts.filter(({ count }) => count === 3);

    if (almost.length > 0) {
      const hintText =
        almost.length === 1
          ? `One away... du är nära ${almost[0].group.title.toLowerCase()}`
          : "One away...";
      setMessage(null);
      setHintMessage(hintText);
      setMessageTone("status");
    } else {
      setMessage("Fel grupp!");
      setMessageTone("error");
    }

    const nextErrors = remainingErrors - 1;
    setRemainingErrors(nextErrors);

    if (nextErrors <= 0) {
      setMessage("Inga gissningar kvar! Här är lösningarna.");
      setMessageTone("status");
      revealRemainingGroups();
      setShakeSelection(false);
    } else {
      setShakeSelection(true);
      window.setTimeout(() => setShakeSelection(false), 600);
    }
  };

  const isGameOver =
    remainingErrors <= 0 || solvedGroups.length === puzzleGroups.length;

  const cellBaseClasses =
    "min-w-[150px] rounded-xl border px-4 py-[14px] text-center text-sm font-semibold uppercase tracking-wide transition shadow-[0_12px_30px_rgba(13,9,40,0.35)]";
  const availableButtonClasses =
    "bg-[#120b36]/90 border-[#46308d]/80 text-[#f8f4ff] hover:border-[#ffe7a7] hover:bg-[#1d1354]/90";
  const selectedButtonClasses = "bg-[#ffe89c]/95 border-[#ffe89c] text-[#1b0f3d]";
  const solvedButtonClasses = "bg-[#0a0a2d]/80 border-[#1f124d]/70 text-[#877ad1]/80";

  return (
    <>
      <style jsx global>{`
        @keyframes connections-shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20%,
          60% {
            transform: translateX(-6px);
          }
          40%,
          80% {
            transform: translateX(6px);
          }
        }

        .connections-shake {
          animation: connections-shake 0.45s ease;
        }

        @keyframes connections-fade-out {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          60% {
            opacity: 1;
            transform: scale(1.03);
          }
          100% {
            opacity: 0;
            transform: scale(0.95);
          }
        }

        .animate-connections-fade-out {
          animation: connections-fade-out 3s ease-in-out forwards;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-b from-[#060518] via-[#150b3f] to-[#210d5d] text-[#fdf7f7] font-festive">
      <div className="snow pointer-events-none" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-4 pb-24 pt-16">
        <header className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.7em] text-[#ffe3b0]/80">Lucka {door.id}</p>
          <h1 className="mt-3 text-3xl sm:text-4xl text-[#F9DADA] drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)]">
            {door.title}
          </h1>
          <p className="mt-3 text-base md:text-lg text-[#F9DADA]/80 max-w-3xl mx-auto">
            {door.description}
          </p>
        </header>

        <section className="flex w-full flex-col items-center gap-10">
          <div className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {availableWords.map((entry) => {
              const isSelected = selectedWords.includes(entry.word);
              const isSolved = solvedGroups.some(
                (group) => group.id === entry.groupId
              );
              return (
                <button
                  key={entry.word}
                  type="button"
                  onClick={() => handleWordClick(entry.word)}
                  disabled={isGameOver}
                  className={[
                    cellBaseClasses,
                    isSolved
                      ? solvedButtonClasses
                      : isSelected
                      ? selectedButtonClasses
                      : availableButtonClasses,
                    isSelected && shakeSelection ? "connections-shake" : "",
                    isGameOver ? "cursor-not-allowed opacity-60" : "",
                  ].join(" ")}
                >
                  {entry.word}
                </button>
              );
            })}
          </div>

          <div className="flex w-full max-w-xl flex-col items-center gap-2 rounded-2xl border border-[#362275]/50 bg-[#0d0a2b]/70 px-6 py-4 text-sm text-[#F9DADA]/75">
            <p>
              <span className="font-semibold text-[#ffe89c]">Markerade ord:</span>{" "}
              {selectedWords.length} / 4
            </p>
            <p>
              <span className="font-semibold text-[#ffe89c]">Gissningar kvar:</span>{" "}
              {remainingErrors}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={checkSelection}
              disabled={isGameOver}
              className="rounded-full bg-[#ffe89c] px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#1b0f3d] transition hover:bg-[#ffd45c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Kontrollera grupp
            </button>
            <button
              type="button"
              onClick={resetSelection}
              disabled={selectedWords.length === 0 || isGameOver}
              className="rounded-full bg-[#ffe89c] px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#1b0f3d] transition hover:bg-[#ffd45c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Avmarkera
            </button>
            <button
              type="button"
              onClick={() => {
                setAvailableWords(shuffleWords(availableWords));
                setSelectedWords([]);
                setShakeSelection(false);
                setHintMessage(null);
              }}
              disabled={isGameOver}
              className="rounded-full bg-[#ffe89c] px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#1b0f3d] transition hover:bg-[#ffd45c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Shuffle
            </button>
          </div>

          {message && (
            <div
              className={[
                "rounded-xl px-4 py-3 text-center text-sm font-semibold",
                messageTone === "error"
                  ? "bg-rose-500/20 text-rose-200"
                  : "bg-[#ffe89c]/20 text-[#ffe89c]",
              ].join(" ")}
            >
              {message}
            </div>
          )}

          <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
            {solvedGroups.map((group) => (
              <div
                key={group.id}
                className="rounded-2xl border border-[#ffe89c]/40 bg-[#22114b]/70 px-6 py-5 text-center text-[#fdf7f7] shadow-[0_16px_36px_rgba(15,10,50,0.35)]"
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

      <PopupMessage
        text={hintMessage ?? ""}
        onClose={() => setHintMessage(null)}
        duration={3000}
      />
    </>
  );
};

export default ConnectionsGameView;


