import axios, { AxiosError } from 'axios';
import { storeObject, getObject, removeItem } from './store';
import { AuthError, AuthToken, FormError, User } from '../types/api';
import { CLIENT_ID, CLIENT_SECRET } from 'react-native-dotenv';
import { axiosInstance } from '.';

const updateAuthHeaderAndStore = async (token: AuthToken) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;
  await storeObject('auth_token', token);
  return token;
};

const addRefreshInterceptor = () => {
  return axiosInstance.interceptors.request.use(
    function (response) {
      return response;
    },
    function (error: AxiosError | Error) {
      if (axios.isAxiosError(error) && error.config.headers) {
        if (error.request.status === 401) {
          if (!error.config.headers.retry) {
            error.config.headers.retry = 'true';
            return refreshToken().then(() => axiosInstance(error.config));
          } else {
            revokeToken();
          }
        }
      }
      throw error;
    }
  );
};

export const getToken = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post<AuthToken>('/auth/o/token/', {
      username,
      password,
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    response.data.interceptor = addRefreshInterceptor();
    return await updateAuthHeaderAndStore(response.data);
  } catch (e) {
    throw axios.isAxiosError(e) ? (e.response?.data as AuthError) : e;
  }
};

export const refreshToken = async (authToken?: AuthToken) => {
  try {
    if (!authToken) {
      authToken = (await getObject('auth_token')) as AuthToken;
    }

    const response = await axiosInstance.post<AuthToken>('/auth/o/token/', {
      refresh_token: authToken.refresh_token,
      grant_type: 'refresh_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    response.data.interceptor = authToken.interceptor;
    return await updateAuthHeaderAndStore(response.data);
  } catch (e) {
    throw axios.isAxiosError(e) ? (e.response?.data as AuthError) : e;
  }
};

export const revokeToken = async (authToken?: AuthToken) => {
  try {
    if (!authToken) {
      authToken = (await getObject('auth_token')) as AuthToken;
    }

    await axiosInstance.post<AuthToken>('/auth/o/revoke_token/', {
      token: authToken.access_token,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    axiosInstance.defaults.headers.common.Authorization = '';
    if (authToken.interceptor) {
      axiosInstance.interceptors.request.eject(authToken.interceptor);
    }

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
    const response = await axiosInstance.post<User>('/users/', {
      email: username,
      password: password,
      first_name: forename,
      last_name: surname,
    });
    return response.data;
  } catch (e) {
    throw axios.isAxiosError(e) ? (e.response?.data as FormError) : e;
  }
};
