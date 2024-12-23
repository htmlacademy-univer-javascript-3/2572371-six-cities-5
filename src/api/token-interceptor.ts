import {InternalAxiosRequestConfig} from 'axios';
import {getToken} from './token.ts';

export const tokenInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token) {
    config.headers['X-Token'] = token;
  }
  return config;
};
