import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={onBackPress ? onBackPress : () => {}}
        disabled={!showBackButton}
      >
        {showBackButton && (
          <View style={styles.backButton}>
            <Entypo
              name="chevron-small-left"
              size={24}
              color="black"
              style={{ width: "100%", bottom: 8 }}
            />
          </View>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </TouchableOpacity>
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
  },
  headerLine: {
    width: "100%",
    height: 1,
    backgroundColor: "green",
    marginTop: 10,
  },
  backButton: { top: 10 },
  backButtonText: {
    color: "black",
    fontSize: 18,
  },
});

export default Header;
