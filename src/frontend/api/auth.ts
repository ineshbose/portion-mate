import axios from 'axios';
import { storeObject, getObject } from './store';
import { AuthError, AuthResponse } from './types';
import { CLIENT_ID, CLIENT_SECRET } from 'react-native-dotenv';

const TOKEN_URL = 'http://127.0.0.1:8000/api/auth/o/token/';

export const getToken = async (username: string, password: string) => {
  try {
    const response = await axios.post<AuthResponse>(TOKEN_URL, {
      username,
      password,
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });
    await storeObject('auth_token', response.data);
    return response.data;
  } catch (e) {
    throw axios.isAxiosError(e) ? (e.response?.data as AuthError) : e;
  }
};

export const refreshToken = async () => {
  try {
    const authToken = (await getObject('auth_token')) as AuthResponse;
    const response = await axios.post<AuthResponse>(TOKEN_URL, {
      refresh_token: authToken.refresh_token,
      grant_type: 'refresh_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });
    await storeObject('auth_token', response.data);
    return response.data;
  } catch (e) {
    throw axios.isAxiosError(e) ? (e.response?.data as AuthError) : e;
  }
};
