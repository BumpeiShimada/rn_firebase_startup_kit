import React, {useState, useContext} from 'react';
import {TextInput, Text, Button, withTheme} from 'react-native-paper';
import styled from 'styled-components/native';
import {Formik} from 'formik';
import UserContext from '../../contexts/UserContext';
import SnackbarContext from '../../contexts/SnackbarContext';
import {ScreenProps} from '../../models/screen';
import {AuthFormValueValidation} from '../../validations/authentication';
import {
  InputFieldSeparater,
  FormContainer,
  CentralizingContainer,
  ButtonSeparater,
  PROCESSING_TEXT,
} from '../../components/FormComponents';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const RegisterScreen = ({theme, navigation}: ScreenProps) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const user = useContext(UserContext);
  const {
    setMessage,
    showSnackbar,
    setLevelAsInfo,
    setLevelAsError,
  } = useContext(SnackbarContext);

  const onSuccess = () => {
    setLevelAsInfo();
    setMessage('🎉 You have successfully registered!');
    showSnackbar();
    navigation.navigate('Home');
  };

  const onError = (error: any) => {
    setIsProcessing(false);
    setLevelAsError();

    switch (error.code) {
      case 'auth/email-already-in-use':
        setMessage('This email is already taken');
        break;
      default:
        setMessage(`An error occured: ${error.message}`);
    }

    showSnackbar();
  };

  return (
    <Container>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={AuthFormValueValidation}
        onSubmit={async values => {
          setIsProcessing(true);
          await user.register(values, onSuccess, onError);
          setIsProcessing(false);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <FormContainer>
            <TextInput
              label="Email"
              mode="outlined"
              autoCompleteType="email"
              autoCapitalize="none"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email ? (
              <Text style={{color: theme.colors.error}}>{errors.email}</Text>
            ) : null}

            <InputFieldSeparater />

            <TextInput
              label="Password"
              mode="outlined"
              autoCompleteType="password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password ? (
              <Text style={{color: theme.colors.error}}>{errors.password}</Text>
            ) : null}

            <ButtonSeparater />

            <CentralizingContainer>
              <Button
                mode={'contained'}
                disabled={isProcessing ? true : false}
                onPress={handleSubmit}>
                {isProcessing ? PROCESSING_TEXT : 'Register'}
              </Button>
            </CentralizingContainer>
          </FormContainer>
        )}
      </Formik>
    </Container>
  );
};

export default withTheme(RegisterScreen);
