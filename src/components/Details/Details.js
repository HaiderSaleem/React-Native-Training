import {
  StyleSheet, View, Text, FlatList, Pressable,
} from 'react-native';
import React, {
  useCallback, useEffect, useLayoutEffect, useState,
} from 'react';
// import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { setName, setPassword, getAPIData } from '../../Redux/actions';
import CustomSearchBar from '../Utils/CustomSearchBar';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },

  content: {
    alignItems: 'center',
    borderWidth: 1,
    margin: 5,
    height: 100,
    width: 170,
    borderRadius: 5,

  },
  title: {
    fontSize: 18,
    fontFamily: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
  },
  city: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
});

const Details = ({ navigation }) => {
  const { userName, password, data } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const FocusedGradient = ['#000000', '#000000', '#696969', '#808080', '#d3d3d3', '#ffffff'];
  const [freshing, setRefreshing] = useState(false);
  const [queryList, setQueryList] = useState([]);
  const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);
  function getRandomColor() {
    const colorValues = ['red', 'blue', 'darkorange', 'aquamarine', 'blueviolet', 'cadetblue', 'lightseagreen',
      'chartreuse', 'cornflowerblue', 'darkmagenta', 'dodgerblue', 'indianred', 'lightcoral', 'lightpink'];
    return colorValues[Math.floor(Math.random() * colorValues.length)];
  }
  const getData = () => {
    try {
      AsyncStorage.getItem('userData').then((value) => {
        if (value != null) {
          const userData = JSON.parse(value);
          dispatch(setName(userData.userName));
          dispatch(setPassword(userData.password));
        }
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const updatingText = (query) => {
    const queryData = data;
    // eslint-disable-next-line max-len
    const searchData = queryData.filter((item) => item.city.toLowerCase().includes(query.toLowerCase())
     || item.country.toLowerCase().includes(query.toLowerCase()));

    setQueryList(searchData);
    console.log(searchData, queryData, queryList, data);
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
  useLayoutEffect(() => {
    getData();
    dispatch(getAPIData());
  }, []);
  useEffect(() => {
    setQueryList(data);
  }, []);

  if (!queryList) {
    return null;
  }
  return (
    <LinearGradient colors={FocusedGradient} style={styles.body}>
      <Text style={styles.title}>
        Welcome
        {' '}
        {userName}
        {', '}
        Password is
        {' '}
        {password}
      </Text>

      <CustomSearchBar updatingText={updatingText} />
      <View>
        <FlatList
          data={queryList}
          numColumns="2"
          contentContainerStyle={styles.list}
          refreshing={freshing}
          keyExtractor={(item) => item.lat}
          onRefresh={onRefresh}
          renderItem={({ item, index }) => (
            <Pressable
              style={[styles.content, { backgroundColor: getRandomColor() }]}
              onPress={() => { itemClicked(item, index); }}
            >
              <View style={styles.block}>
                <Text style={styles.title}>
                  {item.country}
                </Text>
                <Text style={styles.city}>
                  {item.city}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </LinearGradient>
  );
};

Details.defaultProps = {

};

export default Details;
