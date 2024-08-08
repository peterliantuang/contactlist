import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { addContact, updateContact } from '../config/redux/actions';

const AddContactScreen = ({ route, navigation }) => {
  const { contact = {}, isEdit = false } = route.params || {};
  const [name, setName] = useState(contact?.name || '');
  const [phone, setPhone] = useState(contact?.phone || '');
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerTitle: isEdit ? 'Edit Contact' : 'New Contact',
      headerTitleAlign: 'center', // Center align the title
      headerRight: () => (
        <TouchableOpacity onPress={handleDone}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, isEdit]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDone = () => {
    if (isEdit) {
      dispatch(updateContact({ ...contact, name, phone }));
    } else {
      dispatch(addContact({ name, phone }));
    }
    navigation.goBack();
  };

  const getInitials = (name) => {
    const nameArray = name.split(' ');
    const initials = nameArray.map(part => part.charAt(0)).join('');
    return initials.toUpperCase();
  };

  return (
    <View style={styles.container}>
      <View style={styles.photoSection}>
        {name ? (
          <View style={styles.profileImage}>
            <Text style={styles.initials}>{getInitials(name)}</Text>
          </View>
        ) : (
          <Image source={require('../assets/user-placeholder.png')} style={styles.photo} />
        )}
        <TouchableOpacity>
          <Text style={styles.addPhotoText}>Add Photo</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Full name"
        placeholderTextColor="#888"
        defaultValue={name}
        onChangeText={newName => setName(newName)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        defaultValue={phone}
        onChangeText={newPhone => setPhone(newPhone)}
      />
    </View>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 36,
    color: '#fff',
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
});

export default AddContactScreen;
