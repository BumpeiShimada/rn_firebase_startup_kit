import React, {useState, useContext} from 'react';
import {withTheme} from 'react-native-paper';
import styled from 'styled-components/native';
import UserContext from '../../contexts/UserContext';
import SnackbarContext from '../../contexts/SnackbarContext';
import {ScreenProps} from '../../models/screen';
import {
  LogoutButton,
  LoginForm,
} from '../../components/user/LoginScreenComponents';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const LoginScreen = ({theme, navigation}: ScreenProps) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const user = useContext(UserContext);
  const {
    setMessage,
    showSnackbar,
    setLevelAsInfo,
    setLevelAsError,
  } = useContext(SnackbarContext);

  const onSuccess = (message: string) => {
    setLevelAsInfo();
    setMessage(message);
    showSnackbar();
    navigation.navigate('Home');
  };

  const navigateToRegister = () => navigation.navigate('Register');

  return (
    <Container>
      {user.userState ? (
        <LogoutButton
          logout={user.logout(() => onSuccess('👋 Logout successful'))}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          setLevelAsError={setLevelAsError}
          setMessage={setMessage}
          showSnackbar={showSnackbar}
        />
      ) : (
        <LoginForm
          login={user.login(() =>
            onSuccess('😄 You have successfully logged in!'),
          )}
          theme={theme}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          setLevelAsError={setLevelAsError}
          setMessage={setMessage}
          showSnackbar={showSnackbar}
          navigateToRegister={navigateToRegister}
        />
      )}
    </Container>
  );
};

export default withTheme(LoginScreen);
