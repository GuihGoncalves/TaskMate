import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Componente de pré-visualização da tarefa com status em bolinha colorida
const TaskCard = ({ task, theme }) => {
  const iconColor = theme === 'dark' ? '#fff' : '#000';

  const statusColors = {
    new: 'red',
    inProgress: 'yellow',
    completed: 'green',
  };

  return (
    <View style={[styles.card, theme === 'dark' ? styles.darkBackground : styles.lightBackground]}>
      <View style={styles.statusIndicator}>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: statusColors[task.status] },
          ]}
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.taskTitle, { color: iconColor }]}>{task.name}</Text>
        <Text style={[styles.taskDescription, { color: iconColor }]}>
          {task.description}
        </Text>
        <Text style={[styles.taskDate, { color: iconColor }]}>{task.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  darkBackground: { backgroundColor: '#444' },
  lightBackground: { backgroundColor: '#fff' },
  statusIndicator: {
    marginRight: 10,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  content: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
  },
  taskDate: {
    fontSize: 12,
  },
});

export default TaskCard;
