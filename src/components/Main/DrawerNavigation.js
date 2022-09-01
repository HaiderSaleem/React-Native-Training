import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigation from './BottomTabNavigation';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  <Drawer.Navigator>
    <Drawer.Screen
      name="MainScreen"
      component={BottomTabNavigation}
    />
  </Drawer.Navigator>;
}
