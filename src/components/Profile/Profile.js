/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Image, Pressable, Text, Alert, Modal,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from 'react-native-material-textinput';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  setCoverImage, setName, setPassword, setProfileImage,
} from '../../Redux/actions';

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    flex: 1,
  },
  coverContainer: {
    flex: 0.4,
    width: '100%',
    marginTop: 5,
  },
  coverImage: {
    flex: 1,
    opacity: 0.8,
  },
  imageContainer: {
    flex: 0.2,
    aspectRatio: 1 / 1,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
    zIndex: 10,
    bottom: 70,
  },
  mainContainer: {
    height: '100%',
  },
  button: {
    flex: 0.05,
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10.0,
    alignContent: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
  },
  name: {
    width: '80%',
  },
  userName: {
    color: 'black',
    fontSize: 20,
    bottom: 40,
    fontFamily: 'Poppins-Regular',
  },
});
const Profile = () => {
  const {
    userName, password, profileUri, coverUri,
  } = useSelector((states) => states.userReducer);
  const [name, setUserName] = useState('');
  const [psw, setPsw] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const pressHandler = async (isProfilePicture) => {
    const options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, async (res) => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        Alert.alert('Warning', res.customButton);
      } else {
        if (isProfilePicture) {
          dispatch(setProfileImage(res.assets[0].uri));
        } else {
          dispatch(setCoverImage(res.assets[0].uri));
        }
        await AsyncStorage.setItem(isProfilePicture ? 'profileImage' : 'coverImage', res.assets[0].uri);
        Alert.alert('Congrats!', 'Profile updated successfully');
      }
    });
  };

  const selectProfilePicture = () => {
    setModalVisible(true);
  };

  const getImage = () => {
    if (profileUri) {
      return (
        <Pressable
          onPress={selectProfilePicture}
          onLongPress={() => pressHandler(true)}
          resizeMode="cover"
          style={styles.image}
        >
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: profileUri }}
          />
        </Pressable>
      );
    }
    return (
      <Pressable
        onPress={selectProfilePicture}
        onLongPress={() => pressHandler(true)}
        style={styles.image}
      >
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../assets/images/person.png')}
        />
      </Pressable>
    );
  };

  const showProfilePicture = () => {
    if (profileUri) {
      return (
        <Image
          style={[styles.image, { backgroundColor: 'white' }]}
          resizeMode="center"
          source={{ uri: profileUri }}
        />
      );
    }
    return <View />;
  };

  const getCoverImage = () => {
    if (coverUri) {
      return (
        <Image
          style={styles.coverImage}
          resizeMode="stretch"
          source={{ uri: coverUri }}
        />
      );
    }

    return (
      <Image
        style={styles.coverImage}
        resizeMode="stretch"
        source={require('../../assets/images/person.png')}
      />
    );
  };
  useEffect(() => {
    setUserName(userName);
    setPsw(password);
  }, [userName, password]);

  const updateProfile = async () => {
    if (name.length === 0 && psw.length === 0) {
      Alert.alert('Warning!', 'Please enter a valid name');
    } else {
      dispatch(setName(name));
      dispatch(setPassword(psw));
      const jsonData = JSON.stringify({ userName: name, password: psw });
      await AsyncStorage.setItem('userData', jsonData);
      Alert.alert('Congrats!', 'Profile updated successfully');
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.coverContainer}>
        {getCoverImage()}
        <Pressable onPress={() => { pressHandler(false); }} style={{ right: 10, bottom: 30, alignSelf: 'flex-end' }}>
          <Icon name="camera" size={20} color="white" />
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        {getImage()}
      </View>
      <Text style={styles.userName}>{name}</Text>
      <View style={styles.name}>
        <TextInput
          value={name}
          label="Name"
          labelColor="#000"
          color="#000"
          underlineColor="#000"
          activeColor="#000"
          onChangeText={(value) => setUserName(value)}
        />
        <TextInput
          value={psw}
          secureTextEntry
          label="Password"
          labelColor="#000"
          color="#000"
          underlineColor="#000"
          activeColor="#000"
          onChangeText={(value) => setPsw(value)}
        />
      </View>
      <Pressable onPress={updateProfile} style={styles.button}>
        <Text style={styles.text}>
          Update Profile
        </Text>
      </Pressable>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Icon
          onPress={() => { setModalVisible(!modalVisible); }}
          name="times-circle"
          size={20}
          style={{ alignSelf: 'flex-end', padding: 20 }}
        />
        {showProfilePicture()}
      </Modal>
    </View>
  );
};

export default Profile;
