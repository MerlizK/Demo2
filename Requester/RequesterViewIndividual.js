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

const RequesterViewIndividual = () => (
  <View style={styles.container}>
    <RHeader text="รีวิว: ร้านที่ 1" />
    <View style={{ margin: 10 }} />
    <Order text="นางชิกะโนโกะ โนโกะ" description="Star Star Star Star Star" />
    <Text>รีวิว:</Text>
    <Text style={styles.text}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Text>
  </View>
);

const Order = ({ text, description }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>ICON</Text>
      <View style={styles.menuprice}>
        <Text style={styles.textBlack}>{text}</Text>
        <Text style={styles.textPrice}>{description}</Text>
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
    height: 80,
    padding: 15,
    backgroundColor: 'lightgrey',
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuprice: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 15,
    marginTop: 10,
  },
  text: {
    color: 'black',
    fontSize: 14,
    textAlign: 'left',
  },
  textBlack: {
    color: 'black',
    fontSize: 18,
    textAlign: 'left',
  },
  textPrice: {
    color: '#757575',
    fontSize: 14,
    textAlign: 'left',
    marginTop: 5,
  },
});

export default RequesterViewIndividual;
