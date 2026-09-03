import React from "react";
import { View, StyleSheet } from "react-native";
import Square from "./Square";
import { Board as BoardType } from "../types/game";
import { BOARD_SIZE } from "../constants/game";

interface BoardProps {
  board: BoardType;
  winningCells: number[];
  isGameOver: boolean;
  onCellPress: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({
  board,
  winningCells,
  isGameOver,
  onCellPress,
}) => {
  const renderRows = (): React.ReactNode[] => {
    const rows: React.ReactNode[] = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
      const cells: React.ReactNode[] = [];

      for (let col = 0; col < BOARD_SIZE; col++) {
        const index = row * BOARD_SIZE + col;
        cells.push(
          <Square
            key={index}
            value={board[index]}
            isWinning={winningCells.includes(index)}
            disabled={isGameOver}
            onPress={() => onCellPress(index)}
          />
        );
      }

      rows.push(
        <View key={row} style={styles.row}>
          {cells}
        </View>
      );
    }

    return rows;
  };

  return <View style={styles.board}>{renderRows()}</View>;
};

const styles = StyleSheet.create({
  board: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
  },
});

export default React.memo(Board);
