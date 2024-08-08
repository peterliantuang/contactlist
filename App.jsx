import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/config/redux/store';
import Navigation from './src/config/navigation';

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default App;
