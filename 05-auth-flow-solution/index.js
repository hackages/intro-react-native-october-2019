import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const Input = ({ label, ...props }) => (
  <View
    style={{
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    }}
  >
    <Text style={{ flex: 0.2 }}>{label}</Text>
    <TextInput
      style={{ borderWidth: 1, paddingVertical: 5, flex: 0.8 }}
      {...props}
    />
  </View>
);

const remoteLogin = () =>
  new Promise(res =>
    setTimeout(() => {
      res({});
    }, 1000)
  );

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>HomeScreen</Text>
    </View>
  );
};

HomeScreen.navigationOptions = {
  title: 'Home',
};
const NotificationScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>NotificationScreen</Text>
    </View>
  );
};

NotificationScreen.navigationOptions = {
  title: 'Notifications',
};

const SignInScreen = props => {
  const [login, setLogin] = React.useState('');
  const [doLogin, setDoLogin] = React.useState(false);

  React.useEffect(() => {
    if (doLogin) {
      remoteLogin().then(() => {
        setDoLogin(false);
        props.navigation.navigate('Authenticated', { user: login });
      });
    }
  }, [doLogin, login, props.navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 15,
      }}
    >
      <Input label="Login" value={login} onChangeText={setLogin} />
      <Input label="Password" secureTextEntry={true} />
      <TouchableOpacity
        onPress={() => setDoLogin(true)}
        style={{
          alignSelf: 'center',
          borderRadius: 20,
          width: 150,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#5D9FEF',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'white', marginRight: 10 }}>Sign In</Text>
          {doLogin && (
            <View>
              <ActivityIndicator color="white" size="small" />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

SignInScreen.navigationOptions = {
  title: 'Sign In',
};

const AuthenticatedStack = createStackNavigator({
  Home: createMaterialTopTabNavigator(
    { Home: HomeScreen, Notification: NotificationScreen },
    {
      navigationOptions: props => ({
        title: `Hello ${props.screenProps.user}`,
      }),
      tabBarOptions: {
        inactiveTintColor: 'black',
        indicatorStyle: {
          backgroundColor: '#5D9FEF',
        },
        activeTintColor: '#5D9FEF',
        style: { backgroundColor: 'white' },
      },
    }
  ),
});
const UnAuthenticatedStack = createStackNavigator({ SignIn: SignInScreen });

const AuthenticatedScreen = props => {
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
      UnAuthenticated: UnAuthenticatedStack,
    },
    {
      initialRouteName: 'UnAuthenticated',
    }
  )
);
