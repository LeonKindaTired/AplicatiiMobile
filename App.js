import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import AudioPlayer from "./components/AudioPlayer";
import VideoPlayer from "./components/VideoPlayer";
import Chronometer from "./components/Chronometer";
import GridViewLab from "./components/GridViewLab";
import CountrySpinner from "./components/CountrySpinner";
import MenuButton from "./components/MenuButton"; // combined popup/context
import OverflowMenuLab from "./components/OverflowMenuLab"; // new

export default function App() {
  const [playerType, setPlayerType] = useState(null);
  const [overflowMenuVisible, setOverflowMenuVisible] = useState(false); // for modal

  if (!playerType) {
    return (
      <View style={styles.container}>
        <View style={styles.choiceContainer}>
          <Text style={styles.title}>Choose Component</Text>

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

          <TouchableOpacity
            style={[styles.button, styles.buttonGrid]}
            onPress={() => setPlayerType("grid")}
          >
            <Text style={styles.buttonText}>📱 Grid View</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSpinner]}
            onPress={() => setPlayerType("spinner")}
          >
            <Text style={styles.buttonText}>🌍 Country Spinner</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonPopup]}
            onPress={() => setPlayerType("popup")}
          >
            <Text style={styles.buttonText}>📋 Popup Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonContext]}
            onPress={() => setPlayerType("context")}
          >
            <Text style={styles.buttonText}>📌 Context Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonOverflow]}
            onPress={() => setPlayerType("overflow")}
          >
            <Text style={styles.buttonText}>🎨 Overflow Menu</Text>
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
        {playerType === "overflow" && (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setOverflowMenuVisible(true)}
          >
            <Text style={styles.menuIcon}>⋮</Text>
          </TouchableOpacity>
        )}
      </View>

      {playerType === "audio" ? (
        <AudioPlayer />
      ) : playerType === "video" ? (
        <VideoPlayer />
      ) : playerType === "chronometer" ? (
        <Chronometer />
      ) : playerType === "grid" ? (
        <GridViewLab />
      ) : playerType === "spinner" ? (
        <CountrySpinner />
      ) : playerType === "spinner" ? (
        <RouletteSpinner />
      ) : playerType === "popup" ? (
        <MenuButton trigger="press" />
      ) : playerType === "context" ? (
        <MenuButton trigger="longPress" />
      ) : playerType === "overflow" ? (
        <OverflowMenuLab
          modalVisible={overflowMenuVisible}
          setModalVisible={setOverflowMenuVisible}
        />
      ) : null}

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
  buttonGrid: {
    backgroundColor: "#34C759",
  },
  buttonSpinner: {
    backgroundColor: "#AF52DE",
  },
  buttonPopup: {
    backgroundColor: "#FF3B30",
  },
  buttonContext: {
    backgroundColor: "#5856D6",
  },
  buttonOverflow: {
    backgroundColor: "#FF9500", // orange
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#F2F2F7",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
