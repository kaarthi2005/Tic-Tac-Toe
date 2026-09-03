import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Scores, Player } from "../types/game";

interface ScoreBoardProps {
  scores: Scores;
  currentPlayer: Player;
  isGameOver: boolean;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  scores,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.scoreItem}>
        <Text style={[styles.label, styles.xLabel]}>X</Text>
        <Text style={styles.scoreValue}>{scores.X}</Text>
      </View>

      <View style={styles.scoreItem}>
        <Text style={styles.label}>Draw</Text>
        <Text style={styles.scoreValue}>{scores.draws}</Text>
      </View>

      <View style={styles.scoreItem}>
        <Text style={[styles.label, styles.oLabel]}>O</Text>
        <Text style={styles.scoreValue}>{scores.O}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
    marginVertical: 16,
  },
  scoreItem: {
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 4,
  },
  xLabel: {
    color: "#e74c3c",
  },
  oLabel: {
    color: "#3498db",
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default React.memo(ScoreBoard);
