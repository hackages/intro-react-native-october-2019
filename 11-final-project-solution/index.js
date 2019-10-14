import React from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import Contacts from './Contacts';
import Chats from './Chats';
import { ContactsProvider } from './useContacts';
import { ChatsProvider } from './useChats';
import { AuthProvider, useAuth } from './useAuth';
import {
  createAppContainer,
  SafeAreaView,
  createSwitchNavigator,
} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';

const TabNavigator = createBottomTabNavigator({
  Chat: {
    screen: Chats,
  },
  Contacts: Contacts,
});

const Drawer = props => {
  const { logout, currentUser } = useAuth();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: Platform.select({
          ios: 0,
          android: StatusBar.currentHeight,
        }),
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          marginBottom: 10,
          borderBottomColor: '#eee',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Image
            source={require('./avatar.png')}
            style={{ width: 40, height: 40, borderRadius: 20, margin: 10 }}
          />
          <Text style={{ fontWeight: 'bold' }}>{currentUser || 'Unknown'}</Text>
        </View>
      </View>
      <View>
        <DrawerNavigatorItems
          {...props}
          onItemPress={item => {
            if (item.route.key === 'Disconnect') {
              logout().then(() => props.navigation.navigate('UnAuthenticated'));
            } else {
              props.onItemPress(item);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const Disconnect = () => (
  <View>
    <Text>Disconnect</Text>
  </View>
);

Disconnect.navigationOptions = {
  drawerIcon: props => (
    <AntDesign name="logout" size={20} color={props.tintColor} />
  ),
};

const HomeNavigator = props => {
  return (
    <ContactsProvider>
      <ChatsProvider>
        <TabNavigator navigation={props.navigation} />
      </ChatsProvider>
    </ContactsProvider>
  );
};

HomeNavigator.router = TabNavigator.router;
HomeNavigator.navigationOptions = {
  drawerIcon: props => (
    <AntDesign name="home" size={20} color={props.tintColor} />
  ),
};

const AuthenticatedStack = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
    },
    Disconnect: Disconnect,
  },
  {
    contentComponent: Drawer,
  }
);

const UnAuthenticatedScreen = props => {
  const [username, setUsername] = React.useState('');
  const { login } = useAuth();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 15,
      }}
    >
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}
      >
        <Text style={{ flex: 0.2 }}>Login</Text>
        <TextInput
          style={{ borderWidth: 1, paddingVertical: 5, flex: 0.8 }}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}
      >
        <Text style={{ flex: 0.2 }}>Password</Text>
        <TextInput
          style={{ borderWidth: 1, paddingVertical: 5, flex: 0.8 }}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => login(username, '')}
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
          <Text style={{ color: 'white', marginRight: 10 }}>Log In</Text>
          {/* {doLogin && (
            <View>
              <ActivityIndicator color="white" size="small" />
            </View>
          )} */}
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const SwitchNavigator = createSwitchNavigator(
  {
    Authenticated: AuthenticatedStack,
    UnAuthenticated: UnAuthenticatedScreen,
  },
  {
    initialRouteName: 'UnAuthenticated',
  }
);

const MainStack = props => {
  const { isAuthenticated, loadingUserFromStorage } = useAuth();
  React.useEffect(() => {
    if (isAuthenticated) {
      props.navigation.navigate('Authenticated');
    }
  }, [isAuthenticated, props.navigation]);
  return loadingUserFromStorage ? (
    <View />
  ) : (
    <SwitchNavigator navigation={props.navigation} />
  );
};

MainStack.router = SwitchNavigator.router;

const AppContainer = createAppContainer(MainStack);

export default () => {
  return (
    <AuthProvider>
      <AppContainer />
    </AuthProvider>
  );
};
