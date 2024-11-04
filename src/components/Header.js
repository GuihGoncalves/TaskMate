// src/components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/appStyles';

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

export default Header;
