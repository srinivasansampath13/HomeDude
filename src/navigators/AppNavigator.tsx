import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Groceries from '../screens/Grocery/Groceries';
import Profile from '../screens/Profile/Profile';
import Favorites from '../screens/Favorites/Favorites';
import Notes from '../screens/Notes/Notes';

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
        name="Favorites"
        component={Favorites}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Notes"
        component={Notes}
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
