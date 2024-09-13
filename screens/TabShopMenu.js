import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SHeader from './components/SHeader';
import Menu from './components/Menu';


export default function TabMenu() {
  const [shopAva,setShopAva] = useState(true);
  const toggleShopAva = () => setShopAva(!shopAva);
  const navigation = useNavigation();
  const gotoCreatemenu = () => navigation.navigate('CreateMenu');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ร้านที่ 1</Text>
      <View style={{marginTop:20,marginBottom: 30,flexDirection:'row'}}>
        <Text style={{alignSelf:'center',fontSize:22, fontWeight: 'bold'}}>สถานะร้าน :</Text>
        <TouchableOpacity onPress={toggleShopAva} style={shopAva ? styles.menuYButton : styles.menuXButton}>
          <Text style={{fontSize: 18,color:'white'}}>
            {shopAva ? 'ร้านเปิด':'ร้านปิด'}
          </Text>
        </TouchableOpacity>
      </View>
      <Menu text='1'/>
      <Menu text='2'/>
      <Menu text='3'/>
      <Menu text='4'/>
      <TouchableOpacity onPress={gotoCreatemenu} style={styles.addMenuButton}>
        <Text style={{fontSize: 16,color:'white'}}>
          เพิ่มเมนู
        </Text>
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
    marginTop: 35,
    marginBottom: 10,
    paddingVertical: 8,
    color: '#20232a',
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: 46,
    fontWeight: 'bold',
    // borderBottomColor: 'green',
    // borderBottomWidth: 2,
  },
  menuYButton: {
    backgroundColor:'#009951',
    marginLeft: 30,
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },
  menuXButton: {
    backgroundColor:'#C00F0C',
    marginLeft: 30,
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },
  addMenuButton: {
    width: 150, 
    height:35,
    padding:5,
    alignItems:'center',
    alignSelf: 'center',
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    marginTop: 100,
  }
});
