import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Home from '../Screens/Home';
import Splash from '../Screens/Splash';
import Details from '../Screens/Details';
import HomeNavigation from './HomeNavigation';

const Stack = createNativeStackNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="HomeNavigation"
          component={HomeNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;

const styles = StyleSheet.create({});
