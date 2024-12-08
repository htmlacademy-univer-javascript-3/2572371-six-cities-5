import axios from 'axios';
import store from '../store';

const API_URL = 'https://14.design.htmlacademy.pro/six-cities'; // Замените на реальный URL сервера из технического задания

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = store.getState().token;
  if (token) {
    config.headers['X-Token'] = token;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
