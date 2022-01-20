import * as React from 'react';
import {
  addRefreshInterceptor,
  getToken,
  revokeToken,
  updateAuthHeaderAndStore,
} from '../api/auth';
import { getObject } from '../api/store';
import { createUser, getUser } from '../api/user';
import { AuthToken, User } from '../types/api';

type AuthContextType = {
  authToken?: AuthToken;
  user?: User;
  loading: boolean;
  signIn: Function;
  signUp: Function;
  signOut: Function;
};

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [authToken, setAuthToken] = React.useState<AuthToken>();
  const [user, setUser] = React.useState<User>();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadToken = async () => {
      try {
        const authData = (await getObject('auth_token')) as AuthToken;
        if (authData) {
          authData.interceptor = addRefreshInterceptor();
          await updateAuthHeaderAndStore(authData);
          const userData = (await getUser()) as User;
          setUser(userData);
        }
        setAuthToken(authData);
      } catch (e) {
        // handle error
        throw e;
      }
    };

    loadToken().then(() => setLoading(false));
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const authData = (await getToken(email, password)) as AuthToken;
      const userData = (await getUser()) as User;
      setUser(userData);
      setAuthToken(authData);
    } catch (e) {
      // handle error
      throw e;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    forename?: string,
    surname?: string
  ) => {
    try {
      await createUser({ email, password, forename, surname });
      await signIn(email, password);
    } catch (e) {
      // handle error
      throw e;
    }
  };

  const signOut = async () => {
    await revokeToken(authToken);
    setUser(undefined);
    setAuthToken(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ authToken, user, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
