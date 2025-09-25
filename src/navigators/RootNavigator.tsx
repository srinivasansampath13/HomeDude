import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { setUser, setLoading } from '../redux/slice/AuthSlice';

const RootNavigator = () => {
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
        try {
          if (user) {
            dispatch(setUser(user));
          } else {
            dispatch(setUser(null));
          }
        } catch (error: any) {
          console.error("Error handling auth state change: ", error);
        } finally {
          dispatch(setLoading(false));
        }
      }
    );

    return unsubscribe;
  }, [dispatch]);

  if (loading) {
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
