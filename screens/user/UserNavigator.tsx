import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserContext from '../../contexts/UserContext';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const Stack = createStackNavigator();

const UserNavigator = () => {
  const user = useContext(UserContext);

  return (
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen name="Login" component={LoginScreen} />
      {user.userState === null && (
        <Stack.Screen name="Register" component={RegisterScreen} />
      )}
    </Stack.Navigator>
  );
};

export default UserNavigator;
