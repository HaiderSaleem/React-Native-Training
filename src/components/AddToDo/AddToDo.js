import React, { useState } from 'react';
import {
  Button,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { getStyle } from './style';

const AddToDo = ({ submitTask }) => {
  const [task, setTask] = useState('');

  const updateHandler = (tasks) => {
    setTask(tasks);
    console.log(tasks);
  };
  return (
    <View>
      <View style={getStyle.input}>
        <TextInput placeholder="Enter Task" onChangeText={updateHandler} style={getStyle.textInput} />
        <Button title="Add Task" color="orange" onPress={() => submitTask(task)} />
      </View>
    </View>
  );
};

AddToDo.propTypes = {
  submitTask: PropTypes.func.isRequired,
};
AddToDo.defaultProps = {

};

export default AddToDo;
