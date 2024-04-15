import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, memo} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedSearchBar = ({dataFromChild}) => {
  const animation = useSharedValue(0);
  const [valueForIcon, setValueForIcon] = useState(1);
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
        style={{
          backgroundColor: 'lightgray',
          borderRadius: 15,
        }}
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
              ? require('../Assets/search8.png')
              : require('../Assets/multiply2.png')
          }
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(AnimatedSearchBar);

const styles = StyleSheet.create({
  img: {
    width: 20,
    height: 100,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'lightgray',
    width: '100%',
    height: 50,
    borderRadius: 15,
  },
  infield: {
    width: '92%',
    height: 50,
    // backgroundColor: 'white',
  },
});
