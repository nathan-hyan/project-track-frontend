import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;

const api = axios.create({
  baseURL: String(REACT_APP_BASE_URL),
  withCredentials: true,
  timeout: 15000,
});

export default api;
