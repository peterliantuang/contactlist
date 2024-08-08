import AsyncStorage from '@react-native-async-storage/async-storage';

import uuid from 'react-native-uuid';

export const ADD_CONTACT = 'ADD_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const SET_CONTACTS = 'SET_CONTACTS';

export const addContact = (contact) => async (dispatch) => {
  try {
    const newContact = { id: uuid.v4(), ...contact };
    console.log('id:'+uuid.v4()+ ' contacts: ')
    console.log(contact)
    const contacts = await getContactsFromStorage();
    contacts.push(newContact);
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
    dispatch({ type: ADD_CONTACT, payload: newContact });
  } catch (error) {
    console.error('Failed to add contact', error);
  }
};

export const updateContact = (updatedContact) => async (dispatch) => {
  try {
    let contacts = await getContactsFromStorage();
    contacts = contacts.map(contact => 
      contact.id === updatedContact.id ? updatedContact : contact
    );
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
    dispatch({ type: UPDATE_CONTACT, payload: updatedContact });
  } catch (error) {
    console.error('Failed to update contact', error);
  }
};

export const deleteContact = (contactId) => async (dispatch) => {
  try {
    let contacts = await getContactsFromStorage();
    contacts = contacts.filter(contact => contact.id !== contactId);
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
    dispatch({ type: DELETE_CONTACT, payload: contactId });
  } catch (error) {
    console.error('Failed to delete contact', error);
  }
};

export const loadContacts = () => async (dispatch) => {
  try {
    const contacts = await getContactsFromStorage();
    console.log('dispatching.... ')
    dispatch({ type: SET_CONTACTS, payload: contacts });
  } catch (error) {
    console.error('Failed to load contacts', error);
  }
};

const getContactsFromStorage = async () => {
  const contacts = await AsyncStorage.getItem('contacts');
  return contacts ? JSON.parse(contacts) : [];
};
