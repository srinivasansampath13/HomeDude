import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { logoutUser } from '../../redux/thunks/AuthThunks'

const Profile = () => {

  const dispatch = useDispatch<AppDispatch>();

  const logoutOnClick = async() => {
    try{
      await dispatch(logoutUser()).unwrap();
    }catch(error: any){
      throw error;
    }finally{
      Alert.alert(
        'Success',
        'Logout Success. Come again soon',
        [
          {
            text: 'OK',
          }
        ]
      );
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile</Text>
      <TouchableWithoutFeedback onPress={() => logoutOnClick()}>
        <View style = {{backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 20}}>
            <Text style = {{color: 'white'}}>Logout</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Profile