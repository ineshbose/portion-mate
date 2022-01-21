import * as React from 'react';
import {
  addRefreshInterceptor,
  getToken,
  revokeToken,
  updateAuthHeaderAndStore,
} from '../api/auth';
import { getObject } from '../api/store';
import { createUser, getUser } from '../api/user';
import { AuthToken, TrackItems, User } from '../types/api';

type AppContextType = {
  authToken?: AuthToken;
  user?: User;
  items?: TrackItems;
  loading: boolean;
  helpers: { [name: string]: Function };
};

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export const ContextProvider = ({ children }: { children: JSX.Element }) => {
  const [authToken, setAuthToken] = React.useState<AuthToken>();
  const [items, setItems] = React.useState<TrackItems>([]);
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
    setItems([]);
    setUser(undefined);
    setAuthToken(undefined);
  };

  return (
    <AppContext.Provider
      value={{
        authToken,
        user,
        items,
        loading,
        helpers: { signIn, signUp, signOut, setItems },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an ContextProvider');
  }

  return context;
};
