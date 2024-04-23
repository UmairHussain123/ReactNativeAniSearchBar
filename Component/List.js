import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  FlatList,
  Linking,
  Animated,
} from 'react-native';

import call from 'react-native-phone-call';
import React, {memo, useEffect, useState} from 'react';
import randomColor from 'randomcolor';
import {Avatar, IconButton} from 'react-native-paper';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const List = ({data}) => {
  console.log(data);
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
                style={{backgroundColor: item.color}}
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
  return (
    <View>
      <FlatList
        data={data}
        //data defined in constructor
        ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View
        initialNumToRender={10}
        // for slow list
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
        // windowSize={5}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default memo(List);

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
