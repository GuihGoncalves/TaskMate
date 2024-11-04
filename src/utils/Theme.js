// styles/modalStyles.js
export const modalStyles = {
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido
    },
    modalContent: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      elevation: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginBottom: 15,
      paddingVertical: 8,
      fontSize: 16,
    },
    descriptionInput: {
      height: 80, // Espaço extra para descrição
      textAlignVertical: 'top',
    },
    dateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      marginBottom: 15,
    },
    dateButtonText: {
      fontSize: 16,
      color: '#333',
    },
    calendarIcon: {
      marginLeft: 10,
      color: '#888',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 15,
    },
    submitButton: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      width: '45%',
      alignItems: 'center',
    },
    disabledButton: {
      backgroundColor: '#ccc', // Botão desativado
    },
    cancelButton: {
      backgroundColor: '#f44336',
      padding: 10,
      borderRadius: 5,
      width: '45%',
      alignItems: 'center',
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    cancelButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  };
  