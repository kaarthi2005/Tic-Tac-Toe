/**
 * Represents a player in the game.
 */
export type Player = "X" | "O";

/**
 * Represents a single cell on the board.
 * null means the cell is empty.
 */
export type Cell = Player | null;

/**
 * The board is a flat array of 9 cells (row-major order).
 * Index mapping:
 *   0 | 1 | 2
 *   ---------
 *   3 | 4 | 5
 *   ---------
 *   6 | 7 | 8
 */
export type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];

/**
 * Tracks win counts for each player and draws.
 */
export interface Scores {
  X: number;
  O: number;
  draws: number;
}

/**
 * Complete snapshot of the game at any point in time.
 */
export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  winningCells: number[];
  scores: Scores;
  isGameOver: boolean;
}
