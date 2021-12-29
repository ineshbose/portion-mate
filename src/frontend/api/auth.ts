import axios from 'axios';
import { storeObject } from './store';
import { JWTData } from './types';

export const getToken = async (email: string, password: string) => {
  try {
    const response = await axios.post<JWTData>(
      'http://127.0.0.1:8000/api/token/',
      {
        email,
        password,
      }
    );
    await storeObject('auth_token', response.data);
    return response.data;
  } catch (e) {
    return false;
  }
};
