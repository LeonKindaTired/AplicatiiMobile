import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";

const OverflowMenuLab = ({ modalVisible, setModalVisible }) => {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [message, setMessage] = useState(
    "Select menu item at right top overflow menu."
  );

  const colors = {
    Red: "#FF0000",
    Yellow: "#FFFF00",
    Green: "#00FF00",
  };

  const handleSelect = (colorName) => {
    setBackgroundColor(colors[colorName]);
    setMessage(`You select ${colorName.toLowerCase()} menu.`);
    setModalVisible(false);
    if (Platform.OS === "android") {
      ToastAndroid.show(colorName, ToastAndroid.SHORT);
    } else {
      Alert.alert("Selected", colorName);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect("Red")}
            >
              <Text style={[styles.optionText, { color: "red" }]}>Red</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect("Yellow")}
            >
              <Text style={[styles.optionText, { color: "#CCCC00" }]}>
                Yellow
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect("Green")}
            >
              <Text style={[styles.optionText, { color: "green" }]}>Green</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    minWidth: 150,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default OverflowMenuLab;
