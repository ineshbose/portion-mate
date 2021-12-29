import axios from 'axios';
import { getObject } from './store';
import { JWTData, PaginationData, TrackItem } from './types';

const list: TrackItem[] = [
  {
    id: 1,
    item: {
      id: 1,
      name: 'Carbohydrates',
      is_default: true,
    },
    target: 6,
    order: 1,
    frequency: 1,
    logs: [
      {
        id: 1,
        timestamp: '2021-12-23T01:02:00Z',
      },
      {
        id: 2,
        timestamp: '2021-12-23T01:02:00Z',
      },
    ],
  },
  {
    id: 2,
    item: {
      id: 2,
      name: 'Fruits & Vegetables',
      is_default: true,
    },
    target: 6,
    order: 2,
    frequency: 1,
    logs: [
      {
        id: 3,
        timestamp: '2021-12-23T01:02:00Z',
      },
    ],
  },
  {
    id: 3,
    item: {
      id: 3,
      name: 'Protein',
      is_default: true,
    },
    target: 3,
    order: 3,
    frequency: 1,
    logs: [],
  },
  {
    id: 4,
    item: {
      id: 4,
      name: 'Dairy',
      is_default: true,
    },
    target: 3,
    order: 4,
    frequency: 1,
    logs: [],
  },
  {
    id: 5,
    item: {
      id: 5,
      name: 'Oils & Fats',
      is_default: true,
    },
    target: 1,
    order: 5,
    frequency: 1,
    logs: [],
  },
];

export const getTrackItems = async () => {
  try {
    const response = await axios.get<PaginationData<TrackItem>>(
      'http://127.0.0.1:8000/api/trackitem/',
      {
        headers: {
          Authorization: `Bearer ${
            ((await getObject('auth_token')) as JWTData).access
          }`,
        },
      }
    );
    return response.data.results;
  } catch (e) {
    // unable to fetch data
    return list;
  }
};
