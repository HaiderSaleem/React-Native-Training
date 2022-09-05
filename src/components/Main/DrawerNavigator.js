import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigation from './BottomTabNavigation';
import CustomDrawer from '../Utils/CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen
      options={{ headerShown: false }}
      name="BottomTabNavigation"
      component={BottomTabNavigation}
    />
  </Drawer.Navigator>

);

export default DrawerNavigator;
