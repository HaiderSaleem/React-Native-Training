import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import Home from '../Home/Home';
import Details from '../Details/Details';
import CustomTabBar from '../Utils/CustomTabBar';

const Tab = createBottomTabNavigator();
export const MapScreen = () => (
  <View />
);
const BottomTabNavigation = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Pressable onPress={() => { navigation.toggleDrawer(); }}>
        <Icon
          size={20}
          name="bars"
          style={{
            color: 'white', marginTop: 20, marginStart: 25, marginBottom: 10,
          }}
        />
      </Pressable>
      <View style={{
        flexDirection: 'row',
        flex: 1,
        backgroundColor: colors.background,
      }}
      >
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home';
              } else if (route.name === 'Details') {
                iconName = focused ? 'information-circle-outline' : 'information-outline';
              } else {
                iconName = focused ? 'map' : 'map';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            options={{ headerShown: false }}
            name="Details"
            component={Details}
          />
          <Tab.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <Tab.Screen
            options={{ headerShown: false }}
            name="MapScreen"
            component={MapScreen}
          />
        </Tab.Navigator>
      </View>
    </View>

  );
};

BottomTabNavigation.propTypes = {
  navigation: PropTypes.shape({
    toggleDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default BottomTabNavigation;
