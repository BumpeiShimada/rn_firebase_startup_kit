import 'react-native-gesture-handler';

import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {HOME, USER} from './constants/routeName';
import useUser from './hooks/useUser';
import useSnackbar from './hooks/useSnackbar';
import UserContext from './contexts/UserContext';
import SnackbarContext from './contexts/SnackbarContext';
import HomeNavigator from './screens/home/HomeNavigator';
import UserNavigator from './screens/user/UserNavigator';
import GlobalSnackbar from './components/GlobalSnackbar';

const theme = DefaultTheme;

const Tab = createBottomTabNavigator();

const App = () => {
  const user = useUser();
  const snackbar = useSnackbar();

  if (user.isMountingAuthState) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <UserContext.Provider value={user}>
        <SnackbarContext.Provider value={snackbar}>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName={HOME}
              screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                  let iconName = 'home';

                  switch (route.name) {
                    case USER:
                      iconName = 'user';
                      break;
                  }

                  return (
                    <AntDesign name={iconName} size={size} color={color} />
                  );
                },
              })}
              tabBarOptions={{
                activeTintColor: theme.colors.primary,
                inactiveTintColor: 'gray',
              }}>
              <Tab.Screen name={HOME} component={HomeNavigator} />
              <Tab.Screen name={USER} component={UserNavigator} />
            </Tab.Navigator>
          </NavigationContainer>
        </SnackbarContext.Provider>
      </UserContext.Provider>
      <GlobalSnackbar
        level={snackbar.level}
        message={snackbar.message}
        visible={snackbar.visible}
        onDismiss={snackbar.onDismiss}
      />
    </PaperProvider>
  );
};

export default App;
