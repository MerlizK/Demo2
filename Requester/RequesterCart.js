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

const RequesterCart = () => (
  <View style={styles.container}>
    <RHeader text="รายการสั่งซื้อ" />
    <View style={{ height: 20 }} />
    <Order text="1" price="80.00" /> 
  </View>
);

const Order = ({ text, price }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>FOOD</Text>
      <View style={styles.menuprice}>
        <Text style={styles.textBlack}>เมนูที่ {text}</Text>
        <Text style={styles.textPrice}>จำนวน</Text>
        <Text style={styles.textPrice}>ราคา {price} บาท</Text>
      </View>
      <Text style={{ marginTop: 10, color: 'red' }}>Cancel</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    height: 80,
    padding: 15,
    backgroundColor: 'lightgrey',
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuprice: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 10,
    marginTop: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
  },
  textBlack: {
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  textPrice: {
    color: 'black',
    fontSize: 14,
    textAlign: 'left',
  },
  textRed: {
    color: 'red',
    fontSize: 14,
    textAlign: 'left',
  },
});

export default RequesterCart;
