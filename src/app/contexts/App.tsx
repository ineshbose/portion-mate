import * as React from 'react';
import { AuthProvider, useAuth } from './Auth';
import { ItemsProvider } from './Items';
import { UserProvider } from './User';

export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const { authToken } = useAuth();

  return (
    <AuthProvider>
      {authToken?.access_token ? (
        <UserProvider>
          <ItemsProvider>{children}</ItemsProvider>
        </UserProvider>
      ) : (
        <>{children}</>
      )}
    </AuthProvider>
  );
};
