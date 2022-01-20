import axios from 'axios';
import { axiosInstance } from '.';
import { FormError, PaginationData, User } from '../types/api';

const API_PATH = '/users/';

export const getUser = async () => {
  try {
    const response = await axiosInstance.get<PaginationData<User>>(API_PATH);
    return response.data.results;
  } catch (e) {
    // unable to fetch data
  }
};

export const createUser = async (
  username: string,
  password: string,
  forename?: string,
  surname?: string
) => {
  try {
    const response = await axiosInstance.post<User>(API_PATH, {
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

export const updateUser = async (props: User) => {
  try {
    const { id } = props;
    const response = await axiosInstance.put<User>(`${API_PATH}${id}/`, props);
    return response.data;
  } catch (e) {
    throw axios.isAxiosError(e) ? (e.response?.data as FormError) : e;
  }
};
