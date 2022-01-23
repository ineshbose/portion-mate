import { axiosInstance } from '.';
import { FetchData, Resource } from '../types/api';

const API_PATH = '/resources/';

export const getResources = async () => {
  try {
    const response = await axiosInstance.get<FetchData<Resource>>(API_PATH);
    return 'results' in response.data ? response.data.results : response.data;
  } catch (e) {
    // unable to fetch data
  }
};
