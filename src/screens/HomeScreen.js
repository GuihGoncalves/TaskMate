// src/screens/HomeScreen.js
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  TextInput,
  StatusBar,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/AppStyles'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { modalStyles } from '../styles/ModalStyles'; 


const STORAGE_KEY = '@taskmate_tasks';

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
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const textColor = theme === 'dark' ? '#fff' : '#000';   
  const [taskTime, setTaskTime] = useState(''); 



  const sections = ['new', 'inProgress', 'completed'];

  useEffect(() => {
    Alert.alert(
      "Bem-vindo ao TaskMate!",
      "Aqui estão algumas dicas para usar o app:\n\n\n" +
      "1. Adicione tarefas clicando no botão 'Nova Tarefa'.\n\n" +
      "2. Navegue entre as seções para ver suas tarefas novas, em andamento e concluídas.\n\n" +
      "3. Clique em uma tarefa para editá-la ou excluí-la.\n\n" +
      "4. Utilize as setas nas tarefas para avançar ou retroceder o status da tarefa.\n",
      [
        { text: "Ok", onPress: () => console.log("Tutorial encerrado") }
      ],
      { cancelable: false }
    );
    
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
    if (taskName.trim() && taskDate && taskTime) {
      const newTask = {
        id: Date.now().toString(),
        name: taskName,
        description: taskDescription,
        date: taskDate,
        time: taskTime, 
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
    setTaskTime(''); 
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

  const deleteTask = () => {
    if (taskToDelete) {
      const filteredTasks = tasks.filter((t) => t.id !== taskToDelete.id);
      setTasks(filteredTasks);
      saveTasks(filteredTasks);
      setDeleteModalVisible(false);
      setTaskToDelete(null);
    }
  };


  const confirmDeleteTask = (task) => {
    setTaskToDelete(task);
    setDeleteModalVisible(true);
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
    setTaskTime(task.time); 
    setTaskDescription(task.description);
    setTaskDate(task.date);
    setModalVisible(true);
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === editingTask.id
        ? { ...t, name: taskName, description: taskDescription, date: taskDate, time: taskTime }
        : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    resetModal();
  };

  const renderTaskItem = ({ item }) => {
    
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
        <Text style={styles.taskDate}>{`${item.date} ${item.time}`}</Text>
      </View>
        <View style={styles.taskActions}>
        {item.status === 'inProgress' && (
            <TouchableOpacity onPress={() => updateTaskStatus(item.id, 'new')}>
              <Ionicons name="arrow-back" size={30} style={styles.actionIconArrow} />
            </TouchableOpacity>
          )}
          {item.status === 'completed' && (
            <TouchableOpacity onPress={() => updateTaskStatus(item.id, 'inProgress')}>
              <Ionicons name="arrow-back" size={30} style={styles.actionIconArrow} />
            </TouchableOpacity>
          )}
          {item.status === 'new' && (
            <TouchableOpacity onPress={() => updateTaskStatus(item.id, 'inProgress')}>
              <Ionicons name="arrow-forward" size={30} style={styles.actionIconArrow} />
            </TouchableOpacity>
          )}
          {item.status === 'inProgress' && (
            <TouchableOpacity onPress={() => updateTaskStatus(item.id, 'completed')}>
              <Ionicons name="arrow-forward" size={30} style={styles.actionIconArrow} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => confirmDeleteTask(item)}>
            <Ionicons name="trash" size={30} style={[styles.actionIconTrash,{ color:'red'}]} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
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
          <View style={styles.sectionButtons}>
            {sections.map((section, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSectionIndex(index)}
                style={[
                  styles.sectionButton,
                  sectionIndex === index && styles.selectedSection,
                ]}>
                <Text style={[styles.sectionButtonText, {color:textColor}]}>{section === 'new' ? 'Novas' : section === 'inProgress' ? 'Em Andamento' : 'Concluídas'}</Text>
              </TouchableOpacity>
            ))}
          </View>


          <FlatList
            data={filteredTasks}
            renderItem={renderTaskItem}
            keyExtractor={(item) => item.id}
          />
        
        {isKeyboardVisible && <View style={{ height: 300 }} />}
      </KeyboardAvoidingView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={resetModal}
      >
        <TouchableWithoutFeedback onPress={resetModal}> 
          <View style={modalStyles.overlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={modalStyles.modalContent}>
                <View style={modalStyles.modalHeader}>
                  <TouchableOpacity
                    onPress={() => {
                      if (editingTask) { 
                        const newStatus =
                          editingTask.status === 'completed'
                            ? 'inProgress'
                            : editingTask.status === 'inProgress'
                            ? 'new'
                            : 'new'; 
                        updateTaskStatus(editingTask.id, newStatus);
                      }
                    }}
                    disabled={editingTask?.status === 'new'}
                  >
                  </TouchableOpacity>

                  <Text style={modalStyles.modalTitle}>
                    {editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      if (editingTask){
                        const newStatus =
                          editingTask.status === 'new'
                            ? 'inProgress'
                            : editingTask.status === 'inProgress'
                            ? 'completed'
                            : 'completed'; 
                        updateTaskStatus(editingTask.id, newStatus);
                      }
                    }}
                    disabled={editingTask?.status === 'completed'}
                  >
                  </TouchableOpacity>
                </View>

                <TextInput
                  placeholder="Título"
                  value={taskName}
                  onChangeText={setTaskName}
                  style={modalStyles.input}
                  maxLength={50}
                />

                <TextInput
                  placeholder="Descrição (opcional)"
                  value={taskDescription}
                  onChangeText={setTaskDescription}
                  style={[modalStyles.input, modalStyles.descriptionInput]}
                  multiline={true}
                />

                <Text style={styles.sectionButtonText}>Defina uma Data e Hora prazo</Text>
                {showDatePicker && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}


                <TouchableOpacity onPress={showDatePickerModal} style={modalStyles.dateButton}>
                  <Text style={modalStyles.dateButtonText}>
                    {taskDate || 'Selecione a Data'}
                  </Text>
                  
                  <TextInput
                    placeholder="Hora (HH:MM)"
                    value={taskTime}
                    onChangeText={setTaskTime}
                  />
                  <Ionicons name="calendar" size={20} style={modalStyles.calendarIcon} />
                </TouchableOpacity>
                
                <View style={modalStyles.buttonContainer}>
                  <TouchableOpacity
                    onPress={editingTask ? updateTask : addTask}
                    style={[
                      modalStyles.submitButton,
                      !taskName.trim() && modalStyles.disabledButton, 
                    ]}
                    disabled={!taskName.trim()} 
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
            </TouchableWithoutFeedback> 
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={resetModal}> 
          <View style={modalStyles.overlay}>          
            <View style={modalStyles.modalContent}>
              <Text style={modalStyles.modalTitle}>Confirmar Exclusão</Text>
              <Text style={{ textAlign: 'center', marginVertical: 10 }}>
                Tem certeza que deseja excluir a tarefa "{taskToDelete ? taskToDelete.name : ''}"?
              </Text>

              <View style={modalStyles.buttonContainer}>
                <TouchableOpacity
                  onPress={deleteTask}
                  style={modalStyles.submitButton}
                >
                  <Text style={modalStyles.submitButtonText}>Excluir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setDeleteModalVisible(false)}
                  style={modalStyles.cancelButton}
                >
                  <Text style={modalStyles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          resetModal();
          setModalVisible(true);
        }}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
