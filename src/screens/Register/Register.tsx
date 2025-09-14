import { StyleSheet, Text, View,TextInput,Pressable } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';

const Register = () => {

  const navigation = useNavigation();

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
    const registerButtonOnClick = () => {
      console.log('Login button clicked with email: ', email, ' and password: ',password, fName, lName);
    }
  return (
    <View style={styles.container}>
          <Text style = {styles.headerText}>Register</Text>
          <TextInput
            placeholder='First Name'
            keyboardType='name-phone-pad'
            placeholderTextColor={'gray'}
            onChangeText={text => setFName(text)}
            value={fName}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 10, paddingHorizontal: 10, marginTop: 10, color: 'black' }}
          />
          <TextInput
            placeholder='Last Name'
            keyboardType='name-phone-pad'
            placeholderTextColor={'gray'}
            onChangeText={text => setLName(text)}
            value={lName}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 10, paddingHorizontal: 10, marginTop: 10, color: 'black' }}
          />
          <TextInput
            placeholder='Email'
            keyboardType='email-address'
            placeholderTextColor={'gray'}
            onChangeText={text => setEmail(text)}
            value={email}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 10, paddingHorizontal: 10, marginTop: 10, color: 'black' }}
          />
          <TextInput
            placeholder='Password'
            secureTextEntry={true}
            placeholderTextColor={'gray'}
            onChangeText={text => setPassword(text)}
            value={password}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 10, paddingHorizontal: 10, color: 'black' }}
          />
          <Pressable onPress={() => registerButtonOnClick()} style = {{backgroundColor: 'blue', padding: 10, borderRadius: 5, width: '80%', alignItems: 'center'}}>
            <Text style = {{color: 'white'}}>Register</Text>
          </Pressable>
          <Text onPress={() => navigation.goBack()} style = {{color: 'black', marginTop: 10}}>Back to login</Text>
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
    color: 'black'
  }
})

export default Register;
