/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import uuid from 'react-native-uuid';
import Header from './Header';
import TodoList from '../TodoList/TodoList';
import { getStyle } from './style';
import AddToDo from '../AddToDo/AddToDo';

const Home = (prop) => {
  const state = {
    count: 0,
  };

  const [name, setName] = useState('Haider');
  const [people, setPeople] = useState([
    { name: 'Hey', id: 0 },
    { name: 'Hi', id: 1 },
    { name: 'Hello', id: 2 },
    { name: 'Hola', id: 3 },

  ]);

  const onPress = () => {
    setName('Ali');
  };

  const onItemPresses = (id) => {
    setPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));
  };

  const switchScreen = () => {
    prop.navigation.navigate('Details', { people });
  };
  const submitTask = (_name) => {
    if (_name.length > 3) {
      setPeople((prevPeople) => [{
        name: _name,
        id: uuid.v4(),
      },
      ...prevPeople]);
    } else {
      Alert.alert('OOPS!', 'Todos length should be greater than 3.', [
        { text: 'Understood', onPress: () => console.log('alert closed') },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <View style={getStyle.container}>
        <Header />
        <View style={getStyle.body}>
          <AddToDo submitTask={submitTask} />
          <View style={getStyle.list}>
            <Button title="Switch Screen" onPress={switchScreen} />
            <FlatList
              numColumns={1}
              keyExtractor={(item) => item.id}
              data={people}
              renderItem={
                ({ item }) => <TodoList onItemPresses={onItemPresses} item={item} />
              }
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  /* return( <View style= {styles.container}>
            <ScrollView>
          {people.map(item =>
            (
              <View style= {styles.item} id={item.id}>
                <Text>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
            </View>
          ); */
  /* return (
              <View style={styles.container}>

                <View style={styles.input}>
                <TextInput
                placeholder = "Enter Name"
                onChangeText = {(value) => {
                  setName(value)
                }}
                />
                </View>
                <Button
                style={styles.button}
                onPress={onPress}
                title="Click Me"
                />
                  <Text>
                    Name: { name }
                  </Text>
              </View>
            ); */
};

export default Home;
