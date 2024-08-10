// firstStartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'hasLaunchedBefore';

export const checkFirstStart = createAsyncThunk('firstStart/checkFirstStart', async () => {
  try {
    const hasLaunchedBefore = await AsyncStorage.getItem(STORAGE_KEY);
    console.log('hasLaunchedBefore:', hasLaunchedBefore); // Log the retrieved value

    if (hasLaunchedBefore === null) {
      // This is the first launch
      await AsyncStorage.setItem(STORAGE_KEY, 'true');
      console.log('First start detected. Setting value in AsyncStorage.');
      return true;
    } else {
      // Not the first launch
      console.log('Not the first start. Returning false.');
      return false;
    }
  } catch (error) {
    console.error('Error checking first start:', error);
    return false;
  }
});

const firstStartSlice = createSlice({
  name: 'firstStart',
  initialState: {
    isFirstStart: false,
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkFirstStart.fulfilled, (state, action) => {
      state.isFirstStart = action.payload;
      state.loading = false;
    });
  },
});

export default firstStartSlice.reducer;
