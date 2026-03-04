import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
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

const CountrySpinner = () => {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const showToast = (countryName) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(countryName, ToastAndroid.SHORT);
    } else {
      Alert.alert("Selected Country", countryName);
    }
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setModalVisible(false);
    showToast(country.name);
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleSelectCountry(item)}
    >
      <Image source={{ uri: item.flagUrl }} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectedContainer}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={{ uri: selectedCountry.flagUrl }}
          style={styles.selectedImage}
        />
        <Text style={styles.selectedText}>{selectedCountry.name}</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={COUNTRIES}
              renderItem={renderDropdownItem}
              keyExtractor={(item) => item.name}
              style={styles.list}
            />
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
    padding: 20,
  },
  selectedContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "80%",
  },
  selectedImage: {
    width: 30,
    height: 20,
    marginRight: 10,
    resizeMode: "contain",
  },
  selectedText: {
    fontSize: 18,
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    maxHeight: "60%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  list: {
    width: "100%",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemImage: {
    width: 30,
    height: 20,
    marginRight: 10,
    resizeMode: "contain",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});

export default CountrySpinner;
