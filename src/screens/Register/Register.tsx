import { StyleSheet, Text, View, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { RootStackParamList } from '../../navigators/types';
import { registerUser } from '../../redux/thunks/AuthThunks';
import { clearError } from '../../redux/slice/AuthSlice';
import { isEmailValidation, sanitizeUsername } from '../../utils/utils';



const Register = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const {error, loading} = useSelector((state: RootState) => state.auth);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerErrorStr, setRegisterErrorStr] = useState('')

  // Clear error when component mounts
  useEffect(() => {
    dispatch(clearError());
    setRegisterErrorStr('');
  }, []);

  // Clear error when screen comes into focus (handles navigation)
  useFocusEffect(
    React.useCallback(() => {
      dispatch(clearError());
      setRegisterErrorStr('');
    }, [dispatch])
  );

  const mapAuth0RegisterError = (err: any): string => {
    const msg = typeof err === 'string' ? err : err?.message || err?.code || '';
    const desc = err?.json?.error_description || err?.description || '';
    const text = `${msg} ${desc}`.toLowerCase();
    console.log('text++++',text)

    if (text.includes('user already exists') || text.includes('already exists')) {
        return 'An account with this email already exists. Please try logging in instead.';
    }
    if (text.includes('password') && text.includes('weak')) {
        return 'Password is too weak. Please use a stronger password.';
    }
    if (text.includes('email') && text.includes('invalid')) {
        return 'Please enter a valid email address.';
    }
    if (text.includes('password') && text.includes('policy')) {
      return 'Password does not meet security requirements.';
    }
    if (text.includes('rate limit') || text.includes('too many')) {
        return 'Too many registration attempts. Please wait and try again.';
    }
    if (text.includes('network') || text.includes('timed out') || text.includes('timeout')) {
        return 'Network error. Check your connection and try again.';
    }

    if(err.name === 'PasswordStrengthError'){
      return 'Password is too weak, choose strong password';
    }

    return 'Registration failed. Please try again.';
};

  // Handle Redux error state
  useEffect(() => {
    if (error) {
      setRegisterErrorStr(mapAuth0RegisterError(error));
    }
  }, [error]); 

  const handleValidation = () => {
    if(userName.trim() === ''){
      setRegisterErrorStr('Username should not be empty');
      return false;
    }

    if(email.trim() === ''){
      setRegisterErrorStr('Email should not be empty');
      return false;
    }

    if(password.trim() === ''){
      setRegisterErrorStr('Password should not be empty');
      return false;
    }

    if(password.length < 6){
      setRegisterErrorStr('Password must be greater than six characters');
      return false;
    }

    if(!isEmailValidation(email)){
      setRegisterErrorStr('Please enter a valid email')
      return false;
    }
    return true
  }

  const registerButtonOnClick = async () => {
    try {
      if(handleValidation()){
        const safeUserName = sanitizeUsername(userName);
        await dispatch(registerUser({userName: safeUserName, email, password}) as any).unwrap();
        Alert.alert(
          'Success',
          'User added successfully! Please go back to login and sign in.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack()
            }
          ]
        );
      }
    } catch (error: any) {
      setRegisterErrorStr(mapAuth0RegisterError(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register</Text>
      <TextInput
        placeholder="Please enter your username"
        keyboardType="name-phone-pad"
        placeholderTextColor={'gray'}
        onChangeText={text => {
          setUserName(text)
          setRegisterErrorStr('')
        }}
        value={userName}
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Please enter your email"
        keyboardType="email-address"
        placeholderTextColor={'gray'}
        onChangeText={text => {
          setEmail(text)
          setRegisterErrorStr('')
        }}
        value={email}
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Please enter your password"
        secureTextEntry={true}
        placeholderTextColor={'gray'}
        onChangeText={text => {
          setPassword(text)
          setRegisterErrorStr('')
        }}
        value={password}
        style={styles.inputStyle}
      />
      {
        registerErrorStr ? <Text style = {styles.redAlertStyle}>{registerErrorStr}</Text> : null 
      }
      <Pressable
        onPress={() => registerButtonOnClick()}
        style={styles.registerButtonStyle}>
        { loading ? <ActivityIndicator size={'small'} color={'white'}/> : <Text style={{ color: 'white' }}>Register</Text>}
      </Pressable>
      <Text onPress={() => {
        dispatch(clearError());
        navigation.goBack()
        setRegisterErrorStr('')
      }} style={{ color: 'black', marginTop: 10 }}>
        Back to login
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
  inputStyle:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 8,
    paddingHorizontal: 10,
    color: 'black',
  },
  registerButtonStyle:{
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginVertical: 8
  },
  redAlertStyle: {
    color: 'red', 
    fontSize: 13,
    width: '80%',
    fontWeight: '500',
  }
});

export default Register;
