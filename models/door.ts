import { CrosswordConfig } from "./crossword";
import { WordleConfig } from "./wordle";

export type DoorGameType = "content" | "wordle" | "crossword";

export interface DoorModel {
  id: number;
  title: string;
  description: string;
  password: string;
  gameSlug: string;
  gameType: DoorGameType;
  wordleConfig?: WordleConfig;
  crosswordConfig?: CrosswordConfig;
}

export interface DoorLayoutRow {
  doorIds: number[];
}

