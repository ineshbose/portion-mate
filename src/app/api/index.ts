import axios from 'axios';
import { API_BASE } from 'react-native-dotenv';

export const axiosInstance = axios.create({
  baseURL: API_BASE,
});
