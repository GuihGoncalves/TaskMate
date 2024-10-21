import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = ({ toggleTheme, theme }) => {
  return (
    <Drawer.Navigator
  screenOptions={({ route }) => ({
    drawerStyle: {
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
    },
    drawerLabelStyle: {
      color: theme === 'dark' ? 'white' : 'black',
    },
  })}
>

    </Drawer.Navigator>
  );
};

export default AppNavigator;
