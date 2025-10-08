import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppDispatch, RootState } from '../../redux/store';
import { RootStackParamList } from '../../navigators/types';

const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth.user) 
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style = {{fontSize: 20}}>{`Hello ${user?.displayUserName}`}</Text>
    </View>
  )
}

export default Home