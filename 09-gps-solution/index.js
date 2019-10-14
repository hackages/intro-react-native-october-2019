import React from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';

TaskManager.defineTask('GEOFENCING', ({ data: { eventType }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (eventType === Location.GeofencingEventType.Enter) {
    console.log("You've entered Hackages");
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("You've left Hackages");
  }
});

const App = () => {
  const [coords, setCoords] = React.useState(null);
  const [location, setLocation] = React.useState(null);
  const [
    locationPermissionGranted,
    setLocationPermissionGranted,
  ] = React.useState(false);

  React.useEffect(() => {
    Permissions.askAsync(Permissions.LOCATION).then(({ status }) =>
      setLocationPermissionGranted(status === 'granted')
    );
  }, []);

  React.useEffect(() => {
    if (!locationPermissionGranted) return;

    Location.startGeofencingAsync('GEOFENCING', [
      {
        latitude: 50.848692,
        longitude: 4.370031,
        radius: 1000,
      },
    ]);
    return () => {
      Location.stopGeofencingAsync('GEOFENCING');
    };
  }, [locationPermissionGranted]);

  React.useEffect(() => {
    if (!coords) return;
    Location.reverseGeocodeAsync({
      latitude: coords.latitude,
      longitude: coords.longitude,
    }).then(([location]) => setLocation(location));
  }, [coords]);

  React.useEffect(() => {
    if (!locationPermissionGranted) return;
    let unsubscribe = () => {};
    Location.watchPositionAsync(
      { accuracy: Location.Accuracy.Highest },
      location => setCoords(location.coords)
    ).then(({ remove }) => {
      unsubscribe = remove;
    });
    return unsubscribe;
  }, [locationPermissionGranted]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Latitude: {coords && coords.latitude}</Text>
      <Text>Longitude: {coords && coords.longitude}</Text>
      <Text>
        Current Location:
        {location &&
          ` ${location.street}, ${location.postalCode} ${location.city}`}
      </Text>
    </View>
  );
};

export default App;
