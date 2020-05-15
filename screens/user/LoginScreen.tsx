import React, {useState, useContext} from 'react';
import styled from 'styled-components/native';
import useDistinctNavigation from '../../hooks/useDistinctNavigation';
import UserContext from '../../contexts/UserContext';
import SnackbarContext from '../../contexts/SnackbarContext';
import {
  LogoutButton,
  LoginForm,
} from '../../components/user/LoginScreenComponents';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const LoginScreen = () => {
  const user = useContext(UserContext);
  const navigation = useDistinctNavigation();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const {setMessage, showSnackbar, setLevelAsInfo} = useContext(
    SnackbarContext,
  );

  const onSuccess = (message: string) => {
    setLevelAsInfo();
    setMessage(message);
    showSnackbar();
    navigation.navigateToHome();
  };

  return (
    <Container>
      {user.userState ? (
        <LogoutButton
          logout={user.logout(() => onSuccess('👋 Logout successful'))}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      ) : (
        <LoginForm
          login={user.login(() => onSuccess('😄 You have successfully logged in!'))}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      )}
    </Container>
  );
};

export default LoginScreen;