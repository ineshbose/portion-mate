import axios from 'axios';
import {
  ModelID,
  PaginationData,
  PortionItem,
  TrackItem,
  User,
  UserLog,
} from '../types/api';
import { API_BASE } from 'react-native-dotenv';

export const axiosInstance = axios.create({
  baseURL: API_BASE,
});

export const getTrackItems = async () => {
  try {
    const response = await axiosInstance.get<PaginationData<TrackItem>>(
      '/trackitem/'
    );
    return response.data.results;
  } catch (e) {
    // unable to fetch data
  }
};

export const createTrackItem = async (
  item: ModelID | PortionItem,
  target: string,
  frequency: string
) => {
  try {
    const response = await axiosInstance.post<TrackItem>('/trackitem/', {
      item,
      target,
      frequency,
    });
    return response.data;
  } catch (e) {
    // unable to create
  }
};

export const getUserLogs = async () => {
  try {
    const response = await axiosInstance.get<PaginationData<UserLog>>(
      '/userlogs/'
    );
    return response.data.results;
  } catch (e) {
    // unable to fetch data
  }
};

export const createUserLog = async (item: ModelID | TrackItem) => {
  try {
    const response = await axiosInstance.post<UserLog>('/userlogs/', {
      item,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  } catch (e) {
    // unable to create
  }
};

export const getUser = async () => {
  try {
    const response = await axiosInstance.get<PaginationData<User>>('/users/');
    return response.data.results;
  } catch (e) {
    // unable to fetch data
  }
};
