import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const AddContactScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [phones, setPhones] = useState(['']);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerTitle: 'New Contact',
      headerTitleAlign: 'center', // Center align the title
      headerRight: () => (
        <TouchableOpacity onPress={handleDone}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDone = () => {
    // Handle saving the new contact
    navigation.goBack();
  };

  const addPhoneField = () => {
    setPhones([...phones, '']);
  };

  const handlePhoneChange = (text, index) => {
    const newPhones = phones.slice();
    newPhones[index] = text;
    setPhones(newPhones);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.photoSection}>
        <Image source={require('../assets/user-placeholder.png')} style={styles.photo} />
        <TouchableOpacity>
          <Text style={styles.addPhotoText}>Add Photo</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="First name"
        placeholderTextColor="#888"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        placeholderTextColor="#888"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Company"
        placeholderTextColor="#888"
        value={company}
        onChangeText={setCompany}
      />
      {phones.map((phone, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#888"
          value={phone}
          onChangeText={(text) => handlePhoneChange(text, index)}
          keyboardType="phone-pad"
        />
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addPhoneField}>
        <Text style={styles.addButtonText}>+ add phone</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 18,
    paddingHorizontal: 15,
  },
  doneText: {
    color: '#007AFF',
    fontSize: 18,
    paddingHorizontal: 15,
  },
  photoSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addPhotoText: {
    color: '#007AFF',
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 18,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#00FF00',
    fontSize: 18,
  },
});

export default AddContactScreen;
