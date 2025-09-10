import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
     {true ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default RootNavigator