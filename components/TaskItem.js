import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TaskItem = ({ item, toggleCompletion, deleteTask, theme }) => {
  return (
    <View style={styles.taskItem}>
      <Text style={[styles.taskText, item.completed && styles.completed, { color: theme === 'dark' ? 'white' : 'black' }]}>
        {item.name}
      </Text>
      <View style={styles.taskButtons}>
        <Button title={item.completed ? 'Desmarcar' : 'Concluir'} onPress={() => toggleCompletion(item.id)} />
        <Button title="Excluir" color="red" onPress={() => deleteTask(item.id)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  taskText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  taskButtons: {
    flexDirection: 'row',
    gap: 5,
  },
});

export default TaskItem;
