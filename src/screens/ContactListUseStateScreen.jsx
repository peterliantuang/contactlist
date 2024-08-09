import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SectionList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { loadContacts, deleteContact } from '../config/redux/contactsSlice';

const ContactListScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const stickySearchRef = useRef(null);
  const searchInputRef = useRef(null);
  const stickySearchInputRef = useRef(null);
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
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
    dispatch(loadContacts());
  }, [navigation, dispatch]);

  const handleScroll = () => {
    searchContainerRef.current?.measure((fx, fy, width, height, px, py) => {
      setIsSearchSticky(py <= 80);
    });
  };

  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()));

  const sectionsListData = isSearchFocused
    ? [{ title: 'Top Name Matches', data: filteredContacts }]
    : Object.values(
        contacts
          .sort((a, b) => a.name.localeCompare(b.name))
          .reduce((acc, contact) => {
            const firstLetter = contact.name[0].toUpperCase();
            if (!acc[firstLetter]) {
              acc[firstLetter] = { title: firstLetter, data: [] };
            }
            acc[firstLetter].data.push(contact);
            return acc;
          }, {})
      );

  const renderHeaderComponent = () => (
    <>
      {!isSearchFocused && <Text style={styles.headerTitle}>Contacts</Text>}
      <TouchableOpacity
        ref={searchContainerRef}
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
          <TouchableOpacity onPress={() => { setSearch(''); setIsSearchFocused(false); setIsSearchSticky(false); }}>
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

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <SectionList
          ListHeaderComponent={renderHeaderComponent}
          sections={sectionsListData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('ContactDetail', { contact: item })}>
              <View style={styles.contactItem}>
                <Text style={styles.contactName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          contentContainerStyle={styles.listContentContainer}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
        {isSearchSticky && (
          <TouchableOpacity
            ref={stickySearchRef}
            style={[styles.stickySearchContainer, styles.stickyVisible]}
            onPress={() => {
              setIsSearchFocused(true);
              stickySearchInputRef.current?.focus();
            }}
          >
            <Icon name="search-outline" size={20} color="#fff" />
            <TextInput
              ref={stickySearchInputRef}
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#888"
              value={search}
              onChangeText={setSearch}
              onFocus={() => setIsSearchFocused(true)}
            />
            {isSearchFocused && (
              <TouchableOpacity onPress={() => { setSearch(''); setIsSearchFocused(false); setIsSearchSticky(false); }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
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
  sectionHeader: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileIcon: {
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  stickySearchContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: -100,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    zIndex: 1,
    backgroundColor: '#333',
  },
  stickyVisible: {
    top: 0,
  },
});

export default ContactListScreen;
