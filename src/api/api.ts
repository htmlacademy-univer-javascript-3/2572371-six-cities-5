import axios from 'axios';
import {tokenInterceptor} from './token-interceptor.ts';

const API_URL = 'https://14.design.htmlacademy.pro/six-cities'; // Замените на реальный URL сервера из технического задания

export function createAPI() {
  const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
  });

  api.interceptors.request.use(tokenInterceptor, (error) => Promise.reject(error));

  return api;
}
