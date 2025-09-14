import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/types';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginScreenProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginButtonOnClick = () => {
    console.log(
      'Login button clicked with email: ',
      email,
      ' and password: ',
      password,
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor={'gray'}
        onChangeText={text => setEmail(text)}
        value={email}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginBottom: 10,
          paddingHorizontal: 10,
          marginTop: 10,
          color: 'black',
        }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor={'gray'}
        onChangeText={text => setPassword(text)}
        value={password}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginBottom: 10,
          paddingHorizontal: 10,
          color: 'black',
        }}
      />
      <Pressable
        onPress={() => loginButtonOnClick()}
        style={{
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
          width: '80%',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Login</Text>
      </Pressable>
      <Text
        onPress={() => navigation.navigate('Register')}
        style={{ color: 'black', marginTop: 10 }}
      >
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
});

export default Login;
