import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function Chronometer() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const startTimeRef = useRef(null);
  const savedElapsedRef = useRef(0);
  const intervalRef = useRef(null);
  const lastLapTimeRef = useRef(0);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (ms) => {
    const centiseconds = Math.floor((ms % 1000) / 10);
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / 60000) % 60;
    const hours = Math.floor(ms / 3600000);
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
  };

  const handleStart = () => {
    if (running) return;
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setElapsed(savedElapsedRef.current + (Date.now() - startTimeRef.current));
    }, 10);
    setRunning(true);
  };

  const handleStop = () => {
    if (!running) return;
    clearInterval(intervalRef.current);
    savedElapsedRef.current = elapsed;
    setRunning(false);
  };

  const handleRestart = () => {
    clearInterval(intervalRef.current);
    savedElapsedRef.current = 0;
    lastLapTimeRef.current = 0;
    setElapsed(0);
    setLaps([]);
    setRunning(false);
  };

  const handleLap = () => {
    if (!running) return;
    const lapTime = elapsed - lastLapTimeRef.current;
    lastLapTimeRef.current = elapsed;
    setLaps((prev) => [
      { number: prev.length + 1, lapTime, totalTime: elapsed },
      ...prev,
    ]);
  };

  const getLapColor = () => null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏱ Chronometer</Text>

      <View style={[styles.display, running && styles.displayActive]}>
        <Text style={styles.timeText}>{formatTime(elapsed)}</Text>

        <Text style={styles.statusText}>
          {running ? "● RUNNING" : elapsed > 0 ? "⏸ PAUSED" : "○ READY"}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.btn, styles.btnStart]}
          onPress={handleStart}
          activeOpacity={0.75}
        >
          <Text style={styles.btnText}>▶ Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnStop]}
          onPress={handleStop}
          activeOpacity={0.75}
        >
          <Text style={styles.btnText}>■ Stop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnRestart]}
          onPress={handleRestart}
          activeOpacity={0.75}
        >
          <Text style={styles.btnText}>↺ Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnLap, !running && styles.btnDisabled]}
          onPress={handleLap}
          activeOpacity={running ? 0.75 : 1}
        >
          <Text style={styles.btnText}>⚑ Lap</Text>
        </TouchableOpacity>
      </View>

      {laps.length > 0 && (
        <View style={styles.lapsContainer}>
          <View style={styles.lapHeader}>
            <Text style={[styles.lapHeaderText, { flex: 0.5 }]}>Lap</Text>
            <Text
              style={[styles.lapHeaderText, { flex: 1, textAlign: "right" }]}
            >
              Timp
            </Text>
          </View>

          <ScrollView
            style={styles.lapScroll}
            showsVerticalScrollIndicator={false}
          >
            {laps.map((lap) => {
              const color = getLapColor(lap.lapTime);
              return (
                <View key={lap.number} style={styles.lapRow}>
                  <Text style={styles.lapNumber}>#{lap.number}</Text>
                  <Text style={styles.lapTotal}>
                    {formatTime(lap.totalTime)}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: "#F2F2F7",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
    letterSpacing: 1,
  },
  display: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    borderWidth: 3,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  displayActive: {
    borderColor: "#007AFF",
  },
  timeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    fontVariant: ["tabular-nums"],
    letterSpacing: 1,
  },
  lapCurrentText: {
    marginTop: 6,
    fontSize: 12,
    color: "#8E8E93",
    fontVariant: ["tabular-nums"],
    letterSpacing: 0.5,
  },
  statusText: {
    marginTop: 6,
    fontSize: 11,
    letterSpacing: 2,
    color: "#007AFF",
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  btn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  btnStart: { backgroundColor: "#34C759" },
  btnStop: { backgroundColor: "#FF3B30" },
  btnRestart: { backgroundColor: "#FF9500" },
  btnLap: { backgroundColor: "#007AFF" },
  btnDisabled: { backgroundColor: "#C7C7CC" },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.5,
  },

  lapsContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  lapHeader: {
    flexDirection: "row",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 4,
  },
  lapHeaderText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8E8E93",
    letterSpacing: 0.5,
  },
  lapScroll: {
    flex: 1,
  },
  lapRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E0E0E0",
    alignItems: "center",
  },
  lapNumber: {
    flex: 0.5,
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  lapTime: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    fontVariant: ["tabular-nums"],
  },
  lapTotal: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    textAlign: "right",
    fontVariant: ["tabular-nums"],
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 4,
  },
  legendDot: {
    fontSize: 12,
    fontWeight: "700",
  },
  legendText: {
    fontSize: 11,
    color: "#8E8E93",
  },
});
