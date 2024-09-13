import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';

export default function AddOption() {
  const navigation = useNavigation();
  const [isRequired, setIsRequired] = React.useState(true);
  const [isSingleChoice, setIsSingleChoice] = useState(true);

  return (
    // <ScrollView>
    <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text style={styles.title}>{`< ชื่อเมนู`}</Text>
    </TouchableOpacity>

      <View style={{padding:10,justifyContent:'center',alignSelf:'center',backgroundColor: '#EEEEEE',width: 360, height: 40}}>
        <TextInput style={{fontSize: 16}} placeholder='ชื่อตัวเลือก'/>
      </View>

      <View style={{marginTop:20, marginLeft:10}}>
        <Text style={{fontSize: 16,fontWeight:'bold'}}>
          รายละเอียดตัวเลือก
        </Text>

        <Text style={{fontSize: 16,marginTop: 10}}>
          ลูกค้าจำเป็นต้องเลือกตัวเลือกนี้หรือไม่?
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Checkbox
              status={isRequired ? 'checked' : 'unchecked'}
              onPress={() => {setIsRequired(true);}}
              color= '#009951'
          />
          <Text style={{fontSize: 16,marginTop: 10}}> 
            จำเป็น
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Checkbox
              status={!isRequired ? 'checked' : 'unchecked'}
              onPress={() => {setIsRequired(false);}}
              color= '#009951'
          />
          <Text style={{fontSize: 16,marginTop: 10}}> 
            ไม่บังคับ
          </Text>
        </View>

        <Text style={{fontSize: 16,marginTop: 15}}>
        ลูกค้าสามารถเลือกได้กี่ตัวเลือก
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Checkbox
              status={isSingleChoice ? 'checked' : 'unchecked'}
              onPress={() => {setIsSingleChoice(true);}}
              color= '#009951'
          />
          <Text style={{fontSize: 16,marginTop: 10}}> 
            1 อย่าง
          </Text>
        </View>
        <View style={{justifyContent: 'space-between',marginTop: 10,flexDirection: 'row'}}>
        <View style={{flexDirection: 'row'}}>
            <Checkbox
                status={!isSingleChoice ? 'checked' : 'unchecked'}
                onPress={() => {setIsSingleChoice(false);}}
                color= '#009951'
            />
            <Text style={{alignSelf: 'center',fontSize: 16,}}>
            หลายตัวเลือก
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{alignSelf:'center',marginHorizontal:5,backgroundColor: '#EEEEEE',width: 60, height: 20}}>
              <TextInput style={{fontSize: 16,fontWeight: 'bold', textAlign:'center'}} placeholder='ต่ำสุด'/>
            </View>
            <Text style={{fontSize: 16,fontWeight: 'bold', alignSelf: 'flex-start'}}>-</Text>
            <View style={{alignSelf:'center',marginHorizontal:5,backgroundColor: '#EEEEEE',width: 60, height: 20}}>
              <TextInput style={{fontSize: 16,fontWeight: 'bold', textAlign:'center'}} placeholder='สูงสุด'/>
            </View>
          </View>
        </View>


        <Text style={{fontSize: 16,marginTop:20,fontWeight:'bold'}}>
          เพิ่มตัวเลือกย่อย
        </Text>
        <View style={{marginTop: 10,flexDirection: 'row',justifyContent: 'space-between'}}>
          {/* <Text style={{fontSize: 16,}}>เนื้อสด</Text>
          <Text style={{fontSize: 16,}}>+10.00 บาท</Text>
          <TouchableOpacity style={styles.binButton}>
            <Text style = {{color: 'white',fontSize: 40,lineHeight: 32}}>-</Text>
          </TouchableOpacity> */}
        </View>

        <View style={{justifyContent: 'space-between',marginTop: 10,flexDirection: 'row'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{alignSelf:'flex-start',backgroundColor: '#EEEEEE',width: 120, height: 20}}>
              <TextInput style={{fontSize: 16,fontWeight: 'bold', textAlign:'left'}} placeholder='ชื่อตัวเลือกย่อย'/>
            </View>
          </View>
          <View style={{justifyContent: 'space-between',flexDirection: 'row'}}>
              <View style={{alignSelf:'center',marginHorizontal:5,backgroundColor: '#EEEEEE',width: 100, height: 20}}>
                <TextInput style={{fontSize: 16,fontWeight: 'bold', textAlign:'center'}} placeholder='เพิ่มราคา'/>
              </View>
              <Text style={{ fontSize: 16,alignSelf: 'flex-start'}}>บาท</Text>
              <TouchableOpacity style={styles.binButton}>
                <Text  style = {{color: 'white',fontSize: 25,lineHeight: 25}}>+</Text>
              </TouchableOpacity>
            </View>
        </View>


        <View style={{flexDirection: 'row',justifyContent: 'space-evenly'}}>
          <TouchableOpacity style={styles.button}>
            <Text style={{fontSize: 16,color:'white'}}>เพิ่ม Option</Text>
          </TouchableOpacity>
        </View>

      </View>
      <StatusBar style="auto" />
    </View>
    // </ScrollView>
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
  binButton: {
    backgroundColor: 'lightgray', 
    width: 20, 
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
  }
});
