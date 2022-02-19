import { CreateData, UpdateData, User } from '../types/api';
import { makeRequest } from '.';

const API_PATH = '/users/';
// const API_PATH = (extraPath: TemplateStringsArray) => `/users/${extraPath}/`;

export const getUser = async () => <User>(<unknown>makeRequest<User>(API_PATH));

export const createUser = async (
  props: CreateData<User, 'email'> & { password: string }
) => makeRequest(API_PATH, 'POST', props);

export const updateUser = async (
  props: UpdateData<User> & { password?: string; old_password?: string }
) => makeRequest(API_PATH, 'PATCH', props);

export const deleteUser = async (props: UpdateData<User>) =>
  makeRequest(API_PATH, 'DELETE', props);
