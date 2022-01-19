import * as React from 'react';
import { TrackItems } from '../types/api';

type ItemsContextType = {
  items?: TrackItems;
};

export const ItemsContext = React.createContext<ItemsContextType>(
  {} as ItemsContextType
);

export const ItemsProvider = ({ children }: { children: JSX.Element }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [items, setItems] = React.useState<TrackItems>([]);

  React.useEffect(() => {}, []);

  return (
    <ItemsContext.Provider value={{ items }}>{children}</ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = React.useContext(ItemsContext);

  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }

  return context;
};
