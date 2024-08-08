import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadContacts, addContact, deleteContact } from '../config/redux/contactsSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomModal from '../components/CustomModal'; // Adjust the path as needed

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { contacts, loading } = useSelector(state => state.contacts);
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'ContactList',
      headerStyle: {
        backgroundColor: '#0e96eb',
      },
      headerTitleStyle: {
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
      },
      headerTitleAlign: 'center',
    });

    dispatch(loadContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
    setModalVisible(false);
  };

  const handleEdit = () => {
    navigation.navigate('EditContact', { contact: selectedContact });
    setModalVisible(false);
  };

  const openModal = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <View>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.phoneText}>{item.phone}</Text>
            </View>
            <TouchableOpacity onPress={() => openModal(item)}>
              <Icon name="ellipsis-vertical" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Add Contact" onPress={() => navigation.navigate('AddContact')} />
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onEdit={handleEdit}
        onDelete={() => handleDelete(selectedContact?.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameText: {
    fontSize: 16,
  },
  phoneText: {
    fontSize: 18,
    color: 'black',
  },
});

export default HomeScreen;
