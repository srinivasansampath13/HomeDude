import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const user = useSelector((state: any) => state.auth.user);
  console.log('User in Home Screen: ', user.email);
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home