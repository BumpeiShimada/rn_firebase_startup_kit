import * as Yup from 'yup';

export const AuthFormValueValidation = Yup.object({
  email: Yup.string()
    .email('This email address is invalid. Please enter a valid address.')
    .required('Please enter your email address'),
  password: Yup.string()
    .min(6, 'Passwords must be at least 10 characters')
    .required('Please enter password'),
});
