import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { logoutUser } from '../../redux/thunks/AuthThunks';
import { AppDispatch } from '../../redux/store';
import { RootStackParamList } from '../../navigators/types';

const Home = () => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  console.log('User in Home Screen: ', user.email);

  const logoutButtonClick = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      // Navigation will be handled automatically by RootNavigator based on Auth0 user state
      // But you can also manually navigate if needed:
      // navigation.navigate('Login');
    } catch (error) {
      console.log('Logout error:', error);
    }
  }

  return (
    <View>
      <Text>Home {`Welcome: ${user}`}</Text>
      <Pressable>
          <Text onPress={()=> logoutButtonClick()}>Logout</Text>
      </Pressable>
    </View>
  )
}

export default Home