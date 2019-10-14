import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Button,
  AsyncStorage,
  Platform,
  StatusBar,
} from 'react-native';

const App = () => {
  const [todos, setTodos] = React.useState(() => []);
  const [newTodo, setNewTodo] = React.useState('');
  const todosLoadedFromStorage = React.useRef(false);

  React.useEffect(() => {
    if (todosLoadedFromStorage.current) {
      AsyncStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  React.useEffect(() => {
    AsyncStorage.getItem('todos').then(data => {
      data && setTodos(JSON.parse(data));
      todosLoadedFromStorage.current = true;
    });
  }, []);

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
      <View style={{ paddingHorizontal: 15, flex: 1 }}>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
          }}
        >
          <TextInput
            value={newTodo}
            onChangeText={setNewTodo}
            style={{
              borderWidth: 1,
              paddingVertical: 5,
              flex: 1,
              marginHorizontal: 5,
            }}
          />
          <Button
            title="Add"
            onPress={() => {
              if (newTodo !== '') {
                setNewTodo('');
                setTodos(todos => [
                  ...todos,
                  {
                    id: Math.round(Math.random() * 10000),
                    name: newTodo,
                  },
                ]);
              }
            }}
          />
        </View>
        <FlatList
          data={todos}
          style={{ flex: 1, marginTop: 10 }}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
