import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import { Cell } from "../types/game";

interface SquareProps {
  value: Cell;
  onPress: () => void;
  isWinning: boolean;
  disabled: boolean;
}

const Square: React.FC<SquareProps> = ({
  value,
  onPress,
  isWinning,
  disabled,
}) => {
  return (
    <Pressable
      style={[
        styles.cell,
        isWinning && styles.winningCell,
      ]}
      onPress={onPress}
      disabled={disabled || value !== null}
      accessibilityRole="button"
      accessibilityLabel={value ? `Cell with ${value}` : "Empty cell"}
    >
      <Text
        style={[
          styles.cellText,
          value === "X" && styles.xText,
          value === "O" && styles.oText,
        ]}
      >
        {value ?? ""}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  winningCell: {
    backgroundColor: "#d4edda",
  },
  cellText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  xText: {
    color: "#e74c3c",
  },
  oText: {
    color: "#3498db",
  },
});

export default React.memo(Square);
