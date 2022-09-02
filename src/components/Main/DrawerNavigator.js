import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigation from './BottomTabNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name="BottomTabNavigation"
      component={BottomTabNavigation}
    />
  </Drawer.Navigator>

);

export default DrawerNavigator;
