import React from 'react';
import * as api from './api';

const ContactContext = React.createContext();

export const ContactsProvider = props => {
  const [contacts, setContacts] = React.useState([]);
  const [loadContacts, setLoadContacts] = React.useState(false);
  const fetchContacts = React.useCallback(() => setLoadContacts(true), []);

  const addContact = React.useCallback(contact => {
    api
      .addContact(contact)
      .then(contact => setContacts(contacts => [contact, ...contacts]));
  }, []);

  React.useEffect(() => {
    if (!loadContacts) return;
    api.getContacts().then(contacts => {
      setLoadContacts(false);
      setContacts(contacts);
    });
  }, [loadContacts]);

  const context = React.useMemo(
    () => ({
      fetchContacts,
      isLoading: loadContacts,
      contacts,
      addContact,
    }),
    [addContact, contacts, fetchContacts, loadContacts]
  );

  return (
    <ContactContext.Provider value={context}>
      {props.children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => {
  const context = React.useContext(ContactContext);
  return context;
};
