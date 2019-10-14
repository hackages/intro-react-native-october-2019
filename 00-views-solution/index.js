import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import WelcomeMessage from './WelcomeMessage';

const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // Platform specific code: https://facebook.github.io/react-native/docs/platform-specific-code
        paddingTop: Platform.select({
          ios: 0,
          // SafeAreView does not work on Android. See: https://facebook.github.io/react-native/docs/safeareaview#docsNav
          android: StatusBar.currentHeight,
        }),
      }}
    >
      <Text style={styles.title}>React Native App</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <View>
            <Text>Menu 1</Text>
          </View>
          <View>
            <Text>Menu 2</Text>
          </View>
          <View>
            <Text>Menu 3</Text>
          </View>
        </View>
      </View>
      <View style={styles.welcomeMessage}>
        <WelcomeMessage />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  welcomeMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
