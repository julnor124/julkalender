export type CrosswordDirection = "across" | "down";

export interface CrosswordEntry {
  id: string;
  number: number;
  clue: string;
  answer: string;
  row: number;
  col: number;
  direction: CrosswordDirection;
}

export interface CrosswordConfig {
  rows: number;
  cols: number;
  instructions?: string;
  entries: CrosswordEntry[];
}


