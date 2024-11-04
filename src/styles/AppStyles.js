// src/styles/appStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconRight: {
    padding: 10,
  },
  sectionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  sectionButton: {
    padding: 10,
    borderRadius: 5,
  },
  selectedSection: {
    backgroundColor: '#d3d3d3', // cor de fundo quando selecionado
  },
  sectionButtonText: {
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskStatusIndicator: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  statusCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskDescription: {
    fontSize: 14,
  },
  taskDate: {
    fontSize: 12,
    color: 'gray',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIconArrow: {
    color: "blue",
    marginLeft: 10,
  },
  actionIconTrash: {
    marginLeft: 10,
  },
  newTaskButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  newTaskButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  darkBackground: {
    backgroundColor: '#333',
  },
  lightBackground: {
    backgroundColor: '#fff',
  },
  
});
