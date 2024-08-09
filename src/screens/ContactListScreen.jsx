import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { loadContacts, addContact } from '../config/redux/contactsSlice';
import uuid from 'react-native-uuid';

// Utility functions for generating random names and phone numbers
const getRandomName = () => {
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'Jessica', 'Daniel', 'Sarah', 'James', 'Laura', 'David'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

const getRandomPhoneNumber = () => {
  const randomDigits = () => Math.floor(Math.random() * 10);
  return `(${randomDigits()}${randomDigits()}${randomDigits()}) ${randomDigits()}${randomDigits()}${randomDigits()}-${randomDigits()}${randomDigits()}${randomDigits()}${randomDigits()}`;
};

const ContactListScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  const scrollOffsetY = useRef(0);

  const handleScroll = (event) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;

    // Check if the user has scrolled up and reached the top
    if (currentOffsetY <= 0 && scrollOffsetY.current > 0) {
      console.log('Scroll up is ended');
      setIsSearchFocused(false)
      setSearch('')
    }

    // Update the scroll position
    scrollOffsetY.current = currentOffsetY;
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await dispatch(loadContacts());
      // if (contacts.length < 15) {
      //   for (let i = 1; i <= 15; i++) {
      //     dispatch(addContact({
      //       id: uuid.v4(),
      //       name: getRandomName(),
      //       phone: getRandomPhoneNumber(),
      //     }));
      //   }
      // }
    };

    loadInitialData();

    

    navigation.setOptions({
      headerShown: !isSearchFocused,
      header: () => (
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.headerIcon}>
              <Icon name="chevron-back" size={27} color="#007AFF" />
              <Text style={styles.headerText}>Lists</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('AddContact')}>
            <Icon name="add" size={30} color="#007AFF" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, dispatch, contacts.length]);

  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()));

  const renderHeaderComponent = () => (
    <>
      {!isSearchFocused && <Text style={styles.headerTitle}>Contacts</Text>}
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => {
          setIsSearchFocused(true);
          searchInputRef.current?.focus();
        }}
      >
        <Icon name="search-outline" size={20} color="#fff" />
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
          onFocus={() => setIsSearchFocused(true)}
        />
        {isSearchFocused && (
          <TouchableOpacity onPress={() => { setSearch(''); setIsSearchFocused(false); }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {!isSearchFocused && (
        <View style={styles.contactItem}>
          <Image source={require('../assets/user1.webp')} style={styles.profileIcon} />
          <View style={styles.contactInfo}>
            <Text style={[styles.contactName, styles.myName]}>Peter Gangmei</Text>
            <Text style={styles.contactType}>982-144-9581</Text>
          </View>
        </View>
      )}
    </>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ContactDetail', { contactId: item.id })}>
      <View style={styles.contactItem}>
        <Text style={styles.contactName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={renderHeaderComponent}
          data={filteredContacts}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          onScroll={handleScroll}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#000',
  },
  listContentContainer: {
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 80,
    backgroundColor: '#000',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: '#007AFF',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#fff',
  },
  headerIcon: {
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#333',
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    color: '#fff',
  },
  cancelText: {
    color: '#007AFF',
    marginLeft: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  contactInfo: {
    marginLeft: 10,
  },
  contactName: {
    fontSize: 16,
    color: '#fff',
  },
  myName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  contactType: {
    color: '#999',
    fontSize: 16,
  },
  profileIcon: {
    borderRadius: 50,
    width: 60,
    height: 60,
    marginVertical:10,
  },
});

export default ContactListScreen;
