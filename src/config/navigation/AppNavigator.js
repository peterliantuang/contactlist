import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import AddContactScreen from '../../screens/AddContactScreen';
import MainScreen from '../../screens/MainScreen';
import ContactListUseStateScreen from '../../screens/ContactListUseStateScreen';
import ContactListReduxScreen from '../../screens/ContactListReduxScreen';
import ContactDetailScreen from '../../screens/ContactDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} /> */}
      <Stack.Screen name="UseStateContactList" component={ContactListUseStateScreen} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="AddContact" component={AddContactScreen} />
      <Stack.Screen name="ContactDetail" component={ContactDetailScreen} />
      {/* <Stack.Screen name="ContactDetailScreen" component={ContactDetailScreen} /> */}
      
      <Stack.Screen name="ReduxContactList" component={ContactListReduxScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
