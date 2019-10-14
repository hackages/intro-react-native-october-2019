import React from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <TouchableOpacity onPress={() => Linking.openURL(`tel:+32476349824`)}>
          <Feather name="phone" size={32} color="limegreen" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`sms:+32476349824`)}>
          <Feather name="message-circle" size={32} color="dodgerblue" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.google.com/maps/search/?api=1&query=hackages'
            )
          }
        >
          <Feather name="map" size={32} color="chocolate" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('http://maps.apple.com/?q=hackages')}
        >
          <Feather name="map-pin" size={32} color="darkorchid" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
