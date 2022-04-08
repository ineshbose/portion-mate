import axios, { Method } from 'axios';
import { API_BASE } from '../../env';
import { CreateData, FetchData, GenericModel, UpdateData } from '../types/api';

type UnrequiredGM = Partial<GenericModel>;
type Methods = Extract<Uppercase<Method>, 'GET' | 'POST' | 'PATCH' | 'DELETE'>;
type ReturnAPI<
  T extends UnrequiredGM = GenericModel,
  M extends Methods = 'GET'
> = M extends 'GET' ? T[] : M extends 'POST' | 'PATCH' ? T : never;
type RequiredAPI<
  T extends GenericModel = GenericModel,
  M extends Methods = 'GET'
> = M extends 'GET'
  ? undefined
  : M extends 'PATCH' | 'DELETE'
  ? UpdateData<T>
  : CreateData<T>;

export const axiosInstance = axios.create({
  baseURL: API_BASE,
});

export async function getData<T extends GenericModel = GenericModel>(
  path: string
) {
  const response = await axiosInstance.get<FetchData<T>>(path);
  return 'results' in response.data ? response.data.results : response.data;
}

export async function createData<T extends GenericModel = GenericModel>(
  path: string,
  data: CreateData<T>
) {
  const response = await axiosInstance.post<T>(path, data);
  return response.data;
}

export async function updateData<T extends GenericModel = GenericModel>(
  path: string,
  method: Extract<Methods, 'PATCH' | 'DELETE'>,
  data: UpdateData<T>
) {
  const { id } = data;
  const url = `${path}${id}/`;
  const response = await axiosInstance.request<T>({
    method,
    url,
    data,
  });
  return response.data;
}

// export async function makeRequest<T extends GenericModel = GenericModel>(
//   path: string,
//   method: 'GET'
// ): Promise<T[]>;
// export async function makeRequest<T extends GenericModel = GenericModel>(
//   path: string,
//   method: 'POST',
//   data: CreateData<T>
// ): Promise<T>;
// export async function makeRequest<T extends GenericModel = GenericModel>(
//   path: string,
//   method: 'PATCH' | 'DELETE',
//   data: UpdateData<T>
// ): Promise<T>;
export async function makeRequest<
  T extends GenericModel = GenericModel,
  M extends Methods = 'GET'
>(
  path: string,
  method: M = <M>'GET',
  data: RequiredAPI<T, M> | any = undefined
): Promise<ReturnAPI<T, M>> {
  try {
    if (method === 'PATCH' || method === 'DELETE') {
      return (await updateData<T>(
        path,
        method,
        data as UpdateData<T>
      )) as ReturnAPI<T, M>;
    } else if (method === 'POST') {
      // eslint-disable-next-line prettier/prettier
      return (await createData<T>(path, data as CreateData<T>)) as ReturnAPI<T, M>;
    } else {
      return (await getData<T>(path)) as ReturnAPI<T, M>;
    }
  } catch (e) {
    throw axios.isAxiosError(e) ? e.response?.data : e;
  }
}
