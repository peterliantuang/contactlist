import React, { useState, useLayoutEffect, useRef } from 'react';
import { View, Text, SectionList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const contacts = [
  { id: '1', name: 'Peter Gangmei', type: 'myCard', phone: '982-144-9581' },
  { id: '2', name: 'Abale', phone: '982-144-9582' },
  { id: '3', name: 'Abale Abale', phone: '982-144-9583' },
  { id: '4', name: 'Abhilash Alfred Is', phone: '982-144-9584' },
  { id: '5', name: 'Abhilash', phone: '982-144-9585' },
  { id: '6', name: 'Abhishek', phone: '982-144-9586' },
  { id: '7', name: 'Abung Dilan', phone: '982-144-9587' },
  { id: '8', name: 'Abung Dilanang', phone: '982-144-9588' },
  { id: '9', name: 'Achai Jailourei', phone: '982-144-9589' },
  { id: '10', name: 'John Doe', phone: '982-144-9590' },
  { id: '11', name: 'Jane Smith', phone: '982-144-9591' },
  { id: '12', name: 'Michael Johnson', phone: '982-144-9592' },
  { id: '13', name: 'Emily Davis', phone: '982-144-9593' },
  { id: '14', name: 'Jessica Brown', phone: '982-144-9594' },
  { id: '15', name: 'Daniel Wilson', phone: '982-144-9595' },
];

const ContactListScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const stickySearchRef = useRef(null);
  const searchInputRef = useRef(null);
  const stickySearchInputRef = useRef(null);

  useLayoutEffect(() => {
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
  }, [navigation, isSearchFocused]);

  const handleScroll = (event) => {
    searchContainerRef.current?.measure((fx, fy, width, height, px, py) => {
      setIsSearchSticky(py <= 80);
    });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const sections = isSearchFocused
    ? [{ title: 'Top Name Matches', data: filteredContacts }]
    : Object.values(
        contacts
          .filter(contact => contact.name !== 'Peter Gangmei')
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
          sections={sections}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => navigation.navigate('ContactDetail', { contact: item })}
            >
              <Text style={styles.contactName}>{item.name}</Text>
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
  myName:{
    fontWeight:'bold',
    fontSize:20
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
