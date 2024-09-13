import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, TextInput, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import SHeader from './components/SHeader';
import OrderH from './components/OrderH';

import Entypo from '@expo/vector-icons/Entypo';
import Colors from '../Constants';

export default function History() {
  const navigation = useNavigation();

  const [shopAva,setShopAva] = useState(true);
  const toggleShopAva = () => setShopAva(!shopAva);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('เลือกวันที่');
  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setShow(false);

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let tempDate = new Date(currentDate);
    let monthName = month[tempDate.getMonth()];
    let fDate = tempDate.getDate() +' '+ monthName +' '+ tempDate.getFullYear();
    setText(fDate) 
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <SHeader text={`< ประวัติการทำอาหาร `}/>
      </TouchableOpacity>
        <View>
          <View style={{alignItems: 'center',marginVertical: 20}}>
            <Text style={{fontSize:16}}>เลือกวันที่่</Text>
            <TouchableOpacity onPress={() => showMode('date')}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginTop:10,fontSize:16, fontWeight: 'bold'}}>{text}</Text>
                <Entypo style={{marginTop:10}} name="chevron-small-down" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          {text === 'เลือกวันที่' ? (
            <View style={{
              height: Dimensions.get('window').width * 0.9,
              flex:50, 
              justifyContent: 'center', 
              alignItems: 'center'
            }}>
              <Text style={{color:'gray', fontSize: 35}}>กรุณาเลือกวันที่</Text>
            </View>
          ) : (
            <View>
              <View>
                <View style={{marginBottom:10,marginLeft: 5,paddingRight: 71,flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize:16}}>รายได้รวม</Text>
                <Text style={{fontSize:16}}>xx บาท</Text>
              </View>
              <OrderH text='1234'/>
              <OrderH text='1235'/>
              <OrderH text='1236'/>
              <OrderH text='1237'/>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
      />)}
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
    backgroundColor: Colors.PRIMARY_DARK,
    borderRadius: 10,
    marginTop: 100,
  }
});
