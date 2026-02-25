import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1.0);

  const soundRef = useRef(null);

  const audioFile = require("../assets/audio.mp3");

  useEffect(() => {
    loadAudio();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const loadAudio = async () => {
    try {
      setIsLoading(true);

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        audioFile,
        { shouldPlay: false, volume: volume },
        onAudioUpdate
      );

      soundRef.current = sound;

      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setDuration(status.durationMillis || 0);
      }
    } catch (error) {
      console.log("Error loading audio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onAudioUpdate = (status) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
      setIsPlaying(status.isPlaying);
    }
  };

  const playAudio = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
    }
  };

  const pauseAudio = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
    }
  };

  const stopAudio = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.setPositionAsync(0);
    }
  };

  const seekAudio = async (value) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value);
    }
  };

  const changeVolume = async (value) => {
    setVolume(value);
    if (soundRef.current) {
      await soundRef.current.setVolumeAsync(value);
    }
  };

  const formatTime = (milliseconds) => {
    if (!milliseconds) return "0:00";

    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Ionicons name="musical-notes" size={32} color="#007AFF" />
        <Text style={styles.fileName}>audio.mp3</Text>
        <Text style={styles.duration}>Duration: {formatTime(duration)}</Text>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration || 1}
          value={position}
          onSlidingComplete={seekAudio}
          minimumTrackTintColor="#007AFF"
          maximumTrackTintColor="#E5E5EA"
          thumbTintColor="#007AFF"
          disabled={isLoading}
        />
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={stopAudio}
          disabled={isLoading}
        >
          <Ionicons name="stop" size={28} color="#FF3B30" />
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playButton}
          onPress={isPlaying ? pauseAudio : playAudio}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={40}
              color="#FFFFFF"
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={loadAudio}
          disabled={isLoading}
        >
          <Ionicons name="refresh" size={28} color="#007AFF" />
          <Text style={styles.buttonText}>Reload</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.volumeSection}>
        <View style={styles.volumeRow}>
          <Ionicons name="volume-low" size={20} color="#666" />
          <Slider
            style={styles.volumeSlider}
            minimumValue={0}
            maximumValue={1}
            value={volume}
            onValueChange={changeVolume}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#E5E5EA"
            thumbTintColor="#007AFF"
          />
          <Ionicons name="volume-high" size={20} color="#666" />
        </View>
        <Text style={styles.volumeText}>
          Volume: {Math.round(volume * 100)}%
        </Text>
      </View>

      <View style={styles.statusSection}>
        {isLoading ? (
          <>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.statusText}>Loading audio...</Text>
          </>
        ) : (
          <View style={styles.statusRow}>
            <Ionicons
              name={isPlaying ? "play-circle" : "pause-circle"}
              size={20}
              color={isPlaying ? "#34C759" : "#FF9500"}
            />
            <Text style={styles.statusText}>
              {isPlaying ? "Playing" : "Ready to play"}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  infoBox: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
    width: width * 0.9,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
  duration: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  progressSection: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  timeText: {
    fontSize: 14,
    color: "#666",
    minWidth: 50,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 30,
  },
  controlButton: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  buttonText: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
  },
  volumeSection: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 15,
    width: width * 0.85,
    marginBottom: 30,
  },
  volumeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  volumeSlider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  volumeText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  statusSection: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 15,
    width: width * 0.85,
    marginBottom: 30,
    alignItems: "center",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
  instructions: {
    backgroundColor: "#E8F4FF",
    padding: 20,
    borderRadius: 15,
    width: width * 0.85,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },
});
