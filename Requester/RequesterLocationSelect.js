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

const RequesterSelectMenu = () => (
  <View style={styles.container}>
    <RHeader text="เลือกตำแหน่งจัดส่ง" />
    <View style={{ margin: 10 }} />
    <Order text="ตามที่อยู่บนระบบ GPS" description="ทำการส่งไปยังที่อยู่ปัจจุบันของคุณ" />
    <Order text="ตามที่อยู่เริ่มต้น" description="123 ถนน ที่อยู่" />
  </View>
);

const Order = ({ text, description }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>ICON</Text>
      <View style={styles.menuprice}>
        <Text style={styles.textBlack}>{text}</Text>
        <Text style={styles.textPrice}>{description}</Text>
      </View>
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
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuprice: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 15,
    marginTop: 10,
  },
  text: {
    color: 'black',
    fontSize: 18,
    textAlign: 'left',
  },
  textBlack: {
    color: 'black',
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  textPrice: {
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
    marginTop: 5,
  },
});

export default RequesterSelectMenu;
