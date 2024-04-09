import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AnimatedSearchBar from '../Component/AnimatedSearchBar';
import CallLog from 'react-native-call-log';
const Dail = () => {
  const [listData, setListDate] = useState([]);
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
        CallLog.loadAll().then(c => {
          setListDate(c);
        });
        CallLogs.load(10).then(c => console.log(c));
        // You can now access the call log
      } else {
        console.log('Call log permission denied');
        // Handle permission denied case
      }
    } catch (err) {
      console.warn(err);
    }
  }
  async function fetchCallLog() {
    const callLog = await CallLog.load(10);
    console.log('Call log:', callLog);
  }
  useEffect(() => {
    requestCallLogPermission();
    fetchCallLog();
  }, []);
  const ItemView = ({item}) => {
    return (
      // FlatList Item
      <View>
        <Text style={styles.textStyle}>
          Name : {item.name ? item.name : 'NA'}
          {'\n'}
          DateTime : {item.dateTime}
          {'\n'}
          Duration : {item.duration}
          {'\n'}
          PhoneNumber : {item.phoneNumber}
          {'\n'}
          RawType : {item.rawType}
          {'\n'}
          Timestamp : {item.timestamp}
          {'\n'}
          Type : {item.type}
        </Text>
      </View>
    );
  };
  const outgoing = listData.filter(obj => obj.type == 'OUTGOING');
  // console.log('>>>>>', newArray);
  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.topView}>
        <AnimatedSearchBar />
      </View>
      <FlatList
        data={outgoing}
        //data defined in constructor
        ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
      />
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
