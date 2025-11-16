import { CrosswordConfig } from "./crossword";
import { WordleConfig } from "./wordle";

export interface DoorTriviaConfig {
  question: string;
  answer: string;
}

export interface DoorTriviaQuizQuestion {
  question: string;
  options: string[];
  correctOption: number;
}

export interface DoorTriviaQuizConfig {
  questions: DoorTriviaQuizQuestion[];
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
  videoUrl?: string;
}

export interface DoorRebusConfig {
  prompt: string;
  solution: string;
  acceptedAnswers?: string[];
  hint?: string;
}

export interface DoorFlagGuessConfig {
  image: string;
  solution: string;
  acceptedAnswers?: string[];
  guessType?: "land" | "capital";
}

export interface DoorMusicVideoConfig {
  images: string[];
  solution: string;
  acceptedAnswers?: string[];
  videoUrl?: string;
}

export interface DoorConnectionsGroup {
  id: string;
  title: string;
  description: string;
  words: string[];
}

export interface DoorConnectionsConfig {
  groups: DoorConnectionsGroup[];
}

export interface DoorPixelGuessConfig {
  image: string;
  solution: string;
  acceptedAnswers?: string[];
  placeholder?: string;
  successMessage?: string;
  revealMessage?: string;
}

export interface DoorHistoryEvent {
  image: string;
  year: number;
  description: string;
  title: string;
  acceptedYears?: number[];
}

export interface DoorHistoryGuessConfig {
  events: DoorHistoryEvent[];
}

export type DoorGameType =
  | "content"
  | "wordle"
  | "crossword"
  | "pixel"
  | "pixel-movie"
  | "connections"
  | "julfraga"
  | "trivia-quiz"
  | "heardle"
  | "on-the-track"
  | "rebus"
  | "flag"
  | "musicvideo"
  | "escape"
  | "history-guess";

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
  triviaQuizConfig?: DoorTriviaQuizConfig;
  heardleConfig?: DoorHeardleConfig;
  onTheTrackConfig?: DoorOnTheTrackConfig;
  rebusConfig?: DoorRebusConfig;
  flagGuessConfig?: DoorFlagGuessConfig;
  musicVideoConfig?: DoorMusicVideoConfig;
  connectionsConfig?: DoorConnectionsConfig;
  pixelGuessConfig?: DoorPixelGuessConfig;
  historyGuessConfig?: DoorHistoryGuessConfig;
}

export interface DoorLayoutRow {
  doorIds: number[];
}

