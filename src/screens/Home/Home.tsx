import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppDispatch, RootState } from '../../redux/store';
import { RootStackParamList } from '../../navigators/types';

const Home = () => {
  const { user, loginType, emailLoading, googleLoading, error } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
  }, [user, loginType, emailLoading, googleLoading, error]);
  return (
    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style = {{fontSize: 20}}>{user?.user?.name ? 
        `Hello ${user?.user?.name}` : `Hello User`}</Text>
    </View>
  )
}

export default Home