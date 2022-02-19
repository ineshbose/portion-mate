import { Resource, UpdateData } from '../types/api';
import { axiosInstance, makeRequest } from '.';

const API_PATH = '/resources/';

export const getResources = async () => makeRequest<Resource>(API_PATH);

export const bookmarkResource = async (props: UpdateData<Resource>) => {
  const { id } = props;
  const response = await axiosInstance.post<null>(`${API_PATH}${id}/bookmark/`);
  return response.data;
};
