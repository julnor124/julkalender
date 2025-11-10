"use client";

import type { FC } from "react";
import { DoorModel } from "@/models/door";
import { DoorContentView } from "@/components/door/DoorContentView";
import { WordleGameView } from "@/components/door/games/WordleGameView";
import { CrosswordGameView } from "@/components/door/games/CrosswordGameView";
import PixelGuessGame from "@/components/door/games/PixelGuessGame";
import MoviePixelGuessGame from "@/components/door/games/MoviePixelGuessGame";
import { ConnectionsGameView } from "@/components/door/games/ConnectionsGameView";
import TriviaGameView from "@/components/door/games/TriviaGameView";
import TriviaQuizGameView from "@/components/door/games/TriviaQuizGameView";
import HeardleGameView from "@/components/door/games/HeardleGameView";
import RebusGameView from "@/components/door/games/RebusGameView";
import OnTheTrackGameView from "@/components/door/games/OnTheTrackGameView";
import GuessTheFlagGameView from "@/components/door/games/GuessTheFlagGameView";

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

  if (door.gameType === "pixel") {
    return <PixelGuessGame />;
  }

  if (door.gameType === "pixel-movie") {
    return <MoviePixelGuessGame door={door} />;
  }

  if (door.gameType === "flag" && door.flagGuessConfig) {
    return <GuessTheFlagGameView door={door} />;
  }

  if (door.gameType === "connections") {
    return <ConnectionsGameView door={door} />;
  }

  if (door.gameType === "trivia-quiz" && door.triviaQuizConfig) {
    return <TriviaQuizGameView door={door} />;
  }

  if (door.gameType === "julfraga" && door.triviaConfig) {
    return <TriviaGameView door={door} />;
  }

  if (door.gameType === "heardle" && door.heardleConfig) {
    return <HeardleGameView door={door} />;
  }

  if (door.gameType === "on-the-track" && door.onTheTrackConfig) {
    return <OnTheTrackGameView door={door} />;
  }

  if (door.gameType === "rebus" && door.rebusConfig) {
    return <RebusGameView door={door} />;
  }

  return <DoorContentView door={door} />;
};

