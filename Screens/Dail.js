import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AnimatedSearchBar from '../Component/AnimatedSearchBar';

const Dail = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.topView}>
        <AnimatedSearchBar />
      </View>
    </View>
  );
};

export default Dail;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  topView: {
    //  flex: 1,
    height: 100,
    width: '100%',
    backgroundColor: '#f3edf6',
    // alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 20,
  },
});
