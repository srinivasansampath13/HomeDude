import React from 'react';
import {ActivityIndicator} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const RootNavigator = () => {

  const {user} = useSelector((state: RootState) => ({
    user: state.auth.user,
  }));

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
    
  );
};

export default RootNavigator;
