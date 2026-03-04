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

const MenuButton = ({ trigger = "press" }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showToast = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert("Menu Selection", message);
    }
  };

  const handleOptionPress = (option) => {
    setModalVisible(false);
    showToast(`You Clicked : ${option}`);
  };

  const handleTrigger = () => {
    if (trigger === "press") {
      setModalVisible(true);
    }
  };

  const handleLongPress = () => {
    if (trigger === "longPress") {
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleTrigger}
        onLongPress={handleLongPress}
        delayLongPress={500}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {trigger === "press" ? "Show Popup" : "Long press for context menu"}
        </Text>
      </TouchableOpacity>

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
              onPress={() => handleOptionPress("One")}
            >
              <Text style={styles.optionText}>One</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionPress("Two")}
            >
              <Text style={styles.optionText}>Two</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionPress("Three")}
            >
              <Text style={styles.optionText}>Three</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
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
    minWidth: 200,
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

export default MenuButton;
