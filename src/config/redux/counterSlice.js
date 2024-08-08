import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
    count: 0,
    loading: true,
  };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCount: (state, action) => {
        state.count = action.payload;
        state.loading = false;
    },
    increment: state => {
      state.count += 1;
      AsyncStorage.setItem('count', JSON.stringify(state.count));
    },
    decrement: state => {
        state.count -= 1;
        AsyncStorage.setItem('count', JSON.stringify(state.count));
      },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
  },
});

export const { increment, decrement, setCount, setLoading  } = counterSlice.actions;

export const loadCount = () => async dispatch => {
    try {
      const count = await AsyncStorage.getItem('count');
      if (count !== null) {
        dispatch(setCount(JSON.parse(count)));
      } else {
        dispatch(setCount(0));
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
export default counterSlice.reducer;
