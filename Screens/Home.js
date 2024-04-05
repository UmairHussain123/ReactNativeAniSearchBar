import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import AnimatedSearchBar from '../Component/AnimatedSearchBar';
const Home = ({navigation}) => {
  const [dataFromChild, setDataFromChild] = useState('');
  const handleDataFromChild = data => {
    setDataFromChild(data);
  };
  console.log(dataFromChild);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AnimatedSearchBar dataFromChild={handleDataFromChild} />
    </View>
  );
};

export default Home;

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
