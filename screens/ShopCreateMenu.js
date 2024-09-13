import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreateMenu() {
  const navigation = useNavigation();

  return (
    <ScrollView>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.title}>{`< ชื่อเมนู`}</Text>
      </TouchableOpacity>

      <View style={{padding:10,justifyContent:'center',alignSelf:'center',backgroundColor: '#EEEEEE',width: 360, height: 40}}>
        <TextInput style={{fontSize: 16}} placeholder='เพิ่มชื่อเมนู'/>
      </View>

      <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',marginVertical:20,backgroundColor: '#EEEEEE',width: 300, height: 200, borderRadius: 10}}>
        <Text>เพิ่มรูปภาพ</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontWeight: 'bold',alignSelf: 'flex-start'}}>ราคา</Text>
        <View style={{alignSelf:'center',marginHorizontal:5,backgroundColor: '#EEEEEE',width: 40, height: 20}}>
          <TextInput style={{fontWeight: 'bold', textAlign:'center'}} placeholder='xx.xx'/>
        </View>
        <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>บาท</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('AddOption')} style={styles.addButton}>
        <Text style={{color:'white'}}>เพิ่ม Option</Text>
      </TouchableOpacity>

      <Text style={{fontWeight: 'bold',alignSelf: 'flex-start'}}>คำอธิบาย</Text>

      <View style={{alignSelf:'center',marginVertical:20,padding:10,borderRadius:10, backgroundColor: '#EEEEEE',width: 360, height: 150}}>
        <TextInput 
        placeholder='เพิ่มคำอธิบาย'/>
      </View>

      <View style={{flexDirection: 'row',justifyContent: 'space-evenly'}}>
      <TouchableOpacity style={styles.button}>
        <Text style={{color:'white'}}>เพิ่มเมนู</Text>
      </TouchableOpacity>
      </View>
      
      <StatusBar style="auto" />
    </View>
    </ScrollView>
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
});
