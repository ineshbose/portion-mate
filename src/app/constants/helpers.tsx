import React from 'react';
import { ImageProps } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { IconOptions } from '../types';
import { GenericModel } from '../types/api';

export const renderIcon = (
  props: Partial<ImageProps> | undefined,
  name: IconOptions
) => <Icon key={name} name={name} {...props} />;

export async function getItems<T extends GenericModel = GenericModel>(
  {
    fetched,
    setFetched,
  }: {
    fetched: boolean;
    setFetched: React.Dispatch<React.SetStateAction<boolean>>;
  },
  {
    fetchItems,
    setItems,
  }: {
    fetchItems: () => Promise<T[]>;
    setItems: React.Dispatch<React.SetStateAction<T[]>>;
  }
) {
  if (!fetched) {
    setItems(await fetchItems());
    setFetched(true);
  }
}
