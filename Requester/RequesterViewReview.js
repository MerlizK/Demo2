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

const RequesterViewReview = () => (
  <View style={styles.container}>
    <RHeader text="รีวิว: ร้านที่ 1" />
    <View style={{ margin: 10 }} />
    <Order text="4.0" description="เผ็ดแซ๊บมากค่ะ ใครที่ชอบอาหารเผ็ดๆ...." />
    <Order text="5.0" description="ทำไมผมไม่เคยเห็นร้านนี้ตอนไปเดินเองเ..." />
    <Order text="1.5" description="เผ็ดเกิ๊นนน" />
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
  },
  textPrice: {
    color: '#757575',
    fontSize: 14,
    textAlign: 'left',
    marginTop: 5,
  },
});

export default RequesterViewReview;
