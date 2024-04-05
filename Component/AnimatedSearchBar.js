import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedSearchBar = ({dataFromChild}) => {
  const animation = useSharedValue(0);
  const [valueForIcon, setValueForIcon] = useState(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width:
        animation.value == 1
          ? withTiming(300, {duration: 200})
          : withTiming(0, {duration: 200}),
    };
  });
  return (
    <Animated.View style={[styles.inner, animatedStyles]}>
      <TextInput
        style={styles.infield}
        placeholder="search hear"
        onChangeText={text => {
          dataFromChild(text);
        }}></TextInput>

      <TouchableOpacity
        onPress={() => {
          if (animation.value == 1) {
            animation.value = 0;
            setValueForIcon(1);
          } else {
            animation.value = 1;
            setValueForIcon(0);
          }
        }}>
        <Image
          source={
            valueForIcon == 1
              ? require('../Assets/search1.png')
              : require('../Assets/multiply.png')
          }
          //  style={{width: 300, height: 300}}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AnimatedSearchBar;

const styles = StyleSheet.create({
  img: {
    with: 20,
    height: 100,
  },
  inner: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    width: '85%',
    height: 50,
  },
  infield: {
    width: '85%',
    height: 50,
    // backgroundColor: 'white',
  },
});
