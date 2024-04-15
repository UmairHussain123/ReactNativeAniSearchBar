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

const Dail = () => {
  const [listData, setListDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataFromChild, setDataFromChild] = useState('');

  const handleDataFromChild = useCallback(
    data => {
      setDataFromChild(data);
    },
    [dataFromChild],
  );

  console.log(dataFromChild);
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

  const ItemView = ({item}) => {
    const colorAvatar = randomColor();
    return (
      // FlatList Item
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 20,
        }}>
        <View style={styles.contactView}>
          <View style={styles.avatarView}>
            {item.name ? (
              <Avatar.Text
                size={50}
                label={item.name.charAt(0)}
                //  style={{backgroundColor: randomColor()}}
              />
            ) : (
              <Avatar.Image size={40} source={require('../Assets/user.png')} />
            )}
          </View>
          <View style={styles.contactInfo}>
            <Text style={{fontWeight: 'bold'}}>
              {item.name ? item.name : item.phoneNumber}
            </Text>
            <Text> {item.dateTime} </Text>
            {/* <Text>{item.duration}</Text> */}
          </View>
        </View>
        <View>
          <IconButton
            icon="phone"
            iconColor={'#6750a4'}
            size={25}
            onPress={() => {
              const args = {
                number: item.phoneNumber, // String value with the number to call
                prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
                skipCanOpen: true, // Skip the canOpenURL check
              };
              call(args).catch(console.error);

              // for sms
              // Linking.openURL(
              //   `sms:/${item.phoneNumber}?addresses=${item.phoneNumber}&body=aa}`,
              // );
              // for wattsup
              //  Linking.openURL('whatsapp://send?text=hello&phone=03022988532');
            }}
          />
        </View>
      </View>
    );
  };
  const outgoing = listData.filter(obj => obj.type == 'OUTGOING');
  const missed = listData.filter(obj => obj.type == 'MISSED');
  const incoming = listData.filter(obj => obj.type == 'INCOMING');

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
      {/* <View style={styles.topView}>
        <AnimatedSearchBar dataFromChild={handleDataFromChild} />
      </View> */}
      {loading ? (
        <ActivityIndicator color="black" style={{margin: 15}} />
      ) : null}
      <FlatList
        data={outgoing}
        //data defined in constructor
        ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View
        initialNumToRender={100}
        // for slow list
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
        // windowSize={5}
        // onEndReachedThreshold={0.2}
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
  contactView: {
    flexDirection: 'row',
    // marginTop: 20,
  },
  avatarView: {},
  contactInfo: {
    marginLeft: 10,
  },
});
