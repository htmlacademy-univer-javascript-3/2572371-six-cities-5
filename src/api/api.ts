import axios from 'axios';

const API_URL = 'https://14.design.htmlacademy.pro/six-cities'; // Замените на реальный URL сервера из технического задания

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export default api;
