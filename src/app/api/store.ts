import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
  try {
    return await AsyncStorage.setItem(`@${key}`, value);
  } catch (e) {
    // saving error
    throw e;
  }
};

export const storeObject = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    return await AsyncStorage.setItem(`@${key}`, jsonValue);
  } catch (e) {
    // saving error
    throw e;
  }
};

export const getData = async (key: string, _default?: string) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    return value !== null ? value : _default;
  } catch (e) {
    // error reading value
    throw e;
  }
};

export const getObject = async <T>(key: string): Promise<T> => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    throw e;
  }
};

export const removeItem = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(`@${key}`);
  } catch (e) {
    // error removing value
    throw e;
  }
};
