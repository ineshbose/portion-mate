import { CreateData, Journal, UpdateData } from '../types/api';
import { makeRequest } from '.';

const API_PATH = '/journals/';

export const getJournals = async () => makeRequest<Journal>(API_PATH);

export const createJournal = async (props: CreateData<Journal, 'meal'>) =>
  makeRequest(API_PATH, 'POST', {
    entry_time: new Date().toISOString(),
    ...props,
  });

export const updateJournal = async (props: UpdateData<Journal>) =>
  makeRequest(API_PATH, 'PATCH', props);

export const deleteJournal = async (props: UpdateData<Journal>) =>
  makeRequest(API_PATH, 'DELETE', props);
