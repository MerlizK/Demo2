import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from "react-native";

import BackIcon from "../assets/icons/caret-left.svg";

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
};

const Header = ({
  title,
  showBackButton = false,
  onBackPress,
}: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <BackIcon
            style={{ width: "100%", bottom: 8 }}
            width={24}
            height={24}
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
  } as ViewStyle,
  headerTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  } as TextStyle,
  headerLine: {
    width: "100%",
    height: 1,
    backgroundColor: "green",
    marginTop: 10,
  } as ViewStyle,
  backButton: {
    position: "absolute",
    left: 16,
    top: 80,
    padding: 10,
  } as ViewStyle,
  backButtonText: {
    color: "black",
    fontSize: 18,
  } as TextStyle,
});

export default Header;
