import axios from 'axios';
import { axiosInstance } from '.';
import { CreateData, FormError, UpdateData, User } from '../types/api';

const API_PATH = '/users/';
// const API_PATH = (extraPath: TemplateStringsArray) => `/users/${extraPath}/`;

export const getUser = async () => {
  try {
    const response = await axiosInstance.get<User>(API_PATH);
    return response.data;
  } catch (e) {
    // unable to fetch data
  }
};

export const createUser = async (
  props: CreateData<User, 'email'> & { password: string }
) => {
  try {
    const response = await axiosInstance.post<User>(API_PATH, props);
    return response.data;
  } catch (e) {
    throw axios.isAxiosError(e) ? (e.response?.data as FormError) : e;
  }
};

export const updateUser = async (props: UpdateData<User>) => {
  try {
    const { id } = props;
    const response = await axiosInstance.patch<User>(
      `${API_PATH}${id}/`,
      props
    );
    return response.data;
  } catch (e) {
    // handle error
  }
};

export const deleteUser = async (props: UpdateData<User>) => {
  try {
    const { id } = props;
    const response = await axiosInstance.delete<User>(`${API_PATH}${id}/`);
    return response.data;
  } catch (e) {
    // handle error
  }
};
