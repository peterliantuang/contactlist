import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import AddContactScreen from '../../screens/AddContactScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="AddContact" component={AddContactScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
