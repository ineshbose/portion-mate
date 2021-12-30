import axios from 'axios';
import { storeObject } from './store';
import { AuthResponse } from './types';
import { CLIENT_ID, CLIENT_SECRET } from 'react-native-dotenv';

export const getToken = async (username: string, password: string) => {
  try {
    const response = await axios.post<AuthResponse>(
      'http://127.0.0.1:8000/api/auth/o/token/',
      {
        username,
        password,
        grant_type: 'password',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }
    );
    await storeObject('auth_token', response.data);
    return response.data;
  } catch (e) {
    return false;
  }
};
