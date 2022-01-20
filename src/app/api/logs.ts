import { ModelID, PaginationData, TrackItem, UserLog } from '../types/api';
import { axiosInstance } from '.';

const API_PATH = '/userlogs/';

export const getUserLogs = async () => {
  try {
    const response = await axiosInstance.get<PaginationData<UserLog>>(API_PATH);
    return response.data.results;
  } catch (e) {
    // unable to fetch data
  }
};

export const createUserLog = async (item: ModelID | TrackItem) => {
  try {
    const response = await axiosInstance.post<UserLog>(API_PATH, {
      item,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  } catch (e) {
    // unable to create
  }
};

export const updateUserLog = async (id: ModelID, item: ModelID | TrackItem) => {
  try {
    const response = await axiosInstance.patch<UserLog>(`${API_PATH}${id}/`, {
      item,
    });
    return response.data;
  } catch (e) {
    // unable to create
  }
};

export const deleteUserLog = async (id: ModelID) => {
  try {
    const response = await axiosInstance.delete<UserLog>(`${API_PATH}${id}/`);
    return response.data;
  } catch (e) {
    // unable to create
  }
};
