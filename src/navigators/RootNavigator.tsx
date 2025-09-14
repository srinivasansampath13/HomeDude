import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { setLoading, setUser } from '../redux/slice/AuthSlice';

const RootNavigator = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const auth = getAuth(); // ✅ modular style

    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log('Auth State Changed: ', user);
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    });

    return unsubscribe;
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
