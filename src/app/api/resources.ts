import { axiosInstance } from '.';
import { FetchData, Resource, UpdateData } from '../types/api';

const API_PATH = '/resources/';

export const getResources = async () => {
  try {
    const response = await axiosInstance.get<FetchData<Resource>>(API_PATH);
    return 'results' in response.data ? response.data.results : response.data;
  } catch (e) {
    // unable to fetch data
  }
};

export const bookmarkResource = async (props: UpdateData<Resource>) => {
  try {
    const { id } = props;
    const response = await axiosInstance.post<null>(
      `${API_PATH}${id}/bookmark/`
    );
    return response.data;
  } catch (e) {
    // unable to create
  }
};
