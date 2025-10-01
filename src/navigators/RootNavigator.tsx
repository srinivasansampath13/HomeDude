import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { useAuth0 } from 'react-native-auth0';

const RootNavigator = () => {

  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return null;
  }

  console.log('Current user in RootNavigator:', user);
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
