import { makeRequest } from '.';
import { CreateData, UpdateData, UserLog } from '../types/api';

const API_PATH = '/userlogs/';

export const getUserLogs = async () => makeRequest<UserLog>(API_PATH);

export const createUserLog = async (props: CreateData<UserLog, 'item'>) =>
  makeRequest(API_PATH, 'POST', {
    ...props,
    timestamp: new Date().toISOString(),
  });

export const updateUserLog = async (props: UpdateData<UserLog>) =>
  makeRequest(API_PATH, 'PATCH', props);

export const deleteUserLog = async (props: UpdateData<UserLog>) => {
  makeRequest(API_PATH, 'DELETE', props);
};
