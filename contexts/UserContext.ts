import {createContext} from 'react';
import {UserHook} from '../hooks/useUser';

const INITIAL_USER_HOOK: UserHook = {
  userState: null,
  isMountingAuthState: true,
  register: async () => {},
  login: () => async () => {},
  logout: () => async () => {},
};

const UserContext = createContext<UserHook>(INITIAL_USER_HOOK);

export default UserContext;
