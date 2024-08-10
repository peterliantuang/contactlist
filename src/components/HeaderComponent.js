import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderComponent = ({
  isSearchFocused,
  setIsSearchFocused,
  search,
  setSearch,
  searchInputRef,
  styles,
}) => (
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

export default HeaderComponent;
