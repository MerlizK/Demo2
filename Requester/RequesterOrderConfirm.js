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

const Seperator = () => (
  <View
    style={{ height: 5, borderBottomColor: '#009951', borderBottomWidth: 2 }}
  />
);

const RequesterOrderConfirm = () => (
  <View style={styles.container}>
    <RHeader text="ยืนยันการสั่งซื้อ" />
    <View style={{height:15}}/>
    <Text style={styles.header}>สั่งจาก</Text>
    <Text style={styles.textBlack}>โรงอาหารคณะวิศวกรรมศาสตร์(บาร์วิศวะ)</Text>
    <Seperator />
    <Text style={styles.header}>ตำแหน่งจัดส่ง</Text>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.textBlack}>ตามที่อยู่เริ่มต้น</Text>
      <Text style={styles.textBlue}>เปลี่ยน</Text>
    </View>
    <Seperator />
    <Text style={styles.header}>รายการที่สั่ง</Text>
    <View style={{marginLeft:25,flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.textMenu}>ร้านที่ 1</Text>
      <Text style={styles.textMenu}>80.00 บาท</Text>
    </View>
    <View style={{marginLeft:60,flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.textMenu}>เมนูที่ 1</Text>
      <Text style={styles.textMenu}>80.00 บาท</Text>
    </View>
    <View style={{marginLeft:60,flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.textGray}>จำนวน</Text>
      <Text style={styles.textGray}>2</Text>
    </View>
    <View style={{marginLeft:60,flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.textGray}>เพิ่มเติม: ไม่เอาเครื่องใน</Text>
    </View>
    <Seperator />
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.header}>ราคาอาหารรวม</Text>
      <Text style={styles.header}>80.00 บาท</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.header}>ราคาจัดส่ง</Text>
      <Text style={styles.header}>15.00 บาท</Text>
    </View>
    <Seperator />
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.header}>ราคาทั้งหมด</Text>
      <Text style={styles.header}>95.00 บาท</Text>
    </View>
    <View style={styles.bottomView}>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttontext}>ยืนยัน</Text>
        </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    color: 'black',
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  textBlack: {
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 5,
  },
  textBlue: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 5,
  },
  textGray: {
    color: '#757575',
    fontSize: 14,
    textAlign: 'left',
    marginVertical: 1,
    marginRight: 65
  },
  textMenu: {
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 2,
  },
  bottomView: {
    width: '110%',
    height: 60,
    // backgroundColor: '#EE5407',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#009951',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 10,
    margin: 0,
  },
  buttontext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RequesterOrderConfirm;
