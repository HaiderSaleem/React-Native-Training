import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Onboarding from 'react-native-onboarding-swiper';
import { Button } from 'react-native-elements';

const OnBoarding = ({ navigation }) => {
  const Dots = ({ selected }) => {
    let backgroundColor;
    backgroundColor = selected ? 'yellow' : 'black';
    return (
      <View
        style={{
          width: 24,
          height: 6,
          marginHorizontal: 3,
          backgroundColor,
          marginBottom: 150,
          alignItems: 'center',
        }}
      />
    );
  };
  const Next = ({ ...props }) => (
    <TouchableOpacity
      style={{
        flex: 1, width: '100%', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center',
      }}
      {...props}
    >
      <Text style={{
        width: '100%',
        fontSize: 16,
        backgroundColor: 'yellow',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 200,
      }}
      >
        Done
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1, alignContent: 'center' }}>
      {/* <PagerView
        showPageIndicator
        style={{ flex: 0.9 }}
        onPageSelected={(e) => {
          console.log(e.offset, e.position);
        }}
      >
        <View key="1" style={{ backgroundColor: 'blue', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>First page</Text>
        </View>
        <View key="2" style={{ backgroundColor: 'yellow', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Second page</Text>
        </View>
        <View key="3" style={{ backgroundColor: 'red', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Second page</Text>
        </View>
      </PagerView>
      <Button title="Next" onPress={() => { navigation.navigate('LoginScreen'); }} /> */}
      <Onboarding
        bottomBarColor="white"
        showSkip={false}
        DotComponent={Dots}
        NextButtonComponent={Next}
        bottomBarHeight={60}
        pages={[
          {
            backgroundColor: 'white',
            title: 'Welcome',
          },
          {
            backgroundColor: 'white',
            title: 'Welcome',
          },
          {
            backgroundColor: 'white',
            title: 'Welcome',
          },
        ]}
      />
    </View>
  );
};

OnBoarding.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};
export default OnBoarding;
