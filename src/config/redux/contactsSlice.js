import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  contacts: [],
  loading: true,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
      state.loading = false;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
      AsyncStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      AsyncStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setContacts, addContact, deleteContact, setLoading } = contactsSlice.actions;

export const loadContacts = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    const contacts = await AsyncStorage.getItem('contacts');
    if (contacts !== null) {
      dispatch(setContacts(JSON.parse(contacts)));
    } else {
      dispatch(setContacts([]));
    }
  } catch (error) {
    console.error(error);
    dispatch(setContacts([])); // In case of error, set contacts to empty array
  } finally {
    dispatch(setLoading(false));
  }
};

export default contactsSlice.reducer;
