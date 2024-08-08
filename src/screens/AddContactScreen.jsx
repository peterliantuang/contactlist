import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LineBreak from '../utils/LineBreak';

const AddContactScreen = ({ route, navigation }) => {
  const { contact = {}, isEdit = false } = route.params || {};
  const [name, setName] = useState(contact?.name || '');
  const [phone, setPhone] = useState(contact?.phone || '');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the default app bar
    });
  }, [navigation]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDone = () => {
    // Handle saving the new or edited contact
    navigation.goBack();
  };

  const getInitials = (name) => {
    const nameArray = name.split(' ');
    const initials = nameArray.map(part => part.charAt(0)).join('');
    return initials.toUpperCase();
  };

  return (
    <View style={styles.container}>
      <View style={styles.customAppBar}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEdit ? 'Edit Contact' : 'New Contact'}</Text>
        <TouchableOpacity onPress={handleDone}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.upperSection}>
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
      </View>
      <TextInput
        style={styles.input}
        placeholder="Full name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  customAppBar: {
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    marginTop:15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#292828',
  },
  headerTitle: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 18,
  },
  doneText: {
    color: '#007AFF',
    fontSize: 18,
  },
  upperSection: {
    backgroundColor: '#292828',
    height:250,
    paddingBottom: 20,
  },
  photoSection: {
    alignItems: 'center',
    
    marginVertical: 20,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
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
    backgroundColor: '#d3d3d3',
    borderBottomColor:'#fff',
    marginTop:2,
    color: '#fff',
    fontSize: 18,
    padding: 10,
    paddingHorizontal:40,
  },
});

export default AddContactScreen;
