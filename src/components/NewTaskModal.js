import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const NewTaskModal = ({ visible, onClose, onSave, theme }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const iconColor = theme === 'dark' ? '#fff' : '#000';

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTaskDate(selectedDate.toLocaleString());
    }
  };

  const resetFields = () => {
    setTaskName('');
    setTaskDescription('');
    setTaskDate('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            theme === 'dark' ? styles.darkBackground : styles.lightBackground,
          ]}>
          <TouchableOpacity onPress={resetFields} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#dc3545" />
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: iconColor }]}>Nova Tarefa</Text>

          <TextInput
            placeholder="Nome"
            placeholderTextColor={theme === 'dark' ? '#bbb' : '#666'}
            value={taskName}
            onChangeText={setTaskName}
            style={[styles.input, { color: iconColor }]}
          />
          <TextInput
            placeholder="Descrição"
            placeholderTextColor={theme === 'dark' ? '#bbb' : '#666'}
            value={taskDescription}
            onChangeText={setTaskDescription}
            style={[styles.input, { color: iconColor }]}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
            <Ionicons name="calendar" size={24} color={iconColor} />
            <Text style={{ color: iconColor, marginLeft: 5 }}>
              {taskDate || 'Selecionar Data'}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={resetFields} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onSave(taskName, taskDescription, taskDate);
                resetFields();
              }}
              style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  darkBackground: { backgroundColor: '#444' },
  lightBackground: { backgroundColor: '#fff' },
  closeButton: { position: 'absolute', top: 10, right: 10 },
  modalTitle: { fontSize: 20, marginBottom: 10 },
  input: {
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 5,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: { backgroundColor: '#b5b5b5', padding: 10, borderRadius: 5 },
  cancelButtonText: { color: '#dc3545' },
  saveButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5 },
  saveButtonText: { color: '#fff' },
});

export default NewTaskModal;
