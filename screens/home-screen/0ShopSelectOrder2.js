 /* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {StyleSheet, View, Text, Button, TouchableHighlight, TextInput, TouchableOpacity} from 'react-native';
import SHeader from './components/SHeader';

const ShopSelectOrder = () => (
  <View style={styles.container}>
    <SHeader text="ร้านที่ 1" />
    <View style={{marginTop:20,marginBottom:10}}>
        <Text>ค้นหาเมนู</Text>
        <View style={{backgroundColor: 'gray',width: 340, height: 40}}>
        <TextInput/>
        </View>
    </View>
    <Order text='1' price='30.00'/>
    <Order text='2' price='xx.xx'/>
    <Order text='3' price='xx.xx'/>
    <OrderOut text='4'/>
  </View>
);

const Order = ({text,price}) => {
    return (
      <View style={styles.header}> 
        <Text style={styles.text}>FOOD</Text>
        <View style={styles.menuprice}>
          <Text style={styles.textBlack}>เมนูที่ {text}</Text>
        <Text style={styles.textPrice}>ราคา {price} บาท</Text>
        </View>
      </View>
    );
  };

const OrderOut = ({text}) => {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>FOOD</Text>
        <View style={styles.menuprice}>
          <Text style={styles.textBlack}>เมนูที่ {text}</Text>
          <Text style={styles.textRed}>หมด</Text>
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

export default ShopSelectOrder;
