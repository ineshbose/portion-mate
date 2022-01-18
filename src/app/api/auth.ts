import axios from 'axios';
import { storeObject, getObject, removeItem } from './store';
import { AuthError, AuthToken, FormError, User } from '../types/api';
import { CLIENT_ID, CLIENT_SECRET } from 'react-native-dotenv';

const TOKEN_URL = 'http://127.0.0.1:8000/api/auth/o';

export const getToken = async (username: string, password: string) => {
  try {
    const response = await axios.post<AuthToken>(`${TOKEN_URL}/token/`, {
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
    const authToken = (await getObject('auth_token')) as AuthToken;
    const response = await axios.post<AuthToken>(`${TOKEN_URL}/token/`, {
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

export const revokeToken = async () => {
  try {
    const authToken = (await getObject('auth_token')) as AuthToken;
    await axios.post<AuthToken>(`${TOKEN_URL}/revoke_token/`, {
      token: authToken.access_token,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });
    await removeItem('auth_token');
  } catch (e) {
    throw axios.isAxiosError(e) ? (e.response?.data as AuthError) : e;
  }
};

export const createUser = async (
  username: string,
  password: string,
  forename?: string,
  surname?: string
) => {
  try {
    const response = await axios.post<User>(
      `http://127.0.0.1:8000/api/users/`,
      {
        email: username,
        password: password,
        first_name: forename,
        last_name: surname,
      }
    );
    return response.data;
  } catch (e) {
    throw axios.isAxiosError(e) ? (e.response?.data as FormError) : e;
  }
};
