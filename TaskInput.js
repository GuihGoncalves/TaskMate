import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const TaskInput = ({ task, setTask, addTask, theme }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput 
        style={[styles.input, { color: theme === 'dark' ? 'white' : 'black', borderColor: theme === 'dark' ? 'white' : 'gray' }]} 
        placeholder="Nome da tarefa" 
        value={task} 
        onChangeText={setTask} 
        placeholderTextColor={theme === 'dark' ? 'lightgray' : 'gray'}
      />
      <Button title="Adicionar" onPress={addTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    padding: 10,
  },
});

export default TaskInput;
