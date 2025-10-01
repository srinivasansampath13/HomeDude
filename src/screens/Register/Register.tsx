import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { RootStackParamList } from '../../navigators/types';

const Register = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerButtonOnClick = async () => {
    try {
      console.log('Registering user with details:', { userName, email, password });
    } catch (error) {
      console.error('Registration failed:', error);
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
});

export default Register;
