import { axiosInstance } from '.';
import { CreateData, FetchData, TrackItem, UpdateData } from '../types/api';

const API_PATH = '/trackitem/';

export const getTrackItems = async () => {
  try {
    const response = await axiosInstance.get<FetchData<TrackItem>>(API_PATH);
    return 'results' in response.data ? response.data.results : response.data;
  } catch (e) {
    // unable to fetch data
  }
};

export const createTrackItem = async (props: CreateData<TrackItem, 'item'>) => {
  try {
    const response = await axiosInstance.post<TrackItem>(API_PATH, props);
    return response.data;
  } catch (e) {
    // unable to create
  }
};

export const updateTrackItem = async (props: UpdateData<TrackItem>) => {
  try {
    const { id } = props;
    const response = await axiosInstance.patch<TrackItem>(
      `${API_PATH}${id}/`,
      props
    );
    return response.data;
  } catch (e) {
    // unable to create
  }
};

export const deleteTrackItem = async (props: UpdateData<TrackItem>) => {
  try {
    const { id } = props;
    const response = await axiosInstance.delete<TrackItem>(`${API_PATH}${id}/`);
    return response.data;
  } catch (e) {
    // unable to create
  }
};
