import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Missed from '../Screens/Missed';
import Dail from '../Screens/Dail';
import Incoming from '../Screens/Incoming';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createMaterialBottomTabNavigator();
const HomeNavigation = () => {
  const color = 'white';
  return (
    <Tab.Navigator
      // initialRouteName="Feed"
      activeColor="#e91e63"
      // barStyle={{backgroundColor: 'tomato'}}
    >
      <Tab.Screen
        name="Missed"
        component={Missed}
        options={{
          tabBarLabel: 'Missed',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="call-missed"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Dail"
        component={Dail}
        options={{
          tabBarLabel: 'Dail',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Incoming"
        component={Incoming}
        options={{
          tabBarLabel: 'Incoming',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="Incoming" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
