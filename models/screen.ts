import {Theme} from 'react-native-paper';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

export interface ScreenProps {
  theme: Theme;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
