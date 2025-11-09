"use client";

import type { FC } from "react";
import { DoorModel } from "@/models/door";
import { DoorContentView } from "@/components/door/DoorContentView";
import { WordleGameView } from "@/components/door/games/WordleGameView";
import { CrosswordGameView } from "@/components/door/games/CrosswordGameView";

interface DoorGameViewProps {
  door: DoorModel;
}

export const DoorGameView: FC<DoorGameViewProps> = ({ door }) => {
  if (door.gameType === "wordle" && door.wordleConfig) {
    return <WordleGameView door={door} />;
  }

  if (door.gameType === "crossword" && door.crosswordConfig) {
    return <CrosswordGameView door={door} />;
  }

  return <DoorContentView door={door} />;
};

