import React, {useContext} from 'react';
import {TextInput, Text, Button, useTheme} from 'react-native-paper';
import {Formik} from 'formik';
import useDistinctNavigation from '../../hooks/useDistinctNavigation';
import SnackbarContext from '../../contexts/SnackbarContext';
import {AuthFormValueInterface} from '../../models/authentication';
import {AuthFormValueValidation} from '../../validations/authentication';
import {
  InputFieldSeparater,
  FormContainer,
  PROCESSING_TEXT,
  CentralizingContainer,
  ButtonSeparater,
  LinkTextSeparater,
} from '../../components/FormComponents';

interface LogoutButtonProps {
  logout: (onError: (error: any) => void) => Promise<void>;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

export const LogoutButton = ({
  logout,
  isProcessing,
  setIsProcessing,
}: LogoutButtonProps) => {
  const {setMessage, showSnackbar, setLevelAsError} = useContext(
    SnackbarContext,
  );

  const onError = (error: any) => {
    setIsProcessing(false);
    setLevelAsError();
    setMessage(`An error occured: ${error.message}`);
    showSnackbar();
  };

  return (
    <CentralizingContainer>
      <Button
        mode={'contained'}
        disabled={isProcessing ? true : false}
        onPress={async () => {
          setIsProcessing(true);
          await logout(onError);
          setIsProcessing(false);
        }}>
        {isProcessing ? PROCESSING_TEXT : 'Logout'}
      </Button>
    </CentralizingContainer>
  );
};

interface LoginFormProps {
  login: (
    values: AuthFormValueInterface,
    onError: (error: any) => void,
  ) => Promise<void>;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

export const LoginForm = ({
  login,
  isProcessing,
  setIsProcessing,
}: LoginFormProps) => {
  const theme = useTheme();
  const navigation = useDistinctNavigation();
  const {setMessage, showSnackbar, setLevelAsError} = useContext(
    SnackbarContext,
  );

  const onError = (error: any) => {
    setIsProcessing(false);
    setLevelAsError();

    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        setMessage('The user name or password is incorrect');
        break;
      case 'auth/too-many-requests':
        setMessage(
          'Your account has been locked because the number of consecutive log-in failures exceeded the maximum allowed',
        );
        break;
      default:
        setMessage(`An error occured: ${error.message}`);
    }

    showSnackbar();
  };

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={AuthFormValueValidation}
      onSubmit={async values => {
        setIsProcessing(true);
        await login(values, onError);
        setIsProcessing(false);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
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
              {isProcessing ? PROCESSING_TEXT : 'Login'}
            </Button>
          </CentralizingContainer>

          <LinkTextSeparater />

          <CentralizingContainer>
            <Text
              onPress={navigation.navigateToRegister}
              style={{textDecorationLine: 'underline'}}>
              Sign up here
            </Text>
          </CentralizingContainer>
        </FormContainer>
      )}
    </Formik>
  );
};
