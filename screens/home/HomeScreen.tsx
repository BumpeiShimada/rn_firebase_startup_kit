import React, {useContext} from 'react';
import {Text} from 'react-native-paper';
import styled from 'styled-components/native';
import UserContext from '../../contexts/UserContext';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HomeScreen = () => {
  const user = useContext(UserContext);

  return (
    <Container testID="home_screen_container">
      <Text>{user.userState ? 'Logged in' : 'Not logged in'}</Text>
    </Container>
  );
};

export default HomeScreen;
