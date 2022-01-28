import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
  try {
    return await AsyncStorage.setItem(`@${key}`, value);
  } catch (e) {
    // saving error
  }
};

export const storeObject = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    return await AsyncStorage.setItem(`@${key}`, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key: string, _default?: string) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    return value !== null ? value : _default;
  } catch (e) {
    // error reading value
  }
};

export const getObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const removeItem = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(`@${key}`);
  } catch (e) {
    // error removing value
  }
};
