import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const remoteLogin = () =>
  new Promise(res =>
    setTimeout(() => {
      res({});
    }, 1000)
  );

const AuthenticatedStack = createStackNavigator({
  Home: createMaterialTopTabNavigator(
    {
      /* Routes config */
    },
    {
      navigationOptions: props => ({
        title: '', // Set the top bar title
      }),
      tabBarOptions: {
        /* Add tabBarOptions (activeColor, ...) */
      },
    }
  ),
});

const AuthenticatedScreen = props => {
  // Retrieve the user object passed from the navigation
  const user = props.navigation.getParam('user', '');
  return (
    <AuthenticatedStack navigation={props.navigation} screenProps={{ user }} />
  );
};

AuthenticatedScreen.router = AuthenticatedStack.router;

export default createAppContainer(
  createSwitchNavigator(
    {
      Authenticated: AuthenticatedScreen,
      UnAuthenticated: {},
    },
    {
      initialRouteName: 'UnAuthenticated',
    }
  )
);
