import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
const Details = () => {
  return (
    <View>
      <Animated.Image
        source={{uri: 'https://picsum.photos/id/39/200'}}
        style={{width: 300, height: 300}}
        sharedTransitionTag="tag"
      />
      <Text>Details</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  img: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
});
