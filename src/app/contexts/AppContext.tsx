import React from 'react';
import {
  addRefreshInterceptor,
  getToken,
  revokeToken,
  updateAuthHeaderAndStore,
} from '../api/auth';
import { getObject } from '../api/store';
import { createUser, getUser } from '../api/user';
import { ChildComponents } from '../types';
import { AuthToken, Journals, TrackItems, User } from '../types/api';
import { RootTabParamList, RouteNames } from '../types/navigation';

type AppContextType = {
  authToken?: AuthToken;
  user?: User;
  items?: TrackItems;
  journals?: Journals;
  loading: boolean;
  headerAction?: RouteNames<RootTabParamList>;
  helpers: { [name: string]: Function };
};

const AppContext = React.createContext<AppContextType>({
  loading: false,
  helpers: {},
});

export const ContextProvider = ({ children }: ChildComponents) => {
  const [authToken, setAuthToken] = React.useState<AuthToken>();
  const [items, setItems] = React.useState<TrackItems>([]);
  const [journals, setJournals] = React.useState<Journals>([]);
  const [user, setUser] = React.useState<User>();
  const [headerAction, setHeaderAction] =
    React.useState<RouteNames<RootTabParamList>>();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadToken = async () => {
      try {
        const authData = await getObject<AuthToken>('auth_token');
        if (authData) {
          authData.interceptor = addRefreshInterceptor(signOut);
          await updateAuthHeaderAndStore(authData);
          const userData = await getUser();
          setUser(userData);
        }
        setAuthToken(authData);
      } catch (e) {
        // handle error
        throw e;
      }
    };

    loadToken().then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const authData = await getToken(email, password, signOut);
      const userData = await getUser();
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
        journals,
        headerAction,
        loading,
        helpers: {
          signIn,
          signUp,
          signOut,
          setUser,
          setItems,
          setJournals,
          setHeaderAction,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an ContextProvider');
  }

  return context;
};

export default useAppContext;
