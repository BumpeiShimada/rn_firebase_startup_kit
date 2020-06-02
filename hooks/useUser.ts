import {useState, useEffect} from 'react';
import {User} from 'firebase';
import firebase from '../singletons/firebase';
import {AuthFormValueInterface} from 'models/authentication';

export interface UserHook {
  userState: User | null;
  isMountingAuthState: boolean;
  register: (
    values: AuthFormValueInterface,
    onSuccess: () => void,
    onError: (error: any) => void,
  ) => Promise<void>;
  login: (
    onSuccess: () => void,
  ) => (
    values: AuthFormValueInterface,
    onError: (error: any) => void,
  ) => Promise<void>;
  logout: (
    onSuccess: () => void,
  ) => (onError: (error: any) => void) => Promise<void>;
}

function useUser(): UserHook {
  const [userState, setUserState] = useState<User | null>(null);
  const [isMountingAuthState, setIsMountingAuthState] = useState<boolean>(true);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(currentUser => {
        setUserState(currentUser);
        setIsMountingAuthState(false);
      });

    return unregisterAuthObserver;
  }, []);

  async function register(
    values: AuthFormValueInterface,
    onSuccess: () => void,
    onError: (error: any) => void,
  ) {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password);
      onSuccess();
    } catch (error) {
      onError(error);
    }
  }

  function login(onSuccess: () => void) {
    return async (
      values: AuthFormValueInterface,
      onError: (error: any) => void,
    ) => {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);
        onSuccess();
      } catch (error) {
        onError(error);
      }
    };
  }

  function logout(onSuccess: () => void) {
    return async (onError: (error: any) => void) => {
      try {
        await firebase.auth().signOut();
        onSuccess();
      } catch (error) {
        onError(error);
      }
    };
  }

  return {userState, isMountingAuthState, register, login, logout};
}

export default useUser;
