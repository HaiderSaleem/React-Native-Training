import React, { useCallback, useState } from 'react';
import {
  View, TouchableOpacity, Text, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import PagerView from 'react-native-pager-view';
import Dots from '../Utils/Dots';

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});
const OnBoarding = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const onPageSelected = useCallback(
    (e) => {
      const pageIdx = e.nativeEvent.position;
      setIndex(pageIdx);
    },
    [],
  );
  return (
    <View style={{ flex: 1, alignContent: 'center' }}>
      <PagerView
        showPageIndicator
        style={{ flex: 0.9 }}
        onPageSelected={onPageSelected}
      >
        <View key="1" style={{ alignItems: 'center' }}>
          <Text style={{ color: 'black' }}>First page</Text>
          <Image style={styles.image} source={require('../../assets/images/person.png')} />
        </View>
        <View key="2" style={{ alignItems: 'center' }}>
          <Text style={{ color: 'black' }}>Second page</Text>
          <Image style={styles.image} source={require('../../assets/images/person.png')} />
        </View>
        <View key="3" style={{ alignItems: 'center' }}>
          <Text style={{ color: 'black' }}>Third page</Text>
          <Image style={styles.image} source={require('../../assets/images/person.png')} />
        </View>
      </PagerView>
      <View />
      <View style={{
        flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginVertical: 10.0, marginBottom: 50,
      }}
      >
        <Dots keyIndex={0} currentIndex={index} />
        <Dots keyIndex={1} currentIndex={index} />
        <Dots keyIndex={2} currentIndex={index} />
      </View>
      <TouchableOpacity
        style={{
          height: 50, backgroundColor: 'blue', marginStart: 20, marginEnd: 20, justifyContent: 'center', borderRadius: 10,
        }}
        onPress={() => { navigation.navigate('LoginScreen'); }}
      >
        <Text style={{
          textAlign: 'center', color: 'white', fontSize: 16,
        }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

OnBoarding.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};
export default OnBoarding;
