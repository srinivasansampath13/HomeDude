import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { RootStackParamList } from '../../navigators/types';
import { registerUser } from '../../redux/thunks/AuthThunks';
import { isEmailValidation } from '../../utils/utils';

const Register = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorStr, setErrorStr] = useState('') 

  const handleValidation = () => {
    if(userName.trim() === '' && email.trim() === '' && password.trim() === ''){
      setErrorStr('Name, Email, Password should not be empty');
      return false;
    }

    if(password.length < 6){
      setErrorStr('Password must be greater than six characters');
      return false;
    }

    if(!isEmailValidation(email)){
      setErrorStr('Please enter a valid email')
      return false;
    }
    return true
  }

  const registerButtonOnClick = async () => {
    try {
      if(handleValidation()){
        try{
          await dispatch(registerUser({userName, email, password}) as any).unwrap();
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
        }catch(error:any){
          setErrorStr(error)
        }
      }
    } catch (error: any) {
      setErrorStr(error)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register</Text>
      <TextInput
        placeholder="Please enter your username"
        keyboardType="name-phone-pad"
        placeholderTextColor={'gray'}
        onChangeText={text => setUserName(text)}
        value={userName}
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Please enter your email"
        keyboardType="email-address"
        placeholderTextColor={'gray'}
        onChangeText={text => setEmail(text)}
        value={email}
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Please enter your password"
        secureTextEntry={true}
        placeholderTextColor={'gray'}
        onChangeText={text => setPassword(text)}
        value={password}
        style={styles.inputStyle}
      />
      {
        errorStr ? <Text style = {styles.redAlertStyle}>{errorStr}</Text> : null 
      }
      <Pressable
        onPress={() => registerButtonOnClick()}
        style={styles.registerButtonStyle}>
        <Text style={{ color: 'white' }}>Register</Text>
      </Pressable>
      <Text onPress={() => navigation.goBack()} style={{ color: 'black', marginTop: 10 }}>
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
    marginVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    color: 'black',
  },
  registerButtonStyle:{
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  redAlertStyle: {
    color: 'red', 
    fontSize: 13,
    width: '80%',
    fontWeight: '500'
  }
});

export default Register;
