import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// api.defaults.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE1MDcxNjk2fQ.qd4nWHHpOtqEGFFAmQaUcMMSROM8McIC-EMFtirfkqU`;
api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
