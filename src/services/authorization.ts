import api from '../config/api';

const BASE_URL = '/users/auth';

interface LoginBody {
  username: string;
  password: string;
}

export const login = (username: string, password: string) => api.post<LoginBody>(`${BASE_URL}/login`, { username, password });
