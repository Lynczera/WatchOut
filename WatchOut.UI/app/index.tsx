import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import {useState} from 'react'
import { Link, useRouter, Redirect } from 'expo-router'
import { useAuth } from '../context/AuthContext'

const Index = () => {
    const {session, signin, user, Account} = useAuth()
    const router = useRouter();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        signin({email, password})
    }

    const createAccount = () => {
      router.push('/createAccount');
    }

    if(user){ 

      // return <Redirect href="/(app)/profile"/>
      return <Redirect href="/profile"/>
    }
    return (
    <View style={styles.loginContainer}>

      <Text style={styles.title}>Watchout</Text>
        <View>
        <TextInput 
            placeholder='Email' 
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            placeholderTextColor='gray'
            secureTextEntry = {true}
          />
          {/* <TouchableOpacity>
            <Text style={styles.forgotPass}>Forgot Password?</Text>
          </TouchableOpacity> */}
        </View>
      
      <TouchableOpacity onPress={handleSubmit} style = {styles.loginButtonStyle}>
        <Text style={styles.textStyleLogin}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={createAccount} style = {styles.createButtonStyle}>
        <Text style={styles.textStyleCreate}>Create Account</Text>
      </TouchableOpacity>

    </View>


  )
}

const styles = StyleSheet.create ({
  title: {
    fontSize: 50,
    marginBottom: 50
  },
  loginContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : 'white'
  },
  loginButtonStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 325,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 15,
    margin : 10
  },
  createButtonStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 325,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 15,
    margin : 10,
    borderColor : 'black',
    borderWidth : 1
  },
  textStyleLogin: {
    color: 'white',
    fontSize: 17
  },
  textStyleCreate: {
    color: 'black',
    fontSize: 17
  },
  input: {
    width: 325,
    height: 40,
    marginBlock: 8,
    borderWidth: 1,
    padding: 10,
  },
  forgotPass: {
    marginBottom: 30,
    alignSelf: 'flex-end'
  },
  createAccount: {
    alignSelf: 'flex-end',
    marginTop: 16
  }
})
export default Index;