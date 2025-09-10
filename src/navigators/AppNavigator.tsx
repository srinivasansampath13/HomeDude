import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Groceries from '../screens/Grocery/Groceries';
import Profile from '../screens/Profile/Profile';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Groceries"
        component={Groceries}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
