/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import RHeader from './components/RHeader';

const RequesterReturnCanteen = () => (
  <View style={styles.container}>
    <RHeader text="รายการสั่งซื้อ" />
    <Text style={styles.header}>รายการว่างเปล่า</Text>
    <View style={{ width: 200, height: 200, backgroundColor: 'blue' }} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    borderWidth: 15,
    borderColor: '#00B855',
    backgroundColor: '#00B855',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    marginBottom: 30,
    color: 'black',
  },
  text: {
    fontSize: 20,
    marginTop: 5,
    color: 'black',
  }, 
});

export default RequesterReturnCanteen;
