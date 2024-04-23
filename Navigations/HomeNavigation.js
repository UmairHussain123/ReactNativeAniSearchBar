import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Missed from '../Screens/Missed';
import Dail from '../Screens/Dail';
import Incoming from '../Screens/Incoming';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AllTimeCall from '../Screens/AllTimeCall';

//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createMaterialBottomTabNavigator();
const size = 20;
const color = '#49454f';
const HomeNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dail"
      activeColor="#49454f"
      inactiveColor="#49454f"
      barStyle={{backgroundColor: '#f3edf6'}}>
      <Tab.Screen
        name="All Time Call"
        component={AllTimeCall}
        options={{
          tabBarIcon: () => {
            return <Icon name="phone-log" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Dail"
        component={Dail}
        options={{
          tabBarIcon: () => {
            return <Icon name="phone-dial" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Missed"
        component={Missed}
        options={{
          tabBarIcon: () => {
            return <Icon name="phone-missed" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Received"
        component={Incoming}
        options={{
          tabBarIcon: () => {
            return <Icon name="phone-incoming" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
