import React from 'react';
import { Notifications } from 'expo';
import { View, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log({ token });
}

Notifications.createChannelAndroidAsync('expo', {
  name: 'expo',
  priority: 'high',
  bade: true,
  vibrate: true,
});

const Screen2 = ({
  navigation: {
    state: { params },
  },
}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'blue',
          width: '100%',
          textAlign: 'center',
        }}
      >
        Name received is: {params.name}
      </Text>
    </View>
  );
};

const Screen1 = ({ navigation }) => {
  const handleNotification = React.useCallback(
    notif => {
      console.log(notif);
      navigation.navigate('Screen2', { name: notif.data.name });
    },
    [navigation]
  );

  React.useEffect(() => {
    registerForPushNotificationsAsync();
    const notificationSubscription = Notifications.addListener(
      handleNotification
    );

    return () => {
      notificationSubscription.remove();
    };
  }, [handleNotification]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          width: '100%',
          textAlign: 'center',
        }}
      >
        Notifications
      </Text>
    </View>
  );
};

export default createAppContainer(
  createStackNavigator({
    Screen1,
    Screen2,
  })
);
