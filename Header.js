import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInput from '../components/TaskInput';
import TaskItem from '../components/TaskItem';
import Footer from '../components/Footer';
import Header from '../components/Header'; // Importação do Header

const STORAGE_KEY = '@taskmate_tasks';

const HomeScreen = ({ theme, navigation }) => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Carregar tarefas ao iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as tarefas.');
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as tarefas.');
    }
  };

  const addTask = () => {
    if (task.trim()) {
      const newTasks = [...tasks, { id: Date.now().toString(), name: task, completed: false }];
      setTasks(newTasks);
      setTask('');
      saveTasks(newTasks);
      Keyboard.dismiss();
    }
  };

  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
    saveTasks(filteredTasks);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? '#333' : '#fff'}
      />
      {/* Header abaixo da SafeArea */}
      <Header theme={theme} navigation={navigation} />

      <View style={[styles.container, theme === 'dark' ? styles.darkBackground : styles.lightBackground]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
          keyboardVerticalOffset={80}
        >
          <TaskInput task={task} setTask={setTask} addTask={addTask} theme={theme} />
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <TaskItem item={item} toggleCompletion={toggleCompletion} deleteTask={deleteTask} theme={theme} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 20 }}
          />
        </KeyboardAvoidingView>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#333', // Ou ajustável com o tema
  },
  container: {
    flex: 1,
  },
  darkBackground: {
    backgroundColor: '#333',
  },
  lightBackground: {
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
