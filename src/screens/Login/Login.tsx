import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/types';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/thunks/AuthThunks';
import { AppDispatch, RootState } from '../../redux/store';
import { emailValidation } from '../../utils/utils';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {

  const navigation = useNavigation<LoginScreenProp>();

  const dispatch = useDispatch<AppDispatch>();
  const {error} = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorStr, setErrorStr] = useState('');

  const mapAuth0Error = (err: any): string => {
    console.log('mapError++++1',err)
    const msg = typeof err === 'string' ? err : err?.message || err?.code || '';
    const desc = err?.json?.error_description || err?.description || '';
    const text = `${msg} ${desc}`.toLowerCase();
    console.log('mapError++++2',text)

    if (text.includes('not allowed for the client')) {
      return 'Unauthorized. Please contact support.';
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
      setErrorStr(mapAuth0Error(error));
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

    if(!emailValidation(email)){
      setErrorStr('Please enter a valid email')
      return false
    }

    return true;
  }

  const loginButtonOnClick = async () => {
    if(handleValidation()){
      try {
        await dispatch(loginUser({email, password}) as any).unwrap();
      } catch (error: any) {
        setErrorStr(mapAuth0Error(error));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
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
      {
        errorStr ? <Text style = {styles.redAlertStyle}>{errorStr}</Text> : null 
      }
      <TouchableWithoutFeedback onPress={() => loginButtonOnClick()}> 
        <View style = {styles.loginButtonStyle}>
            <Text style={{ color: 'white' }}>Login</Text>
        </View>
      </TouchableWithoutFeedback>
      <Text onPress={() => navigation.navigate('Register')} style={styles.clickHereToRegister}>
          Click Here to Register
      </Text>
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
  },
  emailInputStyle:{
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: '80%',
      marginVertical: 10,
      paddingHorizontal: 10,
      marginTop: 10,
      color: 'black',
  },
  passwordInputStyle:{
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: '80%',
      paddingHorizontal: 10,
      marginVertical: 10,
      color: 'black',
    },
  loginButtonStyle:{
      width: '80%',
      backgroundColor: 'blue',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
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
