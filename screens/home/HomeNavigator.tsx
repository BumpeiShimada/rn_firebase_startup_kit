import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HOME} from '../../constants/routeName';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator initialRouteName={HOME}>
    <Stack.Screen name={HOME} component={HomeScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
