/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import * as React from 'react';
import { RootLinkParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import { getObject } from '../api/store';
import { AuthResponse } from '../api/types';

const Root = createNativeStackNavigator<RootLinkParamList>();
const AuthContext = React.createContext<any>(() => {});

type AuthBaseState = {
  userToken?: string | null;
  isLoading?: boolean;
  isSignout?: boolean;
};

type AuthState = AuthBaseState | undefined;

type AuthActionTypes = 'RESTORE_TOKEN' | 'SIGN_IN' | 'SIGN_OUT';

type AuthData = {
  username: string;
  password: string;
};

type AuthAction = { type: AuthActionTypes; token?: string };

type AuthReducer = (prevState: AuthState, action: AuthAction) => AuthState;

export default function RootNavigator({
  navigation,
}: NativeStackScreenProps<RootLinkParamList>) {
  const [isAuth, setIsAuth] = React.useState<boolean>();
  const [state, dispatch] = React.useReducer<AuthReducer>(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
            isSignout: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            userToken: null,
            isSignout: true,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: AuthResponse;

      try {
        userToken = (await getObject('auth_token')) as AuthResponse;
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken.access_token });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: AuthData) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data: AuthData) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Root.Navigator>
        {state?.userToken ? (
          <Root.Screen
            name="BottomTab"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Root.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Root.Navigator>
    </AuthContext.Provider>
  );
}
