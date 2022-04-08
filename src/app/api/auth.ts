import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from '../../env';
import { AuthError, AuthToken } from '../types/api';
import { storeObject, getObject, removeItem } from './store';
import { axiosInstance } from '.';

const API_PATH = '/auth/o/';

export const updateAuthHeaderAndStore = async (token: AuthToken) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;
  await storeObject('auth_token', token);
  return token;
};

export const addRefreshInterceptor = (callback?: Function) => {
  return axiosInstance.interceptors.response.use(
    function (response: AxiosRequestConfig<any>) {
      return response;
    },
    function (error: AxiosError | Error) {
      if (axios.isAxiosError(error) && error.config.headers) {
        if (error.request.status === 401) {
          if (!error.config.headers.retry) {
            error.config.headers.retry = 'true';
            return refreshToken().then(() => axiosInstance(error.config));
          } else {
            if (callback) {
              return callback();
            }
          }
        }
      }
      throw error;
    }
  );
};

export const getToken = async (
  username: string,
  password: string,
  interceptorCallback?: Function
) => {
  try {
    const response = await axiosInstance.post<AuthToken>(`${API_PATH}token/`, {
      username,
      password,
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    response.data.interceptor = addRefreshInterceptor(interceptorCallback);
    return await updateAuthHeaderAndStore(response.data);
  } catch (e) {
    throw axios.isAxiosError(e) ? (e.response?.data as AuthError) : e;
  }
};

export const refreshToken = async (authToken?: AuthToken) => {
  try {
    if (!authToken) {
      authToken = await getObject<AuthToken>('auth_token');
    }

    const response = await axiosInstance.post<AuthToken>(`${API_PATH}token/`, {
      refresh_token: authToken.refresh_token,
      grant_type: 'refresh_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    response.data.interceptor = authToken.interceptor;
    return await updateAuthHeaderAndStore(response.data);
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 400) {
      revokeToken(authToken);
    }
    throw axios.isAxiosError(e) ? (e.response?.data as AuthError) : e;
  }
};

export const revokeToken = async (authToken?: AuthToken) => {
  try {
    if (!authToken) {
      authToken = await getObject<AuthToken>('auth_token');
    }

    await axiosInstance.post<AuthToken>(`${API_PATH}revoke_token/`, {
      token: authToken.access_token,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    axiosInstance.defaults.headers.common.Authorization = '';
    if (authToken.interceptor) {
      axiosInstance.interceptors.response.eject(authToken.interceptor);
    }

    await removeItem('auth_token');
  } catch (e) {
    throw axios.isAxiosError(e) ? (e.response?.data as AuthError) : e;
  }
};
