import React from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";

const MOBILE_OS = [
  { name: "Android", image: require("../assets/images/android_logo.png") },
  { name: "iOS", image: require("../assets/images/ios_logo.jpg") },
  { name: "Windows", image: require("../assets/images/windows_logo.png") },
  {
    name: "Blackberry",
    image: require("../assets/images/blackberry_logo.png"),
  },
];

const GridViewLab = () => {
  const showToast = (itemName) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(itemName, ToastAndroid.SHORT);
    } else {
      Alert.alert("Item tapped", itemName);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => showToast(item.name)}
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        <Image source={item.image} style={styles.itemImage} />
        <Text style={styles.itemLabel}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={MOBILE_OS}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
      numColumns={2}
      contentContainerStyle={styles.grid}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 8,
  },
  row: {
    justifyContent: "space-around",
    marginBottom: 8,
  },
  gridItem: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContent: {
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
    resizeMode: "contain",
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default GridViewLab;
