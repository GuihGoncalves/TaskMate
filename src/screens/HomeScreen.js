// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  StatusBar,
  SafeAreaView,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../styles/appStyles'; // Caminho para estilos
import { modalStyles } from '../styles/modalStyles'; // Caminho para estilos
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';

const STORAGE_KEY = '@taskmate_tasks';

// Componente de Cabeçalho
const Header = ({ theme, toggleTheme }) => {
  const iconColor = theme === 'dark' ? '#fff' : '#000';

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View
        style={[styles.header, theme === 'dark' ? styles.darkBackground : styles.lightBackground]}>
        <Text style={[styles.title, { color: iconColor }]}>TaskMate</Text>
        <TouchableOpacity style={styles.iconRight} onPress={toggleTheme}>
          <Ionicons
            name={theme === 'dark' ? 'sunny' : 'moon'}
            size={30}
            color={iconColor}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Função principal do aplicativo
const HomeScreen = () => {
  const [theme, setTheme] = useState('light');
  const [tasks, setTasks] = useState([]);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const sections = ['new', 'inProgress', 'completed'];

  useEffect(() => {
    loadTasks();
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as tarefas.');
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar as tarefas.');
    }
  };

  const addTask = () => {
    if (taskName.trim()) {
      const newTask = {
        id: Date.now().toString(),
        name: taskName,
        description: taskDescription,
        date: taskDate,
        status: 'new',
      };
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      saveTasks(newTasks);
      resetModal();
    }
  };

  const resetModal = () => {
    setTaskName('');
    setTaskDescription('');
    setTaskDate('');
    setEditingTask(null);
    setModalVisible(false);
  };

  const updateTaskStatus = (id, newStatus) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
    saveTasks(filteredTasks);
  };

  const showDatePickerModal = () => setShowDatePicker(true);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTaskDate(selectedDate.toLocaleDateString());
    }
  };

  const filteredTasks = tasks.filter((task) => task.status === sections[sectionIndex]);
  
  const openTask = (task) => {
    setEditingTask(task);
    setTaskName(task.name);
    setTaskDescription(task.description);
    setTaskDate(task.date);
    setModalVisible(true);
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === editingTask.id
        ? { ...t, name: taskName, description: taskDescription, date: taskDate }
        : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    resetModal();
  };

  const renderTaskItem = ({ item }) => {
  const textColor = theme === 'dark' ? '#fff' : '#000'; // Cor condicional com base no tema

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'red';
      case 'inProgress':
        return 'yellow';
      case 'completed':
        return 'green';
      default:
        return 'gray';
    }
  };

    return (
      <TouchableOpacity onPress={() => openTask(item)} style={styles.taskItem}>
        <View style={styles.taskStatusIndicator}>
          <View style={[styles.statusCircle, { backgroundColor: getStatusColor(item.status) }]} />
        </View>
        <View style={styles.taskDetails}>
          <Text style={[styles.taskTitle, { color: textColor }]}>{item.name}</Text>
          <Text style={[styles.taskDescription, { color: textColor }]}>{item.description}</Text>
          <Text style={[styles.taskDate, { color: textColor }]}>{item.date}</Text>
      </View>
        <View style={styles.taskActions}>
          {item.status === 'new' && (
            <TouchableOpacity onPress={() => updateTaskStatus(item.id, 'inProgress')}>
              <Ionicons name="arrow-forward" size={25} style={styles.actionIconArrow} />
            </TouchableOpacity>
          )}
          {item.status === 'inProgress' && (
            <TouchableOpacity onPress={() => updateTaskStatus(item.id, 'completed')}>
              <Ionicons name="arrow-forward" size={25} style={styles.actionIconArrow} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => deleteTask(item.id)}>
            <Ionicons name="trash" size={25} style={styles.actionIconTrash} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const onGestureEvent = (event) => {
    const { translationX } = event.nativeEvent;
      if (translationX > 100 && sectionIndex > 3) { // Aumentado de 50 para 100
          setSectionIndex(sectionIndex - 1);
      } else if (translationX < 0 && sectionIndex < sections.length - 1) { // Aumentado de 50 para 100
          setSectionIndex(sectionIndex + 1);
      }
  };


  return (
    <SafeAreaView
      style={[
        styles.container,
        theme === 'dark' ? styles.darkBackground : styles.lightBackground,
      ]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <View style={{ flex: 1 }}>
              <View style={styles.sectionButtons}>
                {sections.map((section, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSectionIndex(index)}
                    style={[
                      styles.sectionButton,
                      sectionIndex === index && styles.selectedSection,
                    ]}>
                    <Text style={styles.sectionButtonText}>{section === 'new' ? 'Novas' : section === 'inProgress' ? 'Em Andamento' : 'Concluídas'}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {sectionIndex === 0 && (
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.newTaskButton}>
                  <Text style={styles.newTaskButtonText}>Nova Tarefa</Text>
                </TouchableOpacity>
              )}

              <FlatList
                data={filteredTasks}
                renderItem={renderTaskItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </PanGestureHandler>
        </GestureHandlerRootView>

        {isKeyboardVisible && <View style={{ height: 300 }} />}
      </KeyboardAvoidingView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true} // Modal com fundo transparente
        onRequestClose={resetModal} // Permite fechar com o botão "voltar" no Android
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={modalStyles.overlay}>
            <View style={modalStyles.modalContent}>
              <Text style={modalStyles.modalTitle}>
                {editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
              </Text>

              <TextInput
                placeholder="Título"
                value={taskName}
                onChangeText={setTaskName}
                style={modalStyles.input}
                maxLength={50} // Limite de caracteres para título
              />

              <TextInput
                placeholder="Descrição (opcional)"
                value={taskDescription}
                onChangeText={setTaskDescription}
                style={[modalStyles.input, modalStyles.descriptionInput]}
                multiline={true} // Permitir várias linhas
              />

              <TouchableOpacity onPress={showDatePickerModal} style={modalStyles.dateButton}>
                <Text style={modalStyles.dateButtonText}>
                  {taskDate || 'Selecione a Data'}
                </Text>
                <Ionicons name="calendar" size={20} style={modalStyles.calendarIcon} />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <View style={modalStyles.buttonContainer}>
                <TouchableOpacity
                  onPress={editingTask ? updateTask : addTask}
                  style={[
                    modalStyles.submitButton,
                    !taskName.trim() && modalStyles.disabledButton, // Desativar se o título estiver vazio
                  ]}
                  disabled={!taskName.trim()} // Evitar envio com título vazio
                >
                  <Text style={modalStyles.submitButtonText}>
                    {editingTask ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={resetModal} style={modalStyles.cancelButton}>
                  <Text style={modalStyles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
};

export default HomeScreen;
