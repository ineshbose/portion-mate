import * as React from 'react';
import { User } from '../types/api';

type UserContextType = {
  user?: User;
};

export const UserContext = React.createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {}, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
};
