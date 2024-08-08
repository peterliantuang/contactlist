import { ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT, SET_CONTACTS } from './actions';

const initialState = [];

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return [...state, action.payload];
    case UPDATE_CONTACT:
      return state.map(contact => 
        contact.id === action.payload.id ? action.payload : contact
      );
    case DELETE_CONTACT:
      return state.filter(contact => contact.id !== action.payload);
    case SET_CONTACTS:
      return action.payload;
    default:
      return state;
  }
};

export default contactsReducer;
