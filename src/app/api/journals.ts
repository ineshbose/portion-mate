import { CreateData, FetchData, Journal, UpdateData } from '../types/api';
import { axiosInstance } from '.';

const API_PATH = '/journals/';

export const getJournals = async () => {
  try {
    const response = await axiosInstance.get<FetchData<Journal>>(API_PATH);
    return 'results' in response.data ? response.data.results : response.data;
  } catch (e) {
    // unable to fetch data
  }
};

export const createJournal = async (props: CreateData<Journal, 'item'>) => {
  try {
    const response = await axiosInstance.post<Journal>(API_PATH, {
      entry_time: new Date().toISOString(),
      ...props,
    });
    return response.data;
  } catch (e) {
    // unable to create
  }
};

export const updateJournal = async (props: UpdateData<Journal>) => {
  try {
    const { id } = props;
    const response = await axiosInstance.patch<Journal>(
      `${API_PATH}${id}/`,
      props
    );
    return response.data;
  } catch (e) {
    // unable to create
  }
};

export const deleteJournal = async (props: UpdateData<Journal>) => {
  try {
    const { id } = props;
    const response = await axiosInstance.delete<Journal>(`${API_PATH}${id}/`);
    return response.data;
  } catch (e) {
    // unable to create
  }
};
