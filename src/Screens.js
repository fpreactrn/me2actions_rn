import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';
import { CredentialsContext } from './App';
import Actions from './components/Actions'

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start'     
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 25
  },
  button: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0066CC',
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 1,
    marginVertical: 1
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center'
  },
  logout: {
    alignItems: 'flex-end'    
  },
  edge: {
    alignItems: 'center'    
  },
  input: {
    fontSize: 20,
    padding: 10,
    paddingHorizontal: 20,
    color: '#444',
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#0066CC',
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-end',
    minWidth: 70
  }    
})

const handleErrors = async (response) => {
  if (! response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
    return response.json();
  };

const ScreenConainer = ({ children }) => (
  <View style={styles.screenContainer}>{children}</View>
);

export const Main = ({navigation}) => {
  const [ credentials, setCredentials ] = useContext(CredentialsContext); 

  const logout = () => {
    setCredentials(null)
  }

  return (
    <ScreenConainer>
      <View style={styles.header}>
        <Text style={styles.headerText}>Action Item List</Text>{credentials && <Text style={styles.headerText}> for {credentials.username}</Text>}           
      </View>  

      <View style={styles.edge}>
        {!credentials &&
          <TouchableOpacity
            onPress={()=>navigation.push('Register')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity> 
        }  
      </View> 

      <View style={styles.edge}>
        {!credentials &&
          <TouchableOpacity
            onPress={()=>navigation.push('Login')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>        
        }          
      </View>   

      <View style={styles.logout}>
        {credentials &&
          <TouchableOpacity
            onPress={logout}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>        
        } 
      </View> 

      {credentials &&
        <View>
          <Actions />
        </View>        
      }  
    </ScreenConainer>
  );
};

export const Register = ({navigation}) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [, setCredentials] = useContext(CredentialsContext);
  const [ error, setError ] = useState('');

  const register = event => {
    event.preventDefault();
    fetch('http://localhost:4012/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(handleErrors)
    .then(()=>{
       setCredentials({
         username,
         password
       })
       navigation.push('Main')
     })
    .catch((error)=>{
        setError(error.message)
     }) 
  };
        
  return (
    <ScreenConainer>
      <Text>{error}</Text>  
      <TextInput
        autoCapitalize='none'
        placeholder="Username"
        onChangeText={username=>setUsername(username)}
        style={styles.input}
      />

      <TextInput
        autoCapitalize='none'
        placeholder="Password"
        onChangeText={password=>setPassword(password)}
        secureTextEntry={true}
        style={styles.input}
      /> 

      <View style={styles.edge}>
        <TouchableOpacity
          onPress={register}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>  
      </View>
    </ScreenConainer>
  );
};

export const Login = ({navigation}) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [, setCredentials] = useContext(CredentialsContext);
  const [ error, setError ] = useState('');

  const login = event => {
    event.preventDefault();
    fetch('http://localhost:4012/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then(handleErrors)
  .then(()=>{
     setCredentials({
       username,
       password
     })
     navigation.push('Main')
   })
  .catch((error)=>{
     setError(error.message)
   }) 
};

  return (
    <ScreenConainer>
      <Text>{error}</Text>  
      <TextInput
        autoCapitalize='none'
        placeholder="Username"
        onChangeText={username=>setUsername(username)}
        style={styles.input}
      />

      <TextInput
        autoCapitalize='none'
        placeholder="Password"
        onChangeText={password=>setPassword(password)}
        secureTextEntry={true}
        style={styles.input}
      /> 
     
      <View style={styles.edge}>
        <TouchableOpacity
          onPress={login}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>  
      </View>

    </ScreenConainer>
  );
};
