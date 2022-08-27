import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Provider } from 'react-redux';
import Store from './src/Redux/store';
import Home from './src/components/Home/Home';
import Details from './src/components/Details';
import Login from './src/components/Login/Login';
import Map from './src/components/Map/Map';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <Tab.Screen
            name="Details"
            component={Details}
          />
          <Tab.Screen
            name="Map"
            component={Map}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
