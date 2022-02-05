import { axiosInstance } from '.';
import { CreateData, FetchData, UpdateData, UserLog } from '../types/api';

const API_PATH = '/userlogs/';

export const getUserLogs = async () => {
  try {
    const response = await axiosInstance.get<FetchData<UserLog>>(API_PATH);
    return 'results' in response.data ? response.data.results : response.data;
  } catch (e) {
    // unable to fetch data
  }
};

export const createUserLog = async (props: CreateData<UserLog, 'item'>) => {
  try {
    const response = await axiosInstance.post<UserLog>(API_PATH, {
      ...props,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  } catch (e) {
    // unable to create
  }
};

export const updateUserLog = async (props: UpdateData<UserLog>) => {
  try {
    const { id } = props;
    const response = await axiosInstance.patch<UserLog>(
      `${API_PATH}${id}/`,
      props
    );
    return response.data;
  } catch (e) {
    // unable to create
  }
};

export const deleteUserLog = async (props: UpdateData<UserLog>) => {
  try {
    const { id } = props;
    const response = await axiosInstance.delete<UserLog>(`${API_PATH}${id}/`);
    return response.data;
  } catch (e) {
    // unable to create
  }
};
