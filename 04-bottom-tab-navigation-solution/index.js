import React from 'react';
import { Text, View, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const TimelineScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Timeline!</Text>
    </View>
  );
};

TimelineScreen.navigationOptions = {
  tabBarIcon: props => (
    <Image
      source={require('./home.png')}
      style={{ height: 20, tintColor: props.tintColor }}
      resizeMode="contain"
    />
  ),
};

const SearchScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search</Text>
    </View>
  );
};

SearchScreen.navigationOptions = {
  tabBarIcon: props => (
    <Image
      source={require('./search.png')}
      style={{ height: 20, tintColor: props.tintColor }}
      resizeMode="contain"
    />
  ),
};

const NotificationsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications</Text>
    </View>
  );
};

NotificationsScreen.navigationOptions = {
  tabBarIcon: props => (
    <Image
      source={require('./notification.png')}
      style={{ height: 20, tintColor: props.tintColor }}
      resizeMode="contain"
    />
  ),
};

const MessagesScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Messages</Text>
    </View>
  );
};

MessagesScreen.navigationOptions = {
  tabBarIcon: props => (
    <Image
      source={require('./message.png')}
      style={{ height: 20, tintColor: props.tintColor }}
      resizeMode="contain"
    />
  ),
};

const TabNavigator = createBottomTabNavigator(
  {
    Timeline: {
      screen: TimelineScreen,
    },
    Search: SearchScreen,
    Notifications: NotificationsScreen,
    Messages: MessagesScreen,
  }
  // { tabBarOptions: { activeTintColor: 'red' } }
);

export default createAppContainer(TabNavigator);
