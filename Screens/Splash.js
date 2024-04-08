import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import HomeNavigation from '../Navigations/HomeNavigation';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('HomeNavigation');
    }, 500);
  }, []);

  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
