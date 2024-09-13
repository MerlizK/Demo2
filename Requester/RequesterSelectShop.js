/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {StyleSheet, View, Text, Button, TouchableHighlight, TextInput, TouchableOpacity} from 'react-native';
import RHeader from './components/RHeader';

const RequesterSelectShop = () => (
  <View style={styles.container}>
    <RHeader text="กรุณาเลือกร้านอาหาร" />
    <View style={{marginTop:20,marginBottom:10}}>
        <Text>ค้นหาร้านอาหาร</Text>
        <View style={{backgroundColor: 'gray',width: 340, height: 40}}>
        <TextInput/>
        </View>
    </View>
    <Order text='1' open='เปิด'/>
    <Order text='2' open='เปิด'/>
    <Order text='3' open='เปิด'/>
    <OrderOut text='4' open='ปิด'/>
    <View style={styles.bottomView}>
      <Text style={styles.bottomBasket}>Basket</Text>
      <Text style={styles.bottomButton}>สั่ง</Text>
    </View>
  </View>
);

const Order = ({text, open}) => {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>FORK</Text>
        <View style={styles.menuprice}>
          <Text style={styles.textBlack}>ร้านที่ {text}</Text>
          <Text style={styles.textBlue}>ดูรีวิว</Text>
        </View>
        <Text style={styles.textGreen}>{open}</Text>
      </View>
    );
  };

  const OrderOut = ({text, open}) => {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>FORK</Text>
        <View style={styles.menuprice}>
          <Text style={styles.textBlack}>ร้านที่ {text}</Text>
          <Text style={styles.textBlue}>ดูรีวิว</Text>
        </View>
        <Text style={styles.textRed}>{open}</Text>
      </View>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    height: 60,
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
    fontWeight: 'bold'
  },
  textBlue: {
    color: 'blue',
    fontSize: 14,
    textAlign: 'left',
  },
  textGreen: {
    color: 'green',
    fontSize: 16,
    textAlign: 'left',
  },
  textRed: {
    color: 'red',
    fontSize: 16,
    textAlign: 'left',
  },
  bottomView: {
    width: '110%',
    height: 60,
    // backgroundColor: '#EE5407',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomButton: {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    width: 200,
    fontSize: 18,
    lineHeight: 40,
    marginHorizontal: 10,
    borderRadius: 8
  },
  bottomBasket: {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    width: 70,
    fontSize: 18,
    lineHeight: 40,
    marginHorizontal: 10,
    borderRadius: 8,
    marginLeft: 20,
  }
});

export default RequesterSelectShop;

