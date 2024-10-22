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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const STORAGE_KEY = '@taskmate_tasks';

const Header = ({ theme, toggleTheme }) => {
  const iconColor = theme === 'dark' ? '#fff' : '#000';

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View
        style={[
          styles.header,
          theme === 'dark' ? styles.darkBackground : styles.lightBackground,
        ]}
      >
        <Text style={[styles.title, { color: iconColor }]}>TaskMate</Text>

        <TouchableOpacity style={styles.iconRight} onPress={toggleTheme}>
          <Ionicons name={theme === 'dark' ? 'sunny' : 'moon'} size={30} color={iconColor} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  const [theme, setTheme] = useState('light');
  const [tasks, setTasks] = useState([]);
  const [section, setSection] = useState('new');
  const [isModalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
      setTaskName('');
      setTaskDescription('');
      setTaskDate('');
      setModalVisible(false);
    }
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

  const filteredTasks = tasks.filter((task) => task.status === section);

  return (
    <SafeAreaView
      style={[
        styles.container,
        theme === 'dark' ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <Header theme={theme} toggleTheme={toggleTheme} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.sectionButtons}>
          <TouchableOpacity onPress={() => setSection('new')} style={styles.sectionButton}>
            <Text style={styles.sectionButtonText}>Novas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection('inProgress')} style={styles.sectionButton}>
            <Text style={styles.sectionButtonText}>Em Andamento</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection('completed')} style={styles.sectionButton}>
            <Text style={styles.sectionButtonText}>Concluídas</Text>
          </TouchableOpacity>
        </View>

        {section === 'new' && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.newTaskButton}
          >
            <Text style={styles.newTaskButtonText}>Nova Tarefa</Text>
          </TouchableOpacity>
        )}

        <FlatList
          data={filteredTasks}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={[styles.taskText, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                {item.name}
              </Text>
              <View style={styles.taskActions}>
                {section !== 'completed' && (
                  <TouchableOpacity
                    onPress={() =>
                      updateTaskStatus(
                        item.id,
                        section === 'new' ? 'inProgress' : 'completed'
                      )
                    }
                  >
                    <Ionicons name="arrow-forward-circle" size={24} color="#0a84ff" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20 }}
        />
        {!isKeyboardVisible && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>Desenvolvido por TaskMateTeam</Text>
          </View>
        )}

      </KeyboardAvoidingView>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Nome"
            value={taskName}
            onChangeText={setTaskName}
            style={styles.input}
          />
          <TextInput
            placeholder="Descrição"
            value={taskDescription}
            onChangeText={setTaskDescription}
            style={styles.input}
          />
          <TextInput
            placeholder="Data Final"
            value={taskDate}
            onChangeText={setTaskDate}
            style={styles.input}
          />
          <TouchableOpacity onPress={addTask} style={styles.addButton}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = {
  container: { flex: 1 },
  darkBackground: { backgroundColor: '#333' },
  lightBackground: { backgroundColor: '#fff' },
  headerContainer: { paddingTop: StatusBar.currentHeight || 0 },
  header: {height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 },
  title: { fontSize: 20, fontWeight: 'bold' },
  iconRight: { position: 'absolute', right: 15 },
  sectionButtons: { flexDirection: 'row', justifyContent: 'space-around', margin: 10 },
  sectionButton: { padding: 10, borderRadius: 5, backgroundColor: '#0a84ff' },
  sectionButtonText: { color: '#fff' },
  newTaskButton: { margin: 20, padding: 15, backgroundColor: '#0a84ff', borderRadius: 5 },
  newTaskButtonText: { color: '#fff', textAlign: 'center' },
  input: { borderBottomWidth: 1, marginVertical: 10, padding: 8 },
  modalContainer: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' },
  addButton: { backgroundColor: '#0a84ff', padding: 10, borderRadius: 5, marginTop: 10 },
  addButtonText: { color: '#fff', textAlign: 'center' },
  taskItem: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  taskActions: { flexDirection: 'row' },   
  footer: { padding: 3, backgroundColor: 'black' },   
  footerText: { color: 'white', textAlign: 'center' },
};
