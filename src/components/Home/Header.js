import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'orange',
    height: 50,
    paddingTop: 15,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>
      Todos App
    </Text>

  </View>
);

export default Header;
