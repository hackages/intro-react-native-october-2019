import { AsyncStorage } from 'react-native';

export const addContact = name => {
  const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  const contact = {
    id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
    name,
  };
  return AsyncStorage.mergeItem(
    'contacts',
    JSON.stringify({ [id]: contact })
  ).then(() => contact);
};

export const getContacts = () =>
  // AsyncStorage.removeItem('contacts');
  AsyncStorage.getItem('contacts').then(
    contacts =>
      new Promise(res => {
        setTimeout(() => {
          res(Object.values(JSON.parse(contacts || '{}')));
        }, 1000);
      })
  );
export const addChat = contactId => {
  const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  const chat = {
    id,
    contactId,
    messages: [],
  };
  return AsyncStorage.mergeItem('chats', JSON.stringify({ [id]: chat })).then(
    () => chat
  );
};

export const setChat = chat => {
  return AsyncStorage.mergeItem('chats', JSON.stringify({ [chat.id]: chat }))
    .then(() => AsyncStorage.getItem('chats'))
    .then(() => chat);
};

export const getChats = () =>
  // AsyncStorage.removeItem('chats');
  AsyncStorage.getItem('chats').then(
    chats =>
      new Promise(res => {
        setTimeout(() => {
          res(Object.values(JSON.parse(chats || '{}')));
        }, 1000);
      })
  );

export const login = name => AsyncStorage.setItem('currentUser', name);
export const logout = () => AsyncStorage.removeItem('currentUser');
export const getCurrentUser = () => AsyncStorage.getItem('currentUser');
