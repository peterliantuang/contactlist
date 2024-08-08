import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ContactDetailScreen = ({ route, navigation }) => {
  const { contact } = route.params;

  const getInitials = (name) => {
    const nameArray = name.split(' ');
    const initials = nameArray.map(part => part.charAt(0)).join('');
    return initials.toUpperCase();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation, contact]);

  return (
    <View style={styles.container}>
      <View style={styles.customAppBar}>
        <TouchableOpacity style={styles.appbarItems} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#007AFF" style={{ paddingLeft: 10 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}></Text>
        <TouchableOpacity style={styles.appbarItems} onPress={() => navigation.navigate('AddContact', { contact, isEdit: true })}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileSection}>
        <View style={styles.profileImage}>
          <Text style={styles.initials}>{getInitials(contact.name)}</Text>
        </View>
        <Text style={styles.contactName}>{contact.name}</Text>
        <View style={styles.actionIcons}>
          <TouchableOpacity style={styles.actionIcon}>
            <Icon name="chatbubble-outline" size={28} color="#fff" />
            <Text style={styles.actionText}>message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Icon name="call-outline" size={28} color="#fff" />
            <Text style={styles.actionText}>call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Icon name="videocam-outline" size={28} color="#fff" />
            <Text style={styles.actionText}>video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Icon name="mail-outline" size={28} color="#fff" />
            <Text style={styles.actionText}>mail</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.detailSection}>
        <View style={styles.detailItem}>
          <Text style={styles.detailText}>mobile</Text>
          <Text style={styles.detailValue}>{contact.phone}</Text>
        </View>
        <Text style={styles.detailLabel}>Notes</Text>
      </View>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Share Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Add to Favourites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionTextDelete}>Delete Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  appbarItems:{
   
  },
  customAppBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopEndRadius:10,
    borderTopStartRadius:10,
    marginTop:20,
    paddingVertical: 15,
    backgroundColor: '#d3d3d3',
  },
  headerTitle: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  editText: {
    fontSize: 18,
    color: '#007AFF',
    paddingRight: 10,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#d3d3d3',
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
  contactName: {
    fontSize: 24,
    color: '#000',
    marginTop: 10,
  },
  actionIcons: {
    flexDirection: 'row',
    marginTop: 25,
  },
  actionIcon: {
    backgroundColor: '#6b6e6c',
    padding: 12,
    width: 85,
    borderRadius: 10,
    marginHorizontal: 3,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  detailSection: {
    padding: 15,
    backgroundColor: '#000',
  },
  detailLabel: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  detailText: {
    fontSize: 16,
    color: '#888',
  },
  detailValue: {
    fontSize: 16,
    color: '#007AFF',
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  optionText: {
    fontSize: 16,
    color: '#007AFF',
  },
  optionTextDelete:{
    fontSize: 17,
    fontWeight:'bold',
    color: '#eb0202',
  }
});

export default ContactDetailScreen;
