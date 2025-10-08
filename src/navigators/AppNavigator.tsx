import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Groceries from '../screens/Grocery/Groceries';
import Profile from '../screens/Profile/Profile';
import Favorites from '../screens/Favorites/Favorites';
import Notes from '../screens/Notes/Notes';
import HomeIcon from '../assets/icons/home.svg'
import GroceryIcon from '../assets/icons/grocery.svg'
import FavIcon from '../assets/icons/Fav.svg'
import NotesIcon from '../assets/icons/notes.svg'
import ProfileIcon from '../assets/icons/user.svg'

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown:false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return <HomeIcon width={size} height={size} fill={focused ? "#007AFF" : "#8E8E93"} />;
          }else if (route.name === "Groceries") {
            return <GroceryIcon width={size} height={size} fill={focused ? "#007AFF" : "#8E8E93"} />;
          }else if (route.name === "Favorites") {
            return <FavIcon width={size} height={size} fill={focused ? "#007AFF" : "#8E8E93"} />;
          }else if (route.name === "Notes") {
            return <NotesIcon width={size} height={size} fill={focused ? "#007AFF" : "#8E8E93"} />;
          }else if (route.name === "Profile") {
            return <ProfileIcon width={size} height={size} fill={focused ? "#007AFF" : "#8E8E93"} />;
          } 
          
        },
        tabBarActiveTintColor:'#007AFF',
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          paddingHorizontal: 8,
          paddingTop: 4,
          height: 70
        }
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: true }} />
      <Tab.Screen name="Groceries" component={Groceries} options={{ headerShown: true }} />
      <Tab.Screen name="Favorites" component={Favorites} options={{ headerShown: true }} />
      <Tab.Screen name="Notes" component={Notes} options={{ headerShown: true }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: true }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
