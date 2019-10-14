import React from 'react';
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { useChats } from './useChats';

import { Ionicons } from '@expo/vector-icons';

import { Feather } from '@expo/vector-icons';
import { useContacts } from './useContacts';
import { SafeAreaView } from 'react-navigation';

const ChatList = props => {
  const { chats, isLoading: isLoadingChats, fetchChats } = useChats();
  const {
    contacts,
    isLoading: isLoadingContacts,
    fetchContacts,
  } = useContacts();

  React.useEffect(() => {
    fetchChats();
    fetchContacts();
  }, [fetchChats, fetchContacts]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={chats}
        refreshing={isLoadingChats || isLoadingContacts}
        onRefresh={fetchChats}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: 'lightgrey' }} />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Conversation', { chatId: item.id })
            }
            style={{ paddingVertical: 15, paddingHorizontal: 5 }}
          >
            <Text>
              {(contacts.find(c => c.id === item.contactId) || {}).name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

ChatList.navigationOptions = {
  title: 'Chats',
};

const Conversation = props => {
  const { chats, setChat } = useChats();
  const [inputValue, setInputValue] = React.useState('');
  const chatId = props.navigation.getParam('chatId');
  const chat = React.useMemo(() => {
    return chats.find(c => c.id === chatId);
  }, [chatId, chats]);

  const sRef = React.useRef(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        ref={sRef}
        style={{ flex: 1 }}
        data={chat.messages}
        inverted={true}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              height: 80,
              margin: 10,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>{item}</Text>
          </View>
        )}
      />
      <View
        style={{
          borderWidth: 1,
          borderRadius: 50,
          paddingVertical: 5,
          paddingHorizontal: 10,
          flexDirection: 'row',
        }}
      >
        <TextInput
          onChangeText={setInputValue}
          value={inputValue}
          style={{ flex: 1 }}
        />
        <TouchableOpacity
          onPress={() => {
            setChat({ ...chat, messages: [inputValue, ...chat.messages] });
            setInputValue('');
            chat.messages.length &&
              sRef &&
              sRef.current.scrollToIndex({ index: 0 });
          }}
        >
          <Ionicons name="md-send" size={32} color="#5D9FEF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Chats = createStackNavigator({
  List: ChatList,
  Conversation: Conversation,
});

const KeyboardAvoidingChats = props => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <Chats {...props} />
    </KeyboardAvoidingView>
  );
};

KeyboardAvoidingChats.navigationOptions = () => ({
  tabBarIcon: ({ tintColor }) => (
    <Feather name="message-square" size={20} color={tintColor} />
  ),
});

KeyboardAvoidingChats.router = Chats.router;

export default KeyboardAvoidingChats;
