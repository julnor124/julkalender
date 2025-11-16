"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { DoorModel } from "@/models/door";
import { WordleGameView } from "@/components/door/games/WordleGameView";
import RebusGameView from "@/components/door/games/RebusGameView";
import OnTheTrackGameView from "@/components/door/games/OnTheTrackGameView";
import MusicVideoGuessGameView from "@/components/door/games/MusicVideoGuessGameView";
import HeardleGameView from "@/components/door/games/HeardleGameView";

interface EscapeRoomGameViewProps {
  door: DoorModel;
}

const EscapeRoomGameView = ({ door }: EscapeRoomGameViewProps) => {
  const [stage, setStage] = useState(0);
  const [canAdvance, setCanAdvance] = useState(false);

  useEffect(() => {
    // Reset canAdvance when stage changes
    setCanAdvance(false);
  }, [stage]);

  const {
    wordleDoor,
    rebusDoor,
    trackDoor,
    grinchDoor,
    heardleDoor,
  } = useMemo(() => {
    const base: Pick<
      DoorModel,
      "id" | "title" | "description" | "password" | "gameSlug" | "gameType"
    > = {
      id: door.id,
      title: door.title,
      description: door.description,
      password: door.password,
      gameSlug: door.gameSlug,
      gameType: door.gameType,
    };

    const wordleDoor: DoorModel = {
      ...base,
      gameType: "wordle",
      gameSlug: "final-wordle",
      wordleConfig: {
        solution: "julen",
        maxGuesses: 6,
        instructions:
          "Första utmaningen – gissa julordet! (Precis som i första luckan.)",
      },
    };

    const rebusDoor: DoorModel = {
      ...base,
      gameType: "rebus",
      gameSlug: "final-rebus",
      rebusConfig: {
        prompt: "🎄 + 👶 + 🌃\n\nVilken dag tänker vi på?",
        solution: "Julafton",
        acceptedAnswers: ["Julafton", "julafton", "julaftonen"],
      },
    };

    const trackDoor: DoorModel = {
      ...base,
      gameType: "on-the-track",
      gameSlug: "final-pa-sparet",
      onTheTrackConfig: {
        answer: "Falkenberg",
        acceptedAnswers: ["Falkenberg", "falkenberg"],
        levels: [
          {
            points: 10,
            image: "/images/falkenberg10.png",
            clue:
              "Vi lämnar riksbekant handelsplats och färdas i farstufågeln och hårginstens region mot centralort med egen strand, avslutningen är en hög med buskar.",
          },
          {
            points: 8,
            image: "/images/falkenberg8.png",
            clue:
              "Vi tar tar sikte på pilgrimspippin som leder oss mot jamande vatten och staden man 2002 sa adjö till.",
          },
          {
            points: 6,
            image: "/images/falkenberg6.png",
            clue:
              "Denna buskisstad är känd för komiska stollar på Vallarna och Stellans skruvade bollar i hallarna.",
          },
          {
            points: 4,
            image: "/images/falkenberg4.png",
            clue:
              "I ramsan äter man i vår västkuststad och till maten kan en skummande Falcon bli aktuell.",
          },
          {
            points: 2,
            image: "/images/falkenberg2.png",
            clue:
              "Nu rullar vi in i Hallands trea där en snabb fågel inleder.",
          },
        ],
      },
    };

    const grinchDoor: DoorModel = {
      ...base,
      gameType: "musicvideo",
      gameSlug: "gissa-filmen",
      musicVideoConfig: {
        images: [
          "/images/grinch1.png",
          "/images/grinch2.png",
          "/images/grinch3.png",
          "/images/grinch4.png",
          "/images/grinch5.png",
          "/images/grinch6.png",
        ],
        solution: "The Grinch",
        acceptedAnswers: [
          "The Grinch",
          "the grinch",
          "Grinchen",
          "grinchen",
          "Grinch",
          "grinch",
          "How the Grinch Stole Christmas",
          "how the grinch stole christmas",
        ],
      },
    };

    const heardleDoor: DoorModel = {
      ...base,
      gameType: "heardle",
      gameSlug: "final-heardle",
      heardleConfig: {
        audioSrc: "/audio/alliwantforchristmas.mp4",
        revealDurations: [2, 1, 2, 3, 4, 5],
        solution: "All I Want for Christmas Is You",
        artist: "Mariah Carey",
        acceptedAnswers: [
          "All I Want for Christmas Is You",
          "All I Want for Christmas",
        ],
        videoUrl:
          "https://www.youtube-nocookie.com/embed/yXQViqx6GMY?autoplay=1&start=0",
      },
    };

    return { wordleDoor, rebusDoor, trackDoor, grinchDoor, heardleDoor };
  }, [door]);

  let content: JSX.Element;

  if (stage === 0) {
    content = (
      <WordleGameView door={wordleDoor} onSolved={() => setCanAdvance(true)} />
    );
  } else if (stage === 1) {
    content = (
      <RebusGameView door={rebusDoor} onSolved={() => setCanAdvance(true)} />
    );
  } else if (stage === 2) {
    content = (
      <OnTheTrackGameView door={trackDoor} onSolved={() => setCanAdvance(true)} />
    );
  } else if (stage === 3) {
    content = (
      <MusicVideoGuessGameView
        door={grinchDoor}
        onSolved={() => setCanAdvance(true)}
      />
    );
  } else if (stage === 4) {
    content = (
      <HeardleGameView door={heardleDoor} onSolved={() => setCanAdvance(true)} />
    );
  } else {
    // Final: godjul YouTube video
    content = (
      <div className="min-h-screen bg-gradient-to-b from-[#040111] via-[#150b3a] to-[#260f5e] text-[#fdf7f7] font-festive">
        <div className="snow pointer-events-none" />

        <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center px-4 pb-20 pt-16">
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl text-[#F9DADA] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              {door.title}
            </h1>
            <p className="mt-3 text-base md:text-lg text-[#F9DADA]/80 max-w-2xl mx-auto">
              GOD JUL TACK FÖR ATT NI DELTAGIT I KALENDERN! Detta är min lilla present till er i år, lite minnen från året
            </p>
          </header>

          <section className="flex w-full flex-col items-center gap-8">
            <div className="w-full max-w-[640px]">
              <div className="w-full h-[220px] md:h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_24px_50px_rgba(0,0,0,0.7)]">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube-nocookie.com/embed/SKXn3xnUqHQ?autoplay=1&start=0"
                  title="God Jul"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="mt-4 text-sm text-[#ffe89c]/85 text-center">
                God jul, ni är bäst. 💛
              </p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  const buttonElement = stage < 5 ? (
    <div className="bottom-6 left-0 right-0 z-[99999] flex justify-center px-4">
      <button
        type="button"
        onClick={() => setStage((prev) => Math.min(prev + 1, 5))}
        disabled={!canAdvance}
        className={`rounded-full px-8 py-4 text-base font-semibold uppercase tracking-wide text-[#1b0f3d] shadow-[0_10px_30px_rgba(0,0,0,0.55)] transition ${
          canAdvance
            ? "bg-[#ffe89c] hover:bg-[#ffd45c] hover:scale-105 cursor-pointer"
            : "bg-[#ffe89c]/40 opacity-50 cursor-not-allowed"
        }`}
      >
        Fortsätt till nästa del →
      </button>
    </div>
  ) : null;

  return (
    <>
      {content}
      {typeof window !== "undefined" &&
        buttonElement &&
        createPortal(buttonElement, document.body)}
    </>
  );
};

export default EscapeRoomGameView;


