import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import {useState} from 'react'
import { Link, useRouter, Redirect } from 'expo-router'
import { useAuth } from '../context/AuthContext'



const signin = () => {
    const {session, signin} = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        signin({email, password})
    }

    if(session) return <Redirect href="/"/>
    return (
      
    <View style={styles.loginContainer}>

      <Text style={styles.title}>Watchout</Text>
        <View>
        <TextInput 
            placeholder='email' 
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="password"
            placeholderTextColor='gray'
            secureTextEntry = {true}
          />
          {/* <TouchableOpacity>
            <Text style={styles.forgotPass}>Forgot Password?</Text>
          </TouchableOpacity> */}
        </View>
      
      <TouchableOpacity onPress={handleSubmit} style = {styles.loginButtonStyle}>
        <Text style={styles.textStyle}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.createAccount}>Create Account</Text>
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
  },
  loginButtonStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 15,
  },
  textStyle: {
    color: 'white',
    fontSize: 25
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
export default signin;