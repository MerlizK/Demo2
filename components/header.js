import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Entypo from "@expo/vector-icons/Entypo";

const Header = ({ title, showBackButton = false, onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Entypo
            name="chevron-small-down"
            size={24}
            color="black"
            style={{ width: "100%", bottom: 8 }}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 80,
    width: "100%",
    paddingHorizontal: 32,
    backgroundColor: "white",
    justifyContent: "center",
    position: "relative",
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerLine: {
    width: "100%",
    height: 1,
    backgroundColor: "green",
    marginTop: 10,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 80,
    padding: 10,
  },
  backButtonText: {
    color: "black",
    fontSize: 18,
  },
});

export default Header;
