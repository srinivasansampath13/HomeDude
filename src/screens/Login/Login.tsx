import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/types';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginWithGoogleUser } from '../../redux/thunks/AuthThunks';
import { AppDispatch, RootState } from '../../redux/store';
import { clearError } from '../../redux/slice/AuthSlice';
import { isEmailValidation } from '../../utils/utils';
import {statusCodes} from '@react-native-google-signin/google-signin';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginScreenProp>();
  const dispatch = useDispatch<AppDispatch>();
  const {error, emailLoading, googleLoading} = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorStr, setErrorStr] = useState('');

  // Clear error when component mounts
  useEffect(() => {
    dispatch(clearError());
    setErrorStr(''); // Also clear local error state
  }, []);

  // Clear error when screen comes into focus (handles navigation)
  useFocusEffect(
    React.useCallback(() => {
      dispatch(clearError());
      setErrorStr('');
    }, [dispatch])
  );

  const mapAuth0LoginError = (err: any): string => {
    const msg = typeof err === 'string' ? err : err?.message || err?.code || '';
    const desc = err?.json?.error_description || err?.description || '';
    const text = `${msg} ${desc}`.toLowerCase();

    if (text.includes('not allowed for the client')) {
      return 'Unauthorized. Please contact support.';
    }
    if (text.includes('wrong email or password')) {
      return 'Wrong email or password. Try register';
    }
    if (text.includes('invalid_grant') || text.includes('invalid credentials')) {
      return 'Invalid email or password.';
    }
    if (text.includes('access_denied')) {
      return 'Access denied. Please try again.';
    }
    if (text.includes('too_many_attempts')) {
      return 'Too many attempts. Please wait and try again.';
    }
    if (text.includes('mfa')) {
      return 'Multi-factor authentication required.';
    }
    if (text.includes('network') || text.includes('timed out') || text.includes('timeout')) {
      return 'Network error. Check your connection and try again.';
    }
    return 'Login failed. Please try again.';
  };

  useEffect(() => {
    if (error) {
      setErrorStr(mapAuth0LoginError(error));
    }
  }, [error]);

  const handleValidation = () => {
    if(email.trim() === '' && password.trim() === ''){
      setErrorStr('Credentials should not be empty')
      return false
    }

    if(password.length < 6){
      setErrorStr('Password must be at least 6 characters')
      return false
    }

    if(!isEmailValidation(email)){
      setErrorStr('Please enter a valid email')
      return false
    }

    return true;
  }

  const loginButtonOnClick = async (type: string) => {
      if(type === 'AuthLogin'){
          try {
            if(handleValidation()){
              await dispatch(loginUser({email, password}) as any).unwrap();
            }
          } catch (error: any) {
            setErrorStr(mapAuth0LoginError(error));
          }
      }else if(type === 'GoogleLogin'){
         try {
          setErrorStr('');
          await dispatch(loginWithGoogleUser()).unwrap();
          } catch (error: any) {
              console.error('Google Login Error Details:', error);
              const errorMessage = error?.message || String(error);
              const errorCode = error?.code;
              const errorText = errorMessage.toLowerCase();
              
              // Handle cancelled login - don't show error, just silently return
              if (errorMessage.includes('USER_CANCELLED_LOGIN') || errorCode === statusCodes.SIGN_IN_CANCELLED || errorText.includes('cancelled')) {
                setErrorStr('Please try to login again...!!!')
                return;
              }
              
              // Handle specific error codes
              if (errorCode === statusCodes.IN_PROGRESS) {
                setErrorStr('Sign-in operation already in progress');
              } else if (errorCode === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                setErrorStr('Google Play Services not available or outdated');
              } else if (errorText.includes('not configured') || errorText.includes('web client')) {
                setErrorStr('Google Sign-in not properly configured. Check your credentials.');
              } else if (errorText.includes('network') || errorText.includes('timeout')) {
                setErrorStr('Network error. Check your connection and try again.');
              } else {
                setErrorStr(`Google Sign-in failed: ${errorMessage}`);
              }
          }
      }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Sign In</Text>
      </View>
      <TextInput
        placeholder="Please enter your email"
        style={styles.emailInputStyle}
        keyboardType="email-address"
        placeholderTextColor={'gray'}
        onChangeText={text => {
          setEmail(text)
          setErrorStr('')
        }}
        value={email}
      />
      <TextInput
        placeholder="Please enter your password"
        style={styles.passwordInputStyle}
        secureTextEntry={true}
        placeholderTextColor={'gray'}
        onChangeText={text => {
          setPassword(text)
          setErrorStr('')
        }}
        value={password}
      />
      <TouchableWithoutFeedback onPress={() => navigation.navigate('ForgotPassword')}>
        <View style = {{alignSelf: 'flex-end', paddingRight: '10%'}}>
          <Text style = {{color: 'black', fontSize: 15}}>Forgot Password?</Text>
        </View>
      </TouchableWithoutFeedback>
      {
        errorStr ? <Text style = {styles.redAlertStyle}>{errorStr}</Text> : null 
      }
      <TouchableWithoutFeedback onPress={() => loginButtonOnClick('AuthLogin')}> 
        <View style = {styles.loginButtonStyle}>
            {
              emailLoading ? <ActivityIndicator size="small" color = 'white'/> : <Text style={{ color: 'white' }}>Login</Text>
            }
        </View>
      </TouchableWithoutFeedback>
      <Text onPress={() => {
        dispatch(clearError());
        navigation.navigate('Register')
        setErrorStr('')
        setEmail('')
        setPassword('')
      }} style={styles.clickHereToRegister}>
          Click Here to Register
      </Text>

      <TouchableWithoutFeedback onPress={() => loginButtonOnClick('GoogleLogin')}>
          <View style={{marginTop: 30, backgroundColor: '#FF52A0', padding: 15, borderRadius: 25}}>
              {
                googleLoading ? <ActivityIndicator size="small" color = 'white'/> : <Text style={{ color: 'white' }}>Signin with Google</Text>
              }
          </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      paddingHorizontal: 8
  },
  emailInputStyle:{
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      width: '80%',
      marginVertical: 10,
      paddingHorizontal: 10,
      marginTop: 10,
      color: 'black',
  },
  passwordInputStyle:{
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      width: '80%',
      paddingHorizontal: 10,
      marginVertical: 10,
      color: 'black',
    },
  loginButtonStyle:{
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginVertical: 8
 },
 clickHereToRegister:{ 
    color: 'black', 
  },
  redAlertStyle: {
    color: 'red', 
    fontSize: 13,
    width: '80%',
    fontWeight: '500'
  }
});

export default Login;
