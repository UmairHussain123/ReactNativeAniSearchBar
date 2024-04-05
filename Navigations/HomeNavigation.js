import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Missed from '../Screens/Missed';
import Dail from '../Screens/Dail';
import Incoming from '../Screens/Incoming';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();
const HomeNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{backgroundColor: '#694fad'}}>
      <Tab.Screen name="Missed" component={Missed} />
      <Tab.Screen name="Dail" component={Dail} />
      <Tab.Screen name="Incoming" component={Incoming} />
    </Tab.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
