import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import { Player, Board as BoardType, Scores } from "./types/game";
import {
  WINNING_PATTERNS,
  INITIAL_BOARD,
  INITIAL_SCORES,
} from "./constants/game";

function checkWinner(
  board: BoardType
): { winner: Player; winningCells: number[] } | null {
  for (const pattern of WINNING_PATTERNS) {
    const [a, b, c] = pattern;
    if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
      return { winner: board[a] as Player, winningCells: pattern };
    }
  }
  return null;
}

function checkDraw(board: BoardType): boolean {
  return board.every((cell) => cell !== null);
}

export default function App(): React.JSX.Element {
  const [board, setBoard] = useState<BoardType>([...INITIAL_BOARD]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const [scores, setScores] = useState<Scores>({ ...INITIAL_SCORES });
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const handleCellPress = useCallback(
    (index: number): void => {
      if (board[index] !== null || isGameOver) return;

      const newBoard: BoardType = [...board] as BoardType;
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const result = checkWinner(newBoard);
      if (result) {
        setWinner(result.winner);
        setWinningCells(result.winningCells);
        setIsGameOver(true);
        setScores((prev) => ({
          ...prev,
          [result.winner]: prev[result.winner] + 1,
        }));
        return;
      }

      if (checkDraw(newBoard)) {
        setIsDraw(true);
        setIsGameOver(true);
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
        return;
      }

      setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    },
    [board, currentPlayer, isGameOver]
  );

  const handlePlayAgain = useCallback((): void => {
    setBoard([...INITIAL_BOARD]);
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
    setWinningCells([]);
    setIsGameOver(false);
  }, []);

  const handleNewGame = useCallback((): void => {
    handlePlayAgain();
    setScores({ ...INITIAL_SCORES });
  }, [handlePlayAgain]);

  const getStatusMessage = (): string => {
    if (winner) return `Player ${winner} wins!`;
    if (isDraw) return "It's a draw!";
    return `Player ${currentPlayer}'s turn`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.container}>
        <Text style={styles.title}>Tic-Tac-Toe</Text>

        <ScoreBoard
          scores={scores}
          currentPlayer={currentPlayer}
          isGameOver={isGameOver}
        />

        <Text style={[
          styles.status,
          winner === "X" && styles.xColor,
          winner === "O" && styles.oColor,
          !winner && !isDraw && currentPlayer === "X" && styles.xColor,
          !winner && !isDraw && currentPlayer === "O" && styles.oColor,
        ]}>
          {getStatusMessage()}
        </Text>

        <Board
          board={board}
          winningCells={winningCells}
          isGameOver={isGameOver}
          onCellPress={handleCellPress}
        />

        <View style={styles.buttonRow}>
          <Pressable style={styles.button} onPress={handlePlayAgain}>
            <Text style={styles.buttonText}>Play Again</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.outlineButton]}
            onPress={handleNewGame}
          >
            <Text style={[styles.buttonText, styles.outlineButtonText]}>
              New Game
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  status: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginVertical: 14,
  },
  xColor: {
    color: "#e74c3c",
  },
  oColor: {
    color: "#3498db",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 28,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    backgroundColor: "#333",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#333",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  outlineButtonText: {
    color: "#333",
  },
});
