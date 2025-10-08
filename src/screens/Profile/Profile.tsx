import { View, Text, TouchableWithoutFeedback, Alert, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { logoutUser } from '../../redux/thunks/AuthThunks'

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth)
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

  const { email, picture, emailVerified } = user?.user
  console.log('userInfo+++',user.user)
  return (
    <View style={{flex: 1}}>
      <View style = {{justifyContent: 'center', alignItems: 'center', marginTop: '5%'}}>
          {picture ? (
            <Image 
              source={{uri: picture}}
              style = {{width: 100, height: 100, borderRadius: 50}}
            />
          ) : (
            <View style={{width: 100, height: 100, borderRadius: 10, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center'}}>
              <Text>No Image</Text>
            </View>
          )}
        <View style = {{marginVertical: 8}}>
            <Text style = {{fontSize: 14, fontWeight: '800'}}>{email}</Text>
        </View>

        <View style = {{marginVertical: 8}}>
            {
              emailVerified ? 
              <View style = {{backgroundColor: 'green', paddingTop: 5, paddingBottom: 5, paddingHorizontal: 15, borderRadius: 25}}>
                <Text style = {{color: 'white', fontSize: 15}}>{'Email Verified'}</Text>
              </View> :
              <View style = {{backgroundColor: 'red', paddingTop: 5, paddingBottom: 5, paddingHorizontal: 15, borderRadius: 25}}>
                <Text style = {{color: 'white', fontSize: 15}}>{'Not Verified'}</Text>
            </View>
            }
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => logoutOnClick()}>
        <View style = {{backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 20, width: '50%', justifyContent: 'center',
          alignItems:'center', alignSelf:'center'
        }}>
            <Text style = {{color: 'white'}}>Logout</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Profile