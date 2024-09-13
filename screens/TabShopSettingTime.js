import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Colors from '../Constants';


const Daybutton = ({day,onPress}) => {
  const [showDay,setshowDay] = useState(true);
  const toggleshowDay = () => setshowDay(!showDay);

  return (
  <TouchableOpacity 
  style={showDay? ({margin: 5,borderRadius: 50,justifyContent: 'center',backgroundColor: '#009951', width: 35,height: 35 }) :
  ({margin: 5,borderRadius: 50,justifyContent: 'center',backgroundColor: '#D9D9D9', width: 35,height: 35 })  }
  onPress={() => { onPress(); toggleshowDay();}}
  >
    <Text style={showDay? ({fontSize: 16,color:'white',textAlign: 'center'}) :
    ({fontSize: 16,color:'#767676',textAlign: 'center'}) }>
    {day}
    </Text>
  </TouchableOpacity>

)};

const Showday = ({day}) => {
  return (
  <View style= {{width: 200,justifyContent:'space-between',flexDirection: 'row', marginVertical: 8}}>
        <View>
          <Text>
          {day}
          </Text>
        </View>
        <View>
          <TouchableOpacity style ={{alignItems:'center',paddingHorizontal: 5,backgroundColor: '#D9D9D9',width: 100}}>
            <Text>
            9.00 to 17.00
            </Text>
          </TouchableOpacity>
        </View>
      </View> 
)};

export default function TabTime() {

  const [showMonday,setShowMonday] = useState(true);
  const [showTuesday,setShowTuesday] = useState(true);
  const [showWednesday,setShowWednesday] = useState(true);
  const [showThursday,setShowThursday] = useState(true);
  const [showFriday,setShowFriday] = useState(true);
  const [showSaturday,setShowSaturday] = useState(true);
  const [showSunday,setShowSunday] = useState(true);

  const onPressMonday = () => setShowMonday(!showMonday)
  const onPressTuesday = () => setShowTuesday(!showTuesday)
  const onPressWednesday = () => setShowWednesday(!showWednesday)
  const onPressThursday = () => setShowThursday(!showThursday)
  const onPressFriday = () => setShowFriday(!showFriday)
  const onPressSaturday = () => setShowSaturday(!showSaturday)
  const onPressSunday = () => setShowSunday(!showSunday)

  // const [showSchedule,setshowSchedule] = useState(true);
  // const [showCalendar,setshowCalendar] = useState(false);

  const [selectedTab, setSelectedTab] = useState('time');
  const [selectedDay, setSelectedDay] = useState('');

  const [specialTime, setSpecialTime] = useState({
    start: '09:00',
    end: '17:00',
  });

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
  };

  const markedDates = selectedDay
    ? { [selectedDay]: { selected: true, selectedColor: 'green' } }
    : {};
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ร้านที่ 1</Text>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'time' && styles.activeTab]}
          onPress={() => setSelectedTab('time')}>
          <Text style={styles.tabText}>ตั้งเวลา</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'calendar' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('calendar')}>
          <Text style={styles.tabText}>ปฏิทิน</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'time' ? (
        <View>
          <View style= {{flexDirection: 'row', marginVertical: 60}}>
            <Daybutton onPress={onPressSunday} day = 'S'/>
            <Daybutton onPress={onPressMonday} day = 'M'/>
            <Daybutton onPress={onPressTuesday} day = 'T'/>
            <Daybutton onPress={onPressWednesday} day = 'W'/>
            <Daybutton onPress={onPressThursday} day = 'T'/>
            <Daybutton onPress={onPressFriday} day = 'F'/>
            <Daybutton onPress={onPressSaturday} day = 'S'/>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              { showSunday ? <Showday day = 'Sunday'/> : null}
              { showMonday ? <Showday day = 'Monday'/> : null}
              { showTuesday ? <Showday day = 'Tuesday'/> : null}
              { showWednesday ? <Showday day = 'Wednesday'/> : null}
              { showThursday ? <Showday day = 'Thursday'/> : null}
              { showFriday ? <Showday day = 'Friday'/> : null}
              { showSaturday ? <Showday day = 'Saturday'/> : null}
            </View>
            <TouchableOpacity style={{width: 70 ,marginHorizontal:10 ,marginVertical: 7, backgroundColor:'black', height:28, alignItems:'center',justifyContent: 'center',borderRadius: 10}}>
              <Text style={{color:'white'}}>Apply All</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            style={styles.calendar}
          />

          <View style={styles.timePicker}>
            <View
              style={{
                flex: 3,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                style={styles.timeInput}
                value={specialTime.start}
                onChangeText={value =>
                  setSpecialTime({ ...specialTime, start: value })
                }
              />
              <Text style={styles.timeSeparator}>to</Text>
              <TextInput
                style={styles.timeInput}
                value={specialTime.end}
                onChangeText={value =>
                  setSpecialTime({ ...specialTime, end: value })
                }
              />
            </View>
          </View>
        </ScrollView>
      )}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={{color:'white'}}>ยืนยันการตั้งเวลา</Text>
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
    alignItems: 'center',
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
    padding: 10,
    paddingHorizontal: 70,
    borderRadius: 5
  },
  confirmButton: {
    backgroundColor: '#009951',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop : 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabButton: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#757575',
  },
  activeTab: {
    borderRadius: 8,
    backgroundColor: Colors.PRIMARY_DARK,
  },
  tabText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  calendar: {
    marginBottom: 20,
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  timeInput: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    width: 64,
    textAlign: 'center',
  },
  timeSeparator: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  clearButton: {
    flex: 1,
    padding: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectDateText: {
    textAlign: 'center',
    marginTop: 20,
  },
});
