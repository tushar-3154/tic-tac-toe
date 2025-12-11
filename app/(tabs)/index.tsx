import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const emptyBoard = ["", "", "", "", "", "", "", "", ""];
  const [board, setBoard] = useState(emptyBoard);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const handlePress = (index) => {
    if (board[index] !== "" || winner) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    checkWinner(newBoard);

    setPlayer(player === "X" ? "O" : "X");
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes("")) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(emptyBoard);
    setPlayer("X");
    setWinner(null);
  };

  return (
    <LinearGradient colors={["#0f0c29", "#302b63", "#24243e"]} style={styles.container}>
      <Text style={styles.title}>✨ Tic Tac Toe ✨</Text>

      <Text style={styles.turnText}>
        {winner ? (winner === "Draw" ? "Game Draw!" : `Winner: ${winner}`) : `Turn: ${player}`}
      </Text>

      <View style={styles.board}>
        {board.map((value, index) => (
          <TouchableOpacity key={index} style={styles.cell} onPress={() => handlePress(index)}>
            <Text style={[styles.cellText, value === "X" ? styles.xText : styles.oText]}>
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {winner && (
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <LinearGradient colors={["#ff6a00", "#ee0979"]} style={styles.resetGradient}>
            <Text style={styles.resetText}>Play Again</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 38,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textShadowColor: "#ff0080",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  turnText: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "600",
  },
  board: {
    width: 330,
    height: 330,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    backdropFilter: "blur(10px)",
  },
  cell: {
    width: "33.33%",
    height: "33.33%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  cellText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  xText: {
    color: "#00eaff",
    textShadowColor: "#00eaff",
    textShadowRadius: 15,
  },
  oText: {
    color: "#ff007f",
    textShadowColor: "#ff007f",
    textShadowRadius: 15,
  },
  resetButton: {
    marginTop: 30,
  },
  resetGradient: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
  },
  resetText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
