import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const STORAGE_KEY = 'contacts';

export const loadContacts = createAsyncThunk('contacts/loadContacts', async (_, { dispatch }) => {
  console.log('--- loading from local storage ')
  const contacts = await AsyncStorage.getItem(STORAGE_KEY);
  const parsedContacts = contacts ? JSON.parse(contacts) : [];
  dispatch(setContacts(parsedContacts));
  return parsedContacts;
});

export const saveContacts = async (contacts) => {
  console.log('--- saving to local storage : contacts', JSON.stringify(contacts));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    loading: true,
  },
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
      state.loading = false;
    },
    addContact: (state, action) => {
      const { name, phone } = action.payload;
      console.log('log from redux:  name : ' + name + ' phone: ' + phone);
      state.contacts.push({ id: uuid.v4(), name, phone });
      saveContacts(state.contacts);
    },
    updateContact: (state, action) => {
      const { id, ...changes } = action.payload;
      const index = state.contacts.findIndex(contact => contact.id === id);
      if (index !== -1) {
        state.contacts[index] = { ...state.contacts[index], ...changes };
      }
      saveContacts(state.contacts);
    },
    deleteContact: (state, action) => {
      const newState = state.contacts.filter(contact => contact.id !== action.payload);
      saveContacts(newState);
      state.contacts = newState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.loading = false;
    });
  }
});

export const { setContacts, addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
