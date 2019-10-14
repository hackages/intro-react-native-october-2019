import React from 'react';
import * as api from './api';

const ChatsContext = React.createContext();

export const ChatsProvider = props => {
  const [chats, setChats] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const fetchChats = React.useCallback(() => {
    setIsLoading(true);
    return api.getChats().then(chats => {
      setIsLoading(false);
      setChats(chats);
    });
  }, []);

  const addChat = React.useCallback(contactId => {
    return api.addChat(contactId).then(chat => {
      setChats(chats => [chat, ...chats]);
      return chat;
    });
  }, []);

  const setChat = React.useCallback(
    chat => {
      api
        .setChat(chat)
        .then(chat => setChats(chats.map(c => (c.id === chat.id ? chat : c))));
    },
    [chats]
  );

  const getOrCreateChatForContact = React.useCallback(
    contactId => {
      return api.getChats().then(() => {
        const chat = chats.find(c => c.contactId === contactId);

        if (chat) {
          return chat;
        } else {
          return addChat(contactId);
        }
      });
    },
    [addChat, chats]
  );

  const context = React.useMemo(
    () => ({
      fetchChats,
      isLoading,
      chats,
      addChat,
      setChat,
      getOrCreateChatForContact,
    }),
    [fetchChats, isLoading, chats, addChat, setChat, getOrCreateChatForContact]
  );

  return (
    <ChatsContext.Provider value={context}>
      {props.children}
    </ChatsContext.Provider>
  );
};

export const useChats = () => {
  const context = React.useContext(ChatsContext);
  return context;
};
