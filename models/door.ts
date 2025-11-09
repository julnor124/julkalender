import { WordleConfig } from "./wordle";

export type DoorGameType = "content" | "wordle";

export interface DoorModel {
  id: number;
  title: string;
  description: string;
  password: string;
  gameSlug: string;
  gameType: DoorGameType;
  wordleConfig?: WordleConfig;
}

export interface DoorLayoutRow {
  doorIds: number[];
}

