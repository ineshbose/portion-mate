import * as React from 'react';
import { AuthProvider, useAuth } from './Auth';
import { ItemsProvider } from './Items';
import { UserProvider } from './User';

export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const { authToken } = useAuth();

  if (authToken?.access_token) {
    children = (
      <UserProvider>
        <ItemsProvider>{children}</ItemsProvider>
      </UserProvider>
    );
  }

  return <AuthProvider>{children}</AuthProvider>;
};
