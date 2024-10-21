import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Desenvolvido por TaskMateTeam</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 0,
    position: 'absolute',
    bottom: 0,
  },
  footerText: {
    color: 'white',
  },
});

export default Footer;
