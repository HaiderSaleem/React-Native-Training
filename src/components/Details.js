import {
  StyleSheet, View, Text, FlatList, Pressable,
} from 'react-native';
import React, { useEffect } from 'react';
// import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import PropTypes from 'prop-types';
import { setName, setPassword, getAPIData } from '../Redux/actions';
import { getStyle } from './Home/style';

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,

  },
  title: {
    fontSize: 18,
    fontFamily: 'bold',
    margin: 10,
  },
  city: {
    fontSize: 15,
  },
});

const Details = ({ navigation }) => {
  const { userName, password, data } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const getData = () => {
    try {
      AsyncStorage.getItem('userData').then((value) => {
        if (value != null) {
          const userData = JSON.parse(value);
          dispatch(setName(userData.userName));
          dispatch(setPassword(userData.password));
          navigation.navigate('Details');
        }
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const createNotification = (index, ...items) => {
    PushNotification.localNotification(
      {
        channelId: 'test-channel',
        title: items[0],
        message: items[1],
        id: index,
      },
    );
  };

  const itemClicked = (item, index) => {
    createNotification(index, item.country, item.city);
    navigation.navigate('Map', { data: item });
  };
  useEffect(() => {
    getData();
    dispatch(getAPIData());
  }, []);

  if (!data) {
    return null;
  }
  return (
    <View style={getStyle.body}>
      <Text style={styles.title}>
        Welcome
        {' '}
        {userName}
        {', '}
        Password is
        {' '}
        {password}
      </Text>

      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Pressable style={styles.content} onPress={() => { itemClicked(item, index); }}>
            <Text style={styles.title}>
              {item.country}
            </Text>
            <Text style={styles.city}>
              {item.city}
            </Text>
          </Pressable>
        )}
      />

    </View>
  );
};

Details.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
Details.defaultProps = {

};

export default Details;
