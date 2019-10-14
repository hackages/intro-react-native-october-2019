import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  Button,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

const App = () => {
  const [rememberMe, setRememberMe] = React.useState('');
  const passwordInputRef = React.createRef(null);
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View
          style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 10 }}
        >
          <View style={{ flexDirection: 'row', marginBottom: 30 }}>
            <Text style={{ alignSelf: 'center', flex: 0.2 }}>Email</Text>
            <TextInput
              placeholder="test@test.com"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current.focus()}
              style={[styles.borderedInput, { flex: 0.8 }]}
            />
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 30 }}>
            <Text style={{ alignSelf: 'center', flex: 0.2 }}>Password</Text>
            <TextInput
              ref={passwordInputRef}
              secureTextEntry={true}
              style={[styles.borderedInput, { flex: 0.8 }]}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ alignSelf: 'center', marginRight: 10 }}>
              Remember me
            </Text>
            <Switch value={rememberMe} onValueChange={setRememberMe} />
          </View>
        </View>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Button title="Sign Up" onPress={() => {}} />
          <Text>Some Legal text that should not be hidden</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  borderedInput: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 5,
    borderRadius: 2,
  },
});

export default App;
