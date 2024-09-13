import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SHeader from './components/SHeader';
import Colors from '../Constants';

export default function TabInfo() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <SHeader text="ข้อมูลร้าน"/>
      <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',marginVertical:20,backgroundColor: '#EEEEEE',width: 300, height: 200, borderRadius: 10}}>
        <Text>เพิ่มรูปภาพ</Text>
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Username:</Text>
          <Text
            style={styles.input}
          >SampleUsername</Text>
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>ชื่อร้าน:</Text>
          <Text
            style={styles.input}
          >SampleShopName</Text>
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>เบอร์โทรศัพท์:</Text>
          <Text
            style={styles.input}
          >SamplePhoneNumber</Text>
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>โรงอาหาร:</Text>
          <Text
            style={styles.input}
          >SampleCanteen</Text>
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>หมายเลขร้าน:</Text>
          <Text
            style={styles.input}
          >SampleShopNumber</Text>
      </View>

      <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('EditInfo')}
          >
          <Text style={styles.registerButtonText}>แก้ไขข้อมูล</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate('History')}
        > 
        <Text style={styles.registerButtonText}>ประวัติการทำอาหาร</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 25,
    marginBottom: 20,
    paddingVertical: 8,
    color: '#20232a',
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: 36,
    fontWeight: 'bold',
    // borderBottomColor: 'green',
    // borderBottomWidth: 2,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY_DARK,
    marginVertical: 50,
    padding: 10,
    width: 130,
    borderRadius: 10
  },
  addButton: {
    backgroundColor: Colors.PRIMARY_DARK,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    bottom: 0,
    alignSelf: 'flex-end',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  inputRow: {
    flexDirection: 'row', // Set row layout
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    width: 120, // Adjust width as needed for label
    marginRight: 10, // Space between label and input
  },
  input: {
    flex: 1, // Make input take the remaining space
    borderWidth: 1,
    borderColor: '#fff',
    padding: 2,
    borderRadius: 8,
  },
  registerButton: {
    maxWidth: 163, // Limit button width
    backgroundColor: Colors.PRIMARY_DARK,
    alignSelf: 'flex-end',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  }, 
  historyButton: {
    maxWidth: 163, // Limit button width
    backgroundColor: Colors.PRIMARY_DARK,
    alignSelf: 'flex-start',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 130,
  }, 
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }, 
});
