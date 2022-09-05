import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import Store from './src/Redux/store';
import LoginScreen from './src/components/Login/LoginScreen';
import Map from './src/components/Map/Map';
import BottomTabNavigation from './src/components/Main/BottomTabNavigation';
import DrawerNavigator from './src/components/Main/DrawerNavigator';
import Profile from './src/components/Profile/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="LoginScreen"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="DrawerNavigator"
            component={DrawerNavigator}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Map"
            component={Map}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
