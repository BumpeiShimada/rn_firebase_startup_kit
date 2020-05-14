import {useState} from 'react';
import {Level} from '../components/GlobalSnackbar';

export interface SnackbarHook {
  message: string;
  setMessage: (message: string) => void;
  visible: boolean;
  level: Level;
  setLevel: (level: Level) => void;
  setLevelAsInfo: () => void;
  setLevelAsError: () => void;
  showSnackbar: () => void;
  onDismiss: () => void;
}

function useSnackbar(): SnackbarHook {
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [level, setLevel] = useState<Level>(Level.INFO);

  function setLevelAsInfo() {
    setLevel(Level.INFO);
  }

  function setLevelAsError() {
    setLevel(Level.ERROR);
  }

  function showSnackbar() {
    setVisible(true);
  }

  function onDismiss() {
    setVisible(false);
  }

  return {
    message,
    setMessage,
    visible,
    level,
    setLevel,
    setLevelAsInfo,
    setLevelAsError,
    showSnackbar,
    onDismiss,
  };
}

export default useSnackbar;
