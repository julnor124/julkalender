import { CrosswordConfig } from "./crossword";
import { WordleConfig } from "./wordle";

export interface DoorTriviaConfig {
  question: string;
  answer: string;
}

export interface DoorHeardleConfig {
  audioSrc: string;
  revealDurations: number[];
  solution: string;
  artist: string;
  acceptedAnswers?: string[];
  videoUrl?: string;
}

export interface DoorOnTheTrackLevel {
  points: number;
  clue: string;
  image: string;
}

export interface DoorOnTheTrackConfig {
  levels: DoorOnTheTrackLevel[];
  answer: string;
  acceptedAnswers?: string[];
}

export interface DoorRebusConfig {
  prompt: string;
  solution: string;
  acceptedAnswers?: string[];
  hint?: string;
}

export type DoorGameType =
  | "content"
  | "wordle"
  | "crossword"
  | "pixel"
  | "connections"
  | "julfraga"
  | "heardle"
  | "on-the-track"
  | "rebus";

export interface DoorModel {
  id: number;
  title: string;
  description: string;
  password: string;
  gameSlug: string;
  gameType: DoorGameType;
  wordleConfig?: WordleConfig;
  crosswordConfig?: CrosswordConfig;
  triviaConfig?: DoorTriviaConfig;
  heardleConfig?: DoorHeardleConfig;
  onTheTrackConfig?: DoorOnTheTrackConfig;
  rebusConfig?: DoorRebusConfig;
}

export interface DoorLayoutRow {
  doorIds: number[];
}

