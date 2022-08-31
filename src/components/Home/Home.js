import React, { useState } from 'react';
import {
  View,
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

const Home = () => {
  const [people, setPeople] = useState([
    { name: 'Hey', id: 0 },
    { name: 'Hi', id: 1 },
    { name: 'Hello', id: 2 },
    { name: 'Hola', id: 3 },

  ]);

  const onItemPresses = (id) => {
    setPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));
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
};

export default Home;
