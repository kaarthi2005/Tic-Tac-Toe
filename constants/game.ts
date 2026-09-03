import { Board, Scores } from "../types/game";

/**
 * All 8 possible winning combinations (indices into the flat board array).
 * Rows, columns, and diagonals.
 */
export const WINNING_PATTERNS: readonly number[][] = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
] as const;

/**
 * A fresh, empty board (9 null cells).
 */
export const INITIAL_BOARD: Board = [
  null, null, null,
  null, null, null,
  null, null, null,
];

/**
 * Starting scores — all zeros.
 */
export const INITIAL_SCORES: Scores = {
  X: 0,
  O: 0,
  draws: 0,
};

/**
 * Board dimensions.
 */
export const BOARD_SIZE = 3;
