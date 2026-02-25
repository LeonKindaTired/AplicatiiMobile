import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import AudioPlayer from "./components/AudioPlayer";
import VideoPlayer from "./components/VideoPlayer";
import Chronometer from "./components/Chronometer";

export default function App() {
  const [playerType, setPlayerType] = useState(null);

  if (!playerType) {
    return (
      <View style={styles.container}>
        <View style={styles.choiceContainer}>
          <Text style={styles.title}>Alege Tipul de Player</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setPlayerType("audio")}
          >
            <Text style={styles.buttonText}>🎵 Audio Player</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setPlayerType("video")}
          >
            <Text style={styles.buttonText}>🎬 Video Player</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonChronometer]}
            onPress={() => setPlayerType("chronometer")}
          >
            <Text style={styles.buttonText}>⏱ Chronometer</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setPlayerType(null)}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      {playerType === "audio" ? (
        <AudioPlayer />
      ) : playerType === "video" ? (
        <VideoPlayer />
      ) : (
        <Chronometer />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  choiceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#000",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonChronometer: {
    backgroundColor: "#FF9500",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
