import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const Profile = () => {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray'}}>
      <Text>Profile</Text>
      <TouchableWithoutFeedback>
        <View style = {{backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 20}}>
            <Text>Logout</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Profile