import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SHeader from './components/SHeader';

export default function EditInfo() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <SHeader text={`< แก้ไขข้อมูลร้าน`}/>
      </TouchableOpacity>
      <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',marginVertical:20,backgroundColor: '#EEEEEE',width: 300, height: 200, borderRadius: 10}}>
        <Text>เพิ่มรูปภาพ</Text>
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder='SampleUsername'
          />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>ชื่อร้าน:</Text>
          <TextInput
            style={styles.input}
            placeholder='SampleShopName'
          />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>เบอร์โทรศัพท์:</Text>
          <TextInput
            style={styles.input}
            placeholder='SamplePhoneNumber'
          />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>โรงอาหาร:</Text>
          <TextInput
            style={styles.input}
            placeholder='SampleCanteen'
          />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>หมายเลขร้าน:</Text>
          <TextInput
            style={styles.input}
            placeholder='SampleShopNumber'
          />
      </View>

      <TouchableOpacity
          style={styles.registerButton}>
          <Text style={styles.registerButtonText}>ยืนยันการแก้ไขข้อมูล</Text>
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
    backgroundColor: '#2C2C2C',
    marginVertical: 50,
    padding: 10,
    width: 130,
    borderRadius: 10
  },
  addButton: {
    backgroundColor: '#2C2C2C',
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
    borderColor: '#ccc',
    padding: 2,
    borderRadius: 8,
  },
  registerButton: {
    maxWidth: 180, // Limit button width
    backgroundColor: '#2C2C2C',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  }, 
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }, 
});
