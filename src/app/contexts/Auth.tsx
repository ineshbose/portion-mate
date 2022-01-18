import * as React from 'react';
import { createUser, getToken, revokeToken } from '../api/auth';
import { getObject } from '../api/store';
import { AuthToken } from '../types/api';

type AuthContextType = {
  authToken?: AuthToken;
  loading: boolean;
  signIn: (u: string, p: string) => Promise<void>;
  signUp: (u: string, p: string, f?: string, s?: string) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [authToken, setAuthToken] = React.useState<AuthToken>();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadToken = async () => {
      try {
        const authData = (await getObject('auth_token')) as AuthToken;
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
      await createUser(email, password, forename, surname);
      await signIn(email, password);
    } catch (e) {
      // handle error
      throw e;
    }
  };

  const signOut = async () => {
    await revokeToken();
    setAuthToken(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ authToken, loading, signIn, signUp, signOut }}
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
