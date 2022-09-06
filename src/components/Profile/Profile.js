import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View, StyleSheet, Image, Pressable, Text, TextInput,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { setProfileImage } from '../../Redux/actions';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  imageContainer: {
    flex: 0.3,
    aspectRatio: 1 / 1,
    borderRadius: 1000,
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 20,
  },
  mainContainer: {
    height: '100%',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
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
    flex: 1,
    height: 20,
    borderRadius: 10,
    borderColor: 'black',
  },
});
const Profile = () => {
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  const pressHandler = async () => {
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
        alert(res.customButton);
      } else {
        dispatch(setProfileImage(res.assets[0].uri));
        setImage(res.assets[0].uri);
        await AsyncStorage.setItem('profileImage', res.assets[0].uri);
      }
    });
  };

  const getImage = () => {
    console.log('abc', image);

    if (image) {
      console.log('123');
      return (
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: image }}
        />
      );
    }

    return (
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../assets/images/person.png')}
      />
    );
  };
  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageContainer}>
        {getImage()}
      </View>
      <Pressable onPress={pressHandler} style={styles.button}>
        <Text style={styles.text}>
          Update Profile
        </Text>
      </Pressable>

      <TextInput style={styles.name} />
    </View>
  );
};

export default Profile;
