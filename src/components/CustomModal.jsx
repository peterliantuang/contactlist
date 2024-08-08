import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomModal = ({ visible, onClose, onEdit, onDelete }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Options</Text>
          <TouchableOpacity style={styles.optionButton} onPress={onEdit}>
            <Icon name="pencil" size={20} color="#000" />
            <Text style={styles.optionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={onDelete}>
            <Icon name="trash" size={20} color="red" />
            <Text style={styles.optionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: '#f2f2f2',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CustomModal;
