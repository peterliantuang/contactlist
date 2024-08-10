import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddContactScreen from '../../screens/AddContactScreen';
import ContactListUseStateScreen from '../../screens/ContactListScreen';
import ContactDetailScreen from '../../screens/ContactDetailScreen';
import CallingScreen from '../../screens/CallingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UseStateContactList" component={ContactListUseStateScreen} />
      <Stack.Screen name="AddContact" component={AddContactScreen} />
      <Stack.Screen name="ContactDetail" component={ContactDetailScreen} />
      <Stack.Screen name="CallingScreen" component={CallingScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
