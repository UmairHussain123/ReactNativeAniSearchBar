import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  FlatList,
  Linking,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import AnimatedSearchBar from '../Component/AnimatedSearchBar';
import CallLog from 'react-native-call-log';
import {ActivityIndicator, Avatar, IconButton} from 'react-native-paper';
import call from 'react-native-phone-call';
import randomColor from 'randomcolor';
import List from '../Component/List';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Missed = () => {
  const [listData, setListDate] = useState([]);
  const [loading, setLoading] = useState(true);

  const avatarRef = React.createRef();
  const firstLineRef = React.createRef();

  const dateInTimestamp = () => {
    const currentDate = new Date();

    // Subtract one month from the current date
    currentDate.setMonth(currentDate.getMonth() - 1);

    // Get the ISO string representation of the date
    const isoString = currentDate.toISOString();

    console.log('/>/', isoString); // ISO 8601 format
    const timestamp = Date.parse(isoString) / 1000; // Divide by 1000 to convert milliseconds to seconds

    console.log('/>/', timestamp); // Output: 1571815432

    return Math.floor(timestamp);
  };

  const filter = {
    minTimestamp: dateInTimestamp(),
  };
  async function requestCallLogPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Permission',
          message: 'This app needs access to your call log.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Call log permission granted');
        CallLog.load(-1, filter).then(c => {
          setListDate(c);
          setLoading(false);
        });
        //  CallLog.load(10).then(c => console.log(c));

        // You can now access the call log
      } else {
        console.log('Call log permission denied');
        // Handle permission denied case
      }
    } catch (err) {
      console.warn(err);
    }
  }
  // async function fetchCallLog() {
  //    const callLog = await CallLog.load(10);
  //   // console.log('Call log:', callLog);
  // }
  useEffect(() => {
    requestCallLogPermission();
    // fetchCallLog();
  }, []);

  //const outgoing = listData.filter(obj => obj.type == 'OUTGOING');

  const outgoing = listData
    .filter(obj => obj.type == 'MISSED')
    .map((obj, index) => ({
      ...obj,
      color: randomColor(),
    }));

  return (
    <View style={styles.mainView}>
      {/* <View style={styles.topView}>
        <AnimatedSearchBar dataFromChild={handleDataFromChild} />
      </View> */}
      {loading ? (
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1, 1, , 1, 1]}
          renderItem={() => {
            return (
              <View style={{flexDirection: 'row', padding: 20}}>
                <ShimmerPlaceholder
                  ref={avatarRef}
                  style={{borderRadius: 50, width: 50, height: 50}}
                  shimmerColors={['#eaddff', '#f3edf7', '#cdd3ff']}
                />
                <View style={{marginLeft: 10}}>
                  <ShimmerPlaceholder
                    ref={firstLineRef}
                    style={{width: '100%', height: 50}}
                    shimmerColors={['#eaddff', '#b5bcf1', '#cdd3ff']}
                  />
                  {/* <ShimmerPlaceholder
               ref={secondLineRef}
               stopAutoRun
               style={{width: '100%'}}
             /> */}
                  {/* <ShimmerPlaceholder ref={thirdLineRef} stopAutoRun /> */}
                </View>
              </View>
            );
          }}></FlatList>
      ) : null}
      <List data={outgoing}></List>
    </View>
  );
};

export default Missed;

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
  contactView: {
    flexDirection: 'row',
    // marginTop: 20,
  },
  avatarView: {},
  contactInfo: {
    marginLeft: 10,
  },
});
