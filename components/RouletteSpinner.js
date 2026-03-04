import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";

const COUNTRIES = [
  { name: "India", flagUrl: "https://flagcdn.com/w320/in.png" },
  { name: "China", flagUrl: "https://flagcdn.com/w320/cn.png" },
  { name: "Australia", flagUrl: "https://flagcdn.com/w320/au.png" },
  { name: "Portugal", flagUrl: "https://flagcdn.com/w320/pt.png" },
  { name: "America", flagUrl: "https://flagcdn.com/w320/us.png" },
  { name: "New Zealand", flagUrl: "https://flagcdn.com/w320/nz.png" },
];

const RouletteSpinner = () => {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [spinning, setSpinning] = useState(false);
  const intervalRef = useRef(null);

  const showToast = (countryName) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(countryName, ToastAndroid.SHORT);
    } else {
      Alert.alert("Selected Country", countryName);
    }
  };

  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    let iterations = 0;
    const maxIterations = 20 + Math.floor(Math.random() * 20); // between 20 and 40 changes
    const spinDuration = 1500; // total spin time ~1.5s
    const intervalTime = spinDuration / maxIterations;

    intervalRef.current = setInterval(() => {
      // Pick a random country to show during spin
      const randomIndex = Math.floor(Math.random() * COUNTRIES.length);
      setSelectedCountry(COUNTRIES[randomIndex]);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        // Final random selection
        const finalIndex = Math.floor(Math.random() * COUNTRIES.length);
        const finalCountry = COUNTRIES[finalIndex];
        setSelectedCountry(finalCountry);
        setSpinning(false);
        showToast(finalCountry.name);
      }
    }, intervalTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.spinnerBox}>
        <Image source={{ uri: selectedCountry.flagUrl }} style={styles.flag} />
        <Text style={styles.countryName}>{selectedCountry.name}</Text>
      </View>

      <TouchableOpacity
        style={[styles.spinButton, spinning && styles.spinButtonDisabled]}
        onPress={spin}
        disabled={spinning}
      >
        <Text style={styles.spinButtonText}>
          {spinning ? "Spinning..." : "Spin"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  spinnerBox: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  flag: {
    width: 80,
    height: 60,
    resizeMode: "contain",
    marginBottom: 10,
  },
  countryName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  spinButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  spinButtonDisabled: {
    backgroundColor: "#aaa",
  },
  spinButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default RouletteSpinner;
