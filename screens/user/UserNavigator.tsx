import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserContext from '../../contexts/UserContext';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import {LOGIN, REGISTER} from '../../constants/routeName';

const Stack = createStackNavigator();

const UserNavigator = () => {
  const user = useContext(UserContext);

  return (
    <Stack.Navigator initialRouteName={LOGIN}>
      <Stack.Screen name={LOGIN} component={LoginScreen} />
      {user.userState === null && (
        <Stack.Screen name={REGISTER} component={RegisterScreen} />
      )}
    </Stack.Navigator>
  );
};

export default UserNavigator;
