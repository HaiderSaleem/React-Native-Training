/* eslint-disable global-require */
import { DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import {
  View, Text, StyleSheet, Image, ImageBackground, Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
  },
  profileContainer: {
    flex: 0.3,
    borderColor: 'white',
    borderRadius: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  imageContainer: {
    flex: 0.8,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 20,
    marginStart: 20,
  },
  textContainer: {
    flex: 0.7,
    marginStart: 20,
    marginTop: '20%',
  },
  welcome: {
    fontSize: 20,
    color: 'white',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  icon: {
    marginEnd: 25,
    marginTop: '25%',
  },
});
export default function CustomDrawer({ navigation }) {
  const { userName, profileUri, coverUri } = useSelector((states) => states.user);

  const onPressHandler = () => {
    navigation.navigate('Profile');
  };

  const getImage = () => {
    if (profileUri) {
      return (
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: profileUri }}
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
    <ImageBackground
      style={styles.mainContainer}
      source={require('../../assets/images/bg.png')}
    >

      <ImageBackground
        style={styles.profileContainer}
        source={coverUri ? { uri: coverUri } : require('../../assets/images/bg.png')}
      >
        <View style={styles.imageContainer}>
          {getImage()}
        </View>
        <Pressable
          style={styles.textContainer}
          onPress={onPressHandler}
        >
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.welcome}>{userName}</Text>
        </Pressable>
        <Icon
          style={styles.icon}
          name="caret-down"
          color="white"
        />
      </ImageBackground>
      <View>
        <DrawerItem
          style={{
            position: 'absolute',
            left: 0,
            height: 10,

          }}
          label="Screen2"
          labelStyle={{ color: '#609806' }}
          onPress={() => {
            navigation.navigate('Screen1');
          }}
        />
      </View>
    </ImageBackground>
  );
}

CustomDrawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
