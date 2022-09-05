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
    height: '100%',
  },
  profileContainer: {
    height: '25%',
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
  const { userName } = useSelector((states) => states.userReducer);

  const onPressHandler = () => {
    navigation.navigate('Profile');
  };
  return (
    <ImageBackground
      style={styles.mainContainer}
      source={require('../../assets/images/bg.png')}
    >

      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('../../assets/images/person.png')}
          />
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
      </View>
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