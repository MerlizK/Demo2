import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CustomCheckbox = ({
  label,
  checked,
  onPress,
}: {
  label: string;
  checked: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
    <View style={[styles.checkbox, checked && styles.checked]}>
      {/* {checked && <View style />} */}
    </View>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checked: {
    backgroundColor: '#000',
  },
  label: {
    color: '#000',
    fontSize: 16,
  },
});

export default CustomCheckbox;
