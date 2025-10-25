import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { isEmailValidation } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { forgotPasswordUser } from '../../redux/thunks/AuthThunks'


const ForgotPassword = () => {

  const dispatch = useDispatch<AppDispatch>();
  const {loading} = useSelector((state: RootState) => state.auth)

  const [email, setEmail] = useState('')
  const [fpErrorStr, fpSetErrorStr] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleValidation = () => {
    if(email.trim() === ''){
      fpSetErrorStr('Please enter your email')
      return false
    }

    if(!isEmailValidation(email)){
      fpSetErrorStr('Please enter a valid email')
      return false
    }

    return true;
  }

  const forgotPasswordOnClick = async() => {
    try {
        if(handleValidation()){
          const responseAction = await dispatch(forgotPasswordUser(email))
          if(forgotPasswordUser.fulfilled.match(responseAction)){ 
            fpSetErrorStr('')
            setSuccessMessage('If your email is registered, you will receive a password reset link shortly.')
          }else if(forgotPasswordUser.rejected.match(responseAction)){
            fpSetErrorStr('Sorry...! Please contact admin')
            setSuccessMessage('')
          }
        }
      } catch (error: any) {
        fpSetErrorStr(error?.message || 'An unexpected error occurred');
        setSuccessMessage('')
      }
  }

  return (
    <View style = {styles.mainContainer}>
      <Text style = {styles.forgotPasswordHeadingStyle}>
        Enter your registered email address and we’ll send you a link to reset your password.
      </Text>

      <TextInput
        placeholder="Please enter your email"
        style={styles.emailInputStyle}
        keyboardType="email-address"
        placeholderTextColor={'gray'}
        onChangeText={text => {
          setEmail(text)
          fpSetErrorStr('')
          setSuccessMessage('')
        }}
        value={email}
      />
      {
        fpErrorStr ? <Text style = {styles.redAlertStyle}>{fpErrorStr}</Text> : null 
      }
      {
        successMessage ? <Text style = {styles.successAlertStyle}>{successMessage}</Text> : null 
      }

     <TouchableWithoutFeedback onPress={() => forgotPasswordOnClick()}> 
        <View style = {styles.loginButtonStyle}>
            {
              loading ? <ActivityIndicator size="small" color = 'white'/> : 
              <Text style={{ color: 'white', fontSize: 15 }}>Send Email</Text>
            }
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: '15%',
        marginHorizontal: '10%'
    },
    forgotPasswordHeadingStyle:{
        fontSize: 20
    },
    emailInputStyle:{
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        marginVertical: 8,
        paddingHorizontal: 10,
        marginTop: 20,
        color: 'black',
    },
    redAlertStyle: {
        color: 'red', 
        fontSize: 13,
        width: '100%',
        fontWeight: '500',
        marginVertical: 2
    },
    successAlertStyle: {
        color: 'green', 
        fontSize: 13,
        width: '100%',
        fontWeight: '500',
        marginVertical: 2
    },
    loginButtonStyle:{
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginVertical: 8
   },

})