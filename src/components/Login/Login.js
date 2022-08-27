import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View, TextInput, Text, StyleSheet, Alert, Button,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import { setName, setAge } from '../../Redux/actions';

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    paddingTop: 40,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
});

const Login = ({ navigation }) => {
  const { userName, age } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  // const [name, setName] = useState('');

  const onPressHandler = async () => {
    if (userName.length === 0) {
      Alert.alert('Warning!', 'Please enter a valid name');
    } else {
      dispatch(setName(userName));
      dispatch(setAge(30));

      await AsyncStorage.setItem('userName', userName);
      navigation.navigate('Details');
    }
  };

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  const getData = () => {
    try {
      AsyncStorage.getItem('userName').then((value) => {
        if (value != null) {
          dispatch(setName(value));
          dispatch(setAge(40));
          navigation.navigate('Details');
        }
      });
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getData();
    createChannel();
  }, []);
  return (
    <View style={styles.input}>
      <Text style={styles.text}>Async Storage</Text>
      <TextInput placeholder="Please enter your name" style={styles.textInput} onChangeText={(value) => dispatch(setName(value))} />
      <Button title="Login" onPress={onPressHandler} />
    </View>
  );
};

export default Login;
