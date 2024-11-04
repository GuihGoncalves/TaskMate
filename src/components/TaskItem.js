// src/components/TaskItem.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/appStyles';

const TaskItem = ({ item, theme, updateTaskStatus, deleteTask, openTask, section }) => {
  return (
    <View style={styles.taskItem}>
      <Text style={[styles.taskText, { color: theme === 'dark' ? '#fff' : '#000' }]}>
        {item.name}
      </Text>
      /*<View style={styles.taskActions}>
        {section !== 'completed' && (
          <TouchableOpacity
            onPress={() =>
              updateTaskStatus(item.id, section === 'new' ? 'inProgress' : 'completed')
            }
          >
            <Ionicons name="arrow-forward-circle" size={24} color="blue" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Ionicons name="l" size={24} color="red" />
        </TouchableOpacity>*/
      </View>
    </View>
  );
};

export default TaskItem;
