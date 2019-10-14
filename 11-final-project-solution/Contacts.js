import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import { useContacts } from './useContacts';
import { useChats } from './useChats';
import { createStackNavigator } from 'react-navigation-stack';

import { Ionicons, AntDesign } from '@expo/vector-icons';

const ContactList = props => {
  const { contacts, isLoading, fetchContacts } = useContacts();

  const { getOrCreateChatForContact } = useChats();

  React.useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={contacts}
        refreshing={isLoading}
        onRefresh={fetchContacts}
        // style={{ flex: 1, marginHorizontal: 10 }}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: 'lightgrey' }} />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              getOrCreateChatForContact(item.id).then(chat =>
                props.navigation.navigate('Conversation', { chatId: chat.id })
              )
            }
            style={{ paddingVertical: 15, paddingHorizontal: 5 }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Create')}
        style={{
          width: 48,
          height: 48,
          backgroundColor: '#5D9FEF',
          justifyContent: 'center',
          position: 'absolute',
          right: 16,
          bottom: 14,
          alignItems: 'center',
          borderRadius: 24,
        }}
      >
        <Ionicons name="ios-add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

ContactList.navigationOptions = {
  title: 'Contacts',
};

const CreateContact = props => {
  const [name, setName] = React.useState('');
  const { addContact } = useContacts();
  return (
    <KeyboardAvoidingView
      behavior="padding"
      // Take Header + NavBar heights into account
      keyboardVerticalOffset={128}
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
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
        <Text style={{ flex: 0.2 }}>Name</Text>
        <TextInput
          style={{ borderWidth: 1, paddingVertical: 5, flex: 0.8 }}
          value={name}
          onChangeText={setName}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          addContact(name);
          props.navigation.navigate('List');
        }}
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
          <Text style={{ color: 'white', marginRight: 10 }}>Add</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

CreateContact.navigationOptions = {
  title: 'New',
};

const Contacts = createStackNavigator({
  List: ContactList,
  Create: CreateContact,
});

Contacts.navigationOptions = props => ({
  tabBarIcon: ({ tintColor }) => (
    <AntDesign name="contacts" size={20} color={tintColor} />
  ),
});

export default Contacts;
