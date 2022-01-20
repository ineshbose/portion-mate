import { axiosInstance } from '.';
import { ModelID, PaginationData, PortionItem, TrackItem } from '../types/api';

const API_PATH = '/trackitem/';

export const getTrackItems = async () => {
  try {
    const response = await axiosInstance.get<PaginationData<TrackItem>>(
      API_PATH
    );
    return response.data.results;
  } catch (e) {
    // unable to fetch data
  }
};

export const createTrackItem = async (
  item: ModelID | PortionItem,
  target?: string,
  frequency?: string
) => {
  try {
    const response = await axiosInstance.post<TrackItem>(API_PATH, {
      item,
      target,
      frequency,
    });
    return response.data;
  } catch (e) {
    // unable to create
  }
};

export const updateTrackItem = async (props: TrackItem) => {
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

export const deleteTrackItem = async (id: ModelID) => {
  try {
    const response = await axiosInstance.delete<TrackItem>(`${API_PATH}${id}/`);
    return response.data;
  } catch (e) {
    // unable to create
  }
};
