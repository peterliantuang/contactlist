import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const STORAGE_KEY = 'contacts';

export const loadContacts = createAsyncThunk('contacts/loadContacts', async () => {
  const contacts = await AsyncStorage.getItem(STORAGE_KEY);
  return contacts ? JSON.parse(contacts) : [];
});

export const saveContacts = createAsyncThunk('contacts/saveContacts', async (contacts) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      state.push({ id: uuid.v4(), ...action.payload });
    },
    updateContact: (state, action) => {
      const { id, ...changes } = action.payload;
      const index = state.findIndex(contact => contact.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...changes };
      }
    },
    deleteContact: (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
 
});

export const { addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
