import React, { useState, useLayoutEffect } from 'react';
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
import realm from '../../Realm/Realm';

const Home = () => {
  const [people, setPeople] = useState([]);

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
      realm.write(() => {
        realm.create('Tasks', {
          id: uuid.v4(),
          task: _name,
        });
      });
    } else {
      Alert.alert('OOPS!', 'Todos length should be greater than 3.', [
        { text: 'Understood', onPress: () => console.log('alert closed') },
      ]);
    }
  };

  useLayoutEffect(() => {
    const tasks = realm.objects('Tasks');
    tasks.map((task) => (setPeople((prevPeople) => [{
      name: task.task,
      id: task.id,
    },
    ...prevPeople])
    ));
  }, []);

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
