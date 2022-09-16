import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, Alert, ImageBackground, Pressable,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import PropTypes from 'prop-types';
import TextInput from 'react-native-material-textinput';
import uuid from 'react-native-uuid';
import {
  setCoverImage, setName, setPassword, setProfileImage,
} from '../../Redux/actions';
import realm from '../../Realm/Realm';

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
const LoginScreen = ({ navigation }) => {
  const { userName, password } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const setUser = () => {
    realm.write(() => {
      realm.create('User', {
        id: uuid.v4(),
        userName,
        password,
      });
    });
  };

  const onPressHandler = async () => {
    if (userName.length === 0 && password.length === 0) {
      Alert.alert('Warning!', 'Please enter a valid name');
    } else {
      dispatch(setName(userName));
      dispatch(setPassword(password));
      setUser();
      const jsonData = JSON.stringify({ userName, password });
      await AsyncStorage.setItem('userData', jsonData);
      navigation.navigate('DrawerNavigator');
    }
  };

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  const getUserProfilePicture = () => {
    try {
      AsyncStorage.getItem('profileImage').then((value) => {
        dispatch(setProfileImage(value));
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const getUserCoverPicture = () => {
    try {
      AsyncStorage.getItem('coverImage').then((value) => {
        dispatch(setCoverImage(value));
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const getData = async () => {
    try {
      getUserProfilePicture();
      getUserCoverPicture();
      // SplashScreen.hide();
      navigation.navigate('DrawerNavigator');
    } catch (error) {
      console.warn(error);
    }
  };

  const getUser = async () => {
    const task = realm.objects('User')[0];
    if (task) {
      dispatch(setName(task.userName));
      dispatch(setPassword(task.password));
      getData();
    }
  };

  useEffect(() => {
    createChannel();
    getUser();
  }, []);
  return (
    <ImageBackground style={{ width: '100%', height: '100%', flex: 1 }} source={require('../../assets/images/bg.png')}>
      <View style={[styles.input, { flex: 1 }]}>
        <Text style={styles.label}>Login.</Text>
        <Text style={styles.label1}>WELCOME BACK,</Text>
        <Text style={styles.label2}>Sign in to continue</Text>
        <TextInput label="Email" marginTop={70} labelColor="#fff" color="#fff" underlineColor="#fff" activeColor="#fff" onChangeText={(value) => dispatch(setName(value))} />
        <TextInput label="Password" secureTextEntry labelColor="#fff" color="#fff" underlineColor="#fff" activeColor="#fff" onChangeText={(value) => dispatch(setPassword(value))} />
        <Text style={styles.label3}>Forgot Password?</Text>
        <Pressable style={styles.loginButton} title="Login" onPress={onPressHandler}>
          <Text style={styles.label2}>Login</Text>
        </Pressable>
      </View>
      <Text style={[styles.label2, { textAlign: 'center', marginBottom: 50 }]}>New User? Sign Up</Text>
    </ImageBackground>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.instanceOf(Object).isRequired,
  }).isRequired,
};
export default LoginScreen;
