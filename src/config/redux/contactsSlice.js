import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const STORAGE_KEY = 'contacts';

export const loadContacts = createAsyncThunk('contacts/loadContacts', async (_, { dispatch }) => {
  console.log('--- loading from local storage ');
  const contacts = await AsyncStorage.getItem(STORAGE_KEY);
  const parsedContacts = contacts ? JSON.parse(contacts) : [];
  
  // Sort contacts in ascending order by name
  parsedContacts.sort((a, b) => a.name.localeCompare(b.name));
  
  dispatch(setContacts(parsedContacts));
  return parsedContacts;
});

export const filteredContacts = async (contacts) => {
  console.log('--- fildering contacts ');
};


export const saveContacts = async (contacts) => {
  console.log('--- saving to local storage ');
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
    filterContactss:(state, action) =>{
      console.log('----')
    },
    addContact: (state, action) => {
      const { name, phone } = action.payload;
      console.log('log from redux:  name : ' + name + ' phone: ' + phone);
      state.contacts.push({ id: uuid.v4(), name, phone });
      
      // Sort contacts in ascending order by name
      state.contacts.sort((a, b) => a.name.localeCompare(b.name));
      
      saveContacts(state.contacts);
    },
    updateContact: (state, action) => {
      const { id, ...changes } = action.payload;
      const index = state.contacts.findIndex(contact => contact.id === id);
      if (index !== -1) {
        state.contacts[index] = { ...state.contacts[index], ...changes };
      }
      
      // Sort contacts in ascending order by name
      state.contacts.sort((a, b) => a.name.localeCompare(b.name));
      
      saveContacts(state.contacts);
    },
    deleteContact: (state, action) => {
      const newState = state.contacts.filter(contact => contact.id !== action.payload);
      
      // Sort contacts in ascending order by name
      newState.sort((a, b) => a.name.localeCompare(b.name));
      
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
