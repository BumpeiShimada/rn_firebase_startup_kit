import {createContext} from 'react';
import {SnackbarHook} from '../hooks/useSnackbar';
import {Level} from '../components/GlobalSnackbar';

const INITIAL_SNACKBAR_HOOK: SnackbarHook = {
  message: '',
  setMessage: () => {},
  visible: false,
  level: Level.INFO,
  setLevel: () => {},
  setLevelAsInfo: () => {},
  setLevelAsError: () => {},
  showSnackbar: () => {},
  onDismiss: () => {},
};

const SnackbarContext = createContext<SnackbarHook>(INITIAL_SNACKBAR_HOOK);

export default SnackbarContext;
