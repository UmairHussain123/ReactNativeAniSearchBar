import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';

const Splash = ({navigation}) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5, // Adjust the friction as needed
        tension: 40, // Adjust the tension as needed
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        navigation.replace('HomeNavigation');
      }, 5000);
    });
  }, [navigation, opacityAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../Assets/BackSplash/splash2.png')}
        style={[
          styles.image,
          {
            opacity: opacityAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '98%', // Set width of the image
    height: '70%', // Set height of the image
    resizeMode: 'contain', // Set resizeMode to control how the image is resized
  },
});

export default Splash;
