import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import firstStartSlice from './firstStartSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    firstStart: firstStartSlice,
  },
});

export default store;
