import * as React from 'react';
import { getToken } from '../api/auth';
import { getObject, removeItem } from '../api/store';
import { AuthToken } from '../types/api';

type AuthContextType = {
  authToken?: AuthToken;
  loading: boolean;
  signIn: (u: string, p: string) => Promise<void>;
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

  const signOut = async () => {
    setAuthToken(undefined);
    removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ authToken, loading, signIn, signOut }}>
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
