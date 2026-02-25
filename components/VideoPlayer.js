import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import Slider from "@react-native-community/slider";

const { width } = Dimensions.get("window");

const VIDEO_LIST = [
  {
    id: "1",
    title: "Big Buck Bunny",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: "2",
    title: "Elephant Dream",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: "3",
    title: "For Bigger Blazes",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "4",
    title: "Sintel",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
  {
    id: "5",
    title: "Tears of Steel",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
];

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(VIDEO_LIST[0]);

  const handlePlay = async () => {
    await videoRef.current.playAsync();
    setIsPlaying(true);
  };

  const handlePause = async () => {
    await videoRef.current.pauseAsync();
    setIsPlaying(false);
  };

  const handleStop = async () => {
    await videoRef.current.stopAsync();
    setIsPlaying(false);
  };

  const handleSeek = async (value) => {
    if (videoRef.current && status.durationMillis) {
      await videoRef.current.setPositionAsync(value);
    }
  };

  const handleVideoSelect = async (video) => {
    setCurrentVideo(video);
    setIsPlaying(false);
    if (videoRef.current) {
      await videoRef.current.stopAsync();
      await videoRef.current.unloadAsync();
    }
  };

  const formatTime = (millis) => {
    if (!millis) return "0:00";
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.videoItem,
        currentVideo.id === item.id && styles.videoItemActive,
      ]}
      onPress={() => handleVideoSelect(item)}
    >
      <Text
        style={[
          styles.videoTitle,
          currentVideo.id === item.id && styles.videoTitleActive,
        ]}
      >
        {item.title}
      </Text>
      {currentVideo.id === item.id && (
        <View style={styles.playingIndicator}>
          <Text style={styles.playingText}>▶</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: currentVideo.uri }}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            onPlaybackStatusUpdate={(status) => setStatus(status)}
            useNativeControls={false}
          />
        </View>

        <Text style={styles.currentVideoTitle}>{currentVideo.title}</Text>

        <View style={styles.controls}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {formatTime(status.positionMillis)}
            </Text>
            <Text style={styles.timeText}>
              {formatTime(status.durationMillis)}
            </Text>
          </View>

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={status.durationMillis || 0}
            value={status.positionMillis || 0}
            onSlidingComplete={handleSeek}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#D1D1D6"
            thumbTintColor="#007AFF"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.controlButton, styles.playButton]}
              onPress={handlePlay}
              disabled={isPlaying}
            >
              <Text style={styles.controlButtonText}>▶ Play</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.pauseButton]}
              onPress={handlePause}
              disabled={!isPlaying}
            >
              <Text style={styles.controlButtonText}>⏸ Pause</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.stopButton]}
              onPress={handleStop}
            >
              <Text style={styles.controlButtonText}>⏹ Stop</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.playlistContainer}>
          <Text style={styles.playlistTitle}>Video Playlist</Text>
          <FlatList
            data={VIDEO_LIST}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  videoContainer: {
    width: width - 40,
    height: (width - 40) * (9 / 16),
    backgroundColor: "#000",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  currentVideoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
  },
  controls: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  timeText: {
    color: "#8E8E93",
    fontSize: 14,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  controlButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  playButton: {
    backgroundColor: "#34C759",
  },
  pauseButton: {
    backgroundColor: "#FF9500",
  },
  stopButton: {
    backgroundColor: "#FF3B30",
  },
  controlButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  playlistContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  playlistTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
  },
  videoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
  },
  videoItemActive: {
    backgroundColor: "#007AFF",
  },
  videoTitle: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  videoTitleActive: {
    color: "#fff",
    fontWeight: "600",
  },
  playingIndicator: {
    marginLeft: 10,
  },
  playingText: {
    color: "#fff",
    fontSize: 16,
  },
});
