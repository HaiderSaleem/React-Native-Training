import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, Alert, Button, ImageBackground, Pressable,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import PropTypes from 'prop-types';
import TextInput from 'react-native-material-textinput';
import { setName, setAge } from '../../Redux/actions';

const styles = StyleSheet.create({
  loginButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
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
  label: {
    marginTop: 40,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
  },
  label1: {
    fontFamily: 'AlumniSansPinstripe-Regular',
    marginTop: 30,
    fontSize: 25,
    color: '#fff',
  },
  label2: {
    fontSize: 17,
    color: '#fff',
  },
  label3: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'right',
    marginTop: 20,
    marginBottom: 25,
  },
});

const Login = ({ navigation }) => {
  const { userName } = useSelector((state) => state.userReducer);
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
    <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assets/images/bg.png')}>
      <View style={styles.input}>
        <Text style={styles.label}>Login.</Text>
        <Text style={styles.label1}>WELCOME BACK,</Text>
        <Text style={styles.label2}>Sign in to continue</Text>
        <TextInput label="Email" marginTop={70} labelColor="#fff" color="#fff" underlineColor="#fff" activeColor="#fff" onChangeText={(value) => dispatch(setName(value))} />
        <TextInput label="Password" secureTextEntry labelColor="#fff" color="#fff" underlineColor="#fff" activeColor="#fff" onChangeText={(value) => dispatch(setName(value))} />
        <Text style={styles.label3}>Forgot Password?</Text>
        <Pressable style={styles.loginButton} title="Login" onPress={onPressHandler}>
          <Text style={styles.label2}>Login</Text>
        </Pressable>
        <Text style={[styles.label2, { textAlign: 'center', marginTop: 120 }]}>New User? Sign Up</Text>
      </View>
    </ImageBackground>
  );
};

Login.prototypes = {
  navigation: PropTypes.shape({}).isRequired,
};
Login.defaultProps = {

};
export default Login;
