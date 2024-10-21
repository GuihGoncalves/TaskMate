import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CompletedTasks = ({ theme }) => {
  return (
    <View style={[styles.container, theme === 'dark' ? styles.darkBackground : styles.lightBackground]}>
      <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>Nenhuma tarefa concluída.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkBackground: {
    backgroundColor: '#333',
  },
  lightBackground: {
    backgroundColor: '#fff',
  },
});

export default CompletedTasks;
