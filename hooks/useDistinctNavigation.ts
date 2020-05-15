import {useNavigation} from '@react-navigation/native';
import {HOME, REGISTER} from '../constants/routeName';

function useDistinctNavigation() {
  const navigation = useNavigation();

  function navigateToHome() {
    navigation.navigate(HOME);
  }

  function navigateToRegister() {
    navigation.navigate(REGISTER);
  }

  return {
    navigateToHome,
    navigateToRegister,
  };
}

export default useDistinctNavigation;