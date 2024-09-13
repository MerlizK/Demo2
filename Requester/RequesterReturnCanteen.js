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

const RequesterReturnCanteen = () => (
  <View style={styles.container}>
    <View style={styles.innercontainer}>
    <Text style={styles.header}>ต้องการเลือกโรงอาหารอื่น? </Text>
    <View style={{width:200,height:200, backgroundColor:'blue'}} />
      <View style={{ alignItems:'center',marginTop: 10, marginBottom: 20 }}>
        <Text style={styles.text}>หากคุณเลือกโรงอาหารใหม่ </Text>
        <Text style={styles.text}>ข้อมูลที่สั่งไว้จะถูกล้าง </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttontext}>ยืนยัน</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttontext}>ยกเลิก</Text>
      </TouchableOpacity>
    </View>
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
    justifyContent:'center',
  },
  innercontainer: {
    flex: 1,
    width: '116%',
    height: '109%',
    borderWidth: 10,
    borderColor: 'white',
    position: 'absolute', 
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent:'center',
  },
  header: {
    fontSize: 30,
    marginBottom: 30,
    color:'black',
  },
  text: {
    fontSize: 20,
    marginTop: 5,
    color:'black',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 10,
    margin: 13,
  },
  buttontext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default RequesterReturnCanteen;
