import { makeRequest } from '.';
import { CreateData, PortionItem, TrackItem, UpdateData } from '../types/api';

const API_PATH = '/trackitem/';

export const getTrackItems = async () => makeRequest<TrackItem>(API_PATH);

export const createPortionItem = async (
  props: CreateData<PortionItem, 'name'>
) => makeRequest(API_PATH, 'POST', props);

export const createTrackItem = async (props: CreateData<TrackItem, 'item'>) =>
  makeRequest(API_PATH, 'POST', props);

export const updateTrackItem = async (props: UpdateData<TrackItem>) =>
  makeRequest(API_PATH, 'PATCH', props);

export const deleteTrackItem = async (props: UpdateData<TrackItem>) =>
  makeRequest(API_PATH, 'DELETE', props);
