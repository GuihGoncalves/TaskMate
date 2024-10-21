import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen';
import CompletedTasks from './screens/CompletedTasks';
import Header from './components/Header';

const Drawer = createDrawerNavigator();

export default function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const screenOptions = {
    drawerStyle: {
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
    },
    drawerLabelStyle: {
      color: theme === 'dark' ? 'white' : 'black',
    }, 
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Drawer.Screen 
            name="Home"
            options={({ navigation }) => ({
              header: () => (
                <Header 
                  navigation={navigation} 
                  title="TaskMate" 
                  theme={theme} 
                  toggleTheme={toggleTheme} 
                />
              ),
            })}
            component={() => <HomeScreen theme={theme} />}
          />
          <Drawer.Screen 
            name="CompletedTasks"
            options={({ navigation }) => ({
              header: () => (
                <Header 
                  navigation={navigation} 
                  title="Tarefas Concluídas" 
                  theme={theme} 
                  toggleTheme={toggleTheme} 
                />
              ),
            })}
            component={CompletedTasks}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
