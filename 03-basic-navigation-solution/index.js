import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const ScreenA = props => {
  const [inputValue, setInputValue] = React.useState('');
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}
    >
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          width: '100%',
          padding: 10,
        }}
      />
      <Button
        title="Go to Screen B"
        onPress={() => props.navigation.navigate('ScreenB', { inputValue })}
      />
    </View>
  );
};

ScreenA.navigationOptions = {
  title: 'Screen A',
};
const ScreenB = props => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>InputValue: {props.navigation.getParam('inputValue')}</Text>
      <Text>Screen B</Text>
    </View>
  );
};

const AppNavigator = createStackNavigator(
  {
    ScreenA: {
      screen: ScreenA,
    },
    ScreenB: {
      screen: ScreenB,
      // Can also pass a function: https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
      navigationOptions: {
        title: 'Screen B',
      },
    },
  }
  // Center title on Android
  // { headerLayoutPreset: 'center' }
);

export default createAppContainer(AppNavigator);
