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
    backgroundColor: '#d3d3d3', 
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
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
