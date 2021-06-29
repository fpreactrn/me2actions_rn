import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Main, Register, Login } from './Screens'

const AuthStack = createStackNavigator(); 
export const CredentialsContext = React.createContext();

export default () => {
  // const credentialsState = useState({
  //   username: 'ms.reactNative',
  //   password: 'ms.reactNative1234'
  // });
  const credentialsState = useState(null);

  return(
    <CredentialsContext.Provider value={credentialsState}>
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen name="Main" component={Main}/>
          <AuthStack.Screen name="Register" component={Register}/>
          <AuthStack.Screen name="Login" component={Login}/>
        </AuthStack.Navigator>
      </NavigationContainer>
    </CredentialsContext.Provider>
  );
};