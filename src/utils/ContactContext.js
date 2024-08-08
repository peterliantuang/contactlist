import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const storedContacts = await AsyncStorage.getItem('contacts');
        if (storedContacts) {
          setContacts(JSON.parse(storedContacts));
        }
      } catch (error) {
        console.error('Failed to load contacts from storage', error);
      }
    };
    loadContacts();
  }, []);

  const saveContacts = async (newContacts) => {
    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
      setContacts(newContacts);
    } catch (error) {
      console.error('Failed to save contacts to storage', error);
    }
  };

  const addContact = (contact) => {
    const newContacts = [...contacts, contact];
    saveContacts(newContacts);
  };

  const updateContact = (updatedContact) => {
    const newContacts = contacts.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    saveContacts(newContacts);
  };

  const deleteContact = (id) => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    saveContacts(newContacts);
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, updateContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};
