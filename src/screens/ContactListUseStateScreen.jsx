import React, { useState, useLayoutEffect } from 'react';
import { View, Text, SectionList, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const contacts = [
  { id: '1', name: 'Peter Gangmei', type: 'myCard' },
  { id: '2', name: 'Abale' },
  { id: '3', name: 'Abale Abale' },
  { id: '4', name: 'Abhilash Alfred Is' },
  { id: '5', name: 'Abhilash' },
  { id: '6', name: 'Abhishek' },
  { id: '7', name: 'Abung Dilan' },
  { id: '8', name: 'Abung Dilanang' },
  { id: '9', name: 'Achai Jailourei' },
  { id: '10', name: 'John Doe' },
  { id: '11', name: 'Jane Smith' },
  { id: '12', name: 'Michael Johnson' },
  { id: '13', name: 'Emily Davis' },
  { id: '14', name: 'Jessica Brown' },
  { id: '15', name: 'Daniel Wilson' },
  { id: '16', name: 'David Martinez' },
  { id: '17', name: 'Chris Hernandez' },
  { id: '18', name: 'Ashley Lopez' },
  { id: '19', name: 'Sarah Lee' },
  { id: '20', name: 'Andrew Walker' },
];

const ContactListScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <View style={[styles.headerContainer, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => { /* Go back */ }} style={styles.headerIcon}>
              <Icon name="chevron-back" size={27} color="#007AFF" />
              <Text style={styles.headerText}>Lists</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => { /* Add contact */ }} style={styles.headerIcon}>
              <Icon name="add" size={30} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>
      ),
    });
  }, [navigation, isDarkMode]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const sections = Object.values(
    filteredContacts
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

  const renderContact = ({ item }) => (
    <View style={[styles.contactItem, isDarkMode ? styles.darkItem : styles.lightItem]}>
      <Text style={[styles.contactName, isDarkMode ? styles.darkText : styles.lightText]}>{item.name}</Text>
    </View>
  );

  const renderHeaderComponent = () => (
    <>
      <Text style={[styles.headerTitle, isDarkMode ? styles.darkText : styles.lightText]}>Contacts</Text>
      <View style={[styles.searchContainer, isDarkMode ? styles.darkSearch : styles.lightSearch]}>
        <Icon name="search-outline" size={20} color={isDarkMode ? "#fff" : "#000"} />
        <TextInput
          style={[styles.searchInput, isDarkMode ? styles.darkText : styles.lightText]}
          placeholder="Search"
          placeholderTextColor={isDarkMode ? "#888" : "#888"}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={[styles.contactItem, isDarkMode ? styles.darkItem : styles.lightItem]}>
        <Icon name="person-circle-outline" size={50} color={isDarkMode ? "#fff" : "#000"} style={styles.profileIcon} />
        <View style={styles.contactInfo}>
          <Text style={[styles.contactName, isDarkMode ? styles.darkText : styles.lightText]}>Peter Gangmei</Text>
          <Text style={styles.contactType}>My Card</Text>
        </View>
      </View>
    </>
  );

  return (
    <View style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      <SectionList
        ListHeaderComponent={renderHeaderComponent}
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={renderContact}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.sectionHeader, isDarkMode ? styles.darkText : styles.lightText]}>{title}</Text>
        )}
        ListHeaderComponentStyle={styles.listHeaderComponent}
        contentContainerStyle={styles.listContentContainer} // Set padding for SectionList content
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10, // Increase padding for the entire container
  },
  listContentContainer: {
    paddingHorizontal: 10, // Increase padding for SectionList content
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10, // Adjust the padding to fit the icons and text properly
    paddingHorizontal: 20, // Increase padding for app bar
    height: 80, // Decrease the height of the header
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
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
    paddingHorizontal: 10, // Increase padding for search box
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10, // Increase padding for contact items
    borderBottomWidth: 1,
  },
  contactInfo: {
    marginLeft: 10,
  },
  contactName: {
    fontSize: 16,
  },
  contactType: {
    color: '#999',
    fontSize: 14,
  },
  sectionHeader: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileIcon: {
    borderRadius: 25,
  },
  // Dark mode styles
  darkBackground: {
    backgroundColor: '#000',
  },
  darkText: {
    color: '#fff',
  },
  darkItem: {
    borderBottomColor: '#333',
  },
  darkSearch: {
    backgroundColor: '#333',
  },
  // Light mode styles
  lightBackground: {
    backgroundColor: '#fff',
  },
  lightText: {
    color: '#000',
  },
  lightItem: {
    borderBottomColor: '#ccc',
  },
  lightSearch: {
    backgroundColor: '#e1e1e1',
  },
});

export default ContactListScreen;
