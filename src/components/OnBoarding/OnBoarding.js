import React from 'react';
import { View, Text, Button } from 'react-native';
import PagerView from 'react-native-pager-view';

const OnBoarding = ({ navigation }) => (
  <View style={{ flex: 1, alignContent: 'center' }}>
    <PagerView
      showPageIndicator
      style={{ flex: 0.9 }}

    >
      <View key="1" style={{ backgroundColor: 'blue', alignItems: 'center' }}>
        <Text>First page</Text>
      </View>
      <View key="2" style={{ backgroundColor: 'yellow', alignItems: 'center' }}>
        <Text>Second page</Text>
      </View>
    </PagerView>
    <Button title="Next" onPress={() => { navigation.navigate('LoginScreen'); }} />
  </View>
);

export default OnBoarding;
